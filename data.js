'use strict';

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
  averagePounds: 0.34,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
  custPerHour: [],
  custPerDay: 0,
  cupsPerHour: [],
  cupsPerDay: 0,
  lbsPerHour: [],
  lbsPerDay: 0,
  employeesPerHour: [],
  employeesPerDay: 0,

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
  //

  generateCupsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.cupsPerHour.push(this.custPerHour[i] * this.averageCups);
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
//Total pounds of beans 38.4 Pike place
//totalBeans/hour * 15 hours open per location + total for each location
  generateLbsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.lbsPerHour.push(this.custPerHour[i] * this.averagePounds);
      this.lbsPerDay += this.lbsPerHour[i];
    }
  },

//message += <p>'hours[i]' + ':' + totalPounds +'[PikePlace[customers], PikePlace[cups],PikePlace[pounds],PikePlace[to-go]]'</p>;
//employees per hour each location each hour//each customer=2minutes//Math.floor
// 60minutes an hour /2minutes = 30 customers served/hr * 15 hours = 450

};
//Total cups = 189
//(work backwards) cups/hr * 15 (no of hours open)

pikePlaceMarket.generateCustomerData();
pikePlaceMarket.generateCupsData();
pikePlaceMarket.generateLbsData();
pikePlaceMarket.generateEmployeeData();

///////////Capitol Hill/////////////
////////////////////////////////////

var capitolHill = {
  location: 'Capitol Hill',
  minCust: 12,
  maxCust: 28,
  averageCups: 3.2,
  averagePounds: 0.03,
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
  custPerHour: [],
  custPerDay: 0,
  cupsPerHour: [],
  cupsPerDay: 0,
  lbsPerHour: [],
  lbsPerDay: 0,
  employeesPerHour: [],
  employeesPerDay: 0,

//random number of customers//
  getRandomCustomer: function(min ,max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
//calculateCustomersPerHour//(# of customers* 16 hours open)
    // getRandom: function(min,max) {
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
      this.cupsPerHour.push(this.custPerHour[i] * this.averageCups);
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
  //Total pounds of beans 38.4 Pike place
  //totalBeans/hour * 15 hours open per location + total for each location
  generateLbsData: function() {
    for (var i = 0; i < this.hours.length; i++) {
      this.lbsPerHour.push(this.custPerHour[i] * this.averagePounds);
      this.lbsPerDay += this.lbsPerHour[i];
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
capitolHill.generateLbsData();
capitolHill.generateEmployeeData();
