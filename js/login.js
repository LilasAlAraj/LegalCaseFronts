
(() => {
  'use strict';
  feather.replace({ 'aria-hidden': 'true' });

})();



function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^09[0-9]{8}$/;
  return phoneRegex.test(phoneNumber);
}


const passwordInput = document.querySelector("#password");
const showPasswordBtn = document.querySelector("#show-password-btn");

showPasswordBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off align-text-bottom" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
  } else {
    passwordInput.type = "password";
    showPasswordBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
  }
});



function login() {


  $(document).ready(function () {
    $('#login-form').validate({
      rules: {
        phone: {
          required: true,
          number: true,
          minlength: 10
        },
        password: {
          required: true,
          minlength: 6
        }
      },
      messages: {
        phone: {
          required: "الرجاء إدخال رقم هاتفك",
          number: "الرجاء إدخال رقم هاتف صحيح",
          minlength: "الرجاء إدخال على الأقل 10 خانات"
        },
        password: {
          required: "الرجاء إدخال كلمة المرور الخاصة بك",
          minlength: "الرجاء إدخال على الأقل 6 محارف"
        }
      },
      submitHandler: function (form) {
        var phone = $('#phone').val();
        var password = $('#password').val();
        var remember = document.getElementById("remember_me").checked;

        // Perform login logic with phone number

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
              //    "_token": "{{ csrf_token() }}",
              "phone": phone,
              "password": password,
              "remember": remember
            },
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
        } else {
          alert("رقم الهاتف غير صحيح\nالرجاء إدخال 09********");
        }

      }
    });
  });
}
try { login(); }
catch (e) {
 // logMyErrors(e); // pass exception object to error handler
  alert(e);

}