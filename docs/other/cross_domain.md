## 1. 浏览器的同源策略

### 1.1. 同源策略概述

同源策略是一个重要的安全策略，它用于限制一个源的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

例如，它可以防止互联网上的恶意网站在浏览器中运行 JS 脚本，从第三方网络邮件服务（用户已登录）或公司内网（因没有公共 IP 地址而受到保护，不会被攻击者直接访问）读取数据，并将这些数据转发给攻击者。

::: info
W3C 上对同源策略的说明 [Same origin policy](https://www.w3.org/Security/wiki/Same_Origin_Policy)
:::

### 1.2. 什么是源 (origin)

1. 源的组成部分

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/cross_domain/1719992251274-9c3c42b6-4964-4011-b2e8-653ae5da02df.png)
如果两个 URL 的：协议、域名（主机）和端口，都相同的话，则这两个 URL 是同源的。


2. 下面表格中，只有最后一行的两个源是同源。

| 源 1                             | 源 2                               | 是否同源   |
| -------------------------------- | ---------------------------------- | --------- |
| **http:**//www.xyz.com/home      | **https:** //www.xyz.com/home      | ⛔非同源️  |
| http://**www**.xyz.com/home      | http://**mail**.xyz.com/home       | ⛔非同源  |
| http://www.xyz.com:**8080**/home | http://www.xyz.com:**8090**/home   | ⛔非同源  |
| http://www.xyz.com:8080 **/home** | http://www.xyz.com:8080 **/search** | ✅同源︎ |

3. **同源**请求

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/cross_domain/1720140467554-b5c959c6-b12e-461a-bf45-3b2898aa9221.png)

4. **非同源**请求

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/cross_domain/1720140482719-1b91392b-92ab-4173-86ad-748ee648349a.png)

::: tip
『所处源』与『目标源』不一致，就是『非同源』，又称 『异源』或『跨域』。
:::


## 2. 跨域会受到哪些限制

例如有两个源：『源A』和『源B』，它们是『非同源』的，那么浏览器会有如下限制：

### 2.1. 限制DOM访问

『源A』的脚本**不能访问**『源B』的 DOM。

```html
<button onclick="showDOM()">尝试获取页面的dom</button>
<iframe id="framePage" src="https://www.sogou.com/"></iframe>

<script>
  const framePage = document.querySelector('#framePage')
  
  // 获取Dom函数
  function showDOM() {
      console.log(framePage.contentWindow.document.body) // [!code error]
  }
</script>
```

### 2.2. 限制Cookie访问

『源A』**不能访问**『源B』的 cookie。

```html
<button onclick="showCookie()">尝试获取页面的cookie</button>
<iframe id="framePage" src="https://www.sogou.com/"></iframe>
<script>
  const framePage = document.querySelector('#framePage')
  // 获取Cookie函数
  function showCookie() {
  // 访问cookie
  console.log(framePage.contentWindow.document.cookie) // [!code error]
  }
</script>
```

### 2.3. 限制Ajax获取数据

『源A』可以给『源B』发请求，但是**无法获取**『源B』响应的数据。

```js
// 头条接口: https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc
const getData = async () => {
    const res = await axios.get('https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc') // [!code error]
    console.log(res.data)
}
```

::: warning
在上述限制中，浏览器对 Ajax 获取数据的限制是影响最大的一个，且实际开发中经常遇到。
:::

## 3. 几个注意点

 - 跨域限制仅存在浏览器端，服务端不存在跨域限制。
 - 即使跨域了，Ajax 请求也可以正常发出，但响应数据不会交给开发者。

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/cross_domain/1720226863233-4e44efc5-4592-46d1-9aaa-1d5a995794de.png)

 - `<link>`、`<script>`、`<img>`...... 这些标签发出的请求也可能跨域，只不过浏览器对标签跨域不做严格限制，对开发几乎无影响。


## 4. CORS 解决 Ajax 跨域访问

### 4.1. CORS 概述

- 跨源资源共享（CORS，或通俗地译为跨域资源共享）是一种基于 HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其他源（域、协议或端口），使得浏览器允许这些源访问加载自己的资源。

- 跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的“预检”请求。在预检中，浏览器发送的头中标示有 HTTP 方法和真实请求中会用到的头。


### 4.2. 简单请求与复杂请求

