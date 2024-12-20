---
 outline: [1, 2]
---

# 1. Vue2 介绍

[Vue](https://v2.cn.vuejs.org/) (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

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
      el: '#app', // 指定容器
      data: {
        msg: 'Vue2' // 数据
      }
    })
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

[Vue2 官网指令文档](https://v2.cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4)

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
      el: '#app',
      data: {
        name: 'Ren'
      }
    })
  </script>
</body>
```

:::warning 注意~~
`v-bind:value` 可简写为 `:value`

`v-model:value` 可简写为 `v-model`

```html
单项数据绑定：<input type="text" :value="name" /> <br />
双向数据绑定：<input type="text" v-model="name" /> <br />
```

:::

## 2.4 MVVM 模型

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的：

```js
const vm = new Vue({
  // 选项
})
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
  el: '#app',
  data: {
    message: 'Hello Vue2!'
  },
  template: '<div>{{ message }}</div>'
})
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
    el: '#app',
    data: {
      counter: 0
    },
    methods: {
      add() {
        this.counter += 1
      }
    }
  })
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

## 2.7 计算属性 & 监听器

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
  el: '#app',
  data: {
    message: 'Hello'
  },
  computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('') // `this` 指向 vm 实例
    }
  }
})
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
    el: '#app',
    data: {
      message: 'Hello',
      obj: {
        a: 1,
        b: 100
      },
      name: 'Evan Cookie'
    },
    methods: {
      set() {
        this.message = this.message + '~'
      }
    },
    watch: {
      // 完整写法
      message: {
        immediate: true, // 侦听开始之后被立即调用
        deep: true, // 开启深度侦听（不管对象嵌套多深）
        handler(newValue, oldValue) {
          console.log('message 数据变化了')
          console.log(newValue, oldValue)
        }
      },
      // 侦听对象的某个属性
      'obj.a': {
        handler(newValue, oldValue) {
          console.log('message 数据变化了')
          console.log(newValue, oldValue)
        }
      },
      // 不需要immediate, deep 的情况况下 => 可简写
      name(newValue, oldValue) {
        console.log('message 数据变化了')
        console.log(newValue, oldValue)
      }
    }
  })
</script>
```

方式二： [实例方法 / 数据 - vm.$watch](https://v2.cn.vuejs.org/v2/api/#vm-watch)

**示例：**

```js
const vm = new Vue({
  el: '#app',
  data: {
    name: 'Evan Cookie',
    obj: {
      a: 100,
      b: 200
    }
  }
})

vm.$watch('obj.a', function (newValue, oldValue) {
  console.log(newValue, oldValue)
})

vm.$watch(
  'name',
  function (newValue, oldValue) {
    console.log(newValue, oldValue)
  },
  {
    deep: true,
    immediate: true
  }
)
```

`vm.$watch` 返回一个取消观察函数，用来停止触发回调：

```js
const unwatch = vm.$watch('obj.b', callback)

// 取消观察
unwatch()
```

:::danger

注意在带有 `immediate` 选项时，你不能在第一次回调时取消侦听给定的 property。

带有 `immediate` 不可以 `unwatch()` 取消侦听

:::

## 2.8 Class & Style 绑定

### 绑定 HTML Class

可以传给 `v-bind:class` 一个对象，以动态地切换 class：

**对象语法**

```html
<div v-bind:class="{ active: isActive }"></div>

<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

<div v-bind:class="classObj"></div>
```

如下 data：

```js
data: {
  isActive: true,
  hasError: false,
  classObj: {
    active: true,
    'text-danger': true
  }
}
```

结果渲染为：

```html
<div class="active"></div>

<div class="static active"></div>

<div class="active text-danger"></div>
```

**数组语法**

可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：

```html
<div v-bind:class="['active', 'text-danger']"></div>

<div v-bind:class="classArr"></div>
```

如下 data：

```js
data: {
  classArr: ['a', 'b']
}
```

结果渲染为：

```html
<div class="active text-danger"></div>

<div class="a b"></div>
```

### 绑定内联样式

**对象语法**

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个**样式对象**通常更好，这会让模板更清晰：

```html
<div v-bind:style="styleObj"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

**数组语法**

`v-bind:style` 的数组语法可以将多个**样式对象**应用到同一个元素上：

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

```js
data: {
  baseStyles: {
    color: 'red',
    fontSize: '13px'
  },
  overridingStyles: {
    border: '1px solid #000',
  }
}
```

## 2.9 条件渲染

### v-if

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 true 值的时候被渲染。

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

`v-else` 指令来表示 `v-if` 的 "else 块" ：

```html
<div v-if="awesome">Now you see me</div>
<div v-else>Now you don't</div>
```

`v-else-if`，顾名思义，充当 `v-if` 的 "else-if 块"，可以连续使用：

