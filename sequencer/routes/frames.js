var express = require('express');
var router = express.Router();
var fs = require('fs');
var filePath = 'public/frames/frames.json';

/* GET users listing. */
router.get('/',
  (req, res, next) => {
    file = fs.readFile(
      filePath,
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send()
        } else {
          res.json(JSON.parse(data.toString()))
        }
      }
    )
  }
);

router.post('/',
  (req, res, next) => {
    console.log(req.body);
    fs.writeFile(
      filePath,
      JSON.stringify(req.body),
      (err) => {
        res.json({message: 'Success'})
      }
    )
  }
)

module.exports = router;
