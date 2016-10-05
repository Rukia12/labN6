'use strict';

///function round (num, prec) {
///  return parseFloat(num.toFixed(prec));
///};

//Here's what Jo wants on the data page: for each location, a list that looks exactly like this example:
///Pike Place Market
////6:00am: 86.4 lbs [23 customers, 27.6 cups (1.4 lbs), 85 lbs to-go]
///7:00am: 191.1 lbs [51 customers, 61.2 cups (3.1 lbs), 188 lbs to-go]
///8:00am etc., same kind of thing calculated for each hour
///9:00am etc.
///all the way to
///8:00pm: 51.1 lbs [21 customers, 61.2 cups (3.1 lbs), 48 lbs to-go]
///Total customers at Pike Place Market: 235
///Total cups sold at Pike Place Market: 189
///Total to-go pound packages sold at Pike Place Market: 26
///Total pounds of beans needed at Pike Place Market: 38.4//

var pikePlaceMarket = {
  location: 'Pike Place Market',
  minCust: 14,
  maxCust: 35,
  averageCups: 1.2,
  toGoPounds: 0.34,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
  custPerHour: [],
  custPerDay: 0,
  cupsPerHour: [],
  cupsPerDay: 0,
  employeesPerHour: [],
  employeesPerDay: 0,
///////// looking for more information/////
  beansUsedCupsPerHour: [],
  beansUsedCupsPerDay: 0,
  averagetotalLbsPerHour:[],
  averagetotalLbsPerDay: 0,
  toGoPerHour: [],
  toGoPerDay: 0,

//random number of customers//
  getRandomCustomer: function(min ,max) {
    return Math.floor(Math.random() * (max - min) + min);

  },
  //calculateCustomersPerHour
  //Total customers = 235 (# of customers* 16 hours open)
  //(work backwards) getRandom: function(min,max) {
  //  return (Math.floor(Math.random() * ( max - min ) + min) );

  generateCustomerData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.custPerHour.push(this.getRandomCustomer(this.minCust, this.maxCust));
      this.custPerDay += this.custPerHour[i];
    }
  },

//cups/hr/loc
  //for (var i=0; i<hours.length; i++) {
  //  return [i];
  generateCupsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.cupsPerHour.push(Math.ceil(this.custPerHour[i] * this.averageCups));
      this.cupsPerDay += this.cupsPerHour[i];
    }
  },

  generateEmployeeData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.employeesPerHour.push(Math.ceil(this.custPerHour[i] / 30));
      this.employeesPerDay += this.employeesPerHour[i];
    }
  },

//total amount of beans 1lb = 16cups; per hr/daily/loc total then company total
///calulate avg lbs per hour using the cups + to-go lbs divide by 2  //

///cups per hour divide 16cups per pound + to go lbs///
//Total pounds of beans 38.4 Pike place = at every hour of averagetotalLbsPerHour

//first calc the lbs per hour for the number of cups//
  generatebeansUsedCupsPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.beansUsedCupsPerHour.push(parseFloat((this.cupsPerHour[i] / 16).toFixed(2)));
      this.beansUsedCupsPerDay += this.beansUsedCupsPerHour[i];
    }
  },

////calculate the to-go
  generatetoGoPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.toGoPerHour.push(parseFloat((this.custPerHour[i] * this.toGoPounds).toFixed(2)));
      this.toGoPerDay += this.toGoPerHour[i];
    }
  },

///add the lbs used for cups + to go lbs//

  generateaveragetotalLbsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.averagetotalLbsPerHour.push(parseFloat((this.beansUsedCupsPerHour[i] + this.toGoPerHour[i]).toFixed(2)));
      this.averagetotalLbsPerDay += this.averagetotalLbsPerHour[i];
    }
  },
///8:00pm: 51.1 lbs [21 customers, 61.2 cups (3.1 lbs), 48 lbs to-go]
//Total customers at Pike Place Market: 235
//Total cups sold at Pike Place Market: 189
//Total to-go pound packages sold at Pike Place Market: 26
//Total pounds of beans needed at Pike Place Market: 38.4/
//message += <p>'hours[i]' + ':' + totalPounds +'[PikePlace[customers], PikePlace[cups],PikePlace[pounds],PikePlace[to-go]]'</p>;
//employees per hour each location each hour//each customer=2minutes//Math.floor
// 60minutes an hour /2minutes = 30 customers served/hr * 15 hours = 450
};

