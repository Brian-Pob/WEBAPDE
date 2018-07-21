const url = require('url')
const adr = 'http://localhost:8080/default.htm?year=2017&month=february'
const q = url.parse(adr, true);

console.log(q.host); //returns the host address, localhost:8080
console.log(q.pathname) //returns the path, default.htm
console.log(q.search) //returns the search term, year=2017&month=february

var qdata = q.query //returns an object with the specified query/ search content, {year:2017, month:'february}
console.log(qdata.month) //returns the value of the specified variable, 'feburuary'