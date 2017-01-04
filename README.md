# zollty-util.js

A small JavaScript utility library for NodeJS and the browser.

## Usage

### getBaseURL

get the root path of the current page (like 'http://localhost:8080/xxx/' or 'file:///D:/'):

	  // ......
	  var baseURL = zt.getBaseURL();


[See Examples](https://zollty-org.github.io/zollty-util.js/examples/zt-getBaseURL-test.html)

### getUrlParam

get the value of the given url param, e.g.:

	  // ......
	  var sidValue = zt.getUrlParam("sid");


[See Examples](https://zollty-org.github.io/zollty-util.js/examples/zt-getUrlParam-test.html?sid=000000001)

### ajaxGetText

get the text content:

	  // ......
	  var text = zt.ajaxGetText(url);


[See Examples](https://zollty-org.github.io/zollty-util.js/examples/zt-ajaxGetText-test.html)


### ajaxRequest

send ajax request:

	  // ......
	  var text = zt.ajaxRequest(url, method, completeCallback);



### getContextPath

get the root path of the current page:

	  // ......
	  var text = zt.getContextPath(1);



### $(selector).ztCheckboxValue

jquery extent, get checkbox value as a string use special character to split:

	  // ......
	  var text = $(selector).ztCheckboxValue(split);



### $(selector).ztCheckboxAll

jquery extent, get checkbox value, if all checkbox are checked return "ALL":

	  // ......
	  var text = $(selector).ztCheckboxAll(total);



### $.ztLoadScript

jquery extent, lazy load scripts in array order:

	  // ......
	  $.ztLoadScript(new Array("/zoa/js/demo-ue.js"));



##	Download

* [zollty-util.js](https://raw.github.com/zollty-org/zollty-util.js/master/dist/latest/zollty-util.min.js) 


## Change-log


## License

Released under the MIT Licenses.

============
