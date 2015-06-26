
seajs.config({
	
    alias: {
		 //"jquery": "global/plugins/jquery-1.10.2.js",
		 "jquery":"public/js/jquery-1.11.2.min.js",
		 "jqueryUI":"global/plugins/jquery-ui-1.10.4.js",
		 "kkpager":"global/paging/kkpager.min.js",
		 "paging":"global/paging/paging.js",
		 "validate":"global/scripts/jquery.validate.js",
		 
		 "bootstrap.min": "global/plugins/bootstrap/js/bootstrap.min.js",
		 "bootstrap-hover-dropdown.min": "global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js",
		
		 "bootstrap-datepicker":"global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js",
		 "metronic": "global/scripts/metronic.js",
		 "layout": "admin/layout/scripts/layout.js",
		
		 "components-pickers":"admin/pages/scripts/components-pickers.js",
		 "jquery.validate.min":"global/plugins/jquery-validation/js/jquery.validate.min.js",
		 "login":"admin/pages/scripts/login.js",
		 "jquery.form": "global/scripts/jquery.form.js",
		 //table sort jquery
		 "jquery.slimscroll.min": "global/plugins/jquery-slimscroll/jquery.slimscroll.min.js",
		 "jquery.dataTables": "global/plugins/data-tables/jquery.dataTables.js",
		 "DT_bootstrap": "global/plugins/data-tables/DT_bootstrap.js",
		 "table-managed":"admin/pages/scripts/table-managed.js",
		 "jHtmlArea":"global/scripts/jHtmlArea-0.8.js",
		 "common-js":"front/script/public/common.js"
    },  
    preload: ["jquery"],
    map: [
    	[ /^(.*\.(?:css|js))/i, '$1?v=20150401' ]
    ]
  });
