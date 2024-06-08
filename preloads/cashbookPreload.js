const {contextBridge, ipcRenderer} = require('electron');

const cashbook ={
    cashbookFirst: (firstData)=>{
        ipcRenderer.send('first-res', firstData)
    },
    firstRep: (callback)=>{
        ipcRenderer.on('first-rep', callback)
    },

    cashbookSecond:(secondData)=>{
        ipcRenderer.send('second-res', secondData);
    },
    secondRep:(callback)=>{
        ipcRenderer.on('second-rep', callback);
    },
    cashbookThird:(secondData)=>{
        ipcRenderer.send('third-res', secondData);
    },
    thirdRep:(callback)=>{
        ipcRenderer.on('third-rep', callback);
    },
    cashbookfourth:(secondData)=>{
        ipcRenderer.send('fourth-res', secondData);
    },
    fourthRep:(callback)=>{
        ipcRenderer.on('fourth-rep', callback);
    },

    cashbookFifth:(secondData)=>{
        ipcRenderer.send('fifth-res', secondData);
    },
    fifthRep:(callback)=>{
        ipcRenderer.on('fifth-rep', callback);
    },
    getCashbooks:(callback)=>{
        ipcRenderer.on('cashbooks', callback)
    },

    viewCashbook:(msg)=>{
        ipcRenderer.send('view-cashbook-res',msg)
    },
    openReceipt:(msg)=>{
        ipcRenderer.send('open-active-cB',msg);
    },

    openPayment:(msg)=>{
        ipcRenderer.send('open-active-payment',msg);
    },
    openComplete:(msg)=>{
        ipcRenderer.send('open-complete',msg);
    },

    cbReportRes:(callback)=>{
     ipcRenderer.on('cbreport-response', callback)
    },
    openModal:(msg)=>ipcRenderer.send('cbreport-modal',msg),
    cbReportRes2:(callback)=>{
      ipcRenderer.on('send-back-data', callback);
    },

    cashbookDetailRes:(callback)=>ipcRenderer.on('cashbook-details', callback),
    updateCashbook:(data)=>ipcRenderer.send('update-cashbook-final', data),
    cbErr:(callback)=>ipcRenderer.on('cbErr',callback),
    cbSuccess:(callback)=>ipcRenderer.on('cbSuccess',callback)
}

contextBridge.exposeInMainWorld('cashbook', cashbook);