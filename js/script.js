// user
var user_Boolean = false;
var password_Boolean = false;
var varconfirm_Boolean = false;
var emaile_Boolean = false;
$('.reg_user').blur(function(){
  if ((/^[a-z0-9_-]{4,8}$/).test($(".reg_user").val())){
    $('.user_hint').html("✔").css("color","green");
    user_Boolean = true;
  }else {
    $('.user_hint').html("×").css("color","red");
    user_Boolean = false;
  }
});
// password
$('.reg_password').blur(function(){
  if ((/^[a-z0-9_-]{6,16}$/).test($(".reg_password").val())){
    $('.password_hint').html("✔").css("color","green");
    password_Boolean = true;
  }else {
    $('.password_hint').html("×").css("color","red");
    password_Boolean = false;
  }
});


// password_confirm
$('.reg_confirm').blur(function(){
  if (($(".reg_password").val())==($(".reg_confirm").val())){
    $('.confirm_hint').html("✔").css("color","green");
    varconfirm_Boolean = true;
  }else {
    $('.confirm_hint').html("×").css("color","red");
    varconfirm_Boolean = false;
  }
});


// Email
$('.reg_email').blur(function(){
  if ((/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/).test($(".reg_email").val())){
    $('.email_hint').html("✔").css("color","green");
    emaile_Boolean = true;
  }else {
    $('.email_hint').html("×").css("color","red");
    emaile_Boolean = false;
  }
});


// Mobile
/*$('.reg_mobile').blur(function(){
  if ((/^1[34578]\d{9}$/).test($(".reg_mobile").val())){
    $('.mobile_hint').html("✔").css("color","green");
    Mobile_Boolean = true;
  }else {
    $('.mobile_hint').html("×").css("color","red");
    Mobile_Boolean = false;
  }
});*/


// click
//var getUsername = function(){
      //return document.getElementById("username").value;
//}
var getEmail = function () {
      return document.getElementById("email").value;
};
var getPwd = function () {
      return document.getElementById("password").value;
};
        /*document.getElementById("sign-up").onclick = function () {
            var email = getEmail();
            var pwd = getPwd();
            if(user_Boolean && password_Boolean && varconfirm_Boolean && emaile_Boolean == true){
            sign_up(email, pwd);
            alert("sign up successful");
            window.location.href('a1.html');
            }else{alert("please complete the form")}
            /*if(document.getElementById("password2") = pwd){
                          sign_up(email, pwd);
                          alert("sign up successful");
                        }else{
                          alert("password confirm failed");
                        }
        };*/
$('.red_button').click(function(){
  //var username = getUsername();
  var email = getEmail();
  var pwd = getPwd();
  if(/*user_Boolean &&*/ password_Boolean && varconfirm_Boolean && emaile_Boolean == true){
    sign_up(email, pwd);
    alert("注册成功");
    window.location.href = 'index.html';
  }else {
    alert("请完善信息");
  }
});
