const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [ // regex
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/orders(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  // payload : {userId,isAdmin}
  if (!payload.isAdmin) {
    // not an admin
    // reject the api call
    // function(req, payload, done):
    // req (Object) - The express request object.
    // payload (Object) - An object with the JWT claims.
    // done (Function) - A function with signature function(err, revoked) to be invoked once the check to see if the token is revoked or not is complete.
    // err (Any) - The error that occurred.
    // revoked (Boolean) - true if the JWT is revoked, false otherwise.
    done(null, true);
  }

  done();
}

module.exports = authJwt;
