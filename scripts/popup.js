const popupType = { IMAGE: 1, INFO: 2 };
let popupData = [];

async function getPopupData() {
  return fetch("popup.json?ver=1")
    .then((response) => response.json())
    .then((data) => {
      popupData = data;
    });
}

function buildTextPopup(popupInfo, parentDom) {
  // wrapper
  const wrapper = document.createElement("div");
  wrapper.id = "entry-animation-wrapper";

  // title
  const titleContainer = document.createElement("div");
  titleContainer.className = "popup-title-container";
  titleContainer.innerHTML = `<h2>${popupInfo.title}</h2>`;
  wrapper.appendChild(titleContainer);

  // card content
  const cardsContainer = document.createElement("div");
  cardsContainer.className = "cards-container";
  wrapper.appendChild(cardsContainer);

  popupInfo.contentAry.forEach((content, index) => {
    const div = document.createElement("div");
    let cardContent = "";
    div.className = "event-card";
    div.style.animationDelay = `${index * 0.1}s`; // 稍微加快動畫

    // build title
    cardContent = `<div class="event-header"> ${content.title}</div>`;
    // build content
    cardContent += `<div class="content-text">${content.text}</div>`;
    cardContent += `<div class="content-time">${content.time}</div>`;

    div.innerHTML = cardContent;
    cardsContainer.appendChild(div);
  });

  parentDom.appendChild(wrapper);
}

async function renderPopup() {
  await getPopupData();

  // popup wrapper
  const popupWrapp = document.createElement("div");
  popupWrapp.class = "popup-wrapper";

  for (const popupInfo of popupData) {
    // popup type: 2 -> 文字彈窗陣列
    if (popupInfo.type === popupType.INFO) {
      buildTextPopup(popupInfo, popupWrapp);
    }
  }

  document.body.appendChild(popupWrapp);
  document.body.classList.add("modal-open");
}

// 建立進場動畫卡片（一次性顯示）
function showIntroCards() {
  const introCards = [
    {
      date: "4/13",
      weekday: "(日)",
      title: "苗栗罷免宣講",
      location: "頭份市建國國小旁建國花市預訂地",
      time: "10:30~10:45",
    },
    {
      date: "4/13",
      weekday: "(日)",
      title: "板橋罷免宣講",
      location: "永豐公園活動中心",
      time: "13:30~14:00",
    },
    {
      date: "4/13",
      weekday: "(日)",
      title: "文山罷免宣講",
      location: "文山興隆公園",
      time: "15:00~15:30",
    },
    {
      date: "4/13",
      weekday: "(日)",
      title: "雙和罷免宣講",
      location: "仁愛公園仁愛永貞路口",
      time: "16:00~16:30",
    },
  ];

  const wrapper = document.createElement("div");
  wrapper.id = "entry-animation-wrapper";

  // 新增標題容器
  const titleContainer = document.createElement("div");
  titleContainer.className = "popup-title-container";
  titleContainer.innerHTML = "<h2>Puma沈伯洋週末宣講行程</h2>";
  wrapper.appendChild(titleContainer);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "cards-container";
  wrapper.appendChild(cardsContainer);

  const closeBtn = document.createElement("button");
  closeBtn.id = "close-entry-wrapper";
  closeBtn.innerHTML = "&times;";

  const closeWrapper = () => {
    wrapper.remove();
    closeBtn.remove();
    document.body.classList.remove("modal-open");
  };

  closeBtn.addEventListener("click", closeWrapper);

  wrapper.addEventListener("click", (e) => {
    if (
      e.target.id === "entry-animation-wrapper" ||
      e.target === cardsContainer
    ) {
      closeWrapper();
    }
  });

  document.body.appendChild(wrapper);
  document.body.appendChild(closeBtn);
  document.body.classList.add("modal-open");

  introCards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "event-card";
    div.style.animationDelay = `${index * 0.1}s`; // 稍微加快動畫
    div.innerHTML = `
            <div class="event-header">
                <div class="event-date">${card.date}</div>
                <div class="event-weekday">${card.weekday}</div>
                <div class="event-title">${card.title}</div>
            </div>
            <div class="event-location">${card.location}</div>
            <div class="event-time">${card.time}</div>
        `;
    cardsContainer.appendChild(div);
  });
}
document.addEventListener("DOMContentLoaded", renderPopup);
