var vm = new Vue({
  el: '#app',
  data: function() {
    return {};
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
