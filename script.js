// Ability scores aur points system
let abilities = {
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8
};

let remainingPoints = 27;

const costTable = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9
};

// Modifier calculate karne ka helper
function getModifier(score) {
    return Math.floor((score - 10) / 2);
}

// Display update
function updateAllDisplays() {
    for (let ability in abilities) {
        const row = document.querySelector(`.ability-row[data-ability="${ability}"]`);
        if (!row) continue;

        const input = row.querySelector(".ability-input");
        const mod = row.querySelector(".modifier");
        const cost = row.querySelector(".cost");

        input.value = abilities[ability];
        mod.textContent = getModifier(abilities[ability]) >= 0 
            ? `+${getModifier(abilities[ability])}` 
            : getModifier(abilities[ability]);

        cost.textContent = `${costTable[abilities[ability]]} pts`;
    }

    document.getElementById("remainingPoints").textContent = remainingPoints;
}

// Ability increase
function increaseAbility(ability) {
    let current = abilities[ability];
    if (current >= 15) return;

    let cost = costTable[current + 1] - costTable[current];
    if (remainingPoints - cost < 0) return;

    abilities[ability]++;
    remainingPoints -= cost;
    updateAllDisplays();
}

// Ability decrease
function decreaseAbility(ability) {
    let current = abilities[ability];
    if (current <= 8) return;

    let refund = costTable[current] - costTable[current - 1];
    abilities[ability]--;
    remainingPoints += refund;
    updateAllDisplays();
}

// Reset sab kuch
function resetAll() {
    for (let ability in abilities) {
        abilities[ability] = 8;
    }
    remainingPoints = 27;
    updateAllDisplays();
}

// Random build
function randomBuild() {
    resetAll();
    let abilitiesList = Object.keys(abilities);

    while (remainingPoints > 0) {
        let rand = abilitiesList[Math.floor(Math.random() * abilitiesList.length)];
        let cost = costTable[abilities[rand] + 1] - costTable[abilities[rand]];
        if (abilities[rand] < 15 && remainingPoints - cost >= 0) {
            abilities[rand]++;
            remainingPoints -= cost;
        } else if (abilities.every(a => abilities[a] >= 15)) {
            break;
        }
    }
    updateAllDisplays();
}

// Page load hone ke baad init
document.addEventListener("DOMContentLoaded", () => {
    updateAllDisplays();
});

// Functions ko global banaya (HTML ke onclick ke liye)
window.increaseAbility = increaseAbility;
window.decreaseAbility = decreaseAbility;
window.resetAll = resetAll;
window.randomBuild = randomBuild;

console.log("script.js loaded ✅");
