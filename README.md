# atrax.js

> Simple crawling module for node.js


## API

###atrax.crawl(url, [re], callback)

Crawls a url, calls the callback with the result, if a regular expression is given it will execute it on the result and then calls the callback.


**Parameters:**
 - url : String
 - re : Regular Expression (optional)
   Regular expression to be execute on the result
 - callback : function

**Example:**
```javascript
var url = 'http://www.usagold.com/mobile/';
var re = /<td><strong>Gold<\/strong><\/td>\s+<td>(\S+)<\/td>\s+<td>(\S+)<\/td>/;
atrax.crawl(url, re, function(result){
  console.log(result[1]);
  console.log(result[2]);
});
````

###atrax.getLinks(url, callback)

Crawls a url and gets all the links that are in that page and then calls the callback with the array of links.


**Parameters:**
 - url : String
 - callback : function

**Example:**
```javascript
var url = 'http://www.usagold.com/mobile/';
atrax.getLinks(url, function(result){
  console.log(result);
});
````

###atrax.getTitle(url, callback)

Crawls a url and gets the title of the crawled page.


**Parameters:**
 - url : String
 - callback : function

**Example:**
```javascript
var url = 'http://www.usagold.com/mobile/';
atrax.getTitle(url, function(result){
  console.log(result);
});
````

###atrax.getDensity(url, input, caseSensitivity, callback)

Crawls a url and calculates the given word frequency in the webpage and then calls the callback with the result.


**Parameters:**
 - url : String
 - input: String
 - caseSensitivity: Boolean
 - callback : Function

**Example:**
```javascript
var url = 'http://www.usagold.com/mobile/';
atrax.getDensity(url, 'gold', true, function(result){
  console.log(result);
});
````


Licence
==========
MIT
