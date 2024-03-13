<template>
  <div id="questions-list">
    <div class="questions-search">
      <el-form v-model="queryParam" style="display: flex; flex: 1">
        <el-form-item label="题目标题">
          <el-input
            v-model="queryParam.title"
            placeholder="请输入题目标题"
          ></el-input>
        </el-form-item>

        <el-form-item label="难度" style="width: 120px; margin-left: 20px">
          <el-select v-model="selectDifficulty">
            <el-option
              v-for="item in difficultyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-left: 20px">
          <el-button type="primary" size="small" @click="searchQuestions"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="questions-table">
      <el-table :data="questions" border>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="标签">
          <template #default="scope">
            <el-tag
              v-for="item in scope.row.tags"
              type="primary"
              style="margin-right: 10px"
            >
              {{ item }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="难度">
          <template #default="scope">
            <el-tag v-if="scope.row.difficulty === 'EASY'" type="success"
              >简单</el-tag
            >
            <el-tag v-if="scope.row.difficulty === 'MEDIUM'" type="warning"
              >中等</el-tag
            >
            <el-tag v-if="scope.row.difficulty === 'HARD'" type="danger"
              >困难</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="提交次数" prop="submitNum" />
        <el-table-column label="通过次数" prop="acceptedNum" />
        <el-table-column label="通过率">
          <template #default="scope">
            <span
              >{{
                scope.row.submitNum === 0
                  ? 0
                  : (
                      (scope.row.acceptedNum / scope.row.submitNum) *
                      100
                    ).toFixed(2)
              }}%</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" width="150">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="toDoQuestion(scope.row.id)"
              >做题</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 50px">
      <el-pagination
        :page-size="currSize"
        :current-page="currPage"
        small
        background
        layout="total, prev, pager, next"
        :total="3"
        class="mt-4"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QueryQuestionApi } from "@/api/question";
import { QueryQuestionParam, QuestionInfo } from "@/common/question";
const router = useRouter();
const difficultyOptions = [
  {
    value: "all",
    label: "默认",
  },
  {
    value: "EASY",
    label: "简单",
  },
  {
    value: "MEDIUM",
    label: "中等",
  },
  {
    value: "HARD",
    label: "困难",
  },
];

const selectDifficulty = ref("all");

const questions = ref<QuestionInfo[]>([]);
const queryParam = ref<QueryQuestionParam>({
  title: "",
  tags: [],
  difficulty: selectDifficulty.value === "all" ? "" : selectDifficulty.value,
});
const currPage = ref(1);
const currSize = ref(10);
const total = ref(0);
const loadQuestionsInfo = () => {
  QueryQuestionApi(queryParam.value, currPage.value, currSize.value)
    .then((res) => {
      console.log(res);
      total.value = res.totalElements;
      questions.value = res.content;
    })
    .catch((err) => {});
};
onMounted(() => {
  loadQuestionsInfo();
});

const searchQuestions = () => {
  queryParam.value.difficulty =
    selectDifficulty.value === "all" ? "" : selectDifficulty.value;
  loadQuestionsInfo();
};

const handleCurrentChange = (e: any) => {
  currPage.value = e;
  loadQuestionsInfo();
};

const toDoQuestion = (questionId: number) => {
  router.push({
    path: "/do/" + questionId,
    replace: true,
  });
  location.reload;
};
</script>

<style scoped lang="less">
#questions-list .questions-table {
  display: flex;
  justify-content: center;
}
</style>
