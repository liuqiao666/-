//第一步 初始化瀑布流dom布局
var Waterfall = new huiWaterfall('#HUI_Waterfall');
/*
 * 第二步 使用waterfall对象的 addItems()函数为瀑布流增加内容 
 * 一般情况下瀑布流内的内容会通过远程服务器获取，hui支持的瀑布流内容格式为：
 * <div class="hui-water-items">
 *     <a herf="hui.toast('您的链接');">
 *         <div><img src="图片地址" /></div>
 *         <div class="hui-water-items-text">文本</div>
 *     </a>
 * </div>
 * 后端服务器重复输出以上dom结构内容即可，支持使用上拉加载更多，加载后再次调用addItems()函数即可。
 * 以下是一个模拟的例子
 */
var data = new Array();
for(var i = 1; i <= 10; i++){
    data.push({img : 'img/water'+i+'.jpg', title : '说明内容'});
}
var page = 1;
getList();
//模拟远程获取数据 随机对数据进行排序
function getList(){
    data.shuffle(); //随机对数据进行排序
    //组合dom
    var str = '';
    for(var i = 0; i < data.length; i++){
        str += '<div class="hui-water-items">'+
'<div class="hui-water-items-img"><img src="'+data[i].img+'" /></div>'+
'<div class="hui-water-items-text">'+
'<div class="left"><span>李玉</span><span class="blue">1234票</span></div>'+
'<div class="right"><button type="button" class="hui-button hui-primary hui-fl" name="vote"  id="btn">投他一票</button></div>'+
'</div></div>';
    }
    Waterfall.addItems(str);
    if(page >= 4){
        hui.endLoadMore(true);
    }else{
        hui.endLoadMore();
    }
    page++;
}
hui.loadMore(getList);

/**/
hui.scrollNews(scrollnew);