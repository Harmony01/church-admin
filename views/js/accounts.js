import { baseDeveloper} from "./modules/script.js";

let formData ={};

$('#createAc').on('click',(e)=>{
    e.preventDefault()
    formData = {
        'name':$('#name').val(),
        'legend':$('#legend').val(),
        'accountClass':$('#accountClass').val(),
        'accountType_id':$('#accountType_id').val(),
        'color':$('#color').val(),
    }
   if (confirm('are use sure you want to create?')) {
    window.accounts.newAccount(formData);
   } else{

   }
})

window.accounts.queryAccountRes((e,data)=>{
  //console.log(data)
  const accID = document.getElementById('accID');
  baseDeveloper.fillSelectField4(data.acc, accID)
  $('#from').val(data.cb.from)

  //search account
$('#searchAc').on('change',()=>{
  let data ={'id':$('#searchAc').val()}
  window.accounts.searchAccount(data)
});

window.accounts.seachResult((e, data)=>{
  //console.log(data)
  baseDeveloper.fillSelectField(data.acc, document.getElementById('accID'))
})

});

$('#to').on('change',()=>{
  let data={'id':$('#accID').val(),'from':$('#from').val(),'to':$('#to').val(),'accountNo':$('#searchAc').val()};
  window.accounts.getAccoutTransactions(data)
})

window.accounts.accountQueryRes((e,data)=>{
  //console.log(data)
  $('#searchAc').attr('disabled','disabled');
  $('#to').attr('disabled','disabled');
  $('#from').attr('disabled','disabled');
  $('#clearData').removeAttr('disabled');
  $('#printStmt').removeAttr('disabled');
  //$('#searchAc').attr('disabled','disabled');
  //console.log($('#searchAc'))
  //populate balances
  $('#openingBal').val(baseDeveloper.toCurrency(data.bf))
  $('#closingBal').val(baseDeveloper.toCurrency(data.bc))
  let balances;
  if (data.ac.name=='Cash' || data.ac.name=='Bank') {
    balances = ` <tr id="tRow">
                     <td></td>
                    <td>Balance B/f</td>
                    <td></td>
                    <td></td>
                   <td class="rt"><span>${baseDeveloper.toCurrency(data.bf)}</span><span class="hide">${data.bf}</span></td>
                   </tr>
                 `
  $('#openingBal').val(baseDeveloper.toCurrency(data.bf))
  $('#closingBal').val(baseDeveloper.toCurrency(data.bc))               
  $('#totalIn').val(baseDeveloper.toCurrency(data.tDebit))
  $('#totalOut').val(baseDeveloper.toCurrency(data.tCredit))
  }else{
    balances = ` <tr id="tRow2">
    <td></td>
   <td>Balance B/f</td>
   <td></td>
   <td></td>
  <td class="rt"><span>${baseDeveloper.toCurrency(data.bf*-1)}</span><span class="hide">${data.bf*-1}</span></td>
  </tr>
`
      $('#openingBal').val(baseDeveloper.toCurrency(data.bf*-1))
      $('#closingBal').val(baseDeveloper.toCurrency(data.bc*-1))
      $('#totalIn').val(baseDeveloper.toCurrency(data.tCredit))
     $('#totalOut').val(baseDeveloper.toCurrency(data.tDebit))
  }
  
  $('.bls').append(balances);   
  //populate transactions
  
  let fullTrans;
      for (let i = 0; i < data.tr.length; i++) {
        let trans=`
            <tr id="tRow">
            <td>${data.tr[i].date}</td>
            <td>${data.tr[i].details}</td>
           `;
        let trans1=`
           <tr id="tRow2">
           <td>${data.tr[i].date}</td>
           <td>${data.tr[i].details}</td>
          `;   
       let debitTr =`<td class="rt"><span>${baseDeveloper.toCurrency(data.tr[i].debit)}</span><span class="hide">${data.tr[i].debit}</span></td>
                     <td><span></span><span class="hide">0</span></td>
                    `
       let creditTr =`<td><span></span><span class="hide">0</span></td>
                      <td class="rt"><span>${baseDeveloper.toCurrency(data.tr[i].credit)}</span><span class="hide">${data.tr[i].credit}</span></td>
                     `;
      let debitTr1 =`<td class="rt"><span>${baseDeveloper.toCurrency(data.tr[i].credit)}</span><span class="hide">${data.tr[i].credit}</span></td>
                     <td><span></span><span class="hide">0</span></td>
                    `
       let creditTr2 =`<td><span></span><span class="hide">0</span></td>
                      <td class="rt"><span>${baseDeveloper.toCurrency(data.tr[i].debit)}</span><span class="hide">${data.tr[i].debit}</span></td>
                     `;             

        if (data.ac.name=='Cash' || data.ac.name=='Bank') {
            if (data.tr[i].debit!=null) {
              fullTrans=trans+debitTr+`<td class="rt"><span></span><span class="hideMe"></span></td>`;
            }else if (data.tr[i].credit!=null) {
              fullTrans = trans+creditTr+`<td class="rt"><span></span><span class="hideMe"></span></td>`;
            }
             
        }else{
          if (data.tr[i].credit!=null) {
            fullTrans=trans1+debitTr1+`<td class="rt"><span></span><span class="hideMe"></span></td>`;
          }else if (data.tr[i].debit!=null) {
            fullTrans = trans1+creditTr2+`<td class="rt"><span></span><span class="hideMe"></span></td>`;
          }
        }
       $('.trs').append(fullTrans);
      }
      const tRow = document.querySelectorAll('#tRow'); 
      
      const tRow2 = document.querySelectorAll('#tRow2')


      if (data.ac.name=='Cash' || data.ac.name=='Bank') {
        calculateBalance(tRow)
      }else{
        calculateBalance2(tRow2)
      }
      //console.log(tRow) 
  
  //print statement
      $('#printStmt').on('click', ()=>{
        let data={'id':$('#accID').val(),'from':$('#from').val(),'to':$('#to').val()}
         window.accounts.printStatement(data)
       })    
})
//clear data in memory
$('#clearData').on('click', ()=>{
  $('.bls').html('');
  $('.trs').html('');
  $('#searchAc').removeAttr('disabled','disabled');
  $('#to').removeAttr('disabled','disabled');
  $('#from').removeAttr('disabled','disabled');
  $('#clearData').attr('disabled','disabled');
  $('#printStmt').attr('disabled','disabled');
  $('#openingBal').val('0.00')
      $('#closingBal').val('0.00')
      $('#totalIn').val('0.00')
     $('#totalOut').val('0.00')
})


