/**
 * Created by Mac on 11/08/2017.
 */
var Sejong_buildingsNoiseCapacity={'Jiphyun_gwan':30,'Gunja_gwan':50,  //List of CNT
'Gwanggaeto_gwan':60,
'Sejong_gwan':28,
'Yongduk_gwan':20,
'Yulgok_gwan':19,
'Chungmu_gwan':17,
'Youngsil_gwan':25,
'University_Library':10,
'Student_Building':35};


var Sejong_buildings=[ 'Jiphyun_gwan', 'Gunja_gwan', 'Gwanggaeto_gwan', 'Sejong_gwan', 'Yongduk_gwan', 'Yulgok_gwan', 'Chungmu_gwan', 'Youngsil_gwan', 'University_Library', 'Student_Building'];


var Time={'DayStartTime':'01:00-5:00',
    'DayRiseTime':'05:00-08:00',
    'WorkTime-FirstHalf':'08:00-12:00',
    'BreakTime':'12:00-13:00',
    'WorkTime-SecondHalf': '13:00-17:00',
    'Dayfall':'17:00-20:00',
    'EndDay':'20:00-24:00'};

// var NoiseRange=['20 KHz','20 Hz'];
// var NoiseTypes=['ultrasound','infrasound'];  // infrasound is below 20Hz..... above 20 KHz is ultrasound
var TimeDivision=['DayStartTime','DayRiseTime','WorkTime-FirstHalf','BreakTime','WorkTime-SecondHalf','Dayfall','EndDay'];
function generateNoiseData()
{
    var d=new Date();
    var currentHour=d.getHours();
    //currentHour=23;
    console.log("current Hour= ",currentHour);
    for (var j = 0; j < Sejong_buildings.length; j++)
    {
        var buildingName=Sejong_buildings[j];
        var noiseRange=Sejong_buildingsNoiseCapacity[buildingName];
        var noiseLevel;

        if (currentHour >=1 && currentHour <5)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(5,10));
        }
        else if (currentHour >= 5 && currentHour <8)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(10,25)) ;
        }
        else if (currentHour >=8 && currentHour <12)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(25,50)) ;
        }
        else if (currentHour >=12 && currentHour <17)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(20,25)) ;
        }
        else if (currentHour >=17 && currentHour <20)
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(10,20)) ;
        }
        else
        {
            noiseLevel=getPercentOfValue(noiseRange,getRandomNoiseRange(5,10))
            ;
        }
        noiseLevel=noiseLevel+'db';   //db is sound measurment unit
        if(noiseLevel=='NaNdb')
        {
            noiseLevel='5db';
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
    }, 60000);
};

