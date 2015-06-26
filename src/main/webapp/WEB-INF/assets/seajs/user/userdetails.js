define(function(require, exports, module) {
	require('../main');
	require('../../public/js/jquery.validate');
	// require('../paging');
	// var pagebar = require('../pagebar');

	$(function() {
		$("#editDetail").bind("click", function(e) {
			$("div[class='field show']").attr("class", "field hidden");
			$("p[class='field hidden']").attr("class", "field show");
		})
		
		$("#cencelEdit").bind("click",function(e){
			$("div[class='field hidden']").attr("class", "field show");
			$("p[class='field show']").attr("class", "field hidden");
		})

		$("#informationSubmitBtn").bind("click", function(e) {
			var flag = true;
			var usernames = $("#usernames").val();
			var mobile = $("#mobile").val();
			var fixPhone = $("#phone").val();
			
			if (usernames == null || usernames == "") {
				$("#usernames_div_error").html("请填写联系人");
			}
			if (isEmpty(mobile)) {
				flag = false;
				$("#mobile_div_error").css("color", "red");
				$("#mobile_div_error").html("请填写手机号码");
				$("#mobile_div_error").removeClass("hide");
			} else {
				if (!check_mobile(mobile)) {
					flag = false;
					$("#mobile_div_error").css("color", "red");
					$("#mobile_div_error").html("手机号码格式不正确");
					$("#mobile_div_error").removeClass("hide");
				}
			}
			if (fixPhone.length < 9) {
				// errorFlag = true;
				// errorMessage = "联系号码格式不正确";
			} else if (fixPhone.length > 8 && fixPhone.length < 14) {
				var regexp = /^([0-9]{3,4})?\-([0-9]{7,8})?$/;
				if (!regexp.test(fixPhone)) {
					flag = false;
					$("#phone_div_error").css("color", "red");
					$("#phone_div_error").removeClass("hide");
					$("#phone_div_error").html("固话格式不正确");
				}
			} else {
				var regexp = /^([0-9]{3,4})?\-([0-9]{7,8})+\-([0-9]{1,4})?$/;
				if (!regexp.test(fixPhone)) {
					flag = false;
					$("#phone_div_error").css("color", "red");
					$("#phone_div_error").removeClass("hide");
					$("#phone_div_error").html("固话格式不正确");
				}
			}
			if (flag) {
				document.getElementById("regForm").submit();
			}
		});

		$("#usernames").blur(function() {
			var usernames = $("#usernames").val();
			if (usernames == null || usernames == "") {
				$("#usernames_div_error").css("color", "red");
				$("#usernames_div_error").removeClass("hide");
				$("#usernames_div_error").html("请填写联系人");
			} else {
				$("#usernames_div_error").html("");
			}
		});
		
		$("#mobile").blur(function() {
			var flag = true;
			var mobile = $("#mobile").val();
			if (isEmpty(mobile)) {
				flag = false;
				$("#mobile_div_error").css("color", "red");
				$("#mobile_div_error").removeClass("hide");
				$("#mobile_div_error").html("请您填写手机号码");
			} else {
				if (!check_mobile(mobile)) {
					flag = false;
					$("#mobile_div_error").css("color", "red");
					$("#mobile_div_error").removeClass("hide");
					$("#mobile_div_error").html("手机号码格式不正确");
				}
			}
			if (flag) {
				$("#mobile_div_error").html("");
			}
		});
		
		$("#phone")
				.blur(
						function() {
							var flag = true;
							var fixphone = $("#phone").val();
							if ("" != fixphone) {
								if (fixphone.length > 8 && fixphone.length < 14) {
									var regexp = /^([0-9]{3,4})?\-([0-9]{7,8})?$/;
									if (!regexp.test(fixphone)) {
										flag = false;
										$("#phone_div_error").css("color",
												"red");
										$("#phone_div_error").removeClass(
												"hide");
										$("#phone_div_error").html("固话格式不正确");
									}
								} else {
									var regexp = /^([0-9]{3,4})?\-([0-9]{7,8})+\-([0-9]{1,4})?$/;
									if (!regexp.test(fixphone)) {
										flag = false;
										$("#phone_div_error").css("color",
												"red");
										$("#phone_div_error").removeClass(
												"hide");
										$("#phone_div_error").html("固话格式不正确");
									}
								}
							}
							if (flag) {
								$("#phone_div_error").html("");
							}
						})
	});
});