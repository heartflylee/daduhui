var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      seaList: [
        {
          headUrl: 'img/head.png',
          name: '刘宇',
          id: '',
          check: false,
        },
        {
          headUrl: 'img/head.png',
          name: '刘宇',
          id: '',
          check: true,
        },
      ],
      calldownSwitch: false,
      hiddenPhoneSwitch: false,
    };
  },
  methods: {
    submit: function() {
      console.log('提交');
    },
    treeselect: function() {
      console.log('左侧选择部门');
    },
    checkChange: function(id, check) {
      if (check) {
        console.log('允许使用');
      } else {
        console.log('不允许使用');
      }
    },
  },
});
$(function() {
  switchEvent(
    '#calldownSwitch',
    function() {
      console.log('挂机时间开');
      vm.$data.calldownSwitch = true;
    },
    function() {
      console.log('挂机时间关');
      vm.$data.calldownSwitch = false;
    }
  );
  switchEvent(
    '#hiddenPhoneSwitch',
    function() {
      console.log('隐藏号码开');
      vm.$data.hiddenPhoneSwitch = true;
    },
    function() {
      console.log('隐藏号码关');
      vm.$data.hiddenPhoneSwitch = false;
    }
  );
});
