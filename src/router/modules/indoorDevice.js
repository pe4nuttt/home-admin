import Layout from "@/layouts/default/Index";

export default {
  component: Layout,
  path: "/indoor-devices",
  redirect: to => {
    return { path: "indoor-devices/list" };
  },
  children: [
    {
      path: "/indoor-devices/list",
      name: "IndoorDeviceList",
      component: () => import("@/views/device-manage/indoorDevicesList")
    }
    // {
    //   path: "indoor-devices/:id",
    //   name: "IndoorDeviceDetail",
    //   component: () => import("@/views/apartment-manage/apartmentDetail"),
    //   props: true
    // }
  ]
};
