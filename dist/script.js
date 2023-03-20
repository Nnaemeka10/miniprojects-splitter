// Variable declaration
const allInputs = document.querySelectorAll('input')
const inputs = document.querySelectorAll('input[required]');
const warning = document.querySelector('.warning');
const people = document.querySelector('#peopleInput');
const bill = document.querySelector('#billInput');
const buttons=document.querySelectorAll('button[type=button]');
const custom = document.querySelector('#shortInput')
const tip = document.querySelector('#tip')
const total = document.querySelector('#totaL')
const init = document.querySelector('.init')
const reset = document.querySelector('button[type=reset]')
let dera = 15
let cut 
stateOfDom=false  //used to toggle the default button


// Function for Invalid input check
inputs.forEach((input)=>{
    input.addEventListener('keyup', e=>{
        if(people.value == 0){
            warning.style.display='block'
            people.style.border='3px solid red'
        }if(people.value<0){
            people.style.border='3px solid red'
        }if(bill.value < 1){
            
            bill.style.border='3px solid red'
        }if(people.value > 0){
            warning.style.display='none';
            people.style.border='4px solid var(--Strong-cyan)'
        }if(bill.value > 0 ){
            bill.style.border='4px solid var(--Strong-cyan)' 
        }
    })
});


// function for calculating
function calcTip(percent) {
    if(percent == 0){
        return
    }else{
        tipPerson=((eval(bill.value)/eval(people.value)*percent)/100).toFixed(2)
        totalPerson=((eval(bill.value)/eval(people.value))+eval(tipPerson)).toFixed(2);
        if(totalPerson.length>4){
            totalPerson = totalPerson.substring(0,5)
            total.value=`$${totalPerson}`
        }if(totalPerson.length < 5){
            total.value=`$${totalPerson}`
        }
        if(tipPerson.length>4){
            tipPerson = tipPerson.substring(0,5)
            tip.value=`$${tipPerson}`
        }if(tipPerson.length < 5){
            tip.value=`$${tipPerson}`
        }
    }
};


//Entry point for button
buttons.forEach((button)=>{
    button.addEventListener('click', e=>{
        stateOfDom=true
        if(bill.value > 0 && people.value > 0){
            inputs.forEach((input)=>input.style.border='none')
            custom.value =""
            dera=button.value
            calcTip(dera)
        }else if(bill.value == 0 || people.value == 0){
            inputs.forEach((input)=>{
                if(input.value == ""){
                    input.style.border='3px solid red'
                    custom.value =""
                }
            })
        }
    })
})


//Entry point for custom
custom.addEventListener('keyup',e=>{
    stateOfDom=true
    dera=custom.value
    if(custom.value > 0 && bill.value > 0 && people.value > 0){
        inputs.forEach((input)=>input.style.border='none')
        calcTip(dera)
    }else if(bill.value == 0 || people.value == 0){
        inputs.forEach((input)=>{
            if(input.value == ""){
                input.style.border='3px solid red'
            }
        }) 
    }
});


//setting color of 15% as the default input
buttons.forEach((button)=>{
    button.addEventListener('click', e=>{
        if (stateOfDom) {
            init.classList.remove('init')
        }
    })
})
custom.addEventListener('keyup',e=>{
    if (stateOfDom) {
        init.classList.remove('init')
    }
})

//Entry point for Bill input
bill.addEventListener('keyup',e=>{
    stateOfDom=true
    if(people.value>0){
        people.style.border='none'
    }
    if(dera != "" && bill.value > 0 && people.value > 0){
        calcTip(dera)
     }
});


//Entry point for people input
people.addEventListener('keyup',e=>{
    stateOfDom=true
    if(bill.value>0){
        bill.style.border='none'
    }
    if(dera != "" && bill.value > 0 && people.value > 0){
        calcTip(dera)
     }
});


//toggle reset button
allInputs.forEach((allinput)=>{
    allinput.addEventListener('keyup', e=>{
        if(tip.value == "$0.00" || total.value == "$0.00"){
            reset.disabled=true
            reset.ariaDisabled=true
        }else{
            reset.disabled=false
            reset.ariaDisabled=false
        }
    })
})


//Return answer box to zero when nonsense is inputed in the input box
inputs.forEach((input)=>{
    input.addEventListener('keyup', e=>{
        if(bill.value <1 || people.value <1){
            tip.value = "$0.00"
            total.value = "$0.00"
        }
    })
})
custom.addEventListener('keyup', e=>{
    if(custom.value<1){
        tip.value = "$0.00"
        total.value = "$0.00"
    }
})

inputs.forEach((input)=>{
    input.oninput= function() {
        if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);  
    }
})