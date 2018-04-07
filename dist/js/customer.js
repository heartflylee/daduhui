/*制作假数据*/
var data = [];
var datalength = 90;
for (var i = 0; i < datalength; i++) {
    var dataRow;
    dataRow = {
        "cellphone": "13699273847",
        "company": "北京联云天下",
        "position": "打杂",
        "createdTime": "2017-03-31",
        "comAdress": "建外SOHO西区",
        "progress": "",
        "lastActionTime": "3\"",
        "comType": "",
        "customerSource": "企业导入-客户 (3)",
        "actionType": "",
        "remark": "1",
        "operName": "",
        "registCapi": "",
        "lastAction": "",
        "email": "1",
        "wechat": "1",
        "qq": "",
        "callDuration": "",
        "callDownload": "",
        "msgState": "",
        "endcallMsgStatus": "",
        "cellphone2": "",
        "gender": "",
        "birthday": "",
        "reception": "",
        "telephone": "1012345678",
        "fax": "1012345681",
        "spare1": "",
        "spare2": "",
        "spare3": "",
        "spare4": "",
        "spare5": ""
    };

    var fileterReset = {
        progress: ["未标记", "初步沟通", "确认需求", "报价", "面谈", "成单", "无需求", "输单"],
        isDistribution: ["未分配", "已分配"],
        actState: ["", "未沟通", "已沟通"],
        msgState: ["发送成功", "打开链接", "发送失败", "发送中"],
        mailState: ["", "发送成功", "发送失败"],
        endcallMsgStatus: ["发送成功", "打开链接", "发送失败", "发送中"],
        actionType: ["", "有意向", "无意向", "资料错误", "二次呼叫"],
        callDuration: ['voice/demo.mp3', '', 'http://yunke-pcfile.oss-cn-beijing.aliyuncs.com/tel-record-2017-02-2778EF0A3DE8EA450682CC5E30C47F42CA.mp3']
    }
    var cusname = ["刘晓辉", "王佳印", "艾云鹤", "王佳怡", "罗一山", "刘宇"];
    var username = ["", "新飞"];
    var mainProduce = ["经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1经营范围1", "", "经营范围2经营范围2经营范围2经营范围2经营范围2经营范围2经营范围2经营范围2", "", "经营范围3经营范围3经营范围3经营范围3经营范围3经营范围3经营范围3经营范围3经营范围3经营范围3经营范围3经营范围3经营范围3"];


    dataRow.cusid = parseInt(Math.random() * datalength);
    dataRow.cusname = cusname[parseInt(Math.random() * 6)];
    dataRow.username = username[parseInt(Math.random() * 2)];
    dataRow.actState = fileterReset.actState[parseInt(Math.random() * 3)];
    dataRow.lock = parseInt(Math.random() * 2);
    dataRow.mainProduce = mainProduce[parseInt(Math.random() * 5)];
    dataRow.callDuration = fileterReset.callDuration[parseInt(Math.random() * 3)];
    dataRow.callDownload = dataRow.callDuration;
    dataRow.isDistribution = fileterReset.isDistribution[parseInt(Math.random() * 2)];
    dataRow.mailState = fileterReset.mailState[parseInt(Math.random() * 3)];
    dataRow.actionType = fileterReset.actionType[parseInt(Math.random() * 5)];
    dataRow.endcallMsgStatus = fileterReset.endcallMsgStatus[parseInt(Math.random() * 4)];
    dataRow.msgState = fileterReset.msgState[parseInt(Math.random() * 3)];
    dataRow.progress = fileterReset.progress[parseInt(Math.random() * 8)];

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



//默认显示表头
var tablehead = 'cellphone,position,progress,createdTime,lastActionTime,userName,company,comAdress,comType,mainProduce,operName,registCapi,customerSource,isDistribution';
if ($.trim(tablehead) == "null" || $.trim(tablehead) == "" || tablehead == "0") {
    tablehead = "cellphone,position,progress,createdTime,lastActionTime,company,customerSource,email,wechat,qq";
}

//自定义表头全部
var defaultHead = {
    cellphone: {label: '手机号码', value: 'cellphone'},
    position: {label: '职位', value: 'position'},
    company: {label: '公司名称', value: 'company'},
    comAdress: {label: '公司地址', value: 'comAdress'},
    progress: {label: '销售进度', value: 'progress'},
    createdTime: {label: '创建时间', value: 'createdTime'},
    lastActionTime: {label: '联系时间', value: 'lastActionTime'},
    userName: {label: '跟进人', value: 'userName'},
    comType: {label: '公司类型', value: 'comType'},
    mainProduce: {label: '经营范围', value: 'mainProduce'},
    operName: {label: '企业法人', value: 'operName'},
    customerSource: {label: '数据来源', value: 'customerSource'},
    actState: {label: '沟通状态', value: 'actState'},
    isDistribution: {label: '分配状态', value: 'isDistribution'},
    actionType: {label: '电话结果', value: 'actionType'},
    lastAction: {label: '电话标签', value: 'lastAction'},
    remark: {label: '备注', value: 'remark'},
    registCapi: {label: '注册资本', value: 'registCapi'},
    email: {label: '邮箱', value: 'email'},
    wechat: {label: '微信', value: 'wechat'},
    qq: {label: 'QQ', value: 'qq'},
    // callDuration: {label: '通话录音', value: 'callDuration'},
    // callDownload: {label: '录音下载', value: 'callDownload'},
    msgState: {label: '短信状态', value: 'msgState'},
    mailState: {label: '邮件状态', value: 'mailState'},
    endcallMsgStatus: {label: '挂机短信状态', value: 'endcallMsgStatus'},
    cellphone2: {label: '手机2', value: 'cellphone2'},
    gender: {label: '性别', value: 'gender'},
    birthday: {label: '生日', value: 'birthday'},
    reception: {label: '前台电话', value: 'reception'},
    telephone: {label: '座机', value: 'telephone'},
    fax: {label: '传真', value: 'fax'},
    spare1: {label: '备用1', value: 'spare1'},
    spare2: {label: '备用2', value: 'spare2'},
    spare3: {label: '备用3', value: 'spare3'},
    spare4: {label: '备用4', value: 'spare4'},
    spare5: {label: '备用5', value: 'spare5'}
};
var rows = [];
//修改前
var cellbeginedit = function (row, datafield, columntype, value, data, rowdata) {
    // console.log(row);
    console.log(datafield);
    // console.log(columntype);
    console.log(value);
    // console.log(data);
    console.log(rowdata);
    if (rows.indexOf(row) >= 0) {
        return false;
    }
};


//设置筛选下拉内容的输入框
var buildFilterPanel = function (filterPanel, datafield) {

    var textInput = $("<input class='filter-input' />");
    var applyinput = $("<div class='filter-btn-box'></div>");
    var filterbutton = $('<span class="filter-button" tabindex="0" >筛选</span>');
    applyinput.append(filterbutton);
    var filterclearbutton = $('<span class="filter-button" tabindex="0" >清除</span>');
    applyinput.append(filterclearbutton);
    filterPanel.append(textInput);
    filterPanel.append(applyinput);
    filterbutton.jqxButton();
    filterclearbutton.jqxButton();
    var $table = $("#jqxtable");

    var dataSource = {localdata: data};
    var dataadapter = new $.jqx.dataAdapter(dataSource,
        {autoBind: false, autoSort: true, autoSortField: datafield, async: false, uniqueDataFields: [datafield]});
    console.log(dataadapter);
    var column = $table.jqxGrid('getcolumn', datafield);
    textInput.jqxInput({
        width: 220,
        height: 25,
        placeHolder: "请输入" + column.text,
        popupZIndex: 9999999,
        displayMember: datafield,
        source: dataadapter
    });
    textInput.keyup(function (event) {
        if (event.keyCode === 13) {
            filterbutton.trigger('click');
        }
    });
    filterbutton.click(function () {
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = textInput.val().trim();
        if (filtervalue == "") {
            return false;
        }
        var filtercondition = 'contains';
        var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        filtergroup.addfilter(filter_or_operator, filter1);
        $table.jqxGrid('addfilter', datafield, filtergroup);
        $table.jqxGrid('applyfilters');
        $table.jqxGrid('closemenu');
    });
    filterbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterbutton.trigger('click');
        }
    });
    filterclearbutton.click(function () {
        $table.jqxGrid('removefilter', datafield);
        $table.jqxGrid('applyfilters');
        $table.jqxGrid('closemenu');
    });
    filterclearbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterclearbutton.trigger('click');
        }
        textInput.val("");
    });
    $("#gridmenujqxtable").width("240px");
}


