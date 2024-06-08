const Api = require('./api')

const accountsApi={
    newAccount:(data)=>{
        return Api().post('accounts/post', data)
       },

    queryAccount:()=>{
      return Api().get('account/query')  
    },
    getAccountTransaction:(data,id)=>{
      return Api().post(`account/query2/${id}`, data)
    }

 }
module.exports = accountsApi