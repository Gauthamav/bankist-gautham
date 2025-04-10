'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Gautham',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};


const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444 
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
let inputCloseUsername = document.querySelector('.form__input--user');
let inputClosePin = document.querySelector('.form__input--pin');



const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// displaying movements in account deposit and withdrawl


const displayMovements = function (accs){
  containerMovements.innerHTML = ''

  accs.movements.forEach(function(mov,i){

    const type = mov > 0 ? 'deposit' :'withdrawal'
 
    // looping two arrays using i

    const accDate  = new Date(accs.movementsDates[i]) 
    const accday = `${accDate.getDate()}`.padStart(2,0);
    const accmonth = `${accDate.getMonth()}`.padStart(2,0);
    const accyear = accDate.getFullYear()
    const displayDate = `${accday}/${accmonth}/${accyear}`



    
   const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${mov}</div>
        </div>`
        containerMovements.insertAdjacentHTML('afterbegin',html)

  })


}



// owner user name short 


const createUserName  = function(accs){
  accs.forEach(function(acc){
    acc.userName  =  acc.owner.toLowerCase().split(' ').map(name => name[0]) .join('');
    console.log(acc.userName)
  })
 
}
createUserName(accounts)



// calculating balance 

const calcDisplayBalance = function(accs){

  accs.balance = accs.movements.reduce((acc,cur) => acc + cur,0)
  labelBalance.textContent = `${accs.balance} EUR`
}


// calculating incomming amounts 
// calculating outgoing amount
// calculating interest amount

let interestRate = 0.2;

const calcDisplaySummary = function(accs){
  const incomes = accs.movements.filter((mov) => mov > 0).reduce((acc,cur) => acc + cur,0)
  const outgoing = accs.movements.filter((mov) => mov < 0 ).reduce((acc,mov) => (acc + mov) ,0)
  const interest = accs.movements.filter((mov) => mov > 0 ).map((mov) => mov * interestRate).reduce((acc,mov) => acc + mov,0)
  
  labelSumInterest.textContent = `${interest} €`;
  labelSumOut.textContent = `${Math.abs(outgoing)} €`
  labelSumIn.textContent = `${incomes} €`;

}
 




//Login 


let currentAccount , timer ;

btnLogin.addEventListener('click', function(e){
  e.preventDefault()
 
 currentAccount =  accounts.find((acc) => acc.userName === inputLoginUsername.value )

 if (currentAccount?. pin === Number( inputLoginPin.value))
 {

   // Welcome message of user name 

    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
    

    // clear the inputusername  field and pin number field
  
  
    inputLoginUsername.value = inputLoginPin.value = '';
     inputLoginPin.blur()


  // calling timer

  if (timer){

    clearInterval(timer)
   
   

  }
  timer = startLogoutTimer();
      
 
  updateInterface(currentAccount)
  containerApp.style.opacity = 100;
    // Display UI
   
    
 
  
  // changing the opacity

  

  
 // internationalizing date and time


  const now = new Date();
  const day = `${now.getDate()}`.padStart(2,0);
  const month = `${now.getMonth()}`.padStart(2,0);
  const year = now.getFullYear()
  const hour = `${now.getHours()}`.padStart(2,0);
  const min = `${now.getMinutes()}`.padStart(2,0);
  const time  = `${day}/${month}/${year} , ${hour} : ${min}`
  labelDate.textContent = time;
  

 }

})

const updateInterface = function(accs){

  displayMovements(currentAccount)
  calcDisplayBalance(currentAccount)
  calcDisplaySummary(currentAccount)
 
  

  }


// transfering money to another account


btnTransfer.addEventListener('click' , function(e){
e.preventDefault()
const transferAmount = Number(inputTransferAmount.value)
const transferTo = inputTransferTo.value
const recieverAcc = accounts.find((acc) => acc.userName === transferTo)

if(transferAmount > 0 && recieverAcc?.userName !== currentAccount.userName && recieverAcc && transferAmount <= currentAccount.balance )

  currentAccount.movements.push(-transferAmount)
  currentAccount.movementsDates.push(new Date().toISOString())
  // clear input field
 
  inputTransferAmount.value = inputTransferTo.value = '';

  // timer
  if(timer){
    clearInterval(timer)
  }
  timer = startLogoutTimer()

  // UI update 

  updateInterface(currentAccount)

  recieverAcc?.movements.push(transferAmount)
  recieverAcc.movementsDates.push(new Date().toISOString())
   
  // timer 

  if(timer){
    clearInterval(timer)
  }
   timer = startLogoutTimer();

   // UI update 
  updateInterface(recieverAcc)  
   


})

// set timer

const startLogoutTimer = function(){

  // set the time to 5 min

  let time = 300;

    // here string is used for to maintain padstart
    const tick = function(){
    const min = String(Math.trunc(time/60)).padStart(2,0)
    const sec = String(Math.trunc(time%60)).padStart(2,0)

    // in each call print the remaining  time in UI

    labelTimer.textContent = `${min} : ${sec}`

    if(time == 0){
      
      clearInterval(timer) 
      labelWelcome.textContent = 'Log in to get started' 
      containerApp.style.opacity = 0;

    }
    time--;
  }

  tick(); 

  // call the timer each second
  
  const timer = setInterval(tick,1000)
  return timer;


}





// Loan amount 

btnLoan.addEventListener('click' ,function(e){
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value)
  if(loanAmount > 0 && loanAmount < 5000)
  {
    currentAccount.movements.push(loanAmount)
    currentAccount.movementsDates.push(new Date().toISOString())
    // clear input field

    inputLoanAmount.value = '';
    
    // timer

    if(timer){
      clearInterval(timer)
    }
    timer = startLogoutTimer();

    // update UI

    updateInterface(currentAccount)
  }


})



// closing the current account


btnClose.addEventListener('click', function(e){
  e.preventDefault();

     
   if(currentAccount.userName === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value))
    {

    const index = accounts.findIndex((acc) => acc.userName === currentAccount.userName)

       // deleted account from array
        accounts.splice(index)
    
       labelWelcome.textContent = 'Log in to get started'
        
       containerApp.style.opacity =0;
       
   }

   inputCloseUsername = inputClosePin = ''          
    
   
})
//const movements = [200,450,-400,3000,-650,-130,70,1300]





   
  