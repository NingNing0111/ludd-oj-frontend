export interface AddQuestionParam {
  title: string;
  content: string;
  difficulty: string;
  tags: string[];
  userId: number;
  inputData: string[];
  outputData: string[];
}

export interface QueryQuestionParam {
  title: string;
  tags: string[];
  difficulty: string;
}

export interface SubmitCodeParam {
  userId: number;
  language: string;
  code: string;
  questionId: number;
}

export interface SubmissionQueryParam {
  status: number | null;
  userId: number | null;
}

export interface QuestionInfo {
  id: number;
  title: string;
  content: string;
  difficulty: string;
  tags: string[];
  submitNum: number;
  acceptedNum: number;
  thumbNum: number;
  favourNum: number;
  userId: number;
  createTime: Date;
  updateTime: Date;
  isDelete: number;
}

export interface SubmissionRespInfo {
  id: number;
  language: string;
  code: string;
  judgeConfig: string;
  judgeInfo: string;
  status: number;
  questionId: number;
  userId: number;
  createTime: Date;
  updateTime: Date;
  isDelete: number;
  input: string[];
  output: string[];
  passInfo: boolean[];
}
