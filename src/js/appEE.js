//#資料
//https://cyfangnotepad.blogspot.com/2013/09/javascripthtml.html
//https://www.codegrepper.com/code-examples/c/javascript+page+is+loaded

//變數
//字典 0 name 1 homepage 2 searchpage(!q會被單字替換) 3 word url (自動生成)
var Dic = [];
Dic[0] = [
  "cambridge",
  "https://dictionary.cambridge.org/",
  "https://dictionary.cambridge.org/us/dictionary/english/!q"
];

Dic[1] = [
  "merriam webster",
  "https://www.merriam-webster.com/",
  "https://www.merriam-webster.com/dictionary/!q"
];

Dic[2] = [
  "dictionary.com",
  "https://www.dictionary.com/",
  "https://www.dictionary.com/browse/!q"
];

Dic[3] = [
  "cambridge 繁中",
  "https://dictionary.cambridge.org/",
  "https://dictionary.cambridge.org/us/dictionary/english-chinese-traditional/!q"
];

//Config 方法 myWord fo(frame open) cdic(custom dic) to mode
var Config = {
  myWord: "" ,
  cdic: "" ,
  fo: "" ,
  to: "" ,
  mode: ""
};
var nowFrameNumber = 0;

//流程
window.onload = (event) => {
  generateLocationQRCODE();
  splitMyUrl();
  checkCookie();

  makeDicLink();
  fillinMyWord();
  addAllatag();
  fillinMyWordUrl();
  myModeIs();

  addAllFrame();
  openAllFrame();
  myModeIs();
}

//function
function splitMyUrl(){//related:addCustomUrl() decodeMyWord()
  //slipturl and make dictionary link, frame
  var temp = location.href.split("#");
  var temp = temp[0].split("?");
  if (temp[1] != "" && temp[1] != undefined){
    var temp = temp[1].split("&");
    for (var i = 0; i < temp.length; i++) {
      var config = temp[i].split("=");
      if (config[1] != "" && config[1] != undefined){
        var value = config[1];
      }else{
        var value = "未設定";
      }
      console.log("[url] "+config[0] +" 值為 "+ value);

      //參數 方法 fo(frame open) cdic(custom dic)
      if (config[0] == "myWord"){
        if (config[1] != "") {
          var myWord = decodeMyWord(config[1]);
          console.log("解碼myword："+myWord);
          Config.myWord = myWord;
        }
      }else if (config[0] == "cdic"){
        setCookie("cdic", config[1], 30);
      }else if (config[0] == "fo"){
        setCookie("fo", config[1], 30);
      }else if (config[0] == "to"){//addtobtn() gotoconfigto()
        setCookie("to", config[1], 30);
      }else if (config[0] == "mode"){
        setCookie("mode", config[1], 30);
      }
    }
  }
}

function addtobtn(){
  var x = document.getElementById("addtobtn");
  x.innerHTML = '<a href="javascript:;" onclick="gotoconfigto()" class="nav-link">TO '+Config.to+'</a>';
}

function gotoconfigto(){
  if (Config.myWord != "") {
    $('html, body').animate({scrollTop: Config.to}, 100);
  }
}

function makeDicLink(){
  if (Config.myWord != ""){
    var word = Config.myWord;
    for (var i = 0; i < Dic.length; i++){
      var dicUrlSplit = Dic[i][2].split("!q");
      var dicUrl = dicUrlSplit[0]+word+dicUrlSplit[1];
      Dic[i].push(dicUrl);
    }
  }
}

function fillinMyWord(){
  if (Config.myWord != ""){
    document.title=Config.myWord + " | alsonow";
    $(".fillinMyWord").html(Config.myWord);//class fillinMyWord
  }
}

function addAllatag(){
  if (Config.myWord != ""){
    var DicLink = document.getElementById("myDicLink");
    var mymodal = document.getElementById("DicLink");

    DicLink.innerHTML += '<hr><p class="text-align-center">在這裡開啟</p><hr>';
    DicLink.innerHTML += '<ul class="nav nav-tabs" id="framenavtabs"></ul>';
    var nav = document.getElementById("framenavtabs");
    for (var i = 0; i < Dic.length; i++) {
      var dicname = Dic[i][0];
      nav.innerHTML += '<li class="nav-item"><a class="nav-link" id="engine-a-frame-'+i+'" rel="nofollow" href="" target="Diciframe">'+dicname+'</a></li>';
      //DicLink.innerHTML += '<a id="engine-a-frame-'+i+'" href="" target="Diciframe" rel="nofollow" class="DicLink">'+dicname+'</a><br>';
    }
    DicLink.innerHTML += '<iframe src="" id="Diciframe" name="Diciframe" width="100%" height="550px"></iframe>';

    DicLink.innerHTML += '<hr class=""><p class="text-align-center">連結</p><hr class="">';
    DicLink.innerHTML += '<button type="button" onclick="openAllTab()" class="btn btn-primary">彈出所有視窗</button> ';
    DicLink.innerHTML += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#DicLink-modal" id="">字典連結</button>';

    for (var i = 0; i < Dic.length; i++) {
      var dicname = Dic[i][0];
      mymodal.innerHTML += '<a id="engine-a-'+i+'" href="" target="_blank" rel="nofollow" class="DicLink">'+dicname+'</a><hr>';
    }
  }
}

