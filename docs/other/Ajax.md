## 1. 什么是Ajax

![image-20240814152255045](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/Ajax/202408141522082.png)

**AJAX**（Asynchronous [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) And [XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML)）是一种在 Web 应用中通过异步发送 HTTP 请求向服务器获取内容，并使用这些新内容更新页面中相关的部分，而无需重新加载整个页面的 Web 开发技术。

## 2. XMLHttpRequest

[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)（XHR）对象用于与服务器交互，通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL 来获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。XMLHttpRequest 只是实现 Ajax 的一种方式

### 2.1 基本使用

 实现 `Ajax`异步交互需要完成以下步骤：

1. 创建 `XMLHttpRequest` 对象

2. 通过 `XMLHttpRequest` 对象的 `open()` 方法与服务端建立连接

3. 构建请求所需的数据内容，并通过` XMLHttpRequest` 对象的 `send()` 方法发送给服务器端

4. 通过 `XMLHttpRequest` 对象提供的 `readystatechange、loadend` 事件监听服务器端的通信状态

代码如下：

```js
const xhr = new XMLHttpRequest()
  
xhr.open('GET', 'https://api.uomg.com/api/rand.qinghua?format=json')

xhr.onreadystatechange = function(){
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 打印数据
    console.log(xhr.response)
  }
}

xhr.send()
```

### 2.2 实例属性

```js
XMLHttpRequest.status // 返回响应数字状态码（0,200）
XMLHttpRequest.readyState // 返回代理当前所处的状态（0,1,2,3,4）
XMLHttpRequest.response // 返回响应的正文
```

> 更多属性查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState)

### 2.3 实例方法

如需将请求发送到服务器，我们使用 **XMLHttpRequest** 对象的 **open()** 和 **send()** 方法

**open()语法如下**

```js
XMLHttpRequest.open(method, url, async, user, password)
```

| 参数     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| method   | 表示当前的请求方式，常见的有 `GET`、`POST`、`PUT`、`DELETE`、等 |
| url      | 服务端地址                                                   |
| async    | 布尔值，表示是否异步执行操作（可选），默认为 *true*(异步)    |
| user     | 可选的用户名用于认证用途（可选）；默认为 *null*              |
| password | 可选的密码用于认证用途（可选），默认为 *null*                |

**send()语法如下**

```js
XMLHttpRequest.send(body) // body为请求体数据（如果 body 没有指定值，则默认值为 null）
```

:::tip 在 XHR 请求中要发送的数据体（body）可以是：

- 可以为 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document), 在这种情况下，它在发送之前被序列化。
- 从 [per the Fetch spec](https://fetch.spec.whatwg.org/#typedefdef-xmlhttprequestbodyinit) （规范中）可以是 [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、BufferSource、 [FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)、 [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)、 [USVString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象。

:::

**setRequestHeader()语法如下**

```js
// 设置 HTTP 请求头部的值。此方法必须在 open() 方法和 send() 之间调用
// header：标头的名称, value：标头正文的值
setRequestHeader(header, value) 
```

> 更多实例方法见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort)

### 2.4 事件

```js
// 旧写法
xhr.onreadystatechange = function(){
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 打印数据
    console.log(xhr.response)
  }
}

// 新写法
xhr.addEventListener('readystatechange', () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 在这里处理服务器的响应数据
    console.log(xhr.response)
  }
})
```

> 更多事件见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readystatechange_event)

### 2.5 扩展概念

**FormData**

Ajax 操作往往用来传递表单数据。为了方便表单处理，HTML5 新增了一个 FormData 对象，可以模拟表单，特别适用于发送包含文件上传等复杂数据的请求。使用 FormData 可以执行以下步骤：

```js
// 1. 创建一个 FormData 对象
const formData = new FormData()

// 2. 向 FormData 对象中添加字段
formData.append('username', 'EvanCookie')
formData.append('email', '2384485535@qq.com')

// 将 FormData 对象作为请求的 body 
xhr.send(formData)
```

> FormData 对象其他方法参考官网：[MDN-FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)



## 3. Fetch

`fetch()`是 XMLHttpRequest 的升级版，用于在 JavaScript 脚本里面发出 HTTP 请求。浏览器原生提供这个对象。语法如下：

```js
fetch(resource)
fetch(resource, options)
```

### 3.1 基本使用

`fetch()`接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象

基本用法如下：

```js
// 查询参数直接通过 ?、& 拼接
fetch('https://api.uomg.com/api/rand.qinghua?format=json').then(res => res.json())
.then(data => {
  // 打印数据
  console.log(data)
})
.catch(err => {
  console.log('Request Failed', err)
})
```

使用async & await 语法改写：

```js
async function getData() {
  try {
    const res = await fetch('https://api.uomg.com/api/rand.qinghua?format=json')
    const data = await res.json()
    // 打印数据
    console.log(data)
  } catch (error) {
    console.log('Request Failed', error)
  }
}

getData()
```

### 3.2 配置参数

`fetch()`的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求

- `fetch(resource, options)`

- post、put、patch、delete 用法类似
- HTTP 请求的方法、标头、数据体都在`options`这个对象里面设置
- 下面是一个示例：

```js
const res = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum' // 此处的body指的是POST 请求的数据体
})

const json = await res.json()
```

> 更多细节请查看：[MDN Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/fetch)
>
> 详细教程可查看阮一峰教程：[Fetch API 教程](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)



## 4. Fetch替代品Ky

![image-20240814183023613](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/Ajax/202408141830648.png)

[Ky](https://www.npmjs.com/package/ky) 是一个基于浏览器Fetch API的，小型优雅的HTTP客户端，具有以下特点：

- 零依赖，大小仅3.3K
- 跨运行时，支持在浏览器、Node.js、Deno等不同的运行环境中使用
- 支持创建实例 (类似`axios`的`axios.create`)
- 支持请求前后的`Hooks`钩子函数 (类似`axios`的`interceptors 拦截器`)
- 使用比`fetch`更加的简单便捷
- 支持超时设置、URL前缀、请求失败后自动重试等功能

> 更多详情见[Ky GitHub仓库](https://github.com/sindresorhus/ky)

示例代码：

```js
<script type="module">
import ky from 'https://cdn.jsdelivr.net/npm/ky@1.6.0/distribution/index.min.js'

async function getData() {
  const res = await ky.get('https://api.uomg.com/api/rand.qinghua?format=json').json()
  
  console.log(res)
}

getData()
</script>
```

> 类似ky的库有很多，如：[whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch)



## 5. Axios

![image-20240814184224987](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/other/Ajax/202408141842012.png)