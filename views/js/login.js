import { baseDeveloper } from "./modules/script.js";

import {productKeyPage, loginPage} from "./modules/pageTemplate.js"

let formData = {};

//const loginBtn = document.getElementById('loginBtn')
$('body').on('click','#loginBtn', (e)=>{
    baseDeveloper.eventLoader($('#loginBtn'));
    var email = $('#email').val();
var password =$('#password').val();
 
formData={'email':email, 'password':password}
 window.loginBridge.createLogin(formData);
});

window.loginBridge.errorMessage((e,d)=>{
 baseDeveloper.cancelLoader($('#loginBtn'),'Login')
 baseDeveloper.cancelLoader($('#enterKey'),'Activate Product')
})

$('#stopBtn').on('click',()=>{
    window.loginBridge.stopLogin()
})

$('#enterProductKey').on('click',(e)=>{
    e.preventDefault();
    $('#inputHolder').html(productKeyPage)
})

$('body').on('keyup','#productKey',()=>{
    //alert('some typing someting')
    let pKey = $('#productKey').val();
    let keyLenght = pKey.length;
   if (keyLenght >15) {
    $('#enterKey').removeAttr('disabled','disabled');
   }else{
    $('#enterKey').attr('disabled','disabled');
   }
})

$('body').on('click','#enterKey',()=>{
    let pKey = $('#productKey').val();
    window.loginBridge.checkProductKey(pKey);
    baseDeveloper.eventLoader($('#enterKey'));

})

window.loginBridge.validKey((e,d)=>{
    $('#inputHolder').html(loginPage);
})

//registration
$('body').on('click','.buyKey',(e)=>{
    e.preventDefault();
    window.loginBridge.buyKey()
})