function filerDate(filterPanel, datafield) {
    var textInput = $("<input class='filter-input' />");
    var applyinput = $("<div class='filter-btn-box'></div>");
    var filterbutton = $('<span class="filter-button" tabindex="0" >筛选</span>');
    applyinput.append(filterbutton);
    var filterclearbutton = $('<span class="filter-button" tabindex="0" >清除</span>');
    applyinput.append(filterclearbutton);
    filterPanel.append(textInput);
    filterPanel.append(applyinput);
    textInput.jqxCalendar({width: 220, height: 220, selectionMode: 'range', culture: 'ch-CN'});
    textInput.jqxCalendar({firstDayOfWeek: 1});
    textInput.jqxCalendar('setMaxDate', new Date());

    filterbutton.jqxButton();
    filterclearbutton.jqxButton();

    var $table = $("#jqxtable");

    filterbutton.click(function () {
        var filtergroup = new $.jqx.filter();
        console.log(filtergroup);
        var filter_and_operator = 0;
        var range = textInput.jqxCalendar('getRange');
        if (range.from == null || range.to == null) {
            return false;
        }
        var startvalue = range.from.toString("yyyy-MM-dd");
        var endvalue = range.to.toString("yyyy-MM-dd");
        var startcondition = 'GREATER_THAN_OR_EQUAL';
        var endcondition = 'LESS_THAN_OR_EQUAL';
        var filter1 = filtergroup.createfilter('datefilter', startvalue, startcondition);
        var filter2 = filtergroup.createfilter('datefilter', endvalue, endcondition);
        filtergroup.addfilter(filter_and_operator, filter1);
        filtergroup.addfilter(filter_and_operator, filter2);
        $table.jqxGrid('addfilter', datafield, filtergroup);
        $table.jqxGrid('applyfilters');
        $table.jqxGrid('closemenu');
    });
    filterbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterbutton.trigger('click');
        }
    });
    filterclearbutton.click(function () {
        $table.jqxGrid('removefilter', datafield);
        $table.jqxGrid('applyfilters');
        $table.jqxGrid('closemenu');
    });
    filterclearbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterclearbutton.trigger('click');
        }
    });
    $("#gridmenujqxtable").width("240px");

}


