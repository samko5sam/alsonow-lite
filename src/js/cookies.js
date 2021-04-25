// https://www.w3schools.com/js/js_cookies.asp

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=path/ ;SameSite=Lax";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var cdic = getCookie("cdic");
  var fo = getCookie("fo");
  var to = getCookie("to");
  var mode = getCookie("mode");
  console.log("---cookies---");

  if (cdic != "" && cdic != null){
    console.log("[cookie] cdic: "+cdic);
    if (cdic != ""){
      document.getElementById("cdic").value = "";
      var x = cdic;
      var x = decodeURIComponent(x);
      var x = x.split("!s");
      for (var f = 0; f < x.length; f++){
        var url = addCustomUrl(x[f]);
        Config.cdic = url;
      }
    }
  }

  if (fo != "" && fo != null){
    console.log("[cookie] fo: "+fo);
    if (fo == "y"){
      Config.fo = "y";
      document.getElementById("fo-1").checked = "true";
    }else{
      document.getElementById("fo-2").checked = "true";
    }
  }

  if (to != "" && to != null){
    console.log("[cookie] to: "+to);
    Config.to = to ;
    document.getElementById("to").value = Config.to ;
    gotoconfigto();
    addtobtn();
  }

  if (mode != "" && mode != null){
    console.log("[cookie] mode: "+mode);
    if (mode == "anki"){
      Config.mode = "anki";
    }else if (mode == "webExtension"){
      Config.mode = "webExtension";
    }
    document.getElementById("mode").value = Config.mode ;
  }
}

// if (cdic != "" && cdic != null) {
//     setCookie("cdic", cdic, 30);
// }
