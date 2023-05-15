let role = 3; //1->supervisor , 2->secretaria, 3->lawyer, 4->client

(() => {
    role = 1;


    /*
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: "http://127.0.0.1:8000/login",
            type: "get",
    
            success: function (response) {
                rule = response.data.role;
            },
    
            error: function (response) {
                console.log(response.responseJSON);
            }
        });
    */
})();
