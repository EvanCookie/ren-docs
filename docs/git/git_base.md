# 关于Git

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/git.jpeg)

Git 是一款版本控制系统，它可以**追踪文件的更改**，并能**多人协同开发**，它最初由 Linus Torvalds 在 2005 年为更好地管理 Linux 内核而设计的； Git 是目前最流行的版本控制系统，主要功能有：

- 代码备份
- 版本回退
- 协同开发
- 权限控制

# 下载与安装

官网地址：https://git-scm.com/

::: warning
如果自定义安装路径，切记路径中不要包含中文.
:::

# Git 基本使用

## 1. 起始配置

第一次使用 Git 的时候，我们需要配置**姓名**和**邮箱**，让 Git 知道当前开发者的基本信息

配置姓名：

```bash
git config --global user.name "Your Name" 
```

配置邮箱：

```bash
git config --global user.email "email@example.com" 
```

::: warning

1. 命令中的各单词中间有空格。
2. 上述两个命令只在第一次使用 Git 时运行, 若输入错误, 重新运行命令即可。
3. 可以使用 `git config --list` 或 `git config -l` 命令来查看配置信息 。
4. 上述这两个命令不用自己手敲, 直接复制粘贴，随后修改【姓名】与【邮箱】即可。
   :::

## 2. linux 常用命令

Windows 为图形化操作形式，Linux 一般使用命令与系统进行交互，常用的命令如下：


|     命令     | 含义                                                                  |
| :----------: | :-------------------------------------------------------------------- |
|   `mkdir`   | 创建文件夹（make directory）                                          |
|     `cd`     | 改变工作目录，（change directory 缩写）（cd.. 返回上层目录）          |
|   `touch`   | 创建一个文件                                                          |
|     `ls`     | 查看文件夹下的文件 （list 单词的缩写）                                |
|    `cat`    | 查看文件内容                                                          |
|    `Tab`    | 路径自动补全                                                          |
|   `clear`   | 清屏（也可以使用`ctrl + L`  快捷键）                                  |
|     `rm`     | 删除文件或文件夹 （删除不会进入回收站） -r 递归删除（用来删除文件夹） |
|  `ctrl + c`  | 取消命令 c cancel 缩写                                                |
| `上下方向键` | 查看命令历史                                                          |

## 3. vim 编辑器

Vim 是一款命令行下的文本编辑器，编辑方式跟图形化编辑器不同，基本操作

1. 命令行 `vim 文件名` 打开文件
2. 按`insert`进入编辑模式
3. 开始编辑文件内容
4. `ESC` + `:wq` 保存并退出（w => write q=>quit）
5. `ESC` + `:q!` 不保存并退出

## 4. Git 的三个区

1. 工作区（代码编辑区）
2. 暂存区（暂时存储区）
3. 版本区（版本控制区）

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1710831903075-ca64b740-e22d-404b-8518-d8ec573b8493.png)

工作区、暂存区、版本区，三个区共同组成了一个 **Git 仓库**

## 5. 基本操作流程

**第一步：** 创建一个空文件夹（名称不要包含中文），随后双击打开文件夹。

**第二步：** 在文件夹空白处右键 ，随后点击 `Open Git Bash here` 选项，启动Git命令行。

**第三步：** 创建一个 Git 仓库，命令为：`git init`，命令

**第四步：** 创建一些文件并编写代码，比如创建 【a.txt】。

**第五步：** 把工作区中【a.txt】添加到暂存区，具体命令为：`git add a.txt`

**第六步：** 把暂存区【a.txt】添加到版本区，具体命令为：`git commit -m 'XXXX'`

::: tip
`git init` 执行后，会出现一个 `.git` 文件夹，这表示当前文件夹已成为一个 Git 仓库。
<br />
`git add -A` `git add *` `git add .`可以把工作区中的所有文件，都添加到暂存区
:::

## 6. Git 三区的位置

Git 的三区位置大致如下（了解即可）

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711160360657-6b3abc98-5249-4df2-bf0d-30cca4d2278a.png)

