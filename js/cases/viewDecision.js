let decision;

function setDecisionAuth() {
    if (rule == 1 || rule == 2) {
        if (!caseItem.isArchived) {

            const edit_btn = document.createElement('button')
            edit_btn.type = "button"
            edit_btn.id = "edit-button"
            edit_btn.classList.add('operations-btn', 'btn', 'btn-secondary')
            edit_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
                + ' تعديل معلومات القرار';

            edit_btn.style.marginLeft = '1%'
            edit_btn.onclick = function () {
                confirmEditDecision();
            }

            const remove_btn = document.createElement('button')
            remove_btn.type = "button"
            remove_btn.id = "remove-button"
            remove_btn.classList.add('operations-btn', 'btn', 'btn-danger')
            remove_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + ' إزالة القرار'
            remove_btn.onclick = function () {
                confirmDeleteDecision();
            }
            const decision_operation = document.getElementById('decisionOpperation')
            decision_operation.innerHTML = ''


            decision_operation.classList.add('container');
            decision_operation.append(edit_btn, remove_btn);
        }
    }
}

function viewDecision(id) {


    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'decision.json',
        dataType: 'json',
        success: function (response) {
            document.getElementById('decisionNumber').innerHTML = response.number;
            document.getElementById('decisionDate').innerHTML = response.date;
            document.getElementById('decisionDetails').innerHTML = response.details;

            setDecisionAuth();

            /// ضبط الآيدي مشان وقت بدي احذف هي الجلسة
            decision = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });


}



function deleteDecision(id) {
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



function confirmDeleteDecision() {
    $('#deleteDecisionBackdrop').modal('show');
    $('#deleteDecisionBackdrop').css('background', 'rgba(0,0,0,.3)');
    document.getElementById('deleteDecisionButton').onclick = function () {
        deleteDecision(session.id)
    }
}


function confirmEditDecision() {
    $('#editDecisionBackdrop').modal('show');
    $('#editDecisionBackdrop').css('background', 'rgba(0,0,0,.3)');

    document.getElementById('editDecisionNumber').value = decision.number;
    document.getElementById('editDecisionDate').value = decision.date;
    document.getElementById('editDecisionDetails').value = decision.details;


    $('#editDecision_form').validate({
        rules: {
            editDecisionNumber: {
                required: true

            }, editDecisionDate: {
                required: true

            }, editDecisionDetails: {
                required: true

            }
        },
        messages: {
            editDecisionNumber: {
                required: "الرجاء اختيار رقم القرار"
            },
            editDecisionDate: {
                required: "الرجاء اختيار تاريخ القرار"
            },
            editDecisionDetails: {
                required: "الرجاء إدخال تفاصيل القرار"
            }
        },
        submitHandler: function (form) {
            var editDecisionNumber = $('#editDecisionNumber').val();
            var editDecisionDate = $('#editDecisionDate').val();
            var editDecisionDetails = document.getElementById("editDecisionDetails").val();



            $('#errorEditDecision').html('');

            $.ajax({
                url: "http://127.0.0.1:8000/edit_details",
                type: "POST",
                data: {
                    //    "_token": "{{ csrf_token() }}",
                    "decisionNumber": editDecisionNumber,
                    "decisionDate": editDecisionDate,
                    "decisionDetails": editDecisionDetails,
                    "decisionID": decision.id
                },
                success: function (response) {
                    if (response.status == 'success') {

                        // redirect user to appropriate page
                        window.location.href = "../view_case.html?id=" + caseID;
                    } else {
                        $('.errorEditDecision').html(response.message);
                    }
                },
                error: function (response) {
                    $('#errorEditDecision').html(response.responseJSON);
                }
            });


        }
    });

}


/******************** */

function addDecisionRow(table, decision) {


    const decisionID = decision.number;
    row = document.createElement('tr');
    num = document.createElement('td');
    num.append(decisionID);

    date = document.createElement('td');
    date.append(decision.date);

    details = document.createElement('td');
    details_str = decision.details;
    if (details_str.length > 50)
        details_str = details_str.substring(0, 50) + '.. إلخ'

    details.append(details_str);



    const viewBtn = document.createElement('button')
    viewBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
        + ' عرض القرار كامل'
    viewBtn.setAttribute('title', 'عرض القرار');
    viewBtn.classList.add('btn', 'btn-info', 'menu-operations-btn');
    viewBtn.setAttribute("data-bs-toggle", "modal")
    viewBtn.setAttribute("data-bs-target", "#viewDecicionBackdrop")
    viewBtn.onclick = function () {
        viewDecision(decisionID)
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
    operationMenu.append(viewOpLi)

    if (rule == 1 || rule == 2) {
        if (!caseItem.isArchived) {

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
                + ' مسح القرار'
            deleteBtn.setAttribute('title', 'مسح القرار');
            deleteBtn.classList.add('btn', 'btn-danger', 'menu-operations-btn');
            deleteBtn.setAttribute("data-bs-toggle", "modal")
            deleteBtn.setAttribute("data-bs-target", "#deleteDecisionBackdrop")
            document.getElementById('deleteDecisionButton').onclick = function () {
                deleteDecision(decisionID)
            }
            const delOpLi = document.createElement('li');
            delOpLi.append(deleteBtn)
            delOpLi.classList = 'operationMenuItem'

            operationMenu.append(delOpLi,);


        }



    }
    operations.append(opBtn, operationMenu);
    row.append(num, date, details, operations);
    table.append(row)

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