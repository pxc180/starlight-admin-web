### 动态路由
#### 添加路由
`vue-router4` 中的 `router.addRoutes()` 方法已弃用，取而代之的是 `addRoute()`。
#### 子路由问题
当一个路由存在子路由时，路由的组件中需要存在 `<router-view></router-view>` 标签，否则跳转到子路由时显示都是父路由的组件。

### KeepAlive 页面缓存
当在菜单管理中开启页面缓存设置时，菜单对应组件需要设置 **name** 属性，否则页面缓存不生效，**name** 设置规则如下：

假设菜单的路径为 `/ppp/xxx/ccc`，则组件的 **name** 应为 `ppp-xxx-ccc`。

具体规则可查看 `@/utils/permissions.js` 中 `generateAsyncMenu` 方法设置路由 **name** 属性