var checkSource = {
    datatype: 'json',
    datafields: [
        {name: 'progress', type: 'string'},
        {name: 'actState', type: 'string'},
        {name: 'isDistribution', type: 'string'},
        {name: 'mailState', type: 'string'},
        {name: 'endcallMsgStatus', type: 'string'},
        {name: 'actionType', type: 'string'},
        {name: 'msgState', type: 'string'}
    ],
    localdata: [
        {
            progress: "未标记",
            isDistribution: "未分配",
            actState: "未沟通",
            msgState: "发送成功",
            mailState: "发送成功",
            endcallMsgStatus: "发送成功",
            actionType: "有意向"
        },
        {
            progress: "初步沟通",
            isDistribution: "已分配",
            actState: "已沟通",
            msgState: "打开链接",
            mailState: "发送失败",
            endcallMsgStatus: "打开链接",
            actionType: "无意向"
        },
        {
            progress: "确认需求",
            isDistribution: "空",
            actState: "空",
            msgState: "发送失败",
            mailState: "空",
            endcallMsgStatus: "发送失败",
            actionType: "资料错误"
        },
        {
            progress: "报价",
            isDistribution: "已分配",
            actState: "已沟通",
            msgState: "发送中",
            mailState: "发送失败",
            endcallMsgStatus: "发送中",
            actionType: "二次呼叫"
        },
        {
            progress: "面谈",
            isDistribution: "已分配",
            actState: "已沟通",
            msgState: "空",
            mailState: "发送失败",
            endcallMsgStatus: "空",
            actionType: "空"
        },
        {
            progress: "成单",
            isDistribution: "已分配",
            actState: "已沟通",
            msgState: "发送中",
            mailState: "发送失败",
            endcallMsgStatus: "发送中",
            actionType: "二次呼叫"
        },
        {
            progress: "无需求",
            isDistribution: "已分配",
            actState: "已沟通",
            msgState: "发送中",
            mailState: "发送失败",
            endcallMsgStatus: "发送中",
            actionType: "二次呼叫"
        },
        {
            progress: "输单",
            isDistribution: "已分配",
            actState: "已沟通",
            msgState: "发送中",
            mailState: "发送失败",
            endcallMsgStatus: "发送中",
            actionType: "二次呼叫"
        },
        {
            progress: "空",
            isDistribution: "已分配",
            actState: "已沟通",
            msgState: "发送中",
            mailState: "发送失败",
            endcallMsgStatus: "发送中",
            actionType: "二次呼叫"
        }
    ]
};

