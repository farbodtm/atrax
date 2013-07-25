/* 
 * Atrax.js - version 0.1.0
 *
 * Modules 
 */
var http = require('http')
  , events = require('events')
  , util = require('util')
  , urlLib = require('url')
  ;

/*
 * Inherit from EventEmitter
 */
function EventClass(){
	events.EventEmitter.call(this);
}
util.inherits(EventClass, events.EventEmitter);
var atrax = new EventClass();

/*
 *	atrax option object
 */
atrax.options = {

};

atrax.crawl = function(url, re, callback) {
	if (typeof url === 'object') {
		url = urlLib.format(url);
	} else {
		if (!/((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url)){
			console.error('\033[34m atrax \033[0m - URL is not valid');
			return false;
		}		
	}
	http.get(url, function(res){
		var html = '';
		res.setEncoding('utf8');
		res.on('data', function(data){
			html += data;
		});
		res.on('end', function(){
			callback(re.exec(html));
		});
	});
};

module.exports = atrax;