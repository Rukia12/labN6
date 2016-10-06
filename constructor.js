///Constructor Function////"Here goes"//

'use strict';

function round(num, prec) {
  return parseFloat(num.toFixed(prec));
}

var allcoffeShop = [];

function coffeeShop (location,customer,cups,pounds,hours) {
  this.location = location;
  this.customer = customer;
  this.cups = cups;
  this.poundsPercup = poundsPerCup;
  this.hours = hours;
  this.custPerHour = [],
  this.custPerDay = 0,
  this.cupsPerHour = [],
  this.cupsPerDay = 0,
  this.beansUsedCupsPerHour = [],
  this.beansUsedCupsPerDay = 0,
  this.togoPerHour = [],
  this.togoPerDay = 0,
  this.employeesPerHour = [],
  this.employeesPerDay = 0,
  allcoffeShop.push(this);
}
//first calc the lbs per hour for the number of cups//
//  generatebeansUsedCupsPerHourData: function() {
//    for (var i = 0; i < this.hours.length; i++) {
//      this.beansUsedCupsPerHour.push(parseFloat((this.cupsPerHour[i] / 16).toFixed(2)));
//      this.beansUsedCupsPerDay += this.beansUsedCupsPerHour[i];
//    }
//  },

Item.prototype.calcbeansUsedCupsPerHourData = function () {
  this.beansUsedCupsPerHour = round((this.cupsPerHour[i] / 16), 2);
};

////calculate the to-go
//  generatetoGoPerHourData: function() {
//    for (var i = 0; i < this.hours.length; i++) {
//      this.toGoPerHour.push(parseFloat((this.custPerHour[i] * this.toGoPounds).toFixed(2)));
//      this.toGoPerDay += this.toGoPerHour[i];
//    }
//  },

Item.prototype.calctoGoPerHourData = function () {
  this.toGoPerHour = round ((this.toGoPerHour[i]), 2);
};

///add the lbs used for cups + to go lbs//

//  generateaveragetotalLbsData: function() {
//    for (var i = 0; i < this.hours.length; i++) {
//      this.averagetotalLbsPerHour.push(parseFloat((this.beansUsedCupsPerHour[i] + this.toGoPerHour[i]).toFixed(2)));
//      this.averagetotalLbsPerDay += this.averagetotalLbsPerHour[i];
//    }
//  },

Item.prototype.calcaveragetotalLbsData = function () {
  this.toGoPerHour = round ((this.beansUsedCupsPerHour[i] + this.toGoPerHour[i]), 2);
};

////employees///
//generateEmployeeData: function() {
//  for (var i = 0; i < this.hours.length; i++) {
//    this.employeesPerHour.push(Math.ceil(this.custPerHour[i] / 30));
//    this.employeesPerDay += this.employeesPerHour[i];
//  }
//},
Item.prototype.calcEmployeeData = function ()
