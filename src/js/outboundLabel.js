var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      calltips: {
        intentions: [
          { value: '有意向', id: '1' },
          { value: '有意向1', id: '2' },
        ],
        noIntentions: [
          { value: '无意向', id: '1' },
          { value: '无意向1', id: '2' },
        ],
        dataErrors: [
          { value: '资料错误', id: '1' },
          { value: '资料错误1', id: '2' },
        ],
        twiceCalls: [
          { value: '二次外呼', id: '1' },
          { value: '二次外呼1', id: '2' },
        ],
      },
      depart: '',
      departShow: false,
      layers: {
        departSelect: {
          title: '覆盖标签组',
          show: false,
          submit: true,
          layerName: 'departSelect',
        },
      },
    };
  },
  methods: {
    closeLayer: function(layer) {
      console.log(layer);
      this.layers[layer].show = false;
    },
    layer: function(layer) {
      this.layers[layer].show = true;
    },
    addTips: function(type) {
      this.$data.calltips[type].push({
        value: '',
        id: '0',
        edit: true,
      });
    },
    submit: function() {
      console.log('提交');
    },
    selectClick: function() {
      this.$data.departShow = !this.$data.departShow;
    },
    treeNode: function(name) {
      console.log(name);
      this.$data.depart = name;
      this.$data.departShow = false;
      this.$data.layers.departSelect.show = true;
    },
    treeselect: function() {
      console.log('左侧选择部门');
    },
  },
});

$(document).ready(function() {});
