const Api = require('./api');

const pledgeApi={
    getPledgeList:()=>{
        return Api().get('pledges/list');
    },

    createTitle:(data)=>{
        return Api().post('pledges/create-title',data);
    },
    createNewList:(data)=>{
        return Api().post('pledges/create-list',data)
    },
    createNewList2:(data)=>{
        return Api().post('pledges/create-list2',data)
    },
    viewPledge:()=>{
        return Api().get('pledges/view');
    }

}

module.exports=pledgeApi;