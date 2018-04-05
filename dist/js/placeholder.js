///*! http://mths.be/placeholder v2.0.8 by @mathias */
////(function(i,k,f){var b=Object.prototype.toString.call(i.operamini)=="[object OperaMini]";var a="placeholder" in k.createElement("input")&&!b;var g="placeholder" in k.createElement("textarea")&&!b;var l=f.fn;var e=f.valHooks;var c=f.propHooks;var n;var m;if(a&&g){m=l.placeholder=function(){return this};m.input=m.textarea=true}else{m=l.placeholder=function(){var p=this;p.filter((a?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":d,"blur.placeholder":h}).data("placeholder-enabled",true).trigger("blur.placeholder");return p};m.input=a;m.textarea=g;n={get:function(q){var p=f(q);var r=p.data("placeholder-password");if(r){return r[0].value}return p.data("placeholder-enabled")&&p.hasClass("placeholder")?"":q.value},set:function(q,s){var p=f(q);var r=p.data("placeholder-password");if(r){return r[0].value=s}if(!p.data("placeholder-enabled")){return q.value=s}if(s==""){q.value=s;if(q!=o()){h.call(q)}}else{if(p.hasClass("placeholder")){d.call(q,true,s)||(q.value=s)}else{q.value=s}}return p}};if(!a){e.input=n;c.value=n}if(!g){e.textarea=n;c.value=n}f(function(){f(k).delegate("form","submit.placeholder",function(){var p=f(".placeholder",this).each(d);setTimeout(function(){p.each(h)},10)})});f(i).bind("beforeunload.placeholder",function(){f(".placeholder").each(function(){this.value=""})})}function j(q){var p={};var r=/^jQuery\d+$/;f.each(q.attributes,function(t,s){if(s.specified&&!r.test(s.name)){p[s.name]=s.value}});return p}function d(q,r){var p=this;var s=f(p);if(p.value==s.attr("placeholder")&&s.hasClass("placeholder")){if(s.data("placeholder-password")){s=s.hide().next().show().attr("id",s.removeAttr("id").data("placeholder-id"));if(q===true){return s[0].value=r}s.focus()}else{p.value="";s.removeClass("placeholder");p==o()&&p.select()}}}function h(){var t;var p=this;var s=f(p);var r=this.id;if(p.value==""){if(p.type=="password"){if(!s.data("placeholder-textinput")){try{t=s.clone().attr({type:"text"})}catch(q){t=f("<input>").attr(f.extend(j(this),{type:"text"}))}t.removeAttr("name").data({"placeholder-password":s,"placeholder-id":r}).bind("focus.placeholder",d);s.data({"placeholder-textinput":t,"placeholder-id":r}).before(t)}s=s.removeAttr("id").hide().prev().attr("id",r).show()}s.addClass("placeholder");s[0].value=s.attr("placeholder")}else{s.removeClass("placeholder")}}function o(){try{return k.activeElement}catch(p){}}}(this,document,jQuery));
//
///*! http://mths.be/placeholder v2.0.8 by @mathias */
//$(function(){
//
//	if( !('placeholder' in document.createElement('input')) ){
//
//  $('input[placeholder],textarea[placeholder]').each(function(){ 
//  
//    var that = $(this),    
//    text= that.attr('placeholder');  
//  if(that.attr("type")!="password"){
//  	
//    if(that.val()===""){    
//      that.val(text).addClass('placeholder');    
//    }    
//    that.focus(function(){    
//      if(that.val()===text){    
//        that.val("").removeClass('placeholder');    
//      }    
//    })    
//    .blur(function(){    
//      if(that.val()===""){    
//        that.val(text).addClass('placeholder');    
//      }    
//    })    
//    .closest('form').submit(function(){    
//      if(that.val() === text){    
//        that.val('');    
//      }    
//    });  
//  }
//  });    
//}   
//		
//	})


/**
 * 该控件兼容IE9以下，专门针对IE9以下不支持placeholder属性所做
 * Author: quranjie
 * Date：2014-09-26
 */
$(function () {
    // 如果不支持placeholder，用jQuery来完成
    if (!isSupportPlaceholder()) {
        // 遍历所有input对象, 除了密码框
        $('input').not("input[type='password']").each(
            function () {
                var self = $(this);
                var val = self.attr("placeholder");
                input(self, val);
            }
        );

        /* 对password框的特殊处理
         * 1.创建一个text框 
         * 2.获取焦点和失去焦点的时候切换
         */
        $('input[type="password"]').each(
            function () {
                var pwdField = $(this);
                var pwdVal = pwdField.attr('placeholder');
                var pwdId = pwdField.attr('id');
                // 重命名该input的id为原id后跟1
                pwdField.after('<input id="' + pwdId + '1" type="text" value=' + pwdVal + ' autocomplete="off" />');
                var pwdPlaceholder = $('#' + pwdId + '1');
                pwdPlaceholder.show();
                pwdField.hide();

                pwdPlaceholder.focus(function () {
                    pwdPlaceholder.hide();
                    pwdField.show();
                    pwdField.focus();
                });

                pwdField.blur(function () {
                    if (pwdField.val() == '') {
                        pwdPlaceholder.show();
                        pwdField.hide();
                    }
                });
            }
        );
    }
});

// 判断浏览器是否支持placeholder属性
function isSupportPlaceholder() {
    var input = document.createElement('input');
    return 'placeholder' in input;
}

// jQuery替换placeholder的处理
function input(obj, val) {
    var $input = obj;
    var val = val;
    $input.attr({value: val});
    $input.focus(function () {
        if ($input.val() == val) {
            $(this).attr({value: ""});
        }
    }).blur(function () {
        if ($input.val() == "") {
            $(this).attr({value: val});
        }
    });
}

