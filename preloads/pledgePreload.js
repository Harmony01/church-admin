const {contextBridge, ipcRenderer} = require('electron')

let pledge ={
      pledgeList:(callback)=>ipcRenderer.on('pledge-list',callback),
      pledgeTitle:(data)=>ipcRenderer.send('pledge-title',data),
      pledgeTitleRes:(callback)=>ipcRenderer.on('another-pledge-list',callback),
      newList:(data)=>ipcRenderer.send('new-list-modal', data),
      newListRes:(callback)=>ipcRenderer.on('list-data',callback),
      createNewList:(data)=>ipcRenderer.send('create-new-list',data),
      createNewListRes:(callback)=>ipcRenderer.on('list-sent', callback),
      newList2:(data)=>ipcRenderer.send('new-list2',data),
      pledgesFetched:(callback)=>ipcRenderer.on('pledge-fetched',callback),
      printPledge:(data)=>ipcRenderer.send('print-pledge', data)
}

contextBridge.exposeInMainWorld('pledges', pledge)