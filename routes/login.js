const express = require('express');
const router = express.Router();

const { login } = require('../controllers/login');

router.post('/', async (req, res) => {
     login(req.user).then(response => {
          res.send(response).status(200);
     }).catch(error => {
          res.send(error.message).status(500);
     })
})

module.exports = router;