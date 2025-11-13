export class Pokemon {
    constructor({ name, defaultHP, damageHP, dmg, level = 1, img, elHP, elProgressbar }) {
        Object.assign(this, { name, defaultHP, damageHP, dmg, level, img, elHP, elProgressbar });
        this.isStunned = false;
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife() {
        const { elHP, damageHP, defaultHP } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
    }

    renderProgressbarHP() {
        const { elProgressbar, damageHP, defaultHP } = this;
        elProgressbar.style.width = `${(damageHP / defaultHP) * 100}%`;
    }

    changeHP(count) {
        if (this.damageHP <= count) {
            this.damageHP = 0;
            this.renderHP();
            return true;
        }
        this.damageHP -= count;
        this.renderHP();
        return false;
    }

    resetHP() {
        this.damageHP = this.defaultHP;
        this.renderHP();
    }
}

export const getEl = (id) => document.getElementById(id);

export const random = (num) => Math.ceil(Math.random() * num);
