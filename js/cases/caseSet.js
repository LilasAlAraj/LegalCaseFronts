let clientPlaintiffCounter = 0;
let lawyerPlaintiffCounter = 0;
let clientEnemyCounter = 0;
let lawyerEnemyCounter = 0;
let baseNumberCounter = 0;
// add new base number
function addBaseNumber() {
    const basenumbersContainer = document.getElementById('base_number_container');
    const newBaseNumberField = document.createElement('div');
    newBaseNumberField.classList.add("row")
    newBaseNumberField.id = 'base_number' + baseNumberCounter;
    newBaseNumberField.innerHTML = `
        
        <div class="col-6">

        <label for="base-number-${baseNumberCounter}"><b>رقم الأساس</b></label>
        <input type="number" class="base-number required-field" id="base-number-${baseNumberCounter}" placeholder="أدخل رقم الأساس"
                      name="base-number[]" required>

      </div>
      <div class="col-6"><label for="yearSelect-${baseNumberCounter}"><b>العام</b></label>
        <select id="yearSelect-${baseNumberCounter}" name="year[]">
        </select>
      </div>
      
   
      `
    basenumbersContainer.appendChild(newBaseNumberField);
    fillYears(baseNumberCounter);
    baseNumberCounter++;
}// حذف حقل رقم الاساس
function deleteBaseNumberField() {
    if (baseNumberCounter !== 1) {
        const baseNumbersContainer = document.getElementById('base_number_container');
        const baseNumberFieldToRemove = document.getElementById('base_number' + (baseNumberCounter - 1));

        baseNumbersContainer.removeChild(baseNumberFieldToRemove);
        baseNumberCounter--;

    }
}

// إضافة حقل جديد لاسم المدعي
function addClientPlaintiffField() {

    const plaintiffsContainer = document.getElementById('clientvs1');
    const newPlaintiffField = document.createElement('div');
    newPlaintiffField.id = 'clientPlaintiff' + clientPlaintiffCounter;
    newPlaintiffField.innerHTML = `
  

          <label for="client_name-${clientPlaintiffCounter}"><b>اسم المدعي</b></label>
          <input type="text" class="client_name"id="client_name-${clientPlaintiffCounter}" placeholder="أدخل اسم المدعي " name="client_names[]"
          oninput="showSuggestions(${clientPlaintiffCounter},'client')"  onblur="hideSuggestions(${clientPlaintiffCounter},'client')" required>
          <ul class="suggestions" id="suggestions-client-${clientPlaintiffCounter}"></ul>
   
      `
    plaintiffsContainer.appendChild(newPlaintiffField);
    clientPlaintiffCounter++;

}// حذف حقل المدعي
function deleteClientPlaintiffField() {
    if (clientPlaintiffCounter !== 1) {
        const plaintiffsContainer = document.getElementById('clientvs1');
        const plaintiffFieldToRemove = document.getElementById('clientPlaintiff' + (clientPlaintiffCounter - 1));
        plaintiffsContainer.removeChild(plaintiffFieldToRemove);
        clientPlaintiffCounter--;
    }
}

// إضافة حقل جديد لاسم محامي المدعي
function addLawyerPlaintiffField() {
    const plaintiffsContainer = document.getElementById('lawyervs1');
    const newPlaintiffField = document.createElement('div');
    newPlaintiffField.id = 'lawyerPlaintiff' + lawyerPlaintiffCounter;
    newPlaintiffField.innerHTML = `
  <label for="lawyer_name-${lawyerPlaintiffCounter}"><b>اسم الوكيل</b></label>
                          <input type="text" id="lawyer_name-${lawyerPlaintiffCounter}" placeholder="أدخل اسم الوكيل" name="lawyer_names[]" required>
      `
    plaintiffsContainer.appendChild(newPlaintiffField);
    lawyerPlaintiffCounter++;
}// حذف حقل محامي المدعي
function deleteLawyerPlaintiffField() {
    if (lawyerPlaintiffCounter !== 1) {
        const plaintiffsContainer = document.getElementById('lawyervs1');
        const plaintiffFieldToRemove = document.getElementById('lawyerPlaintiff' + (lawyerPlaintiffCounter - 1));
        plaintiffsContainer.removeChild(plaintiffFieldToRemove);
        lawyerPlaintiffCounter--;
    }
}



