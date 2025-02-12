// Game State Variables
let money = 45;
let seeds = 0;
let storage = 9;
let crops = 0;
let houses = 0;
let tractors = 0;
let loan = 0;

// DOM Elements
const moneyEl = document.getElementById('money');
const seedsEl = document.getElementById('seeds');
const storageEl = document.getElementById('storage');
const cropsEl = document.getElementById('crops');
const housesEl = document.getElementById('houses');
const tractorsEl = document.getElementById('tractors');
const loanEl = document.getElementById('loan');
const messageEl = document.getElementById('message');

// Action Buttons and Inputs
const buySeedBtn = document.getElementById('buySeed');
const seedAmountInput = document.getElementById('seedAmount'); // New Input
const plantSeedBtn = document.getElementById('plantSeed');
const harvestCropsBtn = document.getElementById('harvestCrops');
const sellCropsBtn = document.getElementById('sellCrops');
const buyStorageBtn = document.getElementById('buyStorage');
const buyHouseBtn = document.getElementById('buyHouse');
const sellHouseBtn = document.getElementById('sellHouse');
const buyTractorBtn = document.getElementById('buyTractor');
const sellTractorBtn = document.getElementById('sellTractor');
const takeLoanBtn = document.getElementById('takeLoan');
const repayLoanBtn = document.getElementById('repayLoan');
const resetGameBtn = document.getElementById('resetGame');
const plantAllSeedsBtn = document.getElementById('plantAllSeeds'); // New Button

// Event Listeners
buySeedBtn.addEventListener('click', buySeed);
plantSeedBtn.addEventListener('click', plantSeed);
harvestCropsBtn.addEventListener('click', harvestCrops);
sellCropsBtn.addEventListener('click', sellCrops);
buyStorageBtn.addEventListener('click', buyStorage);
buyHouseBtn.addEventListener('click', buyHouse);
sellHouseBtn.addEventListener('click', sellHouse);
buyTractorBtn.addEventListener('click', buyTractor);
sellTractorBtn.addEventListener('click', sellTractor);
takeLoanBtn.addEventListener('click', takeLoan);
repayLoanBtn.addEventListener('click', repayLoan);
resetGameBtn.addEventListener('click', resetGame);
plantAllSeedsBtn.addEventListener('click', plantAllSeeds); // New Event Listener

// Functions
function updateDisplay() {
    moneyEl.textContent = money;
    seedsEl.textContent = seeds;
    storageEl.textContent = storage;
    cropsEl.textContent = crops;
    housesEl.textContent = houses;
    tractorsEl.textContent = tractors;
    loanEl.textContent = loan;
}

function buySeed() {
    const seedAmount = parseInt(seedAmountInput.value);

    if (seedAmount && seedAmount > 0) {
        const cost = seedAmount * 10;
        if (money >= cost && seeds + seedAmount <= storage) {
            money -= cost;
            seeds += seedAmount;
            messageEl.textContent = `You bought ${seedAmount} corn seeds!`;
        } else if (seeds + seedAmount > storage) {
            messageEl.textContent = 'Your storage is full. Buy more storage to hold more seeds.';
        } else {
            messageEl.textContent = 'You need more money to buy seeds.';
        }
    } else {
        messageEl.textContent = 'Please enter a valid seed amount.';
    }
    updateDisplay();
}

function plantSeed() {
    if (seeds > 0) {
        seeds -= 1;
        crops += 1;
        messageEl.textContent = 'You planted a seed. A corn stalk is sprouting!';
    } else {
        messageEl.textContent = 'You have no seeds to plant.';
    }
    updateDisplay();
}

function plantAllSeeds() {
    if (seeds > 0) {
        crops += seeds;
        seeds = 0;
        messageEl.textContent = 'You planted all your seeds. A field of corn is sprouting!';
    } else {
        messageEl.textContent = 'You have no seeds to plant.';
    }
    updateDisplay();
}

function harvestCrops() {
    if (crops > 0) {
        messageEl.textContent = 'You harvested your crops!';
        // Additional logic for harvesting can be added here
    } else {
        messageEl.textContent = 'No crops to harvest.';
    }
    updateDisplay();
}

function sellCrops() {
    if (crops > 0) {
        const earnings = crops * 15;
        money += earnings;
        messageEl.textContent = `You sold your crops for $${earnings}!`;
        crops = 0;
    } else {
        messageEl.textContent = 'You have no crops to sell.';
    }
    updateDisplay();
}

function buyStorage() {
    if (money >= 100) {
        money -= 100;
        storage += 9;
        messageEl.textContent = 'You bought more seed storage!';
    } else {
        messageEl.textContent = 'Not enough money to buy more storage.';
    }
    updateDisplay();
}

function buyHouse() {
    if (money >= 1000) {
        money -= 1000;
        houses += 1;
        messageEl.textContent = 'You bought a house!';
    } else {
        messageEl.textContent = 'You need more money to buy a house.';
    }
    updateDisplay();
}

function sellHouse() {
    if (houses > 0) {
        money += 800;
        houses -= 1;
        messageEl.textContent = 'You sold a house!';
    } else {
        messageEl.textContent = 'No houses to sell.';
    }
    updateDisplay();
}

function buyTractor() {
    if (money >= 4000) {
        money -= 4000;
        tractors += 1;
        messageEl.textContent = 'You bought a tractor! Farming just got easier.';
    } else {
        messageEl.textContent = 'You need more money to buy a tractor.';
    }
    updateDisplay();
}

function sellTractor() {
    if (tractors > 0) {
        money += 3200;
        tractors -= 1;
        messageEl.textContent = 'You sold a tractor!';
    } else {
        messageEl.textContent = 'No tractors to sell.';
    }
    updateDisplay();
}

function takeLoan() {
    const loanAmount = parseInt(document.getElementById('loanAmount').value);

    if (loanAmount && loanAmount > 0 && loan === 0) {
        loan += loanAmount;
        money += loanAmount;
        messageEl.textContent = `You took a loan of $${loanAmount}.`;
    } else if (loan > 0) {
        messageEl.textContent = 'You already have an outstanding loan. Repay it first before taking a new one.';
    } else {
        messageEl.textContent = 'Please enter a valid loan amount.';
    }
    updateDisplay();
}

function repayLoan() {
    if (loan !== 0) {
        if (money >= Math.abs(loan)) {
            money -= Math.abs(loan);
            loan = 0;
            messageEl.textContent = 'You repaid your loan!';
        } else {
            loan -= money;
            money = 0;
            messageEl.textContent = 'You repaid part of your loan, but still have debt.';
        }
    } else {
        messageEl.textContent = 'You have no loan to repay.';
    }
    updateDisplay();
}

function resetGame() {
    if (confirm('Are you sure you want to reset your farm?')) {
        money = 45;
        seeds = 0;
        storage = 9;
        crops = 0;
        houses = 0;
        tractors = 0;
        loan = 0;
        messageEl.textContent = 'Welcome back to your fresh farm!';
        updateDisplay();
    }
}

// Initialize Game
updateDisplay();
