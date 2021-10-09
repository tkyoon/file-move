const fs = require("fs");
const moment = require("moment");

console.log("##### Start PhotoAdjust #####");

var photoFolder = "C:/Users/윤태경/Desktop/camera";
var folder = "";

/** 파일 일자별로 폴더 나누기 [TK Yoon(y-friend@daum.net) 2021-10-09 21:31:53] */
fs.readdirSync(photoFolder).forEach((file) => {
  if (fs.lstatSync(photoFolder + "/" + file).isFile() == true) {
    let fileStat = fs.statSync(photoFolder + "/" + file);
    let year = moment(fileStat.mtime).format("YYYY");
    let mm = moment(fileStat.mtime).format("MM");
    folder = `${year}${mm}`;
    // folder = fileStat.mtime.toString().substring(0, 6);
    // console.log(folder);

    //폴더 없다면 생성
    folder = photoFolder + "/" + folder;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    try {
      fs.renameSync(photoFolder + "/" + file, folder + "/" + file);
    } catch (e) {
      console.error(e);
    }
  }
});