//Total cups = 189
//(work backwards) cups/hr * 15 (no of hours open)

pikePlaceMarket.generateCustomerData();
pikePlaceMarket.generateCupsData();
pikePlaceMarket.generatetoGoPerHourData();
pikePlaceMarket.generatebeansUsedCupsPerHourData();
pikePlaceMarket.generateaveragetotalLbsData();
pikePlaceMarket.generateEmployeeData();

///////////Rendering to the DOM/////////
var pikePlaceMarketEl = document.getElementById('pikePlaceMarket');
for (var i = 0; i < pikePlaceMarket.hours.length; i++) {
  var pikePlaceMarketLi = document.createElement('li');
  pikePlaceMarketLi.textContent = pikePlaceMarket.hours[i] + ':' + pikePlaceMarket.averagetotalLbsPerHour[i] + ' lbs ' + '[' + pikePlaceMarket.custPerHour[i] + ' customers, ' + pikePlaceMarket.cupsPerHour[i] + ' cups,' + '(' + pikePlaceMarket.beansUsedCupsPerHour[i] + ' lbs), ' + pikePlaceMarket.toGoPerHour[i] + ' lbs to-go]';
  pikePlaceMarketEl.appendChild(pikePlaceMarketLi);
}

var totalpikecustperdayLi = document.createElement('li');
totalpikecustperdayLi.textContent = 'Total Cusomers at Pike Place: ' + pikePlaceMarket.custPerDay;
pikePlaceMarketEl.appendChild(totalpikecustperdayLi);

var totalpikecupsperdayLi = document.createElement('li');
totalpikecupsperdayLi.textContent = 'Total cups sold at Pike Place Market: ' + parseFloat(pikePlaceMarket.cupsPerDay).toFixed(2);
pikePlaceMarketEl.appendChild(totalpikecupsperdayLi);

var totalpiketogoLi = document.createElement('li');
totalpiketogoLi.textContent = 'Total to-go pound packages sold at Pike Place Market: ' + parseFloat(pikePlaceMarket.toGoPerDay).toFixed(2);
pikePlaceMarketEl.appendChild(totalpiketogoLi);

var totalpikebeansLi = document.createElement('li');
totalpikebeansLi.textContent = 'Total pounds of beans needed at Pike Place Market: ' + parseFloat(pikePlaceMarket.averagetotalLbsPerDay).toFixed(2);
pikePlaceMarketEl.appendChild(totalpikebeansLi);

///////////Capitol Hill/////////////
////////////////////////////////////

var capitolHill = {
  location: 'CapitolHill',
  minCust: 12,
  maxCust: 28,
  averageCups: 3.2,
  toGoPounds: 0.03,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
  custPerHour: [],
  custPerDay: 0,
  cupsPerHour: [],
  cupsPerDay: 0,
  employeesPerHour: [],
  employeesPerDay: 0,
///////// looking for more information/////
  beansUsedCupsPerHour: [],
  beansUsedCupsPerDay: 0,
  averagetotalLbsPerHour:[],
  averagetotalLbsPerDay: 0,
  toGoPerHour: [],
  toGoPerDay: 0,

//random number of customers//
  getRandomCustomer: function(min ,max) {
    return Math.floor(Math.random() * (max - min) + min);

  },
  //calculateCustomersPerHour
  //Total customers = 235 (# of customers* 16 hours open)
  //(work backwards) getRandom: function(min,max) {
  //  return (Math.floor(Math.random() * ( max - min ) + min) );

  generateCustomerData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.custPerHour.push(this.getRandomCustomer(this.minCust, this.maxCust));
      this.custPerDay += this.custPerHour[i];
    }
  },

//cups/hr/loc
  //for (var i=0; i<hours.length; i++) {
  //  return [i];
  generateCupsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.cupsPerHour.push(Math.ceil(this.custPerHour[i] * this.averageCups));
      this.cupsPerDay += this.cupsPerHour[i];
    }
  },

  generateEmployeeData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.employeesPerHour.push(Math.ceil(this.custPerHour[i] / 30));
      this.employeesPerDay += this.employeesPerHour[i];
    }
  },

