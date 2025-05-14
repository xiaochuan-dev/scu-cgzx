# http://cgzx.scu.edu.cn/venue预约

# 使用说明

> 下面的使用说明是抢每天早上`10:00-12:00`的华西校区网球场的

## 环境准备

使用任意电脑的任意浏览器操作

## 开始操作

在正式放号抢之前5分钟完成登录

### 进去浏览器打开调试工具

进入浏览器按`F12`或者右键点击检查打开调试工具，并在调试窗口中找到`console`或者`控制台`。这里用windows下的chrome来操作

![](https://unpkg.luckincdn.com/@xiaochuan-dev/static@0.0.38/dist/ce6f46ddfe59cfd7.png)

### 登陆页面操作

在刚才打开了调试工具的页面进入登陆页面，网页链接是`http://cgzx.scu.edu.cn/venue`  把下面的代码复制到`console`中按回车执行

```js
;(() => {
  const ele = document.querySelector('.register > uni-image');
  ele.remove();
})();
```

这时就能看到登陆框了，按正常操作登陆

![](https://unpkg.luckincdn.com/@xiaochuan-dev/static@0.0.38/dist/72633ff1e599298c.png)

## 抢场地

这时已经登录到了首页

复制下面的代码到`console`里面先不要按回车，在开始抢之前2分钟按回车执行抢

```js
async function preloadjs(js) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = js;
    script.onload = () => {
      resolve(true);
    };
    document.head.appendChild(script);
  });
}

;(async() => {
  await preloadjs('https://unpkg.luckincdn.com/@xiaochuan-dev/scu-cgzx@latest/dist/index.js');
})();

```

注意看控制台中的输出
