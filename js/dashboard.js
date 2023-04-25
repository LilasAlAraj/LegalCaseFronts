/* globals Chart:false, feather:false */

(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

})()

//////////////////////الوقت
function updateTime() {
  var now = new Date();
 // jQuery('#time').val(now.toString());   
  document.getElementById("time").innerHTML=now.toString();
}

setInterval(updateTime, 1000);

/*************************** */
var casesValues = []
var types = ['قضايا رابحة', 'قضايا خاسرة', 'قضايا جارٍ العمل عليها'];
var barColors = [
  "#52b462",
  "#b45d52",
  "#52a0b4"
  
  /*,
  "#e8c3b9",
  "#1e7145",
  "#b9ac1d",
  "#ab0075",
  "#7a0404",
  "#550c57",
  "#8d650f",
  "#081031",
  "#1fee80"*/
];


casesValues[1 - 1] = (5);
casesValues[2 - 1] = (8);
casesValues[3 - 1] = (09);




new Chart("casesChart", {
  type: "doughnut",
  data: {
    labels: types,
    datasets: [{
      backgroundColor: barColors,
      data: casesValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "إحصائيات القضايا"
    }
  }
});



/////////الضغط على إحدى القضايا المضافة مؤخراً
jQuery(document).ready(function($) {
  $(".clickable-row").click(function() {
      window.location = $(this).data("href");
  });
});

//////////import report
var button = document.getElementById("import");
button.addEventListener("click", function () {
  var makepdf = '<h1>'+ new Date().getDate+'</h1>'+
  '<ul style="font-size: 1000; font-weight: bolder; padding:50px">' +
     '<li\>' +
     '					<h4 style="text-align: left;" dir="rtl">' +
     '						القضايا الرابحة: '+'5'+
'					</h4 >'+
'			</li >'+
'         <li>'+
'           <h4>' +
'             This is an example of generating' +
'           pdf from HTML during runtime' +
'        </h4>' +
'     </li>' +
'		</ul > ';

     html2pdf().from(makepdf).save();

});