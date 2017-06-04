/**
 * Created by yupeiying on 3/28/17.
 */
/*1.页面顶部：导航条+搜索框*/
//弹出请选择语言，点击时选择相应的语言；
var language=document.getElementById("language");
var lgType=document.querySelectorAll("#language-type li");
language.addEventListener("mouseover",function(){
    //this.firstElementChild.className="hover";
});
for(var i=0;i<lgType.length;i++) {
    lgType[i].addEventListener("click",showSub);
}

function showSub(e) {
    e.preventDefault();
    for(var i=0;i<lgType.length;i++){
        lgType[i].className = '';
    }
    this.className = "current";

    //language.firstElementChild.style.display = "none";

}
