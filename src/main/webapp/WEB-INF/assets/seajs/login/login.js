define(function(require, exports, module) {
	require('../main');
	require('../../public/js/jquery.validate');
	$(function() {
		$("#username")
				.blur(
						function() {
							var email = $("#username").val();
							var errorFlag = true;
							if (isEmpty(email)) {
								errorMessage = "请输入登陆账号";
								$("#usernameMSG").css("color", "red");
								$("#usernameMSG").html(errorMessage);
								errorFlag = false;
							} else {
								var myReg = /(^\s*)\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\s*$)/;
								if (!myReg.test(email)) {
									errorMessage = "账号邮箱格式错误";
									$("#usernameMSG").css("color", "red");
									$("#usernameMSG").html(errorMessage);
									errorFlag = false;
								}
							}
							if (errorFlag) {
								$("#usernameMSG").html("");
							}
						});
		$("#password1").blur(function() {
			var password = $("#password1").val();
			var errorFlag = true;
			if (isEmpty(password)) {
				errorMessage = "请输入密码";
				$("#checkuser").css("color", "red");
				$("#checkuser").html(errorMessage);
				errorFlag = false;
			}
			if (errorFlag) {
				$("#checkuser").html("");
			}
		});
		$("#submit")
				.click(
						function() {
							var email = $("#username").val();
							var password = $("#password1").val();
							var errorFlag = true;
							if (isEmpty(email)) {
								errorMessage = "请输入登陆账号";
								$("#usernameMSG").css("color", "red");
								$("#usernameMSG").html(errorMessage)
								errorFlag = false;
							} else {
								var myReg = /(^\s*)\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\s*$)/;
								if (!myReg.test(email)) {
									errorMessage = "账号邮箱格式错误";
									$("#usernameMSG").css("color", "red");
									$("#usernameMSG").html(errorMessage)
									errorFlag = false;
								}
							}
							if (isEmpty(password)) {
								errorMessage = "请输入密码";
								$("#checkuser").css("color", "red");
								$("#checkuser").html(errorMessage)
								errorFlag = false;
							}
							if (errorFlag) {
								var datas = $("#myform").serialize();
								$
										.ajax({
											type : "post",
											async: false,
//											url : $("#myform").attr("action"),
//											data : $("#myform").serialize(),
											url: window.localDomain+"/login",
								            data: datas,
											dataType : "json",
											error : function(request) {
											},
											success : function(data) {
												//alert(data.errorCode)
												if (data.errorCode == 1) {
													errorMessage = "账号或密码有误";
													$("#usernameMSG").css(
															"color", "red");
													$("#usernameMSG").html(
															errorMessage)
												} else if (data.errorCode == 2) {
													errorMessage = "该账号不存在";
													$("#usernameMSG").css(
															"color", "red");
													$("#usernameMSG").html(
															errorMessage)
												} else if (data.errorCode == 3) {
													errorMessage = "账号过期";
													$("#usernameMSG").css(
															"color", "red");
													$("#usernameMSG").html(
															errorMessage)
												} else if (data.errorCode == 4) {
													errorMessage = "账户未启用";
													$("#usernameMSG").css(
															"color", "red");
													$("#usernameMSG").html(
															errorMessage)
												} else {
													location.href = window.localDomain+"/orderwork/orderworklist";
												}
											}
										})
							}
						});
	})

})