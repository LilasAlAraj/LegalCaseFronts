let session;

function setSessionAuth() {
    if (rule == 1 || rule == 2) {
        const edit_btn = document.createElement('button')
        edit_btn.type = "button"
        edit_btn.id = "edit-button"
        edit_btn.classList.add('operations-btn', 'btn', 'btn-secondary')
        edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
            + ' تعديل معلومات الجلسة';

        edit_btn.style.marginLeft = '1%'
        edit_btn.onclick = function () {
            confirmEditSession();
        }

        const remove_btn = document.createElement('button')
        remove_btn.type = "button"
        remove_btn.id = "remove-button"
        remove_btn.classList.add('operations-btn', 'btn', 'btn-danger')
        remove_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
            + ' إزالة الجلسة'
        remove_btn.onclick = function () {
            confirmDeleteSession();
        }
        const session_operation = document.getElementById('sessionOpperation')
        session_operation.innerHTML = ''


        session_operation.classList.add('container');
        session_operation.append(edit_btn, remove_btn);

        const addAttachmentSessionBtn = document.getElementById('AddAttaachmentForSession');
        addAttachmentSessionBtn.innerHTML = ' <button type="button" class="btn operations-btn " id="add-session-attachment-button"'
            + 'onclick="addNewAttachmentSession()">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة مرفق جديد'
            + '</button>'


    }

}
function viewSession(id) {


    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'session.json',
        dataType: 'json',
        success: function (response) {
            document.getElementById('sessionNumber').innerHTML = response.number;
            document.getElementById('sessionDetails').innerHTML = response.details;
            document.getElementById('sessionDate').innerHTML = response.date;
            setSessionAuth();

            setSessionAttachments(response)
            /// ضبط الآيدي مشان وقت بدي احذف هي الجلسة
            session = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });

    function setSessionAttachments(session) {

        sessionAttachments = document.getElementById('sessionAttachments-body');
        sessionAttachments.innerHTML = ''

        const nAttachment = session.attachment.length;
        for (var i = 0; i < nAttachment; i++) {
            addNewAttachmentRow(sessionAttachments, session.attachment[i])

        }
    }


    function addNewAttachmentRow(table, attachment) {

        const number = attachment.number;
        const type = attachment.type;
        const details = attachment.details;


        const downloadOp = document.createElement('button');
        downloadOp.title = 'تحميل المرفق';
        downloadOp.classList.add('btn', 'btn-info');
        downloadOp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hard-drive align-text-bottom" aria-hidden="true"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>'
            + "تحميل";
        downloadOp.onclick = function () {
            downloadAttachmentOfSession(attachment.id);
        }

        const opperation = document.createElement('div');
        opperation.classList.add('d-flex', 'justify-content-evenly');
        opperation.append(downloadOp)

        if (rule == 1 || rule == 2) {
            const removeOp = document.createElement('button');
            removeOp.title = 'حذف المرفق';
            removeOp.classList.add('btn', 'btn-danger');
            removeOp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + " حذف";
            removeOp.onclick = function () {
                deleteAttachmentOfSession(attachment.id);
            }
            opperation.append(removeOp)

        }

        const numberCol = document.createElement('td');
        numberCol.append(number);

        const typeCol = document.createElement('td');
        typeCol.append(type);

        const detailsCol = document.createElement('td');
        detailsCol.append(details);

        const opperationCol = document.createElement('td');
        opperationCol.append(opperation);


        const row = document.createElement('tr');
        row.append(numberCol, typeCol, detailsCol, opperationCol)
        table.append(row)
    }


    function downloadAttachmentOfSession(sessionID) {

    }

    function deleteAttachmentOfSession(sessionID) {

    }
}


