import { baseDeveloper } from "./modules/script.js";

let formData = {};

const loginBtn = document.getElementById('loginBtn')
loginBtn.addEventListener('click', (e)=>{
    baseDeveloper.eventLoader($('#loginBtn'));
    var email = $('#email').val();
var password =$('#password').val();
 
formData={'email':email, 'password':password}
 window.loginBridge.createLogin(formData);
});

window.loginBridge.errorMessage((e,d)=>{
 baseDeveloper.cancelLoader($('#loginBtn'),'Login')
})

$('#stopBtn').on('click',()=>{
    window.loginBridge.stopLogin()
})