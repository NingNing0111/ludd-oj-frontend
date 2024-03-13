<template>
  <el-card width="auto">
    <el-scrollbar>
      <div v-highlight v-html="marked(content)"></div>
    </el-scrollbar>
  </el-card>
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: String,
    required: true,
    default: `
      \`\`\`java
      public class Solution {

      }
      \`\`\`
    `,
  },
});

// 将marked 引入
import { marked } from "marked";
</script>

<style scoped></style>
