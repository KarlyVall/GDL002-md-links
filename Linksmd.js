const fs = require('fs');
const filePath = process.argv[2];
const fetch = require('node-fetch');
const mdLinks = require('./index');
const fileReaded = mdLinks(filePath, null);
const colors = require('colors');

const inputPath = input => {
  if (input != undefined) {
    console.log(colors.yellow('Your input is an address'));
    return true;
  } else {
    console.log('Your input is not an address'.red);
    return false;
  }
};
inputPath(filePath);

const mdFile = pathFile => {
  const pathExt = path.extname(pathFile);
  if (pathExt != '.md') {
    console.log('it doesn´t a file markdown'.red);
    return false;
  } else {
    console.log('it´s a markdown file'.magenta);
    return true;
  }
};
mdFile(filePath);

//this must be appear after the file was read
fileReaded.then(
  data => {
    console.log('Links found:'.yellow);
    urlList(data);
  },
  err => {
    console.error(err);
  },
);

//Function for find the url, the text and the origin path
let htmlLinks = [];
const urlList = data => {
  const mdLinkOne = /\[(.+?)\]\(.+?\)/g;
  const mdLinkTwo = /\[(.+?)\]\((.+?)\)/;
  let allLinks = data.match(mdLinkOne);
  for (let x in allLinks) {
    var groupDataTotal = mdLinkTwo.exec(allLinks[x]);
    var groupData = {
      href: groupDataTotal[2],
      title: groupDataTotal[1],
      path: filePath,
    };
    htmlLinks.push(groupData);
  }
  console.log(htmlLinks.length);
  console.log(htmlLinks);
  return htmlLinks;
};

const validateLinks = allLinks => {
  for (let index = 0; index < allLinks.length; index++) {
    fetch(allLinks[i]).then(response => {
      if (response.status == 200) {
        console.log('ok');
      } else if (response.status == 400 || response.status == 404) {
        console.log('fail');
      }
    });
  }
};
console.log(validateLinks(htmlLinks));

module.exports = {
  realPath,
  inputPath,
  mdFile,
  readFile,
  urlList,
};