function fillinMyWordUrl(){
  var DicLink = document.getElementById("myDicLink");
  if (Config.myWord != ""){
    for (var i = 0; i < Dic.length; i++) {
      var nowDic = "engine-a-"+i;
      var nowaFrame = "engine-a-frame-"+i;
      var nowDicUrl = Dic[i][3];
      document.getElementById(nowDic).href = nowDicUrl;
      document.getElementById(nowaFrame).href = nowDicUrl;
    }
  }
}

function addAllFrame(){
  if (Config.fo == "y" && Config.myWord != ""){
    var DicFrame = document.getElementById("myDicFrame");
    DicFrame.innerHTML = '<hr><p class="text-align-center">內嵌視窗</p><hr>';
    for (var i = 0; i < Dic.length; i++) {
      var nowFrame = "iframe-"+i;
      DicFrame.innerHTML += '<iframe src="" title="" id="'+nowFrame+'" name="'+nowFrame+'" class="Diciframe" width="100%" height="550px"></iframe><br>';
    }
  }
}

function openAllFrame(){
  if (Config.fo == "y" && Config.myWord != ""){
    var DicFrame = document.getElementById("myDicFrame");
    for (var i = 0; i < Dic.length; i++) {
      var nowFrame = "iframe-"+i;
      var nowDicUrl = Dic[i][3];
      document.getElementById(nowFrame).src = nowDicUrl;
      document.getElementById(nowFrame).title = Dic[i][0];
    };
    //$('html, body').animate({scrollTop: 1095}, 1000);
  }
}

function openAllTab(){
  if (Dic.length > 5) {
    let response = confirm("確定要彈出所有視窗？\nAre You Sure?");
    if (response == true) {
      for (var i = 0; i < Dic.length; i++) {
        window.open(Dic[i][3]);
      }
    } else {
      $.notify("已取消 Cancled");
    }
  }else{
    for (var i = 0; i < Dic.length; i++) {
      window.open(Dic[i][3]);
    }
  }
}

// function reloadAllFrame(){
//     for (var i = 0; i < Dic.length; i++){
//         var nowFrame = "iframe-"+i
//         document.frames(nowFrame).location.reload()
//     }
// }

function scrolltotop(){
  $('html, body').animate({scrollTop: 0}, 100);
}

function addCustomUrl(url) {
  var dec = decodeURIComponent(url);
  Dic.unshift([]);
  console.log("---解碼："+dec);
  Dic[0].unshift(dec);
  Dic[0].unshift("https://alsonow.neocities.org/");
  Dic[0].unshift("custom");
  var cdic = document.getElementById("cdic");
  if (cdic.value != ""){
    cdic.value += "!s";
  }
  cdic.value += dec;
  return dec;
}

function decodeMyWord(url){
  var dec = decodeURIComponent(url);
  var temp = dec.split("+");
  var myWord = temp.join(" ");
  return myWord;
}

function listAllDic(){
  var x = "共有"+Dic.length+"個字典：<br>";
  for (var i = 0; i < Dic.length; i++) {
    var x = x+"<hr>";
    var x = x+"<a target='_blank' href='"+Dic[i][1]+"'>"+Dic[i][0]+"</a><br>";
  }
  document.getElementById("listAllDicFillin").innerHTML = "<div>"+x+"</div>";
}

function generateLocationQRCODE(){//related myLocationis()
  var mylocation = myLocationis();
  console.log("本頁網址："+mylocation);
  document.getElementById("locationQRCODElink").href = mylocation;
  $('#locationQRCODE').qrcode({
    width: 120,
    height: 120,
    text: mylocation
  })
}

function myLocationis(){
  return location.href;
}

function myModeIs(){
  if (Config.mode == "anki"){
    ankimode();
  }else if (Config.mode == "webExtension") {
    webExtensionmode();
  }
}

function ankimode(){

}

function webExtensionmode(){

}
