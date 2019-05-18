$("#username").keydown(function() {
  checkUsername($("#username").val());
});

$("#submitForm").click(function() {
  if (!checkUsername($("#username").val())) {
    var load = {
      username: $("#username").val(),
      password: $("#password").val(),
      email: $("#email").val(),
      key_id: "df49cc23bf95d8c06a16a905f9d9ed2a",
      token: "na3DHEQ=gh!Y4xtdtLKvtdedFE2kn+qPx2nqzgRgnLT32ncEiZfhfE4x=opcg0AL"
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3001/api/user/",
      // The key needs to match your method's input parameter (case-sensitive).
      data: JSON.stringify(load),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      statusCode: {
        201: function() {
          window.location.replace("login.html");
        },
        401: function() {
          alert("API is not working");
        },
        400: function() {
          // Inputs not satisfied
        }
      }
    });
  }
});

function checkUsername(username) {
  $.getJSON("http://localhost:3001/api/user/exists/" + username, function(data) {
    $("#usernameStatus").html(data.value ? "<span class='text-danger'>Username taken, try another.</span>" : "<span class='text-success'>Username taken is not taken.</span>");
    return data.value;
  });

}