function fileterCheck(filterPanel, datafield) {
    var filtercheck = $("<div class='filter-checkbox'></div>");
    var applyinput = $("<div class='filter-btn-box'></div>");
    var filterbutton = $('<span class="filter-button" tabindex="0" >筛选</span>');
    applyinput.append(filterbutton);
    var filterclearbutton = $('<span class="filter-button" tabindex="0" >清除</span>');
    applyinput.append(filterclearbutton);
    filtercheck.jqxListBox({checkboxes: true, width: 220, height: 200, scrollBarSize: 7});
    var filterBoxAdapter = new $.jqx.dataAdapter(checkSource,
        {
            uniqueDataFields: [datafield],
            autoBind: true
        });
    var uniqueRecords = filterBoxAdapter.records;
    uniqueRecords.splice(0, 0, '全部');
    filtercheck.jqxListBox({source: uniqueRecords, displayMember: datafield});
    filtercheck.jqxListBox('checkAll');
    // }
    filterPanel.append(filtercheck);
    filterPanel.append(applyinput);


    var handleCheckChange = true;
    filtercheck.on('checkChange', function (event) {
        if (!handleCheckChange)
            return;

        if (event.args.label != '全部') {
            handleCheckChange = false;
            filtercheck.jqxListBox('checkIndex', 0);
            var checkedItems = filtercheck.jqxListBox('getCheckedItems');
            var items = filtercheck.jqxListBox('getItems');

            if (checkedItems.length == 1) {
                filtercheck.jqxListBox('uncheckIndex', 0);
            }
            else if (items.length != checkedItems.length) {
                filtercheck.jqxListBox('indeterminateIndex', 0);
            }
            handleCheckChange = true;
        }
        else {
            handleCheckChange = false;
            if (event.args.checked) {
                filtercheck.jqxListBox('checkAll');
            }
            else {
                filtercheck.jqxListBox('uncheckAll');
            }

            handleCheckChange = true;
        }
    });

    filterbutton.jqxButton();
    filterclearbutton.jqxButton();

    var $table = $("#jqxtable");

    filterbutton.click(function () {
        var filtergroup = new $.jqx.filter();
        var checkedItems = filtercheck.jqxListBox('getCheckedItems');
        if (checkedItems.length == 0) {
            var filter_or_operator = 1;
            var filtervalue = "";
            var filtercondition = 'CONTAINS';
            var filter = filtergroup.createfilter("stringfilter", filtervalue, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter);
        }
        else {
            for (var i = 0; i < checkedItems.length; i++) {
                var filter_or_operator = 1;
                var filtervalue = checkedItems[i].label;
                var filtercondition = 'equal';
                if (filtervalue == "空") {
                    filtervalue = "";
                }
                var filter = filtergroup.createfilter("stringfilter", filtervalue, filtercondition);
                filtergroup.addfilter(filter_or_operator, filter);
            }
        }

        $table.jqxGrid('addfilter', datafield, filtergroup);
        $table.jqxGrid('applyfilters');
        $table.jqxGrid('closemenu');
    });
    filterbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterbutton.trigger('click');
        }
    });
    filterclearbutton.click(function () {
        $table.jqxGrid('removefilter', datafield);
        $table.jqxGrid('applyfilters');
        $table.jqxGrid('closemenu');
    });
    filterclearbutton.keydown(function (event) {
        if (event.keyCode === 13) {
            filterclearbutton.trigger('click');
        }
    });
    $("#gridmenujqxtable").width("240px");

}

