<template>
  <div id="question-do">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-scrollbar max-height="80vh">
          <el-card shadow="hover">
            <template #header>
              <div style="display: flex; justify-content: space-between">
                <h2>{{ questionId + ". " + questionInfo?.title }}</h2>
                <div style="display: flex">
                  <el-tag
                    v-for="item in questionInfo?.tags"
                    type="primary"
                    size="large"
                    style="margin-left: 10px"
                  >
                    {{ item }}
                  </el-tag>
                </div>
              </div>
            </template>
            <MdView :content="questionInfo?.content" />
          </el-card>
        </el-scrollbar>
      </el-col>

      <el-col :span="12">
        <el-row justify="end">
          <el-select
            v-model="submitParam.language"
            style="margin-bottom: 20px; max-width: 100px"
          >
            <el-option
              v-for="item in languages"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-row>
        <div style="box-shadow: 1px 1px 1px 1px gray">
          <CodeEditor :value="submitParam.code" :handle-change="handleChange" />
        </div>
        <el-row justify="end" style="margin: 20px">
          <el-button type="primary" @click="submitCode">提交</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { QueryQuestionByIdApi, SubmitCodeApi } from "@/api/question";
import { QuestionInfo, SubmitCodeParam } from "@/common/question";
import { useUserStore } from "@/store/user";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const router = useRoute();
const questionId = Number.parseInt(router.params.questionId as string);
const questionInfo = ref<QuestionInfo>();
const languages = reactive(["java", "cpp", "go"]);

const handleChange = (e: string) => {
  submitParam.value.code = e;
};

const loadQuestionInfo = () => {
  QueryQuestionByIdApi(questionId)
    .then((res) => {
      if (res === null) {
        ElMessage({
          type: "error",
          message: "题目信息请求异常",
        });
      } else {
        questionInfo.value = res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const submitParam = ref<SubmitCodeParam>({
  userId: userStore.getUserInfo === null ? -1 : userStore.getUserInfo.id,
  code: "",
  language: "java",
  questionId: questionId,
});

onMounted(() => {
  loadQuestionInfo();
});

const submitCode = () => {
  console.log(submitParam.value);

  SubmitCodeApi(submitParam.value)
    .then((res) => {
      if (res === null) {
        ElMessage({
          type: "error",
          message: "服务器异常",
        });
      } else {
        ElMessage({
          type: "success",
          message: res,
        });
        submitParam.value.language = "java";
        handleChange("");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped lang="less"></style>