```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。

```html
<template v-if="isShow">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

::: warning 注意

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

:::

### v-show

`v-show` 用于根据条件展示元素的选项是 `v-show` 指令。用法与 `v-if`大致一样：

```html
<h1 v-show="isShow">Hello!</h1>
```

::: warning 与 v-if 的区别

- `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
- `v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS property `display`进行切换。
- 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

:::

::: danger

注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`。

:::

## 2.10 列表渲染

### v-for

`v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名。

```html
<ul id="list-box-1">
  <li v-for="item in items" :key="item.message">{{ item.message }}</li>
</ul>
```

```js
const vm = new Vue({
  el: '#list-box-1',
  data: {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
})
```

在 `v-for` 块中，我们可以访问所有父作用域的 property。`v-for` 还支持一个可选的第二个参数，即当前项的索引`index`。

```html
<li v-for="(item, index) in items">{{ item.message }} - {{ index }}</li>
```

你也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法：

```html
<div v-for="item of items"></div>
```

:::tip 补充

- `v-for`还可以遍历：字符串、指定次数

```html
<li v-for="(item, index) in 'EvanCookie'">{{ item }} - {{ index }}</li>

<li v-for="(item, index) in 5">{{ item }} - {{ index }}</li>
```

- 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute：

```html
<div v-for="item in items" v-bind:key="item.id"></div>
```

- 建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。因为它是 Vue 识别节点的一个通用机制，`key` 并不仅与 `v-for` 特别关联，它还具有其它用途。

:::

### key的作用与原理

`key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。

**面试题： react 、 vue 中的 key 有什么作用？( key 的内部原理）：**

key 是虚拟 DOM 对象的标识，当数据发生变化时， Vue 根据【新数据】生成【新虚拟 DOM 】,随后进行【新虚拟 DOM 】与【旧虚拟 DOM 】的差异比较，对比规则如下：

**对比规则：**

1. 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key ：若虚拟 DOM 中内容没变，直接使用之前的真实 DOM !
   若虚拟 DOM 中内容变了，则生成新的真实 DOM ，随后替换掉页面中之前的真实 DOM 。
2. 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key：创建新的真实 DOM ，随后渲染到到页面。

**用 index 作为 key 可能会引发的问题：**

1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作：会产生没有必要的真实 DOM 更新＝=＞界面效果没问题，但效率低。
2. 如果结构中还包含输入类的 DOM :会产生错误 DOM 更新＝=＞界面有问题。

**开发中如何选择 key ?**

1. 最好使用每条数据的唯一标识作为 key ，比如 id 、手机号、身份证号、学号等唯一值。
2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用 index 作为 key 是没有问题的。

## 2.11 表单数据绑定

> [前往官网详细讲解](https://v2.cn.vuejs.org/v2/guide/forms.html)

# 3. 自定义指令 & 过滤器

### 自定义指令

除了内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。下面以注册一个 "当页面加载时，该元素将获得聚焦" 的自定义指令 `v-focus`为例：


注册局部指令，组件中也接受一个 `directives` 的配置选项：

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```
注册全局指令，在 `new Vue()` 之前

```js
// 在 new Vue 之前定义
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

new Vue({
  // ...
})
```

可以在模板中任何元素上使用新的 `v-focus` property，如下：

```html
<input v-focus>
```

