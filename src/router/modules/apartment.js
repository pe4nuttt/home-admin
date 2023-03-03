import Layout from "@/layouts/default/Index";

export default {
  path: "users",
  component: Layout,
  path: "/apartments",
  children: [
    {
      path: "/apartments",
      name: "ApartmentList",
      component: () => import("@/views/apartment-manage/apartmentList")
    },
    {
      path: "/apartments/:id",
      name: "ApartmentDetail",
      component: () => import("@/views/apartment-manage/apartmentDetail")
    }
  ]
};
