$(document).ready(function(){
    $(function () {
        $(".preloader").fadeOut();
    });
});

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
                business: {
                    title: "工商信息",
                    show: false,
                    submit: false
                },
                customerAdd: {
                    title: "新建客戶",
                    show: false,
                    submit: true,
                    layerName: 'customerAdd'
                },
                customerModify: {
                    title: "编辑客戶",
                    show: false,
                    submit: true,
                    layerName: 'customerModify',
                    customerId:""
                },
                tableHead: {
                    title: '编辑显示字段',
                    show: false,
                    submit: true,
                    layerName: 'tableHead'
                },
                changeContact: {
                    title: '变更跟进人',
                    show: false,
                    submit: true,
                    layerName: 'changeContact'
                },
                taskAdd: {
                    title: "新建任务",
                    show: false,
                    submit: true,
                    layerName: "taskAdd"
                }
            },
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

function newcustomer() {
    console.log("新建客户提交");
}

// common scripts
(function () {
    "use strict";
    

    $("[data-toggle='tooltip']").tooltip();
    //下拉
    $(".select-show").click(function (event) {
        var selectBox = $(this).parent(".index-select");
        if (selectBox.hasClass("active")) {
            selectBox.removeClass("active");
        } else {
            $(".index-select").removeClass("active");
            selectBox.addClass("active");
            $(document).one("click", function () {
                selectBox.removeClass("active");
            });
            event.stopPropagation();
        }
    });
    $(".index-select").click(function (event) {
        event.stopPropagation();
    });

    // $("[data-company='autocomplete']").autocomplete({
    //     lookup: function (query, done) {
    //         $.ajax({
    //             url: "json/company.json",
    //             type: "get",
    //             datatype: "json",
    //             success: function (data) {
    //                 //data 的格式[{value:""},{value:""}]
    //                 done({suggestions: data});
    //             }
    //         })
    //     },
    //     minChars: 2,
    //     onSelect: function (suggestion) {
    //         console.log(suggestion);
    //         // $(".qixinbao").addClass("active");
    //     }
    // })
    // $(".select2").select2();
})(jQuery);


//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//
// function Hsearch() {
//     console.log("头部搜索");
//     location.href = "customer.html";
//     return false;
// }

//下拉框
function select(el) {
    $(el).select2();
}

//客户选择
function selectStaff(el) {
    $(el).select2({
        templateResult: function (data) {
            var element = data.element;
            if (element != undefined && $(element) != null && $(element) != undefined && $(element).data().img != null && $(element).data().img != '') {
                var manage = $(element).data().manage == true ? "head-manage" : " ";
                var manageShow = $(element).data().manage == true ? "管理员" : " ";
                return '<div class="head-li">\
                        <a href="javascript:void(0);">\
                        <div class="index-head ' + manage + '">\
                        <div class="index-head-photo" style="background-image: url(' + $(element).data().img + ');"></div>\
                        </div>\
                        <label>' + data.text + '</label>\
                        <span>' + manageShow + '</span>\
                        </a>\
                        </div>';
            } else {
                return data.text;
            }
        },
        templateSelection: function (data) {
            var element = data.element;
            if (element != undefined && $(element) != null && $(element) != undefined && $(element).data().img != null && $(element).data().img != '') {
                var manage = $(element).data().manage == true ? "head-manage" : " ";
                return '<div class="select-show select-head">\
                        <div class="index-head ' + manage + '">\
                        <div class="index-head-photo" style="background-image: url(' + $(element).data().img + ');"></div>\
                        </div>\
                        <label>' + data.text + '</label>\
                        <i class="t-arrow icon"></i>\
                        </div>';
            }
            else {
                return data.text;
            }
        },
        escapeMarkup: function (m) {
            console.log(m)
            return m;
        },
        dropdownCssClass: "select-head-wrap"
    });
}


function staffSelect(el) {
    $(el).select2({
        templateResult: function (data) {
            var element = data.element;
            if (element != undefined && $(element) != null && $(element) != undefined && $(element).data().img != null && $(element).data().img != '') {
                return '<div class="head-li">\
                        <a href="javascript:void(0);">\
                        <div class="index-head ">\
                        <div class="index-head-photo" style="background-image: url(' + $(element).data().img + ');"></div>\
                        </div>\
                        <label>' + data.text + '</label>\
                        </a>\
                        </div>';
            } else {
                return data.text;
            }
        },
        templateSelection: function (data) {
            var element = data.element;
            if (element != undefined && $(element) != null && $(element) != undefined && $(element).data().img != null && $(element).data().img != '') {
                return '<div class="staff-select">\
                        <div class="staff-head">\
                        <div class="staff-head-photo" style="background-image: url(' + $(element).data().img + ');"></div>\
                        </div>\
                        <div class="staff-name">' + data.text + '</div>\
                        </div>';
            }
            else {
                return data.text;
            }
        },
        escapeMarkup: function (m) {
            console.log(m)
            return m;
        },
        dropdownCssClass: "select-head-wrap"
    });
}


//
// var audioAll;
// var audioFirst;
// $(function () {
//     audioAll = audiojs.createAll();
//     audioFirst = audioAll[0];
//
// })
//
// //播放音频
function audioPlay(obj, e) {
    console.log($(obj).data())
    e.stopPropagation();
    var data = $(obj).data();
    // $("#audio-name").text(data.name);
    // $("#audio-company").text(data.company);
    // $("#audio").modal("show");
    // audioFirst.load(data.url);
    // audioFirst.play();
    vm.$data.audio.name = data.name;
    vm.$data.audio.url = data.url;
    vm.$data.audio.company = data.company;
    vm.$data.audio.show = true;
}

//
// //下载音频
function audioDownload(obj, e) {
    console.log($(obj).data());
    e.stopPropagation();
}

//
// //关闭音频播放窗口
// function audioClose() {
//     audioFirst.pause();
//     $("#audio").modal("hide");
// }

function tableResize(){

    $('.table-wrap').resize(function(){
         var elem = $(this);
         console.log(elem);
        if ($("#jqxtable").length > 0) {
            $("#jqxtable").jqxGrid('beginupdate');
            console.log($('.table-wrap').width())
            $("#jqxtable").jqxGrid('width', $('.table-wrap').width());
            $("#jqxtable").jqxGrid('endupdate');
        }
        // Update the info div width and height - replace this with your own code
        // to do something useful!
        // elem.closest('.container').find('.info')
        //     .text( this.tagName + ' width: ' + elem.width() + ', height: ' + elem.height() );
    });
    // $('.table-wrap').on('resize',function () {
        console.log("111");
        console.log($("#jqxtable"))
        if ($("#jqxtable").length > 0) {
            $("#jqxtable").jqxGrid('beginupdate');
            console.log($('.table-wrap').width())
            $("#jqxtable").jqxGrid('width', $('.table-wrap').width());
            $("#jqxtable").jqxGrid('endupdate');
        }
    // })
}

$(function () {

})