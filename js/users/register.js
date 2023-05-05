
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

$(document).ready(function () {
  $('#register-form').validate({
    rules: {
      first_name: {
        required: true
      }, last_name: {
        required: true
      }, father_name: {
        required: true
      }, mother_name: {
        required: true
      }, birthday: {
        required: true
      }, birth_address: {
        required: true
      }, current_address: {
        required: true
      }, phone: {
        required: true,
        number: true,
        minlength: 10
      },
      password: {
        required: true,
        minlength: 6
      }, confirm_password: {
        required: true,
        minlength: 6
      }, email: {
        email: true
      }, rule: {
        required: true
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
      }, birthday: {
        required: "الرجاء اختيار تاريخ الولادة",
      }, birth_address: {
        required: "الرجاء اختيار مكان الولادة",
      }, current_address: {
        required: "الرجاء إدخال العنوان الحالي",
      },
      phone: {
        required: "الرجاء إدخال رقم هاتفك",
        number: "الرجاء إدخال رقم هاتف صحيح",
        minlength: "الرجاء إدخال على الأقل 10 خانات"
      },
      password: {
        required: "الرجاء إدخال كلمة المرور الخاصة بك",
        minlength: "الرجاء إدخال على الأقل 6 محارف"
      }, confirm_password: {
        required: "الرجاء تأكيد كلمة المرور الخاصة بك",
        minlength: "الرجاء إدخال على الأقل 6 محارف"
      }, email: {
        email: "الرجاء إدخال بريد إلكتروني صحيح"
      }, rule: {
        required: "الرجاء اختيار دور الفرد",
      }
    },
    submitHandler: function (form) {
      var first_name = $('#first_name').val();
      var last_name = $('#last_name').val();
      var father_name = $('#father_name').val();
      var mother_name = $('#mother_name').val();
      var phone = $('#phone').val();
      var current_address = $('#current_address').val();
      var birth_address = $('#birth_address').val();
      var birthday = $('#birthday').val();
      var email = $('email').val();
      var password = $('#password').val();
      var confirm_password = $('#confirm_password').val();
      var rule = $('input[name="rule"]:checked').val();
      if(rule==undefined){
        rule='client'
      }
      console.log(rule)

      $('.error').html("")

      //chech passwords matching
      if (password != confirm_password) {

        $('.error').html("كلمتا السر غير متطابقتين");
      } else {
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
              'birthday': birthday,
              'birth_address': birth_address,
              "email": email,
              "password": password,
              "confirm_password": confirm_password,
              "rule": "client"
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
    }
  });
});
