const fs = require("fs");
const moment = require("moment");
const path = require('path');

const divideByDate = async (photoFolder) => {
    let makeDirArr = new Array();
    /** 파일 일자별로 폴더 나누기 [TK Yoon(y-friend@daum.net) 2021-10-09 21:31:53] */
    fs.readdirSync(photoFolder).forEach((file) => {
        if(path.extname(file) === ".mp4" || path.extname(file) === ".wmv") {
            if (!fs.existsSync(`${photoFolder}/video`)) {
                fs.mkdirSync(`${photoFolder}/video`);
            }
            fs.renameSync(`${photoFolder}/${file}`, `${photoFolder}/video/${file}`);
            return;
        }

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
                makeDirArr.push(folder);
            }

            try {
                fs.renameSync(photoFolder + "/" + file, folder + "/" + file);
            } catch (e) {
            console.error(e);
            }
        }
    });
    return makeDirArr;
};

const divideByCount50 = async (rootFolder) => {
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
}
const divideByCount15 = async (rootFolder) => {
    if (!fs.existsSync(rootFolder)) {
        fs.mkdirSync(rootFolder);
    }

    let cnt = 0;
    let makeFolderIdx = 0;
    let currentFolderPath = "";
    const files = fs.readdirSync(rootFolder);
    console.log(files.length);

    /** 폴더내 파일 50개씩 폴더 나누기 [TK Yoon(y-friend@daum.net) 2021-10-09 21:32:09] */
    files.forEach((file) => {
    //   if (makeFolderIdx === 0 || (cnt % 50 === 0 && files.length !== cnt)) {
    if (cnt % 15 === 0 && files.length !== cnt) {
        makeFolderIdx++;
        currentFolderPath = `${rootFolder}/${makeFolderIdx}`;
        fs.mkdirSync(currentFolderPath);
    }

    fs.renameSync(`${rootFolder}/${file}`, `${currentFolderPath}/${file}`);
    cnt++;
    });
}

const go = async() => {
    const rootFolder = "C:/Users/y-fri/OneDrive/바탕 화면/Camera";
    const makeFolders = await divideByDate(rootFolder);
    for(folder of makeFolders) {
        await divideByCount50(folder);
    }
    
    //비디오폴더 15개씩 나누기 - 유튜브 기준
    divideByCount15(`${rootFolder}/video`);
}

go();