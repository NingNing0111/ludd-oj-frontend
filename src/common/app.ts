export const AboutMe = `
## 作者介绍

&emsp;Hi，我是Ludd-OJ的作者[PG Thinker](https://pgthinker.me)，一名酷爱技术的软件工程专业大学生。Ludd-OJ是我在准备实习前写的一个微服务项目，名称“Ludd”取自我对女朋友的称呼。因为受到算法竞赛的影响，我在大二期间一直想动手实现一个OJ系统，然而当时我的开发水平有限，针对代码沙箱的实现一直毫无头绪，因此搁置了许久。

&emsp;尽管如此，我的内心也从未放弃过开发一款OJ系统的梦想，直到大三寒假，参考博主鱼皮的OJ系统项目的设计思路，自己动手实现了一个采用容器化技术实现的代码沙箱，在这之后，我偶然间在GitHub上看到使用Go语言开发的代码沙箱项目：[go-judge](https://github.com/criyle/go-judge),这些项目及其涉及的设计思想对我设计一款OJ系统带来了很大帮助，并逐渐对OJ系统的实现有了非常清晰的认识。

- 博客地址: [https://pgthinker.me](https://pgthinker.me)
- GitHub主页: [https://github.com/NingNing0111](https://github.com/NingNing0111)
- 项目地址: [https://github.com/NingNing0111/ludd-oj-frontend](https://github.com/NingNing0111/ludd-oj-frontend)

## 技术介绍

&emsp;本项目采用前后端分离架构，后端业务采用微服务技术。

### 前端

1.基础框架：Vue3 + TS + Vite

2.核心组件：Element Plus

3.状态管理：pinia

4.代码编辑器组件：monaco-editor

5.Markdown编辑器组件：bytemd

6.Markdown渲染库：marked

### 后端

1.基础框架：SpringBoot、SpringMVC

2.持久化技术：Postgresql、MongoDB、JPA

3.异步通信组件：RabbitMQ

4.安全校验框架：Spring Security

## 代码沙箱实现

&emsp;代码沙箱的实现主要采用容器化技术，详情可参考我的[博客文章](https://pgthinker.me/2024/03/02/ludd-sandbox-%e4%bd%bf%e7%94%a8java%e5%92%8cdocker%e5%ae%9e%e7%8e%b0%e4%bb%a3%e7%a0%81%e6%b2%99%e7%ae%b1/)。具体实现及源码已上传至GitHub:[online-judge-sandbox](https://github.com/NingNing0111/online-judge-sandbox)。

## 判题业务的解耦实现

&emsp;我在设计整个OJ系统的判题逻辑时，一直在考虑需不需要将判题逻辑进行解耦。很多OJ平台在代码提交之后可以在提交页面一直等待判题结果，我最直观的理解就是代码提交后，会阻塞式的等待判题业务的结果响应。后来我仔细一想，OJ系统不太可能采用阻塞式的业务逻辑来处理判题业务，这会降低OJ系统的判题吞吐量，它也有可能采用非阻塞式来处理判题业务，然后通过服务器推送等方式主动向客户端推送判题结果。然而采用非阻塞式+服务器推送的方式来实现整个判题业务需要涉及到的细节很多，实现起来较为麻烦，因此我根据我的个人能力和精力，只实现异步通信的方式实现判题业务，所有判题结果均在提交页面统一展示。

&emsp;具体流程：

1.用户提交代码。

2.核心后端服务接收到提交信息后，设置提交状态，通过消息队列中间件向判题业务发送提交信息，题目提交数+1，然后返回**提交成功**等提示信息。整个代码提交流程就结束了，至于判题结果，我们不能在提交后马上得到，而是需要前往提交详情页面查看。

3.判题业务接收到来自消息队列的消息后，着手进行判题。判题完成后，修改提交状态，将判题结果放在提交信息里。同时消息队列向核心后端服务发送该题的通过情况；

4.核心后端服务接收到判题业务发送的题目通过情况后，根据该题是否通过来对该题的通过数+1。

`;
