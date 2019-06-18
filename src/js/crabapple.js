
// 定义全局变量

// prime_url='http://www.yanyan.site:8080/online/'
prime_url='http://127.0.0.1:8080/online/'


/**
 * 获取cookie
 * @param objName
 * @returns {string}
 */
function getCookie(objName) {//获取指定名称的cookie的值
    return window.localStorage[objName]

}

/**
 * 设置cookie
 * @param c_name
 * @param value
 * @param expiredays
 */
function setCookie(c_name,value,expiredays){
   window.localStorage[c_name]=value
}

/**
 * 删除cookie
 * @param name
 */
function delCookie(name) {
    localStorage.removeItem(name)
    // var exp = new Date();
    // exp.setTime(exp.getTime() - 1);
    // var cval=getCookie(name);
    // if(cval!=null)
    //     document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


/**
 *清除所有cookie函数
 */
function clearAllCookie() {
    localStorage.clear()
    // console.log(document.cookie)
    // var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    // console.log(keys)
    // if(keys) {
    //     for(var i = keys.length; i--;)
    //         document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    // }
}

function getGoodsList(orderId,shopName,shopInfo,del){

   return "<div class=\"ddxq\">\n" +
    "                    <div onclick=\"todetailPage(\'"+shopName+"\')\" class=\"ddspt fl\"><img style='height: 100%;width: 100%' src=\""+prime_url+"goods\\"+orderId+".jpg"+"\" alt=\"\"></div>\n" +
    "                    <div class=\"ddbh fl\"><a>商品号:</a><a>"+orderId+"</a></div>\n" +
    "                    <div class=\"ztxx fr\" style='cursor: pointer'>\n" +
    "                        <ul>\n" +
    "                           \n" +
    "                            <li>"+shopName+"</li>\n" +
    "                            <li>"+shopInfo+"</li>\n" +
    "                            <li><a onclick='delItem("+orderId+","+del+")'>删除</a></li>\n" +
    "                            <div class=\"clear\"></div>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <div class=\"clear\"></div>\n" +
    "                </div>"
}

function getIndexGoods(orderId,shopName,shopInfo){


    return " <div onclick=\"toXiangqing(\'"+shopName+"\')\" class=\"mingxing fl mb20\" style=\"border:2px solid #fff;width:230px;cursor:pointer;\" onmouseout=\"this.style.border='2px solid #fff'\" onmousemove=\"this.style.border='2px solid red'\">\n" +
    "            <div class=\"sub_mingxing\"><a  ><img style='height: 100%;width: 100%' src=\""+prime_url+"goods\\"+orderId+".jpg"+"\" alt=\"\"></a></div>\n" +
    "            <div class=\"pinpai\"><a href=\"./xiangqing.html\" >"+shopName+"</a></div>\n" +
    "            <div class=\"youhui\">"+shopInfo+"</div>\n" +
    "            <div class=\"jiage\">议价</div>\n" +
    "        </div>\n"
}
function toXiangqing(shopName) {
    console.log(123)
    setCookie('shopName',shopName,1)
    window.location.href='./xiangqing.html'
}


function getDetailGoods(orderId,shopName,shopInfo){

    setCookie("shopId",orderId,1)
    setCookie("shopName",shopName,1)
    setCookie("shopInfo",shopInfo,1)

    return "<div class=\"danpin center\">\n" +
        "\n" +
        "        <div class=\"biaoti center\">onLine校园购物平台</div>\n" +
        "        <div id=\"lis\" class=\"main center\">\n" +
        "            <div class=\"jieshao mt20 w\">\n" +
        "                <div class=\"left fl\"><img style='width: 100%;height: 100%' src=\""+prime_url+"goods\\"+orderId+".jpg\"></div>\n" +
        "                <div class=\"right fr\">\n" +
        "                    <div class=\"h3 ml20 mt20\">"+shopName+"</div>\n" +
        "                    <div class=\"jianjie mr40 ml20 mt10\">"+shopInfo+"</div>\n" +
        "\n" +
        "                    <div class=\"xiadan ml20 mt20\">\n" +
        "                        <input class=\"jrgwc\" type=\"button\" name=\"jrgwc\" onclick=\'toBuy()\'value=\"立即选购\">\n" +
        "                        <input class=\"jrgwc\" type=\"button\" name=\"jrgwc\" onclick=\'addToCollection("+orderId+")\' value=\"加入收藏夹\">\n" +
        "\n" +
        "                    </div>\n" +
        "  <div onclick='toSellerCenter()'  style='cursor:pointer;margin-top:20px;vertical-align:middle '><a  style='padding-left: 20px;    font-size: 14px;color: #a2a2a8 ;'>卖家中心&nbsp;&nbsp;&nbsp;</a><img  style='vertical-align:middle;width: 50px;height: 50px;border-radius:50px' src=\""+prime_url+"profile\\"+getCookie('sellerId')+".jpg\"></div>"+
    "                </div>\n" +
        "                <div class=\"clear\"></div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>"

}

function addToCollection(shopId) {
    console.log('加到收藏夹了')
    getGoods()

    function getGoods() {
        let xmlhttplogin = new XMLHttpRequest();
        xmlhttplogin.onreadystatechange = function () {
            if (xmlhttplogin.readyState == 4 && xmlhttplogin.status == 200) {
                let re = JSON.parse(xmlhttplogin.responseText);

                if (re.success == true)
                    alert(re.state)
                else
                    alert(re.errMsg)

            }
        }
            xmlhttplogin.open("GET", prime_url + 'history/addtocollectedlist?shopId=' + shopId + "&userId=" + getCookie('userId'), true);
            xmlhttplogin.setRequestHeader('Content-Type', 'application/json')
            xmlhttplogin.send();

    }
}

function toBuy(){

  window.location.href='./gouwuche.html'
}

function toSellerCenter() {
    window.location.href='./person_center/sellerCenter.html'
}


function getremak(remarkInfo,createTime){

    return "<div class=\"subgrzl ml40\"><span>·</span><span id=\"v_userName\">"+remarkInfo+"</span><span></a><a style='font-size: 6px'>"+toConvert(createTime)+"</a></span></div>"
}

/**
 * 日期转换
 * @type {Date}
 */
function toConvert(miles){
    var unixTimestamp = new Date( miles ) ;
    return unixTimestamp.toLocaleString();

}

function delItem(id,choice){
    let url=prime_url
    if(choice==1)
        url+='shop/delshop?sellerId='+getCookie('userId')+"&shopId="+id;
    else if(choice==2)
        url+='history/deletefromcollectedlist?userId='+getCookie('userId')+'&shopId='+id;
    else if(choice==3)
        url+='history/deleteshopinfofromhistory?userId='+getCookie('userId')+'&shopId='+id;

    let xmlhttplogin = new XMLHttpRequest();
    xmlhttplogin.onreadystatechange = function () {
        if (xmlhttplogin.readyState == 4 && xmlhttplogin.status == 200) {
            let re = JSON.parse(xmlhttplogin.responseText);

            if (re.success == true) {
                console.log(re)
                if(choice==1)
                    window.location.href='../person_center/selling.html'
                else if(choice==2)
                    window.location.href='../person_center/collection.html'
                else if(choice==3)
                    window.location.href='../person_center/footer.html'
                alert('删除成功!')

            }
            else alert('删除失败!')
        }
    }
    xmlhttplogin.open("GET", url, true);
    xmlhttplogin.setRequestHeader('Content-Type', 'application/json')
    xmlhttplogin.send();
}

function todetailPage(item){
    setCookie('shopName',item,1)
    window.location.href='../xiangqing.html'
}


function logout() {
    console.log("logout")
    clearAllCookie();
    window.location.reload()
    // window.location.href = "./login.html";
}

function changeImg(imgFile) {
    const lastName = imgFile.value.split(".")[1]
    if(lastName != 'jpg'){
        imgFile.value = '';
        alert('格式必须是JPG文件');
    }
}