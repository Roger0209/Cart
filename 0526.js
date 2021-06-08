var close=document.getElementsByClassName('close');

function newElement() {
    var li=document.createElement("li");
    var myInput=document.getElementById("myInput");
    var val=myInput.value;
    //console.log(val);val=>輸入框內的內容
    
    var valNode=document.createTextNode(val);
    li.appendChild(valNode);
    if (val==='') {//輸入框為空時，不新增li
        return;
    }
    document.getElementById("myUL").appendChild(li);//擺到myUL的地方
    myInput.value='';//新增完輸入欄變空白

    var span=document.createElement("SPAN");
    var spanTxt=document.createTextNode("\u00D7");//x符號
    span.className='close';
    span.appendChild(spanTxt);//將spanTxt放到span之中
    li.appendChild(span);//將span放到li之中

    for (var i=0; i<close.length; i++) {
        close[i].onclick=function() {//找哪個close被按xx
            var div=this.parentElement;//找父元素li把他關掉
            div.style.display='none';//按x關掉
        }
    }
}