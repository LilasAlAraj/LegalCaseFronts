
(() => {
    'use strict'

    feather.replace({ 'aria-hidden': 'true' })

        ;



})();

//////////////////////الوقت
function updateTime() {
    var now = new Date();
    // jQuery('#time').val(now.toString());   
    document.getElementById("time").innerHTML = now.toString();

}

setInterval(updateTime, 1000);
/////////////////////

function edit_case() {

    const caseID = new URLSearchParams(window.location.search).get("id");
    window.location.href = "edit.html?id=" + caseID;
}



function remove_case() {

    const caseID = new URLSearchParams(window.location.search).get("id");
    window.location.href = "edit.html?id=" + caseID;
}



function archive_case() {

    const caseID = new URLSearchParams(window.location.search).get("id");
    window.location.href = "edit.html?id=" + caseID;
}
/************************************/


function edit_additional_details() {

    const caseID = new URLSearchParams(window.location.search).get("id");
    window.location.href = "edit.html?id=" + caseID;
}
/***********************************/

function add_session() {

    const caseID = new URLSearchParams(window.location.search).get("id");
    window.location.href = "edit.html?id=" + caseID;
}
/***********************************/



function add_attachment() {

    const caseID = new URLSearchParams(window.location.search).get("id");
    window.location.href = "edit.html?id=" + caseID;
}
/***********************************/

function add_decision() {

    const caseID = new URLSearchParams(window.location.search).get("id");
    window.location.href = "edit.html?id=" + caseID;
}
