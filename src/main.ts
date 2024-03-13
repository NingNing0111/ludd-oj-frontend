import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import "bytemd/dist/index.css";

// 导入router
import router from "@/router";
// 导入Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 导入pinia
import { createPinia } from "pinia";

import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; //样式

const pinia = createPinia();

const app = createApp(App);

//创建v-highlight全局指令
app.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block: any) => {
    hljs.highlightBlock(block);
  });
});

// 使用pinia
app.use(pinia);
// 使用router
app.use(router);

// 使用Element Plus
app.use(ElementPlus);

app.mount("#app");
