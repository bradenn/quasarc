

$( "#submitForm" ).click(function() {
  if(!checkUsername($("#username").val())){
    var jsPre= {
      username: $("#username").val(),
      password: $("#password").val(),
      email: $("#email").val(),
      key_id: "df49cc23bf95d8c06a16a905f9d9ed2a",
      token: "na3DHEQ=gh!Y4xtdtLKvtdedFE2kn+qPx2nqzgRgnLT32ncEiZfhfE4x=opcg0AL"
    };
    $.getJSON("http://localhost:3001/api/user/new/"+JSON.stringify(jsPre), function(data) {
      if(data.status == "success"){
        window.location.replace("/login.html");
      }else if (data.status == "error") {
          window.location.replace("/signup.html?err=int");
      }{

      }
    });
  }
});
