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

let data, caseItem;



$(document).ready(function () {

    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'test.json',
        dataType: 'json',
        success: function (response) {

            setAuth();


            const caseID = new URLSearchParams(window.location.search).get("id");
            function isBigEnough(value) {
                return value.id == caseID;
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

    caseItem = data[0]
    // ضبط المحكمة
    document.getElementById('court').append(caseItem.court)
    // ضبط الغرفة
    document.getElementById('room').append(caseItem.room)
    // ضبط أرقام الأساس


    base_numbers = document.getElementById('base-numbers');
    for (var i = 0; i < caseItem.case_numbers.length; i++) {
        bn = caseItem.case_numbers[i]


        row = document.createElement('div');
        row.classList.add('row');

        baseNum = document.createElement('div');
        baseNum.classList.add('col-6');
        baseNum.id = 'base-number-' + i;

        boldBn = document.createElement('b');
        boldBn.append('رقم الأساس: ')
        baseNum.append(boldBn, bn.split("/")[0]);

        year = document.createElement('div');
        year.classList.add('col-6');
        year.id = 'year-' + i;

        boldY = document.createElement('b');
        boldY.append('لعام: ')
        year.append(boldY, bn.split("/")[1]);


        row.append(baseNum, year)
        base_numbers.append(row)

        /************
    
     * <div class="row">
                  <div class="col-6" id="base-number-0">
                    <b>رقم الأساس: </b>
                  </div>
                  <div class="col-6" id="year-0">
                    <b>لعام: </b>
                  </div>
                </div>
     */
    }



    // ضبط الجهة المدعية
    tablePlaintaiff = document.getElementById('plaintaff_table_body');

    plaintiff_lawyers = caseItem.plaintiff_lawyers;
    plaintiff_names = caseItem.plaintiff_names;

    n = Math.max(plaintiff_lawyers.length, plaintiff_names.length);
    for (var i = 0; i < n; i++) {

        row = document.createElement('tr');
        client_ = document.createElement('td');
        if (i < plaintiff_names.length)
            client_.append(plaintiff_names[i])

        lawyer_ = document.createElement('td');
        if (i < plaintiff_lawyers.length)
            lawyer_.append(plaintiff_lawyers[i])

        row.append(client_, lawyer_)
        tablePlaintaiff.append(row)
    }


    // ضبط الجهة المدعى عليها
    tableDefendant = document.getElementById('defendant_table_body');

    defendant_names = caseItem.defendant_names;
    defendant_lawyers = caseItem.defendant_lawyers;

    n = Math.max(defendant_lawyers.length, defendant_names.length);
    for (var i = 0; i < n; i++) {

        row = document.createElement('tr');
        client_ = document.createElement('td');
        if (i < defendant_names.length)
            client_.append(defendant_names[i])

        lawyer_ = document.createElement('td');
        if (i < defendant_lawyers.length)
            lawyer_.append(defendant_lawyers[i])

        row.append(client_, lawyer_)
        tableDefendant.append(row)
        /**
    *  <tr id="row1">
                       <td>الاسم1</td>
                       <td>الوكيل1</td>
                     </tr>
    */
    }


    // ضبط حالة القضية
    state = document.getElementById("state")
    stateCase = caseItem.state; //1-winner. 2-losser. 3-running. 4-blocking
    if (stateCase == 1) {
        state.classList.add('text-bg-success');
        state.append('رابحة')
    } else if (stateCase == 2) {
        state.classList.add('text-bg-danger');
        state.append('خاسرة')
    } else if (stateCase == 3) {
        state.classList.add('text-bg-info');
        state.append('جارٍ العمل عليها')
    } else if (stateCase == 4) {
        state.classList.add('text-bg-dark');
        state.append('معلقة')
    }


    // ضبط تفاصيل القضية
    document.getElementById('dawa').append(caseItem.dawa)
    document.getElementById('eltemas').append(caseItem.eltemas)
    document.getElementById('waqae').append(caseItem.waqae)





}

function setAuth() {


    role = 2; //1->admin , 2->secretaria, 3->lawyer, 4->client

    if (role != 1 && role != 2) {





    }
    else {




        const edit_btn = document.createElement('button')
        edit_btn.type = "button"
        edit_btn.id = "edit-button"
        edit_btn.classList.add('operations-btn', 'btn', 'btn-secondary')
        edit_btn.onclick = function () {
            edit_case()
        }
        edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
            + ' تعديل معلومات القضية';


        const remove_btn = document.createElement('button')
        remove_btn.type = "button"
        remove_btn.id = "remove-button"
        remove_btn.classList.add('operations-btn', 'btn', 'btn-danger')
        remove_btn.onclick = function () {
            remove_case()
        }
        remove_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
            + ' إزالة القضية'
        remove_btn.style.margin = '0 1%'

        const archive_btn = document.createElement('button')
        archive_btn.type = "button"
        archive_btn.id = "archive-button"
        archive_btn.classList.add('operations-btn', 'btn', 'btn-warning')
        archive_btn.onclick = function () {
            archiveCase()
        }
        archive_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive align-text-bottom" aria-hidden="true"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>'
            + ' أرشفة القضية'
        case_operation = document.createElement('div');
        case_operation.classList.add('container')
        case_operation.append(edit_btn, remove_btn, archive_btn);


        document.getElementById('infoOfCase').append(case_operation)




        edit_state_btn = document.createElement('button')
        edit_state_btn.type = "button"
        edit_state_btn.classList.add('operations-btn', 'btn', 'btn-secondary');
        edit_state_btn.onclick = function () {
            openChangeStatePopup();
        }
        edit_state_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
            + ' تعديل الحالة';

        document.getElementById('case_state').append(edit_state_btn)





        edit_additional_details = document.createElement('div');
        edit_additional_details.classList.add('container');
        edit_additional_details.innerHTML = ' <button type="button" class="operations-btn btn btn-secondary"'
            + 'onclick="openAdditionaDetails()">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
            + ' تعديل التفاصيل الإضافية'
            + '</button>'
        document.getElementById('additional_details').append(edit_additional_details)



        sessions = document.createElement('div');
        sessions.classList.add('container');
        sessions.innerHTML = ' <button type="button" class="operations-btn btn btn-primary"'
            + 'onclick="add_session()">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة جلسة جديدة'
            + '</button>'
        document.getElementById('sessions').append(sessions)


        attachments = document.createElement('div');
        attachments.classList.add('container');
        attachments.innerHTML = ' <button type="button" class="operations-btn btn btn-primary"'
            + 'onclick="add_attachment()">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة مرفق جديد'
            + '</button>'
        document.getElementById('attachments').append(attachments)


        decisions = document.createElement('div');
        decisions.classList.add('container');
        decisions.innerHTML = ' <button type="button" class="operations-btn btn btn-primary"'
            + 'onclick="add_decision()">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة قرار جديد'
            + '</button>'
        document.getElementById('decisions').append(decisions)
    }
}

function changeStateCase() {
    $('#chang_state_form').validate(
        {
            rules: {
                state: {
                    required: true
                }
            },
            messages: {
                state: {
                    required: "الرجاء اختيار الحالة الجديدة للقضية"
                }
            },
            submitHandler: function (form) {

                state = document.getElementById("selected_state").value;

                $.ajax({
                    url: "change_state.php", // اسم ملف php الذي يقوم بالحذف
                    method: "POST", // طريقة الإرسال POST
                    data: { 'id': caseItem.id, 'state': state },
                    success: function (response) {
                        console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح
                        document.getElementById("state").innerHTML(state)

                    },
                    error: function (xhr, status, error) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
                        console.log(error); // عرض الخطأ في وحدة التحكم بالمتصفح
                    }
                });

            }
        }
    )

}
function archiveCase() {
    var confirmation = confirm("هل أنت متأكد من أرشفة هذه القضية؟");
    if (confirmation) {
        $.ajax({
            url: "archive.php", // اسم ملف php الذي يقوم بالحذف
            method: "POST", // طريقة الإرسال POST
            data: { id: caseItem.id }, // بيانات الطلب، في هذا المثال نحن نرسل معرف العنصر الذي نريد حذفه
            success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف
                console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح

            },
            error: function (xhr, status, error) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
                console.log(error); // عرض الخطأ في وحدة التحكم بالمتصفح
            }
        });

    }
}
function remove_case() {
    var confirmation = confirm("هل أنت متأكد من حذف هذه القضية؟");
    if (confirmation) {
        $.ajax({
            url: "delete.php", // اسم ملف php الذي يقوم بالحذف
            method: "POST", // طريقة الإرسال POST
            data: { id: caseItem.id }, // بيانات الطلب، في هذا المثال نحن نرسل معرف العنصر الذي نريد حذفه
            success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف
                console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح
                window.location.href = "view.html"
            },
            error: function (xhr, status, error) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
                console.log(error); // عرض الخطأ في وحدة التحكم بالمتصفح
            }
        });

    }
}



function edit_case() {

}
function openChangeStatePopup() {
    document.getElementById("popup").classList.add("popup--open");
    document.getElementById("overlay").classList.add("overlay--active");
    document.body.style.overflow = "hidden"; /* لمنع التمرير */
}

function closeChangeStatePopup() {
    document.getElementById("popup").classList.remove("popup--open");
    document.getElementById("overlay").classList.remove("overlay--active");
    document.body.style.overflow = ""; /* إعادة تمكين التمرير */
}


function openAdditionaDetails() {
    window.location.href = "details/edit.html?id=" + new URLSearchParams(window.location.search).get("id");

}