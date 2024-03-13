<template>
  <div>
    <h1>个人页面</h1>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { UpdateUserInfo } from "@/api/user";
const user = useUserStore();
onMounted(() => {
  UpdateUserInfo()
    .then((res) => {
      const userInfo = user.getUserInfo;
      console.log("个人详情页", userInfo);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style scoped lang="less"></style>
