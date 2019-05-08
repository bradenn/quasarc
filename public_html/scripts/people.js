function getResults(token) {

  var json = '{"user_id": "5ccd05359e6fa58d889093ce", "key_id": "df49cc23bf95d8c06a16a905f9d9ed2a", "token": "na3DHEQ=gh!Y4xtdtLKvtdedFE2kn+qPx2nqzgRgnLT32ncEiZfhfE4x=opcg0AL"}'

  $.ajax({
    type: "POST",
    url: "http://localhost:3001/api/people/query/",
    // The key needs to match your method's input parameter (case-sensitive).
    data: json,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
      $("#gender").html(data.value.gender);
      $("#sexuality").html(data.value.sexuality);
      $("#age").html(data.value.age);

      $("#smokes").html(JSON.stringify(data.value.smoker));
      $("#smokers").html(JSON.stringify(data.value.smoking));

      $("#activity").html(data.value.dorm_activity);
      $("#roomtype").html(data.value.room_prefrence);
      $("#desc").html(data.value.description);

      console.log(data.value.age);
    },
    failure: function(errMsg) {
      alert(errMsg);
    }
  });

}
