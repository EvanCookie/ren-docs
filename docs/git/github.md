## 1. Github

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/github/logo-github.png)

[github](https://github.com/)是一个面向开源及私有软件项目代码的托管平台，因为只支持 Git 作为唯一的版本库格式进行托管，故名 GitHub。GitHub 于 2008 年 4 月 10 日正式上线，除了 Git 代码仓库托管及基本的 Web 管理界面以外，还提供了订阅、讨论组、文本渲染、在线文件编辑器、协作图谱（报表）、代码片段分享（Gist）等功能。



## 2. GitHub Pages

[GitHub Pages](https://docs.github.com/zh/pages/getting-started-with-github-pages/about-github-pages) 是一项静态站点托管服务，它直接从 GitHub 上的仓库获取 HTML、CSS 和 JavaScript 文件，（可选）通过构建过程运行文件，然后发布网站。 可以在 [GitHub Pages 示例集合](https://github.com/collections/github-pages-examples)中看到 GitHub Pages 站点的示例。



## 3. GitHub Actions

### 3.1 简介

![img](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/github/bg2019091201.jpg)

GitHub Actions 是一种持续集成和持续交付 ([CI/CD](https://zh.wikipedia.org/wiki/CI/CD)) 平台，可用于自动执行生成、测试和部署管道。Github于2019年11月后对该功能全面开放，现在所有的Github用户可以直接使用该功能。GitHub 提供 Linux、Windows 和 macOS 虚拟机来运行您的工作流程，或者您可以在自己的数据中心或云基础架构中托管自己的自托管运行器。

### 3.2 基本概念

- **workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow。
- **job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。
- **step**（步骤）：每个 job 由多个 step 构成，一步步完成。
- **action** （动作）：每个 step 可以依次执行一个或多个命令（action）。

### 3.3 workflow 工作流程

![image-20240801162250503](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/github/image-20240801162250503.png)

![image-20240801162331129](https://cdn.jsdelivr.net/gh/EvanCookie/pictureBed@master/github/image-20240801162331129.png)

工作流程是一个可配置的自动化过程，它将运行一个或多个作业。 工作流程在代码仓库的 `.github/workflows` 目录中定义，`workflow`工作流程采用  `YAML`配置文件，后缀名为`.yml`，并在事件触发时运行，也可以手动触发，或按定义的时间表触发。存储库可以有多个工作流程，每个工作流程都可以执行不同的任务集。

workflow 文件的配置字段非常多，详见[官方文档](https://docs.github.com/zh/actions/writing-workflows/workflow-syntax-for-github-actions)