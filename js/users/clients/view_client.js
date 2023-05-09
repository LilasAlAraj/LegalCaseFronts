(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

})();

/********************* */

let data, client;



$(document).ready(function () {

    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'clients.json',
        dataType: 'json',
        success: function (response) {




            const clientID = new URLSearchParams(window.location.search).get("id");
            function isClient(value) {
                return value.id == clientID;
            }
            data = response.filter(isClient);
            client = data[0]


            setClientData();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });



}
);




function setClientData() {

    // ضبط الاسم
    document.getElementById('name').append(client.first_name + ' ' + client.last_name)
    // ضبط رقم الهاتف
    document.getElementById('phone_number').append(client.phone_number)
    // ضبط اسم الأب
    document.getElementById('father_name').append(client.father_name)
    // ضبط اسم الأم
    document.getElementById('mother_name').append(client.mother_name)
    // ضبط تاريخ الولادة
    document.getElementById('date_of_birth').append(client.date_of_birth)
    // ضبط مكان الولادة
    document.getElementById('place_of_birth').append(client.place_of_birth)
    // ضبط العنوان الحالي
    document.getElementById('current_address').append(client.current_address)


    if (client.email != '') {
        b = document.createElement('b')
        b.innerHTML='البريد الإلكتروني: '
        document.getElementById('email').append(b,client.email)
    }


}