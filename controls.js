import { random } from './pokemon.js';
import {
    $btnKick, $btnHeal, $btnStun,
    character, enemy, enemies,
    loadEnemy, disableButtons, addBattleLog, setEnemy,
} from './battle.js';

import { generateLog } from './logs.js';

let currentEnemyIndex = 0;

function withClickLimit(limit, btnName, handler) {
    let count = 0;
    return function (event) {
        count++;
        const remaining = limit - count;
        console.log(`${btnName}: натискань = ${count}, залишилось = ${remaining >= 0 ? remaining : 0}`);

        if (count >= limit) {
            event.currentTarget.disabled = true;
            event.currentTarget.isLimitedDisabled = true;
        }
        handler.call(this, event);
    };
}

$btnKick.addEventListener('click', withClickLimit(30, 'Kick', function() {
    disableButtons(true);
    const dmgCharacter = random(character.dmg);
    const enemyIsDead = enemy.changeHP(dmgCharacter);

    addBattleLog({
        firstPerson: character.name,
        secondPerson: enemy.name,
        dmg: dmgCharacter,
        remainingHP: enemy.damageHP,
        maxHP: enemy.defaultHP
    });

    if (enemyIsDead) {
        currentEnemyIndex++;
        if (currentEnemyIndex < enemies.length) {
            const newEnemy = enemies[currentEnemyIndex];
            addBattleLog({ firstPerson: enemy.name, customText: `${enemy.name} програв 🏆!` });
            setEnemy(newEnemy);
            loadEnemy(newEnemy);
        } else {
            disableButtons(true);
            return;
        }
    }

    setTimeout(() => {
        if (!enemy.isStunned) {
            const dmgEnemy = random(enemy.dmg);
            const characterIsDead = character.changeHP(dmgEnemy);

            addBattleLog({
                firstPerson: enemy.name,
                secondPerson: character.name,
                dmg: dmgEnemy,
                remainingHP: character.damageHP,
                maxHP: character.defaultHP
            });

            if (characterIsDead) {
                addBattleLog({
                    firstPerson: character.name,
                    customText: `${character.name} програв ☠`,
                    remainingHP: 0,
                    maxHP: character.defaultHP
                });
                disableButtons(true);
                return;
            };
        } else {
            addBattleLog({
                firstPerson: enemy.name,
                secondPerson: character.name,
                dmg: 0,
                remainingHP: enemy.damageHP,
                maxHP: enemy.defaultHP
            });
            enemy.isStunned = false;
        }
        disableButtons(false);
    }, 800);
}));

$btnHeal.addEventListener('click', withClickLimit(10, 'Heal', function() {
    disableButtons(true);
    const healChance = random(2);
    const healAmount = healChance === 1 ? Math.min(30, character.defaultHP - character.damageHP) : 0;

    if (healAmount > 0) {
        character.damageHP += healAmount;
        character.renderHP();
        addBattleLog({
            firstPerson: character.name,
            customText: `${character.name} відновив ${healAmount} HP`,
            remainingHP: character.damageHP,
            maxHP: character.defaultHP
        });
    } else {
        addBattleLog({
            firstPerson: character.name,
            customText: `${character.name} спробував відновити HP, але нічого не вийшло`,
            remainingHP: character.damageHP,
            maxHP: character.defaultHP
        });
    }

    setTimeout(() => {
        const dmgEnemy = random(enemy.dmg);
        const characterIsDead = character.changeHP(dmgEnemy);
        addBattleLog({
            firstPerson: enemy.name,
            secondPerson: character.name,
            dmg: dmgEnemy,
            remainingHP: character.damageHP,
            maxHP: character.defaultHP
        });
        if (characterIsDead) {
            addBattleLog({
                firstPerson: character.name,
                customText: `${character.name} програв ☠`,
                remainingHP: 0,
                maxHP: character.defaultHP
            });
            disableButtons(true);
            return;
        } else {
            addBattleLog({
                firstPerson: enemy.name,
                secondPerson: character.name,
                dmg: 0,
                remainingHP: enemy.damageHP,
                maxHP: enemy.defaultHP,
                customText: `${character.name} спробував підлікуватися і пропустив атаку!`
            });
            enemy.isStunned = false;
        }
        disableButtons(false);
    }, 800);
}));

$btnStun.addEventListener('click', withClickLimit(20, 'Stun', function() {
    disableButtons(true);
    const stunChance = random(2);
    if (stunChance === 1) {
        enemy.isStunned = true;
        addBattleLog({
            firstPerson: character.name,
            secondPerson: enemy.name,
            customText: `${character.name} оглушив ${enemy.name}!`,
            remainingHP: enemy.damageHP,
            maxHP: enemy.defaultHP
        });
    } else {
        addBattleLog({
            firstPerson: character.name,
            secondPerson: enemy.name,
            customText: `${character.name} промахнувся — ${enemy.name} уникнув оглушення`,
            remainingHP: enemy.damageHP,
            maxHP: enemy.defaultHP
        });
    }

    const dmgCharacter = random(character.dmg * 0.25);
    const enemyIsDead = enemy.changeHP(dmgCharacter);
    addBattleLog({
        firstPerson: character.name,
        secondPerson: enemy.name,
        dmg: dmgCharacter,
        remainingHP: enemy.damageHP,
        maxHP: enemy.defaultHP
    });

    if (enemyIsDead) {
        currentEnemyIndex++;
        if (currentEnemyIndex < enemies.length) {
            const newEnemy = enemies[currentEnemyIndex];
            addBattleLog({ firstPerson: enemy.name, customText: `${enemy.name} програв 🏆!` });
            setEnemy(newEnemy);
            loadEnemy(newEnemy);
        } else {
            disableButtons(true);
            return;
        }
    }

    setTimeout(() => {
        if (!enemy.isStunned) {
            const dmgEnemy = random(enemy.dmg);
            const characterIsDead = character.changeHP(dmgEnemy);
            addBattleLog({
                firstPerson: enemy.name,
                secondPerson: character.name,
                dmg: dmgEnemy,
                remainingHP: character.damageHP,
                maxHP: character.defaultHP
            });
            if (characterIsDead){
                addBattleLog({
                    firstPerson: character.name,
                    customText: `${character.name} програв ☠`,
                    remainingHP: 0,
                    maxHP: character.defaultHP
                });
                disableButtons(true);
                return;
            };
        } else {
            addBattleLog({
                firstPerson: enemy.name,
                secondPerson: character.name,
                dmg: 0,
                remainingHP: enemy.damageHP,
                maxHP: enemy.defaultHP,
                customText: `${character.name} був оглушений і пропустив атаку!`
            });
            enemy.isStunned = false;
        }
        disableButtons(false);
    }, 800);
}));

