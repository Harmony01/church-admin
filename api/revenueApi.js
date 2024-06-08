const Api = require('./api')

const revenueApi={
    getRevenueItem:()=>{
     return Api().get('revenue/getrevenueItem');   
    },

    postRevenue:(data)=>{
        return Api().post('revenue/postItem',data)
    },

    postContra:(data)=>{
       return Api().post('contra/post', data)
    },

    postAnalysis:(data)=>{
        return Api().post('analysis/post', data)
    },
    getAccounts:()=>{
       return Api().get('off_cashbook/transactions'); 
    },
    fetchAccount:(data)=>{
        return Api().post('off_cashbook/transactions1',data)
    },
    postExtract:(data)=>{
       return Api().post('off_cashbook/transactions3',data) 
    },

    getReconItems:()=>{
        return Api().get('reconcile/get');
    },
     
    fetchCb:(data)=>{
        return Api().post('reconcile/fetchcb', data)
    },

    sendRecon:(data)=>{
        return Api().post('reconcile/post',data)
    },
    getAnalysis:()=>{
        return Api().get('daily-analysis/view/1')
    },
    getAnalysis2:(data)=>{
        return Api().get('daily-analysis/view2/'+data)
    }
}

module.exports=revenueApi;