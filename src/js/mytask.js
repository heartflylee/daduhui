/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
  var dataRow;
  dataRow = {
    taskName: '2月26日外呼任务',
    startTime: '2017-03-31',
    progress: '112/250',
    preNumber: '250个/人',
  };

  var cycle = ['日', '周', '月'];
  var taskType = ['进行中', '过期未完成', '已完成', '已终止'];
  var source = ['--', '不提供数据'];
  var repetitions = [
    '不重复',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  var overdue = [0, 1];
  if (i == 0) {
    dataRow.taskId = 0;
  } else {
    dataRow.taskId = parseInt(Math.random() * datalength + 1);
  }
  dataRow.cycle = cycle[parseInt(Math.random() * 3)];
  dataRow.taskType = taskType[parseInt(Math.random() * 4)];
  dataRow.source = source[parseInt(Math.random() * 2)];
  dataRow.repetitions = repetitions[parseInt(Math.random() * 13)];
  dataRow.overdue = overdue[parseInt(Math.random() * 2)];
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
      layers: {},
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
      { name: 'cycle', type: 'string' },
      { name: 'preNumber', type: 'string' },
      { name: 'source', type: 'string' },
      { name: 'overdue', type: 'string' },
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
      window.location.href = 'mytaskDetail.html';
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
        width: 250,
        pinned: true,
        cellsrenderer: function(
          row,
          column,
          value,
          defaultHtml,
          style,
          rowData
        ) {
          if (rowData.taskId == 0) {
            return (
              '<span class="manager-tip">置顶</span>' +
              '<span class="manager-name">短信绑定电话任务</span>'
            );
          } else if (rowData.overdue == 1) {
            return (
              '<span class="cell-text tasktype-danger">' +
              value +
              '(过期)</span>'
            );
          } else {
            return '<span class="cell-text">' + value + '</span>';
          }
        },
      },
      {
        text: '创建时间',
        datafield: 'startTime',
        width: 110,
      },
      {
        text: '人均电话量',
        datafield: 'preNumber',
        width: 100,
      },
      {
        text: '任务周期',
        datafield: 'cycle',
        width: 100,
      },
      {
        text: '数据来源',
        datafield: 'source',
        minwidth: 50,
      },
    ],
  });
});

//查看详情，跳转页面
function linkHref() {
  window.location.href = 'taskDetail.html';
}
//终止任务，弹框
function stopTaskBtn() {
  vm.layer('stopTask');
}