//total amount of beans 1lb = 16cups; per hr/daily/loc total then company total
///calulate avg lbs per hour using the cups + to-go lbs divide by 2  //

///cups per hour divide 16cups per pound + to go lbs///
// at every hour of averagetotalLbsPerHour

//first calc the lbs per hour for the number of cups//
  generatebeansUsedCupsPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.beansUsedCupsPerHour.push(parseFloat((this.cupsPerHour[i] / 16).toFixed(2)));
      this.beansUsedCupsPerDay += this.beansUsedCupsPerHour[i];
    }
  },

////calculate the to-go
  generatetoGoPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.toGoPerHour.push(parseFloat((this.custPerHour[i] * this.toGoPounds).toFixed(2)));
      this.toGoPerDay += this.toGoPerHour[i];
    }
  },

///add the lbs used for cups + to go lbs//

  generateaveragetotalLbsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.averagetotalLbsPerHour.push(parseFloat((this.beansUsedCupsPerHour[i] + this.toGoPerHour[i]).toFixed(2)));
      this.averagetotalLbsPerDay += this.averagetotalLbsPerHour[i];
    }
  },


//message += <p>'hours[i]' + ':' + totalPounds +'[PikePlace[customers], PikePlace[cups],PikePlace[pounds],PikePlace[to-go]]'</p>;
//employees per hour each location each hour//each customer=2minutes//Math.floor
// 60minutes an hour /2minutes = 30 customers served/hr * 15 hours = 450
};

//Total cups = 189
//(work backwards) cups/hr * 15 (no of hours open)

capitolHill.generateCustomerData();
capitolHill.generateCupsData();
capitolHill.generatetoGoPerHourData();
capitolHill.generatebeansUsedCupsPerHourData();
capitolHill.generateaveragetotalLbsData();
capitolHill.generateEmployeeData();


///////////Rendering to the DOM/////////
var capitolHillEl = document.getElementById('capitolHill');

for (i = 0; i < capitolHill.hours.length; i++) {
  var capitolHillLi = document.createElement('li');
  capitolHillLi.textContent = capitolHill.hours[i] + ':' + capitolHill.averagetotalLbsPerHour[i] + ' lbs ' + '[' + capitolHill.custPerHour[i] + ' customers, ' + capitolHill.cupsPerHour[i] + ' cups,' + '(' + capitolHill.beansUsedCupsPerHour[i] + ' lbs), ' + capitolHill.toGoPerHour[i] + ' lbs to-go]';
  capitolHillEl.appendChild(capitolHillLi);
}

var totalcaphillcustperdayLi = document.createElement('li');
totalcaphillcustperdayLi.textContent = 'Total Cusomers at Capitol Hill: ' + capitolHill.custPerDay;
capitolHillEl.appendChild(totalcaphillcustperdayLi);

var totalcaphillcupsperdayLi = document.createElement('li');
totalcaphillcupsperdayLi.textContent = 'Total cups sold at Capitol Hill: ' + parseFloat(capitolHill.cupsPerDay).toFixed(2);
capitolHillEl.appendChild(totalcaphillcupsperdayLi);

var totalcaphilltogoperdayLi = document.createElement('li');
totalcaphilltogoperdayLi.textContent = 'Total to-go pound packages sold at CapitolHill: ' + parseFloat(capitolHill.toGoPerDay).toFixed(2);
capitolHillEl.appendChild(totalcaphilltogoperdayLi);

var totalcaphillbeansperdayLi = document.createElement('li');
totalcaphillbeansperdayLi.textContent = 'Total pounds of beans needed at Capitol Hill: ' + parseFloat(capitolHill.averagetotalLbsPerDay).toFixed(2);
capitolHillEl.appendChild(totalcaphillbeansperdayLi);

////////Seattle Public Library////////
/////////////////////////////////////

