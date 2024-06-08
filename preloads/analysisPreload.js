const {contextBridge, ipcRenderer}=require('electron')

let analysis = {
    postAnalysis:(data)=>{
        ipcRenderer.send('post-analysis', data)
    },

    postAnalysisRes:(callback)=>{
        ipcRenderer.on('analysis-res', callback)
    },

    printAnalysis1:(callback)=>ipcRenderer.on('analysis-received', callback),
    printAnalysis2:(data)=>ipcRenderer.send('get-another-anal', data),
    printAnalysis3:(callback)=>ipcRenderer.on('another-analysis-rec', callback),
    printAnalysis4:(data)=>ipcRenderer.send('print-analysis-finaly',data)
}

contextBridge.exposeInMainWorld('analysis', analysis)