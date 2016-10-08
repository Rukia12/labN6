///Constructor Function////"Here goes"//

'use strict';

//function round(num, prec) {
//  return parseFloat(num.toFixed(prec));
//}

var allcoffeeShop = [];

function coffeeShop (location,mincustomer,maxcustomer,cups,toGoPounds) {
  this.location = location;
  this.mincustomer = mincustomer;
  this.maxcustomer = maxcustomer;
  this.cups = cups;
  this.toGoPounds = toGoPounds;
  this.hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
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
  this.totalPoundsPerHour = [],
  this.totalPoundsPerDay = 0,
  allcoffeeShop.push(this);
}

var PikePlaceMarket = new coffeeShop('Pike', 14, 35, 1.2, 0.34);
var CapitolHill = new coffeeShop('CapitolHill', 12, 28, 3.2, 0.03);
var SeattlePublicLibrary = new coffeeShop('SeattlePublicLibrary', 9, 45, 2.6, 0.02);
var SouthLakeUnion = new coffeeShop('SouthLakeUnion', 5, 18, 1.3, 0.04);
var SeatacAirport = new coffeeShop('SeatacAirport', 28, 44, 1.1, 0.41);

//first calc the lbs per hour for the number of cups//

coffeeShop.prototype.generatebeansUsedCupsPerHourData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.beansUsedCupsPerHour.push(parseFloat((this.cupsPerHour[i] / 16).toFixed(2)));
    this.beansUsedCupsPerDay += this.beansUsedCupsPerHour[i];
  }
},


////calculate the to-go
coffeeShop.prototype.generatetoGoPerHourData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.toGoPerHour.push(parseFloat((this.custPerHour[i] * this.toGoPounds).toFixed(2)));
    this.toGoPerDay += this.toGoPerHour[i];
  }
},


///add the lbs used for cups + to go lbs//

coffeeShop.prototype.generateaveragetotalLbsData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.averagetotalLbsPerHour.push(parseFloat((this.beansUsedCupsPerHour[i] + this.toGoPerHour[i]).toFixed(2)));
    this.averagetotalLbsPerDay += this.averagetotalLbsPerHour[i];
  }
},

////employees///
coffeeShop.prototype.generateEmployeeData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.employeesPerHour.push(Math.ceil(this.custPerHour[i] / 30));
    this.employeesPerDay += this.employeesPerHour[i];
  }
};



function makeAllTheThings() {
  for (var i = 0; i < allcoffeShop.length; i++) {
    allcoffeShop[i].doAllTheMethods();
  }
}

makeAllTheThings();

//get reference to table element
var tableEl = document.getElementById('generated-table');

function makeRow(obj) {
  //make a row
  var rowEl = document.createElement('tr');

  //REPEAT THIS PART
    //make a cell
  var nameCell = document.createElement('td');
    //give content to cell
  nameCell.textContent = obj.name;
    //append cell to the row
  rowEl.appendChild(nameCell);

  var priceCell = document.createElement('td');
  priceCell.textContent = obj.price;
  rowEl.appendChild(priceCell);

  var taxEl = document.createElement('td');
  taxEl.textContent = obj.tax;
  rowEl.appendChild(taxEl);

  var totalEl = document.createElement('td');
  totalEl.textContent = obj.total;
  rowEl.appendChild(totalEl);

  //append row to the table
  tableEl.appendChild(rowEl);
}

function makeTable() {
  for (var item of allItems) {

    makeRow(item);
  }
}

makeTable();
