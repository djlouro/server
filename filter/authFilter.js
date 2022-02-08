const params = {
    userPoolId: 'us-east-2_3GZfzOFf4',
    region: 'us-east-2',
    debug: true 
  }
  
  const Verifier = require('verify-cognito-token');
  const verifier = new Verifier(params);

function authChecker(req, res, next) {
    let idToken = null
    
    for (const key in req.cookies) {
        if (key.includes("idToken")) {
            idToken = req.cookies[key]
        }
    }

    if (idToken == null) {
        res.status(401);
        res.send('Unauthorized');
        return;
    }

    verifier.verify(idToken)
    .then(result =>{

      if (result) { // token is valid / non-expired
          next()
      } else { // token is invalid / expired
        res.status(401);
        res.send('Unauthorized');
        return;
      }

    })
}

module.exports = { authChecker };