$(document).ready(function() {
  if (getCookie("token") != null) {
    window.location.replace("index.html");
  }
});

const errorHandle = new Vue({
  el: '#error',
  data: {
    message: ''
  }
});

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
  var password = $("#password").val();
  
  var load = {
    username: username,
    password: password,
    key_id: "df49cc23bf95d8c06a16a905f9d9ed2a"
  };

  $.ajax({
    type: "GET",
    url: "http://localhost:3001/api/user/" + JSON.stringify(load),
    statusCode: {
      200: function(data) {
        setCookie("token", data.token, 30);
        window.location.replace("index.html");
      },
      204: function() {
        errorHandle.message = "Incorrect username or Password.";
      }
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
