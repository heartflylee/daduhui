/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
  var dataRow;
  dataRow = {
    customerName: '白又亮',
    phone: '13911111111',
    DecorationAdress: '北京市朝阳区光华路9号',
    adress: '北京市朝阳区光华路9号',
    channel: '渠道1',
    DecorationWeek: '1年',
    IntentionalCategory: '-',
  };

  dataRow.taskId = parseInt(Math.random() * datalength + 1);

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
        callDetail: {
          show: false,
          message: {},
        },
        customerAdd: {
          title: '新建客戶',
          show: false,
          submit: true,
          layerName: 'customerAdd',
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
      { name: 'customerName', type: 'string' },
      { name: 'phone', type: 'string' },
      { name: 'DecorationAdress', type: 'string' },
      { name: 'adress', type: 'string' },
      { name: 'channel', type: 'string' },
      { name: 'DecorationWeek', type: 'string' },
      { name: 'IntentionalCategory', type: 'string' },
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
        text: '客户姓名',
        datafield: 'customerName',
        width: 150,
        pinned: true,
      },
      {
        text: '手机号码',
        datafield: 'phone',
        width: 110,
        cellsrenderer: function(
          row,
          column,
          value,
          defaultHtml,
          style,
          rowData
        ) {
          if (value == '') return '';
          else {
            return (
              value +
              ' <i class="icon v-icon icon-phone" onclick="callDetailBtn();" ></i>'
            );
          }
        },
      },
      {
        text: '装修地址',
        datafield: 'DecorationAdress',
        width: 200,
      },
      {
        text: '渠道来源',
        datafield: 'channel',
        width: 100,
      },
      {
        text: '现住地址',
        datafield: 'adress',
        width: 200,
      },
      {
        text: '装修周期',
        datafield: 'DecorationWeek',
        width: 100,
      },
      {
        text: '意向品类',
        datafield: 'IntentionalCategory',
        minwidth: 100,
      },
    ],
  });
});

//拨打电话
function callDetailBtn() {
  console.log('拨打电话');
  vm.$data.layers.callDetail.message = data;
  vm.$data.layers.callDetail.show = true;
}
