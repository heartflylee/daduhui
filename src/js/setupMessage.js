/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
  var dataRow;
  dataRow = {
    modelName: '短信模板',
    startTime: '2017-03-31',
    name: '淘宝网',
  };

  var status = [0, 1, 2];

  dataRow.modelId = parseInt(Math.random() * datalength);
  dataRow.status = status[parseInt(Math.random() * 3)];
  data.push(dataRow);
}
/*制作假数据结束*/

var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      layers: {
        modelAdd: {
          title: '新建模板',
          show: false,
          submit: true,
          layerName: 'modelAdd',
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
  },
});

//全部表头

$(document).ready(function() {
  var source = {
    datatype: 'json',
    datafields: [
      { name: 'modelId', type: 'string' },
      { name: 'modelName', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'startTime', type: 'string' },
      { name: 'status', type: 'string' },
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
    columns: [
      {
        text: '模板名称',
        datafield: 'modelName',
        width: 150,
        pinned: true,
      },
      {
        text: '签名',
        datafield: 'name',
        width: 110,
      },
      {
        text: '申请时间',
        datafield: 'startTime',
        width: 110,
      },
      {
        text: '审核状态',
        datafield: 'status',
        width: 100,
        cellsrenderer: function(
          row,
          column,
          value,
          defaultHtml,
          style,
          rowData
        ) {
          if (value == 0) {
            return '<span class="cell-text text-info">' + '审核中' + '</span>';
          } else if (value == 1) {
            return;
            '<span class="cell-text text-danger">' + '审核未通过' + '</span>';
          } else {
            return;
            '<span class="cell-text ">' + '审核通过' + '</span>';
          }
        },
      },
      {
        text: '操作',
        datafield: 'setup',
        width: 150,
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
        ) {},
      },
    ],
  });
});
