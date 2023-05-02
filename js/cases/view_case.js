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
let role = 1; //1->admin , 2->secretaria, 3->lawyer, 4->client



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
    document.getElementById('dawa').append(caseItem.case_title)
    document.getElementById('eltemas').append(caseItem.eltemas)
    document.getElementById('waqae').append(caseItem.waqae)



    // ضبط جلسات القضية
    sessions_table = document.getElementById('sessions-table-body');
    sessions = caseItem.sessions;
    for (var i = 0; i < sessions.length; i++) {
        row = document.createElement('tr');
        num = document.createElement('td');
        num.append(sessions[i].id);

        date = document.createElement('td');
        date.append(sessions[i].date);

        details = document.createElement('td');
        details_str = sessions[i].details;
        if (sessions[i].details.length > 50)
            details_str = sessions[i].details.substring(0, 50) + "..."

        details.append(details_str);



        const viewBtn = document.createElement('button')
        viewBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
            + ' عرض الجلسة كاملة'
        viewBtn.setAttribute('title', 'عرض الجلسة');
        viewBtn.classList.add('btn', 'btn-info', 'menu-operations-btn');
        viewBtn.onclick = function () {
            viewCase(case_.id)
        }



        const operations = document.createElement('div');
        operations.classList.add('dropdown');
        const opBtn = document.createElement('button');

        opBtn.classList.add('dropdown-toggle', 'btn', 'btn-secondary')
        opBtn.type = 'button';
        opBtn.setAttribute("data-bs-toggle", "dropdown")
        opBtn.setAttribute("aria-expanded", "false");
        const operationMenu = document.createElement('ul');
        operationMenu.id = 'operationMenu';
        operationMenu.classList.add('dropdown-menu');


        const viewOpLi = document.createElement('li');
        viewOpLi.append(viewBtn);
        viewOpLi.classList = 'operationMenuItem'

        if (role == 1 || role == 2) {

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + ' مسح الجلسة'
            deleteBtn.setAttribute('title', 'مسح الجلسة');
            deleteBtn.classList.add('btn', 'btn-danger', 'menu-operations-btn');
            deleteBtn.onclick = function () {
                deleteCase(case_.id)
            }



            const delOpLi = document.createElement('li');
            delOpLi.append(deleteBtn)
            delOpLi.classList = 'operationMenuItem'



            operationMenu.append(viewOpLi, delOpLi,);

        } else {
            operationMenu.append(viewOpLi)
        }


        operations.append(opBtn, operationMenu);
        row.append(num, date, details, operations);
        sessions_table.append(row)
    }


}

