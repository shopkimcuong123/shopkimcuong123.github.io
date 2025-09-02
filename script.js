let diamond = 0;
let gunLevel = 1;

const diamondDisplay = document.getElementById("diamond");
const btnAddDiamond = document.getElementById("btnAddDiamond");
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const wheelResult = document.getElementById("wheelResult");

const boxButtons = document.querySelectorAll(".buy-box");
const boxResult = document.getElementById("boxResult");

const gunLevelDisplay = document.getElementById("gunLevel");
const upgradeGunBtn = document.getElementById("upgradeGunBtn");
const upgradeResult = document.getElementById("upgradeResult");

// Load from localStorage
function loadData() {
  diamond = parseInt(localStorage.getItem("diamond")) || 0;
  gunLevel = parseInt(localStorage.getItem("gunLevel")) || 1;
  diamondDisplay.textContent = diamond;
  gunLevelDisplay.textContent = gunLevel;
}

function saveData() {
  localStorage.setItem("diamond", diamond);
  localStorage.setItem("gunLevel", gunLevel);
}

// Add diamond
btnAddDiamond.onclick = () => {
  diamond += 1000;
  diamondDisplay.textContent = diamond;
  saveData();
  alert("Bạn đã nạp thành công 1000 kim cương ảo!");
};

// Wheel spin logic
const wheelPrizes = [
  { name: "500 KC", value: 500 },
  { name: "1000 KC", value: 1000 },
  { name: "2000 KC", value: 2000 },
  { name: "Hòm Thường", value: "box_normal" },
  { name: "Hòm VIP", value: "box_vip" },
  { name: "Skin Đặc Biệt", value: "skin_special" },
];

spinBtn.onclick = () => {
  spinBtn.disabled = true;
  wheelResult.textContent = "Đang quay...";
  let spins = Math.floor(Math.random() * 4) + 4; // quay từ 4 đến 7 vòng
  let prizeIndex = Math.floor(Math.random() * wheelPrizes.length);

  // Xoay wheel
  let deg = 360 * spins + prizeIndex * (360 / wheelPrizes.length);
  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${deg}deg)`;

  setTimeout(() => {
    spinBtn.disabled = false;
    wheelResult.textContent = `Bạn trúng: ${wheelPrizes[prizeIndex].name}!`;

    // Xử lý phần thưởng
    let prize = wheelPrizes[prizeIndex].value;
    if (typeof prize === "number") {
      diamond += prize;
      diamondDisplay.textContent = diamond;
      saveData();
    } else if (prize === "box_normal") {
      boxResult.textContent = "Bạn nhận được Hòm Thường!";
    } else if (prize === "box_vip") {
      boxResult.textContent = "Bạn nhận được Hòm VIP!";
    } else if (prize === "skin_special") {
      alert("Bạn nhận được Skin Đặc Biệt ảo!");
    }
  }, 4000);
};

// Buy boxes
boxButtons.forEach((btn) => {
  btn.onclick = () => {
    let cost = parseInt(btn.getAttribute("data-cost"));
    let name = btn.getAttribute("data-name");
    if (diamond >= cost) {
      diamond -= cost;
      diamondDisplay.textContent = diamond;
      boxResult.textContent = `Bạn đã mua thành công ${name}`;
      saveData();
    } else {
      boxResult.textContent = "Kim cương không đủ để mua.";
    }
  };
});

// Upgrade gun
upgradeGunBtn.onclick = () => {
  if (diamond >= 1000) {
    if (gunLevel < 7) {
      diamond -= 1000;
      gunLevel++;
      diamondDisplay.textContent = diamond;
      gunLevelDisplay.textContent = gunLevel;
      upgradeResult.textContent = `Nâng cấp thành công lên cấp ${gunLevel}!`;
      saveData();
    } else {
      upgradeResult.textContent = "Súng đã đạt cấp tối đa.";
    }
  } else {
    upgradeResult.textContent = "Kim cương không đủ để nâng cấp.";
  }
};

// Initialize
loadData();
