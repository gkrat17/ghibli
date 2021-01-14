const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const listType = urlParams.get('listType')
console.log(listType);

const listData = urlParams.get('listData')
console.log(listData);