function setAuth() {



    if (role != 1 && role != 2) {
    }
    else {




        const edit_btn = document.createElement('button')
        edit_btn.type = "button"
        edit_btn.id = "edit-button"
        edit_btn.classList.add('operations-btn', 'btn', 'btn-secondary')
        edit_btn.setAttribute("data-bs-toggle", "modal")
        edit_btn.setAttribute("data-bs-target", "#editCaseBackdrop")
        edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
            + ' تعديل معلومات القضية';


        const remove_btn = document.createElement('button')
        remove_btn.type = "button"
        remove_btn.id = "remove-button"
        remove_btn.classList.add('operations-btn', 'btn', 'btn-danger')
        remove_btn.setAttribute("data-bs-toggle", "modal")
        remove_btn.setAttribute("data-bs-target", "#deleteCaseBackdrop")
        remove_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
            + ' إزالة القضية'
        remove_btn.style.margin = '0 1%'

        const archive_btn = document.createElement('button')
        archive_btn.type = "button"
        archive_btn.id = "archive-button"
        archive_btn.classList.add('operations-btn', 'btn', 'btn-warning')
        archive_btn.setAttribute("data-bs-toggle", "modal")
        archive_btn.setAttribute("data-bs-target", "#archiveCaseBackdrop");
        archive_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive align-text-bottom" aria-hidden="true"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>'
            + ' أرشفة القضية'
        case_operation = document.createElement('div');
        case_operation.classList.add('container')
        case_operation.append(edit_btn, remove_btn, archive_btn);


        document.getElementById('infoOfCase').append(case_operation)




        edit_state_btn = document.createElement('button')
        edit_state_btn.type = "button"
        edit_state_btn.classList.add('operations-btn', 'btn', 'btn-secondary');
        edit_state_btn.setAttribute("data-bs-toggle", "modal")
        edit_state_btn.setAttribute("data-bs-target", "#staticBackdrop")
        edit_state_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
            + ' تعديل الحالة';

        document.getElementById('case_state').append(edit_state_btn)





        edit_additional_details = document.createElement('div');
        edit_additional_details.classList.add('container');
        edit_additional_details.innerHTML = ' <button type="button" class="operations-btn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#changeAdditionalDetailsBackdrop"'
            + 'onclick="loadAdditionalDetails()">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
            + ' تعديل التفاصيل الإضافية'

            + '</button>'



        document.getElementById('additional_details').append(edit_additional_details)



        sessions = document.createElement('div');
        sessions.classList.add('container');
        sessions.innerHTML = ' <button type="button" class="operations-btn btn btn-primary"'
            + ' data-bs-toggle="modal" data-bs-target="#addNewSessionBackdrop">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة جلسة جديدة'
            + '</button>'
        document.getElementById('sessions').append(sessions)


        attachments = document.createElement('div');
        attachments.classList.add('container');
        attachments.innerHTML = ' <button type="button" class="operations-btn btn btn-primary"'
            + ' data-bs-toggle="modal" data-bs-target="#addNewAttachmentBackdrop">'

            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة مرفق جديد'
            + '</button>'
        document.getElementById('attachments').append(attachments)


        decisions = document.createElement('div');
        decisions.classList.add('container');
        decisions.innerHTML = ' <button type="button" class="operations-btn btn btn-primary"'
            + ' data-bs-toggle="modal" data-bs-target="#addNewDecisionBackdrop">'

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

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
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

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
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
function deleteCase() {

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



function editCase() {
    const caseID = new URLSearchParams(window.location.search).get("id");
    window.location.href = "edit.html?id=" + caseID;


}


function loadAdditionalDetails() {
    document.getElementById('eltemas_edit').value = caseItem.eltemas;
    document.getElementById('waqae_edit').value = caseItem.waqae;
    document.getElementById('dawa_edit').value = caseItem.case_title;


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
            var eltemas = $('#eltemas_edit').val();
            var dawa = $('#dawa_edit').val();
            var waqae = document.getElementById("waqae_edit").checked;



            const caseID = new URLSearchParams(window.location.search).get("id");

            $('#errorEditAdditionalDetails').html('');

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
                        $('.errorEditAdditionalDetails').html(response.message);
                    }
                },
                error: function (response) {
                    $('#errorEditAdditionalDetails').html(response.responseJSON);
                }
            });


        }
    });
}


function addNewSession() {


    $('#addNewSession_form').validate({
        rules: {
            newSessionNumber: {
                required: true
            },
            newSessionDate: {
                required: true
            },
            newSessionDetails: {
                required: true
            },
            sessionAttachments: {
                required: false,
                extension: 'pdf|jpeg|jpg|png'

            }
        },
        messages: {
            newSessionNumber: {
                required: "الرجاء إدخال رقم الجلسة"
            },
            newSessionDate: {
                required: "الرجاء إدخال تاريخ الجلسة"
            },
            newSessionDetails: {
                required: "الرجاء إدخال تفاصيل الجلسة"
            },
            sessionAttachments: {
                extension: "الرجاء تحميل ملفات بصيغة صحيحة. application/pdf, image/jpeg, image/jpg, image/png"
            }
        },
        submitHandler: function (form) {
            // تحديد المتغيرات اللازمة
            sessionNumber = $("#newSessionNumber").val();
            sessionDate = $("#newSessionDate").val();
            sessionDetails = $("#newSessionDetails").val();
            sessionAttachments = null;
            if ($("#sessionAttachments")[0].files.length > 0) {
                sessionAttachments = $("#sessionAttachments")[0].files;
            }
            caseID = new URLSearchParams(window.location.search).get("id");

            // تجهيز البيانات للإرسال
            var formData = new FormData();
            formData.append('newSessionNumber', newSessionNumber);
            formData.append('newSessionDate', newSessionDate);
            formData.append('newSessionDetails', newSessionDetails);
            if (sessionAttachments != null)
                for (var i = 0; i < sessionAttachments.length; i++) {
                    formData.append('sessionAttachments[]', sessionAttachments[i]);
                }
            formData.append('caseID', caseID);


            console.log(sessionAttachments)
            $.ajax({
                url: 'add_new_session.php',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    // Handle the response from the server
                    console.log(response);
                },
                error: function (xhr, status, error) {
                    // Handle the error
                    console.log(xhr.responseText);
                    $('#errorAddSession').html('error 404');

                }
            });
        }
    });

    /***************
     * 
     * public function store(Request $request)
{
    $newSession = new Session();
    $newSession->sessionNumber = $request->input('newSessionNumber');
    $newSession->sessionDate = $request->input('newSessionDate');
    $newSession->sessionDetails = $request->input('newSessionDetails');
    $newSession->caseID = $request->input('caseID');

    if ($request->hasFile('sessionAttachments')) {
        $files = $request->file('sessionAttachments');
        foreach ($files as $file) {
            $filename = $file->getClientOriginalName();
            $file->storeAs('attachments', $filename);
        }
    }

    $newSession->save();

    return response()->json([
        'message' => 'Session added successfully',
        'session' => $newSession
    ]);
}
     * 
     */
}

