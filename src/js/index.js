/**
 * Created by lixin on 2017/4/27.
 */

 
var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            charts: {
                pie1: {
                    title: '接通意向率',
                    url: 'json/chartsPie1.json'
                },
                pie2: {
                    title: '电话结果标签',
                    url: 'json/chartsPie2.json'
                },
                pie3: {
                    title: '销售进度标签',
                    url: 'json/chartsPie3.json'
                }
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


//初始化环形图option
var optionPie = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // theme:"macarons",
    series: [{
        name: '',
        type: 'pie',
        radius: ['68%', '75%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '24',
                    fontWeight: 'bold'
                }
            }
        }
    }]
};


function chartsPie(el,data) {
    var chartPie = echarts.init(el, "macarons");
    var optionsPie = optionPie;
    optionsPie.series[0].name = data.name;
    optionsPie.series[0].data = data.data;
    chartPie.setOption(optionsPie);
    chartPie.on("click", function (data) {
        console.log(data);
    })
}


$(function () {
    // $(".select-head").select2({
    //     templateResult: function (data) {
    //         var element = data.element;
    //         if (element != undefined && $(element) != null && $(element) != undefined && $(element).data().img != null && $(element).data().img != '') {
    //             var manage = $(element).data().manage == true ? "head-manage" : " ";
    //             var manageShow = $(element).data().manage == true ? "管理员" : " ";
    //             return '<div class="head-li">\
    //                 <a href="javascript:void(0);">\
    //                 <div class="index-head ' + manage + '">\
    //                 <div class="index-head-photo" style="background-image: url(' + $(element).data().img + ');"></div>\
    //                 </div>\
    //                 <label>' + data.text + '</label>\
    //                 <span>' + manageShow + '</span>\
    //                 </a>\
    //                 </div>';
    //         } else {
    //             return data.text;
    //         }
    //     },
    //     templateSelection: function (data) {
    //         var element = data.element;
    //         if (element != undefined && $(element) != null && $(element) != undefined && $(element).data().img != null && $(element).data().img != '') {
    //             var manage = $(element).data().manage == true ? "head-manage" : " ";
    //             return '<div class="select-show select-head">\
    //                 <div class="index-head ' + manage + '">\
    //                 <div class="index-head-photo" style="background-image: url(' + $(element).data().img + ');"></div>\
    //                 </div>\
    //                 <label>' + data.text + '</label>\
    //                 <i class="t-arrow icon"></i>\
    //                 </div>';
    //         }
    //         else {
    //             return data.text;
    //         }
    //     },
    //     escapeMarkup: function (m) {
    //         console.log(m)
    //         return m;
    //     },
    //     dropdownCssClass: "select-head-wrap"
    // });
})
// var selection;
$(function () {
    $(".date-select").click(function () {
        if ($(this).hasClass("selected")) {
            return false;
        }

        $(".date-select").removeClass("selected");
        $(this).addClass("selected");
        $("#select-time").text($(this).text());
        $(".index-select").removeClass("active");
        $("#startTime").val("");
        $("#endTime").val("");
        // $("#datetime").jqxCalendar('setRange', new Date(), new Date());
    });
//
//     //日历
//     var datatime = $("#datetime");
//     datatime.jqxCalendar({width: 220, height: 220, selectionMode: 'range', culture: 'ch-CN'});
//     datatime.jqxCalendar({firstDayOfWeek: 1});
//     datatime.jqxCalendar('setMaxDate', new Date());
//     datatime.on('change', function (event) {
//         console.log(event)
//         selection = event.args.range;
//         $("#startTime").val(selection.from.toLocaleDateString());
//         $("#endTime").val(selection.to.toLocaleDateString());
//     });
});
//
function dateShow() {

    if ($("#startTime").val() == "" || $("#endTime").val() == "") {
        return false;
    }

    $(".date-select").removeClass("selected");
    $("#select-time").text($("#startTime").val() + "-" + $("#endTime").val());
    $(".index-select").removeClass("active");
}

