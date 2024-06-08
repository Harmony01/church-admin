import { baseDeveloper} from "./modules/script.js";
let formData = {}
window.expense.expenseItems((_, data)=>{
  console.log(data) 
 //let receiveInId = document.getElementById('payWith');
 //populate selectors
 let accType = document.getElementById('accType');
 baseDeveloper.fillSelectField2(data.exp, accType);
 //let lc = document.getElementById('localId');
 let otherRev = document.getElementById('debitAcc')
 otherRev.innerHTML='';
     //receiveInId.innerHTML='';
   for (let index = 0; index < data.payWith.length; index++) { 
        if (data.payWith[index].name=='Cash' || data.payWith[index].name=='Bank') {
          //accType.innerHTML += "<option value='" + data.payWith[index].Account_id +"'>" + data.payWith[index].name + "</option>";
        }else{
          otherRev.innerHTML += "<option value='" + data.payWith[index].Account_id +"'>" + data.payWith[index].name + "</option>";
        } 
    }

//lc.innerHTML='';
otherRev.innerHTML += "<option value='" + data.lc.id +"'>" + data.lc.name + "</option>";
$('#bal').val(data.bal)
//display the analytical table
$('#payWith').on('change',()=>{
  let id = $('#payWith').val()
  //console.log(id)
  window.expense.getBal(id);
  window.expense.getBalRes((e,data)=>{
    $('#bal').val(data)
  })
})
for (let i = 0; i < data.reAnal.length; i++) {
//re++
  const trTemp = `
  <tr class="${i}" id="trow">
  <td><span style="" class="accountID${i} hide">${data.reAnal[i].Account_id}</span> <span>${data.reAnal[i].accName}</span></td>
  <td style="text-align:right;"><span style="display:none;" class="analysTotal amount${i}">0</span><span>0.00</span></td>
  </tr>
  `
  $('.cashAnalytics').append(trTemp);
  //$('.holdAnal').append(trTemp);
  //console.log('hello')
}  
//const trow = document.querySelectorAll('#trow')
})


