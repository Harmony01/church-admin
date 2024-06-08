import { baseDeveloper} from "./modules/script.js";
let formData = {};
window.transactions.getBooks((e,data)=>{
    //console.log(data);
    let books = document.getElementById('books');
    baseDeveloper.fillSelectField3(data.cb, books)
    books.addEventListener('change',()=>{
        let id =books.value;
        window.transactions.getTransactions(id);
    })
})

window.transactions.getTransactionRes((e, data)=>{
    //console.log(data)
    for (let i = 0; i < data.tr.length; i++) {
        if (data.tr[i].type==2) {
            $('.receipts').append(`
            <tr>
            <td><button class="btn btn-sm edit" id="${data.tr[i].id}"><i class="fa fa-pencil"></i></button></td>
            <td>${data.tr[i].date}</td>
            <td>${data.tr[i].details}</td>
            <td class="rt">${baseDeveloper.toCurrency(Number(data.tr[i].bank))}</td>
            <td class="rt">${baseDeveloper.toCurrency(Number(data.tr[i].cash))}</td
            </tr>
           `);  
            
        }else{
            $('.payments').append(`
            <tr>
            <td><button class="btn btn-sm edit" id="${data.tr[i].id}"><i class="fa fa-pencil"></i></button></td>
            <td>${data.tr[i].date}</td>
            <td>${data.tr[i].details}</td>
            <td class="rt">${baseDeveloper.toCurrency(Number(data.tr[i].bank))}</td>
            <td class="rt">${baseDeveloper.toCurrency(Number(data.tr[i].cash))}</td
            
            </tr>
           `); 
        }
        
    }
      
  const editTr = document.querySelectorAll('.edit');
  for (let i = 0; i < editTr.length; i++) {
    editTr[i].addEventListener('click',()=>{
        //console.log(editTr[i].getAttribute('id'))
        let id = editTr[i].getAttribute('id')
        window.transactions.fetchTr(id);
    })
    
  }
  //console.log(editTr) 
  new DataTable('#datatable'); 
  new DataTable('#datatable1'); 
})

window.transactions.fetchTrRes((e,data)=>{
    console.log(data)
    $('#date').val(data.trs.date)
    $('#details').val(data.trs.details)
    $('#event_no').val(data.trs.event_no)
    $('#ref_no').val(data.trs.ref_no)
    $('#cash').val(data.trs.cash)
    $('#bank').val(data.trs.bank)

$('#updateTr').on('click',()=>{
  formData={
    'date':$('#date').val(),
    'details':$('#details').val(),
    'event_no':$('#event_no').val(),
    'ref_no':$('#ref_no').val(),
    'cash':$('#cash').val(),
    'bank':$('#bank').val(),
    'id':data.trs.id
  }
  //console.log(formData);
  window.transactions.updateTrans(formData);
  $('.form-control').attr('disabled','disabled')
  $('#updateTr').attr('disabled','disabled')
})    
})
