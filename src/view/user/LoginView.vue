<template>
  <div id="loginPage">
    <div class="login-header">
      <el-image :src="Logo" class="logo-image" @click="toHome" />
      <h3 style="margin-left: 20px; display: flex; align-items: center">
        Ludd-OJ 登录
      </h3>
    </div>
    <div class="login-box">
      <el-form
        label-position="right"
        label-width="auto"
        :model="loginUserParam"
        style="min-width: 360px; max-width: 460px"
      >
        <el-form-item label="邮箱">
          <el-input v-model="loginUserParam.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="loginUserParam.password"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item style="display: flex">
          <el-text style="text-align: right; width: 100%"
            >没有账号？前往
            <el-link
              style="color: blue; vertical-align: baseline"
              @click="toRegister"
              >注册</el-link
            >
            一个吧！</el-text
          >
        </el-form-item>
      </el-form>
    </div>
    <div style="display: flex; justify-content: center">
      <el-button color="#626aef" @click="login"> 登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { LoginUserParam } from "@/common/user";
import Logo from "@/assets/logo.svg";
import { LoginApi } from "@/api/user";
import { ElMessage } from "element-plus";

const router = useRouter();

const loginUserParam = reactive<LoginUserParam>({
  email: "",
  password: "",
});
const toHome = () => {
  router.push({
    path: "/",
  });
};

const toRegister = () => {
  router.push({
    path: "/user/register",
    replace: true,
  });
};

const login = () => {
  LoginApi(loginUserParam)
    .then((res) => {
      if (res.code === 0) {
        ElMessage({
          type: "success",
          message: "登录成功",
        });
        setTimeout(() => {
          router.push({
            path: "/",
            replace: true,
          });
        }, 1500);
      } else {
        ElMessage({
          type: "error",
          message: res.message,
        });
      }
    })
    .catch((err) => {
      ElMessage({
        type: "error",
        message: err,
      });
    });
};
</script>

<style lang="less">
#loginPage {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url("https://pgthinker.me/wp-content/uploads/2024/03/619390107.png")
    no-repeat center center fixed;
  background-size: cover;
}

#loginPage .logo-image {
  width: 50px;
  cursor: pointer;
}

#loginPage .login-header {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

#loginPage .login-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

#loginPage .el-form-item__label {
  color: black;
  font-size: large;
  font-weight: 800;
}
</style>
