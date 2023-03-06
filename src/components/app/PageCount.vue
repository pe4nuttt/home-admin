<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="pageCount-wrap">
    <select
      class="select-input"
      style="width: 90px"
      v-model="pageCountNum"
      @change="onChangeValue"
    >
      <option v-for="(item, index) in valueList" :key="index" :value="item">
        {{ item }} items
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["pageSize"],
  data() {
    return {
      pageCountNum: 10,
      valueList: [10, 30, 50, 100]
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
