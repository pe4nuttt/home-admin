import Layout from "@/layouts/default/Index";

export default {
  path: "users",
  component: Layout,
  children: [
    {
      path: "/users/user-list",
      name: "UserList",
      component: () => import("@/views/user-manage/userList")
    },
    {
      path: "/users/verification-account",
      name: "VerifyAccount",
      component: () => import("@/views/user-manage/verificationAccount")
    }
  ]
};
