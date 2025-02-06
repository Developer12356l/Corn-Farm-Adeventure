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

// Action Buttons
const buySeedBtn = document.getElementById('buySeed');
const plantSeedBtn = document.getElementById('plantSeed');
const harvestCropsBtn = document.getElementById('harvestCrops');
const sellCropsBtn = document.getElementById('sellCrops');
const buyStorageBtn = document.getElementById('buyStorage');
const buyHouseBtn = document.getElementById('buyHouse');
const buyTractorBtn = document.getElementById('buyTractor');
const takeLoanBtn = document.getElementById('takeLoan');
const repayLoanBtn = document.getElementById('repayLoan');
const decorateHouseBtn = document.getElementById('decorateHouse');
const resetGameBtn = document.getElementById('resetGame');

// Event Listeners
buySeedBtn.addEventListener('click', buySeed);
plantSeedBtn.addEventListener('click', plantSeed);
harvestCropsBtn.addEventListener('click', harvestCrops);
sellCropsBtn.addEventListener('click', sellCrops);
buyStorageBtn.addEventListener('click', buyStorage);
buyHouseBtn.addEventListener('click', buyHouse);
buyTractorBtn.addEventListener('click', buyTractor);
takeLoanBtn.addEventListener('click', takeLoan);
repayLoanBtn.addEventListener('click', repayLoan);
decorateHouseBtn.addEventListener('click', openDecorationModal);
resetGameBtn.addEventListener('click', resetGame);

// Functions
function updateDisplay() {
    moneyEl.textContent = money;
    seedsEl.textContent = seeds;
    storageEl.textContent = storage;
    cropsEl.textContent = crops;
    housesEl.textContent = houses;
    tractorsEl.textContent = tractors;
    loanEl.textContent = loan;

    // Enable Decorate House button if player owns at least one house
    decorateHouseBtn.disabled = houses === 0;
}

function buySeed() {
    if (money >= 10 && seeds < storage) {
        money -= 10;
        seeds += 1;
        messageEl.textContent = 'You bought a corn seed!';
    } else if (seeds >= storage) {
        messageEl.textContent = 'Your storage is full. Buy more storage to hold more seeds.';
    } else {
        messageEl.textContent = 'You need more money to buy seeds.';
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

function harvestCrops() {
    if (crops > 0) {
        messageEl.textContent = 'You harvested your crops!';
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
        messageEl.textContent = 'You bought a house! Time to decorate.';
    } else {
        messageEl.textContent = 'You need more money to buy a house.';
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

function takeLoan() {
    if (loan === 0 && money === 0) {
        loan += 500;
        money += 500;
        messageEl.textContent = 'You took a loan of $500.';
    } else if (loan > 0) {
        messageEl.textContent = 'You need to repay your existing loan first.';
    } else {
        messageEl.textContent = 'You can only take a loan when you have no money.';
    }
    updateDisplay();
}

function repayLoan() {
    if (loan > 0 && money >= loan) {
        money -= loan;
        loan = 0;
        messageEl.textContent = 'You repaid your loan!';
    } else if (loan === 0) {
        messageEl.textContent = 'You have no loan to repay.';
    } else {
        messageEl.textContent = 'You need more money to repay your loan.';
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

// Placeholder for house decoration function
function openDecorationModal() {
    alert('House decoration feature coming soon!');
}

// Initialize Game
updateDisplay();