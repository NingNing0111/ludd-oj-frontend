import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入自动导入
import AutoImport from "unplugin-auto-import/vite";
// 自动导入UI组件
import Components from "unplugin-vue-components/vite";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 不在需要导入ref，reactive等
      imports: ["vue", "vue-router"],
      // 存放的位置
      dts: "src/auto-import.d.ts",
    }),
    Components({
      // 引入组件的信息存放位置
      dts: "src/components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`,
    ],
  },
});
