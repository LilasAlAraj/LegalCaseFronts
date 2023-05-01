

(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })
    ;

  fillYears(0);

})();

//////////////////////الوقت
function updateTime() {
  var now = new Date();
  // jQuery('#time').val(now.toString());   
  document.getElementById("time").innerHTML = now.toString();
}

setInterval(updateTime, 1000);

/********************* */
let clientPlaintiffCounter = 0;
let lawyerPlaintiffCounter = 0;
let clientEnemyCounter = 0;
let lawyerEnemyCounter = 0;

let baseNumberCounter = 1;

// add new base number
function addBaseNumber() {
  const basenumbersContainer = document.getElementById('base_number_container');
  const newBaseNumberField = document.createElement('div');
  newBaseNumberField.classList.add("row")
  newBaseNumberField.id = 'base_number' + baseNumberCounter;
  newBaseNumberField.innerHTML = `
        
        <div class="col-6">

        <label for="base-number-${baseNumberCounter}"><b>رقم الأساس</b></label>
        <input type="number" class="base-number" id="base-number-${baseNumberCounter}" placeholder="أدخل رقم الأساس"
                      name="base-number[]">

      </div>
      <div class="col-6"><label for="yearSelect-${baseNumberCounter}"><b>العام</b></label>
        <select id="yearSelect-${baseNumberCounter}" name="year[]">
        </select>
      </div>
      
   
      `
  basenumbersContainer.appendChild(newBaseNumberField);
  fillYears(baseNumberCounter);

  const delete_btn = document.createElement('button');
  delete_btn.type = "button";
  delete_btn.className = "delete-base-number-btn";
  delete_btn.id = "delete-base-number-btn" + baseNumberCounter;

  delete_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus align-text-bottom" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
  delete_btn.setAttribute("data-id", baseNumberCounter);
  basenumbersContainer.appendChild(delete_btn);

  delete_btn.onclick = function () {
    deleteBaseNumberField(delete_btn.dataset.id);
  }; baseNumberCounter++;
}// حذف حقل رقم الاساس
function deleteBaseNumberField(baseNumberId) {
  const baseNumbersContainer = document.getElementById('base_number_container');
  const baseNumberFieldToRemove = document.getElementById('base_number' + (baseNumberId));
  const baseNumberBtnToRemove = document.getElementById("delete-base-number-btn" + (baseNumberId));

  baseNumbersContainer.removeChild(baseNumberFieldToRemove);
  baseNumbersContainer.removeChild(baseNumberBtnToRemove);
}

// إضافة حقل جديد لاسم المدعي
function addClientPlaintiffField() {
  clientPlaintiffCounter++;

  const plaintiffsContainer = document.getElementById('clientvs1');
  const newPlaintiffField = document.createElement('div');
  newPlaintiffField.id = 'clientPlaintiff' + clientPlaintiffCounter;
  newPlaintiffField.innerHTML = `
  

          <label for="client_name-${clientPlaintiffCounter}"><b>اسم المدعي</b></label>
          <input type="text" class="client_name"id="client_name-${clientPlaintiffCounter}" placeholder="أدخل اسم المدعي" name="client_names[]"
          oninput="showSuggestions(${clientPlaintiffCounter},'client')"  onblur="hideSuggestions(${clientPlaintiffCounter},'client')" required>
          <ul class="suggestions" id="suggestions-client-${clientPlaintiffCounter}"></ul>
   
      `
  plaintiffsContainer.appendChild(newPlaintiffField);
}// حذف حقل المدعي
function deleteClientPlaintiffField() {
  if (clientPlaintiffCounter === 0) {

  } else {

    const plaintiffsContainer = document.getElementById('clientvs1');
    const plaintiffFieldToRemove = document.getElementById('clientPlaintiff' + (clientPlaintiffCounter));
    plaintiffsContainer.removeChild(plaintiffFieldToRemove);
    clientPlaintiffCounter--;
  }
}

// إضافة حقل جديد لاسم محامي المدعي
function addLawyerPlaintiffField() {
  lawyerPlaintiffCounter++;

  const plaintiffsContainer = document.getElementById('lawyervs1');
  const newPlaintiffField = document.createElement('div');
  newPlaintiffField.id = 'lawyerPlaintiff' + lawyerPlaintiffCounter;
  newPlaintiffField.innerHTML = `
  


  <label for="lawyer_name--${lawyerPlaintiffCounter}"><b>اسم الوكيل</b></label>
                          <input type="text" id="lawyer_name--${lawyerPlaintiffCounter}" placeholder="أدخل اسم الوكيل" name="lawyer_name[]">
                        
         
      `
  plaintiffsContainer.appendChild(newPlaintiffField);


}// حذف حقل محامي المدعي
function deleteLawyerPlaintiffField() {

  if (lawyerPlaintiffCounter === 0) {

  } else {

    const plaintiffsContainer = document.getElementById('lawyervs1');
    const plaintiffFieldToRemove = document.getElementById('lawyerPlaintiff' + (lawyerPlaintiffCounter));
    plaintiffsContainer.removeChild(plaintiffFieldToRemove);
    lawyerPlaintiffCounter--;
  }

}






//  إضافة حقل جديد لاسم المدعي عليه


