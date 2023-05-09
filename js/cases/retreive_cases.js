
(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })



})();



$(document).ready(function () {
    var table = document.getElementsByClassName("table")[0];

    if (table.rows.length == 1) {

        var headerRow = table.rows[0];
        var numColumns = headerRow.cells.length;
        var row = table.insertRow(1);
        var cell = row.insertCell(0);
        cell.colSpan = numColumns;
        cell.innerHTML = "لا يوجد بيانات";

    }
});


/********************* */

let data;
let currentData;



function displayAll() {
    updatePagination(currentData);
    showPage(1, currentData)

}

function retreive() {
    $('#retreive-form').validate(
        {
            rules: {
                toSearch: {
                    required: true
                }
            },
            messages: {
                toSearch: {
                    required: "الرجاء إدخال ما تريد البحث عنه"
                }
            },
            submitHandler: function (form) {
                $('.error').html()
                var toSearch = $('#toSearch').val();


                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: 'test.json',
                    type: 'get',
                    data: {
                        'toSearch': toSearch
                    },
                    success: function (response) {

                        currentData = data = response;
                        // تحديث Pagination
                        displayAll();

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
                    }
                });
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


// عرض الصفحة المحددة من الجدول
function showPage(pageNumber, data) {
    // حساب الصفوف التي يجب عرضها
    var itemsPerPage = 10;
    var startIndex = (pageNumber - 1) * itemsPerPage;
    var endIndex = Math.min(startIndex + itemsPerPage, data.length);

    // عرض الصفوف
    $('#table-body').empty();
    for (var i = startIndex; i < endIndex; i++) {
        const case_ = data[i];



        var case_numbers = '';
        for (var j = 0; j < case_.case_numbers.length; j++) {
            case_numbers += case_.case_numbers[j];
            if (j !== case_.case_numbers.length - 1)
                case_numbers += "\n____________\n";
        }


        var plaintiff_names = '';
        for (var j = 0; j < case_.plaintiff_names.length; j++) {
            plaintiff_names += case_.plaintiff_names[j];
            if (j !== case_.plaintiff_names.length - 1)
                plaintiff_names += "\n____________\n";
        }



        var plaintiff_lawyers = '';
        for (var j = 0; j < case_.plaintiff_lawyers.length; j++) {
            plaintiff_lawyers += case_.plaintiff_lawyers[j];
            if (j !== case_.plaintiff_lawyers.length - 1)
                plaintiff_lawyers += "\n____________\n";
        }
        var defendant_names = '';
        for (var j = 0; j < case_.defendant_names.length; j++) {
            defendant_names += case_.defendant_names[j];
            if (j !== case_.defendant_names.length - 1)
                defendant_names += "\n____________\n";
        }


        var defendant_lawyers = '';
        for (var j = 0; j < case_.defendant_lawyers.length; j++) {
            defendant_lawyers += case_.defendant_lawyers[j];
            if (j !== case_.defendant_lawyers.length - 1)
                defendant_lawyers += "\n____________\n";
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




        const viewBtn = document.createElement('button')
        viewBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-text-bottom" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
            + ' عرض القضية كاملة'
        viewBtn.setAttribute('title', 'عرض القضية');
        viewBtn.classList.add('btn', 'btn-info', 'menu-operations-btn');
        viewBtn.onclick = function () {
            viewCase(case_.id)
        }
        const viewOpLi = document.createElement('li');
        viewOpLi.append(viewBtn);
        viewOpLi.classList = 'operationMenuItem'



        operationMenu.append(viewOpLi);


        operations.append(opBtn, operationMenu);

        const state = document.createElement('span');
        state.classList.add('badge', 'state');

        if (case_.state === 1) {
            //winner
            state.classList.add('text-bg-success');
            state.innerHTML = 'رابحة'
        } else if (case_.state === 2) {
            //losser
            state.innerHTML = 'خاسرة'
            state.classList.add('text-bg-danger');
        } else if (case_.state === 3) {
            //running
            state.innerHTML = 'جار العمل عليها'
            state.classList.add('text-bg-info');
        } else if (case_.state === 4) {
            //blocked
            state.innerHTML = 'معلقة'
            state.classList.add('text-bg-dark');
        }

        const row = $('<tr>').append(
            $('<td>').append($('<pre>').text(case_numbers)),
            $('<td>').text(case_.case_title),
            $('<td>').text(case_.court + "/" + case_.room),
            $('<td>').append($('<pre>').text(plaintiff_names)),
            $('<td>').append($('<pre>').text(plaintiff_lawyers)),
            $('<td>').append($('<pre>').text(defendant_names)),
            $('<td>').append($('<pre>').text(defendant_lawyers)),
            $('<td>').append(state),
            $('<td>').append(operations)

        );

        row.attr('id', case_.id);
        $('#table-body').append(row);
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


function viewCase(caseId) {
    window.location.href = "view_case.html?id=" + caseId;

}

function reverseData() {

    let tempCurrentData = [];

    const n = currentData.length - 1;
    for (var i = n; i >= 0; i--)
        tempCurrentData[n - i] = currentData[i];

    currentData = tempCurrentData;

    currentPageGlobally = 1;
    updatePagination(currentData);
    showPage(currentPageGlobally, currentData);

    btn = document.getElementById('reverse-btn');
    if (btn.getAttribute('data-display') === 'asc') {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' + 'عرض تصاعدي'
        btn.setAttribute('data-display', 'desc')
    } else if (btn.getAttribute('data-display') === 'desc') {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw align-text-bottom" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>' + 'عرض تنازلي'
        btn.setAttribute('data-display', 'asc')
    }
}



