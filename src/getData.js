import { Builder, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { By } from 'selenium-webdriver';
import client from './models';

const getInstance = async url => {
  const service = new chrome.ServiceBuilder(
    '/Applications/chromedriver'
  ).build();

  chrome.setDefaultService(service);

  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();

  await driver.get(url);
  return driver;
};

const url = 'https://www.starbucks.co.kr/menu/drink_list.do';

export const getCategory = async () => {
  const instance = await getInstance(url);
  const selector = '#mCSB_1_container > li';
  const bodyList = await instance.findElements(By.css(selector));
  for (let i = 1; i < (await bodyList).length; i++) {
    const name = await bodyList[i].findElement(By.css('label')).getText();
    await client.category.create({ data: { name } });
  }
};

const getCoffeeDetailInfo = async element => {
  const nutris = await element.findElements(
    By.css(
      '#container > div.content02 > div.product_view_wrap1 > div.product_view_detail > form > fieldset > div > div.product_info_content'
    )
  );

  const coffeeNutris = [];
  for (let k = 0; k < nutris.length; k++) {
    const temp = [];
    const names = await nutris[k].findElements(By.css('li>dl'));
    for (let i = 0; i < names.length; i++) {
      if (i == 3 || i == 4 || i == 8 || i == 9) continue;
      const name = await names[i].findElement(By.css('dt')).getText();
      temp.push({ name });
    }

    const amounts = await nutris[k].findElements(By.css('li>dl'));
    let j = 0;
    for (let i = 0; i < amounts.length; i++) {
      if (i == 3 || i == 4 || i == 8 || i == 9) continue;
      const amount = await amounts[i].findElement(By.css('dd')).getText();

      temp[j]['amount'] = amount;
      j++;
    }
    coffeeNutris.push(...temp);
  }

  const imageDom = await element.findElements(
    By.css('#product_thum_wrap > ul')
  );
  const srcs = [];
  for (let item of imageDom) {
    const src = await item.findElement(By.css('li>a>img')).getAttribute('src');
    await element.wait(until.elementsLocated(By.css('li>a>img')), 10000);
    srcs.push(src);
  }

  const koreanDom = await element.findElement(
    By.css(
      '#container > div.content02 > div.product_view_wrap1 > div.product_view_detail > div.myAssignZone > h4'
    )
  );

  const nameDom = await element.findElement(
    By.css(
      '#container > div.content02 > div.product_view_wrap1 > div.product_view_detail > div.myAssignZone > h4 > span'
    )
  );

  const descDom = await element.findElement(
    By.css(
      '#container > div.content02 > div.product_view_wrap1 > div.product_view_detail > div.myAssignZone > p'
    )
  );

  const nutriDom = await element.findElement(By.id('product_info01'));

  const allergyDom = await element.findElement(
    By.css(
      '#container > div.content02 > div.product_view_wrap1 > div.product_view_detail > form > fieldset > div > div.product_factor > p'
    )
  );

  const koreanName = await koreanDom.getText();
  const nutri = await nutriDom.getText();
  const allergy = await allergyDom.getText();
  const description = await descDom.getText();
  const englishName = await nameDom.getText();

  return {
    description,
    englishName,
    koreanName,
    nutri,
    allergy,
    srcs,
    coffeeNutris,
  };
};

const getCoffeeUrls = async () => {
  const instance = await getInstance(url);
  const selector =
    '#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl ';
  const bodyList = await instance.findElements(By.css(selector));
  for (let i = 0; i < bodyList.length; i++) {
    const bodys = await bodyList[i].findElements(
      By.xpath('//ul[contains(@class,"product_")]')
    );

    const coffeeUrls = [];

    for (let j = 0; j < bodys.length; j++) {
      const aLink = await bodys[j].findElements(By.css('a'));
      const urls = [];

      for (let k = 0; k < aLink.length; k++) {
        const id = await aLink[k].getAttribute('prod');
        const url = `https://www.starbucks.co.kr/menu/drink_view.do?product_cd=${id}`;
        urls.push(url);
      }

      coffeeUrls.push(urls);
    }
    return [coffeeUrls, instance];
  }
};

export const getCoffeeDatas = async () => {
  const allCoffeeDatas = [];
  const [urls, instance] = await getCoffeeUrls();

  for (let i = 0; i < urls.length; i++) {
    for (let detailUrl of urls[i]) {
      if (detailUrl.indexOf('3427') > -1) continue;
      if (detailUrl.indexOf('3428') > -1) continue;
      if (detailUrl.indexOf('3429') > -1) continue;
      if (detailUrl.indexOf('3430') > -1) continue;

      await instance.navigate().to(detailUrl);

      await instance.wait(until.elementsLocated(By.css('img')), 1000);
      await instance.wait(until.elementsLocated(By.css('span')), 1000);
      const item = await getCoffeeDetailInfo(instance);

      const {
        description,
        englishName,
        koreanName,
        nutri,
        allergy,
        srcs,
        coffeeNutris,
      } = item;

      const [name, size] = nutri.split('/').map(v => v.trim());

      const coffeeExist = await client.$queryRaw`
      SELECT 
        c.id 
      FROM coffees c
      WHERE 
        english_name=${englishName}
      `;

      let coffee = coffeeExist[0];
      if (!coffeeExist.length) {
        coffee = await client.coffee.create({
          data: {
            ...(name &&
              size && {
                size: {
                  connectOrCreate: {
                    where: {
                      name,
                    },
                    create: {
                      name,
                      size,
                    },
                  },
                },
              }),
            description,
            koreanName,
            englishName,
            category: {
              connect: {
                id: i + 1,
              },
            },
          },
        });
      }

      const imgsQuery = [];
      for (let src of srcs) {
        const img = await client.$queryRaw`
       INSERT INTO
        images(
          src,
          coffees_id
        )
       VALUES(
          ${src},
          ${coffee.id});
       `;

        const item = {
          id: img.id,
        };

        imgsQuery.push(item);
      }

      for (let jtem of coffeeNutris) {
        await client.nutritionCoffee.create({
          data: {
            amount: jtem.amount,
            nutrition: {
              connectOrCreate: {
                where: {
                  nutrient: jtem.name,
                },
                create: {
                  nutrient: jtem.name,
                },
              },
            },
            coffee: {
              connect: {
                id: coffee.id,
              },
            },
          },
        });
      }

      if (allergy.length) {
        const allergies = allergy
          .split(':')[1]
          .split('/')
          .map(v => v.trim());

        for (allergy of allergies) {
          let exist = await client.allergy.findFirst({
            where: { allergy },
          });
          if (!exist) {
            exist = await client.allergy.create({
              data: {
                allergy,
              },
            });
          }

          await client.$queryRaw`
         INSERT INTO 
          allergy_coffee(
            coffees_id,
            allergies_id) 
          VALUES(
            ${coffee.id},
            ${exist.id})
         `;
        }
      }
    }
  }
  return allCoffeeDatas;
};
