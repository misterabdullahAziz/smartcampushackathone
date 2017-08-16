var weather = require('./weather.js');
weather.weatherInfo();

//Komal work Noise Level

var noise=require('./NoiseLevelSejongCampus.js');
noise.sjuBuildingNoiseLevel();

//Haris work No Of People
var sju = require("./sju_buildings");
sju.calculatePeople();

//CO2 data and work
var co2 = require("./CO2Daemon.js");
co2.calculateco2();