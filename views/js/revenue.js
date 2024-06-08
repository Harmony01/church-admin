import { contentMaker } from "./modules/content.js";
import { baseDeveloper, eventNotice } from "./modules/script.js";


window.revenues.revenueItems((_, data)=>{
  console.log(data) 
 let receiveInId = document.getElementById('payWith');
 //populate selectors
 let rev = document.getElementById('exp_id');
 rev.innerHTML='';
 let lc = document.getElementById('localId');
 let otherRev = document.getElementById('debitAcc')
 otherRev.innerHTML='';
     receiveInId.innerHTML='';
   for (let index = 0; index < data.payWith.length; index++) {
        if (data.payWith[index].name=='Cash' || data.payWith[index].name=='Bank') {
          receiveInId.innerHTML += "<option value='" + data.payWith[index].Account_id +"'>" + data.payWith[index].name + "</option>";
        } else if (data.payWith[index].accountClass==0) {
          rev.innerHTML += "<option value='" + data.payWith[index].Account_id +"'>" + data.payWith[index].name + "</option>";
        }else{
          otherRev.innerHTML += "<option value='" + data.payWith[index].Account_id +"'>" + data.payWith[index].name + "</option>";
        } 
    }

lc.innerHTML='';
lc.innerHTML += "<option value='" + data.lc.id +"'>" + data.lc.name + "</option>";
//display the analytical table
let re = 0;
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
   sumAmout($('.totalAmount'),$('#rowHold'))
   console.log($('#debitAcc').val())
   doAnalytics($('#debitAcc').val(), $('#amount2').val());
   $('.analysFianalTotal').text(calAmount($('.analysTotal')).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
   //console.log(sumAmout())
   $('.checkTotal').text(calAmount($('.analysTotal')))
 })



//recored Revenue script

$('body').on('click','#recordRev',function(e){
  e.preventDefault()
     var lastRowId = $('.tbody2 tr:last').attr("id"); /*finds id of the last row inside table*/
     var lastRowIdL = $('.tbodyLc tr:last').attr("id"); /*finds id of the last row inside table*/
     var lastRowAnalytic = $('.cashAnalytics tr:last').attr("class"); /*finds id of the last row inside table*/
     var analyticsloop = Number(lastRowAnalytic); 
     var accId = [];
      var amt = [];
      var Lamt =[];
      var Lacc = [];
      var analyticId =[];
      var analyticAmt =[];
      for (let i = 1; i <= lastRowId; i++) {
        accId.push($(".accId"+i).text()); /*pushing all the account ids listed in the table*/
        amt.push($(".amt"+i).text()); /*pushing all the account ids listed in the table*/
      }
      for (let i = 1; i <= lastRowIdL; i++) {
        Lacc.push($(".accIdL"+i).text()); /*pushing all the account ids listed in the table*/
        Lamt.push($(".amtL"+i).text()); /*pushing all the account ids listed in the table*/
      }

      for (let i = 0; i < trow.length; i++) {
        analyticId.push($('.accountID'+i).text());
        analyticAmt.push($('.amount'+i).text());
        
      }
  
      var formData ={
        'date':$('#date').val(),
        'receiveIn_id':$('#payWith').val(),
        'rev_id': Lacc,
        'Lamnt':Lamt,
        'localAmt':$('#Lamt2').val(),
        'localID':$('#localId').val(),
        'amount':$('#amount').val(),
        'details': $('#details').val(),
        'ref_no':$('#ref_no').val(),
        'creditAcc':accId,
        'amt':amt,
        'analyticID':analyticId,
        'analyticAmt':analyticAmt,
        'checkTotal':Number($('.checkTotal').text()).toFixed(2)  
      }
      if (confirm('are you sure you want to proceed!')) {
        window.revenues.sendRevenue(formData);
        //console.log(formData)
      }else{

      }
        //console.log(formData)
        //console.log(trow.length)
      //console.log($('#rowHold').val())
  window.revenues.sendRevenueRes((e, data)=>{
   if (data) {
    $('.cashAnalytics').html('')
      rowId=0;
      rowIdl=0;
      $('.tbody2').html('') 
      $('.tbodyLc').html('')
      $('#amount').val('')
      $('#details').val('')
      $('#ref_no').val('')
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

 //fetchBalance
 //==============================================================================
  var rowIdl =0;
  $('body').on('click','#addnewLc',function(e){
    rowIdl++
     e.preventDefault()
     var accountName = $('#exp_id option:selected').text(); 
    var tableRow = `<tr id="${rowIdl}">
    <td>${rowIdl}</td>
    <td><span class="accIdL${rowIdl}" style="display:none;">${$('#exp_id').val()}</span> ${accountName}</td>
    <td style="text-align:right;" class="amtL${rowIdl} amtLC"  id="amtLC">${$('#amtLC2').val()}</td>
    <td><a href="#" style="color:red;" class="removeRec"><span class="first"><i class="fa fa-minus"></i></span> <span class="second" style="display:none;">${$('#exp_id').val()}</span></a></td>
    </tr>`;
    $('.tbodyLc').append(tableRow)
    $('#Lamt').val(calAmount($('.amtLC')).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
    $('#Lamt2').val(calAmount($('.amtLC')))
    //console.log(calAmount($('.amtLC')))

    doAnalytics($('#exp_id').val(), $('#amtLC2').val());
    $('.checkTotal').text(calAmount($('.analysTotal')))
    $('.analysFianalTotal').text(calAmount($('.analysTotal')).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
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