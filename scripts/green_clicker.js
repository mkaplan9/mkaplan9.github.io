// Green Energy Clicker Game
class GreenClicker {
  constructor() {
    this.energy = 0;
    this.energyPerClick = 1;
    this.energyPerSecond = 0;
    this.upgrades = [
      {
        id: 'solar',
        name: 'Solar Panel',
        cost: 15,
        owned: 0,
        energyPerSecond: 0.5,
        description: 'Generates 0.5 energy per second'
      },
      {
        id: 'wind',
        name: 'Wind Turbine',
        cost: 100,
        owned: 0,
        energyPerSecond: 2,
        description: 'Generates 2 energy per second'
      },
      {
        id: 'geothermal',
        name: 'Geothermal Plant',
        cost: 500,
        owned: 0,
        energyPerSecond: 10,
        description: 'Generates 10 energy per second'
      },
      {
        id: 'hydro',
        name: 'Hydroelectric Dam',
        cost: 2000,
        owned: 0,
        energyPerSecond: 50,
        description: 'Generates 50 energy per second'
      },
      {
        id: 'nuclear',
        name: 'Nuclear Reactor',
        cost: 10000,
        owned: 0,
        energyPerSecond: 250,
        description: 'Generates 250 energy per second'
      }
    ];
    
    this.init();
  }

  init() {
    this.loadGame();
    this.setupEventListeners();
    this.startGameLoop();
    this.updateDisplay();
  }

  setupEventListeners() {
    const clickButton = document.getElementById('clickButton');
    if (clickButton) {
      clickButton.addEventListener('click', () => this.click());
    }

    // Setup upgrade buttons
    this.upgrades.forEach(upgrade => {
      const button = document.getElementById(`buy-${upgrade.id}`);
      if (button) {
        button.addEventListener('click', () => this.buyUpgrade(upgrade.id));
      }
    });
  }

  click() {
    this.energy += this.energyPerClick;
    this.updateDisplay();
    this.saveGame();
    
    // Visual feedback
    const button = document.getElementById('clickButton');
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 100);
    }
  }

  buyUpgrade(upgradeId) {
    const upgrade = this.upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;

    if (this.energy >= upgrade.cost) {
      this.energy -= upgrade.cost;
      upgrade.owned++;
      upgrade.cost = Math.floor(upgrade.cost * 1.15); // Cost increases by 15% each purchase
      
      // Recalculate energy per second
      this.energyPerSecond = this.upgrades.reduce((total, u) => {
        return total + (u.owned * u.energyPerSecond);
      }, 0);
      
      this.updateDisplay();
      this.saveGame();
    }
  }

  updateDisplay() {
    // Update energy display
    const energyDisplay = document.getElementById('energyDisplay');
    if (energyDisplay) {
      energyDisplay.textContent = this.formatNumber(this.energy);
    }

    // Update energy per second display
    const epsDisplay = document.getElementById('energyPerSecond');
    if (epsDisplay) {
      epsDisplay.textContent = `+${this.formatNumber(this.energyPerSecond)}/sec`;
    }

    // Update upgrade buttons
    this.upgrades.forEach(upgrade => {
      const button = document.getElementById(`buy-${upgrade.id}`);
      const costDisplay = document.getElementById(`cost-${upgrade.id}`);
      const ownedDisplay = document.getElementById(`owned-${upgrade.id}`);
      
      if (button) {
        button.disabled = this.energy < upgrade.cost;
        button.classList.toggle('disabled', this.energy < upgrade.cost);
      }
      
      if (costDisplay) {
        costDisplay.textContent = this.formatNumber(upgrade.cost);
      }
      
      if (ownedDisplay) {
        ownedDisplay.textContent = upgrade.owned;
      }
    });
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return Math.floor(num).toLocaleString();
  }

  startGameLoop() {
    setInterval(() => {
      this.energy += this.energyPerSecond / 10; // Update 10 times per second for smoothness
      this.updateDisplay();
      this.saveGame();
    }, 100);
  }

  saveGame() {
    const gameState = {
      energy: this.energy,
      upgrades: this.upgrades.map(u => ({
        id: u.id,
        owned: u.owned,
        cost: u.cost
      }))
    };
    localStorage.setItem('greenClicker', JSON.stringify(gameState));
  }

  loadGame() {
    const saved = localStorage.getItem('greenClicker');
    if (saved) {
      try {
        const gameState = JSON.parse(saved);
        this.energy = gameState.energy || 0;
        
        gameState.upgrades.forEach(savedUpgrade => {
          const upgrade = this.upgrades.find(u => u.id === savedUpgrade.id);
          if (upgrade) {
            upgrade.owned = savedUpgrade.owned || 0;
            upgrade.cost = savedUpgrade.cost || upgrade.cost;
          }
        });
        
        // Recalculate energy per second
        this.energyPerSecond = this.upgrades.reduce((total, u) => {
          return total + (u.owned * u.energyPerSecond);
        }, 0);
      } catch (e) {
        console.error('Error loading game:', e);
      }
    }
  }
}

// Don't auto-initialize - let the HTML page control initialization
// This allows upgrade cards to be created first
if (!window.preventAutoInit) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.game = new GreenClicker();
    });
  } else {
    window.game = new GreenClicker();
  }
}

