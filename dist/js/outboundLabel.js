
var vm = new Vue({
  el: '#app',
  data: function() {
    return {
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
