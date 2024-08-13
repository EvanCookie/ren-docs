## 1. 项目打包

- 我们开发用的脚手架其实就是一个**微型服务器**，用于：支撑开发环境、运行代理服务器等。
- 打包完的文件中不存在：`.vue`、`.jsx`、`.less` 等文件，而是：`html`、`css`、`js`等。
- 打包后的文件，不再借助脚手架运行，而是需要部署到服务器上运行。
- 打包前，请务必梳理好前端项目的`ajax`封装（请求前缀、代理规则等）。



## 2. 本地服务器部署

### 2.1 搭建服务器

本地服务器可以用：`Java`、`Php`、`Go`、`Node.js` 等语言编写，本文档采用`express`编写服务器，端口号为：`8090`，代码如下：

```js
// server.js文件
// Express 是一个极简且灵活的 Node.js Web 应用框架
const express = require('express')
const app = express()
const port = 8090

// 配置public文件夹为静态资源。
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

### 2.2 打包并部署

第一步：将前端项目打包

:::tip 

具体的打包命令，可以参考`package.json`中的`scripts`字段配置。

![image-20240813205546096](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/project_deploy/202408132055137.png)

:::

第二步：将打包结果交给服务器

:::tip

一般打包完的目录为：dist 或 build 目录

将打包生成目录内的文件，放到服务器的静态资源文件夹中（上文中的`public`文件夹）

:::

第三步：访问项目

::: warning 注意

浏览器访问：`http://localhost:8090`即可看到我们的项目，但此时会遇到两个问题：

1. 页面刷新 404
2. ajax 请求无法发送

:::

### 2.3 解决页面刷新404

问题分析：前端项目的路由，通常分为两种工作模式，分别为：

- hash模式

:::info 说明

hash 值又称锚点，通常用于指定网页中的某个位置，例如下面的网址：`https://www.cctv.com/#SUBD1605080062959435`，其中的`#SUBD1605080062959435`就是 hash 值，hash 值只在客户端（如浏览器）中使用，是不会带给服务器的，所以使用 hash 模式时，不存在刷新 404 问题。

:::

- history模式

:::info 说明

history 去掉了`URL`中的`#`号，可以让应用的URL看起来更美观，带来的问题就是刷新时，会将前端路由携带给后端，而后端没有对应资源的匹配，就出现了 404 问题。

:::

解决方案一：将前端路由器工作模式改为 hash 模式 （不推荐）

解决方案二：让服务器在收到未配置的`GET`路由时，都返回`index.html`即可。代码如下：

```js
// 在服务器增加以下代码
const path = require('path')

app.get('*',(req,res)=>{
	res.sendFile( path.resolve(__dirname,'./public/index.html'))
})
```

> 方案二最终其实是把 url 中的 path，交给了前端路由去处理

:::warning 补充

也可以借助`connect-history-api-fallback`中间件完成配置

```js
const history = require('connect-history-api-fallback')

// 使用中间件 => 将其放置在静态资源中间件（如express.static）之前
app.use(history())

// 配置public文件夹为静态资源。
app.use(express.static('public'))
```

使用`connect-history-api-fallback`可以让配置更灵活，比如`/login`临时不需要作为前端路由处理，就可以按照如下方式配置：

```js
app.use(history({
	verbose:false,
	rewrites:[
		{ from: /^\/login.*$/, to: (context) => context.parsedUrl.path },
	]
}))
```

:::

### 2.4 解决请求无法发送

问题分析：脱离脚手架后，就没有了代理服务器，无法转发请求到【提供数据】的服务器，此时发送的请求就构成跨域。

解决方法：在 Node 服务器中借助`http-proxy-middleware`中间件配置代理服务，具体配置如下：

```js
// 引入createProxyMiddleware
const { createProxyMiddleware } = require('http-proxy-middleware')

// 配置代理中间件
app.use('/api', createProxyMiddleware({
    target: 'https://www.toutiao.com', // 需要转发到的服务器地址
    changeOrigin: true,
    pathRewrite: {
        '^/api': '' // 去掉/api 拼接 target 转发到指定服务器
    }
}))
```



