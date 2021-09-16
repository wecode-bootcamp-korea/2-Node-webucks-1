import client from './client';

export const findUserByEmail = async (next, email) => {
  try {
    return client.$queryRaw`
    SELECT * from users u WHERE u.email=${email};
    `;
  } catch (e) {
    next(e);
  }
};

export const createUser = async (req, res, next, password) => {
  const {
    body: { email },
  } = req;

  try {
    await client.$queryRaw`
    INSERT INTO users(email,password,updated_at) VALUES(${email},${password},${new Date()});
    `;

    const data = await findUserByEmail(next, email);

    if (data.length) {
      delete data[0].password;
      delete data[0].id;
      delete data[0].updated_at;
    }

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