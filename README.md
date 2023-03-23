# Starlight-admin-web

### 介绍
本系统包含前后端代码，前端使用技术栈：`Vue3` + `Vite` + `Arco Design Vue` + `Pinia`；后端使用技术栈：`Nodejs` + `Mongoose` + `Fastify` + `Swagger`；数据库则是 `mongoose`。主要实现了基础管理系统的用户管理、菜单管理和角色管理；前端动态路由，实现不同用户对菜单的访问权限；多页面/单页签切换。

### 安装教程

#### 前端环境
1.  cd frontend\
2.  npm install
3.  npm run dev

#### 后端环境
1.  cd backend\
2.  npm install
3.  npm run dev

运行 `npm run dev` 之前务必将 MongoDB 的连接地址改为本地 MongoDB 地址

### 使用说明

1.  后端启动后 Swagger 地址为 http://localhost:9001/api/v1/helper/static/index.html
2.  前后端均已安装 plop，可以通过命令行快速生成模块间的固定代码，运行 `npm run new` 即可

### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