var seattlePublicLibrary = {
  location: 'Seattle Public Library',
  minCust: 9,
  maxCust: 45,
  averageCups: 2.6,
  toGoPounds: 0.02,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
  custPerHour: [],
  custPerDay: 0,
  cupsPerHour: [],
  cupsPerDay: 0,
  employeesPerHour: [],
  employeesPerDay: 0,
  ///////// looking for more information/////
  beansUsedCupsPerHour: [],
  beansUsedCupsPerDay: 0,
  averagetotalLbsPerHour:[],
  averagetotalLbsPerDay: 0,
  toGoPerHour: [],
  toGoPerDay: 0,

  //random number of customers//
  getRandomCustomer: function(min ,max) {
    return Math.floor(Math.random() * (max - min) + min);

  },
    //calculateCustomersPerHour
    //Total customers = 235 (# of customers* 16 hours open)
    //(work backwards) getRandom: function(min,max) {
    //  return (Math.floor(Math.random() * ( max - min ) + min) );

  generateCustomerData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.custPerHour.push(this.getRandomCustomer(this.minCust, this.maxCust));
      this.custPerDay += this.custPerHour[i];
    }
  },

  //cups/hr/loc
    //for (var i=0; i<hours.length; i++) {
    //  return [i];
  generateCupsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.cupsPerHour.push(Math.ceil(this.custPerHour[i] * this.averageCups));
      this.cupsPerDay += this.cupsPerHour[i];
    }
  },

  generateEmployeeData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.employeesPerHour.push(Math.ceil(this.custPerHour[i] / 30));
      this.employeesPerDay += this.employeesPerHour[i];
    }
  },

  //total amount of beans 1lb = 16cups; per hr/daily/loc total then company total
  ///calulate avg lbs per hour using the cups + to-go lbs divide by 2  //

  ///cups per hour divide 16cups per pound + to go lbs///
  // at every hour of averagetotalLbsPerHour

  //first calc the lbs per hour for the number of cups//
  generatebeansUsedCupsPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.beansUsedCupsPerHour.push(parseFloat((this.cupsPerHour[i] / 16).toFixed(2)));
      this.beansUsedCupsPerDay += this.beansUsedCupsPerHour[i];
    }
  },

  ////calculate the to-go
  generatetoGoPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.toGoPerHour.push(parseFloat((this.custPerHour[i] * this.toGoPounds).toFixed(2)));
      this.toGoPerDay += this.toGoPerHour[i];
    }
  },

  ///add the lbs used for cups + to go lbs//

  generateaveragetotalLbsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.averagetotalLbsPerHour.push(parseFloat((this.beansUsedCupsPerHour[i] + this.toGoPerHour[i]).toFixed(2)));
      this.averagetotalLbsPerDay += this.averagetotalLbsPerHour[i];
      console.log(this.beansUsedCupsPerHour[i]);
    }
  },


  //message += <p>'hours[i]' + ':' + totalPounds +'[PikePlace[customers], PikePlace[cups],PikePlace[pounds],PikePlace[to-go]]'</p>;
  //employees per hour each location each hour//each customer=2minutes//Math.floor
  // 60minutes an hour /2minutes = 30 customers served/hr * 15 hours = 450
};

  //Total cups = 189
  //(work backwards) cups/hr * 15 (no of hours open)

seattlePublicLibrary.generateCustomerData();
seattlePublicLibrary.generateCupsData();
seattlePublicLibrary.generatetoGoPerHourData();
seattlePublicLibrary.generatebeansUsedCupsPerHourData();
seattlePublicLibrary.generateaveragetotalLbsData();
seattlePublicLibrary.generateEmployeeData();


  ///////////Rendering to the DOM/////////
var seattlePublicLibraryEl = document.getElementById('seattlePublicLibrary');

for (i = 0; i < seattlePublicLibrary.hours.length; i++) {
  var seattlePublicLibraryLi = document.createElement('li');
  seattlePublicLibraryLi.textContent = seattlePublicLibrary.hours[i] + ':' + seattlePublicLibrary.averagetotalLbsPerHour[i] + ' lbs ' + '[' + seattlePublicLibrary.custPerHour[i] + ' customers, ' + seattlePublicLibrary.cupsPerHour[i] + ' cups,' + '(' + seattlePublicLibrary.beansUsedCupsPerHour[i] + ' lbs), ' + seattlePublicLibrary.toGoPerHour[i] + ' lbs to-go]';
  seattlePublicLibraryEl.appendChild(seattlePublicLibraryLi);
}