|   简单请求    |      复杂请求    | 
| ------------- | :-----------: | 
| ✅请求方法(method)为：`GET`, `POST`, `HEAD`     | 简单除外 | 
| ✅请求头字段符合[《CORS 安全规范》](https://fetch.spec.whatwg.org/#cors-safelisted-request-header) <br> 一般不手动设置请求头都能符合  ||
|  ✅`Content-Type` 标头所指定的媒体类型的值仅限于下列三者之一：<br> `text/plain` <br> `multipart/form-data` <br> `application/x-www-form-urlencoded` ||


### 4.3. CORS 解决简单请求

整体思路：服务器在给出响应时，通过添加`Access-Control-Allow-Origin`响应头，来明确表达允许某个源发起跨域请求，随后浏览器在校验时，直接通过。

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/cross_domain/1720165802024-3bdaa5a8-ff29-4dc6-8939-d5aa6cede5e4.png)


::: code-group

```js [server.js(服务器)]
// 服务端核心代码（以express框架为例）
const express = require('express')
const app = express()
const port = 3000 // 端口号

const cars = ['奔驰', '宝马', 'Xiaomi']

app.get('/cars', (req, res) => {
    // 允许 http://127.0.0.1:5500 这个源发起跨域请求
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500')

    res.send(cars)
})

app.listen(port, () => {
    console.log('服务器启动')
})
```

```html [car.html(浏览器)]
<button onclick="getData()">获取汽车数据</button>
<script>
    // 向服务器请求数据
    const getData = async () => {
        const res = await axios.get('http://127.0.0.1:3000/cars')
        console.log(res.data)
    }
</script>
```
:::


::: details 利用 express中间件处理
```js
// 处理跨域中间件
function corsMiddleWare(req,res,next){
  // 允许 http://127.0.0.1:5500 这个源发起跨域请求
  res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500')
  
  // 允许所有源发起跨域请求（不建议，有危险）
  // res.setHeader('Access-Control-Allow-Origin','*')
  next()
}

// 配置路由并使用中间件
app.get('/cars', corsMiddleWare, (req,res)=>{
  res.send(cars)
})
```
:::


### 4.4. CORS 解决复杂请求

::: tip 关于预检请求
 - 前提：`简单请求`不会触发 CORS 预检请求。
 - 发送时机：预检请求在实际跨域请求之前发出，是由浏览器自动发起的。
 - 主要作用：用于向服务器确认是否允许接下来的跨域请求。
 - 基本流程：先发起`OPTIONS`请求，如果通过预检，继续发起实际的跨域请求。
 - 请求头内容：一个`OPTIONS`预检请求，通常会包含如下请求头：

|              请求头              |                  含义                  |
| :------------------------------: | :------------------------------------: |
|             `Origin`             |              发起请求的源              |
| `Access-Control-Request-Method`  |          实际请求的 HTTP 方法          |
| `Access-Control-Request-Headers` | 实际请求中使用的自定义头（如果有的话） |
:::

1. 第一步：服务器先通过浏览器的预检请求，服务器需要返回如下响应头：

|             响应头             |              含义              |
| :----------------------------: | :----------------------------: |
| `Access-Control-Allow-Origin`  |            允许的源            |
| `Access-Control-Allow-Methods` |           允许的方法           |
| `Access-Control-Allow-Headers` |         允许的自定义头         |
|    `Access-Control-Max-Age`    | 预检请求的结果缓存时间（可选） |

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/cross_domain/1720165070779-e4d5df36-989b-40c5-8dc8-3b3dc8f224fb.png)

2. 第二步：处理实际的跨域请求（与处理简单请求跨域的方式相同）

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/cross_domain/1720165802024-3bdaa5a8-ff29-4dc6-8939-d5aa6cede5e4-1721540505397-12.png)

服务端核心代码：

```js
// 处理预检请求
app.options('/cars', (req, res) => {
  // 设置允许的跨域请求源
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  // 设置允许的请求方法
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  // 设置允许的请求头
  res.setHeader('Access-Control-Allow-Headers', 'car')
  // 设置预检请求的缓存时间（可选）
  res.setHeader('Access-Control-Max-Age', 7200)
  // 发送响应
  res.send()
})

// 处理实际请求
app.get('/cars', (req, res) => {
  // 设置允许的跨域请求源
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  // 随便设置一个自定义响应头
  res.setHeader('abc',123)
  // 设置允许暴露给客户端的响应头
  res.setHeader('Access-Control-Expose-Headers', 'abc')
  // 发送响应数据
  res.send(cars)
})
```


