const topNav = `
<div class="container-fluid">
    <div class="row">
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
const createTopNav = ()=>{
    const topnavHolder = document.getElementById('holdNav');
    topnavHolder.innerHTML=topNav
    //console.log(topnavHolder.innerHTML);
}

const createFooter = ()=>{
const footerHolder = document.getElementById('footerHolder');
footerHolder.innerHTML=footer;
}

export{createTopNav, createFooter}