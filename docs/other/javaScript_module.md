## 1. 模块化概述

JavaScript 模块化是指将复杂的JavaScript应用程序分解成更小、更可管理的代码块，这些代码块被称为模块。这些模块可以独立编写和维护，然后在应用程序中组合使用。模块化的好处有很多，包括更好的代码组织、可重用性、更好的错误隔离和性能优化等。

- 将程序文件依据一定规则拆分成多个文件，这种编码方式就是模块化的编码方式。
- 拆分出来每个文件就是一个模块，模块中的数据都是私有的，模块之间互相隔离。
- 同时也能通过一些手段，可以把模块内的指定数据“交出去”，供其他模块使用。

## 2. 为什么模块化

随着应用的复杂度越来越高，其代码量和文件数量都会急剧增加，会逐渐引发以下问题：

- 全局污染问题
- 依赖混乱问题
- 数据安全问题

## 3. 有哪些模块化规范？

2009 年，随着 Node.js 的出现，JavaScript 在服务器端的应用逐渐增多，为了让 Node.js 的代码更好维护，就必须要制定一种 Node.js 环境下的模块化规范，来自 Mozilla 的工程师 Kevin Dangoor 提出了 CommonJS 规范（CommonJS 初期的名字叫 ServerJS），随后 Node.js 社区采纳了这一规范。

随着时间的推移，针对 JavaScript 的不同运行环境，相继出现了多种模块化规范，按时间排序，分别为：
::: tip

- CommonJS —— 服务端应用广泛 :white_check_mark:
- AMD :x:
- CMD :x:
- ES6 模块化 —— 浏览器端应用广泛 :white_check_mark:
  :::

## 4. 导入与导出的概念

模块化的核心思想就是：模块之间是隔离的，通过导入和导出进行数据和功能的共享。

- 导出（暴露）：模块公开其内部的一部分(变量、函数等)，使这些内容可以被其他模块使用。
- 导入（引入）：模块引入和使用其他模块导出的内容，以重用代码和功能。

![](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/javaScript_module/module1-2.jpg)

## 5. CommonJS 模块化规范

### 5.1 初步体验

::: code-group

```js [school.js]
const name = 'Ren'
const slogan = '知识的海洋！'

function getTel (){
  return '0110'
}

function getCities(){
  return ['北京','上海','广州','深圳']
}

// 通过给exports对象添加属性的方式，来导出数据（注意：此处没有导出getCities）
exports.name = name
exports.slogan = slogan
exports.getTel = getTel
```

```js [student.js]
const name = 'JY'
const motto = '相信明天会更好！'

function getTel (){
  return '13899999999'
}

function getHobby(){
  return ['自信','帅气','勇敢']
}

// 通过给exports对象添加属性的方式，来导出数据（注意：此处没有导出getHobby）
exports.name = name
exports.motto = motto
exports.getTel = getTel
```

```js [index.js]
// 引入school模块暴露的所有内容
const school = require('./school')

// 引入student模块暴露的所有内容
const student = require('./student')
```

:::

### 5.2 导出数据

在 CommonJS 标准中，导出数据有两种方式：

- 第一种方式：module.exports = value
- 第二种方式：exports.name = value

::: danger 注意点如下：

1. 每个模块内部的：`this`、 `exports`、 `modules.exports` 在初始时，都指向 **同一个** 空对象，该空对象就是当前模块导出的数据，如下图：![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/javaScript_module/CJS.png)
2. 无论如何修改导出对象，最终导出的都是`module.exports`的值。
3. `exports`是对`module.exports`的初始引用，仅为了方便给导出象添加属性，所以不能使用`exports = value`的形式导出数据，但是可以使用`module.exports = xxxx`导出数据。
   :::

### 5.3 导入数据

在`CommonJS`模块化标准中，使用内置的`require`函数进行导入数据

```js
// 直接引入模块
const school = require('./school')

// 引入同时解构出要用的数据
const { name, slogan, getTel } = require('./school')

// 引入同时解构+重命名
const {name:stuName,motto,getTel:stuTel} = require('./student')
```

### 5.4 扩展知识

一个 JS 模块在执行时，是被包裹在一个内置函数中执行的，所以每个模块都有自己的作用域，我们可以通过如下方式验证这一说法：

```js
// arguments 是一个包含所有传递给函数的参数，的类数组对象。
console.log(arguments)
// arguments.callee 指向参数所属的当前执行的函数（已弃用）。
console.log(arguments.callee.toString())
```

