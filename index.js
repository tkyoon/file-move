const rootFolder = "C:/Users/tkyoon/Desktop/2021-01_20210402";
const fs = require("fs");

let cnt = 0;
let makeFolderIdx = 0;
let currentFolderPath = "";
const files = fs.readdirSync(rootFolder);
console.log(files.length);

files.forEach((file) => {
  //   if (makeFolderIdx === 0 || (cnt % 50 === 0 && files.length !== cnt)) {
  if (cnt % 50 === 0 && files.length !== cnt) {
    makeFolderIdx++;
    currentFolderPath = `${rootFolder}/${makeFolderIdx}`;
    fs.mkdirSync(currentFolderPath);
  }

  fs.renameSync(`${rootFolder}/${file}`, `${currentFolderPath}/${file}`);
  cnt++;
});

// fs.readdirSync(rootFolder).forEach((file) => {
//   if (makeFolderIdx === 0 || cnt % 50 === 0) {
//     makeFolderIdx++;
//     currentFolderPath = `${rootFolder}/${makeFolderIdx}`;
//     fs.mkdirSync(currentFolderPath);
//   }

//   fs.renameSync(`${rootFolder}/${file}`, `${currentFolderPath}/${file}`);

//   cnt++;
//   //console.log(file);
// });
