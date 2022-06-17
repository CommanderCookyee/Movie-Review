
 
//

app.post("/checkStatusUser", function (request, responce) {
  var accessTokenCheck = request.body.accessToken;
  console.log(accessTokenCheck);
  con.query(
      "SELECT * FROM user_token_individual WHERE user_access_token = ?",
      [accessTokenCheck],
      function (err, res) {
          if (err) {
              console.error("An error occurred:", err.message);
              responce.status(500).json({ status: 500, message: "An error occurred: " + err.message });
          } else {
              if (res.length) {
                  console.log( "Duplication");
                  responce.status(200).json({ status: 200, message: "Duplication" });
              } else {
                  console.log( "User not found.");
                  responce.status(404).send({ status: 404, message: "User not found." });
              }
          }
      }
  )
});

module.exports = app;
