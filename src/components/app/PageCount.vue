<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="pageCount-wrap">
    <select
      class="select-input"
      style="width: 90px"
      v-model="pageCountNum"
      @change="onChangeValue"
    >
      <option value="10" selected>10 items</option>
      <option value="30">30 items</option>
      <option value="50">50 items</option>
      <option value="100">100 items</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["pageSize"],
  data() {
    return {
      pageCountNum: 10
    };
  },
  mounted() {
    if (this.pageSize != undefined) {
      this.pageCountNum = this.pageSize;
    }
  },
  methods: {
    onChangeValue(e) {
      this.$emit("selected", e.target.value);
    }
  }
};
</script>

<style></style>
