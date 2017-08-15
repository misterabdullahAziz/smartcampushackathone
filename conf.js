var conf = {};
var cse = {};
var ae = {};
var cnt_arr = [];

// build cse
cse.host        = 'localhost';
cse.port        = '7579';
cse.name        = 'mobius-yt';
cse.id          = '/mobius-yt';

// build ae
ae.id           = 'sejongcampus';
ae.parent       = '/' + cse.name;
ae.name         = 'sejongcampus';
ae.appid        = '0.2.481.1.1';
ae.port         = 'sju900';
ae.bodytype     = 'json';
ae.tasport      = '3105';

// build cnt
var count = 0;
cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Jiphyun_gwan';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'Jiphyun_gwan';
cnt_arr[count++].name = 'People';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Gunja_gwan';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'Gunja_gwan';
cnt_arr[count++].name = 'People';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Gwanggaeto_gwan';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'Gwanggaeto_gwan';
cnt_arr[count++].name = 'People';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Sejong_gwan';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'Sejong_gwan';
cnt_arr[count++].name = 'People';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Yongduk_gwan';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'Yongduk_gwan';
cnt_arr[count++].name = 'People';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Yulgok_gwan';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'Yulgok_gwan';
cnt_arr[count++].name = 'People';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Chungmu_gwan';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'Chungmu_gwan';
cnt_arr[count++].name = 'People';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Youngsil_gwan';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'Youngsil_gwan';
cnt_arr[count++].name = 'People';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'University_Library';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'University_Library';
cnt_arr[count++].name = 'People';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name;
cnt_arr[count++].name = 'Student_Building';

cnt_arr[count] = {};
cnt_arr[count].parent = '/' + cse.name + '/' + ae.name + '/' + 'Student_Building';
cnt_arr[count++].name = 'People';

conf.cse = cse;
conf.ae = ae;
conf.cnt = cnt_arr;

module.exports = conf;
