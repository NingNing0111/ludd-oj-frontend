import { LoginUserParam, RegisterUserParam, UserInfo } from "@/common/user";
import { User } from "@/common/api";
import request from "@/http";
import { useUserStore } from "@/store/user";
const user = useUserStore();

export const LoginApi = async (loginParam: LoginUserParam): Promise<any> => {
  try {
    const resp = await request.post(User.Login, loginParam);
    if (resp.code === 0) {
      const token = resp.data.token;
      const userInfo = resp.data.info as UserInfo;
      localStorage.setItem("token", token);
      localStorage.setItem("oj_user", JSON.stringify(userInfo));
      user.setUserInfo(userInfo);
    }
    return resp;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const RegisterApi = async (
  registerParam: RegisterUserParam
): Promise<any> => {
  try {
    const resp = await request.post(User.Register, registerParam);
    return resp;
  } catch (err) {
    console.log(err);

    return null;
  }
};

export const UpdateUserInfo = async () => {
  const resp = await request.get(User.UserInfo);
  if (resp.code === 0) {
    const userInfo = resp.data as UserInfo;
    localStorage.setItem("oj_user", JSON.stringify(userInfo));
    user.setUserInfo(userInfo);
  }
};
