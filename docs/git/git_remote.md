## 1. Git远程常用命令

[Git](https://git-scm.com/)是目前最流行的 **版本管理系统**

Git有很多优势，其中之一就是远程操作非常简便。

![img](./assets/git_remote/bg2014061202.jpg)

::: info 常用命令
- git clone

- git remote

- git fetch

- git pull

- git push
  :::

  
  
## 2. git clone

远程操作的第一步，通常是从远程主机克隆一个版本库，这时就要用到`git clone`命令。

```bash
git clone <版本库的网址>
```

比如，克隆Vue.js的版本库

```bash
git clone https://github.com/vuejs/core.git
```

该命令会在本地主机生成一个目录，与远程主机的版本库同名。如果要指定不同的目录名，可以将目录名作为`git clone`命令的第二个参数。

```bash
git clone <版本库的网址> <本地目录名>
```

`git clone`支持多种协议，除了HTTP(s)以外，还支持SSH、Git、本地文件协议等，下面是一些例子。

```bash
git clone http[s]://example.com/path/to/repo.git/
git clone ssh://example.com/path/to/repo.git/
git clone git://example.com/path/to/repo.git/
git clone /opt/git/project.git 
git clone file:///opt/git/project.git
git clone ftp[s]://example.com/path/to/repo.git/
git clone rsync://example.com/path/to/repo.git/
```

SSH协议还有另一种写法。

```bash
git clone [user@]example.com:path/to/repo.git/
```

Git协议下载速度最快，SSH协议用于需要用户认证的场合。各种协议详细请参考[官方文档](http://git-scm.com/book/en/Git-on-the-Server-The-Protocols)。

## 3. git remote

Git要求每个远程主机都必须指定一个主机名 `git remote`命令就用于管理主机名。

不带选项的时候，`git remote`命令列出所有远程主机名。

```bash
git remote
origin
```

使用`-v`选项，可以参看远程主机的网址。
下面命令表示，当前只有一台远程主机，叫做origin，以及它的网址。

```bash
git remote -v
origin  https://github.com/fushe1024/Renwick.git (fetch)
origin  https://github.com/fushe1024/Renwick.git (push)
```


克隆版本库的时候，所使用的远程主机自动被Git命名为`origin`。如果想用其他的主机名，需要用`git clone`命令的`-o`选项指定。

下面命令表示，克隆的时候，指定远程主机叫做jQuery。

```bash
git clone -o jQuery https://github.com/jquery/jquery.git
git remote
jQuery
```


`git remote show`命令加上主机名，可以查看该主机的详细信息。

```bash
git remote show <主机名>
```

`git remote add`命令用于添加远程主机。

```bash
 git remote add <主机名> <网址>
```

`git remote set-url`命令用于更改远程主机地址。

```bash
 git remote set-url <主机名> <网址>
```

`git remote rm`命令用于删除远程主机。

```bash
 git remote rm <主机名>
```

`git remote rename`命令用于远程主机的改名。

```bash
 git remote rename <原主机名> <新主机名>
```

## 4. git fetch

一旦远程主机的版本库有了更新（Git术语叫做commit），需要将这些更新取回本地，这时就要用到`git fetch`命令，通常用来查看其他人的进程，看一下它取回的代码对你本地的开发代码没有影响。

```bash
 git fetch <远程主机名>
```

默认取回所有分支（branch）的更新。如果只想取回特定分支的更新，可以指定分支名。

```bash
 git fetch <远程主机名> <分支名>
```

比如，取回`origin`主机的`develop`分支。

```bash
 git fetch origin develop
```
::: tip 提示
 - 所取回的更新，在本地主机上要用"远程主机名/分支名"的形式读取。
 - 比如 `origin` 主机的 `master`，就要用`origin/master`读取。
:::

`git branch`命令的`-r`选项，可以用来查看远程分支，`-a`选项查看所有分支。

```bash
git branch -r
origin/master

git branch -a
* master
  remotes/origin/master
```

取回远程主机的更新以后，可以在它的基础上，使用`git checkout`命令创建一个新的分支。

下面命令表示，在`origin/test`的基础上，创建一个新分支`test`。

```bash
git checkout -b test origin/test
```

也可以使用`git merge`命令或者`git rebase`命令，在本地分支上合并远程分支。

```bash
 git merge origin/master
# 或者
 git rebase origin/master
```

上面命令表示在当前分支上，合并`origin/master`。

## 5. git pull

`git pull`命令的作用是，取回远程主机某个分支的更新，再与本地的指定分支合并。

```bash
 git pull <远程主机名> <远程分支名>:<本地分支名>
```

比如，取回`origin`主机的`master`分支，与本地的`develop`分支合并，需要写成下面这样。

```bash
 git pull origin master:develop
```

如果远程分支是与当前分支合并，则冒号后面的部分可以省略。下面命令表示，取回`origin/master`分支，再与当前分支合并，

```bash
 git pull origin master
```

实质上，这等同于先做`git fetch`，再做`git merge`。

```bash
 git fetch origin
 git merge origin/next
```

::: info 说明
在某些场合，Git会自动在本地分支与远程分支之间，建立一种追踪关系（tracking）, 在`git clone`的时候，所有本地分支默认与远程主机的同名分支，建立追踪关系，也就是说，本地的`master`分支自动"追踪"`origin/master`分支。
:::

Git也允许手动建立追踪关系。下面命令指定`master`分支追踪`origin/next`分支。

```bash
git branch --set-upstream master origin/next
```

如果当前分支与远程分支存在追踪关系，`git pull`就可以省略远程分支名。下面命令表示，本地的当前分支自动与对应的`origin`主机"追踪分支"（remote-tracking branch）进行合并。

```bash
 git pull origin
```



如果当前分支只有一个追踪分支，连远程主机名都可以省略。

```bash
 git pull
```

如果合并需要采用rebase模式，可以使用`--rebase`选项。

```bash
 git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
```

::: warning 注意
如果远程主机删除了某个分支，默认情况下，`git pull` 不会在拉取远程分支的时候，删除对应的本地分支。这是为了防止，由于其他人操作了远程主机，导致`git pull`不知不觉删除了本地分支。

但是，你可以改变这个行为，加上参数 `-p` 就会在本地删除远程已经删除的分支。

```bash
git pull -p
# 等同于下面的命令
git fetch --prune origin 
git fetch -p
```
:::

## 6. git push

`git push`命令用于将本地分支的更新，推送到远程主机。

```bash
 git push <远程主机名> <本地分支名>:<远程分支名>
```

::: warning 注意
分支推送顺序的写法是<来源地>:<目的地>
 - `git pull`是<远程分支>:<本地分支>
 - `git push`是<本地分支>:<远程分支>。
:::

如果省略远程分支名，则表示将本地分支推送与之存在"追踪关系"的远程分支（通常两者同名），如果该远程分支不存在，则会被新建。

```bash
 git push origin master
```

::: danger 警告
如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。
```bash
 git push origin :master
# 等同于
 git push origin --delete master
```
上面命令表示删除`origin`主机的`master`分支。
:::

如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。

```bash
 git push origin
```

如果当前分支只有一个追踪分支，那么主机名都可以省略。

```bash
 git push
```

如果当前分支与多个主机存在追踪关系，则可以使用`-u`选项指定一个默认主机，这样后面就可以不加任何参数使用`git push`。

```bash
 git push -u origin master
```

::: tip 补充
不带任何参数的`git push`，默认只推送当前分支，这叫做simple方式。此外，还有一种matching方式，会推送所有有对应的远程分支的本地分支。Git 2.0版本之前，默认采用matching方法，现在改为默认采用simple方式。如果要修改这个设置，可以采用`git config`命令。

```bash
 git config --global push.default matching
# 或者
 git config --global push.default simple
```
:::

还有一种情况，就是不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机，这时需要使用`--all`选项。下面命令表示，将所有本地分支都推送到`origin`主机。

```bash
 git push --all origin
```


::: warning 注意
如果远程主机的版本比本地版本更新，推送时Git会报错，要求先在本地做`git pull`合并差异，然后再推送到远程主机。这时，如果你一定要推送，可以使用`--force`选项。

```bash
 git push --force origin 
```

该命令会导致远程主机上更新的版本被覆盖。除非你很确定要这样做，否则应该尽量避免使用`--force`选项。
:::

`git push`不会推送标签（tag），除非使用`--tags`选项。

```bash
 git push origin --tags
```
