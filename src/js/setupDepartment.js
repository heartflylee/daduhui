/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
  var dataRow;
  dataRow = {
    name: '刘晓辉',
    phone: '13611121111',
    gender: '男',
    major: '学徒',

    department: '产品部',
  };
  manager = [true, false];
  dataRow.manager = manager[parseInt(Math.random() * 2)];

  data.push(dataRow);
}
/*制作假数据结束*/

var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      employeePhone: '',
      selectEmployee: '',
      checklength: 0,
      layers: {
        departmentAdd: {
          title: '新建部门',
          show: false,
          submit: true,
          layerName: 'departmentAdd',
          message: {
            name: '新建部门',
            input: true,
            value: '',
            required: true,
          },
        },
        departmentModify: {
          title: '编辑部门',
          show: false,
          submit: true,
          layerName: 'departmentModify',
          message: {
            name: '编辑部门',
            input: true,
            value: '',
            required: true,
          },
        },
        staffModify: {
          title: '编辑员工',
          show: false,
          submit: true,
          layerName: 'staffModify',
        },
        selectDepart: {
          title: '变更部门',
          show: false,
          submit: true,
          layerName: 'selectDepart',
        },
        unbundling: {
          title: '解绑员工',
          show: false,
          submit: true,
          layerName: 'unbundling',
        },
        setManager: {
          title: '设置为管理员',
          show: false,
          submit: true,
          layerName: 'setManager',
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
    joinEmployee: function() {
      console.log('邀请员工');
    },
    searchEmployee: function() {
      console.log('搜索员工');
    },
    changeDepart: function() {
      console.log('变更部门');
      this.$data.layers.selectDepart.show = true;
    },
    manager: function() {
      console.log('设置为管理员');
      this.$data.layers.setManager.show = true;
    },
    addDepart: function(ztreeNode) {
      //新建部门
      console.log(ztreeNode);
      this.$data.layers.departmentAdd.show = true;
    },
    modifyDepart: function(ztreeNode) {
      //编辑部门
      console.log(ztreeNode);
      this.$data.layers.departmentModify.show = true;
      this.$data.layers.departmentModify.message.value = ztreeNode.name;
    },
    removeDepart: function(ztreeNode) {
      //删除部门
      console.log(ztreeNode);
      console.log('删除部门');
    },
  },
});

$(document).ready(function() {
  var source = {
    datatype: 'json',
    datafields: [
      { name: 'staffId', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'phone', type: 'string' },
      { name: 'gender', type: 'string' },
      { name: 'department', type: 'string' },
      { name: 'major', type: 'string' },
      { name: 'manager', type: 'string' },
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
        text: '员工姓名',
        datafield: 'name',
        width: 150,
        pinned: true,
        cellsrenderer: function(
          row,
          column,
          value,
          defaultHtml,
          style,
          rowData
        ) {
          var html = '';
          if (rowData.manager == true) {
            html += '<span class="manager-tip">管</span>';
          }
          return '<span class="manager-name">' + value + '</span>' + html;
        },
      },
      {
        text: '性别',
        datafield: 'gender',
        width: 110,
      },
      {
        text: '手机号',
        datafield: 'phone',
        width: 150,
      },
      {
        text: '职位',
        datafield: 'major',
        width: 100,
      },
      {
        text: '所属部门',
        datafield: 'department',
        width: 100,
      },

      {
        text: '操作',
        datafield: 'setup',
        width: 400,
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
            '<a class="btn btn-link" href="javascript:modifyStaff();">编辑</a>';
          html +=
            '<a class="btn btn-link" href="javascript:unbundling();">解除绑定</a>';
          html +=
            '<a class="btn btn-link" href="javascript:resetPwd();">重置密码</a>';
          if (rowData.manager == true) {
            html +=
              '<a class="btn btn-link" href="javascript:cancelManager();">取消管理员身份</a>';
          }
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

function modifyStaff() {
  vm.$data.layers.staffModify.show = true;
  console.log('编辑员工');
}
function unbundling() {
  vm.$data.layers.unbundling.show = true;
  console.log('解除绑定');
}
function resetPwd() {
  console.log('重置密码');
}
function cancelManager() {
  console.log('取消管理员身份');
}
