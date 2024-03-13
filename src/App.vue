<template>
  <div>
    <template v-if="router.path.startsWith('/user')">
      <RouterView />
    </template>
    <template v-else-if="router.path.startsWith('/4')">
      <RouterView />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "./layout/BasicLayout.vue";
import { useRoute } from "vue-router";
const router = useRoute();
</script>

<style scoped lang="less"></style>
