<template>
  <div id="registerPage">
    <div class="register-header">
      <el-image :src="Logo" class="logo-image" @click="toHome" />
      <h3 style="margin-left: 20px; display: flex; align-items: center">
        Ludd-OJ 用户注册
      </h3>
    </div>
    <div class="register-box">
      <el-form
        label-position="left"
        label-width="auto"
        :model="registerUserParam"
        style="min-width: 360px; max-width: 460px"
      >
        <el-form-item label="昵称">
          <el-input
            v-model="registerUserParam.nickname"
            placeholder="请输入昵称"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="registerUserParam.email"
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="registerUserParam.password"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码">
          <el-input
            v-model="registerUserParam.checkPassword"
            placeholder="请确认密码"
            type="password"
            show-password
          />
        </el-form-item>

        <el-form-item style="display: flex">
          <el-text style="text-align: right; width: 100%"
            >已有账号？前往
            <el-link
              style="color: blue; vertical-align: baseline"
              @click="toLogin"
              >登录</el-link
            >
            吧！</el-text
          >
        </el-form-item>
      </el-form>
    </div>
    <div style="display: flex; justify-content: center">
      <el-button color="#626aef" @click="register"> 注册</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { RegisterUserParam } from "@/common/user";
import Logo from "@/assets/logo.svg";
import { RegisterApi } from "@/api/user";
import { ElMessage } from "element-plus";
const router = useRouter();

const registerUserParam = ref<RegisterUserParam>({
  email: "",
  password: "",
  nickname: "",
  checkPassword: "",
});
const toHome = () => {
  router.push({
    path: "/",
  });
};

const toLogin = () => {
  router.push({
    path: "/user/login",
    replace: true,
  });
};

const register = () => {
  RegisterApi(registerUserParam.value)
    .then((resp) => {
      if (resp === null) {
        ElMessage({
          type: "error",
          message: "登录异常",
        });
      } else {
        if (resp.code === 0) {
          ElMessage({
            type: "success",
            message: resp.data,
          });
          setTimeout(() => {
            router.push({
              path: "/user/login",
              replace: true,
            });
          }, 1500);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style lang="less">
#registerPage {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url("https://pgthinker.me/wp-content/uploads/2024/03/619390107.png")
    no-repeat center center fixed;
  background-size: cover;
}

#registerPage .logo-image {
  width: 50px;
  cursor: pointer;
}

#registerPage .register-header {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

#registerPage .register-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

#registerPage .el-form-item__label {
  color: black;
  font-size: larger;
  font-weight: 500;
}
</style>