// إضافة حقل جديد لاسم المدعي
function addClientPlaintiffField() {
  clientPlaintiffCounter++;

  const plaintiffsContainer = document.getElementById('clientvs1');
  const newPlaintiffField = document.createElement('div');
  newPlaintiffField.id = 'clientPlaintiff' + clientPlaintiffCounter;
  newPlaintiffField.innerHTML = `
  

          <label for="client_name-${clientPlaintiffCounter}"><b>اسم المدعي</b></label>
          <input type="text" class="client_name"id="client_name-${clientPlaintiffCounter}" placeholder="أدخل اسم المدعي" name="client_names[]"
          oninput="showSuggestions(${clientPlaintiffCounter},'client')"  onblur="hideSuggestions(${clientPlaintiffCounter},'client')" required>
          <ul class="suggestions" id="suggestions-client-${clientPlaintiffCounter}"></ul>
   
      `
  plaintiffsContainer.appendChild(newPlaintiffField);
}// حذف حقل المدعي
function deleteClientPlaintiffField() {
  if (clientPlaintiffCounter === 0) {

  } else {

    const plaintiffsContainer = document.getElementById('clientvs1');
    const plaintiffFieldToRemove = document.getElementById('clientPlaintiff' + (clientPlaintiffCounter));
    plaintiffsContainer.removeChild(plaintiffFieldToRemove);
    clientPlaintiffCounter--;
  }
}

// إضافة حقل جديد لاسم محامي المدعي
function addClientEnemyField() {
  clientEnemyCounter++;

  const enemyContainer = document.getElementById('clientvs2');
  const newEnemyField = document.createElement('div');
  newEnemyField.id = 'clientEnemy' + clientEnemyCounter;
  newEnemyField.innerHTML = `

        <label for="enemy_name-${clientEnemyCounter}"><b>اسم المدعي عليه</b></label>
        <input type="text" class="clientEnemy_name" id="enemy_name-${clientEnemyCounter}" placeholder="أدخل اسم المدعي"
          name="clientEnemy_names[]" oninput="showSuggestions(${clientEnemyCounter}, 'enemy')"
          onfocus="showSuggestions(${clientEnemyCounter}, 'enemy')" onblur="hideSuggestions(${clientEnemyCounter}, 'enemy')" required>
        <ul class="suggestions" id="suggestions-enemy-${clientEnemyCounter}"></ul>
         
      `
  enemyContainer.appendChild(newEnemyField);


}//  حذف حقل  المدعي عليه
function deleteClientEnemyField() {

  if (clientEnemyCounter === 0) {

  } else {

    const enemyContainer = document.getElementById('clientvs2');
    const enemyFieldToRemove = document.getElementById('clientEnemy' + (clientEnemyCounter));
    enemyContainer.removeChild(enemyFieldToRemove);
    clientEnemyCounter--;
  }

}



function addLawyerEnemyField() {
  lawyerEnemyCounter++;

  const enemyContainer = document.getElementById('lawyervs2');
  const newEnemyField = document.createElement('div');
  newEnemyField.id = 'lawyerEnemy' + lawyerEnemyCounter;
  newEnemyField.innerHTML = `

  
  <label for="lawyerEnemy_name-${lawyerEnemyCounter}"><b>اسم الوكيل</b></label>
  <input type="text" id="lawyerEnemy_name-${lawyerEnemyCounter}" placeholder="أدخل اسم الوكيل" name="lawyerEnemy_name[]">

      `
  enemyContainer.appendChild(newEnemyField);


}//  حذف حقل محامي المدعي عليه
function deleteLawyerEnemyField() {

  if (lawyerEnemyCounter === 0) {

  } else {

    const enemyContainer = document.getElementById('lawyervs2');
    const enemyFieldToRemove = document.getElementById('lawyerEnemy' + (lawyerEnemyCounter));
    enemyContainer.removeChild(enemyFieldToRemove);
    lawyerEnemyCounter--;
  }

}



//جلب الاقتراحات من المخدم
function fetchSuggestions(input) {
  let suggestions;
  if (input !== '')
    suggestions = [input + ' list1', input + ' list2', input + ' list3', input + ' list4']; // قائمة الاقتراحات يمكن استبدالها ببيانات حقيقية
  else
    suggestions = []
  return suggestions;
}
// ملئ قائمة القتراحات
function fillSuggestionList(suggestionsList, suggestions) {

  suggestionsList.innerHTML = '';
  for (let i = 0; i < suggestions.length; i++) {
    const suggestion = suggestions[i];

    const suggestionElement = document.createElement('li');
    suggestionElement.textContent = suggestion;
    suggestionElement.addEventListener('click', function () {
      input.value = suggestion;
      suggestionsList.innerHTML = '';
    });
    suggestionsList.appendChild(suggestionElement);
  }
  if (suggestions.length != 0)
    suggestionsList.style.display = 'block';
  else
    suggestionsList.style.display = 'none';

}
// عرض قائمة الاقتراحات
function showSuggestions(inputId, state) {
  const input = document.getElementById(state + "_name-" + inputId);
  const suggestionsList = document.getElementById(`suggestions-${state}-${inputId}`);
  const suggestions = fetchSuggestions(input.value);
  fillSuggestionList(suggestionsList, suggestions)

}

// إخفاء قائمة الاقتراحات عند الخروج من الحقل  
function hideSuggestions(inputId, state) {
  const suggestionsList = document.getElementById(`suggestions-${state}-${inputId}`);
  suggestionsList.style.display = 'none';
}

/////اختيار العام لرقم الأساس
function fillYears(id) {
  // الحصول على عنصر select عن طريق الـ id
  var yearSelect = document.getElementById("yearSelect-" + id);

  // الحصول على التاريخ الحالي
  var currentYear = new Date().getFullYear();

  for (i = 1980; i <= currentYear + 1; i++) {
    var option = document.createElement("option");
    option.text = i;
    option.value = i;
    yearSelect.add(option);
  }
  yearSelect.value = currentYear.toString();


}