### 4.5. 借助 cors 库快速配置

上述的配置中需要自己配置响应头，或者需要自己手动封装中间件，借助[cors](https://www.npmjs.com/package/cors)库，可以更方便完成配置

- 安装`cors`
``` bash
npm i cors
```

- 简单配置`cors`
```js
app.use(cors())
```

- 完整配置`cors`
```js
// cors中间件配置
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // 允许的源
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'], // 允许的方法
  allowedHeaders: ['car'], // 允许的自定义头
  exposedHeaders: ['abc'], // 要暴露的响应头
  optionsSuccessStatus: 200 // 预检请求成功的状态码
}

app.use(cors(corsOptions)) // 使用cors中间件
```



## 5. JSONP 解决跨域问题

1. JSONP 概述： JSONP 是利用了`<script>`标签可以跨域加载脚本，且不受严格限制的特性，早期一些浏览器不支持 CORS 的时，可以靠 JSONP 解决跨域。

::: warning 注意
 JSONP只能处理GET请求，因为标签发出去的请求都是get请求
:::

2. 基本流程：
   - 第一步：客户端创建一个`<script>`标签，并将其`src`属性设置为包含跨域请求的 URL，同时准备一个回调函数，这个回调函数用于处理返回的数据。
   - 第二步：服务端接收到请求后，将数据封装在回调函数中并返回。
   - 第三步：客户端的回调函数被调用，数据以参数的形势传入回调函数。

3. 图示：

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/cross_domain/1720167287059-88ee3857-60a8-4e68-ba50-2ec0f38e6cb0.png)

4. 代码示例：

::: code-group

```js [server.js(服务器)]
const express = require('express')
const app = express()
const port = 3000
// 数据
const cars = ['奔驰', '宝马', 'Xiaomi']

app.get('/cars', (req, res) => {
    res.send(`callback(${JSON.stringify(cars)})`)
})

app.listen(port, () => {
    console.log('服务器启动')
})
```

```html [car.html(浏览器)]
<button onclick="getCars()">获取数据</button>

<script>
  // 回调
  function callback(data) {
    console.log('获取到数据啦~~~')
    console.log(data)
  }

  function getCars() {
    // 创建script元素
    const script = document.createElement('script')
    // 指定script的src属性
    script.src = 'http://127.0.0.1:3000/cars'
    // 将script元素添加到body中触发脚本加载
    document.body.appendChild(script)
    // script标签加载完毕后移除该标签
    script.onload = () => {
      script.remove()
    }
  }
</script>
```
:::

5. [jQuery](https://jquery.com/) 使用 jsonp

```html
<head>
  <script src="./jquery-3.7.1.min.js"></script>
</head>

<body>
  <button onclick="getCars()">获取汽车数据</button>
  <script>
      function getCars() {
          $.getJSON('http://127.0.0.1:3000/cars?callback=?', (data) => {
              console.log(data)
          })
      }
  </script>
</body>
```

## 6. 配置代理解决跨域

### 6.1. 自己配置代理服务器

实例：借助 `http-proxy-middleware` 配置代理服务器，获取今日头条数据

第一步: 安装第三方插件
```bash
npm i http-proxy-middleware
```
第二步：配置代理服务器
```js
const express = require('express')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware');

// 配置静态资源让网页和代理服务器同源
app.use(express.static('public'))

// 代理服务器: http://127.0.0.1:8080
// 网页: http://127.0.0.1:8080/car.html

// 代理服务器
app.use('/api', createProxyMiddleware({
    target: 'https://www.toutiao.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '' // 去掉/api 拼接 target 转发到 toutiao
    }
}))

// http://127.0.0.1:8080
app.listen(8080, () => {
    console.log('Proxy server startup')
})
```

第三步：获取数据并打印
```html
<!-- 该页面在代理服务器的静态资源中 -->
<button onclick="getData()">获取头条数据</button>
<script>
    const getData = async () => {
        // 通过代理服务器转发到toutiao获取数据
        const res = await axios.get('http://127.0.0.1:8080/api/hot-event/hot-board/?origin=toutiao_pc')
        
        console.log(res.data)
    }
</script>
```

::: tip 想一想
假如上述的代理服务器就是项目的脚手架提供的呢？
:::

### 6.2. Nginx 搭建代理服务器



### 6.3. 脚手架搭建服务器