// إضافة حقل جديد لاسم محامي المدعي
function addClientEnemyField() {

    const enemyContainer = document.getElementById('clientvs2');
    const newEnemyField = document.createElement('div');
    newEnemyField.classList.add('row');

    newEnemyField.id = 'clientEnemy' + clientEnemyCounter;
    newEnemyField.innerHTML = `
    <div class = 'col-6'>
    <label for="enemy_name-${clientEnemyCounter}"><b>اسم المدعى عليه</b></label>
    <input type="text" class="clientEnemy_name" id="enemy_name-${clientEnemyCounter}" placeholder=" أدخل اسم المدعى عليه"
      name="clientEnemy_names[]"  required>
     </div>

     <div class = 'col-6'>
        <label for="enemy_phone-${clientEnemyCounter}"><b>رقم هاتفه إن وُجِد</b></label>
        <input type="text" class="clientEnemy_phone" id="enemy_phone-${clientEnemyCounter}" placeholder=" أدخل رقم الهاتف"
          name="clientEnemy_phones[]"  >
         </div>
      `
    enemyContainer.appendChild(newEnemyField);
    clientEnemyCounter++;

}//  حذف حقل  المدعي عليه
function deleteClientEnemyField() {

    if (clientEnemyCounter !== 1) {

        const enemyContainer = document.getElementById('clientvs2');
        const enemyFieldToRemove = document.getElementById('clientEnemy' + (clientEnemyCounter - 1));
        enemyContainer.removeChild(enemyFieldToRemove);
        clientEnemyCounter--;
    }

}



function addLawyerEnemyField() {
    const enemyContainer = document.getElementById('lawyervs2');
    const newEnemyField = document.createElement('div');
    newEnemyField.classList.add('row')
    newEnemyField.id = 'lawyerEnemy' + lawyerEnemyCounter;
    newEnemyField.innerHTML = `

  <div class = 'col-6'>
  <label for="lawyerEnemy_name-${lawyerEnemyCounter}"><b>اسم الوكيل</b></label>
  <input type="text" id="lawyerEnemy_name-${lawyerEnemyCounter}" placeholder="أدخل اسم الوكيل" name="lawyerEnemy_names[]" required>
</div>

<div class = 'col-6'>
<label for="lawyerEnemy_phone-${lawyerEnemyCounter}"><b>رقم هاتفه إن وُجِد</b></label>
<input type="text" class="lawyerEnemy_phone" id="lawyerEnemy_phone-${lawyerEnemyCounter}" placeholder=" أدخل رقم الهاتف"
  name="lawyerEnemy_phones[]" >
 </div>
      `
    enemyContainer.appendChild(newEnemyField);
    lawyerEnemyCounter++;


}//  حذف حقل محامي المدعي عليه
function deleteLawyerEnemyField() {

    if (lawyerEnemyCounter !== 1) {


        const enemyContainer = document.getElementById('lawyervs2');
        const enemyFieldToRemove = document.getElementById('lawyerEnemy' + (lawyerEnemyCounter - 1));
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




function collectData() {
    data = [];


    base_Numbers = document.getElementsByName('base-number[]');
    year_ = document.getElementsByName('year[]');
    Defendent_Clients = document.getElementsByName('clientEnemy_names[]');
    Defendent_Clients_Phones = document.getElementsByName('clientEnemy_phones[]');
    Defendent_Lawyers = document.getElementsByName('lawyerEnemy_names[]');
    Defendent_Lawyers_Phones = document.getElementsByName('lawyerEnemy_phones[]');
    Plaintaiff_Clients = document.getElementsByName('client_names[]');
    Plaintaiff_Lawyers = document.getElementsByName('lawyer_names[]');




    baseNumbers = [];
    years = [];
    for (var i = 0, k = 0; i < base_Numbers.length; i++) {
        if (base_Numbers[i].value !== '') {
            baseNumbers[k] = (base_Numbers[i].value);
            years[k++] = (year_[i].value);
        }

    }

    DefendentClients = []
    for (var i = 0, k = 0; i < Defendent_Clients.length; i++) {
        if (Defendent_Clients[i].value != '') {
            DefendentClients[k++] = { 'name': Defendent_Clients[i].value, 'phone': Defendent_Clients_Phones[i].value };
        }
    }
    DefendentLawyers = [];
    for (var i = 0, k = 0; i < Defendent_Lawyers.length; i++) {
        if (Defendent_Lawyers[i].value != '') {
            DefendentLawyers[k++] = { 'name': Defendent_Lawyers[i].value, 'phone': Defendent_Lawyers_Phones[i].value };
        }
    }

    PlaintaiffClients = []
    for (var i = 0, k = 0; i < Plaintaiff_Clients.length; i++) {
        if (Plaintaiff_Clients[i].value != '') {
            PlaintaiffClients[k++] = (Plaintaiff_Clients[i].value);

        }
    }

    PlaintaiffLawyers = []
    for (var i = 0, k = 0; i < Plaintaiff_Lawyers.length; i++) {
        if (Plaintaiff_Lawyers[i].value != '') {
            PlaintaiffLawyers[k++] = (Plaintaiff_Lawyers[i].value);
        }
    }

    case_title = document.getElementById('case_tiltle').value;
    court = document.getElementById('court').value;
    room = document.getElementById('case_room').value;

    data["case_title"] = case_title;
    data["court"] = court;
    data["room"] = room;
    data["PlaintaiffClients"] = PlaintaiffClients;
    data["PlaintaiffLawyers"] = PlaintaiffLawyers;
    data["DefendentLawyers"] = DefendentLawyers;
    data["DefendentClients"] = DefendentClients;
    data["baseNumbers"] = baseNumbers;
    data["years"] = years;

    console.log(data)
    return data;


}