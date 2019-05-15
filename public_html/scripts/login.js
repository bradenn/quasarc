$(document).ready(function() {
  $("#bodyDataError").hide();
  if (getCookie("token") != null) {
    window.location.replace("index.html");
  } else {}

});

const errorHandle = new Vue({
  el: '#error',
  data: {
    message: ''
  }
})

$(document).keypress(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    loginUser();
  }
});

$("#submitForm").click(function() {

  loginUser();

});



function loginUser() {
  var username = $("#username").val();
  var pass = $("#password").val();
  var jsPre = '{"username": "' + username + '","password": "' + pass + '","key_id": "df49cc23bf95d8c06a16a905f9d9ed2a"}';

  $.ajax({
    type: "POST",
    url: "http://localhost:3001/api/user/verify/",
    // The key needs to match your method's input parameter (case-sensitive).
    data: jsPre,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {

        if (data.value) {
          setCookie("token", data.token, 30);
          window.location.replace("index.html");
        } else {
          errorHandle.message = "Incorrect username or Password.";
        }
    },
    failure: function(errMsg) {
      alert(errMsg);
    }
  });

}


function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}
