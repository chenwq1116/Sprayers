var express = require('express');
var router = express.Router();


var db = require('../db');
const noteCollection = db.collection("note");

router.post('/insert', (req, res) => {
  const notes = req.body;
  if (notes != null && notes.length > 0) {
    var index;
    for (index in notes) {
      const note = notes[index];
      noteCollection.findOne({ name: note }).then(result =>{
        if (!result) {
          const insertResult = noteCollection.insertOne({
            name: note,
          });
          insertResult.catch(err =>{
            console.log(err);
          })
        }
      });
    }
    res.sendStatus(200);
  }
});

router.get('/getNoteList',(req,res) => {
  noteCollection.find().limit(10).sort({ _id: -1 }).toArray(function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

module.exports = router;
  