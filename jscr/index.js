'use strict';
// DATA
const account1 = {
  owner: 'Abubakar shekh',
  movements: [
    13, 1000, -500, 200, 400, -1200, 456, 800, 111, -123, -564, 12345, 578, 954,
  ],
  movementsDates: [
    '2022-04-26T15:31:17.178Z',
    '2022-04-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-07-12T10:51:36.790Z',
  ],
  interestRate: 1.2,
  pin: 1111,
  local: 'en-IN',
};

const account2 = {
  owner: 'Umar Afridi',
  movements: [7000, -500, 100, 400, -800, 46, 900],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
  ],
  interestRate: 1.5,
  pin: 2222,
  local: 'en-IN',
};

const account3 = {
  owner: 'Usman Ghani',
  movements: [3456, 1111, -456, -342, 1245, -856, 386],
  interestRate: 0.5,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-07-12T10:51:36.790Z',
  ],
  local: 'en-IN',
};

const account4 = {
  owner: 'Haider Ali',
  movements: [100, -50, 431, 666, -123],
  interestRate: 0.2,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
  ],
  local: 'en-IN',
};

const accounts = [account1, account2, account3, account4];

/* ..............selecting elements.............. */
const bankHeader = document.querySelector('#bankHeader');
const accountHolderName = document.querySelector('.accountHolderName');
const idPass = document.querySelector('#idPass');
const user_name = document.querySelector('#userName');
const Password = document.querySelector('#password');
const loginButton = document.querySelector('.loginButton');

const main = document.querySelector('#main');
const currBalDate = document.querySelector('.currBalDate');
const currBalMon = document.querySelector('.currBalMon');

const movements = document.querySelector('.movements');
const numberOfDeposite = document.querySelector('.numberOfDeposite');
const DepositeTime = document.querySelector('.DepositeTime');
const depositeAmount = document.querySelector('.depositeAmount');

const numberOfWithdraw = document.querySelector('.numberOfWithdraw');
const withdrawTime = document.querySelector('.WithdrawTime');
const withdrawAmount = document.querySelector('.withdrawAmount');

const transferTo = document.querySelector('#transferTo');
const transferAmount = document.querySelector('#transferAmount');
const transferButton = document.querySelector('#transferButton');

const requestAmount = document.querySelector('#requestAmount');
const requestButton = document.querySelector('#requestButton');

const confirmUser = document.querySelector('#confirmUser');
const confirmPass = document.querySelector('#confirmPass');
const deleteAccountButton = document.querySelector('#deleteAccountButton');

