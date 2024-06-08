import { contentMaker } from "./modules/content.js";
import { baseDeveloper} from "./modules/script.js";
//creating page templates

//createFooter()
let formData={};

//first step of cash book creation
    $('body').on('click','#firstStepb', (e)=>{
        e.preventDefault()
        formData = {
          'name':$('#name').val(),
          'to':$('#to').val(),
          'from':$('#from').val(),
          'status':1 
        };
    //test for form accuracy!
    window.cashbook.cashbookFirst(formData)
    window.cashbook.firstRep((event, data)=>{
        //console.log(window.cashbook.cashbookFirst(formData));
    baseDeveloper.populateContainer($('.formContainer'),contentMaker.cashBookStage2)
    baseDeveloper.addClassToContainer($('#secondStep'),'text-success')
    var selectField = document.getElementById('accounts')
    var name = document.getElementById('name')
    name.value = data.name;
    baseDeveloper.fillSelectField(data.accts,selectField)
    itemId=0;
    formData={};
    //var selectField = document.getElementById('accounts')
    //baseDeveloper.fillSelectField(dataResult,selectField)
    //console.log(formData)
        console.log(data);
    })
   
       
    })

//first step ends here

//second step of the process begins here
$('body').on('click','#secondStepb', function(){
    var lastRowId = $('#table1 tr:last').attr("id"); /*finds id of the last row inside table*/
    var accId = [];
    for (let i = 1; i <= lastRowId; i++) {
      accId.push($(".accId"+i).text()); /*pushing all the account ids listed in the table*/
    }
    //console.log(accId)
    formData={'account_id':accId};
    //console.log(formData)
    window.cashbook.cashbookSecond(formData)
    window.cashbook.secondRep((event, data)=>{
        baseDeveloper.populateContainer($('.formContainer'),contentMaker.cashBookStage3)
        baseDeveloper.addClassToContainer($('#thirdStep'),'text-success')
        var selectField = document.getElementById('accounts')
        baseDeveloper.fillSelectField(data.fet,selectField)
        var name = document.getElementById('name')
        name.value = data.name;
        formData={}
        itemId=0;
    })
     //formData={};
            //itemId =0;
              
              //baseDeveloper.fillSelectField(dataResult,selectField)
    //console.log(formData);          
  })

//==================================================

    //third process of the cashbook creation
    $('body').on('click','#thirdStepb', function(){
        var lastRowId = $('#table1 tr:last').attr("id"); /*finds id of the last row inside table*/
        var accId = [];
        for (let i = 1; i <= lastRowId; i++) {
          accId.push($(".accId"+i).text()); /*pushing all the account ids listed in the table*/
        }
         //console.log(accId)
        formData={'account_id':accId};
        window.cashbook.cashbookThird(formData)
       window.cashbook.thirdRep((event, data)=>{
        console.log(data)
        baseDeveloper.addClassToContainer($('#fourthStep'),'text-success');
        baseDeveloper.populateContainer($('.formContainer'),contentMaker.cashBookStage4)
        var receiptID =0;
        for (let i = 0; i < data.fet.length; i++) {
          receiptID++;
          $('.receiptTopics').append( `
          <tr id="${receiptID}">
           <td><span class="accID${receiptID}" style="display:none;">${data.fet[i].Account_id}</span> <span class="accName${receiptID}">${data.fet[i].name}</span></td>
          </tr>
          `)
          
        }
        //var name = document.getElementById('name')
        //name.value = data.name;
    })
    
        
      })
//===============================================================  

   //fourth step
   $('body').on('click','#fourthStepb', function(){
    var receiptRow = $('.receiptTopics tr:last').attr("id");
    var getRow = Number(receiptRow)+1;
    var accName = [];
    var accId = [];
    for (let i = 1; i < getRow; i++) {
      accName.push($(".accName"+i).text()); /*pushing all the account ids listed in the table*/
      accId.push($(".accID"+i).text()); /*pushing all the account ids listed in the table*/
    }
       formData = {'accId':accId,'accName':accName}
       window.cashbook.cashbookfourth(formData)
       window.cashbook.fourthRep((event, data)=>{
        //console.log(data)
        baseDeveloper.addClassToContainer($('#fithStep'),'text-success');
        baseDeveloper.populateContainer($('.formContainer'),contentMaker.cashBookStage5)
        var receiptID =0;
        for (let i = 0; i < data.exp.length; i++) {
            receiptID++;
            $('.payTopics').append( `
            <tr id="${receiptID}">
             <td><span class="accID${receiptID}" style="display:none;">${data.exp[i].Account_id}</span> <span class="accName${receiptID}">${data.exp[i].name}</span></td>
            </tr>
            `)
            
          }
        //var name = document.getElementById('name')
        //name.value = data.name;
        formData={};
    })
  })
  //==========================================================

  //fith step
  $('body').on('click','#fifthStepb', function(){
    var receiptRow = $('.payTopics tr:last').attr("id");
    var getRow = Number(receiptRow)+1;
    var accName = [];
    var accId = [];
    for (let i = 1; i < getRow; i++) {
      accName.push($(".accName"+i).text()); /*pushing all the account ids listed in the table*/
      accId.push($(".accID"+i).text()); /*pushing all the account ids listed in the table*/
    }
    formData = {'accId':accId,'accName':accName}
    window.cashbook.cashbookFifth(formData)
    window.cashbook.fifthRep((event, data)=>{
     //console.log(data)
     baseDeveloper.addClassToContainer($('#sixthStep'),'text-success');
     baseDeveloper.populateContainer($('.formContainer'),contentMaker.cashBookStage6)
     console.log(formData);
     
     })
    
  })
  //===========

  var itemId = 0
    $('body').on('click','.addRec',function(){
      itemId++
      //console.log(itemId)
      var accountName = $('#accounts option:selected').text();
      var nextRow=`<tr id="${itemId}">
                   <td>${itemId}</td>
                   <td><span class="accId${itemId}" style="display:none;">${$('#accounts').val()}</span> ${accountName}</td>
                   <td><a href="#" style="color:red;" class="removeRec"><i class="fa fa-minus"></i></a></td>
                   </tr>`;

      $('.tbody1').append(nextRow);
      
    })


    $('body').on('click','.removeRec',function(e){
        e.preventDefault();
        //console.log($(this).children('span.second').text());
        $(this).parent().parent().remove();
        itemId--;
       
    });

    window.cashbook.cbReportRes((e,data)=>{
     console.log(data)
     const cashbookId = document.getElementById('cbID');
     baseDeveloper.fillSelectField3(data.cb,cashbookId);

    //connect
    cashbookId.addEventListener('change', (e)=>{
      //console.log(cashbookId.value)
      let id = cashbookId.value
      window.cashbook.openModal(id)
    })
    })
    
