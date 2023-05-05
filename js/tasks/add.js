
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


function addNewApointment() {


    $(document).ready(function () {

        $('#appointment-form').validate(
            {

                 rules: {
                    name: {
                        required: true
                    },
                    reason: {
                        required: true
                    },
                    appointment_date: {
                        required: true,

                    },
                    appointment_time: {
                        required: true,
                    }
                },
                messages: {
                    name: {
                        required: "الرجاء إدخال الاسم"
                    },
                    reason: {
                        required: "الرجاء إدخال السبب"
                    },
                    appointment_date: {
                        required: "الرجاء اختيار التاريخ"
                    },
                    appointment_time: {
                        required: "الرجاء اختيار الوقت"
                    }
                },
                submitHandler: function (form) {

                    var name = $('#name').val();
                    var reason = $('#reason').val();
                    var appointment_time = $('#appointment_time').val();
                    var date = $('#appointment_date').val();
                    // Perform adding

                  
                    $.ajax({
                        url: "http://127.0.0.1:8000/apps/add",
                        type: "post",
                        data: {
                            "name": name,
                            "reason": reason,
                            "time": appointment_time,
                            "date": date,
                            '_token': $('meta[name="csrf-token"]').attr('content')

                        },
                        success: function (response) {
                            if (response.status == 'success') {
                                alert("تم إنشاء الموعد بنجاح");

                                // redirect user to appropriate page
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
            }
        )
    }
    );
}
try { addNewApointment(); }
catch (e) {
    console.log('ooo')
    // logMyErrors(e); // pass exception object to error handler
    alert(e);

}

