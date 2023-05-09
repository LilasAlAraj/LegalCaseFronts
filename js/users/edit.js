
(() => {
  'use strict';
  feather.replace({ 'aria-hidden': 'true' });

})();

//////////////////////الوقت
function updateTime() {
  var now = new Date();
  // jQuery('#time').val(now.toString());   
  document.getElementById("time").innerHTML = now.toString();
}

setInterval(updateTime, 1000);

/********************* */

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^09[0-9]{8}$/;
  return phoneRegex.test(phoneNumber);
}




function setUserData() {
  fileName = window.location.pathname.includes('member') ? 'members.json' : 'clients.json';
  console.log(fileName)
  $.ajax({
    url: fileName,
    dataType: 'json',
    success: function (response) {


      userID = new URLSearchParams(window.location.search).get("id");

      function isUser(value) {
        return value.id == userID;
      }

      user = response.filter(isUser)[0];


      $('#first_name').val(user.first_name)
      $('#last_name').val(user.last_name)
      $('#mother_name').val(user.mother_name)
      $('#father_name').val(user.father_name)
      $('#place_of_birth').val(user.place_of_birth)
      $('#date_of_birth').val(user.date_of_birth)
      $('#phone').val(user.phone_number)
      $('#current_address').val(user.current_address)
      $('#email').val(user.email)
      var rule = user.rule; // or "lawyer"
      var radioBtn = document.getElementById(rule);
      console.log(radioBtn)
      radioBtn.checked = true;

    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
    }
  });

}
$(document).ready(function () {


  setUserData()

  $('#edit-form').validate({
    rules: {
      first_name: {
        required: true
      }, last_name: {
        required: true
      }, father_name: {
        required: true
      }, mother_name: {
        required: true
      }, date_of_birth: {
        required: true
      }, place_of_birth: {
        required: true
      }, current_address: {
        required: true
      }, phone: {
        required: true,
        number: true,
        minlength: 10
      }, email: {
        email: true
      }
    },
    messages: {
      first_name: {
        required: "الرجاء إدخال الاسم الأول",
      }, last_name: {
        required: "الرجاء إدخال الاسم الأخير",
      }, mother_name: {
        required: "الرجاء إدخال اسم الأم",
      }, father_name: {
        required: "الرجاء إدخال اسم الأب",
      }, date_of_birth: {
        required: "الرجاء اختيار تاريخ الولادة",
      }, place_of_birth: {
        required: "الرجاء اختيار مكان الولادة",
      }, current_address: {
        required: "الرجاء إدخال العنوان الحالي",
      },
      phone: {
        required: "الرجاء إدخال رقم هاتفك",
        number: "الرجاء إدخال رقم هاتف صحيح",
        minlength: "الرجاء إدخال على الأقل 10 خانات"
      }, email: {
        email: "الرجاء إدخال بريد إلكتروني صحيح"
      }
    },
    submitHandler: function (form) {
      var first_name = $('#first_name').val();
      var last_name = $('#last_name').val();
      var father_name = $('#father_name').val();
      var mother_name = $('#mother_name').val();
      var phone = $('#phone').val();
      var current_address = $('#current_address').val();
      var place_of_birth = $('#place_of_birth').val();
      var date_of_birth = $('#date_of_birth').val();
      var email = $('email').val();


      $('.error').html("")

      // Perform register

      if (isValidPhoneNumber(phone)) {
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
          url: "http://127.0.0.1:8000/login",
          type: "POST",
          data: {
            "first_name": first_name,
            "last_name": last_name,
            "father_name": father_name,
            "mother_name": mother_name,
            "phone": phone,
            "current_address": current_address,
            'date_of_birth': date_of_birth,
            'place_of_birth': place_of_birth,
            "email": email
          },
          success: function (response) {
            if (response.status == 'success') {
              console.log(response);
              alert("تم إنشاء الحساب بنجاح");

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
      } else {

        $('.error').show()
        $('.error').html("رقم الهاتف غير صحيح\nالرجاء إدخال 09********");
      }

    }

  });
});
