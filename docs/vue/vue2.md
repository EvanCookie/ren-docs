---
outline: [1, 6]
---

# 1. Vue2 介绍

[Vue](https://v2.vuejs.org/) (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

# 2. Vue2 基础

## 2.1 初步认识

```html
<!-- dome.html -->
<body>
  <div id="app">
    <h1>Hello {{msg}}</h1>
  </div>
  <!-- 通过CDN引入vue -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.16"></script>
  <script>
    // 创建vue实例
    const vm = new Vue({
      el: "#app", // 指定容器
      data: {
        msg: "Vue2", // 数据
      },
    });
  </script>
</body>
```

## 2.2 模板语法

### 插值

**文本**

数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：

```html
<h1>Hello {{msg}}</h1>
```

**解析原始 HTML**

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html 指令：

```html
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

:::info
这个 span 的内容将会被替换成为 rawHtml 的值，如果直接使用插值{{}}语法 HTML——会忽略解析。
:::

**Attribute（属性）**

Mustache 语法不能作用在 HTML attribute (属性) 上，遇到这种情况应该使用 v-bind 指令：

```html
<div v-bind:id="myId"></div>
```

**使用 Javascript 表达式**

在我们的模板中，Vue.js 提供了完全的 JavaScript 表达式支持。

```html
<div>{{ number + 1 }}</div>

<div>{{ ok ? 'YES' : 'NO' }}</div>

<div>{{ message.split('').reverse().join('')}}</div>

<div v-bind:id="'list-' + id"></div>
```

### 指令

## 2.3 数据绑定

```html
<body>
  <div id="app">
    <!-- 普通写法 -->
    单项数据绑定：<input type="text" v-bind:value="name" /> <br />
    双向数据绑定：<input type="text" v-model:value="name" /> <br />
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.16"></script>
  <script>
    const vm = new Vue({
      el: "#app",
      data: {
        name: "Ren",
      },
    });
  </script>
</body>
```

:::warning 注意~~
`v-bind:value` 可简写为 `:value`

`v-model:value` 可简写为 `v-model`

```html
单项数据绑定：<input type="text" :value="name" /> <br />
双向数据绑定：<input type="text" v-model="name" /> <br />

<!-- 以下写法错误 v-model 只能用在表单类（输入的元素）上 -->
<h2 v-model:x="name">Ren</h2>
```

:::

## 2.4 MVVM 模型

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的：

```js
const vm = new Vue({
  // 选项
});
```

虽然没有完全遵循 [MVVM 模型](https://baike.baidu.com/item/MVVM/96310?fr=ge_ala)，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 `vm` (ViewModel 的缩写) 这个变量名表示 Vue 实例。

![image-20241010183514912](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/vue/vue2/202410101835252.webp)

- M：模型(Model) ：对应 data 中的数据
- V：视图(View) ：模板
- VM：视图模型(ViewModel) ： Vue 实例对象

## 2.5 数据代理

在 Vue 2 中，数据代理是一个核心概念，它使得数据绑定和组件状态的管理变得更加简单和直观。主要通过 Vue 实例中的`data`选项来实现的，并且 Vue 会利用 ES5 中的 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法（Vue 3 则使用 Proxy）在内部对这些数据进行劫持（或称为“拦截”），从而实现对数据变化的监听和响应式更新。

数据代理是指，通过一个对象来代理对另一个对象中属性的访问和操作（读/写）。在 Vue2 中，当你把一个普通的 JavaScript 对象传递给 Vue 实例的`data`选项时，Vue 会遍历这个对象的所有属性，并使用`Object.defineProperty`将它们转换为 getter/setter。这些 getter/setter 对用户来说是透明的，但 Vue 会在内部使用它们来追踪依赖，并在数据变化时通知视图进行更新。

```js
// 示列
const vm = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue2!",
  },
  template: "<div>{{ message }}</div>",
});
```

## 2.6 事件处理

### 监听事件

可以用 `v-on:xxx` 或者 `@xxx`指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

:::warning 注意

然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 `v-on` 指令中是不可行的。因此 `v-on` 还可以接收一个需要调用的方法名称。

1. v-on:xxx="fun"
2. @xxx="fun"
3. @xxx="fun(参数)"
4. 默认事件形参: event （触发事件时无参数传递，可直接在`methods`方法中，用 event 接收）
5. 隐含属性对象: $event（触发事件时传递一个占位符`$event`，可在`methods`方法中，用变量接收）

:::

示例：

```html
<div id="app">
  <!-- 触发 javascript 代码 -->
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>

  <!-- 触发调用一个方法 -->
  <button v-on:click="add">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.16"></script>
<script>
  const vm = new Vue({
    el: "#app",
    // 在 `data` 对象中定义数据 （data最好写成函数的形式）
    data() {
      return {
        counter: 0,
      };
    },
    // 在 `methods` 对象中定义方法
    methods: {
      add() {
        // +1方法
        this.counter += 1;
      },
    },
  });