// /* 图表          */
//
// //接通意向率数据
//
//
// var dataPie = [{
//     name: '2017-02-22',
//     data: [
//         {value: 335, name: '有意向', url: ""},
//         {value: 310, name: '无意向', url: ""}
//     ]
// },
//     {
//         name: '2017-02-22',
//         data: [
//             {value: 335, name: '加微信', url: ""},
//             {value: 310, name: '打电话', url: ""},
//             {value: 310, name: '发短信', url: ""},
//             {value: 310, name: '发邮件', url: ""}
//         ]
//     }, {
//         name: '2017-02-22',
//         data: [
//             {value: 335, name: '初步沟通', url: ""},
//             {value: 310, name: '确认需求', url: ""},
//             {value: 310, name: '报价', url: ""},
//             {value: 310, name: '面谈', url: ""},
//             {value: 310, name: '成单', url: ""}
//         ]
//     }];
//
//
// var chartPie = [];
// var optionsPie = [];
// for (var i = 0; i < 3; i++) {
//     chartPie[i] = echarts.init(document.getElementById("charts-pie" + i), "macarons");
//     optionsPie[i] = optionPie;
//     optionsPie[i].series[0].name = dataPie[i].name;
//     optionsPie[i].series[0].data = dataPie[i].data;
//     chartPie[i].setOption(optionsPie[i]);
//     chartPie[i].on("click", function (data) {
//         console.log(data);
//
//     })
// }
//
//折线图

var dataLine = [
    {
        name: "客户增长量", data: [
        {value: 6, url: ""},
        {value: 10, url: ""},
        {value: 7, url: ""},
        {value: 4, url: ""},
        {value: 5, url: ""},
        {value: 6, url: ""},
        {value: 4, url: ""}
    ]
    },
    {
        name: "任务增长量", data: [
        {value: 6, url: ""},
        {value: 9, url: ""},
        {value: 3, url: ""},
        {value: 8, url: ""},
        {value: 6, url: ""},
        {value: 2, url: ""},
        {value: 4, url: ""}
    ]
    },
    {
        name: "任务完成增长量", data: [
        {value: 3, url: ""},
        {value: 5, url: ""},
        {value: 6, url: ""},
        {value: 9, url: ""},
        {value: 2, url: ""},
        {value: 4, url: ""},
        {value: 2, url: ""}
    ]
    }
];
var dataLineX = ["2017-02-15", "2017-02-16", "2017-02-17", "2017-02-18", "2017-02-19", "2017-02-20", "2017-02-21"];
var optionLine;
var chartsLine;
$(function () {
    optionLine = {
        tooltip: {
                trigger: 'axis',
            // trigger: "item",
            formatter: "{b} <br/>{a} : {c}"
        },
        xAxis: [{
            type: "category",
            splitLine: {show: true},
            data: []
        }],
        yAxis: [{
            type: 'value',
            name: ''
        }],
        series: [{
            name: "",
            type: "line",
            symbolSize:10,
            data: []
        }]
    };
    chartsLine = echarts.init(document.getElementById("charts-line"), "macarons");
    // chartsLine.registerTheme('macarons', theme);
    optionLine.xAxis[0].data = dataLineX;
    optionLine.series[0].name = dataLine[0].name;
    optionLine.series[0].data = dataLine[0].data;
    chartsLine.setOption(optionLine);
    chartsLine.on("click", function (data) {
        console.log(data);
    })
});

function lineBtn(index) {
    var $obj = $("#lineChartBtn").find(".charts-btn:eq(" + index + ")");
    var $countObj = $("#count-list").find(".count-list:eq(" + index + ")");
    if ($obj.hasClass("active")) {
        return false;
    } else {
        $("#lineChartBtn").find(".charts-btn").removeClass("active");
        $obj.addClass("active");
        $("#count-list").find(".count-list").removeClass("active");
        $countObj.addClass("active");
    }

    optionLine.xAxis[0].data = dataLineX;
    optionLine.series[0].name = dataLine[index].name;
    optionLine.series[0].data = dataLine[index].data;
    chartsLine.clear();
    chartsLine.setOption(optionLine);
}

