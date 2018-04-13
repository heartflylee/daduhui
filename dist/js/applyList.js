/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
  var dataRow;
  dataRow = {
    name: '刘晓辉',
    phone: '13611121111',
    startTime: '2018-03-06',
  };
  data.push(dataRow);
}
/*制作假数据结束*/

var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      checklength: 0,
    };
  },
  methods: {
    // closeLayer: function(layer) {
    //   console.log(layer);
    //   this.layers[layer].show = false;
    // },
    // layer: function(layer) {
    //   this.layers[layer].show = true;
    // }
  },
});

$(document).ready(function() {
  var source = {
    datatype: 'json',
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'phone', type: 'string' },
      { name: 'startTime', type: 'string' },
    ],
    localdata: data,
  };
  var dataAdapter = new $.jqx.dataAdapter(source);
  console.log(dataAdapter);

  // 创建表格
  $('#jqxtable').jqxGrid({
    width: '100%',
    height: '100%',
    source: dataAdapter,
    columnsresize: true, //调整列的宽度
    columnsheight: 45, //头部高度
    scrollbarsize: 7,
    sortable: true, //排序
    ready: function() {
      // addfilter();
    },
    scrollmode: 'logical',
    altrows: true, //交替行，单数行和双数行不同
    pageable: true, //分页
    pagesize: 20, //每页显示行数
    pagermode: 'simple', //分页样式
    editable: false,
    rowsheight: 40, //行高
    pagerheight: 50,
    selectionmode: 'checkbox', //选择框
    columns: [
      {
        text: '员工账号',
        datafield: 'phone',
        width: 150,
        pinned: true,
      },
      {
        text: '申请时间',
        datafield: 'startTime',
        width: 110,
      },
      {
        text: '员工姓名',
        datafield: 'name',
        width: 150,
      },
      {
        text: '操作',
        datafield: 'setup',
        minwidth: 400,
        editable: false,
        sortable: !1,
        filterable: !1,
        cellsrenderer: function(
          row,
          column,
          value,
          defaultHtml,
          style,
          rowData
        ) {
          var html =
            '<a class="btn btn-link" href="javascript:void();">同意</a>';
          html +=
            '<a class="btn btn-link btn-link-danger" href="javascript:void();">拒绝</a>';
          return html;
        },
      },
    ],
  });

  //表格内复选框
  $('#jqxtable').on('rowselect rowunselect', function(e) {
    var rowindexes = $('#jqxtable').jqxGrid('getselectedrowindexes');
    vm.$data.checklength = rowindexes.length;
    console.log(rowindexes);
  });
});
