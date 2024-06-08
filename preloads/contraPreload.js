const {contextBridge, ipcRenderer}= require('electron')

let contra = {
    postContra: (data)=>{
        ipcRenderer.send('post-contra', data);
    },

    contraRes: (callback)=>{
        ipcRenderer.on('conta-res',callback)
    }
}

contextBridge.exposeInMainWorld('contraApi',contra)