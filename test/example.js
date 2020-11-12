export default (request => ({
  SYS_USER_LOGIN(data = {}, setting = {}) {
    return request({
      url: '/login',
      method: 'post',
      data
    }, setting, () => console.log(888888));
  }

}));
