///Constructor Function////"Here goes"//

'use strict';

//function round(num, prec) {
//  return parseFloat(num.toFixed(prec));
//}

var allCoffeeShop = [];

function CoffeeShop (location,mincustomer,maxcustomer,cups,toGoPounds) {
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
  this.toGoPerHour = [],
  this.toGoPerDay = 0,
  this.employeesPerHour = [],
  this.employeesPerDay = 0,
  this.totalPoundsPerHour = [],
  this.totalPoundsPerDay = 0,
  this.averagetotalLbsPerHour = [],
  this.averagetotalLbsPerDay = 0,
  allCoffeeShop.push(this);
};

//random number of customers//
CoffeeShop.prototype.getRandomCustomer = function(min ,max) {
  return Math.floor(Math.random() * (max - min) + min);

},

//calculateCustomersPerHour
CoffeeShop.prototype.generateCustomerData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.custPerHour.push(this.getRandomCustomer(this.minCust, this.maxCust));
    this.custPerDay += this.custPerHour[i];
  }
},

//cups/hr/loc
CoffeeShop.prototype.generateCupsData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.cupsPerHour.push(Math.ceil(this.custPerHour[i] * this.averageCups));
    this.cupsPerDay += this.cupsPerHour[i];
  }
},

//first calc the lbs per hour for the number of cups//
CoffeeShop.prototype.generatebeansUsedCupsPerHourData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.beansUsedCupsPerHour.push(parseFloat((this.cupsPerHour[i] / 16).toFixed(2)));
    this.beansUsedCupsPerDay += this.beansUsedCupsPerHour[i];
  }
},

////calculate the to-go
CoffeeShop.prototype.generatetoGoPerHourData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.toGoPerHour.push(parseFloat((this.custPerHour[i] * this.toGoPounds).toFixed(2)));
    this.toGoPerDay += this.toGoPerHour[i];
  }
},


///add the lbs used for cups + to go lbs//
CoffeeShop.prototype.generateaveragetotalLbsData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.averagetotalLbsPerHour.push(parseFloat((this.beansUsedCupsPerHour[i] + this.toGoPerHour[i]).toFixed(2)));
    this.averagetotalLbsPerDay += this.averagetotalLbsPerHour[i];
  }
},

////employees///
CoffeeShop.prototype.generateEmployeeData = function() {
  for (var i = 0; i < this.hours.length; i++) {
    this.employeesPerHour.push(Math.ceil(this.custPerHour[i] / 30));
    this.employeesPerDay += this.employeesPerHour[i];
  }
};

//Helper function//
CoffeeShop.prototype.doAllTheMethods = function () {
  this.generateaveragetotalLbsData();
  this.generateEmployeeData();
};

new CoffeeShop('Pike', 14, 35, 1.2, 0.34);
new CoffeeShop('CapitolHill', 12, 28, 3.2, 0.03);
new CoffeeShop('SeattlePublicLibrary', 9, 45, 2.6, 0.02);
new CoffeeShop('SouthLakeUnion', 5, 18, 1.3, 0.04);
new CoffeeShop('SeatacAirport', 28, 44, 1.1, 0.41);

function makeAllTheMethods() {
  for (var i = 0; i < allCoffeeShop.length; i++) {
    allCoffeeShop[i].doAllTheMethods();
  }
}

makeAllTheMethods();

///Table Time///

///////////Rendering to the DOM/////////
//var pikePlaceMarketEl = document.getElementById('pikePlaceMarket');
//for (var i = 0; i < pikePlaceMarket.hours.length; i++) {
  //var pikePlaceMarketLi = document.createElement('li');
  //pikePlaceMarketLi.textContent = pikePlaceMarket.hours[i] + ':' + pikePlaceMarket.averagetotalLbsPerHour[i] + ' lbs ' + '[' + pikePlaceMarket.custPerHour[i] + ' customers, ' + pikePlaceMarket.cupsPerHour[i] + ' cups,' + '(' + pikePlaceMarket.beansUsedCupsPerHour[i] + ' lbs), ' + pikePlaceMarket.toGoPerHour[i] + ' lbs to-go]';
  //pikePlaceMarketEl.appendChild(pikePlaceMarketLi);
//}
//get reference to table element
var totalPoundsEl = document.getElementById('totalPoundsEl');

function makeRow(obj) {
  //make a row
  var CoffeeShopEl = document.createElement('tr');

  //REPEAT THIS PART,
    //make a cell
  var CoffeeShopCell = document.createElement('td');
    //give content to cell
  CoffeeShopCell.textContent = obj.location;
    //append cell to the row
  CoffeeShopEl.appendChild(CoffeeShopCell);

  var CoffeeShopLbsCell = document.createElement('td');
    //give content to cell
  for (var i = 0; i < allCoffeeShop.length; i++) {
    CoffeeShopCell.textContent = obj.averagetotalLbsPerHour[i];
    //append cell to the row
    CoffeeShopEl.appendChild(CoffeeShopLbsCell);
  }

  /*var priceCell = document.createElement('td');
  priceCell.textContent = obj.CoffeeShop;
  rowEl.appendChild(priceCell);

  var taxEl = document.createElement('td');
  taxEl.textContent = obj.tax;
  rowEl.appendChild(taxEl);*/

  var totalCoffee = document.createElement('td');
  totalEl.textContent = CoffeeShop.averagetotalLbsPerDay;
  CoffeeShopEl.appendChild(totalCoffee);

  //append row to the table
  totalPoundsEl.appendChild(CoffeeShopEl);
}

function makeTable() {
  for (var item in allCoffeeShop) {
    makeRow(CoffeeShop[index]);
  }
}

makeTable();
