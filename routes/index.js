var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const users = require('../service/auth');
const jsonwebtoken = require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form');
});

router.post('/register', async function(req, res, next) {
  try {
    if (!req.body.name || !req.body.mail || !req.body.password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await users.getUserByMail(req.body.mail);
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const userCreated = await users.register(req.body);
    return res.status(200).json({ status: 200, data: userCreated, message: `User succesfully created` });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
});

router.post('/login', async function(req, res, next) {
  try {
    const body = req.body;
    const results = await users.getUserByMail(body.mail);
    if (!results) {
        return res.status(403).json({ status: 403, message: "Invalid mail or password" });
    }
    const result = bcrypt.compareSync(body.password, results.password);
    if (result) {
        results.password = undefined;
        const jsontoken = jsonwebtoken.sign({ result: results }, process.env.AUTH_KEY, {
            expiresIn: "30d"
        });
        return res.status(201).json({ status: 201, data: results, token: jsontoken, message: `login successfully` });
    } else {
        return res.status(403).json({ status: 403, data: results,  message: "Invalid name or password" });
    }
} catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
}
});

module.exports = router;
