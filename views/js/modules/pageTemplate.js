const topNav = `
<div class="container-fluid">
    <div class="row nav-content">
        <div class="col-md-12">
            <div class="topNav">
                <ul class="topnavs">
                    <li class="topitems" title="close"><i class="fa fa-times"></i></li>
                    <li class="topitems" title="recored revenue" id="revenueShort"><i class="fa fa-money"></i></li>
                    <li class="topitems" title="record expenses" id="expShort"><i class="fa fa-credit-card"></i></li>
                    <li class="topitems" title="contra entry" id="contraShort"><i class="fa fa-rotate-right"></i></li>
                    <li class="topitems" title="New Account" id="accountShort"><i class="fa fa-folder-o"></i></li>
                    <li class="topitems" title="open active Cashbook"><i class="fa fa-folder-open-o"></i></li>
                    <li class="topitems" title="calculator" id="calcus"><i class="fa fa-calculator"></i></li>
                </ul>
                <ul class="topnavs">
                    <li>Wecome, <span id="User-Name"></span></li>
                    <li class="topitems" title="logout"><a href="a" style="color: #fff;" id="logoutBtn"><i class="fa fa-power-off"></i></a></li>
                </ul>
            </div>
            
        </div>
    </div>
  </div>
`
const footer = `
<footer>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <hr>
                    <span>Church Admin softaware. Version 1.0.0</span>
                    <span>Developed by Hilside Business consult &copy; 2013</span>
                </div>
            </div>
        </div>
    </footer>
`
const productKeyPage = `
          <div class="login-item">
             <label class="mylabel"><i class="fa fa-key"></i></label> 
             <div class=""><input type="email" id="productKey" class="form-control" placeholder="enter product key" autofocus></div>
           </div>
            <div class="login-btn">
              <button type="submit" class="btn btn-secondary btn-block" id="enterKey" disabled>Activate Product</button>
              <p>Don't have product key?<a href="" class="buyKey"> purchase now!</a></p>
            </div>
`

const loginPage = `
<div class="login-item">
             <label class="mylabel"><i class="fa fa-envelope"></i></label> 
             <div class=""><input type="email" id="email" class="form-control" placeholder="email address" autofocus></div>
           </div>
           <div class="login-item">
              <label class="mylabel"><i class="fa fa-lock"></i></label> 
              <div class="">
                <input type="password" id="password" class="form-control" placeholder="password">
              </div>
            </div>
            <div class="login-btn">
              <button type="submit" class="btn btn-secondary btn-block" id="loginBtn">Login</button>
              <p>Don't have user credentials?<a href="" class="buyKey"> Register now!</a></p>
              <p>have Product Key? <a href="" id="enterProductKey">Activate Product Now!</a></p>
            </div>

`

export{productKeyPage,loginPage}