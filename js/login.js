/*
  const form = document.querySelector("form");
const phoneInput = document.querySelector("#phone");
const password = document.querySelector('input[name="password"]').value;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const phoneNumber = phoneInput.value.trim();
  if (isValidPhoneNumber(phoneNumber)) {
    // Perform login logic with phone number
    alert("Login successful!");
  } else {
    alert("Invalid phone number!");
  }
});
*/
function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^09[0-9]{8}$/;
  return phoneRegex.test(phoneNumber);
}


const passwordInput = document.querySelector("#password");
const showPasswordBtn = document.querySelector("#show-password-btn");

showPasswordBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordBtn.textContent = "إخفاء كلمة المرور";
  } else {
    passwordInput.type = "password";
    showPasswordBtn.textContent = "إظهار كلمة المرور";
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