
$( "#username" ).keydown(function() {
  checkUsername($("#username").val());
});

$( "#submitForm" ).click(function() {
  if(!checkUsername($("#username").val())){
    var jsPre= {
      username: $("#username").val(),
      password: $("#password").val(),
      email: $("#email").val(),
      key_id: "dab6bb2aa7fc264e73af748e3eb0f453",
      token: "eurIKVa5VWMWmEsH9Qse6oadeJYYW2LRQiZHsX3kGcTwyE0TKC97rMB0a0LAqStj"
    };
    $.getJSON("http://nossl.bradenn.com:3001/api/user/new/"+JSON.stringify(jsPre), function(data) {
      if(data.status == "success"){
        window.location.replace("/login.php");
      }else if (data.status == "error") {
          window.location.replace("/signup.php?err=int");
      }{

      }
    });
  }
});

function checkUsername(username) {
  $.getJSON("http://nossl.bradenn.com:3001/api/user/exists/"+username, function(data) {
    $("#usernameStatus").html(data.value ? "<span class='text-danger'>Username taken, try another.</span>" : "<span class='text-success'>Username taken is not taken.</span>");
    return data.value;
  });

}
