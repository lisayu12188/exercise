"use strict"
//滚动窗口，头部导航条固定
$(window).scroll(function(){
            if($(window).scrollTop()>=90){
              $("header .search-wrapper").stop().addClass("fixed");
                // $("header .page-top").stop(true).slideUp("300");
                $("header .input-wrapper").stop(true,true).hide();
            }
            else{
                $("header .search-wrapper").stop().removeClass("fixed")
                $("header .page-top").stop(true).slideDown("300");
                $("header .input-wrapper").stop(true,true).show();
                
            }

            if($(window).scrollTop()>=150){
              // $("#slider-box").stop(true).css("marginTop","50px");
                $("#side-bar").stop(true,true).slideDown(300)
              }else{
                $("#slider-box").stop(true).css("marginTop","0");
                $("#side-bar").stop(true).slideUp(300)
              }
        });

 //二维码点击掩藏和显示
 $(".app a").click(function(){
  if($(".app a[data-status='1']").length!=0){
    $("#two-code").fadeIn();
    $(this).attr("data-status","0").addClass("hover");

  }else{
    $("#two-code").fadeOut();
    $(this).attr("data-status","1").removeClass("hover");
  }
 })
 //选择语言
 $("#language .dropdown-menu").on("click","p",function(e){
  e.preventDefault();
  var lgg=$(this).clone().replaceAll("#lgg-btn>p");
})