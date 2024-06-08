//this is the content initializer
export const contentMaker={
    cashBookStage2:`<div class="budgetReceipt">
    <div class="form-group row">
        <label for="inputEmail3" class="col-sm-3 col-form-label">Cash Book Name</label>
        <div class="col-sm-8">
           <input type="text" id="name" class="form-control" disabled>
        </div>
    </div>
      <br>
      <p>add Receipt items to the budget. Kindly pick items from the dropdonwn below</p>
      <div class="receiptAcc form-group row">
          <div class="col-sm-9">
             <select name="" id="accounts" class="form-control accounts">
                 <option value="1">--please select--</option>
                 <option value="2">Cash</option>
                 <option value="3">Bank</option>
                 <option value="4">Others</option>
             </select>
          </div>
          <label for="inputEmail3" class="col-sm-3 col-form-label">
             <button class="btn-sm btn-secondary addRec"><i class="fa fa-plus"></i> Add</button>
          </label>
      </div>
      <table class="table">
         <tr>
           <th>#</th>
           <th>Account Name</th>
           <th></th>
         </tr>
           <tbody class="tbody1" id="table1">
               
           </tbody>
      </table>
      <hr>
      <div class="d-flex justify-content-between">
         <button class="btn-sm btn-secondary">Previous</button>
         <button class="btn-sm btn-secondary" id="secondStepb">Next</button>
       </div> 
    </div>`,

cashBookStage3:`<div class="budgetPayment">
<div class="form-group row">
        <label for="inputEmail3" class="col-sm-3 col-form-label">Cash Book Name</label>
        <div class="col-sm-8">
           <input type="text" id="name" class="form-control" disabled>
        </div>
    </div>
      <br>
      <p>add Payment items to the budget. Kindly pick items from the dropdonwn below</p>
      <div class="receiptAcc form-group row">
          <div class="col-sm-9">
             <select name="" id="accounts" class="form-control accounts">
                 <option value="1">--please select--</option>
                 <option value="2">Cash</option>
                 <option value="3">Bank</option>
                 <option value="4">Others</option>
             </select>
          </div>
          <label for="inputEmail3" class="col-sm-3 col-form-label">
             <button class="btn-sm btn-secondary addRec"><i class="fa fa-plus"></i> Add</button>
          </label>
      </div>
      <table class="table">
         <tr>
           <th>#</th>
           <th>Account Name</th>
           <th></th>
         </tr>
           <tbody class="tbody1" id="table1">
               
           </tbody>
      </table>
  <hr>
  <div class="d-flex justify-content-between">
     <button class="btn-sm btn-secondary">Previous</button>
     <button class="btn-sm btn-secondary" id="thirdStepb">Next</button>
   </div> 
</div>`,
cashBookStage4:`
<div class="receipt column">
<p>Your cash book analysis column for the receipt side will display the account titles below:</p>
<table class="table">
<tr>
<th>Account Title</th>
</tr>
<tbody class="receiptTopics">
 
</tbody>
</table>
<div class="d-flex justify-content-between">
     <button class="btn-sm btn-secondary">Previous</button>
     <button class="btn-sm btn-secondary" id="fourthStepb">Next</button>
   </div> 
</div>
`,
cashBookStage5:`<div class="receipt column">
<p>Your cash book anylysic column for the payment side will display the account titles below:</p>
<table class="table">
<tr>
<th>Account Title</th>
</tr>
<tbody class="payTopics">
 
</tbody>
</table>
<div class="d-flex justify-content-between">
     <button class="btn-sm btn-secondary">Previous</button>
     <button class="btn-sm btn-secondary" id="fifthStepb">Next</button>
   </div> 
</div>`,
cashBookStage6:`<div class="budgetPayment">
<h4 class="text-success">You have successfully opened a new budget. </h4>
<a href="http://localhost/church-admin/public/cashbooks/allbooks" class ="btn btn-success btn-block">Done!</a>
</div>`,

newList:`<span>Add pledgee/payer's list</span>
<div class="border pd">
  <div class="clearfix">
      <button class="btn btn-sm btn-secondary pull-right" id="newList">create new list</button>
  </div><br>
   <table class="table">
      <tr>
          <th>Name</th>
          <th>Amount</th>
          <th></th>
      </tr>
      <tbody>
          <tr>
              <td>
                  <select name="" id="pledgeName" class="form-control">
                  </select>
              </td>
              <td>
                  <input type="text" name="" id="amount" class="form-control" size="5">
              </td>
              <td>
                  <button class="btn-sm btn-secondary addRec"><i class="fa fa-plus"></i> Add</button>
              </td>
          </tr>
      </tbody>
      <tbody class="list">
          
      </tbody>
   </table>
   <hr>
   
   <div class="clearfix">
   <span class="pledgeID"></span>
      <button class="btn btn-sm btn-secondary pull-right" id="recordRev">create</button>
  </div>
</div>
         `
    
}