function addNewAttachment() {


    $('#addNewAttachment_form').validate({
        rules: {
            newAttachment_detail: {
                required: true
            },
            newAttachment_type: {
                required: true
            },
            newAttachmentFile: {
                required: true,
                extension: 'pdf|jpeg|jpg|png'

            }
        },
        messages: {
            newAttachment_detail: {
                required: "الرجاء إدخال تفاصيل المرفق"
            },
            newAttachment_type: {
                required: "الرجاء إدخال نوع المرفق"
            },
            newAttachmentFile: {
                required: "الرجاء اختيار المرفق",
                extension: "الرجاء تحميل ملفات بصيغة صحيحة. application/pdf, image/jpeg, image/jpg, image/png"
            }
        },
        submitHandler: function (form) {
            // تحديد المتغيرات اللازمة
            newAttachmentDetail = $("#newAttachment_detail").val();
            newAttachmentType = $("#newAttachment_type").val();
            newAttachmentFile = $("#newAttachmentFile")[0].files;

            caseID = new URLSearchParams(window.location.search).get("id");

            // تجهيز البيانات للإرسال
            var formData = new FormData();
            formData.append('newAttachmentDetail', newAttachmentDetail);
            formData.append('newAttachmentType', newAttachmentType);
            formData.append('newAttachmentFile', newAttachmentFile);
            formData.append('caseID', caseID);


            $.ajax({
                url: 'add_new_session.php',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    // Handle the response from the server
                    console.log(response);
                },
                error: function (xhr, status, error) {
                    // Handle the error
                    console.log(xhr.responseText);
                    $('#errorAddAttachment').html('error 404');

                }
            });
        }
    });


}


function addNewDecision() {


    $('#addNewDecision_form').validate({
        rules: {
            newDecisionNumber: {
                required: true
            },
            newDecisionDate: {
                required: true
            },
            newDecisionDetails: {
                required: true,
                extension: 'pdf|jpeg|jpg|png'

            }
        },
        messages: {
            newDecisionNumber: {
                required: "الرجاء إدخال رقم القرار"
            },
            newDecisionDate: {
                required: "الرجاء إدخال تاريخ القرار"
            },
            newDecisionDetails: {
                required: "الرجاء إدخال تفاصيل القرار",
            }
        },
        submitHandler: function (form) {
            // تحديد المتغيرات اللازمة
            newDecisionNumber = $("#newDecisionNumber").val();
            newDecisionDate = $("#newDecisionDate").val();
            newDecisionDetails = $("#newDecisionDetails").val();

            caseID = new URLSearchParams(window.location.search).get("id");

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: 'add_new_session.php',
                method: 'POST',
                data: {
                    //    "_token": "{{ csrf_token() }}",
                    "newDecisionNumber": newDecisionNumber,
                    "newDecisionDate": newDecisionDate,
                    "newDecisionDetails": newDecisionDetails,
                    "caseID": caseID
                },
                success: function (response) {
                    // Handle the response from the server
                    console.log(response);
                },
                error: function (xhr, status, error) {
                    // Handle the error
                    console.log(xhr.responseText);
                    $('#errorAddDecision').html('error 404');

                }
            });
        }
    });


}


function closeModal() {
    // حذف المعلومات المخزنة في ذاكرة التخزين المؤقت للجلسة
    sessionStorage.clear();
    console.log('// إغلاق النافذة المنبثقة')

}