内置函数的大致形式如下：

```js
function (exports, require, module, __filename, __dirname){
/*******模块中的代码********/
  const name = 'Ren'

  exports.name = name
}
```

### 5.5 浏览器运行

Node.js 默认是支持 CommonJS 规范的，但浏览器端不支持，所以需要经过编译，步骤如下：

- 第一步：全局安装 [browserify](https://browserify.org/)

```bash
npm i browserify -g
```

- 第二步：编译

```bash
# index.js 是源文件，build.js 是输出的目标文件
browserify index.js -o build.js
```

- 第三步：页面中引入使用

```html
<script type="text/javascript" src="./build.js"></script>
```

## 6. ES6 模块化规范

ES6 模块化规范是一个 **官方标准** 的规范，它是在语言标准的层面上实现了模块化功能，是目前 **最流行的** 模块化规范，且浏览器与服务端均支持该规范。

### 6.1 初步体验

::: code-group

```js [hospital.js]
// 导出name
export let name = '北京人民医院'
// 导出slogan
export const slogan = '全天下最好的医院'

// 导出getTel
export function getTel (){
  return '0110'
}
```

```js [doctor.js]
// 导出name
export const name = '张三'
// 导出motto
export const motto = '治好所有病人'

// 导出getTel
export function getTel (){
  return '13899999999'
}
```

```js [index.js]
// 引入hospital模块暴露的所有内容
import * as hospital from './hospital.js'

// 引入doctor模块暴露的所有内容
import * as doctor from './doctor.js'
```

```html [index.html]
<!-- 注意 type 要设置为 module -->
<script type="module" src="./index.js"></script>
```

:::

### 6.2 Node 中运行 ES6 模块

Node.js 中运行 ES6 模块代码有两种方式：

- 方式一：将`JavaScript`文件后缀从`.js` 改为`.mjs`，Node 则会自动识别 ES6 模块。
- 方式二：在`package.json`中设置`type`属性值为`module`。

### 6.3 导出数据

ES6 模块化提供 3 种导出方式：①分别导出、②统一导出、③默认导出

①分别导出

```js
// 导出name
export let name = '北京人民医院'
// 导出slogan
export const slogan = '全天下最好的医院'

// 导出getTel
export function getTel (){
  return '0110'
}
```

②统一导出

```js
let name = '北京人民医院'
const slogan = '全天下最好的医院'

function getTel (){
  return '0110'
}

// 统一导出了: name,slogan,getTal
export {name, slogan, getTel}
```

③默认导出

```js
const name = '张三'
const motto = '治好所有病人'

function getTel (){
  return '13899999999'
}

//默认导出：name,motto,getTel
export default {name,motto,getTel}
```

::: warning
上述多种导出方式可以混合使用

```js
// 导出name ———— 分别导出
export const name = '李华'
const motto = '治好所有病人'

function getTel (){
  return '13899999999'
}

// 导出motto ———— 统一导出
export {motto}
// 导出getTel ———— 默认导出
export default getTel
```

:::

### 6.4 导入数据

::: danger
对于 ES6 模块化来说，使用何种导入方式，要根据 **导出方式** 决定。
:::

①导入全部（通用）

```js
// 可以将模块中的所有导出内容整合到一个对象中。
import * as hospital from './hospital.js'
```

②命名导入（分别导出、统一导出）

```js
import { name,slogan,getTel } from './school.js'

// 也可通过as重命名
import { name as myName,slogan,getTel } from './school.js'
```

③默认导入（默认导出）

```js
// 名字可以修改，不是必须为student
import student from './student.js'
```

④命名导入 与 默认导入 混合使用
::: details 点击我查看代码
第一步：导出数据

```js
// 分别导出
export const name = '李华'
export const motto = '治好所有病人'

function getTel (){
  return '13899999999'
}
// 默认导出
export default getTel
```

第二步：导入数据

```js
// 默认导入的内容,必须放在前方
import getTel, {name, motto} from './doctor.js'
```

:::

⑤动态导入（通用）

```html
// 允许在运行时按需加载模块，返回值是一个 Promise。
<button class="btn">点击导入</button>
<script type="module">
    document.querySelector('.btn').addEventListener('click', async () => {
        const student = await import('./student.js')
        console.log(student)
    })
</script>
```

⑥import 可以不接收任何数据

```js
// 例如只是让 hello.js 参与运行
import './hello.js'
```

### 6.5 ES Module 符号绑定

在ES Module中，当使用import语句从另一个模块导入变量、函数或类等成员时，这些成员在导入模块中的引用会与导出模块中的原始定义建立一种绑定关系。这种绑定关系保证了导入模块中引用的变量或函数等，能够实时反映导出模块中对应成员的变化（如果导出的是可变绑定的话）。

思考如下面代码会输出什么？
::: code-group

```js [模块1]
import { counter, increase} from "./2.js"

console.log(counter)
increase()
increase()
console.log(counter)
```

```js [模块2]
export let counter = 1

export function increase() {
    counter++
}
```

:::

::: details 输出结果

```
1
3
```

:::

::: danger 危险

- 模块1 中的counter 与 模块2 中的 counter 是一个东西（共用一个内存空间）
- ES Module 符号绑定：两个符号共用一块内存空间
- 使用 const 关键字 （从根上解决）
- CommonJS 规范 是复制不会出现以上问题
  :::

## 7. AMD 模块化规范

### 7.1 环境准备

第一步：准备文件结构：
![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/javaScript_module/AMD.png)

::: info

1. js 文件夹中存放业务逻辑代码，`main.js`用于汇总各模块。
2. libs 中存放的是第三方库，例如必须要用的 [require.js](https://requirejs.org/)。
   :::

第二步：在`index.html`中配置`main.js`与`require.js`

```html
<!-- index.html -->
<script data-main="./js/main.js" src="./libs/require.js"></script>
```

第三步：在`main.js`中编写模块配置对象，注册所有模块。

```js
// main.js
/*AMD_require.js模块化的入口文件，要编写配置对象，并且有固定的写法*/
requirejs.config({
  //基本路径
  baseUrl: "./js",
  
  //模块标识名与模块路径映射
  paths: {
    school: "school",
    student: "student",
    welcome: "welcome",
  }
})
```

### 7.2 导出数据

AMD 规范使用`define`函数来定义模块和导出数据

```js
// student.js
define(function(){
  const name = '李四'
  const motto = '知识是进步的阶梯'

  function getTel (){
    return '13899999999'
  }

  // 导出数据
  return {name,motto,getTel}
})
```

### 7.3 导入数据

如需导入数据，则需要`define`传入两个参数，分别为：(`依赖项数组`, `回调函数`)

```js
// school.js
// ['welcome']表示当前模块要依赖的模块名字
// 回调接收到的welcome是模块导出的数据

define(['welcome'],function(welcome){
  const name = '神仙中学'
  const slogan = '让所有学生封神'

  function getTel (){
    return '0110'
  }

  // 导出数据
  return {name,slogan,getTel}
})
```

### 7.4 使用模块

```js
// main.js
requirejs(['school','student'],function(school,student){
  console.log('main',school)
  console.log('main',student)
})
```

## 8. CMD 模块化规范

### 8.1 环境准备

第一步：准备文件结构
![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/javaScript_module/CMD.png)
::: info

1. js 文件夹中存放业务逻辑代码，`main.js`用于汇总各模块。
2. libs 中存放的是第三方库，例如必须要用的 [sea.js](https://seajs.github.io/seajs/docs/)。
   :::

第二步：在index.html中配置`main.js`与`sea.js`

```html
<!-- index.html -->
<script type="text/javascript" src="./libs/sea.js"></script>

<script type="text/javascript">
  seajs.use('./modules/main.js')
</script>
```

### 8.2 导出数据

CMD 中同样使用`define`函数定义模块并导出数据

```js
// school.js
/* 
  收到的三个参数分别为：require、exports、module
    1. require用于引入其他模块
    2. exports、module用于导出数据
*/
define(function(require,exports,module){
  const name = 'RenSchool'
  const slogan = '赶紧学起来'

  function getTel (){
    return '0110'
  }
  
  // 导出数据
  module.exports = {name,slogan,getTel}
})
```

### 8.3 导入数据

CMD 规范中使用收到的`require`参数进行模块导入

```js
// student.js
define(function(require,exports,module){
  const name = '张三'
  const motto = '相信明天会更好！'

  // 引入welcome模块
  const welcome = require('./welcome')
  console.log(welcome)

  function getTel (){
    return '13899999999'
  }
  
  exports.name = name
  exports.motto = motto
  exports.getTel = getTel
})
```

### 8.4 使用模块

```js
// main.js
define(function(require){
  const school = require('./school')
  const student = require('./student')

  // 使用模块
  console.log(school)
  console.log(student)
})
```
