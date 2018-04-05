+function ($) {
    'use strict';

    var MessageEditor = function (element, option) {
        // console.log(this);
        // console.log(element);
        // console.log(option);

        this.$element = $(element)
        this.$text = this.$element.find('.message-text')
        this.$backdrop = null
        this.isShown = null
        this.callback = function () {

        }
    }


    MessageEditor.DEFAULTS = {
        editor: true,
        defaultText: "点击填写"
    }

    MessageEditor.prototype = {
        init: function () {
            // console.log("123");
            var $this = $(this);
            var obj = this;
            // console.log(this);
            // console.log($this);
            if (e && e.type == 'click' && /input|textarea|select/i.test(e.target.tagName) && $.contains(obj[0], e.target)) return

            if ($this.hasClass("editor")) {
                removeEditor();
            }
            else {
            }

        },
        toggle: function (_relatedTarget) {
            return this.isShown ? false : this.editor(_relatedTarget)
        },
        editor: function (_relatedTarget) {
            var that = this
            var e = $.Event('editor.bs.MessageEditor', {relatedTarget: _relatedTarget})
            // console.log(that);
            // console.log(e);

            this.$element.trigger(e)

            if (this.isShown || e.isDefaultPrevented()) return
            this.isShown = true
            var data = this.$text.data();
            var value = data.value;
            this.$text.html("");
            if (data.type == "input") {
                $(document.createElement(data.type))
                    .addClass("input")
                    .attr("placeholder", "请输入" + data.nametext)
                    .attr("value", data.value)
                    .appendTo(this.$text).focus();
            }
            else if (data.type == "select") {
                var select = data.option.split(',');
                var options = "";
                for (var i = 0; i < select.length; i++) {
                    options += data.value == select[i] ? "<option selected='selected'>" : "<option>";
                    options += select[i];
                    options += "</option>";
                }

                var select =  $(document.createElement(data.type));
                    select.addClass('select2')
                    .append(options)
                    .appendTo(this.$text);
                    // console.log(jQuery.fn.select2);
                    if(jQuery.fn.select2 != undefined){
                        select.select2();
                    }
            }

            that.$element.trigger('focus').trigger(e)
            that.$element.addClass("editor");

        },
        removeEditor: function (e) {
            if (e) e.preventDefault()

            e = $.Event('removeEditor.bs.MessageEditor')

            this.$element.trigger(e)
            if (!this.isShown || e.isDefaultPrevented()) return

            this.isShown = false

            $(document).off('focusin.bs.MessageEditor')
            console.log(this.$text.children());
            var value = this.$text.children()[0].value;
            if (value == undefined) {
                return
            }



            if (value == "") {
                value = MessageEditor.DEFAULTS.defaultText;
            }

            this.$text.data().value = value;
            this.$text.html(value);
            // this.$text.append("<div class='message-block'>" + value + "</div>");
            this.$element.removeClass("editor");

        },
        backdrop: function (callback) {
            console.log(callback);
            console.log(this.$text.data());
            var data = this.$text.data();
            var that = this;
            if (this.isShown && this.options.backdrop) {

                if (!callback) return
// console.log("123");

            } else if (!this.isShown && this.$backdrop) {

            } else if (callback) {

                eval(callback);//()
            }
        }
    }


    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.MessageEditor')
            var options = $.extend({}, MessageEditor.DEFAULTS, $this.data(), typeof option == 'object' && option)
            //
            console.log(options);
            //
            if (!data) $this.data('bs.MessageEditor', (data = new MessageEditor(this, options)))
            if (options.editor) data.editor(_relatedTarget)
            else {
                data.removeEditor();
                data.backdrop(options.callback);
            }
        })
    }


    var old = $.fn.MessageEditor

    $.fn.MessageEditor = Plugin
    $.fn.MessageEditor.Constructor = MessageEditor


    // MODAL NO CONFLICT
    // =================

    $.fn.MessageEditor.noConflict = function () {
        $.fn.MessageEditor = old
        return this
    }


    // $(".layer-detail-wrap")
    //     .on('click.bs.dropdown.data-api', function (e) {
    //         console.log(e);
    //         console.log($(e.target).isChildOf(".message-li"));
    //         if ($(e.target).isChildAndSelfOf(".message-li")) {
    //             $(".editor[data-toggle='MessageEditor']").each(function () {
    //                 if (!$(e.target).isChildAndSelfOf(this)) {
    //                     console.log("false")
    //                     Plugin.call($(this), {editor: false, callback: changed(this)}, this)
    //                 }
    //             })
    //             // return false;
    //         }
    //         else {
    //             $(".editor[data-toggle='MessageEditor']").each(function () {
    //                 Plugin.call($(this), {editor: false, callback: changed(this)}, this)
    //             })
    //
    //         }
    //     })
    //     .on('click.bs.MessageEditor.data-api', '[data-toggle="MessageEditor"]', function (e) {
    //         console.log(e);
    //         if ($(e.target).isChildAndSelfOf(".message-li")) {
    //             var $this = $(this)
    //             var $target = $this
    //             var option = $target.data('bs.MessageEditor') ? 'toggle' : $.extend($target.data(), $this.data())
    //
    //             Plugin.call($target, {editor: true}, this)
    //         }
    //     })

}(jQuery);
