
window.cashbook.getCashbooks((e,data)=>{
    console.log(data);
    let sn =0;
    let tdata;
    for (let i = 0; i < data.cb.length; i++) {
        sn++;
        if (data.cb[i].status==1) {
            tdata = `<tr>
            <td>${sn}</td>
            <td>${data.cb[i].name}</td>
            <td>${data.cb[i].from}</td>
            <td>${data.cb[i].to}</td>
            <td>${data.cb[i].created_at.slice(0,10)}</td>
            <td><span class="badge badge-primary">Active</span></td>
            <td><a class="btn editcb" id="${data.cb[i].id}" href=""><i class="fa fa-eye"></i></a></td>
          </tr>
          `  
        }else{

            tdata = `<tr>
            <td>${sn}</td>
            <td>${data.cb[i].name}</td>
            <td>${data.cb[i].from}</td>
            <td>${data.cb[i].to}</td>
            <td>${data.cb[i].created_at.slice(0,10)}</td>
            <td><span class="badge badge-warning">Inactive</span></td>
            <td><a class="btn editcb" id="${data.cb[i].id}" href="#"><i class="fa fa-eye"></i></a></td>
          </tr>
          `   
        }
        
     $('.tbody1').append(tdata);              
    }
/*
    $('.editcb').each((i,e)=>{
      $(e).on('click',(event)=>{
        event.preventDefault()
        let data = e.target.id;
        console.log(event.target)
        //const childWin =window.open('','modal');
        //childWin.document.write('<h1>Hello</h1>')
        //window.cashbook.viewCashbook('send someting');
      })
    })
  */
    const getBtn = document.querySelectorAll('.editcb')
    //console.log(getBtn.length)
    for (let i = 0; i < getBtn.length; i++) {
      //const element = array[i];
      getBtn[i].addEventListener('click',(e)=>{
        e.preventDefault()
        let id = getBtn[i].getAttribute('id')
        window.cashbook.viewCashbook(id);
      })
    }
    new DataTable('#datatable');    
});

window.cashbook.cashbookDetailRes((e,data)=>{
  console.log(data);
})


