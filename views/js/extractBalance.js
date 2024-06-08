import { baseDeveloper} from "./modules/script.js";
let formData = {};

window.extractBalance.getAccounts((e,data)=>{
  console.log(data)
  let findAcc = document.getElementById('findAc')
  let findAcc2=document.getElementById('findAc2')
  baseDeveloper.fillSelectField2(data.acc, findAcc)
  baseDeveloper.fillSelectField2(data.acc, findAcc2)
})
$('#searchAc').on('change', (e)=>{
   let formData1={'id':$('#searchAc').val()};
   //searchAccount(formData1,$('#findAc'))
   //console.log(data) 
   window.extractBalance.seacAccount(formData1)

    window.extractBalance.seachResult((e,res)=>{
        const findAc = document.getElementById('findAc')
        //let optionItem =  `<option value="${res.acc[0].id}">${res.acc[0].name}</option>`
        //$('#findAc').html(optionItem)
        baseDeveloper.fillSelectField(res.acc, findAc)
        //console.log(res)
    })
})

$('#searchAc2').on('change', (e)=>{
    let formData2={'id':$('#searchAc2').val()};
    //searchAccount(formData2,$('#findAc2'))
    //console.log(data)
    window.extractBalance.seacAccount2(formData2)

    window.extractBalance.seachResult2((e,res)=>{
        //let optionItem2 =  `<option value="${res.acc[0].id}">${res.acc[0].name}</option>`
        //('#findAc2').html(optionItem2)
        //console.log(res)
        const findAc2 = document.getElementById('findAc2');
        baseDeveloper.fillSelectField(res.acc, findAc2);
       // console.log(res.acc[0].name)
    }) 
 })

 //record extract
 $('#recordExt').on('click', (e)=>{
    formData = {
        'date': $('#date').val(),
        'details': $('#details').val(),
        'ref_no': $('#ref_no').val(),
        'amount': $('#amount').val(),
        'debit': $('#findAc').val(),
        'credit': $('#findAc2').val(), 
    }

   if (confirm('do you want to proceed!')) {
    window.extractBalance.postExtract(formData)
   }else{
    
   }
 })

 window.extractBalance.postExtractRes((e,data)=>{
    $('#details').val('') 
    $('#ref_no').val('')
    $('#amount').val('')
 })



const searchAccount = (data, selectItem)=>{
    window.extractBalance.seacAccount(data)

    window.extractBalance.seachResult((e,res)=>{
        let optionItem =  `<option value="${res.acc[0].id}">${res.acc[0].name}</option>`
        selectItem.html(optionItem)
        //console.log(res)
    })
}