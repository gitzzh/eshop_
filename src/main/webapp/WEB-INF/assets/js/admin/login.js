define(function(require, exports, module) {
	$(function(){
		$("#myForm [type=submit]").click(function(){
			signIn($("#myForm").serialize() , function(item,status){
				if(status == 1){
					location.href = "../admin/home";
				}else if(status == -1){
					$(".form-error").html("用户不存在！");
					$(".form-error").removeClass("none");
				}else if(status == -2){
					$(".form-error").html("密码错误！");
					$(".form-error").removeClass("none");
				}
			});
		});
	});
	
	function signIn(formData,callback){
		$.ajax({
			url : "../admin/signin",
			type : "post",
			data : formData,
			error : function() {
				callback({},0);
			},
			success : function(data) {
				callback({},data.status);
			}
		});
	}
})