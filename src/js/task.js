/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
    var dataRow;
    dataRow = {
        "taskName":"2月26日外呼任务",
        "startTime": "2017-03-31",
        "progress": "112/250",
        "preNumber": "250个/人"
    };

    var cycle = ["日", "周", "月"];
    var taskType = ["进行中", "过期未完成",'已完成','已终止'];
    var source = ["--", "不提供数据"];
    var repetitions = ["不重复", "1","2","3","4","5","6","7","8","9","10","11","12"];

    dataRow.taskId = parseInt(Math.random() * datalength);
    dataRow.cycle = cycle[parseInt(Math.random() * 3)];
    dataRow.taskType = taskType[parseInt(Math.random() * 4)];
    dataRow.source = source[parseInt(Math.random() * 2)];
    dataRow.repetitions = repetitions[parseInt(Math.random() * 13)];

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
                customerDetail: {
                    show: false,
                    message: {}
                },
                taskAdd: {
                    title: "新建任务",
                    show: false,
                    submit: true,
                    layerName: "taskAdd"
                },
                stopTask: {
                    title: "终止任务",
                    show: false,
                    submit: true,
                    layerName: "stopTask",
                }
            },
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
            {name: 'taskId', type: 'string'},
            {name: 'taskName', type: 'string'},
            {name: 'startTime', type: 'string'},
            {name: 'cycle', type: 'string'},
            {name: 'preNumber', type: 'string'},
            {name: 'taskType', type: 'string'},
            {name: 'progress', type: 'string'},
            {name: 'source', type: 'string'},
            {name: 'repetitions', type: 'string'}
        ],
        localdata: data
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    console.log(dataAdapter);


    //显示客户详细信息
    $("#jqxtable").on('cellclick', function (event) {
        // console.log(event);
        // console.log(event.args.row.bounddata);
        if (event.args.datafield == 'taskName') {
            // customerShow(event.args.row.bounddata);
        } else {
            return false;
        }
    });

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
                text: '任务名称', datafield: 'taskName', width: 150, pinned: true,
            },
            {
                text: '开始时间', datafield: 'startTime', width: 110
            },
            {
                text: '任务周期', datafield: 'cycle', width: 100
            },
            {
                text: '人均电话量', datafield: 'preNumber', width: 100
            },
            {
                text: '任务状态', datafield: 'taskType', width: 100,
                cellsrenderer: function (row, column, value, defaultHtml, style, rowData) {
                    // console.log(rowData)
                    if (value == "进行中") {
                        return '<div class="btn btn-primary">' + value + '</div>';
                    }
                    else if(value == '过期未完成'){
                        return '<div class="btn btn-danger">' + value + '</div>';
                    }
                    else{
                        return '<div class="btn btn-cancle">' + value + '</div>';
                    }
                },
            },
            {
                text: '任务进度', datafield: 'progress', width: 100
            },
            {
                text: '数据来源', datafield: 'source', minwidth: 50
            },
            {
                text: '重复次数', datafield: 'repetitions', width: 90
            },
            {
                text:'操作',datafield:'setup',width:150,editable: false, sortable: !1, filterable: !1,
                cellsrenderer: function (row, column, value, defaultHtml, style, rowData) {
            
                    if (rowData.taskType == "进行中" || rowData.taskType == '过期未完成') {
                        return '<a class="btn btn-link" href="linkHref()">查看详情</a> <a class="btn  btn-link btn-link-danger" href="javascript:stopTaskBtn()">终止任务</a>';
                    }
                    else if(rowData.taskType == '已完成'){
                        return '<a class="btn btn-link btn-link-danger " href="javascript:stopTaskBtn()">终止任务</a>';
                    }
                    else{
                        return '';
                    }
                },
            }
        ]
    });

});

//查看详情，跳转页面
function linkHref(){

}
//终止任务，弹框
function stopTaskBtn(){
    vm.layer('stopTask');
}