//全部表头
var defaultCulumns = {
    header: {
        text: '<i class="icon icon-table"></i>', datafield: 'header', editable: false,resizable: false,
        width: 35, pinned: true, sortable: !1, filterable: !1
    },
    cusname: {
        text: '客户名称', datafield: 'cusname', width: 80, pinned: true,
        cellbeginedit: cellbeginedit,
        // cellbeginedit: function () {
            // return false;
        // },
        // cellendedit: function () {
            // return false;
        // },
        cellsrenderer: function (row, column, value, defaultHtml, style, rowData) {
            // console.log(rowData)
            if (rowData.lock == 1) {
                if (rows.indexOf(row) < 0) {
                    rows.push(row);
                }
                return '<i class="icon-lock"></i><div class="jqx-grid-cell-left-align">' + value + '</div>';
            }
            return '<i></i><div class="jqx-grid-cell-left-align">' + value + '</div>';
        },
        filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    cellphone: {
        text: '手机号码', datafield: 'cellphone', width: 120,
        cellbeginedit: cellbeginedit,
        filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    position: {
        text: '职位', datafield: 'position', width: 60,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    progress: {
        text: '销售进度', datafield: 'progress', width: 120,
        cellbeginedit: cellbeginedit,
        // filtertype: 'dropdownlist',
        columntype: 'combobox',
        filtertype: "custom", 
        createfilterpanel: function (datafield, filterPanel) {
            fileterCheck(filterPanel, datafield);
        }
        // createfilterpanel: function (datafield, filterPanel) {
        //     buildFilterPanel(filterPanel, datafield);
        // }
    },
    createdTime: {
        text: '创建时间', datafield: 'createdTime', minwidth: 120,
        cellbeginedit: cellbeginedit,
        // cellsformat: "yyyy-MM-dd",
        // columntype: 'datetimeinput',
        // filtertype: 'date',
        createfilterpanel: function (datafield, filterPanel) {
            filerDate(filterPanel, datafield);
        },
        filtertype: "custom",
        // createfilterpanel: function (datafield, filterPanel) {
        //     buildFilterPanel(filterPanel, datafield);
        // }
    },
    lastActionTime: {
        text: '最后一次通话时间', datafield: 'lastActionTime', minwidth: 130,
        cellbeginedit: cellbeginedit,
        // cellsformat: "yyyy-MM-dd",
        // columntype: 'datetimeinput',
        // filtertype: 'date',
        createfilterpanel: function (datafield, filterPanel) {
            filerDate(filterPanel, datafield);
        },
        filtertype: "custom",
        cellsrenderer: function (row, column, value, defaultHtml, style, rowData) {
            
            if (value == "")
                return "";
            else{
                return '通话时长：'+value+' <i class="icon v-icon video play" onclick="audioPlay(this,event);" data-url="' + rowData.callDuration + '" data-name ="' + rowData.cusname + '" data-company="' + rowData.company + '"  data-id="' + rowData.cusid + '"></i>'+'<i class="icon v-icon download" onclick="audioDownload(this,event);" data-url="' + rowData.callDownload + '"  data-id="' + rowData.cusid + '"></i>';
            }
        }
        // createfilterpanel: function (datafield, filterPanel) {
        //     buildFilterPanel(filterPanel, datafield);
        // }
    },
    userName: {
        text: '跟进人', datafield: 'userName', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    company: {
        text: '公司名称', datafield: 'company', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    comAdress: {
        text: '公司地址', datafield: 'comAdress', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    comType: {
        text: '公司类型', datafield: 'comType', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    mainProduce: {
        text: '经营范围', datafield: 'mainProduce', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        },
        cellsrenderer: function (row, column, value, defaultHtml, style, rowData) {
            var mainProduce = '<div class="jqx-grid-cell-text" style="margin-right: 30px;overflow: hidden;text-overflow: ellipsis" title="'+value+'">' + value + '</div>';
            // if (value != "") {
            //     mainProduce += '<a href="javascript:void(0);" onclick="showDetail(this,event)" data-title="' + value + '" style="position: absolute;right:0;top:0;line-height: 40px;">详情</a>';
            // }
            return mainProduce;
        }
    },
    operName: {
        text: '企业法人', datafield: 'operName', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    customerSource: {
        text: '数据来源', datafield: 'customerSource', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    actState: {
        text: '沟通状态', datafield: 'actState', minwidth: 120,
        cellbeginedit: cellbeginedit,
        filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            fileterCheck(filterPanel, datafield);
        }
        // filtertype: "checkedlist"
        // cellsrenderer: function (row, column, value, defaultHtml, style, rowData) {
        //     return '<div class="jqx-grid-cell-text" data-id="' + rowData.cusid + '">' + (value.toString() == "0" ? "已沟通" : "未沟通") + '</div>';
        // },
        // filtertype: "custom",
        // createfilterpanel: function (datafield, filterPanel) {
        //     buildFilterPanel(filterPanel, datafield);
        // }
    },
    isDistribution: {
        text: '分配状态', datafield: 'isDistribution', minwidth: 120,
        cellbeginedit: cellbeginedit,
        filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            fileterCheck(filterPanel, datafield);
        }
        // filtertype: "checkedlist",
        // filtertype: "custom",
        // createfilterpanel: function (datafield, filterPanel) {
        //     buildFilterPanel(filterPanel, datafield);
        // },
        // cellsrenderer: function (row, column, value, defaultHtml, style, rowData) {
        //     return '<div class="jqx-grid-cell-text" data-id="' + rowData.cusid + '">' + (value.toString() == "0" ? "未分配" : "已分配") + '</div>';
        // }
    },
    actionType: {
        text: '电话结果', datafield: 'actionType', minwidth: 120,
        cellbeginedit: cellbeginedit,
        filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            fileterCheck(filterPanel, datafield);
        }
        // filtertype: "custom",
        // createfilterpanel: function (datafield, filterPanel) {
        //     buildFilterPanel(filterPanel, datafield);
        // }
    },
    lastAction: {
        text: '电话标签', datafield: 'lastAction', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    remark: {
        text: '备注', datafield: 'remark', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    registCapi: {
        text: '注册资本', datafield: 'registCapi', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    email: {
        text: '邮箱', datafield: 'email', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    wechat: {
        text: '微信', datafield: 'wechat', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    qq: {
        text: 'QQ', datafield: 'qq', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    msgState: {
        text: '短信状态', datafield: 'msgState', minwidth: 120,
        cellbeginedit: cellbeginedit,
        filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            fileterCheck(filterPanel, datafield);
        }
        // filtertype: "custom",
        // createfilterpanel: function (datafield, filterPanel) {
        //     buildFilterPanel(filterPanel, datafield);
        // }
    },
    mailState: {
        text: '邮件状态', datafield: 'mailState', minwidth: 120,
        cellbeginedit: cellbeginedit,
        filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            fileterCheck(filterPanel, datafield);
        }
        // filtertype: "custom",
        // createfilterpanel: function (datafield, filterPanel) {
        //     buildFilterPanel(filterPanel, datafield);
        // }
    },
    endcallMsgStatus: {
        text: '挂机短信状态', datafield: 'endcallMsgStatus', minwidth: 120,
        cellbeginedit: cellbeginedit,
        filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            fileterCheck(filterPanel, datafield);
        }
        // filtertype: "custom",
        // createfilterpanel: function (datafield, filterPanel) {
        //     buildFilterPanel(filterPanel, datafield);
        // }
    },
    cellphone2: {
        text: '手机2', datafield: 'cellphone2', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    gender: {
        text: '性别', datafield: 'gender', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    birthday: {
        text: '生日', datafield: 'birthday', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    reception: {
        text: '前台电话', datafield: 'reception', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    telephone: {
        text: '座机', datafield: 'telephone', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    fax: {
        text: '传真', datafield: 'fax', minwidth: 120,
        cellbeginedit: cellbeginedit, filtertype: "custom",
        createfilterpanel: function (datafield, filterPanel) {
            buildFilterPanel(filterPanel, datafield);
        }
    },
    spare1: {
        text: '备用1', datafield: 'spare1', minwidth: 120,
        cellbeginedit: cellbeginedit, filterable: !1,
    },
    spare2: {
        text: '备用2', datafield: 'spare2', minwidth: 120,
        cellbeginedit: cellbeginedit, filterable: !1,
    },
    spare3: {
        text: '备用3', datafield: 'spare3', minwidth: 120,
        cellbeginedit: cellbeginedit, filterable: !1,
    },
    spare4: {
        text: '备用4', datafield: 'spare4', minwidth: 120,
        cellbeginedit: cellbeginedit, filterable: !1,
    },
    spare5: {
        text: '备用5', datafield: 'spare5', minwidth: 120,
        cellbeginedit: cellbeginedit, filterable: !1,
    },
   

};
var columns = [];
var leftsource = [];
var rightsource = [];

//初始化表头显示
function tableColumn(head) {
    columns = [];
    var columnShow = head.split(',');
    columns.push(defaultCulumns['header']);
    columns.push(defaultCulumns['cusname']);
    for (var i = 0; i < columnShow.length; i++) {
        if (columnShow[i] != 'header' && columnShow[i] != 'cusname') {
            columns.push(defaultCulumns[columnShow[i]])
        }
    }
}

//初始化更改表头的左右显示内容
function headReset(head) {
    var columnShow = head.split(',');

    for (var i = 0; i < columnShow.length; i++) {
        if (columnShow[i] != 'header' && columnShow[i] != 'cusname') {
            rightsource.push(defaultHead[columnShow[i]])
            delete defaultHead[columnShow[i]];
        }
    }
    for (var index in defaultHead) {
        leftsource.push(defaultHead[index]);
    }
}


$(document).ready(function () {

    tableColumn(tablehead);
    headReset(tablehead);
    var source = {
        datatype: 'json',
        datafields: [
            {name: 'cusid', type: 'string'},
            {name: 'cusname', type: 'string'},
            {name: 'cellphone', type: 'string'},
            {name: 'company', type: 'string'},
            {name: 'position', type: 'string'},
            {name: 'createdTime', type: 'string'},
            {name: 'userName', type: 'string'},
            {name: 'comAdress', type: 'string'},
            {name: 'progress', type: 'string'},
            {name: 'lastActionTime', type: 'string'},
            {name: 'comType', type: 'string'},
            {name: 'mainProduce', type: 'string'},
            {name: 'customerSource', type: 'string'},
            {name: 'actState', type: 'string'},
            {name: 'isDistribution', type: 'string'},
            {name: 'actionType', type: 'string'},
            {name: 'remark', type: 'string'},
            {name: 'operName', type: 'string'},
            {name: 'registCapi', type: 'string'},
            {name: 'lastAction', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'wechat', type: 'string'},
            {name: 'qq', type: 'string'},
            {name: 'callDuration', type: 'string'},
            {name: 'callDownload', type: 'string'},
            {name: 'mailState', type: 'string'},
            {name: 'endcallMsgStatus', type: 'string'},
            {name: 'cellphone2', type: 'string'},
            {name: 'gender', type: 'string'},
            {name: 'birthday', type: 'string'},
            {name: 'reception', type: 'string'},
            {name: 'telephone', type: 'string'},
            {name: 'fax', type: 'string'},
            {name: 'spare1', type: 'string'},
            {name: 'spare2', type: 'string'},
            {name: 'spare3', type: 'string'},
            {name: 'spare4', type: 'string'},
            {name: 'spare5', type: 'string'},
            {name: 'lock', type: 'int'}
        ],
        localdata: data
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    console.log(dataAdapter);
    //修改结束后
    $("#jqxtable").on('cellendedit', function (event) {
        console.log(event);
        console.log(event.args);

    });


    //显示客户详细信息
    $("#jqxtable").on('cellclick', function (event) {
        // console.log(event);
        // console.log(event.args.row.bounddata);
        if (event.args.datafield == 'cusname') {
            customerShow(event.args.row.bounddata);
        } else {
            return false;
        }
    });

    //表格内复选框
    $("#jqxtable").on('rowselect rowunselect', function (e) {
        var rowindexes = $('#jqxtable').jqxGrid('getselectedrowindexes');
        var setting = $(".table-setting");
        if (rowindexes.length > 0) {
            setting.fadeIn();
        } else {
            setting.fadeOut();
        }
        setting.find(".count-select").text(rowindexes.length);
    });
    //隐藏选择之后显示的操作
    $(".table-setting").find(".close-gray").click(function () {
        $(".table-setting").fadeOut();
    });

    //显示自定义表头
    $('#jqxtable').on('columnclick', function (event) {
        // console.log(event);
        console.log(event.args);
        if (event.args.datafield == 'header') {
            CustomHead();
        }
    });

    //拖动修改表头位置（表头排序）
    $("#jqxtable").on('columnreordered', function (event) {
        console.log(event);
        console.log($("#jqxtable").jqxGrid("columns").records);
        // delete rightsource[event.args.oldindex - 2];
        // rightsource.splice(event.args.newindex - 1, 0, {label: event.args.columntext, value: event.args.datafield});
        var source = [];
        var records = $("#jqxtable").jqxGrid("columns").records;
        for (var i = 3; i < records.length; i++) {
            // if (records[i].text.trim() == "") {
            //     var text = records[i].datafield == "callDuration" ? "通话录音" : records[i].datafield == "callDownload" ? "录音下载" : "";
            //     source.push({value: records[i].datafield, label: text});
            // } else {
                source.push({value: records[i].datafield, label: records[i].text});
            // }
        }
        console.log(source);
        rightsource = source;
    });

    // 创建表格
    $("#jqxtable").jqxGrid({
        width: '100%',
        height: '100%',
        source: dataAdapter,
        columnsresize: true, //调整列的宽度
        columnsreorder: true,
        columnsheight: 45, //头部高度
        scrollbarsize: 7,
        sortable: true, //排序
        filterable: true,
        ready: function () {
            // addfilter();
        },
        scrollmode: 'logical',
        altrows: true, //交替行，单数行和双数行不同
        pageable: true, //分页
        pagesize: 20, //每页显示行数
        pagermode: 'simple', //分页样式
        editable: true,
        editmode: 'dblclick', //双击
        selectionmode: 'checkbox', //选择框
        rowsheight: 40, //行高
        pagerheight: 50,
        //					showsortmenuitems: !1,
        columns: columns
    });

    $(".table-wrap").on('resize', function () {
        console.log("werwer");
    })

});

//表格顶部设置隐藏
function settingHide() {
    var setting = $(".table-setting");
    setting.fadeOut();
}

//显示客户详情
function customerShow(data) {
    console.log(data);
    console.log(vm);
    vm.$data.layers.customerDetail.message = data;
    vm.$data.layers.customerDetail.show = true;
    console.log(customerDetail);
    // Vue.use(customerDetail);

    console.log(vm.$data.layers.customerDetail);
    // $("#detail").modal("show");
}

//自定义表头弹框显示
function CustomHead() {
    console.log("自定义表头");
    // $("#customHead").modal("show");

    console.log($("#jqxtable").get)

    vm.$data.layers.tableHead.show = true;
}

//自定义表头
// $(function () {
//     // $("#list-left").jqxListBox({width: 200, height: 335, multiple: true, scrollBarSize: 7, source: leftsource});
//     // $("#list-right").jqxListBox({width: 200, height: 335, multiple: true, scrollBarSize: 7, source: rightsource});
// });
//
// function ListBox(el) {
//     console.log(el);
//     $(el).jqxListBox({width: 200, height: 335, multiple: true, scrollBarSize: 7, source: rightsource});
// }

//自定义表头的位置和显示
function listMove(directionIndex) {
    var box = "left";
    var obox = "right";
    var nbox;
    var opposing = ["left", "right"];
    var direction = ["right", "left"];
    if (directionIndex >= 2) {
        box = obox = "right";
        nbox = "left";
    } else {
        box = direction[directionIndex];
        nbox = obox = opposing[directionIndex];
    }
    var $box = $("#list-" + box);
    var $obox = $("#list-" + obox);
    var $nbox = $("#list-" + nbox);
    var item = $box.jqxListBox('getSelectedItems');
    var oitem = $nbox.jqxListBox('getSelectedItems');
    for (var i = oitem.length - 1; i >= 0; i--) {
        $nbox.jqxListBox('unselectIndex', oitem[i].index);
    }
    for (var i = item.length - 1; i >= 0; i--) {
        $box.jqxListBox('unselectIndex', item[i].index);
    }
    var removeIndex, Addindex;
    if (directionIndex >= 2 && item.length > 0 && item[0] != undefined) {
        removeIndex = item[0].index;
        Addindex = directionIndex == 2 ? removeIndex - 1 : removeIndex + 1;
        $box.jqxListBox('removeAt', removeIndex);
        $obox.jqxListBox('insertAt', {label: item[0].label, value: item[0].value}, Addindex);
        $obox.jqxListBox('selectIndex', Addindex);
    }
    else {
        for (var i = item.length - 1; i >= 0; i--) {
            removeIndex = item[i].index;
            $box.jqxListBox('removeAt', removeIndex);
            $obox.jqxListBox('insertAt', {label: item[i].label, value: item[i].value});
            $obox.jqxListBox('selectIndex', $obox.jqxListBox('getItems').length - 1);
        }
    }
}

//自定义表头保存
function customSubmit() {
    console.log('1212121')
    var itemShow = $("#list-right").jqxListBox('getItems');
    var itemHide = $("#list-left").jqxListBox('getItems');
    $("#jqxtable").jqxGrid('beginupdate');
    tablehead = "";
    for (var i = 0; i < itemShow.length; i++) {
        tablehead += itemShow[i].value;
        if (i != itemShow.length - 1) {
            tablehead += ",";
        }
        $("#list-right").jqxListBox('unselectIndex', i);
    }
    for (var i = 0; i < itemHide.length; i++) {
        $("#list-left").jqxListBox('unselectIndex', i);
    }
    leftsource = itemHide;
    rightsource = itemShow;
    tableColumn(tablehead);
    $("#jqxtable").jqxGrid('columns', columns);
    $("#jqxtable").jqxGrid('endupdate');
    // $("#customHead").modal("hide");
    vm.$data.layers.tableHead.show = false;
}


//添加用户提交
// function customAdd() {
//     alert("", "添加成功", function () {
//         //新增客户弹框隐藏
//         $("#customer").modal("hide");
//     }, {type: "success"});
// }


//显示表格中的详情
function showDetail(obj, e) {
    var offset = $(obj).offset();
    var panels = $("#panels-detail");
    var top = offset.top + 40;
    var left = offset.left;
    panels.html($(obj).data().title);
    panels.show();
    if (top + panels.outerHeight() >= $(window).height()) {
        top -= panels.outerHeight() + 40;
    }
    if (left + panels.outerWidth() >= $(window).width()) {
        left -= panels.outerWidth();
    }

    panels.css({"top": top, "left": left});
    e.stopPropagation();
}

$(document).click(function (e) {
    $("#panels-detail").hide();
});

$("#panels-detail").click(function (e) {
    e.stopPropagation();
})



