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

function add_aappointment() {
    window.location.href = "add.html";
}

let data;

$(document).ready(function () {

    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'test.json',
        dataType: 'json',
        success: function (response) {

            data = response;

            // تحديث Pagination
            updatePagination(data);
            showPage(1, data)

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });
});



function search() {

    $('#search-options').validate(
        {

            rules: {
                from_date: {
                    required: true
                },
                to_date: {
                    required: true
                }
            },
            messages: {
                from_date: {
                    required: "الرجاء اختيار التاريخ"
                },
                to_date: {
                    required: "الرجاء اختيار التاريخ"
                }
            },
            submitHandler: function (form) {

                $('.error').html()


                var from_date = $('#from_date').val();
                var to_date = $('#to_date').val();




                let from = new Date(from_date).getTime();
                let to = new Date(to_date).getTime();

                if (from > to) {
                    $('.error').html('الرجاء اختيار التواريخ بشكل صحيح')

                } else {


                    var searchResults = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].date >= from_date && data[i].date <= to_date) {
                            searchResults.push(data[i]);
                        }
                    }

                    updatePagination(searchResults);

                    showPage(1, searchResults)

                }

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
            updatePagination(data, currentPageGlobally);

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

            updatePagination(data, currentPageGlobally);



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
            updatePagination(data, currentPageGlobally);

        }
    }

    nextLiChild.innerHTML = '»'

    nextLi.appendChild(nextLiChild)
    $('#pagination').append(nextLi);

    if (currentPageGlobally === totalPages) {
        nextLi.classList.add('disabled');
    }

    // عرض الصفحة الحالية من الجدول
    showPage(currentPageGlobally, data);

    // عند النقر على أزرار الانتقال ثم اختيار الصفحة المناسبة وتلوينها
    const pi = $('#pagination .page-item');

    console.log(currentPageGlobally)
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
        var item = data[i];


        const btn = document.createElement('button');
        btn.innerHTML =  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-text-bottom" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
        btn.classList.add('btn', 'btn-sm');
        btn.classList.add('btn-danger');
        btn.onclick = function () {
            deleteCase(item.id)

        }  
        btn.setAttribute('title', 'امسح الموعد');

        var row = $('<tr>').append(
            $('<td>').text(item.date),
            $('<td>').text(item.time),
            $('<td>').text(item.name),
            $('<td>').text(item.reason),
            $('<td>').append(btn),

        );
        $('#table-body').append(row);




    }

    // تمييز الصفحة الحالية في Pagination
}

function deleteCase(itemId) {
    var confirmation = confirm("هل أنت متأكد من حذف هذا العنصر؟");
    if (confirmation) {
        // احذف الصف من الجدول هنا، ويمكن استخدام المعرف المحدد لهذا الصف
    }
}



