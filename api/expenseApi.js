const Api = require('./api')

const expenseApi={
    getExpenseItem:()=>{
     return Api().get('input/expenses');   
    },

    postExpense:(data)=>{
        return Api().post('revenue/postItem',data)
    },
    fetchBal:(data)=>{
        return Api().get(`expenses/input1/${data}`)
    },
    postExpense:(data)=>{
        return Api().post('expenses/post', data)
    }
}

module.exports=expenseApi;