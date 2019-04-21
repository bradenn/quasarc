<!DOCTYPE html>
<html lang="en">

<?php require("header.php"); ?>
<?php require("nav.php"); ?>

<body>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6" style="margin-top:5%;">
        <div class="card bg-light">
          <div class="card-header">Signup</div>
          <div class="card-body">


            <div class="form-group">
              <input type="text" onchange="" class="form-control" id="username"
              placeholder="username">
              <small id="usernameStatus" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <input type="text" onchange="" class="form-control" id="email"
              placeholder="email">
              <small id="emailStatus" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password"
              placeholder="password">
            </div>
            <div class="form-group">
            <button class="btn btn-primary" id="submitForm">Sign up</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>

</body>

<?php require("footer.php"); ?>
<script src="scripts/signup.js"></script>
</html>
