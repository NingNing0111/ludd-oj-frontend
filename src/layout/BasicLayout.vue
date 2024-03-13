<template>
  <div id="basic-layout">
    <el-scrollbar max-height="800">
      <el-container>
        <el-header class="basic-header">
          <BasicHeader />
        </el-header>
        <el-main class="content">
          <RouterView />
        </el-main>
      </el-container>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less"></style>