var totalSPLcustperdayLi = document.createElement('li');
totalSPLcustperdayLi.textContent = 'Total Cusomers at Seattle Public Library: ' + seattlePublicLibrary.custPerDay;
seattlePublicLibraryEl.appendChild(totalSPLcustperdayLi);

var totalSPLcupsperdayLi = document.createElement('li');
totalSPLcupsperdayLi.textContent = 'Total cups sold at Seattle Public Library:: ' + parseFloat(seattlePublicLibrary.cupsPerDay).toFixed(2);
seattlePublicLibraryEl.appendChild(totalSPLcupsperdayLi);

var totalSPLtogoperdayLi = document.createElement('li');
totalSPLtogoperdayLi.textContent = 'Total to-go pound packages sold at Seattle Public Library:: ' + parseFloat(seattlePublicLibrary.toGoPerDay).toFixed(2);
seattlePublicLibraryEl.appendChild(totalSPLtogoperdayLi);

var totalSPLbeansperdayLi = document.createElement('li');
totalSPLbeansperdayLi.textContent = 'Total pounds of beans needed at Seattle Public Library: ' + parseFloat(seattlePublicLibrary.averagetotalLbsPerDay).toFixed(2);
seattlePublicLibraryEl.appendChild(totalSPLbeansperdayLi);


//////////////South Lake Union//////////////
///////////////////////////////////////////

var southLakeUnion = {
  location: 'South Lake Union',
  minCust: 5,
  maxCust: 18,
  averageCups: 1.3,
  toGoPounds: 0.04,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
  custPerHour: [],
  custPerDay: 0,
  cupsPerHour: [],
  cupsPerDay: 0,
  employeesPerHour: [],
  employeesPerDay: 0,
  ///////// looking for more information/////
  beansUsedCupsPerHour: [],
  beansUsedCupsPerDay: 0,
  averagetotalLbsPerHour:[],
  averagetotalLbsPerDay: 0,
  toGoPerHour: [],
  toGoPerDay: 0,

  //random number of customers//
  getRandomCustomer: function(min ,max) {
    return Math.floor(Math.random() * (max - min) + min);

  },
    //calculateCustomersPerHour
    //Total customers = 235 (# of customers* 16 hours open)
    //(work backwards) getRandom: function(min,max) {
    //  return (Math.floor(Math.random() * ( max - min ) + min) );

  generateCustomerData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.custPerHour.push(this.getRandomCustomer(this.minCust, this.maxCust));
      this.custPerDay += this.custPerHour[i];
    }
  },

  //cups/hr/loc
    //for (var i=0; i<hours.length; i++) {
    //  return [i];
  generateCupsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.cupsPerHour.push(Math.ceil(this.custPerHour[i] * this.averageCups));
      this.cupsPerDay += this.cupsPerHour[i];
    }
  },

  generateEmployeeData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.employeesPerHour.push(Math.ceil(this.custPerHour[i] / 30));
      this.employeesPerDay += this.employeesPerHour[i];
    }
  },

  //total amount of beans 1lb = 16cups; per hr/daily/loc total then company total
  ///calulate avg lbs per hour using the cups + to-go lbs divide by 2  //

  ///cups per hour divide 16cups per pound + to go lbs///
  // at every hour of averagetotalLbsPerHour

  //first calc the lbs per hour for the number of cups//
  generatebeansUsedCupsPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.beansUsedCupsPerHour.push(parseFloat((this.cupsPerHour[i] / 16).toFixed(2)));
      this.beansUsedCupsPerDay += this.beansUsedCupsPerHour[i];
    }
  },

  ////calculate the to-go
  generatetoGoPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.toGoPerHour.push(parseFloat((this.custPerHour[i] * this.toGoPounds).toFixed(2)));
      this.toGoPerDay += this.toGoPerHour[i];
    }
  },

  ///add the lbs used for cups + to go lbs//

  generateaveragetotalLbsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.averagetotalLbsPerHour.push(parseFloat((this.beansUsedCupsPerHour[i] + this.toGoPerHour[i]).toFixed(2)));
      this.averagetotalLbsPerDay += this.averagetotalLbsPerHour[i];
      console.log(this.beansUsedCupsPerHour[i]);
    }
  },


  //message += <p>'hours[i]' + ':' + totalPounds +'[PikePlace[customers], PikePlace[cups],PikePlace[pounds],PikePlace[to-go]]'</p>;
  //employees per hour each location each hour//each customer=2minutes//Math.floor
  // 60minutes an hour /2minutes = 30 customers served/hr * 15 hours = 450
};

  //Total cups = 189
  //(work backwards) cups/hr * 15 (no of hours open)

