// Point Buy Calculator Logic
const POINT_COSTS = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

const TOTAL_POINTS = 27;

const RANDOM_BUILDS = [
    { strength: 12, dexterity: 12, constitution: 12, intelligence: 12, wisdom: 12, charisma: 11 },
    { strength: 15, dexterity: 13, constitution: 14, intelligence: 8, wisdom: 10, charisma: 10 },
    { strength: 8, dexterity: 15, constitution: 13, intelligence: 12, wisdom: 12, charisma: 10 },
    { strength: 8, dexterity: 12, constitution: 14, intelligence: 15, wisdom: 13, charisma: 8 },
    { strength: 10, dexterity: 10, constitution: 13, intelligence: 8, wisdom: 15, charisma: 12 },
    { strength: 14, dexterity: 8, constitution: 13, intelligence: 10, wisdom: 10, charisma: 15 },
    { strength: 12, dexterity: 15, constitution: 13, intelligence: 8, wisdom: 14, charisma: 8 }
];

// Current ability scores
let abilities = {
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8
};

// Calculate ability modifier
function getModifier(score) {
    return Math.floor((score - 10) / 2);
}

// Calculate remaining points
function getRemainingPoints() {
    let usedPoints = 0;
    Object.values(abilities).forEach(value => {
        usedPoints += POINT_COSTS[value];
    });
    return TOTAL_POINTS - usedPoints;
}

// Check if ability can be increased
function canIncrease(ability) {
    const currentScore = abilities[ability];
    if (currentScore >= 15) return false;
    const nextCost = POINT_COSTS[currentScore + 1] - POINT_COSTS[currentScore];
    return getRemainingPoints() >= nextCost;
}

// Check if ability can be decreased
function canDecrease(ability) {
    return abilities[ability] > 8;
}

// Update the display for a specific ability
function updateAbilityDisplay(ability) {
    const row = document.querySelector(`[data-ability="${ability}"]`);
    const input = row.querySelector('.ability-input');
    const modifier = row.querySelector('.modifier');
    const cost = row.querySelector('.cost');
    const decreaseBtn = row.querySelector('.btn-decrease');
    const increaseBtn = row.querySelector('.btn-increase');
    
    const score = abilities[ability];
    const mod = getModifier(score);
    const pointCost = POINT_COSTS[score];
    
    input.value = score;
    modifier.textContent = mod >= 0 ? `+${mod}` : `${mod}`;
    cost.textContent = `${pointCost} pts`;
    
    // Update button states
    decreaseBtn.disabled = !canDecrease(ability);
    increaseBtn.disabled = !canIncrease(ability);
}

// Update remaining points display
function updateRemainingPoints() {
    const remainingPoints = getRemainingPoints();
    const pointsElement = document.getElementById('remainingPoints');
    const counterElement = document.querySelector('.points-counter');
    
    pointsElement.textContent = remainingPoints;
    
    if (remainingPoints < 0) {
        counterElement.classList.add('negative');
    } else {
        counterElement.classList.remove('negative');
    }
}

// Update all displays
function updateAllDisplays() {
    Object.keys(abilities).forEach(ability => {
        updateAbilityDisplay(ability);
    });
    updateRemainingPoints();
}

// Logic functions
function increaseAbility(ability) {
    if (canIncrease(ability)) {
        abilities[ability]++;
        updateAllDisplays();
        highlightChanges(ability);
    }
}

function decreaseAbility(ability) {
    if (canDecrease(ability)) {
        abilities[ability]--;
        updateAllDisplays();
        highlightChanges(ability);
    }
}

function resetAll() {
    abilities = {
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8
    };
    updateAllDisplays();
}

function randomBuild() {
    const randomIndex = Math.floor(Math.random() * RANDOM_BUILDS.length);
    abilities = { ...RANDOM_BUILDS[randomIndex] };
    updateAllDisplays();
}

// Visual feedback
function highlightChanges(ability) {
    const row = document.querySelector(`[data-ability="${ability}"]`);
    row.style.backgroundColor = 'rgba(255, 107, 53, 0.2)';
    setTimeout(() => {
        row.style.backgroundColor = '';
    }, 300);
}

// Tooltips
function addTooltips() {
    const tooltips = {
        'strength': 'Physical power, affects melee attacks and carrying capacity',
        'dexterity': 'Agility and reflexes, affects AC, initiative, and ranged attacks',
        'constitution': 'Health and stamina, affects hit points and concentration',
        'intelligence': 'Reasoning ability, affects spell attacks for wizards',
        'wisdom': 'Awareness and insight, affects spell attacks for clerics and druids',
        'charisma': 'Force of personality, affects spell attacks for sorcerers and warlocks'
    };
    
    Object.keys(tooltips).forEach(ability => {
        const row = document.querySelector(`[data-ability="${ability}"]`);
        const label = row.querySelector('.ability-label');
        label.title = tooltips[ability];
    });
}

// Initialize the calculator when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateAllDisplays();
    addTooltips();

    // Disable manual input
    document.querySelectorAll('.ability-input').forEach(input => {
        input.addEventListener('keydown', e => e.preventDefault());
    });

    // Hover effects
    document.querySelectorAll('.ability-row').forEach(row => {
        row.addEventListener('mouseenter', () => row.style.transform = 'translateX(5px)');
        row.addEventListener('mouseleave', () => row.style.transform = 'translateX(0)');
    });

    // Click animation
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });

    // Attach ability buttons
    document.querySelectorAll('.btn-increase').forEach(button => {
        button.addEventListener('click', function() {
            const ability = this.closest('.ability-row').dataset.ability;
            increaseAbility(ability);
        });
    });

    document.querySelectorAll('.btn-decrease').forEach(button => {
        button.addEventListener('click', function() {
            const ability = this.closest('.ability-row').dataset.ability;
            decreaseAbility(ability);
        });
    });

    // Control buttons
    document.getElementById('resetBtn').addEventListener('click', resetAll);
    document.getElementById('randomBtn').addEventListener('click', randomBuild);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        resetAll();
    }
    if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        randomBuild();
    }
});