//柱状图
var optionBar;
var chartsBar;
var chartBarX = ['2017-02-15', '2017-02-16', '2017-02-17', '2017-02-18', '2017-02-19', '2017-02-20', '2017-02-21', '2017-02-22'];
var dataBarValue = [{
    data: [
        {value: 2, url: ""},
        {value: 5, url: ""},
        {value: 10, url: ""},
        {value: 23, url: ""},
        {value: 15, url: ""},
        {value: 16, url: ""},
        {value: 20, url: ""},
        {value: 16, url: ""}
    ]
}, {
    data: [
        {value: 3, url: ""},
        {value: 6, url: ""},
        {value: 9, url: ""},
        {value: 16, url: ""},
        {value: 18, url: ""},
        {value: 10, url: ""},
        {value: 15, url: ""},
        {value: 18, url: ""}
    ]
}, {
    data: [
        {value: 2, url: ""},
        {value: 50, url: ""},
        {value: 14, url: ""},
        {value: 30, url: ""},
        {value: 75, url: ""},
        {value: 60, url: ""},
        {value: 90, url: ""},
        {value: 70, url: ""}
    ]
}];

var dataBar = [{
    name: '坐席电话量',
    type: 'bar',
    yAxisIndex: 0,
    barMaxWidth: 40,
    itemStyle: {
        normal: {color: "#2ec7c9"}
    },
    data: dataBarValue[0].data
}, {
    name: '联系客户数',
    type: 'bar',
    yAxisIndex: 0,
    barMaxWidth: 40,
    itemStyle: {
        normal: {color: "#ffb980"}
    },
    data: dataBarValue[1].data
}, {
    name: '通话时长',
    type: 'bar',
    yAxisIndex: 1,
    barMaxWidth: 40,
    itemStyle: {
        normal: {color: "#d87a80"}
    },
    data: dataBarValue[2].data
}];
$(function () {
    optionBar = {
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true
        },
        legend: {
            show: false,
            data: []
        },
        xAxis: [{
            type: 'category',
            data: []
        }],
        yAxis: [{
            type: 'value',
            // splitArea: {
            //     show: true,
            //     areaStyle: {
            //         color: [
            //             'rgba(250,250,250,0.3)',
            //             'rgba(200,200,200,0.3)'
            //         ]
            //     }
            // },
            axisLabel: {
                formatter: '{value}'
            }
        }, {
            type: 'value',
            // splitArea: {
            //     show: true,
            //     areaStyle: {
            //         color: [
            //             'rgba(250,250,250,0.3)',
            //             'rgba(200,200,200,0.3)'
            //         ]
            //     }
            // },
            axisLabel: {
                formatter: '{value} s'
            }
        }],
        series: []
    };

    chartsBar = echarts.init(document.getElementById("charts-bar"), "macarons");
    optionBar.xAxis[0].data = chartBarX;
    optionBar.series.push(dataBar[0]);
    chartsBar.setOption(optionBar);
    chartsBar.on("click", function (data) {
        console.log(data);
    })
});

var chartBarData;

function barBtn(index) {
    var $obj = $("#barChartBtn").find(".charts-btn:eq(" + index + ")");
    if ($obj.hasClass("active")) {
        $obj.removeClass("active");
    } else {
        $obj.addClass("active");
    }
    var active = $("#barChartBtn").find(".active");
    chartBarData = [];
    if (active.length > 0) {
        for (var i = 0; i < active.length; i++) {
            chartBarData[i] = dataBar[active[i]['data-chart'] || active[i].dataset.chart];
        }
        optionBar.xAxis[0].data = chartBarX;
        optionBar.series = chartBarData;
        chartsBar.clear();
        chartsBar.setOption(optionBar);
    } else {
        chartsBar.clear();
    }
}
window.onresize = function () {
    chartsLine.resize();
    chartsBar.resize();
}