southLakeUnion.generateCustomerData();
southLakeUnion.generateCupsData();
southLakeUnion.generatetoGoPerHourData();
southLakeUnion.generatebeansUsedCupsPerHourData();
southLakeUnion.generateaveragetotalLbsData();
southLakeUnion.generateEmployeeData();


  ///////////Rendering to the DOM/////////
var southLakeUnionEl = document.getElementById('southLakeUnion');

for (i = 0; i < southLakeUnion.hours.length; i++) {
  var southLakeUnionLi = document.createElement('li');
  southLakeUnionLi.textContent = southLakeUnion.hours[i] + ':' + southLakeUnion.averagetotalLbsPerHour[i] + ' lbs ' + '[' + southLakeUnion.custPerHour[i] + ' customers, ' + southLakeUnion.cupsPerHour[i] + ' cups,' + '(' + southLakeUnion.beansUsedCupsPerHour[i] + ' lbs), ' + southLakeUnion.toGoPerHour[i] + ' lbs to-go]';
  southLakeUnionEl.appendChild(southLakeUnionLi);
}

var totalSLUcustperdayLi = document.createElement('li');
totalSLUcustperdayLi.textContent = 'Total Cusomers at South Lake Union: ' + southLakeUnion.custPerDay;
southLakeUnionEl.appendChild(totalSLUcustperdayLi);

var totalSLUcupsperdayLi = document.createElement('li');
totalSLUcupsperdayLi.textContent = 'Total cups sold at South Lake Union:: ' + parseFloat(southLakeUnion.cupsPerDay).toFixed(2);
southLakeUnionEl.appendChild(totalSLUcupsperdayLi);

var totalSLUtogoperdayLi = document.createElement('li');
totalSLUtogoperdayLi.textContent = 'Total to-go pound packages sold at South Lake Union: ' + parseFloat(southLakeUnion.toGoPerDay).toFixed(2);
southLakeUnionEl.appendChild(totalSLUtogoperdayLi);

var totalSLUbeansperdayLi = document.createElement('li');
totalSLUbeansperdayLi.textContent = 'Total pounds of beans needed at South Lake Union: ' + parseFloat(southLakeUnion.averagetotalLbsPerDay).toFixed(2);
southLakeUnionEl.appendChild(totalSLUbeansperdayLi);


//////Sea-tac Airport///////////
////////////////////////////////

