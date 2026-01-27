let xp = 0;
let level = 1;
let isFocusing = false;
let intervalId = null;

const xpEl = document.getElementById('xp-count');
const levelEl = document.getElementById('level');
const progressBar = document.getElementById('xp-bar');
const btn = document.getElementById('btn-action');
const spriteContainer = document.querySelector('.sprite-container');

// Carregar dados salvos
chrome.storage.local.get(['xp', 'level'], (result) => {
    if (result.xp) xp = result.xp;
    if (result.level) level = result.level;
    updateUI();
});

btn.addEventListener('click', () => {
    if (!isFocusing) {
        startFocus();
    } else {
        stopFocus();
    }
});

function startFocus() {
    isFocusing = true;
    btn.textContent = "Parar e Descansar";
    spriteContainer.classList.add('active'); // "Acorda" o sprite
    
    // Ganha 5 XP a cada segundo (rápido para testar)
    intervalId = setInterval(() => {
        addXP(5);
    }, 1000);
}

function stopFocus() {
    isFocusing = false;
    btn.textContent = "Iniciar Foco";
    spriteContainer.classList.remove('active');
    clearInterval(intervalId);
}

function addXP(amount) {
    xp += amount;
    
    // Lógica de Level Up simples
    if (xp >= 100) {
        xp = 0;
        level++;
        alert("LEVEL UP! 🎉 O seu personagem ficou mais forte!");
    }
    
    saveGame();
    updateUI();
}

function updateUI() {
    xpEl.textContent = xp;
    levelEl.textContent = level;
    progressBar.value = xp;
}

function saveGame() {
    chrome.storage.local.set({ xp: xp, level: level });
}
