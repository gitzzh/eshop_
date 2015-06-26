
seajs.config({
	
    alias: {
		 "jquery":"public/js/jquery-1.11.2.min.js",
		 "bootstrap.min":"public/js/bootstrap.min.js",
		 "bootstrap-datepicker.min":"public/js/bootstrap-datepicker.min.js",
		 "bootstrap-datepicker.zh-CN":"public/js/bootstrap-datepicker.zh-CN.js",
		 "ace.min":"public/js/ace.min.js",
		 "ace-elements.min":"public/js/ace-elements.min.js"
    },  
    preload: ["jquery"],
    map: [
    	[ /^(.*\.(?:css|js))/i, '$1?v=20150401' ]
    ]
  });
