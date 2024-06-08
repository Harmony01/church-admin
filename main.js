const {app, BrowserWindow, ipcMain, shell, ipcRenderer} = require("electron");
const path = require('path');
const fs = require('fs');
//const axios = require('axios');
//const api = require('./api/api');
//apis
const {login, logout} = require('./api/auth');
const accountsApi =require('./api/accounts');
const cashBookApi = require('./api/cashBookApi');
const revenueApi = require('./api/revenueApi');
const expenseApi = require('./api/expenseApi');
const pledgeApi = require('./api/pledgeAip');
//winddows
const appWindows = require('./windows')
const notifyMe = require('./notifications/notification')
const webURL = require('./web/web');



let loginWin, newCBWin;

//handle login logic
ipcMain.on('loginResponse', (event, loginData)=> {
  //console.log(loginData);
  //dashBoardWindow();
  if (loginData.email=='' || loginData.password=="") {
    
    notifyMe.errorMessage(loginWin,'Error Message','Email address or password cannot be empty!')
    event.reply('error','error-occured');
  }else{

    login(loginData)
    .then(function (response) {
      //check the type of message that came
      if (response.data.errorMessage) {
        notifyMe.warningMessage(loginWin,'Login Failed!','Wrong email or password!')
        event.reply('error','error-occured');
      }else{
        
        //save token
        fs.writeFile('./api/auth/file.txt',response.data.token, ()=>{
        })
        fs.writeFile('./api/auth/webFile.txt',response.data.webtoken, ()=>{
        })
     //create a login success dialogue
     notifyMe.inforMessage(loginWin,'Login Successful','You have successfuly login!')        
      appWindows.dashBoardWindow(response.data.user);
     //close login windown
      loginWin.close();
      }
      

    })
    .catch(function (error) {
      console.log(error.response.data);
      notifyMe.warningMessage(loginWin,'Login Failed!','error occured!')
      event.reply('error','error-occured');
    });

    
  } 
})
///handle login logic ends here

//handle logout logic 
ipcMain.on('logout', (evant, data)=>{
  logout().then((response)=>{
    fs.writeFile('./api/auth/file.txt','', ()=>{
    })
    fs.writeFile('./api/auth/webFile.txt','', ()=>{
    })
    app.quit();

  }).catch((error)=>{

  })
})
//handle logout logic ends here

//handle new account here
ipcMain.on('new-account',(event, commandMessage)=>{
  //console.log(commandMessage);
  appWindows.creatNewAccount();
})
ipcMain.on('post-account', (event, data)=>{
  if (data.name=='' || data.legend=="" || data.accountType_id==0) {
    
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(), 'Error Message','Provide all relevant data!');
  }else{
   accountsApi.newAccount(data).then((response)=>{
    notifyMe.inforMessage(BrowserWindow.getFocusedWindow(),'Event Success','Data recorded successfuly!')
    //console.log(response.data)
   }).catch((err)=>{
    console.log(err.response.data)
   })
  }
  
})

//crate new cashbook
ipcMain.on('new-cashbook', (_, data)=>{
 //console.log(data);
 cashBookApi.testActiveCb().then((res)=>{
  if (res.data.msg) {
    notifyMe.warningMessage(BrowserWindow.getFocusedWindow(),'cannot Create cashbook','there is an active cash book!')
  }else{
    //appWindows.createNewCashBook(newCashWin)
    //console.log( appWindows.createNewCashBook(newCashWin))
    newCBWin = new BrowserWindow({
      height:600,
      width:1100,
     webPreferences:{
         preload:path.join(__dirname, 'preloads/cashbookPreload.js')
     }
  })
  
  newCBWin.loadFile('views/newCashbook.html');

  }

 }).catch((err)=>{
  console.log(err.response.data)
 })

})
//first step

ipcMain.on('first-res', (event,data)=>{
  if (data.name=='' || data.from=='' || data.to=='') {
    notifyMe.errorMessage(newCBWin,'data error','kindly provide all data!')
  }else{
    cashBookApi.firstStep(data).then((res)=>{
      event.reply('first-rep', res.data)
    }).catch((err)=>{
      console.log(err.response.data)
    })
  }
})