function addNewSessionAttachment() {


    $('#addNewSessionAttachment_form').validate({
        rules: {
            newSessionAttachment_detail: {
                required: true
            },
            newSessionAttachment_type: {
                required: true
            },
            newSeesionAttachmentFile: {
                required: true,
                extension: 'pdf|jpeg|jpg|png'

            }
        },
        messages: {
            newSessionAttachment_detail: {
                required: "الرجاء إدخال تفاصيل المرفق"
            },
            newSessionAttachment_type: {
                required: "الرجاء إدخال نوع المرفق"
            },
            newSeesionAttachmentFile: {
                required: "الرجاء اختيار المرفق",
                extension: "الرجاء تحميل ملفات بصيغة صحيحة. application/pdf, image/jpeg, image/jpg, image/png"
            }
        },
        submitHandler: function (form) {
            // تحديد المتغيرات اللازمة
            newAttachmentDetail = $("#newSessionAttachment_detail").val();
            newAttachmentType = $("#newSessionAttachment_type").val();
            newAttachmentFile = $("#newSeesionAttachmentFile")[0].files;


            // تجهيز البيانات للإرسال
            var formData = new FormData();
            formData.append('newAttachmentDetail', newAttachmentDetail);
            formData.append('newAttachmentType', newAttachmentType);
            formData.append('newAttachmentFile', newAttachmentFile);
            formData.append('sessionID', session.id);


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
                    $('#errorAddSessionAttachment').html('error 404');

                }
            });
        }
    });
}

function deleteSession(id) {
    console.log(id)
    $.ajax({
        url: "deletesession.php", // اسم ملف php الذي يقوم بالحذف
        method: "POST", // طريقة الإرسال POST
        data: { id: id }, // بيانات الطلب، في هذا المثال نحن نرسل معرف العنصر الذي نريد حذفه
        success: function (response) { // الدالة التي تنفذ بنجاح عندما يتم الحذف
            console.log(response); // عرض الاستجابة في وحدة التحكم بالمتصفح
            window.location.href = "view.html"
        },
        error: function (xhr, status, error) { // الدالة التي تنفذ في حالة وجود خطأ أثناء الحذف
            console.log(error); // عرض الخطأ في وحدة التحكم بالمتصفح
        }
    });
}

function addNewAttachmentSession() {
    console.log('here');
    console.log('we');
    console.log('are');
    // عرض Modal 2 فوق Modal 1 عند النقر على الزر
    $('#addNewSessionAttachmentBackdrop').modal('show');
    $('#addNewSessionAttachmentBackdrop').css('background', 'rgba(0,0,0,.3)');
}


function confirmDeleteSession() {
    $('#deleteSessionBackdrop').modal('show');
    $('#deleteSessionBackdrop').css('background', 'rgba(0,0,0,.3)');
    document.getElementById('deleteSessionButton').onclick = function () {
        deleteSession(session.id)
    }
}


function confirmEditSession() {
    $('#editSessionBackdrop').modal('show');
    $('#editSessionBackdrop').css('background', 'rgba(0,0,0,.3)');

    document.getElementById('editSessionNumber').value = session.number;
    document.getElementById('editSessionDate').value = session.date;
    document.getElementById('editSessionDetails').value = session.details;


    $('#editSession_form').validate({
        rules: {
            editSessionNumber: {
                required: true

            }, editSessionDate: {
                required: true

            }, editSessionDetails: {
                required: true

            }
        },
        messages: {
            editSessionNumber: {
                required: "الرجاء اختيار رقم الجلسة"
            },
            editSessionDate: {
                required: "الرجاء اختيار تاريخ الجلسة"
            },
            editSessionDetails: {
                required: "الرجاء إدخال تفاصيل الحلسة"
            }
        },
        submitHandler: function (form) {
            var editSessionNumber = $('#editSessionNumber').val();
            var editSessionDate = $('#editSessionDate').val();
            var editSessionDetails = document.getElementById("editSessionDetails").checked;



            $('#errorEditSession').html('');

            $.ajax({
                url: "http://127.0.0.1:8000/edit_details",
                type: "POST",
                data: {
                    //    "_token": "{{ csrf_token() }}",
                    "sessionNumber": editSessionNumber,
                    "sessionDate": editSessionDate,
                    "sessionDetails": editSessionDetails,
                    "sessionID": session.id
                },
                success: function (response) {
                    if (response.status == 'success') {

                        // redirect user to appropriate page
                        window.location.href = "../view_case.html?id=" + caseID;
                    } else {
                        $('.errorEditSession').html(response.message);
                    }
                },
                error: function (response) {
                    $('#errorEditSession').html(response.responseJSON);
                }
            });


        }
    });

}