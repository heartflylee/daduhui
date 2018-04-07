/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
    var dataRow;
    dataRow = {
        "username":"邹兰兰",
        "phone": "15210275007",
        "voice": "3",

    };

    var cycle = ["日", "周", "月"];
    var taskType = ["进行中", "过期未完成",'已完成','已终止'];
    var source = ["--", "不提供数据"];
    var repetitions = ["不重复", "1","2","3","4","5","6","7","8","9","10","11","12"];
    var callDuration= ['voice/demo.mp3', '', 'http://yunke-pcfile.oss-cn-beijing.aliyuncs.com/tel-record-2017-02-2778EF0A3DE8EA450682CC5E30C47F42CA.mp3'];

    dataRow.taskId = parseInt(Math.random() * datalength);
    dataRow.cycle = cycle[parseInt(Math.random() * 3)];
    dataRow.taskType = taskType[parseInt(Math.random() * 4)];
    dataRow.source = source[parseInt(Math.random() * 2)];
    dataRow.repetitions = repetitions[parseInt(Math.random() * 13)];

 dataRow.callDuration = callDuration[parseInt(Math.random() * 3)];
 dataRow.callDownload = callDuration[parseInt(Math.random() * 3)];
    data.push(dataRow);


}
/*制作假数据结束*/
vm.$data.taskTitle = '2月26日';
vm.$data.taskNum = 2;
vm.$data.taskCount = 12;

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
            {name: 'Executor', type: 'string'},
            {name: 'dataSources', type: 'string'},
            {name: 'voice', type: 'string'},
            {name: 'results', type: 'string'},
            {name:'tags', type:'string'},
            {name:'callTime', type:'string'},
            {name:'callDuration',type:'string'},
            {name:'callDownload',type:'string'}
        

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
                text: '渠道来源', datafield: 'channel', width: 100
            },
            {
                text: '执行人', datafield: 'Executor', width: 100,
            },
            {
                text: '数据来源', datafield: 'dataSources', width: 100
            },
            {
                text: '通话录音', datafield: 'voice', minwidth: 130,
                cellsrenderer: function (row, column, value, defaultHtml, style, rowData) {
                    if (value == "")
                        return "";
                    else{
                        return '通话时长：'+value+' <i class="icon v-icon video play" onclick="audioPlay(this,event);" data-url="' + rowData.callDuration + '" data-name ="' + rowData.username + '" data-company="' + rowData.phone + '"  data-id="' + rowData.cusid + '"></i>'+'<i class="icon v-icon download" onclick="audioDownload(this,event);" data-url="' + rowData.callDownload + '"  data-id="' + rowData.cusid + '"></i>';
                    }
                }
            },
           
            {
                text:'电话标签',datafield:'tags',width:150,
            
            },
            {
                text: '电话结果', datafield: 'results', width: 90
            },
            {
                text: '通话时间', datafield: 'callTime', width: 90
            },
        ]
    });

});

