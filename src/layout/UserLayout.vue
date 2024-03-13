<template>
  <div id="basic-layout">
    <el-main class="content">
      <RouterView />
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
</script>

<style scoped lang="less">
#basic-layout .basic-footer {
  background-color: azure;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  text-align: center;
}
</style>
