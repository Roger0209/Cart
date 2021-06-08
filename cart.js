$(function() {
    //getSum();
    getTable();
    getCnt();

    //全選
    $(".checkall").change(function(){
        $(".j-check").prop("checked",$(this).prop("checked"));
        getSum();
    });

    //子選項影響全選
    $('.j-check').change(function(){
        if ($('.j-check:checked').length==$(".j-check").length) {
            $(".checkall").prop("checked",true);
        } else {
            $(".checkall").prop('checked',false);
        }
        getSum();
    });

    //數量+按鈕
    $(".inc").click(function() {
        var n=$(this).siblings(".itxt").val();//取input裡面的值
        n++;
        $(this).siblings(".itxt").val(n);//把n++後的值放入輸入框

        var p=$(this).parents(".p-num").siblings('.p-price').html();
        var price="NT$"+(p*n).toFixed(0);
        $(this).parents('.p-num').siblings('.p-sum').html(price);//抓取price的值去取代p-sum的值
        getSum();
    })

    $(".dec").click(function() {
        var n=$(this).siblings(".itxt").val();
        if (n==0) {
            return false;
        }

        n--;
        $(this).siblings(".itxt").val(n);//n塞到itxt

        var p=$(this).parents(".p-num").siblings('.p-price').html();
        var price="NT$"+(p*n).toFixed(0);
        $(this).parents('.p-num').siblings('.p-sum').html(price);
        getSum();
    });

    //手動輸入數量
    $('.itxt').change(function() {
        var n=$(this).val();
        var p=$(this).parents(".p-num").siblings('.p-price').html();
        var price="NT$"+(p*n).toFixed(0);
        $(this).parents('.p-num').siblings('.p-sum').html(price);
        getSum();
    });

    $(".p-action").click(function(){
        $(this).parents('.p-item').remove();
        getSum();
        getCnt();

        var mybody=$("#tbody").html();//remove清掉節點資料，用html()塞進去
        localStorage.shopping=mybody;
    });

});

function getSum() {
    //計算商品總數量
    var cnt=0;
    var item=$(".j-check:checked").parents(".p-item");//選取勾選到的j-check 往父層找到p-item
    item.find(".itxt").each(function(index,element){
        cnt += parseInt($(element).val());
    });
    $(".p-amt em").text(cnt);
    
    //計算總價
    var money=0;
    item.find(".p-sum").each(function(){
        str=$(this).text();//處理NT$
        mstr=str.substring(3);//截掉NT$後的數字
        money += parseInt(mstr);
    });
    $(".total em").text(money);
}

//計算幾樣商品在購物車裡
function getCnt() {
    var cnt=0;
    $(".p-item").each(function(){//不管有沒有勾選的p-item全找到
        cnt++;
    });
    $('#mycnt').text(cnt);
    localStorage.count=cnt;
}

function getTable() {
    var shopping;
    if (localStorage.shopping)
        shopping=localStorage.shopping;
    else
        shopping="";
    $('#tbody').html(shopping);
}

