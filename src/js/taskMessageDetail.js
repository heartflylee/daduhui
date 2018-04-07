/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
    var dataRow;
    dataRow = {
        "username":"邹兰兰",
        "phone": "15210275007",
        "cellphone":'',
        

    };

    var taskType = ["发送成功", "打开链接",'发送失败'];
    var source = ["--", "不提供数据"];
    dataRow.dataSources = source[parseInt(Math.random() * 2)];

    dataRow.taskId = parseInt(Math.random() * datalength);
    dataRow.taskType = taskType[parseInt(Math.random() * 3)];
  
    data.push(dataRow);


}
/*制作假数据结束*/



var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            audio: {
                name: "",
                company: "",
                show: false,
                url: ""
            },
            layers: {
            }
        }
    },
    methods: {
        closeLayer: function (layer) {
            console.log(layer);
            this.layers[layer].show = false;
        },
        layer: function (layer) {
            this.layers[layer].show = true;
        }
    }
});


//全部表头

$(document).ready(function () {

    var source = {
        datatype: 'json',
        datafields: [
            {name: 'cusid', type: 'string'},
            {name: 'username', type: 'string'},
            {name: 'phone', type: 'string'},
            {name: 'cellphone', type: 'string'},
            {name: 'channel', type: 'string'},
            {name: 'dataSources', type: 'string'},
            {name:'taskType',type:'string'}
        

        ],
        localdata: data
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    console.log(dataAdapter);


    // 创建表格
    $("#jqxtable").jqxGrid({
        width: '100%',
        height: '100%',
        source: dataAdapter,
        columnsresize: true, //调整列的宽度
        columnsheight: 45, //头部高度
        scrollbarsize: 7,
        sortable: true, //排序
        ready: function () {
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
                text: '客户姓名', datafield: 'username', width: 150, pinned: true,
            },
            {
                text: '手机号码', datafield: 'phone', width: 110
            },
            {
                text: '座机号码', datafield: 'cellphone', width: 100
            },
            {
                text: '渠道来源', datafield: 'channel', minwidth: 100
            },
           
            {
                text: '数据来源', datafield: 'dataSources',minwidth: 100
            },
           
            {
                text: '发送状态', datafield: 'taskType', width: 90,
                cellsrenderer: function (row, column, value, defaultHtml, style, rowData) {
                    if (value == "发送成功")
                        return "<div class='tasktype-default'>"+value+"</div>";
                    else if(value == '打开链接'){
                        return "<div class='tasktype-info'>"+value+"</div>";
                    }else{
                        return "<div class='tasktype-danger'>"+value+"</div>";
                    }
                }
            },
        ]
    });

});

