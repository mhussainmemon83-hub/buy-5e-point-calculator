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
            : getModifier(abilities[abilit]()
