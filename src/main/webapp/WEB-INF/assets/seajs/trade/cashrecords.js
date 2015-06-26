define(function(require, exports, module) {
	require('../main');
	require('../paging');
	require('../../public/js/jquery.validate');
	var pagebar = require('../pagebar');

	$(function() {
		$('.date-picker').datepicker({
			autoclose : true,
			todayHighlight : true,
			language : 'zh-CN'
		});

		pagebar.initPagebar("#orderwork_list_area", window.localDomain+ "/trade/cashrecordpart?_csrf=" + $("#_csrf").val(), []);

		// 初始查询订单
		pagebar.query(1);
		
		$("#orderworklist_searchBtn").bind("click", function(e) {
			dosearch();
		});
		
		$("#withdrawCashBtn").bind("click",function(e){
			window.location.href=window.localDomain+"/trade/withdrawinput";
		})
	})

	function dosearch() {
		pagebar.queryObject = new Object();
		if ($("#startTime").val() != "") {
			pagebar.queryObject.startTime =$("#startTime").val();
			
		}
		if ($("#endTime").val() != "") {
			pagebar.queryObject.endTime =$("#endTime").val();
			
		}
		
		if ($("#vendorBalanceStatus").val() != "") {
			pagebar.queryObject.vendorBalanceStatus = $("#vendorBalanceStatus").val();
			
		}
		pagebar.query(1, pagebar.queryObject);
	}
});