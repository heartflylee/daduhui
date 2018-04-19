/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
  var dataRow;
  dataRow = {
    name: '邮件模板',
    type: '2017-03-31',
    title: '测试邮件',
  };
  var type = ['单选', '多选', '文本'];
  var content = [
    { options: ['身份证', '军人证'], value: '--' },
    { options: ['自用', '投资'], value: '--' },
    { options: [], value: '--' },
  ];
  var report = [true, false];
  dataRow.type = type[parseInt(Math.random() * 3)];
  dataRow.content = content[parseInt(Math.random() * 3)];
  dataRow.report = report[parseInt(Math.random() * 2)];
  dataRow.customId = parseInt(Math.random() * datalength);
  data.push(dataRow);
}
/*制作假数据结束*/

var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      layers: {
        modelAdd: {
          title: '新建字段',
          show: false,
          submit: true,
          layerName: 'modelAdd',
        },
        addReport: {
          title: '生成图表',
          show: false,
          submit: true,
          layerName: 'addReport',
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
    addModel: function() {
      console.log('234234');
      this.layer('modelAdd');
    },
    removeCustom: function() {
      console.log('删除字段');
    },
  },
});

//全部表头

$(document).ready(function() {
  var source = {
    datatype: 'json',
    datafields: [
      { name: 'customId', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'type', type: 'string' },
      { name: 'content', type: 'string' },
      { name: 'report', type: 'string' },
    ],
    localdata: data,
  };
  var dataAdapter = new $.jqx.dataAdapter(source);
  console.log(dataAdapter);

  //表格内复选框
  $('#jqxtable').on('rowselect rowunselect', function(e) {
    var rowindexes = $('#jqxtable').jqxGrid('getselectedrowindexes');
  });

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
    selectionmode: 'checkbox', //选择框
    pagerheight: 50,
    columns: [
      {
        text: '字段名称',
        datafield: 'name',
        width: 150,
        pinned: true,
      },
      {
        text: '字段类型',
        datafield: 'type',
        width: 110,
      },
      {
        text: '字段内容',
        datafield: 'content',
        minwidth: 110,
        cellsrenderer: function(
          row,
          column,
          value,
          defaultHtml,
          style,
          rowData
        ) {
          var returnValue = '<div class="cell-text">';
          if (rowData.type != '文本') {
            for (var i = 0; i < value.options.length; i++) {
              returnValue +=
                '选项' + (i + 1) + ':' + value.options[i] + '&nbsp;&nbsp;';
            }
            return returnValue + '</div>';
          } else {
            return returnValue + value.value + '</div>';
          }
        },
      },
      {
        text: '操作',
        datafield: 'setup',
        minwidth: 150,
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
          if (rowData.type == '单选') {
            if (rowData.report == true) {
              return (
                '<a class="btn btn-link btn-link-danger" href="javascript:void(0)" onclick="removeReport(' +
                rowData.customId +
                ')">删除图表</a>'
              );
            } else {
              return (
                '<a class="btn btn-link " href="javascript:void(0)" onclick="setReport(' +
                rowData.customId +
                ')">生成图表</a>'
              );
            }
          } else {
            return '<div class="cell-text setup-padding">--</div>';
          }
        },
      },
    ],
  });
});

function setReport(customId) {
  console.log('生成图表');
  vm.layer('addReport');
}
function removeReport(customId) {
  console.log('删除图表');
}
