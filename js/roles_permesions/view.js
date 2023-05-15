(() => {
    'use strict'
    feather.replace({ 'aria-hidden': 'true' })
})();
/**************************** */

function setAuth() {
    addNewRolePermissionBtn = document.getElementById('addNewRolePermissionBtn');
    if (role == 1) {

        addNewRolePermissionBtn.innerHTML =
            '<button type="button" id="add-courts-button" class="operations-btn btn" onclick="addNewRole()">'
            + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle align-text-bottom" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
            + ' إضافة  دور جديد'
            + '</button>'
    }
}


function addNewRole(){
    window.location.href = 'add.html'
}



let data;

$(document).ready(function () {
    setAuth();

    // جلب البيانات من ملف JSON
    $.ajax({
        url: 'roles.json',
        dataType: 'json',
        success: function (response) {

            data = response;
            // تحديث Pagination
            displayAll();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('حدث خطأ: ' + textStatus + ' ' + errorThrown);
        }
    });
});



function displayAll() {

    // عرض الصفوف
    table = $('#table-body');
    table.empty();
    for (var i = 0; i < data.length; i++) {
        const role = data[i];
        addRoleRow(table, role)
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


function addRoleRow(table, role) {


    permessions=''
    n=role.permessions.length
    for(var i = 0 ; i<n;i++){
        permessions+=role.permessions[i];
        if(i!=n-1)
        permessions+=' - '
    }
    const row = $('<tr>').append(

        $('<td>').append(role.name),
        $('<td>').append(permessions)
    );
    row.attr('id', role.id);
    table.append(row);

}