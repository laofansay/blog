<p align="center">
  <a href="https://midwayjs.org/" target="blank"><img src="https://cool-show.oss-cn-shanghai.aliyuncs.com/admin/logo.png" width="200" alt="Midway Logo" /></a>
</p>

<p align="center">cool-admin(nodejs版)一个很酷的后台权限管理系统，开源免费，Ai编码、流程编排、模块化、插件化、极速开发CRUD，方便快速构建迭代后台管理系统，支持原生、docker、普通服务器等多种方式部署
到 <a href="https://cool-js.com" target="_blank">官网</a> 进一步了解。
<p align="center">
    <a href="https://github.com/cool-team-official/cool-admin-midway/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="GitHub license" />
    <a href=""><img src="https://img.shields.io/github/package-json/v/cool-team-official/cool-admin-midway?style=flat-square" alt="GitHub tag"></a>
    <img src="https://img.shields.io/github/last-commit/cool-team-official/cool-admin-midway?style=flat-square" alt="GitHub tag"></a>
</p>

## 特性

Ai 时代，很多老旧的框架已经无法满足现代化的开发需求，Cool-Admin 开发了一系列的功能，让开发变得更简单、更快速、更高效。

- **Ai 编码**：通过微调大模型学习框架特有写法，实现简单功能从 Api 接口到前端页面的一键生成[详情](https://node.cool-admin.com/src/guide/ai.html)
- **流程编排**：通过拖拽编排方式，即可实现类似像智能客服这样的功能[详情](https://node.cool-admin.com/src/guide/flow.html)
- **多租户**：支持多租户，采用全局动态注入查询条件[详情](https://node.cool-admin.com/src/guide/core/tenant.html)
- **多语言**：基于大模型自动翻译，无需更改原有代码[详情](https://node.cool-admin.com/src/guide/core/i18n.html)
- **原生打包**：打包成 exe 等安装包，打包完可以直接运行在 windows、mac、linux 等操作系统上[详情](https://node.cool-admin.com/src/guide/core/pkg.html)
- **模块化**：代码是模块化的，清晰明了，方便维护
- **插件化**：插件化的设计，可以通过安装插件的方式扩展如：支付、短信、邮件等功能
- ......

![](https://cool-show.oss-cn-shanghai.aliyuncs.com/admin/flow.png)

## 技术栈

- 后端：**`node.js` `typescript`**
- 前端：**`vue.js` `element-plus` `jsx` `pinia` `vue-router`**
- 数据库：**`mysql` `postgresql` `sqlite`**

如果你是前端，后端的这些技术选型对你是特别友好的，前端开发者可以较快速地上手。
如果你是后端，Typescript 的语法又跟 java、php 等特别类似，一切看起来也是那么得熟悉。

如果你想使用 java 版本后端，请移步[cool-admin-java](https://cool-js.com/admin/java/introduce.html)

#### 官网

[https://cool-js.com](https://cool-js.com)

## 视频教程

[官方 B 站视频教程](https://www.bilibili.com/video/BV1j1421R7aB)

<!-- 在此次添加使用文档 -->

## 演示

[AI 极速编码](https://node.cool-admin.com/src/guide/ai.html)

[https://show.cool-admin.com](https://show.cool-admin.com)

- 账户：admin
- 密码：123456

<img src="https://cool-show.oss-cn-shanghai.aliyuncs.com/admin/home-mini.png" alt="Admin Home"></a>

#### 项目前端

[https://github.com/cool-team-official/cool-admin-vue](https://github.com/cool-team-official/cool-admin-vue)

或

[https://gitee.com/cool-team-official/cool-admin-vue](https://gitee.com/cool-team-official/cool-admin-vue)

或

[https://gitcode.com/cool_team/cool-admin-vue](https://gitcode.com/cool_team/cool-admin-vue)

## 微信群

## 运行

#### 修改数据库配置，配置文件位于`src/config/config.local.ts`

以 Mysql 为例，其他数据库请参考[数据库配置文档](https://cool-js.com/admin/node/quick.html#%E6%95%B0%E6%8D%AE%E5%BA%93%E9%85%8D%E7%BD%AE)

Mysql(`>=5.7版本`)，建议 8.0，node 版本(`>=18.x`)，首次启动会自动初始化并导入数据

```ts
// mysql，驱动已经内置，无需安装
typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'cool',
        // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
        synchronize: true,
        // 打印日志
        logging: false,
        // 字符集
        charset: 'utf8mb4',
        // 是否开启缓存
        cache: true,
        // 实体路径
        entities: ['**/modules/*/entity'],
      },
    },
  },
```

#### 安装依赖并运行

<http://127.0.0.1:8080/swagger/json>

### 部署

[部署教程](https://node.cool-admin.com/src/guide/deploy.html)

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
