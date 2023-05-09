(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })



})();

/********************* */


function setAuth() {
    addNewMemberButton = document.getElementById('addNewMemberButton');
    if (role == 1 || role == 2) {

        addNewMemberButton.innerHTML =
            '<button type="button" id="add-members-button" class="operations-btn btn"'
            + 'onclick="add_member()" style="">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة  فرد جديد'

            + '</button>'
    }
}

function add_member() {
    window.location.href = "add_member.html";
}

let data;
var currentData;

$(document).ready(function () {
    setAuth();

    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'members.json',
        dataType: 'json',
        success: function (response) {

            currentData = data = response;
            // تحديث Pagination
            displayAll();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });
});

function displayAll() {
    updatePagination(currentData);
    showPage(1, currentData)
}

function searchByName() {
    $('#searchByName').validate(
        {
            rules: {
                name: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "الرجاء إدخال الاسم"
                }
            },
            submitHandler: function (form) {
                $('.error').html()
                var name = $('#name').val();
                var searchResults = [];



                //اضافة جلب بيانات البحث

                currentData = searchResults;
                updatePagination(currentData);
                showPage(1, currentData)
            }
        }
    )
}

var currentPageGlobally = 1;



// تحديث Pagination بعد تحديد الفترة الزمنية
function updatePagination(data) {

    // إزالة Pagination الحالي
    $('#pagination').empty();

    // إنشاء Pagination جديد
    var itemsPerPage = 10;
    var totalPages = Math.ceil(data.length / itemsPerPage);



    // show up to 5 pages
    var maxPagesToShow = 5;
    var startPage, endPage;
    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPageGlobally <= Math.ceil(maxPagesToShow / 2)) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPageGlobally + Math.floor(maxPagesToShow / 2) >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPageGlobally - Math.floor(maxPagesToShow / 2);
            endPage = currentPageGlobally + Math.floor(maxPagesToShow / 2);
        }
    }


    // إضافة زر السابق


    const prevLi = document.createElement('li');
    prevLi.classList.add('page-item');



    const prevLiChild = document.createElement('a');
    prevLiChild.classList.add('page-link');



    prevLiChild.onclick = function () {
        if (currentPageGlobally > 1) {
            currentPageGlobally--;
            updatePagination(currentData, currentPageGlobally);

        }
    }

    prevLiChild.innerHTML = '«'

    prevLi.appendChild(prevLiChild)
    if (currentPageGlobally === 1) {
        prevLi.classList.add('disabled');
    }

    $('#pagination').append(prevLi);
    for (var i = startPage; i <= endPage; i++) {
        const currentPage = i; // تخزين القيمة الحالية لـ i


        const li = document.createElement('li');
        li.classList.add('page-item');


        const liChild = document.createElement('a');
        liChild.classList.add('page-link');
        li.setAttribute('page', currentPage);


        liChild.onclick = function () {
            currentPageGlobally = li.getAttribute('page');

            updatePagination(currentData, currentPageGlobally);



        }

        liChild.innerHTML = currentPage

        li.appendChild(liChild)


        $('#pagination').append(li);

        if (i === currentPageGlobally) {
            li.classList.add('active');
        }


    }




    // إضافة زر next


    const nextLi = document.createElement('li');
    nextLi.classList.add('page-item');



    const nextLiChild = document.createElement('a');
    nextLiChild.classList.add('page-link');



    nextLiChild.onclick = function () {
        if (currentPageGlobally < totalPages) {
            currentPageGlobally++;
            updatePagination(currentData, currentPageGlobally);

        }
    }

    nextLiChild.innerHTML = '»'

    nextLi.appendChild(nextLiChild)
    $('#pagination').append(nextLi);

    if (currentPageGlobally === totalPages) {
        nextLi.classList.add('disabled');
    }

    // عرض الصفحة الحالية من الجدول
    showPage(currentPageGlobally, currentData);

    // عند النقر على أزرار الانتقال ثم اختيار الصفحة المناسبة وتلوينها
    const pi = $('#pagination .page-item');

    for (var i = 0; i < pi.length; i++) {
        if (currentPageGlobally === pi[i].getAttribute('page'))
            pi[i].classList.add('active')
    }
}

