const DOWNLOAD_BASE = "/updates/";
const PAGE_SIZE = 6;

const releases = [
  {
    version: "0.1.20",
    releasedAt: "2026-06-02T13:59:05+09:00",
    downloads: {
      mac: "OS Hero-0.1.20-arm64.dmg",
      win: "OS Hero Setup 0.1.20.exe"
    },
    copy: {
      en: {
        summary: "Added the first OS Gold MVP with runtime rewards and Inventory display.",
        notes: [
          "OS Gold now accumulates locally while OS Hero is running: 1 gold per 5 minutes.",
          "Inventory shows the current OS Gold balance at the top of the window.",
          "Gold is saved in a local wallet file and capped at 999,999,999 gold."
        ]
      },
      ko: {
        summary: "실행 시간 기반 OS 골드 1차 기능과 인벤토리 표시를 추가했습니다.",
        notes: [
          "OS Hero가 실행 중인 시간을 기준으로 5분당 1골드가 로컬에 적립됩니다.",
          "인벤토리 화면 상단에서 현재 OS 골드 보유량을 숫자로 확인할 수 있습니다.",
          "골드는 로컬 지갑 파일에 저장되며 최대 999,999,999골드까지 보유할 수 있습니다."
        ]
      },
      zh: {
        summary: "新增 OS 金币第一版：按运行时间奖励并在背包显示。",
        notes: [
          "OS Hero 运行时会在本地累积 OS 金币：每 5 分钟 1 金币。",
          "背包窗口顶部会显示当前 OS 金币余额。",
          "金币保存在本地钱包文件中，上限为 999,999,999。"
        ]
      }
    }
  },
  {
    version: "0.1.19",
    releasedAt: "2026-06-02T00:32:12+09:00",
    downloads: {
      mac: "OS Hero-0.1.19-arm64.dmg",
      win: "OS Hero Setup 0.1.19.exe"
    },
    copy: {
      en: {
        summary: "Fixed Inventory scrolling so item selection no longer jumps back to the top.",
        notes: [
          "Inventory remembers the current item list scroll position before re-rendering a selection.",
          "Selecting items, switching tabs, and equipping items restores the relevant list position.",
          "This reduces repeated scrolling fatigue when browsing large RPG item lists."
        ]
      },
      ko: {
        summary: "인벤토리 아이템 선택 시 스크롤이 맨 위로 돌아가는 문제를 수정했습니다.",
        notes: [
          "Inventory가 선택 재렌더 전에 현재 아이템 목록 스크롤 위치를 기억합니다.",
          "아이템 선택, 탭 변경, 착용 후에도 해당 목록 위치를 복원합니다.",
          "RPG 아이템 목록을 탐색할 때 반복해서 다시 스크롤해야 하는 피로를 줄였습니다."
        ]
      },
      zh: {
        summary: "修复背包选择物品时滚动条跳回顶部的问题。",
        notes: [
          "背包在选择重新渲染前会记住当前物品列表的滚动位置。",
          "选择物品、切换标签和装备物品后会恢复对应列表位置。",
          "浏览较长的 RPG 物品列表时，不再需要反复重新滚动。"
        ]
      }
    }
  },
  {
    version: "0.1.18",
    releasedAt: "2026-05-31T23:45:13+09:00",
    downloads: {
      mac: "OS Hero-0.1.18-arm64.dmg",
      win: "OS Hero Setup 0.1.18.exe"
    },
    copy: {
      en: {
        summary: "Fixed the Inventory window width so it stays stable while selecting items.",
        notes: [
          "Inventory item selection no longer triggers automatic window resizing.",
          "Switching Inventory tabs and equipping items keeps the window width fixed.",
          "Other app windows keep their existing content fitting behavior."
        ]
      },
      ko: {
        summary: "인벤토리에서 아이템을 선택할 때 창 폭이 줄어드는 문제를 수정했습니다.",
        notes: [
          "Inventory 아이템 선택 시 창 크기 자동 맞춤을 실행하지 않도록 수정했습니다.",
          "Inventory 탭 변경과 착용/해제를 반복해도 창 폭이 고정됩니다.",
          "다른 앱 창의 기존 콘텐츠 맞춤 동작은 유지했습니다."
        ]
      },
      zh: {
        summary: "修复背包中选择物品时窗口宽度变小的问题。",
        notes: [
          "选择背包物品时不再触发自动窗口缩放。",
          "切换背包标签和装备物品时窗口宽度保持固定。",
          "其他应用窗口保留原有的内容适配行为。"
        ]
      }
    }
  }
];

