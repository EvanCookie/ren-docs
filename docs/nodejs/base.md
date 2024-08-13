## 一、JavaScript 运行时

所谓 JavaScript 运行时（JavaScript runtime）其实就是代码执行环境，最常见的 JavaScript 运行时就是浏览器，但除了浏览器环境，JavaScript 也可以在其他环境下运行。

最初，JavaScript 主要在浏览器中使用，用于增强网页的交互性。但随着时间的推移，出现了如多种服务器端 JavaScript 运行时，使得 JavaScript 能够用于服务器端编程，极大程度扩展了它的应用范围。


| **运行时**                                                   | **官网**                                   | **简介**                                                     |
| ------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------ |
| ![image-20240810105220201](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/node_base/202408101055910.png) | [https://nodejs.org/](https://nodejs.org/) | 由 Ryan Dahl 开发，于 2009年发布，通过 Google 的 V8 引擎实现运行 JS，Node 的出现让 JS 不再限于浏览器，极大扩展了 JS 的应用范围，Node 的一个显著特点是非阻塞的事件驱动架构，适合处理高并发的网络应用。 |
| ![image-20240810105551586](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/node_base/202408101055640.png) | [https://deno.com/](https://deno.com/)     | Deno 也是由 Ryan Dahl 开发，Deno 使用 Rust 语言开发，于2018年首次亮相，Deno 的设计理念是克服 Node 的一些不足之处，例如：Deno 默认禁止文件、网络和环境访问，除非明确的授权。 |
| ![image-20240810105610102](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/node_base/202408101056137.png) | [https://bun.sh/](https://bun.sh/)         | Bun 是一个全新的 JavaScript 运行时，由 Jarred Sumner 开发，于2022 年首次亮相，它的目标是成为速度最快的 JS 运行时，Bun 使用 Zig 语言编写，自带了一个快速的 JS 引擎，支持： TypeScript、JSX。 |



## 二、Node.js 简介

Node 是基于 **Chrome V8** 引擎的 JavaScript 运行时，由 Ryan Dahl 于2009年发布，通过 Google 的 V8 引擎实现运行 JavaScript，Node 的出现让 JavaScript 不再局限于浏览器，极大扩展了 JavaScript 的应用范围，Node 的一个显著特点是**非阻塞的事件驱动架构**，适合处理高并发的网络应用。

官方地址：[https://nodejs.org](https://nodejs.org/)，Node 可以用来开发各种应用，例如：

- 工具类应用（webpack、vite、babel、eslint 等）
- 服务端应用（网页、App 的各种服务器等）
- 桌面端应用（VSCode、Figma、Postman 等）



## 三、下载与安装

**下载地址：** https://nodejs.org/en/download/prebuilt-installer

![image-20240810110143069](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/node_base/202408101101111.png)

**安装步骤如下：**

- 双击安装文件，依次选择『 下一步 』即可，默认的安装路径是 `C:\Program Files\nodejs`。
- 安装完成后，在 CMD 命令行窗口下运行 `node -v`，如显示版本号则证明安装成功。

![image-20240810110601680](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/node_base/202408101106712.png)



## 四、Node运行js文件

首先创建文件 `hello.js` ，内容如下：

```js
console.log('Hello Node.js')
```

在 Node.js 环境下运行代码：

**方式一：** 在文件夹上方的路径中，直接输入 cmd ，随后输入 『 node hello.js 』即可。

**方式二：** 使用  vscode 自带的命令行窗口 ，输入『 node hello.js 』即可。

**方式三：** 在vscode安装插件 『code Runner』, 文件右键 -> 选择 『run code』。

**实时运行Node**

```bash
# 安装nodemon全局包
npm install -g nodemon 

# 运行文件
nodemon [your node app]
```

:::danger 注意
在 Node.js 环境下，没有 BOM 和 DOM ，全局对象的名字叫 global，没有 window。
:::



## 五、fs模块

`fs`全称为 `fileSystem`（文件系统），是 Node.js 中**内置的一个模块**，可以操作计算机中的文件，文件操作是服务器的基本能力之一。

### 1. 文件写入

:white_check_mark:异步写入

- 语法：`fs.writeFile(file, data[, options], callback)`
- 返回值： `undefined`
- 代码示例：

```js
// require 是 Node 中的内置函数，用来导入模块
const fs = require('fs');

fs.writeFile('./土味情话.txt', '你是我的土豆，又土又逗。', err => {
  // err是回调参数，若写入成功值为null，若写入失败值为错误对象
  if(err){
    console.log('写入失败，原因：' + err);
  }else{
    console.log('写入成功');
  }
});
```

- 可选配置说明：

```js
/* 
  encoding配置文件编码，例如：uft8、ascii、base64 等等，默认值为：utf8。
  flag用于配置文件操作，例如：w（写入模式）、a（追加模式） 等等，默认值为：w。
  mode用于设置文件权限，例如：0o666（可读可写）、0o444（只读），默认值为：0o666。
*/
fs.writeFile(file, data,{encoding: 'utf8',flag:'a',mode:0o666},callback);
```

:white_check_mark:同步写入

- 语法:  `fs.writeFileSync(file, data[, options])`，无需传入回调函数
- 返回值：`undefined`
- 代码示例：

```js
const fs = require('fs');

try {
  // 同步写入文件
  fs.writeFileSync('./土味情话.txt', '你是我的土豆，又土又逗。');
  console.log('文件写入成功')
} catch (error) {
  console.log('文件写入失败',error)
}
```
:::tip 小提示
- 若想要其他任务不被文件写入操作所阻塞，或要优化性能，则使用异步的 writeFile 方法。
- 若想要其他任务执行时确保文件写入完成，则使用同步的 writeFileSync 方法。
:::

### 2. 文件读取

:white_check_mark:异步读取

- 语法：`fs.readFile(path[, options], callback)`
- 返回值：`undefined`
- 代码示例：

```js
const fs = require('fs');

// err错误信息，data数据
fs.readFile('./土味情话.txt', (err, data) => {
  if(err) throw err;
  // 在读取时，若不指定字符编码，则data的值是一个Buffer对象
  console.log(data); // 输出的是Buffer对象
});


fs.readFile('./土味情话.txt', { encoding: 'utf8' }, (err, data) => {
  if (err) throw err;
  // 在读取时，若指定字符编码，则data的值是指定字符编码的内容
  console.log(data); // 输出的是utf8编码的文本内容
});
```

:white_check_mark:同步读取

- 语法：`fs.readFileSync(path[, options])`
- 返回值： `string | Buffer`
- 代码示例：

```js
const fs = require('fs')

let data1 = fs.readFileSync('./土味情话.txt');
let data2 = fs.readFileSync('./土味情话.txt', 'utf-8');

console.log(data1.toString())
console.log(data2)
```

### 3. 路径说明

相对路径写法如下：

| 写法       | 含义                           |
| ---------- | ------------------------------ |
| `./a.txt`  | 当前目录下的 a.txt             |
| `a.txt`    | 等价于上面的写法               |
| `../a.txt` | 当前目录的上一级目录中的 a.txt |

绝对路径写法如下：

| 写法           | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| `D:/test/demo` | windows 系统下的绝对路径                                     |
| `/usr/bin`     | Linux 系统下的绝对路径。在 windows 下也可以这样写，不过`/`指向当前磁盘的根目录 |

:::danger 注意
1. 相对路径相对的是命令行执行的位置（工作目录），而并非是文件的所在位置。
2. 所以当命令执行的目录，与文件所在目录不一致时，会出现一些 BUG。
:::

### 4. path 与 __dirname

`__dirname` 是 Node.js 环境中的内置变量，`__dirname`获取到的是当前执行脚本所在的目录的绝对路径，无需任何特殊声明就可以直接使用：

代码示例：

```js
let data = fs.writeFileSync(__dirname + '/土味情话.txt')
```

也可以借助内置的`path`模块进行更好的处理：

```js
const path = require('path')
let writePath = path.resolve(__dirname,'./土味情话.txt')

fs.writeFileSync(writePath);
```

> 使用 fs 模块的时候，尽量使用 __dirname 将路径转化为绝对路径，这样可以避免相对路径产生的 Bug。



## 六、http模块

`Node.js`的`http`模块是一个内置的核心模块，提供了一系列的功能用于处理`http`事务，通过该模块，开发者可以创建`http`服务器与客户端进行数据的交互。

### 1. 创建 HTTP 服务

使用 Node 内置的 http 模块创建服务

```js
// 引入http模块
const http = require('http')
const port = 8080

// 创建一个server服务
const server = http.createServer((request, response)=> {
// request是对请求报文的封装,值为一个对象，通过request可以获得请求报文的数据。
// response是对响应报文的封装,值为一个对象，通过response可以获得响应报文的数据。
    response.end('Hello Node.')
})

// 监听端口, 服务启动成功之后，回调函数会自动执行
server.listen(port,()=> {
    console.log('服务器已启动' + port);
})

// 若服务器启动失败，打印失败的原因
server.on('error',(err)=> {
    console.log('服务器启动失败：' + err);
})
```

> `http.createServer` 传入的回调函数，会在接收到 HTTP 请求的时候自动执行。

:::warning 注意

- 当服务启动后，代码若被修改必须重启服务，新代码才能生效 。

- 响应内容中文乱码的解决办法（配置响应头的 [mime](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) 类型）

```js
response.setHeader('content-type','text/plain;charset=utf-8');
```

- 出现如下警告，是端口号被占用了

```bash
Error: listen EADDRINUSE: address already in use ::8080
```

:::

### 2. 获取请求报文

:white_check_mark: 获取请求行

- 获取请求方式：`request.method`
- 获取请求路径：`request.url`
- 获取协议版本：`request.httpVersion`

```js
// 创建一个server服务
const server = http.createServer((request, response)=> {
  console.log(request.method)
  console.log(request.url)
  console.log(request.httpVersion)
  
  response.end('Hello Node.')
})
```

:white_check_mark: 获取请求头

```js
request.headers
```

:white_check_mark: 获取请求体

```js
const server = http.createServer((request, response) => {
  //创建reqbody数组用于存储请求体
  let reqbody = [];
  
  // 给request绑定data事件，用于接收请求体片段
  request
    .on('data', (chunk) => {
      //向reqbody中存入请求体片段
      reqbody.push(chunk);
    })
    // 给request绑定end事件，用于在接受请求体完毕后处理逻辑
    .on('end', () => {
      // 打印完整的请求体
      console.log(reqbody.toString());

      // 给客户端做出响应
      response.end("Hello Node.js");
    });
});

```

:::warning 注意

- `requestuest.url` 只能获取路径以及查询字符串参数，无法获取域名。 

- `requestuest.headers` 将请求头转化成一个对象，并将属性名都转化成了小写。

- 关于路径：如果请求时只填写了 IP 地址或者是域名信息，此时请求的路径为`/`。
- `favicon.ico`：是属于浏览器自动发送的请求 。

:::

