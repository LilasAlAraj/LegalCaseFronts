

(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })
    ;


})();

//////////////////////الوقت
function updateTime() {
  var now = new Date();
  // jQuery('#time').val(now.toString());   
  document.getElementById("time").innerHTML = now.toString();
}

setInterval(updateTime, 1000);

/********************* */

$(document).ready(function () {

  addBaseNumber();
  addClientPlaintiffField();
  addLawyerPlaintiffField();
  addClientEnemyField();
  addLawyerEnemyField();


});

function add() {


  $('#add-case-form').validate({
    rules: {
      case_tiltle: {
        required: true
      },
      court: {
        required: true
      }, case_room: {
        required: true
      }, "base-number[]": {
        required: true
      }, "year[]": {
        required: true
      }, "client_names[]": {
        required: true
      }, "lawyer_names[]": {
        required: true
      }, "clientEnemy_names[]": {
        required: true
      }, "lawyerEnemy_names[]": {
        required: true
      }
    },
    messages: {
      case_tiltle: {
        required: "الرجاء إدخال موضوع الدعوى"
      },
      court: {
        required: "الرجاء اختيار المحكمة"
      },
      case_room: {
        required: "الرجاء إدخال الغرفة"
      },
      "base-number[]": {
        required: "الرجاء إدخال رقم الأساس"
      },
      "year[]": {
        required: "الرجاء إدخال العام"
      },
      "client_names[]": {
        required: "الرجاء إدخال اسم المدعي"
      },
      "lawyer_names[]": {
        required: "الرجاء اختيار اسم محامي المدعي"
      },
      "clientEnemy_names[]": {
        required: "الرجاء إدخال  اسم المدعى عليه "
      },
      "lawyerEnemy_names[]": {
        required: "الرجاء إدخال اسم محامي المدعى عليه"
      }
    },
    submitHandler: function (form) {

      case_ = collectData();

      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      $.ajax({
        url: "http://127.0.0.1:8000/add_case",
        type: "POST",
        data: case_,
        success: function (response) {
          if (response.status == 'success') {
            console.log(response);

            // redirect user to appropriate page
            window.location.href = response.data.page;
          } else {
            $('.error').html(response.message);
          }
        },

        error: function (response) {
          // If the login is unsuccessful, display the error message
          // $('#error').html(response.responseJSON.errors.phone[0]);
          $('#error').html(response.responseJSON);
        }
      });


    }
  });

}