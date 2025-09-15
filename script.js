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

// Increase ability
function increaseAbility(ability) {
    let current = abilities[ability];
    if (current >= 15) return;

    const newScore = current + 1;
    const costDiff = costTable[newScore] - costTable[current];

    if (remainingPoints - costDiff >= 0) {
        abilities[ability] = newScore;
        remainingPoints -= costDiff;
        updateAllDisplays();
    }
}

// Decrease ability
function decreaseAbility(ability) {
    let current = abilities[ability];
    if (current <= 8) return;

    const newScore = current - 1;
    const costDiff = costTable[current] - costTable[newScore];

    abilities[ability] = newScore;
    remainingPoints += costDiff;
    updateAllDisplays();
}

// Reset all
function resetAll() {
    abilities = {
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8
    };
    remainingPoints = 27;
    updateAllDisplays();
}

// Random build
function randomBuild() {
    resetAll();
    const keys = Object.keys(abilities);
    let points = remainingPoints;

    while (points > 0) {
        const ability = keys[Math.floor(Math.random() * keys.length)];
        const current = abilities[ability];
        if (current < 15) {
            const newScore = current + 1;
            const costDiff = costTable[newScore] - costTable[current];
            if (points - costDiff >= 0) {
                abilities[ability] = newScore;
                points -= costDiff;
            } else {
                break;
            }
        }
    }
    remainingPoints = points;
    updateAllDisplays();
}

// Script load hone par initialize
document.addEventListener("DOMContentLoaded", () => {
    console.log("script.js loaded ✅");
    updateAllDisplays();
});