const messages = {
  en: {
    brand: "OS Hero",
    "nav.install": "Install",
    "nav.contact": "Contact",
    "nav.language": "Language",
    "home.eyebrow": "Pixel companion for your desktop",
    "home.title": "OS Hero",
    "home.lead": "Adventure with a small companion that lives in your menu bar or system tray. OS Hero reacts to your CPU activity and stays ready while you work.",
    "home.downloadMac": "Download for macOS",
    "home.downloadWin": "Download for Windows",
    "home.downloadBoth": "Choose a download",
    "home.latestVersion": "Latest version: {version}.",
    "home.archive": "View version archive",
    "home.menuEyebrow": "Tray menu guide",
    "home.menuTitle": "Everything starts from the OS Hero icon",
    "home.menuLead": "OS Hero stays out of the way until you open the menu bar or system tray icon. These are the main places you will use after installing the app.",
    "install.title": "Install",
    "install.description": "Download the latest OS Hero release or browse previous versions. The latest buttons always point to the newest published build.",
    "install.version": "Version",
    "install.date": "Updated",
    "install.summary": "Patch summary",
    "install.download": "Download",
    "install.mac": "macOS",
    "install.win": "Windows",
    "install.previous": "Previous",
    "install.next": "Next",
    "detail.back": "Back to install",
    "detail.title": "Version {version}",
    "detail.updated": "Updated {date}",
    "detail.downloads": "Downloads",
    "detail.notes": "Patch notes",
    "contact.title": "Contact",
    "contact.description": "The same developer and copyright information shown inside the OS Hero app.",
    "contact.developer": "Developer",
    "contact.contact": "Contact",
    "contact.copyright": "Copyright",
    "notFound.title": "Page not found",
    "notFound.action": "Go home"
  },
  ko: {
    brand: "OS 히어로",
    "nav.install": "설치",
    "nav.contact": "문의",
    "nav.language": "언어",
    "home.eyebrow": "데스크톱을 위한 픽셀 동반자",
    "home.title": "OS 히어로",
    "home.lead": "PC에서 나와 함께 모험할 작은 동반자를 만나보세요. OS Hero는 메뉴 막대와 시스템 트레이에 머물며 CPU 상태에 맞춰 움직입니다.",
    "home.downloadMac": "macOS용 다운로드",
    "home.downloadWin": "Windows용 다운로드",
    "home.downloadBoth": "다운로드 선택",
    "home.latestVersion": "최신 버전: {version}.",
    "home.archive": "버전 아카이브 보기",
    "home.menuEyebrow": "트레이 메뉴 안내",
    "home.menuTitle": "모든 기능은 OS Hero 아이콘에서 시작됩니다",
    "home.menuLead": "OS Hero는 메뉴 막대 또는 시스템 트레이에 조용히 머물다가, 아이콘을 클릭했을 때 필요한 화면을 열어 줍니다. 설치 후 가장 자주 쓰게 될 메뉴는 아래와 같습니다.",
    "install.title": "설치",
    "install.description": "최신 OS Hero 릴리스를 받거나 이전 버전을 확인하세요. 최신 다운로드 버튼은 항상 가장 최근 배포 파일을 가리킵니다.",
    "install.version": "버전",
    "install.date": "업데이트 일시",
    "install.summary": "패치노트 요약",
    "install.download": "다운로드",
    "install.mac": "macOS",
    "install.win": "Windows",
    "install.previous": "이전",
    "install.next": "다음",
    "detail.back": "설치로 돌아가기",
    "detail.title": "버전 {version}",
    "detail.updated": "{date} 업데이트",
    "detail.downloads": "다운로드",
    "detail.notes": "패치 내용",
    "contact.title": "문의",
    "contact.description": "OS Hero 앱 정보에 표시되는 개발자 및 저작권 정보입니다.",
    "contact.developer": "개발자",
    "contact.contact": "이메일",
    "contact.copyright": "저작권",
    "notFound.title": "페이지를 찾을 수 없습니다",
    "notFound.action": "홈으로 이동"
  },
  zh: {
    brand: "OS 英雄",
    "nav.install": "安装",
    "nav.contact": "联系",
    "nav.language": "语言",
    "home.eyebrow": "桌面上的像素伙伴",
    "home.title": "OS 英雄",
    "home.lead": "让一位小小的像素伙伴陪你在电脑上一起冒险。OS Hero 常驻菜单栏或系统托盘，并会随着 CPU 状态改变动作节奏。",
    "home.downloadMac": "下载 macOS 版",
    "home.downloadWin": "下载 Windows 版",
    "home.downloadBoth": "选择下载",
    "home.latestVersion": "最新版本：{version}。",
    "home.archive": "查看版本归档",
    "home.menuEyebrow": "托盘菜单指南",
    "home.menuTitle": "所有功能都从 OS Hero 图标开始",
    "home.menuLead": "OS Hero 会安静地停留在菜单栏或系统托盘中。点击图标后，你可以从这些菜单进入主要功能。",
    "install.title": "安装",
    "install.description": "下载最新 OS Hero 版本，或浏览历史版本。最新下载按钮会始终指向当前发布的最新版。",
    "install.version": "版本",
    "install.date": "更新时间",
    "install.summary": "更新摘要",
    "install.download": "下载",
    "install.mac": "macOS",
    "install.win": "Windows",
    "install.previous": "上一页",
    "install.next": "下一页",
    "detail.back": "返回安装页",
    "detail.title": "版本 {version}",
    "detail.updated": "更新时间 {date}",
    "detail.downloads": "下载",
    "detail.notes": "更新内容",
    "contact.title": "联系",
    "contact.description": "与 OS Hero 应用信息中显示的开发者和版权信息一致。",
    "contact.developer": "开发者",
    "contact.contact": "邮箱",
    "contact.copyright": "版权",
    "notFound.title": "页面未找到",
    "notFound.action": "返回首页"
  }
};

