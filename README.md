# ei-admin-loader
用于ei-admin 打包时候自动删除多余参数，删除mock数据


```javascript
export default (request) => ({
  SYS_USER_LOGIN (data = {}, setting = {}) {
    console.log(999871)
    return request({
      url: '/login',
      method: 'post',
      cancelID: '88888881',
      data
    }, Object.assign({
      cancelID: '8888888'
    }, setting), () => mockTools.responseSuccess('88877788'))
  }
})
```

打包后自动删除mock
```javascript
export default (request) => ({
  SYS_USER_LOGIN (data = {}, setting = {}) {
    console.log(999871)
    return request({
      url: '/login',
      method: 'post',
      cancelID: '88888881',
      data
    }, Object.assign({
      cancelID: '8888888'
    }, setting))
  }
})
```

## Install

```
npm i ei-admin-loader -D
```

## Usage
> `.ts`的文件需要再`ts-loader`处理之后再调用此
```javascript
// webpack.config.js

module: {
    rules: [
        {
            test: /\.js$/,
            use:{
                loader:'ei-admin-loader'
            },
            include: [require('path').join(__dirname, 'src/api/modules')]
        }
    ]
}
```

## Options
| Name        | Type   | Default | Description      |
| ----------- | ------ | ------- | ---------------- |
| methodName  | string | request | 默认替换的方法名 |
| paramNumber | number | 2       | 保留参数个数     |



