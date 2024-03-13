import { UserInfo } from "@/common/user";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    let userInfo: UserInfo | null = {
      id: -1,
      nickname: "",
      role: "",
      email: "",
      userAvatar: "",
      createTime: null,
      updateTime: null,
      userProfile: null,
      isUserBan: true,
    };
    // 尝试本地获取
    const userInfoJson = localStorage.getItem("oj_user") as string;
    const userInfoData = userInfoJson
      ? (JSON.parse(userInfoJson) as UserInfo)
      : null;
    userInfo = userInfoData;

    return {
      userInfo,
    };
  },
  getters: {
    getUserInfo(): UserInfo | null {
      return this.userInfo;
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.$patch({ userInfo });
    },
  },
});
