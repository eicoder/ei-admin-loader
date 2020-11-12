export default (request => ({
  SYS_USER_LOGIN(data = {}, setting = {}) {
    return request2({
      url: '/login',
      method: 'post',
      data
    }, setting, () => console.log(888888));
  }

}));
