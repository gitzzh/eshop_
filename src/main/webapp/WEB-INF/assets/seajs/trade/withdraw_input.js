define(function(require, exports, module) {
	require('../main');
	require('../../public/js/jquery.validate');
	$(function() {
		var now = new Date();
		if (now.getDay() != 1) {
			// 不是周一
			$("#submit_but,[name='amount']").attr({
				disabled : "disabled"
			});
		}
		$("[name='amount']").blur(function(e) {
			var $target = $(e.target);
			var pid = $target.parent().attr("id");
			checkInput(pid)
		});

		$("#submit_but").click(function() {
			var array = [ 'amount_div' ];
			for (var i = 0; i < array.length; i++) {
				array[i] = checkInput(array[i]);
			}
			if (!arrayIndexOf(array, false)) {
				formSubitss();
			}
		});
	});
	
	function formSubitss() {
		$.ajax({
			type : "get",
			url : "../trade/withdrawSave",
			data : {
				amount : $("[name='amount']").val()
			},
			dataType : "json",
			success : function(data) {
				if (data.tag > 0) {
					location.href = "../trade/cashrecord";
				} else {
					alert("申请失败！");
				}
			}
		});
	}

	function checkInput(divId) {
		var $div = $("#" + divId);
		var $div_error = $("#" + divId + "_error");
		var errorFlag = false;
		var errorMessage = null;
		if (divId == "amount_div") {
			var amount = $("[name='amount']").val();
			if (isEmpty(amount)) {
				errorFlag = true;
				errorMessage = "不能为空！";
			} else if (!isNumber(amount)) {
				errorFlag = true;
				errorMessage = "请输入数字！";
			} else {
				amount = parseInt(amount);
				if (amount <= 0) {
					errorFlag = true;
					errorMessage = "必须大于零！";
				} else {
					var maxAmount = parseFloat($("#_balance").html()) || 0;
					if (amount > maxAmount) {
						errorFlag = true;
						errorMessage = "不能超过可提现金额" + maxAmount + "元！";
					}
				}
			}
		}
		if (errorFlag) {
			$div_error.html(errorMessage);
			$div_error.removeClass("hide");
			$div.addClass("message");
			return false;
		} else {
			$div.removeClass("message");
			$div_error.addClass("hide");
			$div_error.html("");
		}
		return true;
	}
});