var weather = require('openweather-apis');
var request = require('request');
weather.setLang('en');
// English - en, Russian - ru, Italian - it, Spanish - es (or sp), 
// Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro, 
// Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg, 
// Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn), 
// Turkish - tr, Croatian - hr, Catalan - ca 


// set city by name 
weather.setCity('Seoul');
  // or set the coordinates (latitude,longitude) 
weather.setCoordinate(37.56826, 126.977829);
// or set city by ID (recommended by OpenWeatherMap) 
weather.setCityId(1835848);

// 'metric'  'internal'  'imperial' 
weather.setUnits('metric');

// check http://openweathermap.org/appid#get for get the APPID 
weather.setAPPID("c31c2e791fe27513b7491c70a9cb1b3e");

function sendHumidity(hum){
 // console.log("sendHumidity: ",+ hum.toString());
  console.log(typeof(hum));
  var serverIp='http://localhost:7579/mobius-yt/sejongcampus/humidity'
  // console.log("ServerIP= ",serverIp);
  var headers={
      'Accept': 'application/json',
      'X-M2M-RI': '12345',
      'X-M2M-Origin': 'SOrigin',
      'Content-Type':"application/vnd.onem2m-res+json; ty=4"
  };
  request({
      headers: headers,
      url:serverIp,
      method:'POST',
      body:
          JSON.stringify({"m2m:cin":
              {
                  "con":hum.toString()
              }
          })

  },function(error, response, body)
  {
    if(!error)
    {
      // console.log(body);
      var obj = JSON.parse(body);
      // console.log("Response=",obj)
    }
    else
    {
      // console.log("error is: "+ error);
    }
  });
}
function sendTemprature(temp){
  // console.log("sendTemprature: ",+ temp.toString());
  // console.log(typeof(temp));
  var serverIp='http://localhost:7579/mobius-yt/sejongcampus/temprature'
  // console.log("ServerIP= ",serverIp);
  var headers={
      'Accept': 'application/json',
      'X-M2M-RI': '12345',
      'X-M2M-Origin': 'SOrigin',
      'Content-Type':"application/vnd.onem2m-res+json; ty=4"
  };
  request({
      headers: headers,
      url:serverIp,
      method:'POST',
      body:
          JSON.stringify({"m2m:cin":
              {
                  "con":temp.toString()
              }
          })

  },function(error, response, body)
  {
    if(!error)
    {
      // console.log(body);
      var obj = JSON.parse(body);
      // console.log("Response=",obj)
    }
    else
    {
      // console.log("error is: "+ error);
    }
  });
}
exports.weatherInfo = function(){

    setInterval(function Get_Data() {
        // console.log("Humidity Interval");
        //getWeatherInfo();
        weather.getHumidity(function(err, hum){
        if(!err){
          // console.log("Humidity: %j",hum);
          sendHumidity(hum);          
        }
    });
    }, 10000);
    setInterval(function Get_Data() {
        // console.log("Temprature Interval");
        //getWeatherInfo();
        weather.getTemperature(function(err, temp){
        if(!err){
          // console.log("Temprature: %j",temp);
          sendTemprature(temp);
        }
    });
    }, 15000);
};
