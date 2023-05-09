
(() => {
    'use strict';
    feather.replace({ 'aria-hidden': 'true' });

})();

function changePassword() {
    alert("تم تغيير كلمة المرور بنجاح");

    $('#changePassword_form').validate({
        rules: {

            current_password: {
                required: true,
                minlength: 6
            }, new_password: {
                required: true,
                minlength: 6
            }, confirm_new_password: {
                required: true,
                minlength: 6
            }
        },
        messages: {

            current_password: {
                required: "الرجاء إدخال كلمة المرور الحالية",
                minlength: "الرجاء إدخال على الأقل 6 محارف"
            }, new_password: {
                required: "الرجاء إدخال كلمة المرور الجديدة",
                minlength: "الرجاء إدخال على الأقل 6 محارف"
            }, confirm_new_password: {
                required: "الرجاء تأكيد كلمة المرور الجديدة",
                minlength: "الرجاء إدخال على الأقل 6 محارف"
            }
        },
        submitHandler: function (form) {
            $('.changePasswordError').html("")


            var current_password = $('#current_password').val();
            var new_password = $('#new_password').val();
            var confirm_new_password = $('#confirm_new_password').val();





            //check passwords matching
            if (getOldPassword() !== current_password) {
                $('.changePasswordError').html("كلمة السر الحالية غير صحيحة");

            }
            if (new_password != confirm_new_password) {

                $('.changePasswordError').html("كلمتا السر الجديدتان غير متطابقتين");
            } else {
                // Perform register

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: "http://127.0.0.1:8000/login",
                    type: "POST",
                    data: {
                        "new_password": new_password,
                        "confirm_new_password": confirm_new_password
                    },
                    success: function (response) {
                        if (response.status == 'success') {
                            console.log(response);
                            alert("تم تغيير كلمة المرور بنجاح");

                        } else {
                            $('.changePasswordError').html(response.message);
                        }
                    },

                    error: function (response) {
                        // If the login is unsuccessful, display the error message
                        // $('#error').html(response.responseJSON.errors.phone[0]);
                        $('#changePasswordError').html(response.responseJSON);
                    }
                });

            }
        }
    });
}

function getOldPassword() {
    let oldPass = '';
    $.ajax({
        url: "http://127.0.0.1:8000/login",
        type: "get",
        success: function (response) {
            oldPass = response.data.password;
        },
        error: function (response) {
            // If the login is unsuccessful, display the error message
            // $('#error').html(response.responseJSON.errors.phone[0]);
            $('#changePasswordError').html(response.responseJSON);
        }
    });
    return oldPass;
}



function showPassword(name) {

    console.log(name)

    const passwordInput = document.querySelector('#'+name);
    const showPasswordBtn = document.querySelector('#show-' + name + '-btn');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off align-text-bottom" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
    } else {
        passwordInput.type = "password";
        showPasswordBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }
}










