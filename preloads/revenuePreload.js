const {contextBridge, ipcRenderer} = require('electron')

let revenues ={
          revenueItems:(callback)=>{
            ipcRenderer.on('revenue-items', callback)
          },

          sendRevenue:(revData)=>{
           ipcRenderer.send('revenue-data',revData);
          },

          sendRevenueRes:(callback)=>{
           ipcRenderer.on('revenue-recorded',callback)
          }
}

contextBridge.exposeInMainWorld('revenues',revenues)