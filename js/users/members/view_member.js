(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

})();
/********************* */

let data, member;



$(document).ready(function () {

    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'members.json',
        dataType: 'json',
        success: function (response) {




            const memberID = new URLSearchParams(window.location.search).get("id");
            function isClient(value) {
                return value.id == memberID;
            }
            data = response.filter(isClient);
            member = data[0]


            setMemberData();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });



}
);




function setMemberData() {

    // ضبط الاسم
    document.getElementById('name').append(member.first_name + ' ' + member.last_name)
    // ضبط رقم الهاتف
    document.getElementById('phone_number').append(member.phone_number)
    // ضبط اسم الأب
    document.getElementById('father_name').append(member.father_name)
    // ضبط اسم الأم
    document.getElementById('mother_name').append(member.mother_name)
    // ضبط تاريخ الولادة
    document.getElementById('date_of_birth').append(member.date_of_birth)
    // ضبط مكان الولادة
    document.getElementById('place_of_birth').append(member.place_of_birth)
    // ضبط العنوان الحالي
    document.getElementById('current_address').append(member.current_address)
    // ضبط الدور الحالي
    document.getElementById('rule').append(member.rule)


    if (member.email != '') {
        b = document.createElement('b')
        b.innerHTML = 'البريد الإلكتروني: '
        document.getElementById('email').append(b, member.email)
    }


}