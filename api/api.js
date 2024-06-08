const axios  =  require('axios');
const fs = require('fs');

let token;
let baseApi = axios.create({
    baseURL:'http://localhost/church_backend/public/api/'
})

const Api = ()=>{
   /*fs.readFile('./api/auth/file.txt', (err, data)=>{
    if (err) {
        console.log(err)
    }
    //console.log(data.toString())
    token = data.toString()
    console.log(token)
   })
   */
  try {
   const data = fs.readFileSync('./api/auth/file.txt') 
   //console.log(data.toString())
   token = data.toString();
  } catch (error) {
    console.log(error)
  }
    
 if (token) {
    baseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
 }
 return baseApi;
}


//Api();

module.exports = Api;