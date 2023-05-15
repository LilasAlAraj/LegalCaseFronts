(() => {
    'use strict'
    feather.replace({ 'aria-hidden': 'true' })
})();
/**************************** */


$(document).ready(function () {

    $('#addRole_form').validate({
        rules: {

            role_name: {
                required: true

            }
        },
        messages: {

            role_name: {
                required: "الرجاء إدخال اسم الدور",
            }
        },
        submitHandler: function (form) {
            $('#addRoleError').html("")


            var role_name = $('#role_name').val();


            const selectedPermissions = getSelectedPermissions(form);


            if (selectedPermissions.length == 0) {
                $('#addRoleError').html("الرجاء اختيار الصلاحيات")

            } else {

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: "http://127.0.0.1:8000/login",
                    type: "POST",
                    data: {
                        "role_name": role_name,
                        "permissions": selectedPermissions
                    },
                    success: function (response) {
                        if (response.status == 'success') {
                            //to-do

                        } else {
                            $('#addRoleError').html(response.message);
                        }
                    },

                    error: function (response) {
                        // If the login is unsuccessful, display the error message
                        // $('#error').html(response.responseJSON.errors.phone[0]);
                        $('#addRoleError').html(response.responseJSON);
                    }
                });
            }
        }
    })
})



function getSelectedPermissions(form) {
    const checkboxes = form.querySelectorAll('input[type="checkbox"][name="permissions[]"]');

    const selectedPermissions = [];

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedPermissions.push(checkbox.value);

        }
    });

    return selectedPermissions;
}