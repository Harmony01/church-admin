let activeData = {'type':'active', 'id':1};
$('#cbReceipt').on('click', ()=>{
 
  openReceipt(activeData)
})

$('#cbPayment').on('click', ()=>{
    openPayment(activeData)
 })

$('#openComplete').on('click',()=>{
    //window.cashbook.openComplete('open-complete')
    openComplete(activeData)
})

window.cashbook.cbReportRes2((e,data)=>{
    console.log(data)
    let otherData = {'type': 'others', 'id': data}

    $('#cbReceipt1').on('click', ()=>{
 
        openReceipt(otherData)
      })
      
      $('#cbPayment1').on('click', ()=>{
          openPayment(otherData)
       })
      
      $('#openComplete1').on('click',()=>{
          //window.cashbook.openComplete('open-complete')
          openComplete(otherData)
      })
})


let openReceipt = (data)=>{
    window.cashbook.openReceipt(data);  
}

let openPayment = (data)=>{
    window.cashbook.openPayment(data); 
}

let openComplete = (data)=>{
    window.cashbook.openComplete(data)  
}