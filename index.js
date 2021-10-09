const rootFolder = "C:/Users/윤태경/Desktop/camera/202109";
const fs = require("fs");

let cnt = 0;
let makeFolderIdx = 0;
let currentFolderPath = "";
const files = fs.readdirSync(rootFolder);
console.log(files.length);

/** 폴더내 파일 50개씩 폴더 나누기 [TK Yoon(y-friend@daum.net) 2021-10-09 21:32:09] */
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
