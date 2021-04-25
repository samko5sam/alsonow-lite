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