const menuGuides = {
  en: [
    {
      name: "Hero",
      body: "Open the character editor. Change gender, eye type, and body color, then save to update the menu bar or tray icon."
    },
    {
      name: "Inventory",
      body: "Dress the hero with one head item, one outfit, and one tool. Selecting an item previews it before you equip it."
    },
    {
      name: "Quests",
      body: "Assign missions to your hero. Use adventure logs for notes, bookmark records for web links, and reminders for OS notifications."
    },
    {
      name: "Settings",
      body: "Control launch at login, check for new versions, and review app version, developer, contact, and copyright details."
    },
    {
      name: "Language",
      body: "Switch the entire app between English, Korean, and Simplified Chinese. The selected language is saved locally."
    },
    {
      name: "About / Quit",
      body: "Open the app information window or fully quit OS Hero. Quitting removes the menu bar or tray icon."
    }
  ],
  ko: [
    {
      name: "히어로",
      body: "캐릭터 편집 화면을 엽니다. 성별, 눈 타입, 바디 색상을 바꾸고 저장하면 메뉴 막대 또는 트레이 아이콘에 바로 반영됩니다."
    },
    {
      name: "인벤토리",
      body: "머리, 의류, 도구 아이템을 각각 하나씩 착용합니다. 아이템을 선택하면 저장 전 우측 미리보기에서 먼저 확인할 수 있습니다."
    },
    {
      name: "퀘스트",
      body: "히어로에게 임무를 부여합니다. 모험 일지는 메모, 북마크 기록은 웹 링크, 리마인더는 OS 알림으로 사용할 수 있습니다."
    },
    {
      name: "환경설정",
      body: "로그인 시 자동 실행을 켜고 끄거나, 새 버전을 확인하고, 앱 버전과 개발자 정보를 확인합니다."
    },
    {
      name: "Language",
      body: "앱 전체 언어를 영어, 한국어, 중국어 간체 중 하나로 바꿉니다. 선택한 언어는 로컬에 저장됩니다."
    },
    {
      name: "앱 정보 / 종료",
      body: "앱 정보 창을 열거나 OS Hero를 완전히 종료합니다. 종료하면 메뉴 막대 또는 트레이 아이콘도 사라집니다."
    }
  ],
  zh: [
    {
      name: "英雄",
      body: "打开角色编辑器。修改性别、眼睛类型和身体颜色，保存后会更新菜单栏或托盘图标。"
    },
    {
      name: "背包",
      body: "为英雄装备一个头部物品、一套服装和一个工具。选择物品后，可先在预览中确认效果。"
    },
    {
      name: "任务",
      body: "给英雄分配任务。冒险日志用于记录笔记，书签记录用于保存网页链接，提醒用于发送系统通知。"
    },
    {
      name: "设置",
      body: "开关登录时启动，检查新版本，并查看应用版本、开发者、联系方式和版权信息。"
    },
    {
      name: "Language",
      body: "在英语、韩语和简体中文之间切换整个应用语言。选择结果会保存在本地。"
    },
    {
      name: "关于 / 退出",
      body: "打开应用信息窗口，或完全退出 OS Hero。退出后菜单栏或托盘图标也会移除。"
    }
  ]
};