//revenue stopring script
const removeRec = document.querySelectorAll('.removeRec');
    $('body').on('click','.removeRec',function(e){
        e.preventDefault();
        var elID = $(this).children('span.second').text()
        ReverseAnalytics(elID);
        //console.log($(this).children('span.second').text());
        $(this).parent().parent().remove();
        rowId--;
        rowIdl--;
        sumAmout($('.totalAmount'),$('#rowHold'))
        $('#Lamt').val(calAmount($('.amtLC')).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
        $('#Lamt2').val(calAmount($('.amtLC')))
        $('.analysFianalTotal').text(calAmount($('.analysTotal')).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
        $('.checkTotal').text(calAmount($('.analysTotal')))
    })

 //transaction recording scripts===================================================
 //add account items to be debiredRow
var rowId = 0;
 $('body').on('click','#addnewAcc',function(e){
  e.preventDefault()
  rowId++
  var accountName = $('#debitAcc option:selected').text();
  var nextRow=`<tr id="${rowId}">
                   <td>${rowId}</td>
                   <td><span class="accId${rowId}" style="display:none;">${$('#debitAcc').val()}</span> ${accountName}</td>
                   <td style="text-align:right;" class="amt${rowId} rc">${$('#amount2').val()}</td>
                   <td><a href="#" style="color:red;" class="removeRec"><span class="first"><i class="fa fa-minus"></i></span> <span class="second" style="display:none;">${$('#debitAcc').val()}</span></a></td>
                   </tr>`;
   $('.tbody2').append(nextRow)             

   doAnalytics($('#debitAcc').val(), $('#amount2').val());
   $('.analysFianalTotal').text(calAmount($('.analysTotal')).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
   //console.log(sumAmout())
   $('.checkTotal').text(calAmount($('.analysTotal')))
 })


 //==============================================================================
  var rowIdl =0;
  $('body').on('click','#addnewLc',function(e){
    rowIdl++
     e.preventDefault()
     var accountName = $('#accType option:selected').text(); 
    var tableRow = `<tr id="${rowIdl}">
    <td>${rowIdl}</td>
    <td><span class="accType${rowIdl}" style="display:none;">${$('#accType').val()}</span> ${accountName}</td>
    <td style="text-align:right;" class="amtType${rowIdl} amtLC"  id="amtLC">${$('#amtLC2').val()}</td>
    <td><a href="#" style="color:red;" class="removeRec"><span class="first"><i class="fa fa-minus"></i></span> <span class="second" style="display:none;">${$('#accType').val()}</span></a></td>
    </tr>`;
    $('.tbodyLc').append(tableRow)
    
    //console.log(calAmount($('.amtLC')))

    doAnalytics($('#accType').val(), $('#amtLC2').val());
    $('.checkTotal').text(calAmount($('.analysTotal')))
    $('.analysFianalTotal').text(calAmount($('.analysTotal')).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
  });

  //record revenue script
  $('body').on('click','#recordRev',function(){
  //var lastRowAnalytic = $('.cashAnalytics tr:last').attr("class"); /*finds id of the last row inside table*/
  var lastRowId = $('.tbody2 tr:last').attr("id"); /*finds id of the last row inside table*/
  var lastRowId2 = $('.tbodyLc tr:last').attr("id"); /*finds id of the last row inside table*/
  //var analyticsloop = Number(lastRowAnalytic)+1; 
      var accId = [];
      var amt = [];
      var accType = [];
      var amtType =[];
      var analyticId =[];
      var analyticAmt =[];
      //loop to get push items to arrays
      for (let i = 1; i <= lastRowId; i++) {
        accId.push($(".accId"+i).text()); /*pushing all the account ids listed in the table*/
        amt.push($(".amt"+i).text()); /*pushing all the account ids listed in the table*/
      }
      for (let i = 1; i <=lastRowId2; i++) {
        accType.push($(".accType"+i).text()); /*pushing all the account ids listed in the table*/
        amtType.push($(".amtType"+i).text()); /*pushing all the account ids listed in the table*/  
      }

      for (let i = 0; i < trow.length; i++) {
        analyticId.push($('.accountID'+i).text());
        analyticAmt.push($('.amount'+i).text());
        
      }
  
   
 formData ={
    'date':$('#date').val(),
    'paywith_id':$('#payWith').val(),
    'amount':$('#amount').val(),
    'details': $('#details').val(),
    'ref_no':$('#ref_no').val(),
    'debitAcc':accId,
    'amt':amt,
    'accType': accType,
    'amtType': amtType,
    'analyticID':analyticId,
    'analyticAmt':analyticAmt,
    'checkTotal':$('.checkTotal').text() 
  }
  //console.log(formData)
  if (confirm('are you sure you want to proceed?')) {
    window.expense.sendExpense(formData);
  }else{

  }
  window.expense.sendExpenseRes((e, data)=>{
    if (data) {
     $('.cashAnalytics').html('')
       rowId=0;
       rowIdl=0;
       $('.tbody2').html('') 
       $('.tbodyLc').html('')
       $('#amount').val('')
       $('#details').val('')
       $('#ref_no').val('')
       $('#bal').val(data.bal)
       $('.checkTotal').text(0)
     $('.analysFianalTotal').text('0.00')
       
       for (let i = 0; i < data.reAnal.length; i++) {
         //re++
         $('.cashAnalytics').append( `
           <tr class="${i}" id="trow">
           <td><span style="" class="accountID${i} hide">${data.reAnal[i].Account_id}</span> <span>${data.reAnal[i].accName}</span></td>
           <td style="text-align:right;"><span style="display:none;" class="analysTotal amount${i}">0</span><span>0.00</span></td>
           </tr>
           `)
           
         } 
    }
   })
  })



function refreshPage()
{
  location.reload();
}

function sumAmout(formattedHolder,rawHolder)
{
  var sum = 0;
  $('.rc').each(function(i,e){
    var amt = $(this).text()-0;
    sum +=amt;
  });
  var formattedSum = sum.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  formattedHolder.val(formattedSum)
  rawHolder.val(sum)
}


function calAmount(itemId)
{ 
 var sum = 0
  itemId.each(function(i,e){
    var amt = $(this).text()-0;
    sum +=amt
  });
  return sum
}
//do cash anaylitics
document.addEventListener('DOMContentLoaded', function(){
  
  //doAnalytics(1,1)
})


//const trow = document.querySelectorAll('#trow')
function doAnalytics(inputedAccountID, inputedAmt){
  for (let i = 0; i < trow.length; i++) {
    var AccountID = trow[i].children[0].children[0].innerText;
    var accountAmt = trow[i].children[1].children[0];
    var accountAmtEdited = trow[i].children[1].children[1];
    //console.log(trow[i].children[1].children[1].innerText)
    if (AccountID==inputedAccountID) {
      accountAmt.innerText=inputedAmt;
      var editedAmt = Number(inputedAmt).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      accountAmtEdited.innerText=editedAmt;

    }
    
  }

}
//reverse cash analytics
function ReverseAnalytics(inputedAccountID){
  for (let i = 0; i < trow.length; i++) {
    var AccountID = trow[i].children[0].children[0].innerText;
    var accountAmt = trow[i].children[1].children[0];
    var accountAmtEdited = trow[i].children[1].children[1];
    //console.log(trow[i].children[1].children[1].innerText)
    if (AccountID==inputedAccountID) {
      accountAmt.innerText=0;
      //var editedAmt = Number(inputedAmt).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      accountAmtEdited.innerText='0.00';

    }
    
  }

}
//========================