function addMemberRow(table, member) {


    const member_name = member.first_name + " " + member.last_name;
    const member_father_name = member.father_name;
    const member_mother_name = member.mother_name;
    const member_date_of_birth = member.date_of_birth;
    const member_place_of_birth = member.place_of_birth;
    const member_phone_number = member.phone_number;
    const member_current_address = member.current_address;
    const member_email = member.email;
    const member_rule = member.rule;
    const member_id = member.id;

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




    const viewBtn = document.createElement('button')
    viewBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
        + ' عرض المعلومات كاملة'
    viewBtn.setAttribute('title', 'عرض المعلومات');
    viewBtn.classList.add('btn', 'btn-info', 'menu-operations-btn');
    viewBtn.onclick = function () {
        viewMember(member_id)
    }
    const viewOpLi = document.createElement('li');
    viewOpLi.append(viewBtn);
    viewOpLi.classList = 'operationMenuItem'
    operationMenu.append(viewOpLi);



    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit align-text-bottom" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
        + ' تعديل معلومات الفرد'
    editBtn.setAttribute('title', 'تعديل معلومات الفرد');
    editBtn.classList.add('btn', 'btn-warning', 'menu-operations-btn');

    editBtn.onclick = function () {
        editMember(member_id)
    }






    const editOpLi = document.createElement('li');
    editOpLi.append(editBtn)
    editOpLi.classList = 'operationMenuItem'

    if (role == 1 || role == 2)
        operationMenu.append(editOpLi);


    operations.append(opBtn, operationMenu);



    const row = $('<tr>').append(

        $('<td>').append(member_name),
        $('<td>').append(member_father_name),
        $('<td>').append(member_mother_name),
        $('<td>').append(member_phone_number),
        $('<td>').append(member_rule),
        $('<td>').append(operations)
    );
    row.attr('id', member_id);
    table.append(row);
}

// عرض الصفحة المحددة من الجدول
function showPage(pageNumber, data) {
    // حساب الصفوف التي يجب عرضها
    var itemsPerPage = 10;
    var startIndex = (pageNumber - 1) * itemsPerPage;
    var endIndex = Math.min(startIndex + itemsPerPage, data.length);


    // عرض الصفوف
    table = $('#table-body');
    table.empty();
    for (var i = startIndex; i < endIndex; i++) {
        const member = data[i];
        addMemberRow(table, member)
    }



    var table = document.getElementsByClassName("table")[0];
    if (table.rows.length == 1) {

        var headerRow = table.rows[0];
        var numColumns = headerRow.cells.length;
        var row = table.insertRow(1);
        var cell = row.insertCell(0);
        cell.colSpan = numColumns;
        cell.innerHTML = "لا يوجد بيانات";

    }

}


function viewMember(memberId) {
    window.location.href = "view_member.html?id=" + memberId;

}


function editMember(memberId) {
    window.location.href = "edit_member.html?id=" + memberId;

}
function reverseData() {

    let tempCurrentData = [];

    const n = currentData.length - 1;
    for (var i = n; i >= 0; i--)
        tempCurrentData[n - i] = currentData[i];

    currentData = tempCurrentData;

    currentPageGlobally = 1;
    updatePagination(currentData);
    // showPage(currentPageGlobally, currentData);
    btn = document.getElementById('reverse-btn');
    if (btn.getAttribute('data-display') === 'asc') {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' + 'عرض تصاعدي'
        btn.setAttribute('data-display', 'desc')
    } else if (btn.getAttribute('data-display') === 'desc') {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' + 'عرض تنازلي'
        btn.setAttribute('data-display', 'asc')
    }
}



