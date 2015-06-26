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

		pagebar.initPagebar("#orderwork_list_area", window.localDomain
				+ "/orderwork/orderworklist_part?_csrf=" + $("#_csrf").val(), [
				{
					selector : ".startPrint",
					eventName : "click",
					functionObject : startPrint
				}, {
					selector : ".editDeliveryClass",
					eventName : "click",
					functionObject : showEditDelivery
				}, {
					selector : ".refuseOrderClass",
					eventName : "click",
					functionObject : refuseOrderWork
				} ]);

		// 初始查询订单
		pagebar.query(1);
		//查询条件
		$("#orderworklist_searchBtn").bind("click", function(e) {
			dosearch();
		});

		// 初始化印刷产品
		$("#rootProductId").bind("change", function(e) {
			var groupId = $(this).val();
			initProductList(groupId);
		});

		$("select[name='orderWorkStatus']").bind("change",
				function(e) {dosearch();});
		
		
		$("#sure").bind("click", deliveryOrderWork);

		$("#kuaidicompany").bind("change", function(e) {
			changeShippingWay($(this).val());
		});

		// 导出Excel
		/*$("#exportDataFileButtonItem").click(
				function(e) {

					$("#regForm").attr(
							"action",
							window.localDomain
									+ "/orderwork/exportVendorOrderWork");

					$("#regForm").submit();
					$("#regForm").attr("action",
							"../orderwork/orderWorkList_part");
				});*/
	})

	function initProductList(groupId) {
		$("#productType").empty();
		var coptions = $("#storedProductSelect > option");
		var i = 0;
		var cindex = 0;
		for (var i = 0; i < coptions.length; i++) {
			var coption = $(coptions[i]);
			coption.prop("selected", false);
			if (coption.attr("group-id") == groupId) {
				$("#productType").append(coption.clone(true));
			}
		}
	}
	
	function dosearch() {
		pagebar.queryObject = new Object();
		var val = 0;
		if ($("#startTime").val() != "") {
			pagebar.queryObject.startTime = $("#startTime").val();
			val = 1;
		}
		if ($("#endTime").val() != "") {
			pagebar.queryObject.endTime = $("#endTime").val();
			val = 1;
		}
		if ($("#productType").val() != "") {
			pagebar.queryObject.productType = $("#productType").val();
			val = 1;
		}
		if ($("#orderWorkStatus").val() != "") {
			pagebar.queryObject.orderWorkStatus = $("#orderWorkStatus").val();
			val = 1;
		}
		if ($("#orderWorkNO").val() != "") {
			pagebar.queryObject.orderWorkNO = $("#orderWorkNO").val();
			val = 1;
		}
		
		if ($("#fileName").val() != "") {
			pagebar.queryObject.fileName = $("#fileName").val();
			val = 1;
		}
		
		if (!!$("#platformUser").val()) {
			pagebar.queryObject.platformUser = $("#platformUser").val();
			val = 1;
		}

		if (val == 1) {
			//$("#exportExcel").css("display", "inline");
		}
		pagebar.query(1, pagebar.queryObject);

	}
	/**
	 * 开始生产
	 */
	function startPrint(e) {
		var orderWorkId = $(this).attr("data-id");
		if (confirm("是否确认接单并生产？")) {
			$.ajax({
				type : "post",
				url : window.localDomain + "/orderwork/startprint?_csrf="
						+ $("#_csrf").val(),
				data : {
					orderWorkId : orderWorkId
				},
				dataType : "json",
				success : function(data) {
					if (data.flag == 1) {
						var currentPageNO = parseInt($("#pageNo").val());
						pagebar.query(currentPageNO, pagebar.queryObject);
						alert("您已经成功接单并生产。");
					}

				}
			});
		}
	}

	

	function changeShippingWay(selectValue) {
		$("#driverNameError").html("");
		$("#phoneError").html("");
		$("#yundanNumError").html("");
		$("#shippingFeeError").html("");
		$("#logisticscompanyError").html("");
		$(".custom-error").addClass("hide");
		var sendType = selectValue == "其他" ? "2" : (selectValue == "自有车队" ? "3"
				: "1");
		$("#shippingInfoHid").val(sendType);
		if (sendType == "1") {// 快递公司
			$("#shippingInfoHid").val("1");
			$(".chedui,.otherWay").hide();
			$(".kdandwl,.kuaidicompany").show();
			$("#companyTypeTd").html("选择快递公司");
		} else if (sendType == "2") {// 物流公司
			$("#shippingInfoHid").val("2");
			$(".kdandwl,.chedui,.kuaidicompany").hide();
			$(".otherWay").show();
		} else if (sendType == "3") {// 内部车队
			$("#shippingInfoHid").val("3");
			$(".kdandwl,.otherWay").hide();
			$(".chedui").show();
		}
	}
	
	/**
	 * 发货
	 */
	function deliveryOrderWork() {
		var flag = true;
		var sendType = $("#shippingInfoHid").val();
		if (sendType == '3') {
			var driverName = $("#driverName").val();
			var phone = $("#phone").val();
			if (driverName == null || driverName == "") {
				$("#driverNameError").css("color", "red");
				$("#driverNameError").html("司机姓名不能为空");
				$("#driverNameError").removeClass("hide");
				flag = false;
			} else {
				$("#driverNameError").addClass("hide");
				$("#driverNameError").html("");
			}
			if (isEmpty(phone)) {
				$("#phoneError").css("color", "red");
				$("#phoneError").html("请您填写手机号码");
				$("#phoneError").removeClass("hide");
				flag = false;
			} else {
				if (!check_mobile(phone)) {
					$("#phoneError").css("color", "red");
					$("#phoneError").html("手机号码格式不正确");
					$("#phoneError").removeClass("hide");
					flag = false;
				} else {
					$("#phoneError").addClass("hide");
					$("#phoneError").html("");
				}
			}
		}
		if (sendType == '1') {
			var yundanNum = $("#yundanNum").val();
			if (isEmpty(yundanNum)) {
				$("#yundanNumError").css("color", "red");
				$("#yundanNumError").html("运单号不能为空");
				$("#yundanNumError").removeClass("hide");
				flag = false;
			} else {
				$("#yundanNumError").addClass("hide");
				$("#yundanNumError").html("");
			}
		}
		if (sendType == '1' || sendType == '2') {
			var shippingFee = $("#shipping_fee_item").val();
			if (isEmpty(shippingFee)) {
				$("#shippingFeeError").css("color", "red");
				$("#shippingFeeError").html("运费不能为空");
				$("#shippingFeeError").removeClass("hide");
				flag = false;
			} else {
				if (!isNaN(shippingFee)) {
					if (isNonnegativeFloat(shippingFee)) {
						$("#shippingFeeError").css("color", "red");
						$("#shippingFeeError").html("运费不能为负数");
						$("#shippingFeeError").removeClass("hide");
						flag = false;
					} else {
						$("#shippingFeeError").addClass("hide");
						$("#shippingFeeError").html("");
					}
				} else {
					$("#shippingFeeError").css("color", "red");
					$("#shippingFeeError").html("运费必须为数值类型");
					$("#shippingFeeError").removeClass("hide");
					flag = false;
				}

			}
		}

		if (flag) {
			$("#kuaidicompanyItem").val($("#kuaidicompany").val());
			$.ajax({
				type : "post",
				url : window.localDomain
						+ "/orderwork/deliveryorderwork?_csrf="
						+ $("#_csrf").val(),
				data : $("#endProduceForm").serialize(),
				dataType : "json",
				async : false,
				error : function(request) {
				},
				success : function(data) {
					if (data.flag == "1") {
						pagebar.query(parseInt($("#pageNo").val()),
								pagebar.queryObject);
					} else {
						alert("货物已寄出无法修改发货")
					}
					$("#editShipping").modal("hide");
					$("#endProduceForm")[0].reset();
				}
			});
		}
	}

	

	function exportDataFile() {
		if ($("#keyWordType").val() == 2) {
			$("#email").attr("name", "trueName");
		}
		$("#regForm").attr(
				"action",
				window.localDomain
						+ "/shoporderwork/exportOrderWorkByCondion.htm");
		$("#regForm").submit();
		$("#email").attr("name", "email");
	}
	/**
	 * 显示发货信息
	 */
	function showEditDelivery(e) {
		$("#orderWorkNOTd").html($(this).attr("data-No"));
		$("#orderWorkIdHidden").val($(this).attr("data-id"));
		$("#kuaidicompany").prop("disabled", false);
		$("#editShippingTitle").html($(this).attr("data-target"));
		var orderWorkId = $(this).attr("data-id");
		$
				.ajax({
					type : "post",
					url : window.localDomain + "/orderwork/showdeliveryinfo",
					dataType : "json",
					async : false,
					data : {
						_csrf : $("#_csrf").val(),
						orderWorkId : orderWorkId
					},
					success : function(data) {
						var carrierList = data.carrierList;
						var shippingType = data.orderWork.shippingType;
						var defaultExpress = data.vendor.defaultExpress;
						var defaultLogistics = data.vendor.defaultLogistics;
						var orderWorkDefaultShipping = data.vendor.defaultExpress;
						var orderWorkDefaultShippingDesc = data.orderWork.shippingDesc;
						$("#orderWorkNOTd").html(data.orderWork.orderWorkNO);
						$("#shippingInfoHid").val(data.shippingInfo);
						$("#kuaidisetDefault").prop("checked", false);
						$("#kuaidicompany").empty();
						var express = (orderWorkDefaultShipping == null
								|| orderWorkDefaultShipping == "" || orderWorkDefaultShipping == "默认快递") ? ((orderWorkDefaultShippingDesc == null || orderWorkDefaultShippingDesc == "") ? ((defaultExpress == null || defaultExpress == "") ? ""
								: defaultExpress)
								: orderWorkDefaultShippingDesc)
								: orderWorkDefaultShipping;
						if (carrierList != null) {
							for (var i = 0; i < carrierList.length; i++) {
								var carrier = carrierList[i];
								var text = "<option value=\""
										+ carrier.companyName + "\">"
										+ carrier.companyName + "</option>";
								$("#kuaidicompany").append(text);
							}
						}
						$("#kuaidicompany").append(
								"<option value=\"其他\">其他</option>");
						$("#kuaidicompany").append(
								"<option value=\"自有车队\">自有车队</option>");
						var soList = $("#kuaidicompany > option");
						for (var i = 0; i < soList.length; i++) {
							var option = soList[i];
							if (data.shippingInfo == "1") {
								if ($(option).val() == express) {
									$(option).prop("selected", true);
									$("#kuaidisetDefault")
											.prop("checked", true);
								} else {
									$(option).prop("selected", false);
								}
							} else if (data.shippingInfo == "2") {
								if ($(option).val() == "其他") {
									$(option).prop("selected", true);
									if (defaultExpress == "其他") {
										$("#kuaidisetDefault").prop("checked",
												true);
									}
								} else {
									$(option).prop("selected", false);
								}
							} else {
								if ($(option).val() == "自有车队") {
									$(option).prop("selected", true);
									if (defaultExpress == "自有车队") {
										$("#kuaidisetDefault").prop("checked",
												true);
									}
								} else {
									$(option).prop("selected", false);
								}
							}
						}
						if (shippingType == 0) {
							if ($(this).attr("caneditdelivery") == "false") {
								$("#kuaidicompany").prop("disabled", true);
							}
						}
						if (data.shippingInfo == "1") {
							$(".otherWay,.chedui").hide();
							$(".kdandwl").show();
							$("#yundanNum").val(data.orderWork.deliveryNO);

						} else if (data.shippingInfo == "2") {// 物流公司
							$(".kdandwl,.chedui,.kuaidicompany").hide();
							$(".otherWay").show();
							$("#yundanNum").val(data.orderWork.deliveryNO);
							$("#shippingDescItem").val(
									data.orderWork.shippingDesc);
							var result = true;
						} else if (data.shippingInfo == "3") {// 内部车队
							$(".otherWay,.kdandwl").hide();
							$(".chedui").show();
							$("#driverName").val(data.driverName);
							$("#phone").val(data.phone);
						}
						$("#shipping_fee_item").val(data.orderWork.purchasePostFee);
						$("#editShipping").modal("show");
					}
				});
	}
	$("#cancel_order_button_item").bind("click", cancelOrder);
	// 拒单
	function refuseOrderWork(e) {
		$("#order_cancel").modal("show");
		$("#refuseOrderWorkNOItem").html($(this).attr("data-no"));
		$("#cancel_order_work_id_item").val($(this).attr("data-id"));
		if (!$("#cancel_order_button_item").hasClass("blue")) {
			$("#cancel_order_button_item").addClass("blue");
		}
		$("#cancel_order_button_item").css("display", "");
		$("#cancel_order_button_display_item").css("display", "none");
		$("#cancelOrderDescitem").val("");
	}

	function cancelOrder(e) {
		$("#cancel_order_button_item").removeClass("blue");
		$("#cancel_order_button_item").css("display", "none");
		$("#cancel_order_button_display_item").css("display", "");
		$.ajax({
			type : "post",
			url : window.localDomain + "/orderwork/refuseorder",
			data : $("#cancel_order_form").serialize(),
			dataType : "json",
			error : function(request) {

			},
			success : function(data) {
				if (data.flag == "1") {
					$("#order_cancel").modal("hide");
					var currentPageNO = parseInt($("#pageNo").val());
					pagebar.query(currentPageNO, pagebar.queryObject);
				} else {
					alert("拒单订单失败。");
				}

			}
		});
	}
});