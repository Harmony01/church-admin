export const baseDeveloper={
    BaseUrl:'http://localhost/church-admin/public/',
    //function that populate data in an empty container
    populateContainer: function(containerId,containerContent)
    {
     containerId.html(containerContent); 
    },

    addClassToContainer:function(containerId,className)
    {
      containerId.addClass(className);
    },

    eventLoader: function(buttonId)
    {
      buttonId.html('Please wait...<i class="fa fa-circle-o-notch fa-spin"></i>');
      buttonId.attr('disabled','disabled');
    },

    cancelLoader:(elmID, orText)=>{
      elmID.html(orText);
      elmID.removeAttr('disabled');
  },

    fillSelectField: function(data, elemenID)
    {
      elemenID.innerHTML="";
      for (var i =0; i < data.length; i++) {
                    elemenID.innerHTML += "<option value='" + data[i].id +"'>" + data[i].name + "</option>";
          }
    },
    fillSelectField2: function(data, elemenID)
    {
      elemenID.innerHTML="";
      for (var i =0; i < data.length; i++) {
                    elemenID.innerHTML += "<option value='" + data[i].Account_id +"'>" + data[i].name + "</option>";
          }
    },

    fillSelectField3: function(data, elemenID)
    {
      elemenID.innerHTML='<option value="0">--please select--</option>';
      for (var i =0; i < data.length; i++) {
                    elemenID.innerHTML += "<option value='" + data[i].id +"'>" + data[i].name + "</option>";
          }
    },

    fillSelectField4: function(data, elemenID)
    {
      elemenID.innerHTML="";
      for (var i =0; i < data.length; i++) {
                    elemenID.innerHTML += "<option value='" + data[i].id +"'>" + data[i].name +" "+data[i].ref_no+ "</option>";
          }
    },

    toCurrency:(curr)=>{
     let currForHuman = Number(curr).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
     return currForHuman;
    }

}

export function eventNotice(title,notice,type){
    new PNotify({
        title:title,
        text: notice,
        type: type,
        styling: 'bootstrap3'
    });
  }