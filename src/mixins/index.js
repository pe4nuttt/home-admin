let mixins = {
  created: function() {
    this.createListNo();
  },
  methods: {
    createListNo: function(data = [], pageSize, pageNum) {
      let dataList = data.map((item, index) => {
        return {
          ...item,
          no: index + 1 + this.pageSize * (this.pageNum - 1)
        };
      });
      return dataList;
    }
  }
};

export default mixins;
