$(function() {	
	$('#login-password').focus(function() {
		$('.login-owl').addClass('password');
	}).blur(function() {
		$('.login-owl').removeClass('password');
	});
	$('#register-password').focus(function() {
		$('.register-owl').addClass('password');
	}).blur(function() {
		$('.register-owl').removeClass('password');
	});
	$('#register-repassword').focus(function() {
		$('.register-owl').addClass('password');
	}).blur(function() {
		$('.register-owl').removeClass('password');
	});
	/*$('#forget-password').focus(function() {
		$('.forget-owl').addClass('password');
	}).blur(function() {
		$('.forget-owl').removeClass('password');
	});*/
});