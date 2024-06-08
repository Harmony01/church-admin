const {dialog} = require('electron')

const notifyMe = {
    errorMessage: (win, title, msg)=>{
        dialog.showMessageBox(win, {
            type:'error',
            title:title,
            message:msg 
          });
    },

    warningMessage:(win, title, msg)=>{
        dialog.showMessageBox(win, {
            type:'warning',
            title:title,
            message:msg 
          });
    },

    inforMessage:(win, title, msg)=>{
        dialog.showMessageBox(win, {
            type:'info',
            title:title,
            message:msg 
          });
    }
}

module.exports=notifyMe