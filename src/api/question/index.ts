import { Question } from "@/common/api";
import {
  AddQuestionParam,
  QueryQuestionParam,
  QuestionInfo,
  SubmissionQueryParam,
  SubmitCodeParam,
} from "@/common/question";
import request from "@/http";

// 添加题目
export const AddQuestionApi = async (
  param: AddQuestionParam
): Promise<string> => {
  try {
    const resp = await request.post(Question.Add, param);
    if (resp.code === 0) {
      return resp.data;
    } else {
      return resp.message;
    }
  } catch (err) {
    console.log(err);
    return "添加异常";
  }
};

// 查询题目列表
export const QueryQuestionApi = async (
  param: QueryQuestionParam,
  page: number,
  size: number
): Promise<any> => {
  try {
    let url = Question.Query + "/" + (page - 1) + "/" + size;
    const resp = await request.get(url, param);
    if (resp.code === 0) {
      return resp.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// 题目详情
export const QueryQuestionByIdApi = async (
  questionId: number
): Promise<any> => {
  try {
    let url = Question.Query + "/" + questionId;
    const resp = await request.get(url);
    if (resp.code === 0) {
      return resp.data;
    }
    return null;
  } catch (err) {
    console.log("题目详情API:", err);

    return null;
  }
};

// 提交题目代码
export const SubmitCodeApi = async (
  submitParam: SubmitCodeParam
): Promise<any> => {
  try {
    const resp = await request.post(Question.Submit, submitParam);
    if (resp.code === 0) {
      return resp.data;
    }
    return null;
  } catch (err) {
    console.log("提交API：", err);

    return null;
  }
};

// 提交结果查询
export const SubmissionQueryApi = async (
  submissionParam: SubmissionQueryParam,
  page: number,
  size: number
): Promise<any> => {
  try {
    let url = Question.QuerySubmit + "/" + (page - 1) + "/" + size;
    const resp = await request.get(url, submissionParam);
    if (resp.code === 0) {
      return resp.data;
    }
    return null;
  } catch (err) {
    console.log("提交结果查询API：", err);

    return null;
  }
};
