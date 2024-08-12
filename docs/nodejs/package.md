## 包管理工具

### 1. 包、包管理工具

- 包是一组特定功能的代码集合，英文为：`package`。
- 包管理器可以对包进行：下载、安装、更新、删除 等操作。

### 2. 常用的包管理工具

- **npm：** 出现最早且使用最广泛的 JavaScript 包管理器，随 Node.js 一起安装。
- **cnpm：** cnpm 是 npm 的一个镜像版本，针对国内网络环境进行了优化。
- **yarn：** 由 Facebook 开发，旨在提高包的安装速度和解决一些 npm 的问题。
- **pnpm：** 可以共享依赖库，从而节省磁盘空间，同时也能提升安装速度。

### 3. npm

![image-20240812113424963](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/package/202408121134992.png)

NPM的全称是Node Package Manager，是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。

可以通过 `npm -v` 查看版本号测试，如果显示 npm 版本号说明安装成功。

#### 3.1 初始化包

创建一个空目录，然后在此目录下，执行 `npm init`，该命令的作用是：将文件夹**初始化为一个包**。

根据提示，进行包的核心配置：

![image-20240812113953522](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/package/202408121139564.png)

初始化成功后，会出现一个`package.json`，这是包的配置文件，每个包都必须要有`package.json`，它是包的说明文件，`package.json` 内容示例：

```json
{
  "name": "test",       #包的名字
  "version": "1.0.0",   #包的版本
  "description": "",    #包的描述
  "main": "server.js",   #包的入口文件
  "scripts": {			#脚本配置
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",			#作者
  "license": "ISC"	#开源证书
}
```

:::warning 注意事项

