const DOWNLOAD_BASE = "/updates/";
const PAGE_SIZE = 6;

const releases = [
  {
    version: "0.1.11",
    releasedAt: "2026-05-30T07:18:43+09:00",
    downloads: {
      mac: "OS Hero-0.1.11-arm64.dmg",
      win: "OS Hero Setup 0.1.11.exe"
    },
    copy: {
      en: {
        summary: "Added notification permission checks before saving reminder quests.",
        notes: [
          "Checks OS notification support before a reminder quest is saved.",
          "Requests notification permission when needed and blocks reminder saving if permission is denied.",
          "Shows localized permission guidance in English, Korean, and Simplified Chinese.",
          "Records a reminder as notified only after Electron confirms the OS notification was shown."
        ]
      },
      ko: {
        summary: "리마인더 퀘스트 저장 전에 OS 알림 권한 확인을 추가했습니다.",
        notes: [
          "리마인더 퀘스트 저장 전에 OS 알림 지원 여부를 확인합니다.",
          "필요한 경우 알림 권한을 요청하고, 권한이 거부되어 있으면 리마인더 저장을 막습니다.",
          "영어, 한국어, 중국어 간체로 권한 안내 문구를 표시합니다.",
          "Electron이 OS 알림 표시를 확인한 뒤에만 리마인더를 알림 완료로 기록합니다."
        ]
      },
      zh: {
        summary: "在保存提醒任务前新增系统通知权限检查。",
        notes: [
          "保存提醒任务前会检查系统通知支持状态。",
          "需要时请求通知权限；如果权限被拒绝，则阻止保存提醒。",
          "新增英语、韩语和简体中文的权限提示文案。",
          "只有在 Electron 确认系统通知已显示后，才将提醒记录为已通知。"
        ]
      }
    }
  },
  {
    version: "0.1.10",
    releasedAt: "2026-05-30T07:03:55+09:00",
    downloads: {
      mac: "OS Hero-0.1.10-arm64.dmg",
      win: "OS Hero Setup 0.1.10.exe"
    },
    copy: {
      en: {
        summary: "Added the Hero menu rename and the first Quests workflow with logs, bookmarks, and reminders.",
        notes: [
          "Renamed the View / Customize Character tray menu item to Hero across English, Korean, and Simplified Chinese.",
          "Added the Quests tray menu between Inventory and Settings.",
          "Added Adventure Log, Bookmark Record, and Reminder quest types with local JSON persistence.",
          "Added quest table pagination, newest-first sorting, detail pages, edit and delete actions, and inline status updates.",
          "Added OS notifications for reminder quests; clicking a notification opens the related quest detail window."
        ]
      },
      ko: {
        summary: "히어로 메뉴명 변경과 모험 일지, 북마크, 리마인더를 포함한 첫 퀘스트 기능을 추가했습니다.",
        notes: [
          "트레이 메뉴의 캐릭터 보기 / 커스터마이징 항목을 영어, 한국어, 중국어 간체에서 히어로 맥락의 이름으로 변경했습니다.",
          "인벤토리와 환경설정 사이에 퀘스트 메뉴를 추가했습니다.",
          "모험 일지, 북마크 기록, 리마인더 퀘스트 타입과 로컬 JSON 저장 구조를 추가했습니다.",
          "퀘스트 테이블 페이지네이션, 최신순 정렬, 상세 페이지, 수정/삭제, 인라인 상태 변경을 추가했습니다.",
          "리마인더 퀘스트용 OS 알림을 추가했고, 알림 클릭 시 해당 퀘스트 상세 창이 열리도록 했습니다."
        ]
      },
      zh: {
        summary: "新增英雄菜单命名和首个任务功能，包含冒险日志、书签与提醒。",
        notes: [
          "将托盘菜单中的查看 / 自定义角色在英语、韩语和简体中文中改为英雄品牌语境。",
          "在背包与设置之间新增任务菜单。",
          "新增冒险日志、书签记录和提醒三种任务类型，并使用本地 JSON 保存。",
          "新增任务表格分页、按最新排序、详情页、编辑、删除和行内状态更新。",
          "为提醒任务新增系统通知，点击通知会打开对应任务详情窗口。"
        ]
      }
    }
  },
  {
    version: "0.1.9",
    releasedAt: "2026-05-30T05:58:39+09:00",
    downloads: {
      mac: "OS Hero-0.1.9-arm64.dmg",
      win: "OS Hero Setup 0.1.9.exe"
    },
    copy: {
      en: {
        summary: "Updated the macOS and Windows app icon, preserved archived update files, and added this multilingual download site.",
        notes: [
          "Replaced the packaged macOS and Windows app icon with the latest pixel character artwork.",
          "Published macOS and Windows 0.1.9 update artifacts to the GitHub Pages update feed.",
          "Changed the update deployment flow so versioned installers remain available for the archive.",
          "Added the multilingual OS Hero website with OS-aware latest download buttons and release detail pages."
        ]
      },
      ko: {
        summary: "macOS와 Windows 앱 아이콘을 갱신하고, 버전별 설치 파일 보존과 다국어 다운로드 사이트를 추가했습니다.",
        notes: [
          "최신 픽셀 캐릭터 아트워크를 macOS와 Windows 패키지 앱 아이콘으로 교체했습니다.",
          "macOS와 Windows 0.1.9 업데이트 파일을 GitHub Pages 업데이트 피드에 배포했습니다.",
          "버전별 설치 파일이 아카이브에 남도록 업데이트 배포 흐름을 변경했습니다.",
          "OS 감지 최신 다운로드 버튼과 버전 상세 페이지를 포함한 다국어 OS Hero 웹사이트를 추가했습니다."
        ]
      },
      zh: {
        summary: "更新了 macOS 和 Windows 应用图标，保留版本安装文件，并新增多语言下载网站。",
        notes: [
          "将最新像素角色 artwork 应用到 macOS 和 Windows 打包图标。",
          "已将 macOS 与 Windows 0.1.9 更新文件发布到 GitHub Pages 更新源。",
          "调整更新发布流程，保留各版本安装文件，供归档页面下载。",
          "新增多语言 OS Hero 网站，包含系统识别下载按钮与版本详情页。"
        ]
      }
    }
  },
  {
    version: "0.1.8",
    releasedAt: "2026-05-30T05:38:39+09:00",
    downloads: {
      mac: "OS Hero-0.1.8-arm64.dmg",
      win: "OS Hero Setup 0.1.8.exe"
    },
    copy: {
      en: {
        summary: "Published the first custom-icon build and refreshed the remote update feed for macOS and Windows.",
        notes: [
          "Added custom app icon resources for macOS and Windows packages.",
          "Built macOS Apple Silicon DMG/ZIP and Windows x64 installer artifacts.",
          "Published the 0.1.8 generic electron-updater feed through GitHub Pages."
        ]
      },
      ko: {
        summary: "첫 커스텀 아이콘 빌드를 배포하고 macOS와 Windows 원격 업데이트 피드를 갱신했습니다.",
        notes: [
          "macOS와 Windows 패키지에 커스텀 앱 아이콘 리소스를 추가했습니다.",
          "macOS Apple Silicon DMG/ZIP과 Windows x64 설치 파일을 생성했습니다.",
          "GitHub Pages를 통해 0.1.8 electron-updater generic 피드를 배포했습니다."
        ]
      },
      zh: {
        summary: "发布首个自定义图标版本，并刷新 macOS 与 Windows 的远程更新源。",
        notes: [
          "为 macOS 与 Windows 安装包加入自定义应用图标资源。",
          "生成 macOS Apple Silicon DMG/ZIP 与 Windows x64 安装程序。",
          "通过 GitHub Pages 发布 0.1.8 electron-updater generic 更新源。"
        ]
      }
    }
  },
  {
    version: "0.1.7",
    releasedAt: "2026-05-30T05:21:33+09:00",
    downloads: {
      mac: "OS Hero-0.1.7-arm64.dmg",
      win: "OS Hero Setup 0.1.7.exe"
    },
    copy: {
      en: {
        summary: "Established the GitHub Pages remote update channel for future automatic updates.",
        notes: [
          "Configured packaged clients to use https://os-hero.github.io/updates/ as the update feed.",
          "Added a deployment script for publishing electron-updater metadata and installers.",
          "Generated macOS and Windows update artifacts for the first feed-enabled release."
        ]
      },
      ko: {
        summary: "향후 자동 업데이트를 위한 GitHub Pages 원격 업데이트 채널을 구축했습니다.",
        notes: [
          "패키징된 클라이언트가 https://os-hero.github.io/updates/ 업데이트 피드를 사용하도록 설정했습니다.",
          "electron-updater 메타데이터와 설치 파일을 배포하는 스크립트를 추가했습니다.",
          "원격 피드가 포함된 첫 릴리스의 macOS와 Windows 업데이트 파일을 생성했습니다."
        ]
      },
      zh: {
        summary: "建立 GitHub Pages 远程更新通道，为后续自动更新做准备。",
        notes: [
          "将打包客户端配置为使用 https://os-hero.github.io/updates/ 更新源。",
          "新增用于发布 electron-updater 元数据与安装文件的部署脚本。",
          "生成首个带远程更新源版本的 macOS 与 Windows 更新文件。"
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
            <dd>이요한</dd>
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
