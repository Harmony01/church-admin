const fs = require('fs');
const baseURL = 'http://localhost/church_backend/public/';
let token;

const createWebURL = (url)=>{
    try {
        const data = fs.readFileSync('C:\\wamp64\\auth\\webFile.txt') 
        //console.log(data.toString())
        token = data.toString();
       } catch (error) {
         console.log(error)
       }
       
    if (token) {
      return baseURL+url+'/'+token 
    }
}

module.exports =createWebURL;