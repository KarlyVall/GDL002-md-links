const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

function validatePath(pathMd) {
  const extension = path.extname(pathMd);
  if (extension == '.md') {
    console.log('true');
    return true;
  } else {
    console.log('false');
    return false;
  }
}

function absolutePath(absolutelink) {
  const absolute = path.resolve(absolutelink);
  return absolute;
}

function readFileMd(pathMd) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathMd, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
      console.log(data);
    });
  });
};

function findLinks (pathMd) {
  fs.readFile(pathMd, 'utf-8',function (err, data){
    if (err) {
      console.log(err);
    } else {          
      let find = data.toString();
      let href = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
      let text = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
      let linksFinder = find.match(href);
      let textFinder = find.match(text);
      if (linksFinder !=null ){
        for ( let i=0; i<linksFinder.length; i++ ){
          console.log(`Text: ${textFinder[i]}\n href:${linksFinder[i]}\n File: ${pathMd}\n`);
        }
      } 
      }
  });
};


function ValidateLinks (pathMd) {
  fs.readFile(pathMd, 'utf-8',function (err, data){
    if (err) {
      console.log(err);
    } else {          
      let find = data.toString();
      let href = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
      let text = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
      let linksFinder = find.match(href);
      let textFinder = find.match(text);
      if (linksFinder !=null ){
        for ( let i=0; i<linksFinder.length; i++ ){
          fetch(linksFinder[i])
            .then(response =>{
              if(response.status == 200){
                console.log(`Text: ${textFinder[i]}\n href:${linksFinder[i]}\n File: ${pathMd}\n Response code: ${response.status}\nResponse: ${response.statusText}\n`)
              }else if (response.status == 404||response.status == 400){
                console.log(`ERROR.\nText:${textFinder[i]}\n href:${linksFinder[i]}\n File: ${pathMd}\n Response code: ${response.status}\nResponse: ${response.statusText}\n` );
                
              }
            })
        }
      } 
      }
  });
};

module.exports = {
  validatePath,
  absolutePath,
  readFileMd,
  findLinks,
  ValidateLinks
};
