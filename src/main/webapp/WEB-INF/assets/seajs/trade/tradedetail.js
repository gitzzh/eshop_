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

		pagebar.initPagebar("#orderwork_list_area", window.localDomain+ "/vendorbalance/balancepart?_csrf=" + $("#_csrf").val(), []);

		// 初始查询订单
		pagebar.query(1);
		
		$("#orderworklist_searchBtn").bind("click", function(e) {
			dosearch();
		});
	})

	function dosearch() {
		pagebar.queryObject = new Object();
		var val=0;
		if ($("#startTime").val() != "") {
			pagebar.queryObject.startTime = $("#startTime").val();
			val=1;
		}
		if ($("#endTime").val() != "") {
			pagebar.queryObject.endTime = $("#endTime").val();
			val=1;
		}
		if ($("#orderWorkStatus").val() != "") {
			pagebar.queryObject.orderWorkStatus = $("#orderWorkStatus").val();
			val=1;
		}
		if ($("#vendorBalanceNO").val() != "") {
			pagebar.queryObject.vendorBalanceNO = $("#vendorBalanceNO").val();
			val=1;
		}
		if ($("#remark").val() != "") {
			pagebar.queryObject.remark = $("#remark").val();
			val=1;
		}
		if ($("#beginmoney").val() != "") {
			pagebar.queryObject.beginmoney = $("#beginmoney").val().trim();
			val=1;
		}
		if ($("#endmoney").val() != "") {
			pagebar.queryObject.endmoney = $("#endmoney").val().trim();
			val=1;
		}
		if(val==1){
		$("#exportExcel").css("display","inline");
		}
		pagebar.query(1, pagebar.queryObject);
	}
});