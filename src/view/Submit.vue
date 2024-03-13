<template>
  <div id="submitions-list">
    <div class="submitions-search">
      <el-form v-model="queryParam" style="display: flex; flex: 1">
        <el-form-item label="用户ID">
          <el-input
            v-model="queryParam.userId"
            placeholder="请输入用户ID"
          ></el-input>
        </el-form-item>

        <el-form-item label="判题状态" style="width: 180px; margin-left: 10px">
          <el-select v-model="queryParam.status" placeholder="请选择">
            <el-option
              v-for="item in judgeStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-left: 20px">
          <el-button type="primary" size="small" @click="searchSubmitions"
            >查询</el-button
          >
        </el-form-item>

        <el-form-item style="margin-left: 20px">
          <el-button type="warning" size="small" @click="searchMySubmitions"
            >查看我的</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="submitions-table">
      <el-table :data="subData" border>
        <el-table-column prop="id" label="提交ID"></el-table-column>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="questionId" label="题目ID"></el-table-column>

        <el-table-column prop="language" label="语言"></el-table-column>
        <el-table-column label="判题状态">
          <template #default="scope">
            <el-tag type="info" v-if="scope.row.status === 0">等待</el-tag>
            <el-tag type="primary" v-if="scope.row.status === 1">判题中</el-tag>
            <el-tag type="success" v-if="scope.row.status === 2">成功</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 3">失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="判题结果">
          <template #default="scope">
            <el-tag v-if="scope.row.result === '通过'" type="success">
              {{ scope.row.result }}
            </el-tag>
            <el-tag v-else type="danger">
              {{ scope.row.result }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="内存消耗(KB)">
          <template #default="scope">
            {{ scope.row.useMemory > 0 ? scope.row.useMemory / 1024 : -1 }}
          </template>
        </el-table-column>
        <el-table-column label="时间消耗(ms)">
          <template #default="scope">
            {{ scope.row.useTime }}
          </template>
        </el-table-column>
        <el-table-column min-width="100px">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="codeDetail(scope.row)"
              >查看代码</el-button
            >
            <el-button type="warning" size="small">查看详情</el-button>
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
        :total="total"
        class="mt-4"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-drawer v-model="isShow" direction="rtl">
      <template #header>
        <h2>代码查看</h2>
      </template>
      <template #default>
        <MdView :content="code" />
      </template>
      <template #footer>
        <el-button type="primary" @click="copyCode">一键复制</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { SubmissionQueryApi } from "@/api/question";
import { SubmissionQueryParam } from "@/common/question";
import { SubmissionRespInfo } from "@/common/question";
import { useUserStore } from "@/store/user";
import { copy } from "@/utils";
import { ElMessage } from "element-plus";
interface SubmissionInfo {
  id: number;
  language: string;
  code: string;
  useMemory: number;
  useTime: number;
  result: string;
  status: number;
  questionId: number;
  input: string[];
  output: string[];
  passInfo: boolean[];
  userId: number;
}

const judgeStatus = [
  {
    value: 0,
    label: "等待中",
  },
  {
    value: 1,
    label: "判题中",
  },
  {
    value: 2,
    label: "成功",
  },
  {
    value: 3,
    label: "失败",
  },
];

const queryParam = ref<SubmissionQueryParam>({
  userId: null,
  status: null,
});
const userStore = useUserStore();
const currSize = ref(10);
const currPage = ref(1);
const total = ref(100);
const subData = ref<SubmissionInfo[]>([]);
const isShow = ref(false);
const code = ref("");

const codeDetail = (e: any) => {
  isShow.value = true;
  code.value = "```" + e.language + "\n" + e.code + "```";
};

const copyCode = () => {
  copy(code.value);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
};
const loadSubmitionsInfo = () => {
  subData.value = [];
  queryParam.value.status =
    queryParam.value.status === -1 ? null : queryParam.value.status;

  SubmissionQueryApi(queryParam.value, currPage.value, currSize.value)
    .then((res) => {
      total.value = res.totalElements;
      let respInfo: SubmissionRespInfo[] = res.content;
      respInfo.forEach((e) => {
        let judgeInfo = JSON.parse(e.judgeInfo);
        console.log(judgeInfo);

        let result =
          e.status === 0 || e.status === 1
            ? "-"
            : judgeInfo === null
            ? "代码错误"
            : judgeInfo.message;
        let subInfo: SubmissionInfo = {
          id: e.id,
          language: e.language,
          code: e.code,
          useMemory:
            judgeInfo !== null
              ? judgeInfo.message === "通过"
                ? judgeInfo.memory
                : -1
              : -1,
          useTime:
            judgeInfo !== null
              ? judgeInfo.message === "通过"
                ? judgeInfo.time
                : -1
              : -1,
          result: result,
          status: e.status,
          questionId: e.questionId,
          input: e.input,
          output: e.output,
          passInfo: e.passInfo,
          userId: e.userId,
        };
        subData.value.push(subInfo);
        subData.value.sort((a, b) => b.id - a.id);
        console.log(subInfo.id, subInfo.useMemory, subInfo.useTime);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  loadSubmitionsInfo();
  liveUpdateSubmitInfo();
});

const liveUpdateSubmitInfo = () => {
  // 每隔3s执行一次loadSubmitionsInfo();
  setInterval(() => {
    loadSubmitionsInfo();
  }, 30000);
};

const searchSubmitions = () => {
  loadSubmitionsInfo();
};

const handleCurrentChange = (e: any) => {
  console.log(e);
  currPage.value = e;
  loadSubmitionsInfo();
};

const searchMySubmitions = () => {
  queryParam.value.userId = userStore.getUserInfo?.id as number;
  loadSubmitionsInfo();
};
</script>

<style scoped lang="less">
#submitions-list .submitions-table {
  display: flex;
  justify-content: center;
}
</style>