let language = getInitialLanguage();
let page = 1;

function getInitialLanguage() {
  const saved = window.localStorage.getItem("osHeroLanguage");
  if (saved && messages[saved]) {
    return saved;
  }

  const languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const candidate of languages) {
    const normalized = normalizeLanguage(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return "en";
}

function normalizeLanguage(value) {
  const lower = String(value || "").toLowerCase();
  if (lower.startsWith("ko")) {
    return "ko";
  }
  if (lower.startsWith("zh-cn") || lower.startsWith("zh-hans") || lower === "zh" || lower.startsWith("zh-sg")) {
    return "zh";
  }
  if (lower.startsWith("en")) {
    return "en";
  }
  return null;
}

function t(key, replacements = {}) {
  let text = (messages[language] && messages[language][key]) || messages.en[key] || key;
  for (const [name, value] of Object.entries(replacements)) {
    text = text.replace(`{${name}}`, value);
  }
  return text;
}

function getReleaseCopy(release) {
  return release.copy[language] || release.copy.en;
}

function getMenuGuideItems() {
  return menuGuides[language] || menuGuides.en;
}

function detectPlatform() {
  const platform = `${navigator.userAgentData && navigator.userAgentData.platform ? navigator.userAgentData.platform : ""} ${navigator.platform || ""} ${navigator.userAgent || ""}`.toLowerCase();
  if (platform.includes("win")) {
    return "win";
  }
  if (platform.includes("mac")) {
    return "mac";
  }
  return null;
}

function fileUrl(fileName) {
  return `${DOWNLOAD_BASE}${encodeURIComponent(fileName).replace(/%2F/g, "/")}`;
}

function routePath(path) {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : language === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function renderLayout(content) {
  document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  document.title = language === "en" ? "OS Hero" : t("brand");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.getElementById("languageSelect").value = language;
  document.getElementById("app").innerHTML = content;
  document.getElementById("app").focus({ preventScroll: true });
}

function downloadButton(release, platform, className = "button") {
  const label = platform === "win" ? t("home.downloadWin") : t("home.downloadMac");
  return `<a class="${className}" href="${fileUrl(release.downloads[platform])}" download>${label}</a>`;
}

function renderHome() {
  const latest = releases[0];
  const platform = detectPlatform();
  const primaryActions = platform
    ? downloadButton(latest, platform)
    : `${downloadButton(latest, "mac")} ${downloadButton(latest, "win", "button secondary")}`;
  const menuGuideItems = getMenuGuideItems();

  renderLayout(`
    <section class="section">
      <div class="inner hero">
        <div>
          <p class="eyebrow">${t("home.eyebrow")}</p>
          <h1>${t("home.title")}</h1>
          <p class="lead">${t("home.lead")}</p>
          <div class="actions">
            ${primaryActions}
            <a class="button secondary" href="/install">${t("home.archive")}</a>
          </div>
          <p class="download-context">${t("home.latestVersion", { version: latest.version })}</p>
        </div>
        <div class="hero-art" aria-hidden="true">
          <img class="hero-icon" src="/assets/app-icon.png" alt="">
        </div>
      </div>
    </section>
    <section class="section soft-band">
      <div class="inner menu-guide">
        <p class="eyebrow">${t("home.menuEyebrow")}</p>
        <h2>${t("home.menuTitle")}</h2>
        <p class="section-copy">${t("home.menuLead")}</p>
        <div class="menu-guide-list">
          ${menuGuideItems
            .map(
              (item) => `
                <article class="menu-guide-item">
                  <h3>${item.name}</h3>
                  <p>${item.body}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `);
}

function renderInstall() {
  const pageCount = Math.max(1, Math.ceil(releases.length / PAGE_SIZE));
  page = Math.min(Math.max(1, page), pageCount);
  const start = (page - 1) * PAGE_SIZE;
  const rows = releases.slice(start, start + PAGE_SIZE).map((release) => {
    const copy = getReleaseCopy(release);
    return `
      <tr data-version="${release.version}" tabindex="0">
        <td class="version-cell">${release.version}</td>
        <td>${formatDate(release.releasedAt)}</td>
        <td class="summary-cell"><span class="truncate">${copy.summary}</span></td>
        <td>
          <div class="table-actions">
            <a class="small-link" href="${fileUrl(release.downloads.mac)}" download data-download>${t("install.mac")}</a>
            <a class="small-link" href="${fileUrl(release.downloads.win)}" download data-download>${t("install.win")}</a>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  renderLayout(`
    <section class="section soft-band">
      <div class="inner">
        <div class="page-head">
          <div>
            <h2>${t("install.title")}</h2>
            <p>${t("install.description")}</p>
          </div>
          <div class="actions">
            ${downloadButton(releases[0], "mac", "button secondary")}
            ${downloadButton(releases[0], "win")}
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>${t("install.version")}</th>
                <th>${t("install.date")}</th>
                <th>${t("install.summary")}</th>
                <th>${t("install.download")}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="pagination">
          <button id="prevPage" ${page === 1 ? "disabled" : ""}>${t("install.previous")}</button>
          <button id="nextPage" ${page === pageCount ? "disabled" : ""}>${t("install.next")}</button>
        </div>
      </div>
    </section>
  `);

  document.querySelectorAll("tbody tr").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("[data-download]")) {
        return;
      }
      navigate(`/versions/${row.dataset.version}`);
    });
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        navigate(`/versions/${row.dataset.version}`);
      }
    });
  });
  document.getElementById("prevPage").addEventListener("click", () => {
    page -= 1;
    renderInstall();
  });
  document.getElementById("nextPage").addEventListener("click", () => {
    page += 1;
    renderInstall();
  });
}

