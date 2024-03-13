<template>
  <div>
    <MdView :content="content" />
  </div>
</template>

<script setup lang="ts">
import { AboutMe } from "@/common/app";
const content = ref(AboutMe);
</script>

<style scoped lang="less"></style>
