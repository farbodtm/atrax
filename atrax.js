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
/*
 *	atrax util function - error
 */  
atrax.error = function(msg) {
  console.error('\033[31m atrax \033[0m - ' + msg);
}

/*
 * atrax's main function - crawling an url and apply the provided regular expression on it and call the provided callback
 *
 * @param url (string)
 * @param re (object - regular expression) (optional)
 * @param callback (function)
 *  
 */

atrax.crawl = function() {
  var args = arguments;
  var url = args[0];
  // url argument would accept both url object and url string
  if (typeof url === 'object') {
    url = urlLib.format(url);
  } else if (typeof url === 'string') {
    if (!/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url)){
      atrax.error('URL is not valid');
      return false;
    }
  } else {
    atrax.error('need an URL');
    return false;
  }

  console.error('\033[34m atrax \033[0m - crawling ' + url);

  http.get(url, function(res){
    var html = '';
    res.setEncoding('utf8');
    res.on('data', function(data){
      html += data;
    });
    res.on('end', function(){
      if (args.length == 2) {
        var callback = args[1];
        callback(html);
      }
      if (args.length == 3) {
        var callback = args[2];
        callback(args[1].exec(html));
      }
      
    });
  });
};
/*
 * crawl an url and get its links
 *
 * @param url (string)
 * @param callback (function)
 *  
 */
atrax.getLinks = function(url, callback) {
  var re = /<a href="(\S+)">(.*)<\/a>/gm;
  atrax.crawl(url, function(result) {
    var obj = {};
    var i = 0;
    for (var i = 1; match = re.exec(result); i++) {
      obj['link' + i] = {
        title: match[2],
        link: match[1]
      };
    }
    callback(obj);
  });
}

/*
 * crawl an url and get its title
 *
 * @param url (string)
 * @param callback (function)
 *  
 */

atrax.getTitle = function(url, callback) {
  var re = /<title>(.*)<\/title>/
  atrax.crawl(url, re, function(result) {
    callback(result[1]);
  });
}

/*
 * get the denstiy of a word in webpage
 *
 * @param url (string)
 * @param callback (function)
 *  
 */
atrax.getDensity = function(url, input, caseSensitivity, callback) {
  atrax.crawl(url, function(result) { 
    var n = 0;
    var i = 0;
    var cont = true;
    if (caseSensitivity) result = result.toLowerCase();
    while (cont){
      n++;
      i = result.indexOf(input, i) + 1;
      if (i == -1 || i == 0) cont = false;
    }
    callback(n);
  });

}
module.exports = atrax;
