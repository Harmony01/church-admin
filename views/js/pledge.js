import { contentMaker } from "./modules/content.js";
import { baseDeveloper} from "./modules/script.js";

let formData;
window.pledges.pledgeList((e,data)=>{
  //console.log(data)

 
})

$('#pledgeTitle').on('click',()=>{
    formData={'name':$('#title').val()}
     window.pledges.pledgeTitle(formData);
   //alert('hello world')
})

window.pledges.pledgeTitleRes((e,data)=>{
    console.log(data);
    baseDeveloper.populateContainer($('.contentHolder'), contentMaker.newList)
    for (let i = 0; i < data.list.length; i++) {
       
       
      $('#pledgeName').append(`<option value="${data.list[i].id}">${data.list[i].name} ${data.list[i].tel}</option>
      `);           
    }

$('.pledgeID').text(data.id);

    $('#newList').on('click', ()=>{
        window.pledges.newList(data.id)
    })
})

window.pledges.newListRes((e, data)=>{
 console.log(data)

 $('#createNewlist').on('click',()=>{
    formData = {
        'name':$('#name').val(),
        'tel':$('#tel').val(),
        'amount':$('#amount').val(),
        'pledge_id':data
    }
    //console.log(formData)
    window.pledges.createNewList(formData)
 })
})

var rowId = 0;
 $('body').on('click','.addRec',function(e){
  e.preventDefault()
  rowId++
  var accountName = $('#pledgeName option:selected').text();
  var nextRow=`<tr id="${rowId}">
                   <td>${rowId}</td>
                   <td><span class="accId${rowId}" style="display:none;">${$('#pledgeName').val()}</span> ${accountName}</td>
                   <td style="text-align:right;" class="amt${rowId} rc">${$('#amount').val()}</td>
                   <td><a href="#" style="color:red;" class="removeRec"><span class="first"><i class="fa fa-minus"></i></span> <span class="second" style="display:none;">${$('#pledgeName').val()}</span></a></td>
                   </tr>`;
   $('.list').append(nextRow); 

 });

 $('body').on('click','.removeRec',function(e){
    e.preventDefault();
    //console.log($(this).children('span.second').text());
    $(this).parent().parent().remove();
    rowId--;
})

//record revenue
$('body').on('click','#recordRev',function(e){
    e.preventDefault()
       var lastRowId = $('.list tr:last').attr("id"); /*finds id of the last row inside table*/
       
        let amt = [];
        var list =[];
       
        for (let i = 1; i <= lastRowId; i++) {
          list.push($(".accId"+i).text()); /*pushing all the account ids listed in the table*/
          amt.push($(".amt"+i).text()); /*pushing all the account ids listed in the table*/
        }
        
    
        formData ={
          'list':list,
          'amt':amt,
          'pledge_id': $('.pledgeID').text()
        }
       //console.log(formData)
    if (confirm('are you sure you want proceed?')) {
        window.pledges.newList2(formData)
    }else{
        
    }
})

window.pledges.pledgesFetched((e,data)=>{
  //console.log(data);
  const Pledges = document.getElementById('Pledges')
  baseDeveloper.fillSelectField3(data.plg, Pledges);

  $('#printTitle').on('click',()=>{
    formData={'id':Pledges.value}
    window.pledges.printPledge(formData);
  })

})