const moneyComes = document.querySelector('#moneyComes');
const moneyGoes = document.querySelector('#moneyGoes');
const interest = document.querySelector('#interest');
const sorting = document.querySelector('#sorting');
const logOutTime = document.querySelector('#logOutTime');
/* ................all function........... */
// display movements
const displayMovements = function (currentAccount, mySortMov = false) {
  movements.innerHTML = ' ';
  const movs = mySortMov
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : currentAccount.movements;
  movs.forEach((move, ind) => {
    // setting date
    const calcDay = (date, now) => {
      return Math.round(Math.abs(date - now) / (1000 * 60 * 60 * 24));
    };
    let day = calcDay(new Date(currentAccount.movementsDates[ind]), new Date());
    if (day === 0) {
      day = `Today`;
    } else if (day === 1) {
      day = `yesterday`;
    } else if (day <= 7) {
      day = `${day} days ago`;
    } else {
      day = new Date(currentAccount.movementsDates[ind]);
      day = new Intl.DateTimeFormat(currentAccount.local).format(day);
    }
    // setting deposite and withdraw
    const type = move > 0 ? 'Deposite' : 'Withdraw';
    const html = `
    <div class="movementRow">
      <div class="numberOf${type}AndTime">
          <span class="numberOf${type}">${ind + 1} ${type}</span>
          <span class="${type}Time">${day}</span>   
      </div>
      <div class="${type.replace(
        type[0],
        type[0].toLowerCase()
      )}Amount">₹ ${move.toFixed(2)}</div>
    </div>
    `;
    movements.insertAdjacentHTML('afterbegin', html);
  });
};
// making username function
const userNameFun = function (accounts) {
  accounts.forEach((eachAccount) => {
    eachAccount.userName = eachAccount.owner
      .toLowerCase()
      .split(' ')
      .map((econ) => {
        return econ.slice(0, 1);
      })
      .join('');
  });
};
userNameFun(accounts);
// deposite and withdraw function
const depositeWithdraw = function (accounts) {
  accounts.forEach((eachAccount) => {
    eachAccount.deposite = eachAccount.movements.filter((move) => {
      return move > 0;
    });
    eachAccount.withdraw = eachAccount.movements.filter((move) => {
      return move < 0;
    });
  });
};
depositeWithdraw(accounts);
// display global balance for each account
const displayGlobalBalance = (eachAccount) => {
  eachAccount.balance = eachAccount.movements.reduce((accum, eachMov) => {
    return accum + eachMov;
  }, 0);
  currBalMon.textContent = '₹ ' + eachAccount.balance;
};
// display summery section
const calcDisplaySummery = function (eachAccount) {
  const moneyIn = eachAccount.movements
    .filter((mov) => {
      return mov > 0;
    })
    .reduce((accum, mov) => {
      return accum + mov;
    }, 0);
  moneyComes.textContent = '₹' + moneyIn.toFixed(2);

  const moneyOut = eachAccount.movements
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((accum, mov) => {
      return accum + mov;
    }, 0);
  moneyGoes.textContent = '₹' + Math.abs(moneyOut).toFixed(2);

  const myInterest = eachAccount.movements
    .filter((mov) => {
      return mov > 0;
    })
    .map((eachDeposite) => {
      return (eachDeposite * eachAccount.interestRate) / 100;
    })
    .filter((eachInterest, ind, arr) => {
      return eachInterest >= 1;
    })
    .reduce((total, actualInterest, ind, arr) => {
      return total + actualInterest;
    }, 0);
  interest.textContent = '₹' + myInterest.toFixed(2);
};
// function for calling the display movements, displaySummery, display balance
const updateUI = function (currentAccount) {
  displayMovements(currentAccount);
  displayGlobalBalance(currentAccount);
  calcDisplaySummery(currentAccount);
};
// transfer money function
const transferMoney = function (e) {
  e.preventDefault();
  const amount = Number(transferAmount.value);
  const transferredAccount = accounts.find((account) => {
    return account.userName === transferTo.value;
  });
  const currentAccount = accounts.find((account) => {
    return `₹ ${account.balance}` === currBalMon.textContent;
  });
  if (
    amount > 0 &&
    currentAccount.balance > amount &&
    transferredAccount &&
    currentAccount !== transferredAccount
  ) {
    // setting time to transferred money
    const now = new Date().toISOString();
    currentAccount.movementsDates.push(now);
    transferredAccount.movementsDates.push(now);
    // pushing amount to receiver and sender account
    transferredAccount.movements.push(amount);
    currentAccount.movements.push(-amount);
    // updating UI
    updateUI(currentAccount);
    transferAmount.value = '';
    transferTo.value = '';
  }
};
// setting logout timer
const logoutTimer = function () {
  let x = 9,
    y = 0;
  logOutTime.textContent = `${`${x}`.padStart(2, 0)}:${`${y}`.padStart(2, 0)}`;
  const timeInterval = setInterval(function () {
    if (y === 0) {
      y = 60;
      --x;
    }
    y--;
    if (x === 0 && y === 0) {
      clearInterval(timeInterval);
      main.style.opacity = '0';
      accountHolderName.textContent = 'Login to get started';
    }
    logOutTime.textContent = `${`${x}`.padStart(2, 0)}:${`${y}`.padStart(
      2,
      0
    )}`;
  }, 1000);
};
// login section
const loginFun = function (e) {
  // prevent form to submit
  e.preventDefault();
  let currentAccount = accounts.find((eachAccount) => {
    return (
      eachAccount?.userName === user_name.value &&
      eachAccount?.pin === Number(Password.value)
    );
  });
  if (!currentAccount) {
    alert('No any accout you are searching');
    user_name.value = '';
    Password.value = '';
    return;
  }
  // display UI and Messagge
  accountHolderName.textContent = `Welcome back, ${currentAccount?.owner}`;
  main.style.opacity = '1';
  updateUI(currentAccount);
  user_name.value = '';
  Password.value = '';
  logoutTimer();
};
// request money function or getting loan fun
const getLoan = function (e) {
  e.preventDefault();
  const amount = Number(requestAmount.value);
  const currentAccount = accounts.find((eachAccount) => {
    return `₹ ${eachAccount.balance}` === currBalMon.textContent;
  });
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => {
      return mov >= amount * 0.1;
    })
  ) {
    const date = new Date().toISOString();
    currentAccount.movementsDates.push(date);
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    requestAmount.value = '';
  }
};
// delete account function
const deleteAccount = function (e) {
  e.preventDefault();
  const currentAccount = accounts.find((eachAccount) => {
    return `₹ ${eachAccount.balance}` === currBalMon.textContent;
  });
  if (
    currentAccount.userName === confirmUser.value &&
    currentAccount.pin === Number(confirmPass.value)
  ) {
    const currentAccountInd = accounts.findIndex((eachAccount) => {
      return `₹ ${eachAccount.balance}` === currBalMon.textContent;
    });
    accounts.splice(currentAccountInd, 1);
    confirmUser.value = confirmPass.value = '';
    main.style.opacity = '0';
    console.log(accounts);
  } else {
    alert('Error in username and password');
  }
};
// sorting function
let sortVar = false;
const sortingMovements = function () {
  const currentAccount = accounts.find((eachAccount) => {
    return `₹ ${eachAccount.balance}` === currBalMon.textContent;
  });
  displayMovements(currentAccount, !sortVar);
  sortVar = !sortVar;
};

