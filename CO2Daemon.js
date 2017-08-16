//---------------thyme

var fs = require('fs');
var shortid = require('shortid');
var http = require('http');
var js2xmlparser = require("js2xmlparser");


global.socket_q = {};

global.conf = require('./conf1.js');


fs.writeFileSync('conf1.json', JSON.stringify(conf, null, 4), 'utf-8');


var arr = ['Jiphyun_gwan',
          'Gunja_gwan',
          'Gwanggaeto_gwan',
          'Sejong_gwan',
          'Yongduk_gwan',
          'Yulgok_gwan',
          'Chungmu_gwan',
          'Youngsil_gwan',
          'University_Library',
          'Student_Building'];

arr['Jiphyun_gwan'] = {0:470, 7:480, 8:490, 9:510, 10:530, 11:570, 12:560, 16:540, 17:530, 18:510, 19:490, 20:480, 21:480};   // 'Jiphyun_gwan'
arr['Gunja_gwan'] = {0:520, 7:550, 8:590, 9:610, 10:640, 11:670, 12:710, 16:690, 17:660, 18:650, 19:640, 20:600, 21:570};   // 'Gunja_gwan'
arr['Gwanggaeto_gwan'] = {0:520, 7:550, 8:590, 9:610, 10:640, 11:670, 12:710, 16:690, 17:660, 18:650, 19:640, 20:600, 21:570};   // 'Gwanggaeto_gwan'
arr['Sejong_gwan'] = {0:460, 7:460, 8:460, 9:480, 10:500, 11:510, 12:570, 16:550, 17:590, 18:570, 19:560, 20:510, 21:490};   // 'Sejong_gwan'
arr['Yongduk_gwan'] = {0:520, 7:550, 8:590, 9:610, 10:640, 11:670, 12:710, 16:690, 17:660, 18:650, 19:640, 20:600, 21:570};   // 'Yongduk_gwan'
arr['Yulgok_gwan'] = {0:520, 7:550, 8:590, 9:610, 10:640, 11:670, 12:710, 16:690, 17:660, 18:650, 19:640, 20:600, 21:570};   // 'Yulgok_gwan'
arr['Chungmu_gwan'] = {0:520, 7:550, 8:590, 9:610, 10:640, 11:670, 12:710, 16:690, 17:660, 18:650, 19:640, 20:600, 21:570};   // 'Chungmu_gwan'
arr['Youngsil_gwan'] = {0:520, 7:550, 8:590, 9:610, 10:640, 11:670, 12:710, 16:690, 17:660, 18:650, 19:640, 20:600, 21:570};   // 'Youngsil_gwan'
arr['University_Library'] = {0:490, 7:500, 8:520, 9:540, 10:580, 11:600, 12:610, 16:600, 17:590, 18:570, 19:530, 20:510, 21:490};   // 'University_Library'
arr['Student_Building'] = {0:450, 7:460, 8:480, 9:500, 10:530, 11:550, 12:610, 16:580, 17:550, 18:620, 19:590, 20:550, 21:490};   // 'Student_Building'



function http_request(path, method, ty, bodyString, callback) {
    var options = {
        hostname: conf.cse.host,
        port: conf.cse.port,
        path: path,
        method: method,
        headers: {
            'X-M2M-RI': shortid.generate(),
            'Accept': 'application/' + conf.ae.bodytype,
            'X-M2M-Origin': conf.ae.id
        }
    };

    if(bodyString.length > 0) {
        options.headers['Content-Length'] = bodyString.length;
    }

    if(method === 'post') {
        var a = (ty==='') ? '': ('; ty='+ty);
        options.headers['Content-Type'] = 'application/vnd.onem2m-res+' + conf.ae.bodytype + a;
    }
    else if(method === 'put') {
        options.headers['Content-Type'] = 'application/vnd.onem2m-res+' + conf.ae.bodytype;
    }


    var res_body = '';
    var req = http.request(options, function (res) {
        //console.log('[crtae response : ' + res.statusCode);

        //res.setEncoding('utf8');

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

    //console.log(bodyString);

    req.write(bodyString);
    req.end();
}

function crtci(count, content, socket, callback) {
    var results_ci = {};
    var bodyString = '';
    if(conf.ae.bodytype === 'xml') {
        results_ci.con = content;

        results_ci['@'] = {
            "xmlns:m2m": "http://www.onem2m.org/xml/protocols",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
        };

        bodyString = js2xmlparser("m2m:cin", results_ci);
    }
    else {
        results_ci['m2m:cin'] = {};
        results_ci['m2m:cin'].con = content;

        bodyString = JSON.stringify(results_ci);
    }

    var parent_path = conf.cnt[count].parent + '/' + conf.cnt[count].name;

    http_request(conf.cnt[count].parent + '/' + conf.cnt[count].name, 'post', '4', bodyString, function (res, res_body) {
        callback(res.headers['x-m2m-rsc'], res_body, parent_path, socket);
    });
};


function sendDataToServer() {
    for (var j = 0; j < conf.cnt.length; j++) {
        if (conf.cnt[j].name == 'CO2') {
            var content = JSON.stringify({value: getCO2Con(conf.cnt[j - 1].name)});
            console.log(conf.cnt[j-1].name + ' CO2 Concentration ' + content + ' ---->');
            crtci(j, content, this, function (status, res_body, to, socket) {
                console.log('x-m2m-rsc : ' + status + ' <----');
            });
        }
    }
}


//console.log(getCO2Con(time, 'Student_Building'));

// n1 은 "하한값", n2 는 "상한값"
function randomRange(n1, n2) {
    return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}

function getTime(){
    var hour = timeSet(new Date().getHours());
    var nhour = timeSet(new Date().getHours() + 1);
    var minute = new Date().getMinutes();
    return {
    h : hour,
    nh : nhour,
    m : minute
    };
}

function timeSet(hour){
    if (hour < 7)
    return 0;
    else if (12 < hour && hour < 16)
    return 12;
    else if (hour > 21)
    return 0;
    else {
    return hour;
    }
}

function getCO2Con(buildingName){
    var time = getTime();
    var con = arr[buildingName][time.h];
    if (time.m > 50){
    var min = con;
    var max = arr[buildingName][time.nh]
    }
    else {
    var min = con - 10;
    var max = con + 10;
    }
    return randomRange(min, max);
}

exports.calculateco2 = function(){

setInterval(sendDataToServer, conf.upload_interval);
    //conf.upload_interval
};

