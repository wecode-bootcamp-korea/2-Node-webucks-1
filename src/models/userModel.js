import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const users = await prisma.$queryRaw`
  SELECT *
  FROM users;
  `;
  return users;
};

const setUsers = async (req, res) => {
  await prisma.$queryRaw`
  INSERT INTO users (email,password,username,address,phone_number,policy_agreed)
  VALUES ("uclee95@wecode.conmm","0905","wook","gwangmeyong","01072298999","1"),
  ("eebzaaa@wecode.conmm","0905","yebom","busan","0101238999","1"),  
  ("fireking5997@wecode.conmm","0905","park","종로타워지킴이","01039050101","1"),
  ("dabin0219@wecode.conmm","0905","dabin","구파발헬창","01071799766","1"),
  ("changh950@wecode.cnomm","0905","chang","선릉2호점지킴이","01026054161","1"),
  ("wjdghtls11@wecode.cnomm","0905","ho","양천구교육열의도시","01027563617","1");  
  `;

  const user = await prisma.$queryRaw`
  SELECT *
  FROM users
  ORDER BY id DESC
  LIMIT 6;
  `;
  return user;
};

export default { getUser, setUsers };
