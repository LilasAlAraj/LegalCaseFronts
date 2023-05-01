
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


/************** */
let case_;
function setAdditionalData(){
    document.getElementById('eltemas').value=case_.eltemas;
    document.getElementById('waqae').value=case_.waqae;
    document.getElementById('dawa').value=case_.dawa;
}

$(document).ready(function () {
    $.ajax({
        url: '../test.json',
        dataType: 'json',
        success: function (response) {



            const caseID = new URLSearchParams(window.location.search).get("id");
            function isBigEnough(value) {
                return value.id == caseID;
            }

            case_ = response.filter(isBigEnough)[0];
            setAdditionalData();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });
    $('#edit_case_details_form').validate({
        rules: {
            dawa: {
                required: true

            }, eltemas: {
                required: true

            }, waqae: {
                required: true

            }
        },
        messages: {
            dawa: {
                required: "الرجاء إدخال الدعوى"
            },
            waqae: {
                required: "الرجاء إدخال الواقعة"
            },
            eltemas: {
                required: "الرجاء إدخال الالتماس"
            }
        },
        submitHandler: function (form) {
            var eltemas = $('#eltemas').val();
            var dawa = $('#dawa').val();
            var waqae = document.getElementById("waqae").checked;



            const caseID = new URLSearchParams(window.location.search).get("id");




            $.ajax({
                url: "http://127.0.0.1:8000/edit_details",
                type: "POST",
                data: {
                    //    "_token": "{{ csrf_token() }}",
                    "eltemas": eltemas,
                    "dawa": dawa,
                    "waqae": waqae,
                    "caseID": caseID
                },
                success: function (response) {
                    if (response.status == 'success') {

                        // redirect user to appropriate page
                        window.location.href = "../view_case.html?id=" + caseID;
                    } else {
                        $('.error').html(response.message);
                    }
                },
                error: function (response) {
                    $('#error').html(response.responseJSON);
                }
            });


        }
    });
});