## 7. 查看仓库状态

`git status` 命令用于显示仓库当前的状态 <br>
`git status -s` 也用于查看仓库状态，但提示更为简短。

## 8. 删除暂存

`git rm --cached <file>` 可以将文件**从暂存区中删除**。<br>
`git rm --cached -r .` 可以将文件**从暂存区全部中删除**。

## 9. 对比差异

`git diff` 用于对比：**工作区** vs  **暂存区**

`git diff --cached` 用于对比：**暂存区** vs **仓库区**

diff 命令的返回格式如下图：

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711693522346-74e6707e-2547-489c-918e-2a6d0778e849.png)

::: warning
实际开发中文件多，且修改内容也多，我们会借助 git 的 GUI 工具进行文件差异对比。
:::

## 10. 查看版本日志

`git log`：按提交时间降序列出所有提交，最新的提交会首先显示。

`git log --oneline`：在 `git log` 的基础上，以简洁的一行显示每个提交。

如果内容偏多， 需要使用方向键上下滚动， 按 q 退出。

## 11. 版本回退

Git 可以将项目代码内容切换到历史的任何一个版本，使用 `git reset --hard 版本号`

::: info
`git reset --hard`会有如下动作：

① 切换**版本区** HEAD （指针）指向

② 还原**暂存区**到对应版本

③ 还原**工作区**到对应版本

执行 `git reset --hard` 之前，最好进行： `git add` 、`git commit` 操作！

`--soft`：重置HEAD到指定版本（其他版本的文件都会自动添加到当前版本暂存区），对工作区无影响

`--mixed`: 重置HEAD到指定版本，并且重置暂存区（其他版本的文件为已添加的状态），对工作区无影响 (默认值)

`--hard`：重置HEAD到指定版本，并且重置暂存区，重置工作区（其他版本的文件全部消失）
:::

::: tip
使用 `git reset --hard` 版本回滚后，使用 `git log` 只能看到当前版本之前的记录。 可以使用 `git reflog` 命令查看。
:::

## 12. 修改提交

`git commit --amend` 命令可以修改最近一次提交，它可以：

1. 重新编辑上次的提交信息（修改git commit -m 的信息）。
   ::: info
   如果在一次提交后，意识到提交信息有误或不够详细，可以使用 `git commit --amend` 来重新编辑上次提交信息
   :::
2. 将新的更改内容添加到上次提交信息中。
   ::: info
   如果在一次提交后，意识到忘记将某文件提交了，可以先使用 `git add` 将这些遗漏的更改添加到暂存区，然后通过 `git commit --amend` 将它们添加到上一个提交中。
   :::

## 13. 忽略文件

在项目开发过程中有些文件**不应该存储到版本库中**，这个时候配置忽略这些文件。

git 中需要创建一个文件 `.gitignore` 文件来设置忽略，`.gitignore` 文件与 `.git` 目录同级

常用规则如下：


| 内容    | 含义                                                        |
| ------- | ----------------------------------------------------------- |
| `temp`  | 忽略**任何路径下**的名为 temp 的**文件**、**文件夹。**      |
| `*.log` | 忽略**任何路径下**以`.log` 结尾的文件。                     |
| `/dist` | 忽略根目录下的`dist` 文件，不会忽略其他目录下的 `dist` 文件 |

::: info
因为git不能添加空目录，所以如果需要将空目录添加到版本控制中，开发人员一般在该目录下创建一个 `.gitkeep`文件
.gitkeep只是起占位符作用，用于需要被Git追踪的空目录。
:::

## 14. 分支

### 14.1. 分支的概念

分支是 git 的一个重要特性，它可以让开发人员从主线上分离出来，在一个独立的线路上继续开发，最后可以灵活的选择合并分支，还是丢弃分支。

### 14.2. 创建与切换分支

- 使用 `git branch xxx` 可以创建分支，其中 `xxx` 是分支名字
  ::: info
  创建完分支后，分支并不是空的，而且保留了 master 分支当前所有的提交记录。
  :::
