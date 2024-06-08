const denom  =  document.querySelectorAll('#denom');
for (let i = 0; i < denom.length; i++) {
    denom[i].addEventListener('change',()=>{
        let className = denom[i].getAttribute('class');
        //get the parent's parent of the input value
        let parentName = denom[i].parentElement.parentElement;
        //get the value item assoc to the input value
        let valueItem = parentName.children[2]
        //get value of item inputed
        let inputValue = denom[i].value;
        //console.log(valueItem.children)
        //console.log(parentName.children[2])
        let subTotalValue;
        switch (Number(className)) {
            case 200:
                subTotalValue = inputValue*200
                valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                valueItem.children[1].innerText=subTotalValue 
                //console.log('denomination is 200')
                break;
               case 100:
                subTotalValue = inputValue*100
                valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                valueItem.children[1].innerText=subTotalValue 
                 break;
                 case 50:
                    subTotalValue = inputValue*50
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break;
                    case 20:
                    subTotalValue = inputValue*20
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break;
                    case 10:
                    subTotalValue = inputValue*10
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break;
                    case 5:
                    subTotalValue = inputValue*5
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break;
                    case 2:
                    subTotalValue = inputValue*2
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break; 
                    case 1:
                    subTotalValue = inputValue*1
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break; 
                    case 2000:
                    subTotalValue = inputValue*2
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break;
                    case 1000:
                    subTotalValue = inputValue*1
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break;
                    case 0.50:
                    subTotalValue = inputValue*0.50
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break; 
                    case 0.20:
                    subTotalValue = inputValue*0.20
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break;   
                    case 0.10:
                    subTotalValue = inputValue*0.10
                    valueItem.children[0].innerText=subTotalValue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    valueItem.children[1].innerText=subTotalValue 
                    break;    
        
            default:
                break;
        }
        //console.log(inputValue);
        //calculants
        //calculates total notes alone
        $('.noteTotal1').text(calAmount($('.rowValue')).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
        $('.noteTotal2').text(calAmount($('.rowValue')))
        //calculates total coin alone
        $('.totalCoin1').text(calAmount($('.conValue')).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
        $('.totalCoin2').text(calAmount($('.conValue')))
        let totalNotesCoins = calAmount($('.rowValue')) + calAmount($('.conValue'));
        //console.log(totalNotesCoins);
        $('.notesCoins1').text(totalNotesCoins.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
        $('.notesCoins2').text(totalNotesCoins)
        getGrandTotal();
    })
    
}

$('#momo').on('change', ()=>{
    getGrandTotal()
})
$('#pleges').on('change', ()=>{
    getGrandTotal()
})
$('#cheques').on('change', ()=>{
    getGrandTotal()
})

function calAmount(itemId)
{ 
 var sum = 0
  itemId.each(function(i,e){
    var amt = $(this).text()-0;
    sum +=amt
  });
  return sum
}

let getGrandTotal = ()=>{
    let grandTotalAmount = Number($('.notesCoins2').text())+Number($('#momo').val())+Number($('#pleges').val())+Number($('#cheques').val());
    $('.grandTotal1').text(grandTotalAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
}