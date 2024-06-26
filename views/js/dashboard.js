import { baseDeveloper } from "./modules/script.js";
//creating page templates
//createTopNav()
//createFooter()

$('.menuItems').each(function(index,element){
    $(element).click(function(){
        //console.log($(this).siblings('ul.submenu'))
        $(this).siblings('ul.submenu').slideToggle();
    })
})

$('#logoutBtn').on('click',function(e){
    e.preventDefault();
    if (confirm('do you confirm logout?')) {
      baseDeveloper.eventLoader($('#logoutBtn'));
      window.dashboard.logout('logout us out from system')
    }else{

    }
   
})

window.dashboard.loginUser((_event,data)=>{
  console.log(data[1]);
  $('#User-Name').text(data[0].first_name)
  let brandImg = `<img src="${data[1][0].logo_link}" alt="" class="img-fluid">`;
  $('#brand-logo').html(brandImg);
  $('#brand-name').text(data[1][0].name)
  $('#brand-logo1').html(brandImg);
  $('#brand-name1').text(data[1][0].name)
})

//create a new account
$('#createAcc').on('click', function(e){
  createAccount()
});

$('#accountShort').on('click',()=>{
  createAccount()
})

//attempt to create a new cashbook
$('#newCashBook').on('click', (e)=>{
  window.dashboard.newCashBook('new cash book command');
})
$('#nCB').on('click', (e)=>{
  window.dashboard.newCashBook('new cash book command');
})
//attempt to create a new revenue
$('#createRev').on('click',(e)=>{
  createRevenue();
})

$('#revenueShort').on('click', (e)=>{
  createRevenue()
})
//attempt to create an expenses
$('#createExp').on('click',(e)=>{
  createExpenses()
})

$('#expShort').on('click', ()=>{
 createExpenses()
})

$('#createContra').on('click', (e)=>{
  createContra();
})
$('#contraShort').on('click',()=>{
  createContra()
})

$('#Cont').on('click',()=>{
  createContra()
})

$('#createDaily').on('click',(e)=>{
  createAnalysis();
})
$('#dAnal').on('click',(e)=>{
  createAnalysis();
})
$('#extractBal').on('click', (e)=>{
   window.dashboard.extractBalance('extract-command');
});

$('#createRecon').on('click', (e)=>{
  window.dashboard.creareRecon('reconciliation-command');
})

$('#bRec').on('click', (e)=>{
  window.dashboard.creareRecon('reconciliation-command');
})

$('#calcus').on('click',()=>{
  //alert('alert this information')
  window.dashboard.openCalcus('calcus-command')
})

$('#viewCashBook').on('click', (e)=>{
  window.dashboard.viewCashBook('view-cashbook');
})

$('#activeCashBook').on('click',()=>{
  openActiveCb()
})
$('#vACB').on('click',()=>{
  openActiveCb()
})

$('#cbReport').on('click',()=>{
  window.dashboard.cbReport('cashbook-report')
})
$('#queryAcc').on('click',()=>{
  window.dashboard.queryAccount()
})

$('#aEnq').on('click',()=>{
  window.dashboard.queryAccount()
})

$('#createPledge').on('click',()=>{
  window.dashboard.createPledge();
})

$('#viewPledge').on('click',()=>{
  window.dashboard.viewPledge()
})

$('#updateEnt').on('click', ()=>{
  window.dashboard.updateEnt();
})

$('#printDaily').on('click',()=>{
  window.dashboard.printDaily();
})

$('#pDaily').on('click',()=>{
  window.dashboard.printDaily();
})

let createAccount = ()=>{
    window.dashboard.newAccount('create new account')
}

let createRevenue = ()=>{
  window.dashboard.newRevenue('new revenue command');
}

let createExpenses = ()=>{
  window.dashboard.newExpense('new expense command');
}

let createContra = ()=>{
  window.dashboard.createContra('contra-command');
}

let createAnalysis = ()=>{
  window.dashboard.createAnalysis('anaysis-command');
}

let openActiveCb =()=>{
 window.dashboard.openActiveCashbook('active cb command') 
}