> [更多详细请查看官网 自定义指令 文档](https://v2.cn.vuejs.org/v2/guide/custom-directive.html)

### 过滤器

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式** (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

你可以在一个组件的配置选项中定义局部的过滤器：

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

或者在创建 Vue 实例之前全局定义过滤器：

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

> [更多详细请查看官网 过滤器 文档](https://v2.cn.vuejs.org/v2/guide/filters.html)

# 4. 生命周期

生命周期是指从Vue实例创建到销毁所经历的一系列过程。每个阶段都有对应的生命周期钩子（也叫生命周期函数），开发者可以利用这些钩子在特定时刻执行自定义逻辑。以下是Vue2完整的生命周期及其各个阶段的详细说明：

![](https://v2.cn.vuejs.org/images/lifecycle.png)

1. **beforeCreate**:
   - 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
   - 这个阶段中`data`和`methods`都还未被初始化。

2. **created**:
   - 实例已经完成数据观测，属性和方法的运算，`$watch`监听器设置完毕。
   - 此时`data`已经被绑定，但DOM还未生成，所以无法访问DOM元素。

3. **beforeMount**:
   - 在挂载开始之前被调用：相关的`render`函数首次被调用。
   - 在这个阶段模板编译成HTML并插入文档前，你可以在这个阶段进行最后一次修改数据的操作。

4. **mounted**:
   - 实例已经挂载到DOM上，此时可以访问到DOM元素。
   - 如果你需要操作DOM节点，或者使用第三方库如jQuery，应该在这里进行。

5. **beforeUpdate**:
   - 数据更新时调用，发生在虚拟DOM重新渲染和打补丁之前。
   - 你可以在该钩子中进一步地更改状态，这不会触发附加的重渲染过程。

6. **updated**:
   - 由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用此钩子。
   - 当这个钩子被调用时，组件DOM已经更新，所以你现在可以执行依赖于DOM的操作。

7. **beforeDestroy** (在Vue 3中更名为`beforeUnmount`):
   - 实例销毁之前调用。在这一步，实例仍然完全可用。

8. **destroyed** (在Vue 3中更名为`unmounted`):
   - Vue实例销毁后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。

# 5. 组件

组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：

![Component Tree](https://v2.cn.vuejs.org/images/components.png)

### 全局注册组件

定义一个名为 ` my-button` 的组件，示例代码如下：

```js
Vue.component('my-button', {
  data: function () {
    return {
      count: 0
    }
  },
  template: `<button v-on:click="count++">You clicked me {{ count }} times.</button>`
})

new Vue({
  //...
})
```

### 局部注册组件

全局注册往往是不够理想的。全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的无用的 JavaScript 的增加。可通过 `components`配置项注册

```js
components: {
  'my-button': {
    data：function () {
      return {
        count: 0
      }
    },
    template: `<button v-on:click="count++">You clicked me {{ count }} times.</button>`
  }
}
```

### 使用组件

注册完成后，组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 `<my-button>`。可以把这个组件作为自定义元素来使用

```html
<div id="app">
  <!-- 组件标签的写法 1 -->
  <my-button></my-button>
  <my-button></my-button>
  <!-- 组件标签的写法 2 单标签写法 注意：此写法在不使用脚手架的环境下将导致后续组件无法渲染 -->
  <my-button />
  <my-button></my-button>
</div>
```

你可以将组件进行任意次数的复用：每个组件都会各自独立维护它的 `count`。因为你每用一次组件，就会有一个它的新**实例**被创建。

:::warning 注意

- 全局组件可以在 Vue 实例及其所有子组件中使用，而局部注册组件仅能在当前注册的组件及其子组件中使用。

- 组件的配置项，可以通过`name` 为组件起名，不可以写 `el`（el只有根才可以写） 

- 组件的 `data` 配置项必须是一个函数，否则将影响到其它所有实例
- 定义件名的两种方式： `kebab-case`(短横线分隔命名)  与 `PascalCase`(首字母大写命名) 

```js
Vue.component('my-component-name', {}) // kebab-case
Vue.component('MyComponentName', {}) // PascalCase
```

:::

### Vue.extend

使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。`data` 选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数，并且不可以书写 `el`字段

```html
<!-- 容器 -->
<div id="mount-point"></div>
```

```js
// 创建构造器
const Profile = Vue.extend({
  template: '<h2>Hello, {{myName}}</h2>',
  data() {
    return { myName: 'Evan Cookie' }
  }
})

// 创建 Profile 实例，并挂载到一个容器
new Profile().$mount('#mount-point')
```

结果如下：

```html
<h2>Hello, Evan Cookie</h2>
```

###  Vue.component

注册或获取全局组件

```js
// 传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ })

// 传入配置对象 (这将自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件实列 (始终返回构造器)
const MyComponent = Vue.component('my-component')
```



:::warning 一个重要的内置关系

- `VueComponent.prototype.__proto__` === `Vue.prototype`
- 为了让组件实列对象，也可以访问到 Vue原型上的属性和方法。

:::

### 单文件组件

在很多 Vue 项目中，我们使用 `Vue.component` 来定义全局组件，紧接着用 `new Vue({ el: '#app '})` 在每个页面内指定一个容器元素。

这种方式在很多中小规模的项目中运作的很好，在这些项目里 JavaScript 只被用来加强特定的视图。但当在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：

- **全局定义 (Global definitions)** 强制要求每个 component 中的命名不得重复
- **字符串模板 (String templates)** 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 `\`
- **不支持 CSS (No CSS support)** 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
- **没有构建步骤 (No build step)** 限制只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

单文件组件（Single File Component，简称 SFC）是 Vue.js 框架中的一种组件化编程方式，它将一个组件的 HTML、CSS 和 JavaScript 代码都放在同一个文件中，文件后缀是`.vue` 为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。

这是一个文件名为 `Hello.vue` 的简单实例：

![](https://v2.cn.vuejs.org/images/vue-component.png)

> [更多详细请查看官网 单文件组件 文档](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)

# 6. prop

### 向子组件传递数据

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <!-- 向子组件传递数据  -->
    <MySchool name="北京大学" age="2000" />
    <MySchool name="清华大学" age="3000" />
    <MySchool name="麻省理工学院" age="4000" />
  </div>
</template>

<script>
import MySchool from "./components/MySchool.vue";
export default {
  name: "App",
  components: { MySchool },
};
</script>
```

```vue
<!-- MySchool.vue -->
<template>
  <div class="my-school">
    <h1>{{ name }}</h1>
    <h2>{{ age }}</h2>
  </div>
</template>

<script>
export default {
  name: "MySchool",
  props: ["name","age"], // 接收父组件传递数据
};
</script>
```

### props 的配置方式

```vue
<script>
export default {
  // 第一种：只接收
  props: ["name","age"],
};
</script>

<script>
export default {
  // 第二种：限制类型
  props: {
    name: String,
    age: Number, // 也可以写成数组  age: [Number, String]
  },
};
</script>

<script>
export default {
  // 第三种：完整配置
  props: {
    name: {
      type: String,
      required: true, // 必要性
    },
    age: {
      type: Number,
      default: 2024, // 默认值
    },
  },
};
</script>
```

### 非单文件组件 prop

```js
// 注册全局组件
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

new Vue({
  // ...
})
```

```html
<div id="app">
  <!-- 使用组件 -->
	<blog-post title="My journey with Vue"></blog-post>
	<blog-post title="Blogging with Vue"></blog-post>
	<blog-post title="Why Vue is so fun"></blog-post>
</div>
```

> [更多详细请查看官网 prop 文档](https://v2.cn.vuejs.org/v2/guide/components-props.html)

# 7. 混入 (mixin)

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本// 身的选项。

### 基础

```js
// mixin.js
// 定义一个混入对象（可以包含任意组件选项）
export default {
  data() {
    return {
      msg: "我是混入的数据",
    };
  },
  methods: {
    hello() {
      alert("hello from mixin!");
    },
  },
};
```

```vue
<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="hello">混入Mixin</button>
  </div>
</template>

<script>
import mixin from "@/mixin"; // 导入混入配置

export default {
  //...
  mixins: [mixin], // 使用混入
};
</script>
```

### 选项合并

当组件和混入对象含**有同名选项时**，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以**组件数据优先**。如下示例：

```js
// mixin.js
export default {
  data() {
    return {
      message: "hello mixin",
      foo: "abc",
    };
  },
};
```

```vue
<script>
import mixin from "@/mixin";

export default {
  mixins: [mixin],
  data() {
    return {
      message: "goodbye",
      bar: "def",
    };
  },
  created() {
    console.log(this.$data); // => { message: "goodbye", foo: "abc", bar: "def" }
  },
};
</script>
```

**同名钩子函数**将合并为一个数组，因此**都将被调用**。另外，**混入对象的钩子**将**在组件自身钩子之前**调用。

```js
const mixin = {
  created() {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created() {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

:::warning 注意

1. 值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
2. `Vue.extend()` 也使用同样的策略进行合并。

:::

### 全局混入

混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响**每一个**之后创建的 Vue 实例。

```js
Vue.mixin({
  created() {
     console.log('我是全局混入 => 我将影响 => Vue实例以及Vue组件实例')
  }
})

new Vue({
  //...
})
```
> [更多详细请查看官网 mixin 文档](https://v2.cn.vuejs.org/v2/guide/mixins.html)

# 8.插件

插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

1. 添加全局方法或者 property。
2. 添加全局资源：指令/过滤器/过渡等。
3. 通过全局混入来添加一些组件选项。
4. 添加 Vue 实例方法，通过把它们添加到 `Vue.prototype` 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。

### 开发插件

Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是`options`一个可选的选项对象：

```js
export default {
  install(Vue, options) {
    // 1. 添加全局方法或 property
    Vue.myGlobalMethod = () => {
      // 逻辑
    };

    // 2. 添加全局资源
    Vue.directive("my-directive", {
      bind(el, binding) {
        console.log(el, binding);
      },
    });

    // 3. 注入组件选项
    Vue.mixin({
      created() {
        console.log("混入");
      },
    });

    // 4. 添加实例方法
    Vue.prototype.$myMethod = (methodOptions) => {
      alert(methodOptions);
    };
  },
};

```

### 使用插件

通过全局方法 `Vue.use()` 使用插件。它需要在你调用 `new Vue()` 启动应用之前完成：

```js
import Plugins from "./plugins" // 导入插件 

// 调用 Plugin.install(Vue)
Vue.use(Plugins) // 使用插件

new Vue({
  // ...
})
```

也可以传入一个可选的选项对象：

```js
Vue.use(Plugins, { someOption: true })
```

# 9.自定义事件

# 10. 插槽

# 11. VueX

# 12. Vue-Router

# 13. Elemment-UI