//second step
ipcMain.on('second-res', (event,data)=>{
  if (data.account_id=='') {
    notifyMe.errorMessage(newCBWin,'data error','Kindly add atleast one receipt item')
  }else{
    cashBookApi.secondStep(data).then((res)=>{
      event.reply('second-rep', res.data)
    }).catch((err)=>{
      console.log(err.response.data)
    })
  }
})

//third step
ipcMain.on('third-res', (event,data)=>{
  if (data.account_id=='') {
    notifyMe.errorMessage(newCBWin,'data error','Kindly add atleast one payment item')
  }else{
    cashBookApi.thirdStep(data).then((res)=>{
      //console.log(res.data)
      event.reply('third-rep', res.data)
    }).catch((err)=>{
      console.log(err.response.data)
    })
  }
})

//fourth step
ipcMain.on('fourth-res', (event,data)=>{
    cashBookApi.fourthStep(data).then((res)=>{
      //console.log(res.data)
      event.reply('fourth-rep', res.data)
    }).catch((err)=>{
      console.log(err.response.data)
    })

})
//fifth step
ipcMain.on('fifth-res', (event,data)=>{
  cashBookApi.fifthStep(data).then((res)=>{
    //console.log(res.data)
    event.reply('fifth-rep', res.data)
    notifyMe.inforMessage(newCBWin,'sucess!','data added successfuly!')
    newCBWin.close()
  }).catch((err)=>{
    console.log(err.response.data)
  })

})
//create new cashbook ends here

///new account hends here
//create a new revenue
//open revenue window
ipcMain.on('new-revenue-command', (event, data)=>{
  //console.log(data)
 
   
   revenueApi.getRevenueItem().then((res)=>{
        
     appWindows.createRevenue(res.data)
        //console.log(revWin1.webContents)
        //console.log(res.data)
   }).catch((err)=>{
    console.log(err.response.data)
   })
      
})

//post revenue
ipcMain.on('revenue-data', (e,data)=>{
  if (data.data=='' || data.amount=='' || data.details=='') {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(),'data error','please input all relevant data')
  }else if (data.lamnt=='' && data.amt.length=='') {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(),'data error','atleat one revenue item must be credited')
  }else if (Number(data.checkTotal) != Number(data.amount)) {
    notifyMe.warningMessage(BrowserWindow.getFocusedWindow(),'data inconsistency','amount should be equal sum of individual revenue!')
  }else{
    revenueApi.postRevenue(data).then((res)=>{
      notifyMe.inforMessage(BrowserWindow.getFocusedWindow(),'input success','revenue recorded successfuly!')
     e.reply('revenue-recorded', res.data);
    }).catch((err)=>{
      console.log(err.response.data)
    })
  }
})
//=========
//new expenses
//open expense window
ipcMain.on('new-expense-command', (event, data)=>{
  //console.log(data)
   expenseApi.getExpenseItem().then((res)=>{
        
     appWindows.createExpenses(res.data)
        //console.log(revWin1.webContents)
        //console.log(res.data)
   }).catch((err)=>{
    console.log(err.response.data)
   })
      
});
//get balance
ipcMain.on('fetch-bal',(e,data)=>{
  expenseApi.fetchBal(data).then((res)=>{
   e.reply('fetch-res', res.data);
  }).catch((err)=>{
    console.log(err.response.data)
  })
})

//post expenses
ipcMain.on('post-expense', (e,data)=>{
  if (data.data=='' || data.amount=='' || data.details=='') {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(),'data error','please input all relevant data')
  }else if (data.lamnt=='' && data.amt.length=='') {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(),'data error','atleat one expense item must be debited')
  }else{
    expenseApi.postExpense(data).then((res)=>{
      notifyMe.inforMessage(BrowserWindow.getFocusedWindow(),'input success','Expense recorded successfuly!')
     e.reply('expense-recorded', res.data);
    }).catch((err)=>{
      console.log(err.response.data)
    })
  }
})
//============
//create contra
ipcMain.on('contra-command', (e,data)=>{
  appWindows.createContra();
})

