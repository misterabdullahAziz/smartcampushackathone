var conf = {};
var cse = {};
var ae = {};
var cnt_arr = [];


conf.useprotocol = 'http';
conf.upload_interval = (3 * 60 * 1000);   //minute * second * millisecond

// build cse
cse.host        = 'localhost';
cse.port        = '7579';
cse.name        = 'mobius-yt';
cse.id          = '/mobius-yt';
cse.mqttport    = '1883';

// build ae
ae.id           = 'sejongcampus';
ae.parent       = '/' + cse.name;
ae.name         = 'sejongcampus';
ae.appid        = 'SOrigin';
ae.port         = '9727';
ae.bodytype     = 'xml';
ae.tasport      = '3105';

// build cnt
var count = 0;
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Jiphyun_gwan';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Gunja_gwan';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Gwanggaeto_gwan';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Sejong_gwan';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Yongduk_gwan';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Yulgok_gwan';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Chungmu_gwan';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Youngsil_gwan';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'University_Library';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Student_Building';
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[count - 1].name;
cnt_arr[count++].name = 'CO2';


conf.usesecure  = 'disable';


conf.cse = cse;
conf.ae = ae;
conf.cnt = cnt_arr;


module.exports = conf;
