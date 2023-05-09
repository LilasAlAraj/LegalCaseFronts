
(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

        ;
})();

/////////////////////

let data, caseItem;
let userID;



$(document).ready(function () {
    userID = new URLSearchParams(window.location.search).get("id");
    console.log(userID)
    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'test.json',
        dataType: 'json',
        success: function (response) {



            function isBigEnough(value) {
                return value.id == userID;
            }

            data = response.filter(isBigEnough);
            setCaseData();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });
}
);
function setCaseData() {

    caseItem = data[0];
    document.getElementById('case_tiltle').value = caseItem.case_title;
    document.getElementById('case_room').value = caseItem.room;
    document.getElementById('court').value = caseItem.court;


    totalBaseNumbers = caseItem.case_numbers.length;
    for (var i = 0; i < totalBaseNumbers; i++) {
        addBaseNumber();
        document.getElementById('base-number-' + i).value = caseItem.case_numbers[i].split('/')[0];
        document.getElementById('yearSelect-' + i).value = caseItem.case_numbers[i].split('/')[1];
    }



    totalClientName = caseItem.plaintiff_names.length;
    for (var i = 0; i < totalClientName; i++) {
        addClientPlaintiffField();
        document.getElementById('client_name-' + i).value = caseItem.plaintiff_names[i];
    }


    totalLawyerName = caseItem.plaintiff_lawyers.length;
    for (var i = 0; i < totalLawyerName; i++) {
        addLawyerPlaintiffField();
        document.getElementById('lawyer_name-' + i).value = caseItem.plaintiff_lawyers[i];
    }


    totalClientDefName = caseItem.defendant_names.length;
    for (var i = 0; i < totalClientDefName; i++) {
        addClientEnemyField();
        document.getElementById('enemy_name-' + i).value = caseItem.defendant_names[i];
    }

    totalLawyerDefName = caseItem.defendant_lawyers.length;
    for (var i = 0; i < totalLawyerDefName; i++) {
        addLawyerEnemyField();
        document.getElementById('lawyerEnemy_name-' + i).value = caseItem.defendant_lawyers[i];
    }
}


function edit() {


    $('#edit_case-form').validate({
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
            case_['id'] = userID;
            console.log(case_)

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: "http://127.0.0.1:8000/edit_case",
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
                    // $('#error').html(response.responseJSON.errors.phone[0]);
                    $('#error').html(response.responseJSON);
                }
            });


        }
    });

}