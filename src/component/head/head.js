// /**
//  * Created by lixin on 2017/4/13.
//  */
// $(function() {
//     //头像点击显示下拉
//     $("#head-photo").click(function(event) {
//         dropdown($("#head-drop"),$(".dropdown"),event);
//     });
//     $("#help").click(function(event) {
//         dropdown($("#help-drop"),$(".dropdown"),event);
//     });
//
// });
//
//
// //头部搜索
// function Hsearch(){
//     console.log("头部搜索");
//     return false;
// }
//
// //显示下拉，
// function dropdown(obj,obj2, event) {
//     if(obj.hasClass("active")) {
//         obj.removeClass("active");
//     } else {
//         obj.addClass("active");
//     }
//     $(document).one("click", function() {
//         obj2.removeClass("active");
//     });
//     obj2.click(function(event) {
//         event.stopPropagation();
//     });
//     event.stopPropagation();
// }
//
