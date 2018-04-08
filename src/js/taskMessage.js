/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
  var dataRow;
  dataRow = {
    taskName: '2月26日外呼任务',
    startTime: '2017-03-31',
    userName: '',
    sendNum: 12,
    suceeseNum: 10,
  };

  var source = ['--', '不提供数据'];

  dataRow.taskId = parseInt(Math.random() * datalength);
  dataRow.taskType = '已完成';
  dataRow.source = source[parseInt(Math.random() * 2)];

  data.push(dataRow);
}
/*制作假数据结束*/

var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      audio: {
        name: '',
        company: '',
        show: false,
        url: '',
      },
      layers: {
        customerDetail: {
          show: false,
          message: {},
        },
        taskAdd: {
          title: '新建任务',
          show: false,
          submit: true,
          layerName: 'taskAdd',
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
      { name: 'taskId', type: 'string' },
      { name: 'taskName', type: 'string' },
      { name: 'startTime', type: 'string' },
      { name: 'source', type: 'string' },
      { name: 'taskType', type: 'string' },
      { name: 'taskStatus', type: 'string' },
      { name: 'userName', type: 'string' },
      { name: 'message', type: 'string' },
      { name: 'sendNum', type: 'string' },
      { name: 'suceeseNum', type: 'string' },
    ],
    localdata: data,
  };
  var dataAdapter = new $.jqx.dataAdapter(source);
  console.log(dataAdapter);

  //显示客户详细信息
  $('#jqxtable').on('cellclick', function(event) {
    // console.log(event);
    // console.log(event.args.row.bounddata);
    if (event.args.datafield == 'taskName') {
      // customerShow(event.args.row.bounddata);
    } else {
      return false;
    }
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
    pagerheight: 50,
    columns: [
      {
        text: '任务名称',
        datafield: 'taskName',
        width: 150,
        pinned: true,
      },
      {
        text: '创建时间',
        datafield: 'startTime',
        width: 110,
      },
      {
        text: '任务状态',
        datafield: 'taskType',
        width: 100,
      },
      {
        text: '绑定执行人',
        datafield: 'progress',
        width: 100,
      },
      {
        text: '发送模板',
        datafield: 'repetitions',
        minwidth: 90,
      },
      {
        text: '数据来源',
        datafield: 'source',
        minwidth: 50,
      },
      {
        text: '发送条数/成功条数',
        datafield: 'sendNum',
        width: 150,
        cellsrenderer: function(
          row,
          column,
          value,
          defaultHtml,
          style,
          rowData
        ) {
          return rowData.sendNum + '/' + rowData.suceeseNum;
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
        ) {
          return '<a class="btn btn-link" href="javascript:linkHref()">查看详情</a>';
        },
      },
    ],
  });
});

//查看详情，跳转页面
function linkHref() {
  window.location.href = 'taskMessageDetail.html';
}
