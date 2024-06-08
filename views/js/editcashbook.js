import { baseDeveloper} from "./modules/script.js";
let formData ={};
window.cashbook.cashbookDetailRes((e,data)=>{
    console.log(data);
    $('#name').val(data.cb.name)
    $('#from').val(data.cb.from)
    $('#to').val(data.cb.to)
    $('#cbId').val(data.cb.id)
    if (data.cb.status==1) {
        $('#status').html(`
        <option value="0">---please selet status--</option>
        <option value="3">make inactive</option>
        `) 
    }else{
        $('#status').html(`
        <option value="0">---please selet status--</option>
        <option value="1">make active</option>
        `)
    }

    for (let i = 0; i < data.reAnal.length; i++) {
       $('.receiptItem').append(
        `
        <tr id="defRev">
        <td><span class="hide rec${i}">${data.reAnal[i].Account_id}</span> <input type="text" id="name" value="${data.reAnal[i].accName}" class="editInput fullWidth accName${i}" disabled></td>
        <td><button class="btn btn-sm editInput" id="delRev" disabled><span class="1st"><i class="fa fa-trash"></i></span><span class="2nd hide">${data.reAnal[i].Account_id}</span> <span class="3rd hide">${data.reAnal[i].accName}</span></button></td>
        </tr>
        `
       );
        
    }

    for (let i = 0; i < data.payAnal.length; i++) {
        $('.paymentItem').append(
         `
         <tr id="defPay">
         <td><span class="hide pay${i}">${data.payAnal[i].Account_id}</span> <input type="text" id="name" value="${data.payAnal[i].accName}" class="editInput fullWidth accName${i}" disabled></td>
         <td><button class="btn btn-sm editInput" id="delPay" disabled><span class="1st"><i class="fa fa-trash"></i></span><span class="2nd hide">${data.payAnal[i].Account_id}</span> <span class="3rd hide">${data.payAnal[i].accName}</span></button></td>
         </tr>
         `
        );
         
     }

     let receipts = document.getElementById('receipts');
     let payments = document.getElementById('payments')
     baseDeveloper.fillSelectField(data.acts, receipts);
     baseDeveloper.fillSelectField(data.fet, payments);
     $('#clearDisabled').on('click',()=>{
        $('.editInput').removeAttr('disabled')
     })

     //add receipt item..
     
     $('#addRev').on('click',()=>{
        addItem('addedRev','#receipts',$('.addedReceipt'))
        //alert('testing buttom')
     })
     //add payment item
     $('#addPay').on('click', ()=>{
        addItem('addedPay','#payments',$('.addedPayment'))
     })
     //delete item
     const delRev =  document.querySelectorAll('#delRev')
     for (let i = 0; i < delRev.length; i++) {
        delRev[i].addEventListener('click',()=>{
            let accId = delRev[i].children[1].innerHTML;
            let accName=delRev[i].children[2].innerHTML;
            delRev[i].parentElement.parentElement.remove()
            deleteItem('revDeleted',$('.deletedReceipt'), accId, accName)
        })
        
     }
    //console.log(delRev)
    const delPay = document.querySelectorAll('#delPay');
    
     for (let i = 0; i < delPay.length; i++) {
        delPay[i].addEventListener('click',()=>{
            let accId = delPay[i].children[1].innerHTML;
            let accName=delPay[i].children[2].innerHTML;
            delPay[i].parentElement.parentElement.remove()
            deleteItem('payDeleted',$('.deletedPayment'), accId, accName)
        })
      }

      const defRev = document.querySelectorAll('#defRev')
      const defPay = document.querySelectorAll('#defPay')
      const addedRev =document.querySelectorAll('#addedRev')
      const addedPay =document.querySelectorAll('#addedPay')
      const revDeleted =document.querySelectorAll('#revDeleted');
      const payDeleted =document.querySelectorAll('#payDeleted');
  })

  //delete added
  $('body').on('click','.removeRec',function(e){
    e.preventDefault();
    //console.log($(this).children('span.second').text());
    $(this).parent().parent().remove();

 });

 $('#updateCb').on('click', ()=>{
    let updateRevId =[];
    let updateRevName =[];
    let updatePayId =[];
    let updatePayName =[];
    let addedRevName = [];
    let addedRevId =[];
    let addedPayId =[];
    let addedPayName =[];
    let delPayId = [];
    let delRevId =[];
    
   filterData(updateRevId, updateRevName, defRev)
   filterData(updatePayId, updatePayName, defPay)
   if (typeof addedRev !='undefined') {
    filterData(addedRevId, addedRevName, addedRev)
   }

   if (typeof addedPay != 'undefined') {
    filterData(addedPayId, addedPayName, addedPay)
   }
   if (typeof revDeleted !='undefined') {
    filterDeleted(delRevId, revDeleted)
   }
   if (typeof payDeleted !='undefined') {
    filterDeleted(delPayId, payDeleted)
   }
   
    formData={
        'name':$('#name').val(),
        'from':$('#from').val(),
        'to':$('#to').val(),
        'status':$('#status').val(),
        'revName':updateRevName,
        'revId': updateRevId,
        'payName': updatePayName,
        'payId':updatePayId,
        'addedRevName':addedRevName,
        'addedRevId':addedRevId,
        'addedPayId': addedPayId,
        'addedPayName':addedPayName,
        'delRevId': delRevId,
        'delPayId':delPayId,
        'id':$('#cbId').val()
    }

   //console.log(formData);
    //console.log(addedRev.length);
    if (confirm('do you want to proceed?')) {
        baseDeveloper.eventLoader($('#updateCb'))
         window.cashbook.updateCashbook(formData)  
    }else{

    }
 })

 //update finally
 window.cashbook.cbErr((e,d)=>{
    baseDeveloper.cancelLoader($('#updateCb'),'update')
    $('.editInput').attr('disabled','disabled')
 })

 window.cashbook.cbSuccess((e,d)=>{
    baseDeveloper.cancelLoader($('#updateCb'),'update')
 })

  let addItem = (itemId, selectItem, tbody)=>{
    var accountName = $(`${selectItem} option:selected`).text();
    var nextRow=`<tr id="${itemId}">
                 <td><span class="accId${itemId}" style="display:none;">${$(selectItem).val()}</span><input type="text" class="addItem editInput fullWidth" value="${accountName}"></td>
                 <td><button class="btn btn-sm removeRec"><i class="fa fa-trash"></i></button></td>
                 </tr>`;

    tbody.append(nextRow);

  }

  let deleteItem = (row, tbody, accId, accName)=>{
    let deletedRow =`
    <tr id="${row}">
    <td><span class="hide">${accId}</span> <span class="delName">${accName}</span></td>
    <td>deleted</td>
    </tr>
    `

    tbody.append(deletedRow);
  }

  let filterData = (idArray, nameArray, dataArray)=>{
    if (typeof dataArray !='undefined') {
       if (typeof dataArray.length === 'undefined') {
           let revName = dataArray.children[0].children[1].value;
           let revId =dataArray.children[0].children[0].innerHTML;
           nameArray.push(revName);
           idArray.push(revId)
       }else{
        for (let i = 0; i < dataArray.length; i++) {
            let revName = dataArray[i].children[0].children[1].value;
            let revId =dataArray[i].children[0].children[0].innerHTML;
            nameArray.push(revName);
            idArray.push(revId)
            
        }
       }

   }

}

let filterDeleted = (deletedId, deleteData)=>{
    if (typeof deleteData !='undefined') {
        if (typeof deleteData.length === 'undefined') {
            let revId =deleteData.children[0].children[0].innerHTML;
            deletedId.push(revId)
        }else{
         for (let i = 0; i < deleteData.length; i++) {
             let revId =deleteData[i].children[0].children[0].innerHTML;
             deletedId.push(revId)
             
         }
        }
 
    }
}

