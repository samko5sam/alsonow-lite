document.addEventListener('DOMContentLoaded', ()=> {
  checkTheme()
});

let translator = new Translator;

translator.load();

let themes = ['light','dark']

function checkTheme(){
  console.log('[now]check theme')
  if (myLocalStorage('mytheme','status','') === 'notset') {
    console.log('theme not set')
    myLocalStorage('mytheme','set','light')
    changeTheme(myLocalStorage('mytheme','get','').value)
    return
  } else {
    console.log(`${myLocalStorage('mytheme','get').keyname} is '${myLocalStorage('mytheme','get').value}'`)
    changeTheme(myLocalStorage('mytheme','get','').value)
  }
}
function changeTheme(themename){
  document.querySelector('#data-body').className = `${themename}-mode`
}
function toggleTheme(){
  let nowtheme = myLocalStorage('mytheme','get','').value
  let index = themes.indexOf(nowtheme) + 1
  if (index < themes.length) {
    changeTheme(themes[index])
    myLocalStorage('mytheme','set',themes[index])
  } else {
    changeTheme(themes[0])
    myLocalStorage('mytheme','set',themes[0])
  }
}
function myLocalStorage(key,action,valuetostore){ // this function can take a full control of localstorage
  if (key === undefined) return
  value = localStorage.getItem(key)
  switch (action) {
    case 'get':
      return {keyname:key,value:localStorage.getItem(key)}
    case 'set':
      localStorage.setItem(key,valuetostore)
      break
    case 'status':
      if (value === null) {
        return 'notset';
      } else {
        return 'setted';
      }
    case 'delete':
      localStorage.removeItem(key)
      break
    default:
      break
  }
}