1. name (`包名`) 不能有中文、不能大写，默认值是文件夹名称。
2. version (`版本号`)要求 `x.x.x`的形式定义，`x`必须是数字，默认值是 `1.0.0`。
3. `package.json`也可以手动创建与修改
4. 使用 `npm init -y`或者`npm init --yes`极速创建`package.json`。
5. 点击了解[开源证书相关1](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)、[开源证书相关2](https://paulmillr.com/posts/simple-description-of-popular-software-licenses/)

:::

#### 3.2 搜索包

1. 命令行搜索：`npm search <package name>`或`npm s <package name>`
2. 网站搜索： https://www.npmjs.com/

#### 3.3 安装包

以安装axios为例：

```shell
# 默认安装最新的包
npm install  axios --save   或   npm i axios -S

# 查看一个包的所有版本
npm view <package name> versions

# 安装指定版本的包
npm i <package name>@version
```

运行之后文件夹下会增加两个资源

- `node_modules`：该文件夹中存放下载好的包。
- `package-lock.json`：包的锁文件，用来锁定包的版本。

:::tip 关于`package-lock.json` 中的版本限制的说明：

- `^`：锁定主版本号，接受所有以`1`开头的版本，如：`1.0.2`等，但不包括`2.0.0`。
- `~`：允许安装小版本的更新，但不包括次要版本的更改。`~1.0.1` 允许 `1.0.x`。
- `>`：允许比指定版本更高的版本，但不包括指定版本本身。`>1.0.1` 允许 `1.1.0`, `2.0.0`等。
- `<`：允许比指定版本更低的版本。`<1.0.1` 允许 `1.0.0` 及更早的版本。
- `>=`：允许指定版本及更高的版本。`>=1.0.1` 允许 `1.0.1` 及其之后的版本。
- `<=`：允许指定版本及更低的版本。`<=1.0.1` 允许 `1.0.1` 及其之前的版本。
- `*`：允许任何版本，这种情况下最不限制，但也**最不稳定**。
-  如果没有任何符号，只写版本号，如 `1.0.1`，这意味着严格要求安装这个特定版本。

:::

#### 3.4 使用包

```js
const uniq = require('uniq')   // CommonJS

import uniq from 'uniq' // ES Module
```

`npm`的引入流程是：

1. 在当前文件夹下`node_modules`中寻找同名的文件夹，若有则使用，若没有进入下一步。
2. 在上级目录中下的`node_modules`中寻找同名的文件夹，直至找到磁盘根目录。

#### 3.5 生产依赖与开发依赖

:::info 生产环境与开发环境

- 开发环境: 是程序员专门用来写代码的环境，一般是程序员的电脑。

- 生产环境: 是项目代码正式运行的环境，一般是正式的服务器。

:::

**开发依赖:** 只有开发环境用到的包，是开发依赖包。

**生产依赖:** 开发环境、生产环境都要用的，是生产依赖包。

| 操作         | 命令                                                         |
| ------------ | ------------------------------------------------------------ |
| 安装生产依赖 | `npm install <package name> --save` 或 `npm install <package name> -S` |
| 安装开发依赖 | `npm install <package name> --save-dev` 或 `npm i <package name> -D` |

#### 3.6 全局安装

使用 `-g` 配置可以进行全局安装，例如全局安装`nodemon`。

```shell
# 全局安装 nodemon
npm i nodemon -g

# 查看全局包的安装位置
npm root -g

# 查看全局包列表
npm list -g
```

:::info 说明：

- 全局安装的命令不受工作目录位置影响
- 不是所有的包都适合全局安装，通常是命令行工具包，才适合全局安装。

:::

#### 3.7 安装全部依赖

通过`npm i`或`npm install`命令 ，可依据 `package.json`和`package-lock.json` 安装项目依赖。

```shell
npm i 或 npm install
```

若只想安装生产依赖，可以使用`npm install --prod` 或 `npm i --omit=dev`

#### 3.8 删除包

项目中可能需要删除某些不需要的包，可以使用下面的命令

```shell
# 局部删除
npm remove <package name>
npm r <package name>

# 全局删除
npm remove <package name> -g
npm r <package name> -g
```

#### 3.9. 配置命令别名

通过配置命令别名可以更简单的执行命令，配置`package.json` 中的`scripts`属性

```json
{
  "scripts": {
    "server": "node server.js",
    "start": "node index.js",
  },
}
```

配置完成之后，可以使用别名执行命令

```shell
npm run server
npm run start

# start别名比较特别，使用时可以省略run
npm start
```

:::info 补充说明：

- `npm start` 是项目中常用的一个命令，一般用来启动项目。
- `npm run`有自动向上级目录查找的特性，跟`require` 函数也一样。
- 对于陌生的项目，我们可以通过查看 `scripts`属性来参考项目的一些操作。

:::

### 4. cnpm

![image-20240812134021233](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/package/202408121340281.png)



[cnpm](https://www.npmmirror.com/)是一个`npm`的替代工具，`cnpm`服务器部署在国内，主要用于在国内优化`npm`包的下载速度，`cnpm`由淘宝团队创建和维护，又称：淘宝镜像。

- `npm`原始服务器地址：https://registry.npmjs.org/
- `cnpm`服务器地址为：https://registry.npmmirror.com/

#### 4.1 安装

对于cnpm的使用有两种方式：

- 第一种方式：安装cnpm包管理器

```shell
npm install cnpm -g
```

该种方式是全局安装了cnpm包，以后全局用cnpm命令即可，cnpm兼容npm命令。

- 第二种方式：仅修改npm服务器地址

```shell
npm config set registry https://registry.npmmirror.com
```

该种方式只是修改了npm服务器地址，以后还是用npm命令

查看服务器地址

```shell
npm config get registry

cnpm config get registry
```

#### 4.2 nrm 的使用

[nrm](https://github.com/Pana/nrm)（NPM Registry Manager）是一个用于管理`npm`注册表的工具，方便用户在多个`npm`注册表之间切换。它适用于在不同的`npm`源之间快速切换。

```shell
# 安装nrm
npm install nrm -g

# 列出可用地址
nrm ls

# 测试各地址速度
nrm test

# 切换到指定地址
nrm use 别名

# 添加新地址
nrm add 别名 URL

# 删除地址
nrm del 别名
```

### 5. yarn

![image-20240812140425325](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/package/202408121404380.png)

[yarn](https://yarnpkg.com/)是一个快速、可靠的依赖管理工具，由 Facebook 在 2016 年开发，`yarn`的优势如下：

- **速度**：`yarn`使用并行安装机制来加快速度。

- **缓存**：`yarn`会缓存每个下载过的包，无需重复下载。

- **界面**：`yarn`提供更详细的输出，包括进度条等等。

- **安全**：`yarn`会通过算法校验每个安装包的完整性。

> 备注：以上 yarn 的优势，目前最新的 npm 也都基本具备了。

#### 5.1 安装

```shell
npm i yarn -g
```

:::tip 配置环境变量

第一步：执行如下命令，得到`yarn`全局安装目录位置

```shell
yarn global dir

C:\Users\Administrator\AppData\Local\Yarn\Data\global
```

第二步：将该目录下的`.bin`文件夹配置到环境变量中

> C:\Users\Administrator\AppData\Local\Yarn\Data\global\node_modules\.bin

![hjbl](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/package/202408121442632.png)

:::

#### 5.2 yarn 常用命令

| yarn 命令              | 功能描述               | 对应 npm 命令         |
| ---------------------- | ---------------------- | --------------------- |
| `yarn init`            | 初始化包               | `npm init`            |
| `yarn -v`              | 查看版本号             | `npm -v`              |
| `yarn add 包名`        | 安装某个包             | `npm install 包名`    |
| `yarn add 包名 -D`     | 安装某个包（开发依赖） | `npm install -D`      |
| `yarn global add 包名` | 全局安装一个包         | `npm install 包名 -g` |
| `yarn global dir`      | 查看全局安装位置       | `npm root -g`         |
| `yarn global list`     | 查看全局安装列表       | `npm list -g`         |
| `yarn install`         | 安装全部依赖           | `npm install`         |
| `yarn remove 包名`     | 删除包                 | `npm remove 包名`     |
| `yarn run 别名`        | 运行命令别名           | `npm run 别名`        |

### 6. pnpm

![image-20240812145033052](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/node/package/202408121450080.png)

[pnpm](https://pnpm.io/)（“performant npm”）是一个高效的包管理工具，与`npm`和`yarn`类似。它通过硬链接和软链接来共享依赖库，从而节省磁盘空间和加速安装过程。

#### 6.1 安装

```shell
npm i pnpm -g
```

将`C:\Users\tianyu\AppData\Local\pnpm`添加到环境变量。

#### 6.2 pnpm 常用命令

| pnpm 命令          | 功能描述               | 对应 npm 命令     |
| ------------------ | ---------------------- | ----------------- |
| `pnpm init`        | 初始化包               | `npm init`        |
| `pnpm -v`          | 查看版本号             | `npm -v`          |
| `pnpm i 包名`      | 安装某个包             | `npm i 包名`      |
| `pnpm i 包名 -D`   | 安装某个包（开发依赖） | `npm i -D`        |
| `pnpm i 包名 -g`   | 全局安装一个包         | `npm i 包名 -g`   |
| `pnpm root -g`     | 查看全局安装位置       | `npm root -g`     |
| `pnpm list -g`     | 查看全局安装列表       | `npm list -g`     |
| `pnpm i`           | 安装全部依赖           | `npm i`           |
| `pnpm remove 包名` | 删除包                 | `npm remove 包名` |
| `pnpm run 别名`    | 运行命令别名           | `npm run 别名`    |

### 7. 发布自己的包

#### 7.1 创建与发布

我们可以将自己开发的工具包发布到 `npm` 服务上，方便自己和其他开发者使用，操作步骤如下：

1. 创建文件夹，并初始化成一个包，在 `package.json` 中填写包的信息（包名是唯一的）。
2. 注册账号 https://www.npmjs.com/signup，并激活账号。
3. 将`npm`调整为修改为官方镜像。
4. 执行`npm login`填写相关用户信息。
5. 执行`npm publish`提交包。

#### 7.2 更新包

后续可以对自己发布的包进行更新，操作步骤如下：

1. 更新包中的代码。
2. 测试代码是否可用。
3. 修改`package.json`中的版本号。
4. 发布更新`npm publish`。

#### 7.3 删除包

执行如下命令：`npm unpublish --force`

删除包需要满足一定的条件：

- 只有包的作者才能删除包。
- 发布必须小于 24 小时。
- 超 24 小时后，想删除必须满足：①没有其他依赖、② 周下载量小于 300 、③只有一个维护者。
