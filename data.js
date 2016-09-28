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

var PikePlace = {
  min: 14,
  max: 35,
  cups: 1.2,
  totalBeans: 0.34,
  hours: [6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9]

//random number of customers//
  getRandom: function(min,max) {
    return (Math.floor(Math.random() * ( max - min ) + min) );
  }
//cups/hr/loc//
  for (var i=0; i<hours.length; i++) {
    return [i];
  }
};
//total amount of beans 1lb = 16cups; per hr/daily/loc total then company total
//Total pounds of beans 38.4 Pike place
//totalBeans/hour * 15 hours open per location + total for each location

//employees per hour each location each hour//each customer=2minutes//Math.floor

//
