## 1. 简介

![image-20240815132804883](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/express/202408151328904.png)

Express是一个基于 Node.js 的轻量级 Web 应用框架，因其简洁性和灵活性而广受欢迎。它提供了一组简单的工具，用于快速创建 Web 应用。

中文地址：[https://www.expressjs.com.cn](https://www.expressjs.com.cn/)

## 2. 创建 Express 应用

第一步：安装 express

```shell
npm install express
```

第二步：创建服务

```js
// 1. 导入 express
const express = require('express')

// 2. 创建应用对象
const app = express()
const port = 3000

// 3. 创建一组响应规则（路由规则）
app.get('/', (req, res) => {
  // 注意send方法是express所提供的(会根据响应的内容，自动设置响应头)
  res.send('Hello World!')
})

//4. 监听端口 启动服务
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

```

## 3. 路由

一个路由的组成有：**请求方法**、**路径**、**回调函数**，这三部分组成。

`express` 中提供了一系列方法，可以很方便的使用路由，格式如下：

```js
app.<method>(path, callback)

app.请求方法(路径, 回调函数)
```

### 3.1 基本使用

```js
// 对主页进行响应
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 创建 post 路由
app.post('/', (req, res) => {
  res.send('Got a POST request')
})

// 匹配所有的请求方法
app.all('/search', (req, res) => {
  res.send('search request')
})

// 自定义 404 路由
app.all("*", (req, res) => {
  res.send('<h1>404 Not Found</h1>')
})
```

### 3.2 路由模块化

express 中的 Router 是一个完整的中间件和路由系统，可以看做是一个小型的 app 对象，它可以对路由进行模块化拆分，能更好的管理路由。

创建`home.js`文件： 

```js
const express = require('express')
const router = express.Router()

// 使用中间件
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// 定义主页路由：/home
router.get('/', function (req, res) {
  res.send('Home page')
})
// 定义关于路由：//birds/about
router.get('/about', function (req, res) {
  res.send('About page')
})

module.exports = router
```

主文件引入使用

```js
const express = require('express')
const app = express()

const home = require('./routes/home')

app.use('/home', home) // 此处路由会与home文件拼接

app.listen(8090, ()=> {
  console.log('启动成功')
})
```



## 4. 参数获取

**4.1** **获取请求参数**

express 框架封装了一些 API 来方便获取请求报文中的数据，并且兼容原生 HTTP 模块

```js
app.get('/search', (req, res) => {
  // 1.兼容的原生 HTTP 模块获取方式
  console.log(req.method)
  console.log(req.url)
  console.log(req.httpVersion)
  console.log(req.headers)

  // 2. express 独有的获取报文的方式
  console.log(req.query) // 获取query
  console.log(req.get('host')) // 获取指定的请求头

  res.send('search request')
})
```

**4.2** **获取路由参数**

params 参数又称路由参数，指的是 URL 路径中的参数。

```js
// id相当于占位符
app.get('/:id.html', (req, res) => {
	console.log(req.params.id)
})
```

**4.3 获取请求体参数**

请见6.4

## 5. 响应设置

express 框架封装了一些 API 来方便给客户端响应数据，并且兼容原生 HTTP 模块

```js
app.get('/search', (req, res) => {
  // 1. 兼容 HTTP 模块的方式
  res.statusCode = 404
  res.statusMessage = 'xxx'
  res.setHeader('abc','xyz')
  res.write('响应体')
  res.end('xxx')
  
  // 2. express 的响应方法
  res.status(500)// 设置响应状态码
  res.set('xxx','yyy')// 设置响应头
  res.send('中文响应不乱码')// 设置响应体
  // 连贯操作
  res.status(404).set('xxx','yyy').send('hello')
  
  // 3. 其他响应
  res.redirect('http://douyin.com')// 重定向
  res.download('./package.json')// 下载响应
  res.json()// 响应 JSON
  res.sendFile(__dirname + '/home.html')// 响应文件内容
})
```



## 6. 中间件

- 中间件（Middleware）本质是一个回调函数
- 中间件函数 可以像路由回调一样访问 请求对象（request） ， 响应对象（response）
- 作用：就是使用函数封装公共操作，简化代码
- 类型：全局中间件、路由中间件

### 6.1 全局中间件

每个请求到达服务端之后，都会执行全局中间件，在全局中间件中可以编写额外的处理逻辑。

**定义中间件**

```js
function middle (request,response,next){
  // 实现功能代码.....
  next() // 执行next函数(如果想执行中间件后，仍执行路由中的回调函数，必须调用next)
}
```

**使用中间件**

```js
app.use(middle)
```

**匿名写法**

```js
app.use(function (request, response, next) {
  console.log('我是匿名中间件')
  next();
})
```

**多个中间件**

```js
function middle1 (request,response,next){
  /*******/
  next()
}

function middle2 (request,response,next){
  /*******/
  next()
}

app.use(middle1)
app.use(middle2)
```

### 6.2 路由中间件

如果只需要对某一些路由进行功能封装，则就需要路由中间件

```js
app.get('/路径',`中间件函数`, (request,response) => {
  
})
app.get('/路径',`中间件函数1`,`中间件函数2`, (request,response) => {
  
})
```

### 6.3 配置静态资源

```js
const express = require('express')
const app = express()

// 静态资源中间件的设置，将当前文件夹下的public目录作为网站的根目录
app.use(express.static('./public'))
/*
  如果访问的内容经常变化，还是需要设置路由
  但是，在这里有一个问题，如果public目录下有index.html文件，单独也有index.html的路由，
  则谁书写在前，优先执行谁
*/
app.get('/index.html',(request,response)=>{
  respsonse.send('首页')
})

//监听端口
app.listen(8090,()=>{
  console.log('8090 端口启动....')
})
```

:::warning 注意

1. index.html 文件为默认打开的资源

2. 如果静态资源与路由规则同时匹配，谁先匹配谁就响应

3. 路由响应动态资源，静态资源中间件响应静态资源

:::

### 6.4 获取请求体数据

第一步：使用`express.urlencoded`和`express.json`中间件解析请求体。

```js
// 处理 querystring 格式的请求体
let urlParser = express.urlencoded({extended:false})
// 处理 JSON 格式的请求体
let jsonParser = express.json()
```

第二步：设置路由中间件，然后使用 `req.body`来获取请求体数据。

```js
app.post('/login', urlParser, (req,res) => {
  // 获取请求体数据
  console.log(req.body)

  // console.log(req.body.username)
  // console.log(req.body.password)

  res.send('获取请求体数据')
})

// 输入结果如下
{ username: 'root', password: '123456' }
```

:::danger 注意

- Express 4.16.0 及以上版本中内置了`express.urlencoded()`与`express.json()`函数
- 如果是基于4.16.0 以下版本的老项目，可采用 [body-parser](https://www.npmjs.com/package/body-parser)库来解析请求体

先执行`npm i body-parser`命令安装，代码如下：

```js
// 导入包
const bodyParser = require('body-parser')

// 处理 querystring 格式的请求体
let urlParser = bodyParser.urlencoded({extended:false}))

// 处理 JSON 格式的请求体
let jsonParser = bodyParser.json()

app.post('/login', urlParser, (req, res) => {
  console.log(req.body)
  res.send('获取请求体数据')
})
```

:::



## 7. 服务端渲染（模版引擎）

服务端渲染（Server-Side Rendering, SSR）指的是在服务器端将动态页面直接渲染成HTML后再传输到客户端。它的主要原理是使用服务器端的程序（如Node.js、Express、Ruby on Rails等）动态生成HTML页面，并在页面内容完全生成后将页面返回给客户端。这种方式的好处是**提高首屏加载速度**、有利于**搜索引擎优化（SEO）** 等。

模版引擎（Template Engine）是为了使用户界面与业务数据（内容）分离而产生的工具。它可以生成特定格式的文档，如HTML文档。在Web开发中，模版引擎会根据预定义的模板和数据生成最终的HTML页面。

:::warning 区别

服务端渲染是一个更广泛的概念，它描述了在服务器端生成HTML页面的过程；而模板引擎是实现这一过程的具体工具之一，它专注于将静态HTML与动态数据结合，生成最终的HTML页面。两者在Web开发中常常相互结合使用，以提高开发效率和页面性能。

:::

### 7.1 EJS 模板引擎

![image-20240816105548323](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/express/202408161055412.png)

[EJS](https://ejs.co/) 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面。EJS 没有如何组织内容的教条；也没有再造一套迭代和控制流语法；有的只是普通的 JavaScript 代码而已。

- 中文网：https://ejs.bootcss.com/

### 7.2 EJS 基本使用

**安装EJS**

```shell
npm install ejs
```

**使用模板**

```js
// 导入EJS
const ejs = require('ejs')
// 定义数据
const people = ['geddy', 'neil', 'alex']
// 使用模板
const html = ejs.render('<%= people.join(",") %>', {people: people})

console.log(html) // geddy,neil,alex
```

**单独使用模板文件**

:::tip 提示

先定义模板文件：`/views/student.ejs`中使用特定的ejs语法

```
<h1>学校名称：<%=school %></h1>
```

:::

代码示列：

```js
const express = require('express')
const {resolve} = require('path')
const app = express()

app.get('/students', (req, res) => {
  const school = '麻省理工学院'
  // 在获取ejs模板绝对路径
  const fileUrl = resolve(__dirname,'./views/students.ejs')
  
  // 渲染绝对路径对应的【.ejs】文件，且解析过程中使用school数据
  res.render(fileUrl,{school})
})

app.listen(8090, () => {
  console.log('服务器启动成功！')
})
```

### 7.3 EJS 全局配置

指定默认的：**模板引擎**、**模板位置**

```js
const express = require('express') 
const app = express()

// 配置模板引擎 // [!code focus:4]
app.set('view engine', 'ejs') 
// 配置模板位置
app.set('views', './views')

app.get('/students', (req, res) => {
  const school = '麻省理工学院'
  // 解析过程中使用school数据
  res.render('students',{school})
})
```

### 7.4 常用语法

输出转义的数据到模板上

```
<%= code %>
```

执行JS代码

```
<% code %>
```

```
<body>
  <h1>学校名称：<%=school %> </h1>
  <h2>学生列表：</h2>
  <ul>
    <% subject.forEach(item=> { %>
      <li>
        <%= item %>
      </li>
      <% }); %>
  </ul>
</body>
```

> 查看更多语法请到：[EJS文档](https://ejs.bootcss.com/#docs)
>

## 8. Express 应用程序生成器

通过应用生成器工具 `express-generator` 可以快速创建一个应用的骨架。

你可以通过 `npx` （包含在 Node.js 8.2.0 及更高版本中）命令来运行 Express 应用程序生成器。

```shell
npx express-generator

# 在当前目录下创建一个应用，并设置模版引擎为ejs
npx express-generator -e
```

对于较老的 Node 版本，先通过 npm 将 Express 应用程序生成器安装到全局环境

```shell
# 安装全局
npm install -g express-generator

# express命令参数
express [options] [dir]

# 在当前目录下创建一个应用，并设置模版引擎为ejs
express -e
```

在项目根目录执行以下命令

```shell
# 安装所有依赖
npm install

# 启动项目
npm start
```

然后在浏览器中打开 `http://localhost:3000/` 网址就可以看到这个应用了。

通过生成器创建的应用一般都有如下目录结构：

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

> [express-generator 中文文档](https://www.expressjs.com.cn/starter/generator.html)
