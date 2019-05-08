$(document).ready(function() {
  if (getCookie("token") != null) {
    loadUser();
  } else {
    loadDefault();
  }
});



function loadDefault() {
  $("#navRightData").html(buildDefault());
}

function buildUser(){
  var e = `
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navData" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  </a>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
    <a class="dropdown-item" href="#">profile</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#" onclick="logoutUser();">logout</a>
  </div>
  </li>
  `;
  return e;
}

function buildDefault(){
  var e = `
  <li class="nav-item active">
    <a class="nav-link" href="login.html">Login</a>
  </li>
  <li class="nav-item active">
    <a class="nav-link" href="signup.html">Register</a>
  </li>
  `;
  return e;
}

function loadUser() {

  $("#navRightData").html(buildUser());
  var json = '{"user_id": "5ccd05359e6fa58d889093ce", "key_id": "df49cc23bf95d8c06a16a905f9d9ed2a", "user_token": "' + getCookie("token") + '"}';

  $.ajax({
    type: "POST",
    url: "http://localhost:3001/api/user/get/",
    // The key needs to match your method's input parameter (case-sensitive).
    data: json,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {

      $("#navData").html(data.value);
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
