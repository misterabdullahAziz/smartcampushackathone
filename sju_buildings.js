
var conf = require("./conf");
var arr = [ 'Jiphyun_gwan', 'Gunja_gwan', 'Gwanggaeto_gwan', 'Sejong_gwan', 'Yongduk_gwan', 'Yulgok_gwan', 'Chungmu_gwan', 'Youngsil_gwan', 'University_Library', 'Student_Building'];

const JIPHYUN_GWAN = 393; // 10F
const GUNJA_GWAN = 241; // 6F
const GWANGGAETO_GWAN = 600; // 15F
const SEJONG_GWAN = 120; // 3F
const YONGDUK_GWAN = 168; // 4F
const YULGOK_GWAN = 308; // 7F
const CHUNGMU_GWAN = 440; // 11F
const YOUNGSIL_GWAN = 225; // 6F
const UNIVERSITY_LIBRARY = 400; // 9F
const STUDENT_BUILDLING = 252; // 6F

const workTime = 'workTime';
const breakTime = 'workbreakTime';
const offTime = 'offTime';
const offBreakTime = 'offbreakTime';

var map = {
    Jiphyun_gwan: JIPHYUN_GWAN,
    Gunja_gwan: GUNJA_GWAN,
    Gwanggaeto_gwan: GWANGGAETO_GWAN,
    Sejong_gwan: SEJONG_GWAN,
    Yongduk_gwan: YONGDUK_GWAN,
    Yulgok_gwan: YULGOK_GWAN,
    Chungmu_gwan: CHUNGMU_GWAN,
    Youngsil_gwan: YOUNGSIL_GWAN,
    University_Library: UNIVERSITY_LIBRARY,
    Student_Building: STUDENT_BUILDLING
};

function getPeople(hour) {
    for (var j = 0; j < arr.length; j++) {

        var name = arr[j];
        var numberOfPeople = map[name] ;
        var admin = isAdministrative(name);
        
        var status = getStatusByTime(hour);
        
        if (status == breakTime) {
            numberOfPeople = getPercentOfValue(numberOfPeople, getRandomValue(80, 90));
        }
        else if (status == workTime) {
            numberOfPeople = getPercentOfValue(numberOfPeople, getRandomValue(7, 10));
        }
        else if (status == offBreakTime) {
            if (admin) {
                numberOfPeople = getPercentOfValue(numberOfPeople, getRandomValue(95, 96));
            }
            else {
                numberOfPeople = getPercentOfValue(numberOfPeople, getRandomValue(85, 90));
            }
        }
        else {
            if (admin) {
                numberOfPeople = getPercentOfValue(numberOfPeople, getRandomValue(97, 99));
            }
            else {
                numberOfPeople = getPercentOfValue(numberOfPeople, getRandomValue(90, 93));
            }
        }

        var cin = {ctname: name, con: numberOfPeople};
        sendDataToServer(JSON.stringify(cin));
    }
}


exports.calculatePeople = function(){

    setInterval(function Get_Data() {

        getPeople(getCurrentHour());

    }, 180000);
};

function getCurrentHour(){
    return new Date().getHours();
}

function toInt(n){
    return Math.round(Number(n));
}


function isAdministrative(name){

    return (name == 'Jiphyun_gwan' || name == 'Student_Building' || name == 'Gunja_gwan' || name == 'Sejong_gwan' || name == 'Yongduk_gwan');
}

function getRandomValue(min, max){
    return toInt(Math.random() * (max - min) + min);
}

function getPercentOfValue(number, percent){
    return toInt(number - ( number * percent/100));
}

function getStatusByTime(time){

    if(time == 12)
        return breakTime;
    else if(time >=9 && time <= 16)
        return workTime;
    else if(time == 18)
        return offBreakTime;
    else
        return offTime;
}

function sendDataToServer (data) {
    
    var jsonObj = JSON.parse(data);
    var ctname = jsonObj.ctname;
    var content = jsonObj.con;

    for (var j = 0; j < conf.cnt.length; j++) {
        if (conf.cnt[j].name == ctname) {
            crtci(j + 1, content.toString(), function (status, res_body, to) {
                try {
                    var to_arr = to.split('/');
                    var ctname = to_arr[to_arr.length - 1];
                    var result = {};
                    result.ctname = ctname;
                    result.con = status;

                    console.log('<---- x-m2m-rsc : ' + status + ' <----');
                    if (status == 5106 || status == 2001 || status == 4105) {
                        console.log('<---- x-m2m-rsc : ' + result + ' <----');
                    }
                    else if (status == 5000) {
                        console.log('<---- x-m2m-rsc : ' + result + ' <----');
                    }
                    else if (status == 9999) {
                        console.log('<---- x-m2m-rsc : ' + result + ' <----');
                    }
                    else {
                        console.log('<---- x-m2m-rsc : ' + result + ' <----');
                    }
                }
                catch (e) {
                    console.log(e.message);
                }
            });
        }
    }
}

crtci = function(count, content, callback) {

    var results_ci = {};
    var bodyString = '';

    results_ci['m2m:cin'] = {};
    results_ci['m2m:cin'].con = content;

    bodyString = JSON.stringify(results_ci);

    var parent_path = conf.cnt[count].parent + '/' + conf.cnt[count].name;

    http_request(conf.cnt[count].parent + '/' + conf.cnt[count].name, 'post', '4', bodyString, function (res, res_body) {
        callback(res.headers['x-m2m-rsc'], res_body, parent_path);
    });
};

function http_request(path, method, ty, bodyString, callback) {
    var options = {
        hostname: conf.cse.host,
        port: conf.cse.port,
        path: path,
        method: method,
        headers: {
            'X-M2M-RI': "12345",
            'Accept': 'application/' + conf.ae.bodytype,
            'X-M2M-Origin': conf.ae.id
        }
    };

    if(bodyString.length > 0) {
        options.headers['Content-Length'] = bodyString.length;
    }

    var a = (ty==='') ? '': ('; ty='+ty);
    options.headers['Content-Type'] = 'application/vnd.onem2m-res+' + conf.ae.bodytype + a;

    var http = require('http');
    var res_body = '';
    var req = http.request(options, function (res) {

        res.on('data', function (chunk) {
            res_body += chunk;
        });

        res.on('end', function () {
            callback(res, res_body);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(bodyString);
    req.end();
}