</script>
```

:::warning

- `methods` 中的配置的函数，不要使用箭头函数！不然`this`就不是`vm`实列了

:::

### 事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop` 阻止事件冒泡
- `.prevent` 阻止默认事件
- `.capture` 使用事件捕获模式（即内部元素触发的事件先在此处理，然后才交由内部元素进行处理）
- `.self` 只当在 `event.target ` 是当前元素自身时触发处理函数
- `.once` 事件只触发一次
- `.passive` 事件的默认行为立即执行，无需等待事件回调执行完毕

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

### 按键修饰符

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：

```html
<!-- 只有在 key 是 Enter 时调用 submit -->
<input v-on:keyup.enter="submit" />
```

你可以直接将 [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名转换为 kebab-case（短横线命名） 来作为修饰符。

```html
<!-- 在下面示例中，处理函数只会在 $event.key 等于 PageDown 时被调用 -->
<input v-on:keyup.page-down="onPageDown" />
```

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

- `.enter` 回车
- `.tab` Tab（特殊，需配合 keydown 使用）
- `.delete` (捕获“删除”和“退格”键)
- `.esc` 退出
- `.space` 空格
- `.up` 上
- `.down` 下
- `.left` 左
- `.right` 右

:::warning 系统修饰键（用法特殊）

可以用如下修饰符来实现仅在按下相应按键时（和`keydown`事件配合）才触发鼠标或键盘事件的监听器。

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

请注意修饰键与常规按键不同，在和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`。而单单释放 `ctrl` 也不会触发事件。

:::

## 2.7 计算属性与监听器

### 计算属性

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```html
<div id="app">{{ message.split('').reverse().join('') }}</div>
```

对于任何复杂逻辑，你都应当使用**计算属性**。

```html
<!-- 示列 -->
<div id="app">
  <!-- 普通数据 -->
  <p>Original message: "{{ message }}"</p>
  <!-- 计算属性 -->
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    message: "Hello",
  },
  computed: {
    reversedMessage: function () {
      return this.message.split("").reverse().join(""); // `this` 指向 vm 实例
    },
  },
});
```

计算属性的完整写法：

- 当读取`reversedMessage`的值时，调用`get()`函数，返回值就作为`reversedMessage`的值。
- 当修改`reversedMessage`的值时，调用`set()`函数。

```js
computed: {
   reversedMessage: {
     get() {
       return this.message.split("").reverse().join("")
     },
     set(val) {
       this.message = val
     },
   }
 },
```

### 侦听器

方式一：通过 `watch` 选项来监听数据的变化

```html
<div id="app">
  <p>Original message: "{{ message }}"</p>
  <button @click="set()">更改</button>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.16"></script>
<script>
  const vm = new Vue({
    el: "#app",
    // 定义数据
    data: {
      message: "Hello",
      obj: {
        a: 1,
        b: 100,
      },
      name: "Evan Cookie",
    },
    // 定义方法
    methods: {
      set() {
        this.message = this.message + "~";
      },
    },
    // 侦听器
    watch: {
      // 完整写法
      message: {
        immediate: true, // 侦听开始之后被立即调用
        deep: true, // 开启深度侦听（不管对象嵌套多深）
        handler(newValue, oldValue) {
          console.log("message 数据变化了");
          console.log(newValue, oldValue);
        },
      },
      // 侦听对象的某个属性
      "obj.a": {
        handler(newValue, oldValue) {
          console.log("message 数据变化了");
          console.log(newValue, oldValue);
        },
      },
      // 不需要immediate, deep 的情况况下 => 可简写
      name(newValue, oldValue) {
        console.log("message 数据变化了");
        console.log(newValue, oldValue);
      },
    },
  });
</script>
```

方式二： [实例方法 / 数据 - vm.$watch](https://v2.cn.vuejs.org/v2/api/#vm-watch)

**示例：**

```js
const vm = new Vue({
  el: "#app",
  data: {
    name: "Evan Cookie",
    obj: {
      a: 100,
      b: 200,
    },
  },
});

vm.$watch("obj.a", function (newValue, oldValue) {
  console.log(newValue, oldValue);
});

vm.$watch(
  "name",
  function (newValue, oldValue) {
    console.log(newValue, oldValue);
  },
  {
    deep: true,
    immediate: true,
  }
);
```

`vm.$watch` 返回一个取消观察函数，用来停止触发回调：

```js
const unwatch = vm.$watch("obj.b", callback);

// 取消观察
unwatch();
```

:::danger

注意在带有 `immediate` 选项时，你不能在第一次回调时取消侦听给定的 property。

带有 `immediate` 不可以 `unwatch()` 取消侦听

:::

## 2.8 Class 与 Style 绑定

## 2.9 条件渲染

## 2.10 列表渲染

# 3. 生命周期

# 4. 组件

# 5. prop

# 6. 自定义事件

# 7. 插槽

# 8. VueX

# 9. Vue-Router

# 10. Elemment-UI
