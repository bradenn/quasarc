const nav = new Vue({
  el: '#nav',
  data: {
    username: '---'
  }
})



$(document).ready(function() {
  if (getCookie("token") != null) {
    loadUser();
  } else {
    nav.username = "Login";
  }
});




function loadUser() {


  var json = '{"user_id": "5ccd05359e6fa58d889093ce", "key_id": "df49cc23bf95d8c06a16a905f9d9ed2a", "user_token": "' + getCookie("token") + '"}';

  $.ajax({
    type: "POST",
    url: "http://localhost:3001/api/user/get/",
    // The key needs to match your method's input parameter (case-sensitive).
    data: json,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {

      nav.username = data.value;
      console.log(data.value);
    },
    failure: function(errMsg) {
      alert(errMsg);
    }
  });

}

function logoutUser(){
  eraseCookie("token");
  loadDefault();
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
