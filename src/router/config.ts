let routes = [
  {
    path: "/user",
    component: () => import("@/layout/UserLayout.vue"),
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: () => import("@/view/user/LoginView.vue"),
        meta: {
          isMenu: false,
          role: [],
        },
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: () => import("@/view/user/RegisterView.vue"),
        meta: {
          isMenu: false,
          role: [],
        },
      },
    ],
  },

  {
    path: "/",
    name: "home",
    redirect: "/questions",
    meta: {
      isMenu: false,
      role: [],
    },
  },
  {
    path: "/questions",
    name: "questions",
    component: () => import("@/view/question/Questions.vue"),
    meta: {
      isMenu: true,
      menuName: "题目列表",
      isRight: false,
      role: [],
    },
  },
  {
    path: "/do/:questionId",
    name: "做题页面",
    component: () => import("@/view/question/QuestionView.vue"),
    meta: {
      isMenu: false,
      role: ["USER", "ADMIN", "ROOT"],
    },
  },
  {
    path: "/submit",
    name: "submit",
    component: () => import("@/view/Submit.vue"),
    meta: {
      isMenu: true,
      menuName: "提交记录",
      isRight: false,
      role: [],
    },
  },
  // {
  //   path: "/discuss",
  //   name: "discuss",
  //   component: () => import("@/view/Discuss.vue"),
  //   meta: {
  //     isMenu: true,
  //     menuName: "题目讨论",
  //     isRight: false,
  //     role: [],
  //   },
  // },
  {
    path: "/about",
    name: "about",
    component: () => import("@/view/About.vue"),
    meta: {
      isMenu: true,
      menuName: "关于Ludd-OJ",
      isRight: false,
      role: [],
    },
  },
  {
    path: "/personal",
    name: "personal",
    component: () => import("@/view/Personal.vue"),
    meta: {
      role: ["USER", "ADMIN", "ROOT"],
      isMenu: true,
      menuName: "我的",
      isRight: true,
    },
  },
  {
    path: "/add/question",
    name: "添加题目",
    component: () => import("@/view/question/AddQuestion.vue"),
    meta: {
      role: [
        "ADMIN", //管理员或超级管理员可见
        "ROOT",
      ],
      isMenu: true,
      menuName: "添加题目",
      isRight: true,
    },
  },

  {
    path: "/403",
    name: "403",
    component: () => import("@/view/403.vue"),
    meta: {
      role: [],
    },
  },
];

export default routes;
