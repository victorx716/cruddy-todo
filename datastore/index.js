const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId( function(err, id) {
    if (err) {
      throw ('error, no items')
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
  // var data = _.map(items, (text, id) => {
    // return { id, id };
  // });
    // callback(null, data);
    fs.readdir(exports.dataDir, (err, data) => {
      if(err){
        throw('still not it bruh')
      } else {
        console.log('data', data);
      }
    })






      // THE RABBIT HOLE THEY TOLD US NOT TO DOOOOOOOOOOO!!!!!!!!
  // fs.readFile(path.join(exports.dataDir, `${id}.txt`), (err, fileData) => {
  //   if (err) {
  //     throw ('error, aint nuffin workin')
  //   } else {
  //      let data = _.map(fileData, (text, id) => {
  //        return { id, text};
  //      })
  //   }
  // });
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
