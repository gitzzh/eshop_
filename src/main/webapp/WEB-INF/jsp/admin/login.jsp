<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Insert title here</title>
<jsp:include page="/common/admin-main.jsp" />
<link href="${assets}/css/admin-signin.css" rel="stylesheet">
<script>
	seajs.use("js/admin/login");
</script>
</head>
<body style="background-color: #fff !important;" >
<div class="container">
		<form class="form-signin" id="myForm" onsubmit="return false;">
			<h3 class="form-signin-heading">登录您的账号</h3>
			<label for="account" class="sr-only">Email address</label> <input type="text" name="account" class="form-control" placeholder="登录名" required autofocus>
			<div class="alert alert-danger account-error none"></div>
			<label for="password" class="sr-only">Password</label> <input type="password" name="password" class="form-control" placeholder="密码" required>
			<div class="alert alert-danger password-error none"></div>
			<div class="alert alert-danger form-error none"></div>
			<div class="checkbox">
				<label> <input type="checkbox" value="remember-me">
					记住登录
				</label>
			</div>
			<button class="btn btn-lg btn-primary btn-block" type="submit">立即登录</button>
		</form>
	</div> <!-- /container -->
</body>
</html>