// .......Event listener for login..............
loginButton.addEventListener('click', loginFun);
transferButton.addEventListener('click', transferMoney);
requestButton.addEventListener('click', getLoan);
deleteAccountButton.addEventListener('click', deleteAccount);
sorting.addEventListener('click', sortingMovements);
// current balance date
const now = new Date();
currBalDate.textContent =
  `As of ` + new Intl.DateTimeFormat('en-IN').format(now);
/* ...................END................ */
/* learning section */
// formating  dates using API
// 1.
const today = new Date();
console.log(new Intl.DateTimeFormat('hi-IN').format(today));
// 2.
const option = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  minute: 'numeric',
  hour: 'numeric',
};
console.log(new Intl.DateTimeFormat('hi-IN', option).format(today));
// 3.
const local = navigator.language;
console.log(local);
console.log(new Intl.DateTimeFormat(local, option).format(today));
// formating number using API
// 1.
const num = 345786.3456;
console.log(new Intl.NumberFormat('en-IN').format(num));
console.log(new Intl.NumberFormat('ar-SY').format(num));
console.log(new Intl.NumberFormat(navigator.language).format(num));
// 2.
const option2 = {
  style: 'unit', //percent, currency
  unit: 'mile-per-hour', //celsius
  useGrouping: false,
};
console.log(new Intl.NumberFormat(navigator.language, option2).format(num));
// setTimeOut and setTimeInterval
// 1. setTimeout
const names = ['Aasif', ''];
const interval = setTimeout(
  (a, b) => {
    console.log(`Hello ${a} and ${b}`);
  },
  2000,
  ...names
);
console.log('Waiting');
if (names.includes('Aarif')) {
  clearTimeout(interval);
}
// 2. setTimeinterval
/* setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
 */
// ...........testing section.........

const myTimer = document.querySelector('.timer');
setInterval(function () {
  const now = new Date();
  myTimer.textContent = Intl.DateTimeFormat('hi-IN', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(now);
}, 1000);