function renderVersion(version) {
  const release = releases.find((candidate) => candidate.version === version);
  if (!release) {
    renderNotFound();
    return;
  }

  const copy = getReleaseCopy(release);
  renderLayout(`
    <section class="section">
      <div class="inner detail-layout">
        <article>
          <a class="small-link" href="/install">${t("detail.back")}</a>
          <h2>${t("detail.title", { version: release.version })}</h2>
          <p class="lead">${t("detail.updated", { date: formatDate(release.releasedAt) })}</p>
          <h3>${t("detail.notes")}</h3>
          <ul class="release-notes">
            ${copy.notes.map((note) => `<li>${note}</li>`).join("")}
          </ul>
        </article>
        <aside class="side-panel">
          <h3>${t("detail.downloads")}</h3>
          ${downloadButton(release, "mac", "button secondary")}
          ${downloadButton(release, "win")}
        </aside>
      </div>
    </section>
  `);
}

function renderContact() {
  const year = new Date().getFullYear();
  renderLayout(`
    <section class="section">
      <div class="inner">
        <h2>${t("contact.title")}</h2>
        <p class="lead">${t("contact.description")}</p>
        <dl class="contact-list">
          <div class="contact-row">
            <dt>${t("contact.developer")}</dt>
            <dd>이충복</dd>
          </div>
          <div class="contact-row">
            <dt>${t("contact.contact")}</dt>
            <dd><a href="mailto:themercenary@duck.com">themercenary@duck.com</a></dd>
          </div>
          <div class="contact-row">
            <dt>${t("contact.copyright")}</dt>
            <dd>Copyright © ${year} The Mercenary. All Rights Reserved.</dd>
          </div>
        </dl>
      </div>
    </section>
  `);
}

function renderNotFound() {
  renderLayout(`
    <section class="section">
      <div class="inner">
        <h2>${t("notFound.title")}</h2>
        <a class="button" href="/">${t("notFound.action")}</a>
      </div>
    </section>
  `);
}

function renderRoute() {
  const parts = window.location.pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    renderHome();
    return;
  }
  if (parts[0] === "install") {
    renderInstall();
    return;
  }
  if (parts[0] === "contact") {
    renderContact();
    return;
  }
  if (parts[0] === "versions") {
    renderVersion(parts[1]);
    return;
  }
  renderNotFound();
}

document.getElementById("languageSelect").addEventListener("change", (event) => {
  language = event.target.value;
  window.localStorage.setItem("osHeroLanguage", language);
  renderRoute();
});

function navigate(path) {
  const nextPath = routePath(path);
  if (window.location.pathname !== nextPath) {
    window.history.pushState({}, "", nextPath);
  }
  renderRoute();
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) {
    return;
  }

  const href = link.getAttribute("href");
  if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("/updates/") || link.hasAttribute("download")) {
    return;
  }

  event.preventDefault();
  navigate(href);
});

window.addEventListener("popstate", renderRoute);
renderRoute();
