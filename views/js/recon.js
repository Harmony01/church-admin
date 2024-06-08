import { baseDeveloper, eventNotice } from "./modules/script.js";

window.getRecons.receiveItems((e,data)=>{
 //console.log(data)
 const cb = document.getElementById('cb')
 baseDeveloper.fillSelectField(data.bks, cb)
 let activeCbName = data.bks[0].name;
 $('#name').val(activeCbName+' '+'Reconciliation')
 $('#bookBal').text(data.bankBal)
 $('.addSummation').text(data.bankBal)
 $('.finalSum').text(data.bankBal)
})

$('#cb').on('change',(e)=>{
  let cbName = $('#cb option:selected').text()
  $('#name').val(cbName+' '+'Reconciliation')
  window.getRecons.fetchCb({'cb':$('#cb').val()});
})

window.getRecons.cbRes((e,data)=>{
 $('#bookBal').text(data.bankBal2)
 $('.addSummation').text(data.bankBal2)
 $('.finalSum').text(data.bankBal2)
 //console.log(data.bankBal2)
})

let formData = {};
var addRowId=0;
$('.addBtn').on('click',function(e){
    e.preventDefault();
    addRowId++

    //this is to attached
    var detail = $('#addDetail').val();
    var amt = $('#addAmt').val();
      var nextRow=`<tr id="${addRowId}">
                   <td><span class="addDetail${addRowId}">${detail}</span></td>
                   <td class="rt"><span class="addAmt${addRowId} addTotal">${amt}</span></td>
                   <td><a href="#" style="color:red;" class="removeRec"><i class="fa fa-minus"></i></a></td>
                   </tr>`;

      $('.add').append(nextRow);

      var addSum = calAmount($('.addTotal'));
      var bookBal = $('#bookBal').text();
      var addTotal = Number(addSum)+Number(bookBal);
      $('.addSummation').text(addTotal);
      $('.finalSum').text(addTotal);
})

var subRowId =0;
$('.subBtn').on('click',function(e){
    e.preventDefault();
    subRowId++;

    //this is to attached
    var detail = $('#subDetail').val();
    var amt = $('#subAmt').val();
      var nextRow=`<tr id="${subRowId}">
                   <td><span class="subDetail${subRowId}">${detail}</span></td>
                   <td class="rt"><span class="subAmt${subRowId} subTotal">${amt}</span></td>
                   <td><a href="#" style="color:red;" class="removeRec"><i class="fa fa-minus"></i></a></td>
                   </tr>`;

      $('.sub').append(nextRow);
      var lessSum = calAmount($('.subTotal'));
      var sumSoFar = $('.addSummation').text();
      var finalTotal = Number(sumSoFar)-Number(lessSum);
      //$('.addSummation').text(addTotal);
      $('.finalSum').text(finalTotal);
})

$('body').on('click','.removeRec',function(e){
    e.preventDefault();
    $(this).parent().parent().remove();
    addRowId--;
    subRowId--;

    var addSum = calAmount($('.addTotal'));
      var bookBal = $('#bookBal').text();
      var addTotal = Number(addSum)+Number(bookBal);
      $('.addSummation').text(addTotal);
      $('.finalSum').text(addTotal);

     var lessSum = calAmount($('.subTotal'));
      var finalSum = $('.finalSum').text();
      var finalTotal = Number(finalSum)-Number(lessSum);
      //$('.addSummation').text(addTotal);
      $('.finalSum').text(finalTotal);
})

$('#recordRecon').on('click',function(e){
    e.preventDefault();
    var lastRowId = $('.add tr:last').attr("id"); /*finds id of the last row inside table*/
    var lastRowIdL = $('.sub tr:last').attr("id"); /*finds id of the last row inside table*/
    var subDetails = [];
    var subAmt = [];
    var addDetails = [];
    var addAmt = [];
    for (let i = 1; i <= lastRowId; i++) {
       addDetails.push($('.addDetail'+i).text());
       addAmt.push($('.addAmt'+i).text())
    }

    for (let i = 1; i <= lastRowIdL; i++) {
       subDetails.push($('.subDetail'+i).text());
       subAmt.push($('.subAmt'+i).text());
    }

    formData = {
        'name':$('#name').val(),
        'bookBal': $('#bookBal').text(), 
        'bankBal':$('.finalSum').text(), 
        'addDetail':addDetails, 
        'addAmt':addAmt,
        'subDetail':subDetails,
        'subAmt':subAmt,
        'cb':$('#cb').val()
    }

  console.log(formData)
  window.getRecons.sendRecon(formData)
})

//functions
function calAmount(itemId)
{ 
 var sum = 0
  itemId.each(function(i,e){
    var amt = $(this).text()-0;
    sum +=amt
  });
  return sum
}
