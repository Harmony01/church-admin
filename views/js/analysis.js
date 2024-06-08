import { baseDeveloper, eventNotice } from "./modules/script.js";

let formData = {};
$('#date').on('change',function(e){
    $('.dateId').text($(this).val());
})

$('#title').on('change',function(e){
    $('.titleId').text($(this).val());
})

var addRowId=0;
$('.addRev').on('click',function(e){
    e.preventDefault();
    addRowId++

    //this is to attached
    var detail = $('#revTitle').val();
    var amt = $('#revAmt').val();
      var nextRow=`<tr id="${addRowId}">
                   <td><span class="revTitle${addRowId}">${detail}</span></td>
                   <td class="rt"><span class="revAmt${addRowId} addTotal rt">${amt}</span></td>
                   <td><a href="#" style="color:red;" class="removeRec"><i class="fa fa-minus"></i></a></td>
                   </tr>`;

      $('.rev').append(nextRow);
    doCalculation()
})

var addexp=0;
$('.addExp').on('click',function(e){
    e.preventDefault();
    addexp++

    //this is to attached
    var detail = $('#expTitle').val();
    var amt = $('#expAmt').val();
      var nextRow=`<tr id="${addexp}">
                   <td><span class="expTitle${addexp}">${detail}</span></td>
                   <td class="rt"><span class="expAmt${addexp} epTotal rt">${amt}</span></td>
                   <td><a href="#" style="color:red;" class="removeRec"><i class="fa fa-minus"></i></a></td>
                   </tr>`;

      $('.exp').append(nextRow);
      doCalculation();

})

var notes=0;
$('.addNote').on('click',function(e){
    e.preventDefault();
    notes++

    //this is to attached
    var detail = $('#noteItem').val();
      var nextRow=`<tr id="${notes}">
                     <td><span><i class="fa fa-asterisk"></i></span> <span class="notes${notes}"> ${detail}</span></td>
                   <td><a href="#" style="color:red;" class="removeRec"><i class="fa fa-minus"></i></a></td>
                   </tr>`;

      $('.notes').append(nextRow);

})

//remove item
$('body').on('click','.removeRec',function(e){
  e.preventDefault();
  $(this).parent().parent().remove();
 addRowId--;
 addexp--;
 notes--;
 doCalculation()

})


$('#recordAnalysis').on('click',function(e){
  e.preventDefault();
  var lastRowId = $('.rev tr:last').attr("id"); /*finds id of the last row inside table*/
  var lastRowIdL = $('.exp tr:last').attr("id"); /*finds id of the last row inside table*/
  var lastRowNote = $('.notes tr:last').attr("id"); /*finds id of the last row inside table*/
  var subDetails = [];
  var subAmt = [];
  var addDetails = [];
  var addAmt = [];
  var notes =[];
  for (let i = 1; i <= lastRowId; i++) {
     addDetails.push($('.revTitle'+i).text());
     addAmt.push($('.revAmt'+i).text())
  }

  for (let i = 1; i <= lastRowIdL; i++) {
     subDetails.push($('.expTitle'+i).text());
     subAmt.push($('.expAmt'+i).text());
  }

  for (let i = 1; i <= lastRowNote; i++) {
    notes.push($('.notes'+i).text());
 }

  formData = {
      'date':$('#date').val(),
      'title':$('#title').val(),
      'totalRev': $('.tR').text(), 
      'totalExp': $('.tE').text(),
      'netIncome': $('.nR').text(),
      'addDetail':addDetails, 
      'addAmt':addAmt,
      'subDetail':subDetails,
      'subAmt':subAmt,
      'notes':notes
  }

//var url = baseDeveloper.BaseUrl+'trasactions/daily-analysis/post';
//var url2 = baseDeveloper.BaseUrl+'reports/daily-analysis/view2/1';
//storeData(url, formData, $(this), url2)
//console.log(formData);
if (confirm('do you want to proceed?')) {
  window.analysis.postAnalysis(formData);
}else{
  
}
console.log(formData);

})

//get analysis

window.analysis.printAnalysis1((e,data)=>{
  //console.log(data);
  let getCb = document.getElementById('getCb');
  baseDeveloper.fillSelectField3(data.bks, getCb)
  for (let i = 0; i < data.anl.length; i++) {
    $('.anal').append(
      `
      <tr>
      <td>${data.anl[i].date}</td>
      <td>${data.anl[i].name}</td>
      <td class="rt">${baseDeveloper.toCurrency(data.anl[i].totalRev)}</td>
      <td class="rt">${baseDeveloper.toCurrency(data.anl[i].totalExp)}</td>
      <td class="rt">${baseDeveloper.toCurrency(data.anl[i].netRev)}</td>
      <td><button class="btn btn-sm printAnl" id="${data.anl[i].id}"><i class="fa fa-print"></i></button></td>
      </tr>
      `
    )
  }

  getCb.addEventListener('change',()=>{
    let id = getCb.value;
    window.analysis.printAnalysis2(id);
  })
  let printAnl1 = document.querySelectorAll('.printAnl');
  //console.log(printAnl1)
  for (let i = 0; i < printAnl1.length; i++) {
    //const element = array[i];
    printAnl1[i].addEventListener('click', ()=>{
      let id = printAnl1[i].getAttribute('id')
      printCommand(id)
    })

  }
})

window.analysis.printAnalysis3((e,data)=>{
  //console.log(data)
  $('.anal').html('');
  for (let i = 0; i < data.anl.length; i++) {
    $('.anal').append(
      `
      <tr>
      <td>${data.anl[i].date}</td>
      <td>${data.anl[i].name}</td>
      <td class="rt">${baseDeveloper.toCurrency(data.anl[i].totalRev)}</td>
      <td class="rt">${baseDeveloper.toCurrency(data.anl[i].totalExp)}</td>
      <td class="rt">${baseDeveloper.toCurrency(data.anl[i].netRev)}</td>
      <td><button class="btn btn-sm printAnl" id="${data.anl[i].id}"><i class="fa fa-print"></i></button></td>
      </tr>
      `
    )
  }
  let printAnl2 = document.querySelectorAll('.printAnl');
  for (let i = 0; i < printAnl2.length; i++) {
    //const element = array[i];
    printAnl2[i].addEventListener('click', ()=>{
      let id = printAnl2[i].getAttribute('id')
      printCommand(id)
    })
    
  }
  //console.log(printAnl2)
})

let printCommand = (id)=>{
window.analysis.printAnalysis4(id)
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


function doCalculation()
{
  
  var totalRev = calAmount($('.addTotal'));
  $('.tR').text(totalRev);
  var totalExp = calAmount($('.epTotal'));
  $('.tE').text(totalExp);

  var netAmt = Number($('.tR').text())-Number($('.tE').text())
  $('.nR').text(netAmt)

}

