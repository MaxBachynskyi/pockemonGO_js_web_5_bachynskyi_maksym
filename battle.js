import { Pokemon, getEl, random } from './pokemon.js';
import { generateLog } from './logs.js';

export const $logs = getEl('logs');
export const $btnKick = getEl('btn-kick');
export const $btnHeal = getEl('btn-heal');
export const $btnStun = getEl('btn-stun');

export const character = new Pokemon({
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    dmg: 25,
    elHP: getEl('health-character'),
    elProgressbar: getEl('progressbar-character')
});

export const enemies = [
    new Pokemon({
        name: 'Charmander',
        defaultHP: 100,
        damageHP: 100,
        dmg: 20,
        level: 1,
        img: './assets/charmander_card_logo.png',
        elHP: getEl('health-enemy'),
        elProgressbar: getEl('progressbar-enemy')
    }),
    new Pokemon({
        name: 'Bisasam',
        defaultHP: 150,
        damageHP: 150,
        dmg: 5,
        level: 2,
        img: './assets/bisasam_card_logo.png',
        elHP: getEl('health-enemy'),
        elProgressbar: getEl('progressbar-enemy')
    })
];

export let currentEnemyIndex = 0;
export let enemy = enemies[currentEnemyIndex];

const enemyName = getEl('name-enemy');
const enemyImg = document.querySelector('.enemy .sprite');
const enemyLvl = document.querySelector('.enemy .lvl');

export function loadEnemy(pokemon) {
    const { name, img, level } = pokemon;
    enemyName.innerText = name;
    enemyImg.src = img;
    enemyLvl.innerText = `Lv. ${level}`;
    pokemon.resetHP();
}

export function disableButtons(state) {
    [$btnKick, $btnHeal, $btnStun].forEach(btn => {
        if (!btn.isLimitedDisabled) btn.disabled = state;
    });
}

export function addBattleLog({ firstPerson, secondPerson = '', dmg = 0, remainingHP, maxHP, customText = null }) {
    const logEntry = document.createElement('div');
    logEntry.style.marginBottom = '5px';

    const story = customText
        ? customText
        : (secondPerson ? generateLog(firstPerson, secondPerson) : `${firstPerson} програв`);

    logEntry.innerHTML = `
        <p>${story}</p>
        <small>Втрати: ${dmg > 0 ? dmg : 0} HP, залишилось: ${remainingHP} / ${maxHP}</small>
    `;
    $logs.prepend(logEntry);
}

export function setEnemy(newEnemy) {
    enemy = newEnemy;
}

export function initBattle() {
    console.log('Start Game!');
    character.renderHP();
    loadEnemy(enemy);
}
