
var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      calltips:{
        intentions: [{value:'有意向',id:'1'},{value: '有意向1',id:'2'}],
        noIntentions: [{value:'无意向' ,id:"1"},{value:  '无意向1',id:"2"}],
        dataErrors: [{value:'资料错误',  id:"1"},{value: '资料错误1',id:"2"}],
        twiceCalls: [{value:'二次外呼',  id:"1"},{value: '二次外呼1',id:"2"}],
      },
      layers: {
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
    
  },
});

$(document).ready(function() {
  
});
