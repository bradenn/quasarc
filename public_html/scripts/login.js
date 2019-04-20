$("#username").keyup(function() {
  checkUsername($("#username").value);
});
$("#submit").click(function() {

});

function checkUsername(value) {
  $.getJSON("http://localhost:3001/api/user/exists/" + value, function(data) {
    $("#message1").text(data.value);

  });
}
