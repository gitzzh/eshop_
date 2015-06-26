/**
 * 
 */
define(function(require, exports, module) {

	require('./kkpager.min');

	exports.queryUrl;
	
	exports.handlerArray = [];
	
	exports.appenderSelector;
	
	exports.queryObject = null;

	generate = function(pageNo, totalPage, totalRecords,
			queryFunction) {
		// 生成分页
		// 有些参数是可选的，比如lang，若不传有默认值
		if(totalPage>0){
			$("#kkpager").css("display","")
		}
		kkpager.generPageHtml({
			pno : pageNo,
			// 总页码
			total : totalPage,
			// 总数据条数
			totalRecords : totalRecords,
			mode : 'click',
			getLink : function(n) {
				return "#";
			},
			click : function(n) {
				queryFunction(n, exports.queryObject);
			},
			lang : {
				firstPageText : '首页',
				lastPageText : '尾页',
				prePageText : '上一页',
				nextPageText : '下一页',
				totalPageBeforeText : '共',
				totalPageAfterText : '页',
				totalRecordsAfterText : '条数据',
				gopageBeforeText : '转到',
				gopageButtonOkText : '确定',
				gopageAfterText : '页',
				buttonTipBeforeText : '第',
				buttonTipAfterText : '页'
			}
		}, true);
	};

	exports.initPagebar = function(appenderSelector, queryUrl, handlerArray) {
		exports.queryObject = new Object();
		exports.appenderSelector = appenderSelector;
		exports.queryUrl = queryUrl;
		exports.handlerArray = handlerArray == null ? [] : handlerArray;
	};
	
	
	exports.query = function(pageNO, queryObject) {
		if (queryObject == undefined || queryObject == null) {
			queryObject = new Object();
		}
		queryObject.currentPageNO = pageNO;
		exports.queryObject = queryObject;
		$.ajax({
			type : "post",
			async : false,
			url : exports.queryUrl,
			data : queryObject,
			dataType : "html",
			error : function(request) {

			},
			success : function(data) {
				for (var i = 0; i < exports.handlerArray.length; i++) {
					var handlerObject = exports.handlerArray[i];
					if ($(handlerObject.selector).length > 0) {
						$(handlerObject.selector).unbind(handlerObject.eventName, handlerObject.functionObject);
					}
				}
				$(exports.appenderSelector).html(data);
				var totalPage = parseInt($("#totalPage").val());
				var totalRecords = parseInt($("#totalRecords").val());
				var pageNo = parseInt($("#pageNo").val());
				generate(pageNo, totalPage, totalRecords, exports.query);
				for (var i = 0; i < exports.handlerArray.length; i++) {
					var handlerObject = exports.handlerArray[i];
					if ($(handlerObject.selector).length > 0) {
						$(handlerObject.selector).bind(handlerObject.eventName, handlerObject.functionObject);
					}
				}
			}
		});
	};
});