## 3. nginx 服务器部署

### 3.1 nginx简介

![image-20240813205350186](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/project_deploy/202408132053224.png)

[Nginx](https://github.com/nginx/njs/)（发音为“engine-x”）是一款高性能的 HTTP 服务器和反向代理服务器，同时也是一个 IMAP/POP3/SMTP 代理服务器。Nginx 最初由 Igor Sysoev 编写，于 2004 年发布。它以其高性能、高稳定性、丰富的功能集和低系统资源消耗而闻名，主要功能有：

1. 反向代理
2. 负载均衡
3. 静态内容服务
4. HTTP/2 支持
5. SSL/TLS 支持
6. 高速缓存

### 3.2 nginx 配置代理

:::info 说明

今日头条接口地址：`https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc`

直接向其发送 Ajax 请求会有跨域问题，接下来我们借助`nginx`解决跨域问题

nginx配置文件位置为：nginx目录conf文件夹下的nginx.conf文件，即`/nginx-1.27.0/conf/nginx.conf`

:::

**:white_check_mark:第一种配置方式：不过滤前缀**

以解决今日头条跨域，不过滤`/hot-event`前缀配置如下：

```nginx
location /hot-event {
  # 设置代理目标
  proxy_pass https://www.toutiao.com;

  # 允许跨域
  add_header 'Access-Control-Allow-Origin' '*';
  add_header 'Access-Control-Allow-Methods' '*';
  add_header 'Access-Control-Allow-Headers' '*';
  add_header 'Access-Control-Expose-Headers' '*';
}
```

前端写法

```js
axios.get('http://localhost:8090/hot-event/hot-board/?origin=toutiao_pc')
```

**:white_check_mark:第二种配置方式：过滤前缀**

解决今日头条跨域，过滤`/api`前缀配置如下：

```nginx
location /api/ {
  # 设置代理目标
  proxy_pass https://www.toutiao.com/;

  # 允许跨域
  add_header 'Access-Control-Allow-Origin' '*';
  add_header 'Access-Control-Allow-Methods' '*';
  add_header 'Access-Control-Allow-Headers' '*';
  add_header 'Access-Control-Expose-Headers' '*';
}
```

前端写法

```js
axios.get('http://localhost:8090/api/hot-event/hot-board/?origin=toutiao_pc')
```

:::warning 备注

使用下面配置删除上游服务器的指定响应头。

```nginx
proxy_hide_header Access-Control-Allow-Origin;
```

:::

### 3.3 nginx 部署前端项目

整体思路：让`nginx`充当两个角色，既是 **静态内容服务器**，又是**代理服务器**。

第一步：修改`nginx`配置如下，注意`nginx`的根目录最好**不是 C 盘**

```nginx
# 配置nginx根目录
location / {
  root   D:\dist; # 打包好的文件目录
  index  index.html index.htm;
}

# 配置代理
location /api/ {
  # 设置代理目标
  proxy_pass https://www.toutiao.com/;
}
```

第二步：修改前端项目，让所有请求都转发给 `/api`，随后重新打包

```js
const request = axios.create({
  baseURL:'/api', // 基础地址
  timeout:10000
})
```

第三步：直接访问`nginx`服务器即可，例如 `nginx`如果运行在`8090`端口，则访问以下端口

```
http://localhost:8090
```

第四步：随后会遇到刷新`404`问题，追加`nginx`配置来解决

```nginx
# 配置nginx根目录
location / {
  root   D:\dist;
  index  index.html index.htm;
  try_files $uri $uri/ /index.html; # 解决刷新404
}

# 配置代理
location /api/ {
  # 设置代理目标
  proxy_pass https://www.toutiao.com/;
}
```



## 4. 云服务器部署