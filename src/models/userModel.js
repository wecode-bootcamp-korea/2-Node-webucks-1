import client from './client';

export const checkIsExist = async (req, next) => {
  const {
    body: { email },
  } = req;
  try {
    const isExist = await client.user.count({ where: { email } });
    return !!isExist;
  } catch (e) {
    next(e);
  }
};

export const createUser = async (req, res, password) => {
  const {
    body: { email },
  } = req;

  try {
    await client.$queryRaw`
    INSERT INTO users(email,password,updated_at) VALUES(${email},${password},${new Date()});
    `;

    const data = await client.$queryRaw`
    SELECT u.email from users u WHERE u.email=${email};
    `;

    return {
      ok: true,
      ...(Array.isArray(data) ? { data: data[0] } : { data }),
    };
  } catch (e) {
    res.json({
      ok: false,
      error: '알수없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};