//post contra
ipcMain.on('post-contra', (e,data)=>{
  if (data.date=='' || data.amount=='' || data.details=='') {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(),'data error','Please provide all relevant information!')
  }else{
     revenueApi.postContra(data).then((res)=>{
     notifyMe.inforMessage(BrowserWindow.getFocusedWindow(),'data saved','entry has been recorded successfuly!')
     e.reply('conta-res', res.data)
    }).catch((err)=>{
       console.log(err.response.data)
     })
  }
})
//=====

//daily analysis
ipcMain.on('analysis-command',(e,data)=>{
  appWindows.createAnalysis();
})

ipcMain.on('post-analysis',(e, data)=>{
  if (data.title=='' || data.date==''|| data.netIncome=='' || data.netIncome==0) {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(), 'data error','please complete required data!')
  }else{
    revenueApi.postAnalysis(data).then((res)=>{
     notifyMe.inforMessage(BrowserWindow.getFocusedWindow(),'data recorded!','data has been created successfuly!');
     //BrowserWindow.getFocusedWindow().close(); 
     e.reply('analysis-res', res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
})
//=====================
//extract balance command
ipcMain.on('extract-command',(e,data)=>{
  //console.log(data);
  revenueApi.getAccounts().then((res)=>{
    appWindows.extractBalance(res.data);
  }).catch((err)=>{
    console.log(err)
  })
 
})

//seach account
ipcMain.on('search-account' ,(e,data)=>{
  revenueApi.fetchAccount(data).then((res)=>{
   if (res.data.msg) {
    notifyMe.warningMessage(BrowserWindow.getFocusedWindow(), 'seach error','account not found')
   }else{
    e.reply('account-result', res.data);
   }
  }).catch((err)=>{
    console.log(err)
  })
})

ipcMain.on('search-account2' ,(e,data)=>{
  revenueApi.fetchAccount(data).then((res)=>{
   if (res.data.msg) {
    notifyMe.warningMessage(BrowserWindow.getFocusedWindow(), 'seach error','account not found')
   }else{
    e.reply('account-result2', res.data);
   }
  }).catch((err)=>{
    console.log(err)
  })
})

//post extract
ipcMain.on('post-extract', (e,data)=>{
  if (data.date=='' || data.amount=='' || data.details=='') {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(),'data error','kindly input all relevant data!')
  }else if (isNaN(data.amount)) {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(),'data error','amount must be a number')
  }else{
    revenueApi.postExtract(data).then((res)=>{
     if (res.data.msg) {
      notifyMe.warningMessage(BrowserWindow.getFocusedWindow(), 'data warning','date should not fall withing active casbook period!')
     }else{
      e.reply('post-extract-res', res.data.suc);
      notifyMe.inforMessage(BrowserWindow.getFocusedWindow(), 'data success','data recorded successfuly!')
     }
    }).catch((err)=>{
      console.log(err)
    })
  }
})
//=========================
//reconciliation=========
ipcMain.on('recon-command', (e, data)=>{
  revenueApi.getReconItems().then((res)=>{
   appWindows.reconWindow(res.data);
  }).catch((err)=>{
    console.log(err)
  })
})

ipcMain.on('fetch-cashbook', (e,data)=>{
  revenueApi.fetchCb(data).then((res)=>{
    e.reply('cb-result', res.data)
  }).catch((err)=>{
    console.log(err)
  })
})

ipcMain.on('send-recon',(e,data)=>{
  revenueApi.sendRecon(data).then((res)=>{
    if (res.data.msg) {
      notifyMe.warningMessage(BrowserWindow.getFocusedWindow(),'cannot reconcile','reconciliation has already been done!')
    }else{
      notifyMe.inforMessage(BrowserWindow.getFocusedWindow(), 'data success', 'reconcliation done successfuly!')
      //BrowserWindow.getFocusedWindow().close()
    }

  }).catch((err)=>{
    console.log(err);
  })
})
//reconciliation ends here
//open calculator
ipcMain.on('calcus-command', (e,data)=>{
  appWindows.openCalculator();
})
//==============================
//view cash book
ipcMain.on('view-cashbook', (e,data)=>{
  cashBookApi.viewCashbook().then((res)=>{
  appWindows.viewCashBookWin(res.data)
  }).catch((err)=>{
    console.log(err)
  })
})

ipcMain.on('view-cashbook-res',(e, data)=>{
  cashBookApi.getcbDetails(data).then((res)=>{
    appWindows.modalWithData(res.data,BrowserWindow.getFocusedWindow(), 'cashbookPreload.js','modals/editCashbookModal.html',600, 1000, 'cashbook-details');
    //BrowserWindow.getFocusedWindow().close();
  }).catch((err)=>{
    console.log(err)
  })
})

//update cashbook final
ipcMain.on('update-cashbook-final', (e, data)=>{
cashBookApi.updateCashbookFinal(data).then((res)=>{
  notifyMe.inforMessage(BrowserWindow.getFocusedWindow(),'udapte success', 'cashbook successfuly updated!');
  e.reply('cbSuccess','success')
  //BrowserWindow.getFocusedWindow().close()
}).catch((err)=>{
  e.reply('cbErr','error occured')
  console.log(err)
})
})
//==================

//open active cashbook
ipcMain.on('view-active-cb',(e,data)=>{
  appWindows.modalWindow(BrowserWindow.getFocusedWindow(), 'cashbookPreload.js','modals/cashbookModal.html',400, 500);
})

ipcMain.on('open-active-cB', (e,data)=>{
  shell.openExternal(webURL(`cashbook/receipt/${data.type}/${data.id}`));
})

ipcMain.on('open-active-payment', (e, data)=>{
  shell.openExternal(webURL(`cashbook/payment/${data.type}/${data.id}`));
})

ipcMain.on('open-complete',(e, data)=>{
  shell.openExternal(webURL(`cashbook/complete/${data.type}/${data.id}`));
})
//==================================
//cashbook report
ipcMain.on('cashbook-report', ()=>{
  cashBookApi.cbReport().then((res)=>{
   appWindows.dataTransmitWindow(res.data,'cashbookPreload.js','cbReport.html',400,800,'cbreport-response')
  }).catch((err)=>{
     console.log(err)
  })
})

ipcMain.on('cbreport-modal',(e,data)=>{
appWindows.modalWithData(data,BrowserWindow.getFocusedWindow(), 'cashbookPreload.js','modals/cashbookModal2.html',400, 500,'send-back-data')
})
//==============================
//query account
ipcMain.on('query-account',()=>{
  accountsApi.queryAccount().then((res)=>{
   appWindows.dataTransmitWindow(res.data,'accountPreload.js','queryAcc.html',700, 1200,'acounts')
  }).catch((err)=>{
    console.log(err)
  })
})


ipcMain.on('get-account-transaction',(e,data)=>{
  if (data.accountNo=='') {
    notifyMe.warningMessage(BrowserWindow.getFocusedWindow(),'data warning','please search account number!')
  }else{
    accountsApi.getAccountTransaction(data, data.id).then((res)=>{
       e.reply('account-query-result',res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
})

//print account statement
ipcMain.on('print-account-statement', (e,data)=>{
  shell.openExternal(webURL(`account/print/statement/${data.id}/${data.to}/${data.from}`)); 
})
//============================

//create pledges
ipcMain.on('create-pledge',(e,d)=>{
  pledgeApi.getPledgeList().then((res)=>{
    appWindows.dataTransmitWindow(res.data,'pledgePreload.js','createPledge.html',600, 700,'pledge-list');

  }).catch((err)=>{
    console.log(err)
  })
}),

ipcMain.on('pledge-title',(e,data)=>{
  if (data.name=='') {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(),'data error','name of pledge/payment cannot be empty!')
  }else{
    pledgeApi.createTitle(data).then((res)=>{
      e.reply('another-pledge-list',res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
})

ipcMain.on('new-list-modal', (e, data)=>{
  appWindows.modalWithData(data,BrowserWindow.getFocusedWindow(),'pledgePreload.js','modals/newList.html',500,600,'list-data')
})

ipcMain.on('create-new-list',(e,data)=>{
  if (data.name=="" || data.tel==""||data.amount=="" ||isNaN(data.amount)) {
    notifyMe.errorMessage(BrowserWindow.getFocusedWindow(), 'data-error','please make sure valid data is inputed!')
  }else{
    pledgeApi.createNewList(data).then((res)=>{
     e.reply('list-sent', res)
     notifyMe.inforMessage(BrowserWindow.getFocusedWindow(),'data success','list has been create succefuly!')
    }).catch((err)=>{
      console.log(err)
    })
  }
})

//new list 2
ipcMain.on('new-list2', (e,data)=>{
  pledgeApi.createNewList2(data).then((res)=>{
     notifyMe.inforMessage(BrowserWindow.getFocusedWindow(),'data success','data has been entered successfuly!')
  }).catch((err)=>{
    console.log(err)
  })
})
ipcMain.on('view-pledge',()=>{
  pledgeApi.viewPledge().then((res)=>{
    appWindows.dataTransmitWindow(res.data,'pledgePreload.js','viewPledge.html',400,600,'pledge-fetched');
  }).catch((err)=>{
    console.log(err)
  })
})
ipcMain.on('print-pledge',(e, data)=>{
   shell.openExternal(webURL(`pledge/print/${data.id}`));
})
//================

//update transaction
ipcMain.on('update-transaction',()=>{
  cashBookApi.viewCashbook().then((res)=>{
   appWindows.dataTransmitWindow(res.data,'transactionPreload.js','updateTransaction.html',700,1200, 'update-trans-res')
  }).catch((err)=>{
    console.log(err)
  })
})
//get transactions
ipcMain.on('get-tranactions',(e, data)=>{
  cashBookApi.getTransactions(data).then((res)=>{
     e.reply('get-transaction-res',res.data)
  }).catch((err)=>{
    console.log(err)
  })
})

//get transaction detail
ipcMain.on('fetch-transaction',(e,data)=>{
  cashBookApi.fetchTrans(data).then((res)=>{
   appWindows.modalWithData(res.data,BrowserWindow.getFocusedWindow(), 'transactionPreload.js','modals/transDetail.html',600,700,'transaction-detail')
  }).catch((err)=>{
    console.log(err)
  })
})
//update final
ipcMain.on('update-transaction-final', (e,data)=>{
  cashBookApi.updateTrFinal(data).then((res)=>{
     notifyMe.inforMessage(BrowserWindow.getFocusedWindow(),'update success','data has been updated successfuly!')
     // BrowserWindow.getFocusedWindow().close()
    }).catch((err)=>{

  })
})
//===================================
//print daily analysis
ipcMain.on('print-daily-1',()=>{
  revenueApi.getAnalysis().then((res)=>{
     appWindows.dataTransmitWindow(res.data,'analysisPreload.js','printAnalysis.html', 800,1000,'analysis-received')
  }).catch((err)=>{
    console.log(err)
  })
})

ipcMain.on('get-another-anal',(e,data)=>{
  revenueApi.getAnalysis2(data).then((res)=>{
    e.reply('another-analysis-rec', res.data)
  }).catch((err)=>{
    console.log(err)
  })
})

ipcMain.on('print-analysis-finaly', (e,data)=>{
  shell.openExternal(webURL('daily-analysis/print/'+data))
})
//==================================

app.whenReady().then(()=>{
  loginWin = new BrowserWindow({
    height: 500,
    width: 600,
    resizable: false,
    alwaysOnTop: false,
    icon:'img/icon.png',
    webPreferences:{
      preload: path.join(__dirname, 'preloads/loginPreload.js'),
      contextIsolation: true,
    }
  })
  
  //loginWin.webContents.openDevTools();
  loginWin.loadFile('views/login.html');
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          loginWin = new BrowserWindow({
            height: 500,
            width: 600,
            resizable: false,
            alwaysOnTop: false,
            icon:'img/icon.png',
            webPreferences:{
              preload: path.join(__dirname, 'preloads/loginPreload.js'),
              contextIsolation: true,
            }
          })
          
          //loginWin.webContents.openDevTools();
          loginWin.loadFile('views/login.html');
          
        }
      })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

