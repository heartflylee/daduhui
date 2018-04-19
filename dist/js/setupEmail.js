/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
  var dataRow;
  dataRow = {
    modelName: '邮件模板',
    startTime: '2017-03-31',
    title: '测试邮件',
  };

  dataRow.modelId = parseInt(Math.random() * datalength);
  data.push(dataRow);
}
/*制作假数据结束*/

var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      layers: {
        modelAdd: {
          title: '新建邮件模板',
          show: false,
          submit: true,
          layerName: 'modelAdd',
        },
        modelView: {
          title: '查看邮件模板',
          show: false,
          submit: true,
          layerName: 'modelView',
        },
        mailbox: {
          title: '邮箱账号设置',
          show: false,
          submit: true,
          layerName: 'mailbox',
        },
      },
      viewId: '',
      email: '',
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
    modifyMailbox: function() {
      this.layer('mailbox');
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
      { name: 'title', type: 'string' },
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
    columns: [
      {
        text: '模板名称',
        datafield: 'modelName',
        width: 150,
        pinned: true,
      },
      {
        text: '添加时间',
        datafield: 'startTime',
        width: 110,
      },
      {
        text: '邮件标题',
        datafield: 'title',
        width: 110,
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
          return (
            '<a class="btn btn-link" onclick="viewShow(' +
            rowData.modelId +
            ');">编辑模板</a><a class="btn btn-link btn-link-danger" onclick="deleteModel(' +
            rowData.modelId +
            ');">删除模板</a>'
          );
        },
      },
    ],
  });
});
function viewShow(modelId) {
  console.log(modelId);
  console.log('查看模板');
  vm.$data.viewId = modelId;
  vm.layer('modelView');
}
function deleteModel(modelId) {
  console.log(modelId);
  console.log('删除模板');
  if (confirm('删除模板后将不可恢复，是否继续')) {
  }
}
