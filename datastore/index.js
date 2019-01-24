const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId( function(err, id) {
    if (err) {
      throw ('error, no items');
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          throw err;
          } else {
              callback(null, { id, text }) 
          }
      });
    }
  });
};

exports.readAll = (callback) => {

    fs.readdir(exports.dataDir, (err, data) => {
      if(err){
        throw('still not it bruh')
      } else {
        //filter data to just numbers
      var special = data;
       for (var i = 0; i< special.length; i++) {
         special[i] = special[i].replace(/\D+/g, '');
       }
        var specialArr = _.map(special, (file) => {
          return {id: file, text: file};
        });
        callback(null, specialArr);
      }
    })
};

exports.readOne = (id, callback) => {

var text;
fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err, data) => {
  if (err) {
    callback(err)
  } else {
     text = data;
     callback(null, { id, text })
  }
})






  //-------------------------------------Rabbit hole-------------------------------------
  // var text = items[id]];
  // var text;
  // fs.readdir(exports.dataDir, (err, data) => {
  //   if (err) {
  //     throw('nope')
  //   } else {
  //      var special = data;
  //      for (var i = 0; i< special.length; i++) {
  //        special[i] = special[i].replace(/\D+/g, '');
  //      }

  //      for (var j = 0; j < special.length; j++) {
  //        if (special[j] === id) {
  //          fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err, data) => {
  //            if (err) {
  //              throw('try again')
  //              } else {
  //               console.log('is data even getting in here?-->', data)
  //               console.log('is text getting down here? ', text)
  //               text = data;
  //              }
  //           })
  //        }
  //     }
  //     if (!text) {
  //       callback(new Error(`No item with id: ${id}`));
  //     } else {
  //       callback(null, { id, text });
  //     };
  //   };
  // })
};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
  exports.readOne(id, function(err, data) {
    if (err) {
      callback(err);
    } else {
        fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err, data) => {
          if (err) {
          callback(err);
      } else {
          data = text;
          callback(null, { id, data })
        }
      })
    }
  })



}

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
  exports.readOne(id, function(err, data) {
    if (err) {
      callback(err);
    } else {
  fs.unlink(path.join(exports.dataDir, `${id}.txt`), (err) => {
    if (err) {
      throw err;
    } else {
      console.log('path/file.txt was deleted');
      callback();
    }
    });
    }
});
}
// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
