import { createRouter, createWebHistory } from "vue-router";
import routes from "./config";
import { useUserStore } from "@/store/user";
import { UpdateUserInfo } from "@/api/user";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 访问路径需要的权限
  const needRole = to.meta.role as string[];
  const userStore = useUserStore();

  const userInfo = userStore.getUserInfo;
  // 没有权限限制 则放行
  if (needRole.length === 0) {
    next();
  } else {
    // 否则 进行鉴权
    // 未登录的情况
    if (!userInfo || userInfo.id === -1) {
      next("/user/login");
    }
    // 登录情况下 不具有访问权限
    else if (userInfo && !needRole.includes(userInfo.role)) {
      next("/403");
    } else {
      // 放行
      next();
    }
  }
});

export default router;
