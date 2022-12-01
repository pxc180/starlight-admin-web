### vue-router4 动态路由相关问题记录
#### 添加路由
旧版的 `router.addRoutes()` 方法已弃用，取而代之的是 `addRoute()`，
#### 子路由问题
当一个路由存在子路由时，路由的组件中需要存在 `<router-view></router-view>` 标签，否则跳转到该路由的子路由时显示都是它们的父路由的组件。