- 使用 `git branch` 可以查看所有分支
- 使用 `git checkout xxx` 可以切换分支
- 使用 `git checkout -b xxx` 可以创建并切换到分支

::: warning
① 切换分支前，最好把当前分支管理好，即最好进行：`add`、`commit`操作。

② 切换分支后，工作区、暂存区、会受到影响，具体为：

- 工作区：会变为**切换到的**分支的**最后一次提交的状态**
- 暂存区：同上，且如果暂存区有未提交的更改，那这些更改会被带到新分支的暂存区上。

比如：在 test 分支对 x 文件进行了暂存，没提交，随后切换到 master 分支时，x 文件会自动加在 master 分支的暂存区
:::

### 14.3. 合并分支（快速合并）

使用 `git merge xxxx` 合并分支 （xxxx为被合并的分支）

::: details 例如：我们有 master 和 test 两个分支，test 分支是领先于 master 分支的，且 test 分支包含 master 的所有历史记录，那么这时就可以触发 git 的快速合并，具体演示如下：
**第一步：** 创建 a、b 两个文件，随后提交到 master 分支。
![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711770939117-10146d85-1467-4583-a01f-49ddfd9e8134.png)

**第二步：** 创建 test 分支，随后在 test 分支创建一个 c 文件，随后提交到 test 分支。
![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711777728665-2eafdf47-b07b-493d-be42-934443421d25.png)

**第三步：** 切回 master 分支。

此时发现工作区中 c 文件消失（因为 master 分支中没有 c 文件）。
![image.png](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711771228930-9b6827f8-5389-40f8-894f-53fee037e5ea.png)

**第四步：** 把 test 分支合并到 master 分支
使用`git merge test`合并分支，合并成功后，会发现工作区中已经有了 c 文件，且可以查看到 c 文件的提交记录。
![image.png](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711777434203-3a837743-cd6d-430f-8b67-b71ea9e82405.webp)
:::

### 14.4. 合并分支（提交合并）

::: details 场景描述：当进行分支合并时，若两个分支有不一致的版本，则会提示输入提交信息，在当前分支形成一个新的提交记录，具体场景请执行上述 `14.3` 的前三步，然后接下来执行下面步骤：
**第四步**：切到 master 分支后，创建 d 文件，随后提交到 master 分支。
![image.png](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711804705867-ce4e6034-dfba-4951-b1bc-2e6920fcf6a1.webp)

**第五步**：在 master 分支中合并 test 分支
输入`git merge test`命令，进行分支合并
![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711805046418-ff04098c-4b39-4854-816f-0fc425fda10c.webp)

出现如下提示，含义是本次分支合并，存在不一样的版本，请为生成的新版本编写说明
![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711805343244-d7271863-ac0c-4c7e-b983-8a935cd88bc1.png)

输入完说明后，保存并退出

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711805410686-75568a3d-a35b-4c40-a72b-6a97741bca9b.png)

随后提示合并完毕

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711805476204-b30359f9-adeb-4c83-bb0a-010cf3b38798.webp)
:::

### 14.5. 删除分支

- `git branch -d xxx` 可用于删除一个分支，其中`xxx`是分支名
- 若删除时提示下图，说明：要删除的分支包含了一些尚未合并到其他分支的内容。

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1711778784216-1c2d8b56-55a9-403f-9961-d109cf3dd743.png)

解决办法有三种：

- 第一种方式：将要删除的分支合并到一个其他的分支，再进行删除。
- 第二种方式：使用`git branch -D xxx`强制删除。
- 第三种方式：使用`git config advice.forceDeleteBranch false`命令关掉该提示。

### 14.6. 分支变基

在 Git 中，合并（merge）和变基（rebase）都是用于整合来自不同分支的更改的操作，它们区别如下：

- 合并（merge）：

将两个分支的历史合并在一起，gti 会创建一个新的“合并提交”，所有的分支和合并点都会被保留在历史中，有完整的历史记录。

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1712634803620-3f65f793-ab1c-4d12-b4df-9272ad68ecaf.gif)

