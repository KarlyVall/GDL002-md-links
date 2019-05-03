const fs = require('fs');
const path = require('path');

module.exports = (filePath, options) => {
  return new Promise((resolve, reject)=> {
    // Read a file
    fs.readFile(filePath, function(err, data){
      if (err){
        return reject(err);
      }
      resolve(data.toString());
    });
  });
 };