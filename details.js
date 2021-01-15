const urlParams = new URLSearchParams(window.location.search)
const listData  = urlParams.get('listType')
const id        = urlParams.get('id')
console.log(listData, id)