- 变基（rebase） 使用 `git rebase master` 命令

将一个分支（test）上的提交重新应用到另一个分支（master）上，变基会重写项目历史，因为它实际上是在创建一系列新的提交，会产生一个更线性的历史记录，看起来更干净、更简单。

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1712278910007-278e9284-cae4-46d7-b32b-89810a7f1359.gif)

### 14.7. tag（标签）

在Git中，标签（Tag）是用来指向特定提交的引用，通常用于标记项目中的重要点，比如版本发布。标签分为两种类型：

1. 轻量标签（Lightweight）

轻量标签只是简单地指向一个提交，不包含其他信息，创建轻量标签不会存储任何额外的信息。

2. 附注标签（Annotated）

附注标签存储了额外的信息，例如：标签名、标签信息、创建者名字、电子邮件、创建日期等。因为它们包含了更多的信息，附注标签更适用于公共或正式发布的场合，比如软件版本的发布。

![image-20240721152359852](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/image-20240721152359852.png)

### 14.8. 游离分支

`git checkout`也可以将代码签出到指定版本，即可以执行`git checkout 具体版本号`，当签出到指定版本时，签出的代码出于一个游离分支中，如下图操作：

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1712632266329-1400e3ea-b26d-464c-ae17-88470fe9ea02.png)

::: warning
游离分支上可以对代码进行版本控制，但要注意：一旦从游离分支切走，游离分支的提交不会交给任何一个分支，所以对于游离分支我们的原则是：

1. 尽量不修改游离分支的代码（只读某个版本的代码）。
2. 若确实需要修改游离分支代码，应该从当前游离分支，创建出一个新的分支，随后去修改。
3. 若在游离分支上发生了提交，随后从游离分支切走了，就要使用 `git reflog` 寻找游离分支的提交。
   :::

## 15. GitFlow

GitFlow 是团队开发的一种最佳实践，将代码划分为以下几个分支

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/1710828311788-0bd8a49c-99f3-4991-a9ae-593ac0d8d7bc.png)


|   分支   | 含义                                                                                          |
| :-------: | :-------------------------------------------------------------------------------------------- |
| `master` | 主分支，只保存**正式发布**的代码。                                                            |
| `develop` | 开发分支，开发者的编写的代码最终要出现在这个分支。                                            |
| `hotfix` | 线上 bug 修复分支，修复完毕后要合并回 master 和 develop 分支，同时在 master 分支上打一个tag。 |
| `feature` | 功能分支，当开发某个功能时创建一个单独的分支，开发完毕后再合并到 dev 分支。                   |
| `release` | 待发布分支，Release分支基于Develop分支创建，在这个Release分支上测试。                         |

## 16. 补充内容

### 16.1. 【.git】目录介绍

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/git/git_base/gitls.png)

- hooks 目录包含客户端或服务端的钩子脚本，在特定操作下自动执行
- info 信息文件夹. 包含一个全局性排除文件，可以配置文件忽略
- logs 保存日志信息
- objects 目录存储所有数据内容,本地的版本库存放位置
- refs 目录存储指向数据的提交对象的指针（分支）
- config 文件包含项目特有的配置选项
- description 用来显示对仓库的描述信息
- HEAD 文件指示目前被检出的分支
- index 暂存区文件，是一个二进制文件 (git ls-files)

::: warning
切记： 不要手动去修改 .git 文件夹中的内容
:::

### 16.2. CRLF

CRLF 是Carriage-Return Line-Feed 的缩写。

- CR 表示的是 ASCII 码的第 13 个符号 \r 回车
- LF 表示的是 ASCII 码表的第 10 个符号 \n 换行。

::: warning
每个操作系统对回车换行的存储方式不同

- windows 下用 CRLF（\r\n）表示
- linux 和 unix 下用 LF（\n）表示
- mac 系统下用 CR（\r）表示
  :::

### 16.3. 卸载Git密码管理工具

执行命令： `git config --system --unset credential.helper`
