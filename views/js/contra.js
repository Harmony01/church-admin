$('#accID').on('change',function(e){
    var debitCash = `<option value="2">Cash</option>`;
    var debitBank = `<option value="3">Bank</option>`;
    if ($(this).val()==2) {
       $('#credit').html(debitBank);
    }else{
        $('#credit').html(debitCash); 
    }
})

$('#amount').on('change',function(e){
   if (isNaN($(this).val())) {
    alert('amount must be a mumber')
   }else{
    $('#camount').val($(this).val());
   }
})

$('#recordRev').on('click',(e)=>{
    let formData = {
        'date': $('#date').val(),
        'accID': $('#accID').val(),
        'amount': $('#amount').val(),
        'details': $('#details').val(),
        'ref_no': $('#ref_no').val(),
        'credit': $('#credit').val(),
        'camount': $('#camount').val(),
    }

    //console.log(formData);
    if (confirm('do you want to proceed?')) {
       window.contraApi.postContra(formData);
    }else{

    }
})

window.contraApi.contraRes((e,data)=>{
    if (data) {
        $('#amount').val('') 
        $('#details').val('')
        $('#ref_no').val('')
        $('#camount').val('')
    }
})