/**
 * Created by Mac on 11/08/2017.
 */
var Sejong_buildingsNoiseCapacity={'JIPHYUN_GWAN':15,'GUNJA_GWAN':12,  //List of CNT
'GWANGGAETO_GWAN':30,
'SEJONG_GWAN':15,
'SEJONG_GWAN':30,
'YONGDUK_GWAN':15,
'YULGOK_GWAN':50,
'CHUNGMU_GWAN':5,
'YOUNGSIL_GWAN':10,
'University-Library':30,
'STUDENT_BUILDLING':11};


var Sejong_buildings=[
//List of CNT under AE(sejongcampus) in addition to Temperature and Humidity which is are considered
// to be directlt relavent with AE itself,
// Meanwhile each CNT in List have subchild as "NoiseLevel","No.OfPeople","CO2Level"
// 'JIPHYUN_GWAN',
// 'GUNJA_GWAN',
// 'GWANGGAETO_GWAN',
// 'SEJONG_GWAN',
// 'YONGDUK_GWAN',
// 'YULGOK_GWAN',
// 'CHUNGMU_GWAN',
// 'YOUNGSIL_GWAN',
// 'UNIVERSITY_LIBRARY',
// 'STUDENT_BUILDLING' 
'Jiphyun_gwan', 'Gunja_gwan', 'Gwanggaeto_gwan', 'Sejong_gwan', 'Yongduk_gwan', 'Yulgok_gwan', 'Chungmu_gwan', 'Youngsil_gwan', 'University_Library', 'Student_Building'

];


var Time={'DayStartTime':'01:00-5:00',
    'DayRiseTime':'05:00-08:00',
    'WorkTime-FirstHalf':'08:00-12:00',
    'BreakTime':'12:00-13:00',
    'WorkTime-SecondHalf': '13:00-17:00',
    'Dayfall':'17:00-20:00',
    'EndDay':'20:00-24:00'};

var NoiseRange=['20 KHz','20 Hz'];
var NoiseTypes=['ultrasound','infrasound'];  // infrasound is below 20Hz..... above 20 KHz is ultrasound
var TimeDivision=['DayStartTime','DayRiseTime','WorkTime-FirstHalf','BreakTime','WorkTime-SecondHalf','Dayfall','EndDay'];
function generateNoiseData()
{
    var d=new Date();
    var currentHour=d.getHours();
    console.log("current Hour= ",currentHour);
    for (var j = 0; j < Sejong_buildings.length; j++)
    {
        var buildingName=Sejong_buildings[j];
        var noiseRange=Sejong_buildingsNoiseCapacity[buildingName.toUpperCase()];
        var noiseLevel;

        if (currentHour >=1 && currentHour <5)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(1,3))+ 'Hz';
        }
        else if (currentHour >= 5 && currentHour <8)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(5,10)) + 'KHz';
        }
        else if (currentHour >=8 && currentHour <12)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(15,25)) + 'KHz';
        }
        else if (currentHour >=12 && currentHour <17)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(20,25)) + 'KHz';
        }
        else if (currentHour >=17 && currentHour <20)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(10,20)) + 'Hz';
        }
        else
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(1,5)) + 'Hz';
        }
        console.log('Noise Level in ' + buildingName + 'is '+ noiseLevel);
        console.log('********************************');
        var cin = {cnt: buildingName, con: noiseLevel};
        console.log(cin);
        UploadDataToMobius(JSON.stringify(cin));
    }
}
function getPercentOfValue(number, percent)
{
    return parseInt(number - ( number * percent/100));
}

var getRandomNoiseRange=function(min,max)
{
    return parseInt(Math.random() * (max - min) + min);

}
var getMetaInformation=function (noiseValue)
{
    //make dictionary of time,sounfType,value,location
    // body...
}
function UploadDataToMobius(data)
{

    var jsonObj = JSON.parse(data);
    var cnt = jsonObj.cnt;
    var content = jsonObj.con;

    var serverIp='http://localhost:7579/mobius-yt/sejongcampus/'+cnt+"/NoiseLevel"  //sejongcampus is AE
    console.log("ServerIP= ",serverIp);
    var AEs='';
    var headers={
        'Accept': 'application/json',
        'X-M2M-RI': '12345',
        'X-M2M-Origin': 'SOrigin',
        'Content-Type':"application/vnd.onem2m-res+json; ty=4"
    };
    var request = require('request');
    request({
        headers: headers,
        url:serverIp,
        method:'POST',
        body:
            JSON.stringify({"m2m:cin":
                {
                    "con":content
                }
            })

    },function(error, response, body)
    {
        console.log(body);
        var obj = JSON.parse(body);
        console.log("Response=",obj)
    });


}
exports.sjuBuildingNoiseLevel = function(){

    setInterval(function Get_Data() {
        console.log("Sound-Data");
        generateNoiseData();
    }, 5000);
};
