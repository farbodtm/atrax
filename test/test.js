var util = require('util');
var atrax = require('../atrax');
var url = 'http://www.usagold.com/mobile/';
var re = /<td><strong>Gold<\/strong><\/td>\s+<td>(\S+)<\/td>\s+<td>(\S+)<\/td>/;
atrax.crawl(url, re, function(result){
  console.log(result[1]);
  console.log(result[2]);
});
atrax.getTitle(url, function(result){
  console.log(result);
});
atrax.getLinks(url, function(result){
  console.log(result);
});
atrax.getDensity(url, 'gold', true, function(result){
  console.log(result);
});