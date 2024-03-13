<template>
  <div id="basic-header">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      class="header-meun"
      :ellipsis="false"
    >
      <el-menu-item style="background-color: transparent">
        <el-image :src="Logo" class="logo-image" @click="toHome" />
      </el-menu-item>

      <el-menu-item
        style="background-color: transparent"
        :index="item.path"
        v-for="item in leftMenuRouterList"
        :key="item.path"
      >
        {{ item.meta?.menuName }}
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item
        style="background-color: transparent"
        :index="item.path"
        v-for="item in rightMenuRouterList"
        :key="item.path"
      >
        {{ item.meta?.menuName }}
      </el-menu-item>
      <el-menu-item v-if="isLogin" @click="loginout">退出登录</el-menu-item>
      <el-menu-item v-if="!isLogin" index="/user/login">登录</el-menu-item>
      <el-menu-item v-if="!isLogin" index="/user/register">注册</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.svg";
import routers from "@/router/config";
import { useUserStore } from "@/store/user";
import { ElMessage } from "element-plus";

const router = useRouter();
const isLogin = ref(false);
const userStore = useUserStore();

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    isLogin.value = true;
  }
});

const loginout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("oj_user");
  useUserStore();
  isLogin.value = false;
  ElMessage({
    type: "success",
    message: "退出成功",
  });
  router.push({
    path: "/user/login",
    replace: true,
  });
};

// 使用计算属性过滤不是菜单项的路由选项
const menuRouterList = computed(() => {
  return routers.filter((item) => {
    return item.meta?.isMenu;
  });
});

const rightMenuRouterList = computed(() => {
  // 获取权限
  const userInfo = userStore.getUserInfo;
  let currRole = userInfo?.role === "" ? "NONE" : (userInfo?.role as string);
  console.log(currRole);

  return menuRouterList.value.filter((item) => {
    return (
      item.meta?.isRight &&
      (item.meta?.role.length === 0 ||
        (userInfo?.role && item.meta?.role.includes(currRole)))
    );
  });
});

const leftMenuRouterList = computed(() => {
  // 获取权限
  const userInfo = userStore.getUserInfo;
  let currRole = userInfo?.role === "" ? "NONE" : (userInfo?.role as string);
  return menuRouterList.value.filter((item) => {
    return (
      item.meta?.isMenu &&
      !item.meta?.isRight &&
      (item.meta?.role.length === 0 ||
        (userInfo?.role && item.meta?.role.includes(currRole)))
    );
  });
});

const activeIndex = ref("/questions");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  router.push({
    path: key,
  });
};
router.afterEach((to) => {
  activeIndex.value = to.path;
});
const toHome = () => {
  router.push({
    path: "/",
  });
};
</script>

<style scoped lang="less">
#basic-header {
  margin-top: 10px;
}

#basic-header .logo-image {
  width: 50px;
  cursor: pointer;
}

.flex-grow {
  flex-grow: 1;
}
</style>
