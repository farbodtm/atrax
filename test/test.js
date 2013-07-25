var util = require('util');
var atrax = require('../atrax');
var re = /<td><strong>Gold<\/strong><\/td>\s+<td>(\S+)<\/td>\s+<td>(\S+)<\/td>/;
atrax.crawl('http://www.usagold.com/mobile/',re,function(result){
    console.log(result[1]);
	console.log(result[2]);
});