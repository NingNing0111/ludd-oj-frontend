<template>
  <div id="add-question">
    <el-form :model="addParam" label-width="auto" style="max-width: 850px">
      <el-form-item label="题目标题" style="width: 400px">
        <el-input
          v-model="addParam.title"
          placeholder="请输入题目标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="题目描述">
        <MdEditor :value="addParam.content" :handle-change="handleChange" />
      </el-form-item>
      <el-form-item label="题目难度">
        <el-select v-model="addParam.difficulty" style="width: 200px">
          <el-option
            v-for="item in difficultyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目标签" style="max-width: 400px">
        <el-input
          v-model="tabsValue"
          placeholder="输入标签，可以使用回车隔开"
          @keydown="inputTab"
        />
        <el-tag
          closable
          v-for="item in addParam.tags"
          @close="handleClose(item)"
          :style="
            'background-color:' +
            randomRgbaColor() +
            '; color: white;margin:2px'
          "
        >
          {{ item }}
        </el-tag>
      </el-form-item>

      <el-form-item label="测试用例">
        <el-row style="margin-left: 10px; margin-bottom: 10px">
          <el-button type="primary" @click="isAddTestCase = true"
            >添加</el-button
          >
        </el-row>
        <el-table :data="tableData" border style="min-height: 50px">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="inputData" label="输入数据"></el-table-column>
          <el-table-column prop="outputData" label="输出数据"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="danger"
                size="small"
                @click="deleteTestCase(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <div style="display: flex; justify-content: right">
        <el-button type="primary" @click="addQuestion">提交</el-button>
      </div>
    </el-form>
  </div>

  <el-dialog v-model="isAddTestCase" title="删除数据" width="500">
    <el-form :model="testCase">
      <el-form-item label="输入数据">
        <el-input v-model="testCase.inputData" type="textarea" resize="none" />
      </el-form-item>
      <el-form-item label="输出数据">
        <el-input v-model="testCase.outputData" type="textarea" resize="none" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addTestCase">添加</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { AddQuestionParam } from "@/common/question";
import { useUserStore } from "@/store/user";
import { ref, reactive, computed } from "vue";
import { randomRgbaColor } from "@/utils";
import { ElMessage, ElMessageBox } from "element-plus";
import { AddQuestionApi } from "@/api/question";
const userStore = useUserStore();

const isAddTestCase = ref(false);

const testCase = reactive({
  inputData: "",
  outputData: "",
});

const addParam = ref<AddQuestionParam>({
  title: "",
  content: "",
  difficulty: "easy",
  tags: [],
  inputData: [],
  outputData: [],
  userId: userStore.getUserInfo?.id as number,
});

const handleChange = (v: string) => {
  addParam.value.content = v;
};

const tabsValue = ref("");

const inputTab = (e: any) => {
  if (e.key === "Enter") {
    addParam.value.tags.push(tabsValue.value);
    tabsValue.value = "";
  }
};

const handleClose = (e: string) => {
  addParam.value.tags = addParam.value.tags.filter((item) => item !== e);
};

const difficultyOptions = [
  {
    value: "easy",
    label: "简单",
  },
  {
    value: "medium",
    label: "中等",
  },
  {
    value: "hard",
    label: "苦难",
  },
];

const tableData: any[] = reactive([]);

const addTestCase = () => {
  tableData.push({
    inputData: testCase.inputData,
    outputData: testCase.outputData,
  });
  isAddTestCase.value = false;
  testCase.inputData = "";
  testCase.outputData = "";
};

const addQuestion = () => {
  // 获取输入数据
  for (let i = 0; i < tableData.length; i++) {
    addParam.value.inputData.push(tableData[i].inputData);
    addParam.value.outputData.push(tableData[i].outputData);
  }
  AddQuestionApi(addParam.value)
    .then((res) => {
      console.log(res);
      ElMessage({
        type: "success",
        message: res,
      });
      addParam.value = {
        title: "",
        content: "",
        difficulty: "easy",
        tags: [],
        inputData: [],
        outputData: [],
        userId: userStore.getUserInfo?.id as number,
      };
    })
    .catch((err) => {});
  console.log(addParam.value);
};

const deleteTestCase = (e: any) => {
  ElMessageBox.confirm("确定删除该条测试数据吗？", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error",
  })
    .then(() => {
      tableData.splice(e, 1);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped lang="less">
#add-question {
  display: flex;
  justify-content: center;
  overflow: auto;
  height: 100%;
}
</style>
