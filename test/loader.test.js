const compiler = require("./compiler.js");

test("无参数", async () => {
  const stats = await compiler("example.js");
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`export default (request => ({
  SYS_USER_LOGIN(data = {}, setting = {}) {
    return request({
      url: '/login',
      method: 'post',
      data
    }, setting);
  }

}));`);
});
test("设置参数, paramNumber = 1 ", async () => {
  const stats = await compiler("example.js", {
    paramNumber: 1
  });
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`export default (request => ({
  SYS_USER_LOGIN(data = {}, setting = {}) {
    return request({
      url: '/login',
      method: 'post',
      data
    });
  }

}));`);
});
test("设置参数, methodName = 'request2' ", async () => {
  const stats = await compiler("example2.js", {
    methodName: 'request2'
  });
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`export default (request => ({
  SYS_USER_LOGIN(data = {}, setting = {}) {
    return request2({
      url: '/login',
      method: 'post',
      data
    }, setting);
  }

}));`);
});
test("设置参数, methodName = 'request2',paramNumber = 1  ", async () => {
  const stats = await compiler("example2.js", {
    methodName: 'request2',
    paramNumber: 1
  });
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`export default (request => ({
  SYS_USER_LOGIN(data = {}, setting = {}) {
    return request2({
      url: '/login',
      method: 'post',
      data
    });
  }

}));`);
});