var seatacAirport = {
  location: 'Seatac Airport',
  minCust: 28,
  maxCust: 44,
  averageCups: 1.1,
  toGoPounds: 0.41,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
  custPerHour: [],
  custPerDay: 0,
  cupsPerHour: [],
  cupsPerDay: 0,
  employeesPerHour: [],
  employeesPerDay: 0,
  ///////// looking for more information/////
  beansUsedCupsPerHour: [],
  beansUsedCupsPerDay: 0,
  averagetotalLbsPerHour:[],
  averagetotalLbsPerDay: 0,
  toGoPerHour: [],
  toGoPerDay: 0,

  //random number of customers//
  getRandomCustomer: function(min ,max) {
    return Math.floor(Math.random() * (max - min) + min);

  },
    //calculateCustomersPerHour
    //Total customers = 235 (# of customers* 16 hours open)
    //(work backwards) getRandom: function(min,max) {
    //  return (Math.floor(Math.random() * ( max - min ) + min) );

  generateCustomerData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.custPerHour.push(this.getRandomCustomer(this.minCust, this.maxCust));
      this.custPerDay += this.custPerHour[i];
    }
  },

  //cups/hr/loc
    //for (var i=0; i<hours.length; i++) {
    //  return [i];
  generateCupsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.cupsPerHour.push(Math.ceil(this.custPerHour[i] * this.averageCups));
      this.cupsPerDay += this.cupsPerHour[i];
    }
  },

  generateEmployeeData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.employeesPerHour.push(Math.ceil(this.custPerHour[i] / 30));
      this.employeesPerDay += this.employeesPerHour[i];
    }
  },

  //total amount of beans 1lb = 16cups; per hr/daily/loc total then company total
  ///calulate avg lbs per hour using the cups + to-go lbs divide by 2  //

  ///cups per hour divide 16cups per pound + to go lbs///
  // at every hour of averagetotalLbsPerHour

  //first calc the lbs per hour for the number of cups//
  generatebeansUsedCupsPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.beansUsedCupsPerHour.push(parseFloat((this.cupsPerHour[i] / 16).toFixed(2)));
      this.beansUsedCupsPerDay += this.beansUsedCupsPerHour[i];
    }
  },

  ////calculate the to-go
  generatetoGoPerHourData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.toGoPerHour.push(parseFloat((this.custPerHour[i] * this.toGoPounds).toFixed(2)));
      this.toGoPerDay += this.toGoPerHour[i];
    }
  },

  ///add the lbs used for cups + to go lbs//

  generateaveragetotalLbsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.averagetotalLbsPerHour.push(parseFloat((this.beansUsedCupsPerHour[i] + this.toGoPerHour[i]).toFixed(2)));
      this.averagetotalLbsPerDay += this.averagetotalLbsPerHour[i];
      console.log(this.beansUsedCupsPerHour[i]);
    }
  },


  //message += <p>'hours[i]' + ':' + totalPounds +'[PikePlace[customers], PikePlace[cups],PikePlace[pounds],PikePlace[to-go]]'</p>;
  //employees per hour each location each hour//each customer=2minutes//Math.floor
  // 60minutes an hour /2minutes = 30 customers served/hr * 15 hours = 450
};

///Additional information needed: total daily cups/to-go/beans per location and companywide


seatacAirport.generateCustomerData();
seatacAirport.generateCupsData();
seatacAirport.generatetoGoPerHourData();
seatacAirport.generatebeansUsedCupsPerHourData();
seatacAirport.generateaveragetotalLbsData();
seatacAirport.generateEmployeeData();


  ///////////Rendering to the DOM/////////
var seatacAirportEl = document.getElementById('seatacAirport');

for (i = 0; i < seatacAirport.hours.length; i++) {
  var seatacAirportLi = document.createElement('li');
  seatacAirportLi.textContent = seatacAirport.hours[i] + ':' + seatacAirport.averagetotalLbsPerHour[i] + ' lbs ' + '[' + seatacAirport.custPerHour[i] + ' customers, ' + seatacAirport.cupsPerHour[i] + ' cups,' + '(' + seatacAirport.beansUsedCupsPerHour[i] + ' lbs), ' + seatacAirport.toGoPerHour[i] + ' lbs to-go]';
  seatacAirportEl.appendChild(seatacAirportLi);
}

var totalSEATACcustperdayLi = document.createElement('li');
totalSEATACcustperdayLi.textContent = 'Total Cusomers at Seatac: ' + seatacAirport.custPerDay;
seatacAirportEl.appendChild(totalSEATACcustperdayLi);

var totalSEATACcupsperdayLi = document.createElement('li');
totalSEATACcupsperdayLi.textContent = 'Total cups sold at Seatac: ' + parseFloat(seatacAirport.cupsPerDay).toFixed(2);
seatacAirportEl.appendChild(totalSEATACcupsperdayLi);

var totalSEATACtogoperdayLi = document.createElement('li');
totalSEATACtogoperdayLi.textContent = 'Total to-go pound packages sold at Seatac: ' + parseFloat(seatacAirport.toGoPerDay).toFixed(2);
seatacAirportEl.appendChild(totalSEATACtogoperdayLi);

var totalSEATACbeansperdayLi = document.createElement('li');
totalSEATACbeansperdayLi.textContent = 'Total pounds of beans needed at Seatac: ' + parseFloat(seatacAirport.averagetotalLbsPerDay).toFixed(2);
seatacAirportEl.appendChild(totalSEATACbeansperdayLi);