function calculateBalance(rowId)
 {
    for (let i = 0; i < rowId.length; i++) {
    //console.log(rowId[i].children[2]);
    var openingBal = rowId[0].children[4].children[1].innerText;
    if (i >0) {
        var firstBal = Number(openingBal)+Number(rowId[1].children[2].children[1].innerText)-Number(rowId[1].children[3].children[1].innerText);
        var firstBalAmt = firstBal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        rowId[i].children[4].children[1].innerText=firstBal;
        rowId[1].children[4].children[0].innerText=firstBalAmt;
        //Bal.innerText = firstBal;
        var debitAmt = rowId[i].children[2].children[1].innerText;
        var creditAmt = rowId[i].children[3].children[1].innerText;
        
        if (i>1) {
          var GetBal =   Number(rowId[i-1].children[4].children[1].innerText)+Number(debitAmt)-Number(creditAmt);
          var balAmt = Number(GetBal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
          rowId[i].children[4].children[1].innerText=GetBal;
          rowId[i].children[4].children[0].innerText=balAmt;
        }

        //console.log(GetBal);   
    }
    
   }
 }

function calculateBalance2(rowId)
 {
    for (let i = 0; i < rowId.length; i++) {
    //console.log(rowId[i].children[2]);
    var openingBal = rowId[0].children[4].children[1].innerText;
    if (i >0) {
        var firstBal = Number(openingBal)+Number(rowId[1].children[2].children[1].innerText)-Number(rowId[1].children[3].children[1].innerText);
        var firstBalAmt = firstBal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        rowId[1].children[4].children[1].innerText=firstBal;
        rowId[1].children[4].children[0].innerText=firstBalAmt;
        //Bal.innerText = firstBal;
        var debitAmt = rowId[i].children[2].children[1].innerText;
        var creditAmt = rowId[i].children[3].children[1].innerText;
        
        if (i>1) {
          var GetBal =   Number(rowId[i-1].children[4].children[1].innerText)+Number(debitAmt)-Number(creditAmt);
          var balAmt = Number(GetBal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
          rowId[i].children[4].children[1].innerText=GetBal;
          rowId[i].children[4].children[0].innerText=balAmt;
        }

        //console.log(firstBal);   
    }
    
   }
 }
