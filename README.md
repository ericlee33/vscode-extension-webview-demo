## 如果有帮助到你，欢迎点个 star ⭐️，你的支持就是我创作的动力

在 VSCode 工作区中按下 F5，可在本地启动项目

本地启动的项目，工作区需包含下方脚本，即可使用 VSCode 插件

package.json

```json
{
  "scripts": {
    "test": "node index.js"
  }
}
```

./index.js

```js
setTimeout(() => {
  console.log('Success');
}, 1000);
```
