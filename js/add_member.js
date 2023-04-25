
(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

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

function register() {


  $(document).ready(function () {
    $('#register-form').validate({
      rules: {

        phone: {
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
        }, rule: {
          required: true,
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
        }
        , address: {
          required: "الرجاء إدخال العنوان",
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
        }, rule: {
          required: "الرجاء اختيار دور العضو"
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
        var address = $('#address').val();
        var email = $('email').val();
        var password = $('#password').val();
        var confirm_password = $('#confirm_password').val();

        var rule = $('input[name="rule"]:checked').val();
        console.log(rule)


        //chech passwords matching
        if (password != confirm_password) {

          alert("كلمتا السر غير متطابقتين");
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
                "address": address,
                "email": email,
                "password": password,
                "confirm_password": confirm_password,
                "rule": rule
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
            alert("رقم الهاتف غير صحيح\nالرجاء إدخال 09********");
          }

        }
      }
    });
  });
}
try { register(); }
catch (e) {
  // logMyErrors(e); // pass exception object to error handler
  alert(e);

}