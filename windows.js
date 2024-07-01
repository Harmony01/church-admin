const {BrowserWindow, dialog} = require('electron')
const path = require('path');
let cashBookWin;

const appWindows={
  newCashbookWin: cashBookWin,

  dashBoardWindow: (winData)=>{
    const item = new BrowserWindow({
         height: 600,
         width: 1000,
         icon:'img/icon.png',
         webPreferences:{
           preload:path.join(__dirname,'preloads/dashboardPreload.js')
         }
       });
 
       item.loadFile('views/dashboard.html');
       item.webContents.on('did-finish-load', ()=>{
         item.webContents.send('user-details', winData)
         //console.log('dash board window has fired')
       }) 
    },

    creatNewAccount: ()=>{
      const winAc = new BrowserWindow({
           height:500,
           width:700,
           icon:'img/icon.png',
          webPreferences:{
              preload:path.join(__dirname, 'preloads/accountPreload.js')
          }
      })
  
      winAc.loadFile('views/newAcc.html')
   },

   /*createNewCashBook: (windata)=>{
    windata = new BrowserWindow({
         height:600,
         width:1000,
        webPreferences:{
            preload:path.join(__dirname, 'preloads/cashbookPreload.js')
        }
    })

    windata.loadFile('views/newCashbook.html');

    return windata;
 }
 */

 createRevenue:(data)=>{
  const revWin1 = new BrowserWindow({
    height:700,
    width:1100,
    icon:'img/icon.png',
    webPreferences:{
     preload:path.join(__dirname, 'preloads/revenuePreload.js')
     }

     
    }) 
   revWin1.loadFile('views/newRevenue.html')
    revWin1.webContents.on('did-finish-load', ()=>{
       revWin1.webContents.send('revenue-items', data)
    })
 },
 createExpenses:(data)=>{
  const revWin1 = new BrowserWindow({
    height:700,
    width:1100,
    icon:'img/icon.png',
    webPreferences:{
     preload:path.join(__dirname, 'preloads/expensePreload.js')
     }

     
    }) 
   revWin1.loadFile('views/newExpense.html')
    revWin1.webContents.on('did-finish-load', ()=>{
       revWin1.webContents.send('expense-items', data)
    })
 },
 createContra:()=>{
  const revWin1 = new BrowserWindow({
    height:500,
    width:1100,
    icon:'img/icon.png',
    webPreferences:{
     preload:path.join(__dirname, 'preloads/contraPreload.js')
     }

     
    }) 
   revWin1.loadFile('views/newContra.html')
    
 },

 createAnalysis:()=>{
  const revWin1 = new BrowserWindow({
    height:700,
    width:1100,
    icon:'img/icon.png',
    webPreferences:{
     preload:path.join(__dirname, 'preloads/analysisPreload.js')
     }

     
    }) 
   revWin1.loadFile('views/newAnalysis.html')
    
 },

 extractBalance:(data)=>{
  const revWin1 = new BrowserWindow({
    height:500,
    width:1100,
    icon:'img/icon.png',
    webPreferences:{
     preload:path.join(__dirname, 'preloads/extractBalancePreload.js')
     }

     
    }) 
   revWin1.loadFile('views/extractBalance.html')
    revWin1.webContents.on('did-finish-load', ()=>{
       revWin1.webContents.send('get-accounts', data)
    }) 
 },

 reconWindow:(data)=>{
  const revWin1 = new BrowserWindow({
    height:800,
    width:650,
    icon:'img/icon.png',
    webPreferences:{
     preload:path.join(__dirname, 'preloads/reconPreload.js')
     }

     
    }) 
   revWin1.loadFile('views/recon.html')
    revWin1.webContents.on('did-finish-load', ()=>{
       revWin1.webContents.send('get-recon-item', data)
    }) 
 },

 openCalculator:()=>{
  const revWin1 = new BrowserWindow({
    height:800,
    width:1000,
    icon:'img/icon.png',
    }) 
   revWin1.loadFile('views/calc.html')
 },
 viewCashBookWin:(data)=>{
  const revWin1 = new BrowserWindow({
    height:700,
    width:1100,
    icon:'img/icon.png',
    webPreferences:{
     preload:path.join(__dirname, 'preloads/cashbookPreload.js')
     } 
    }) 
    revWin1.loadFile('views/viewCashbook.html') 
    revWin1.webContents.on('did-finish-load', ()=>{
      revWin1.webContents.send('cashbooks', data)
   }) 
 },
 modalWindow:(parentWindow, parentPreload, htmlItem, h, w)=>{
  const revWin1 = new BrowserWindow({
    height:h,
    width: w,
    parent: parentWindow,
    modal: true,
    icon:'img/icon.png',
    webPreferences:{
     preload:path.join(__dirname, 'preloads/'+parentPreload)
     } 
    }) 
    revWin1.loadFile('views/'+htmlItem) 
      
 },

 modalWithData:(data,parentWindow, parentPreload, htmlItem, h, w,channel)=>{
  const revWin1 = new BrowserWindow({
    height:h,
    width: w,
    parent: parentWindow,
    modal: true,
    icon:'img/icon.png',
    webPreferences:{
     preload:path.join(__dirname, 'preloads/'+parentPreload)
     } 
    }) 
    revWin1.loadFile('views/'+htmlItem) 
    revWin1.webContents.on('did-finish-load', ()=>{
      revWin1.webContents.send(channel, data)
     })
 },


 dataTransmitWindow:(data, preloadJs,htmlItem, h, w,channel)=>{
    const win = new BrowserWindow({
      height: h,
      width: w,
      icon:'img/icon.png',
      webPreferences:{
        preload:path.join(__dirname, 'preloads/'+preloadJs)
      }
    })

    win.loadFile('views/'+htmlItem);
    win.webContents.on('did-finish-load',()=>{
      win.webContents.send(channel, data)
    })
 },

 loginWindow: ()=>{
        const logWin =new BrowserWindow({
          height: 400,
          width: 600,
          resizable: false,
          alwaysOnTop: false,
          frame:false,
          icon:'img/icon.png',
          webPreferences:{
            preload: path.join(__dirname, 'preloads/loginPreload.js'),
            contextIsolation: true,
          }
        })

        return logWin;
     }

}
     
module.exports=appWindows;

