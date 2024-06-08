const Api = require('./api')

const cashBookApi={
    testActiveCb:()=>{
        return Api().get('cashbook/testActive');
    },

    firstStep:(firstData)=>{
       return Api().post('cashbook/firststep', firstData)
    },

    secondStep:(secondData)=>{
        return Api().post('cashbook/secondstep',secondData);
    },
    thirdStep:(thirdData)=>{
        return Api().post('cashbook/thirdstep',thirdData);
    },
    fourthStep:(fourthData)=>{
        return Api().post('cashbook/forthstep',fourthData);
    },
    fifthStep:(fifthData)=>{
        return Api().post('cashbook/fithstep',fifthData);
    },

    getActiveItems:()=>{
      return Api().get('cashbook/getActive');
    },

    viewCashbook:()=>{
        return Api().get('cashbook/view')
    },

    cbReport:()=>{
        return Api().get('cashbook/report')
    },

    getcbDetails:(data)=>{
        return Api().get('cashbook/details/'+data);
    },

    updateCashbookFinal: (data)=>{
     return Api().post('update/cashbook',data)
    },

    getTransactions:(data)=>{
        return Api().get('get/transactions/'+data)
    },
    fetchTrans:(data)=>{
        return Api().get('get/transactions/detail/'+data)
    },
    updateTrFinal:(data)=>{
      return Api().post('get/transaction/update', data)
    }
    

}

module.exports=cashBookApi;
