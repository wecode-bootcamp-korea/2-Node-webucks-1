export const ERRORS = {
  SERVER: '알수없는 오류가 발생했습니다. 관리자에게 문의하세요.',
  EXIST: '같은 이메일로 가입한 유저가 존재합니다.',
  INVALID: '이메일이나 비밀번호가 올바르지 않습니다.',
  UNAUTH: '로그인이 필요한 기능입니다.',
  NOPARAMS: '해당 값을 찾을 수 없습니다.',
  NOITEM: (name = '상품이') => `해당 ${name} 존재하지 않습니다.`,
  DUPLICATE: name => `${name} 이미 했습니다.`,
  WRONGREQ: '잘못된 요청입니다.',
};

export const ROLES = {
  MANAGER: 'manager',
  ACTIVEUSER: 'auth_user',
  DELETEDUSER: 'delete_user',
};
