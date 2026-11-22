/**
 * Sprout Social Controller - Content Calendar & Publishing REBOX
 * Quản lý chiến dịch truyền thông REBOX (Giai đoạn 1, 2, 3)
 * Đội ngũ Chuyên viên PR: Nguyễn Thị Tây Thi, Phạm Thị Thuỳ Mỹ, Nguyễn Thái Vy, Mai Thuỳ Linh, Trịnh Trương Ái Mỹ
 */

document.addEventListener('DOMContentLoaded', () => {
  const store = window.sproutStore;

  const state = {
    currentView: 'calendar', // 'calendar', 'queue', 'brand', 'members'
    calendarMode: 'week', // 'week' hoặc 'month'
    currentDate: new Date('2026-12-01'), // Mặc định mở đầu chiến dịch tháng 12/2026
    weekStartDate: getMonday(new Date('2026-12-01')),
    selectedMemberId: 'all',
    selectedPhase: 'all',
    selectedPlatform: 'all',
    onlyAds: false,
    searchKeyword: '',
    editingPostId: null,
    editingContactKey: null,
    editingMemberId: null
  };

  function getMonday(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  // Bộ Icon SVG phù hợp từng nội dung kênh liên hệ
  const CONTACT_SVGS = {
    location: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    tax: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="5 6 12 3 19 6"></polyline><line x1="4" y1="10" x2="4" y2="21"></line><line x1="20" y1="10" x2="20" y2="21"></line><line x1="8" y1="14" x2="8" y2="17"></line><line x1="12" y1="14" x2="12" y2="17"></line><line x1="16" y1="14" x2="16" y2="17"></line></svg>`,
    clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    website: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
    instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
    tiktok: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>`,
    youtube: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`,
    shopee: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
    zalo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    zaloOA: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M9 9h6v6H9z"></path></svg>`,
    cart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    map: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>`
  };

  // Biểu tượng Logo chính thức cho từng Kênh & Quảng Cáo (SVG sắc nét)
  const PLATFORM_ICONS = {
    tiktok: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align:-1px;"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.84-4.48V8.71a8.21 8.21 0 0 0 4.93 1.63v-3.65z"/></svg>`,
    facebook: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align:-1px;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    website: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    confessions: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align:-1px;"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>`,
    httt: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align:-1px;"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>`,
    bao_danang: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align:-1px;"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    offline: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    email: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
  };

  const ADS_ICON = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align:-1px;"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>`;

  function getPlatformBadgeHtml(platId) {
    const platInfo = PLATFORMS[platId] || { name: platId.toUpperCase(), code: platId.toUpperCase(), bg: '#f1f5f9', color: '#334155', border: '#cbd5e1' };
    const icon = PLATFORM_ICONS[platId] || '';
    const borderStyle = platInfo.border ? `border: 1px solid ${platInfo.border};` : '';
    return `<span class="card-channel-tag" style="background: ${platInfo.bg}; color: ${platInfo.color}; ${borderStyle} font-weight: 700; margin-right: 3px; margin-bottom: 2px;">${icon}<span>${platInfo.name}</span></span>`;
  }

  function getPlatformMiniTagHtml(platId) {
    const platInfo = PLATFORMS[platId] || { name: platId.toUpperCase(), code: platId.toUpperCase(), bg: '#f1f5f9', color: '#334155', border: '#cbd5e1' };
    const icon = PLATFORM_ICONS[platId] || '';
    const borderStyle = platInfo.border ? `border: 1px solid ${platInfo.border};` : '';
    return `<span class="card-channel-tag" style="background: ${platInfo.bg}; color: ${platInfo.color}; ${borderStyle} font-size: 8.5px; padding: 1.5px 4.5px; margin-right: 2px;">${icon}<span>${platInfo.code}</span></span>`;
  }

  function getAdsBadgeHtml(adsText, isMini = false) {
    if (!adsText) return '';
    if (isMini) {
      return `<span class="badge-ads" style="font-size: 8.5px; padding: 1.5px 5px;" title="Chiến dịch chạy quảng cáo: ${adsText}">${ADS_ICON}<span>ADS</span></span>`;
    }
    return `<div style="margin-top: 4px; display: block;"><span class="badge-ads" title="Chiến dịch chạy quảng cáo: ${adsText}">${ADS_ICON}<span>ADS: ${adsText}</span></span></div>`;
  }

  // DOM Elements
  const sidebarItems = document.querySelectorAll('.sidebar-menu-item');
  const periodDisplay = document.getElementById('period-display');
  const postVolumeTrack = document.getElementById('post-volume-track');
  const memberFilterStrip = document.getElementById('member-filter-strip');
  
  const calendarContainer = document.getElementById('calendar-container');
  const weekGridView = document.getElementById('week-grid-view');
  const monthGridView = document.getElementById('month-grid-view');
  const tableView = document.getElementById('table-view');
  const brandView = document.getElementById('brand-view');
  const membersView = document.getElementById('members-view');

  const btnModeWeek = document.getElementById('btn-mode-week');
  const btnModeMonth = document.getElementById('btn-mode-month');

  // Contact Config Modal
  const contactConfigModal = document.getElementById('contact-config-modal');
  const contactConfigLabel = document.getElementById('contact-config-label');
  const contactConfigInput = document.getElementById('contact-config-input');

  // Member Modal
  const memberModal = document.getElementById('member-modal');
  const memberModalTitle = document.getElementById('member-modal-title');
  const memberForm = document.getElementById('member-form');
  const inputMemberName = document.getElementById('modal-member-name');
  const inputMemberRole = document.getElementById('modal-member-role');
  const inputMemberPhone = document.getElementById('modal-member-phone');
  const inputMemberEmail = document.getElementById('modal-member-email');
  const inputMemberDob = document.getElementById('modal-member-dob');

  // Compose Drawer
  const composeOverlay = document.getElementById('compose-overlay');
  const composeForm = document.getElementById('compose-form');
  const composeTitle = document.getElementById('compose-title');
  const profilePillsWrap = document.getElementById('compose-profile-pills');
  const composeTextarea = document.getElementById('compose-textarea');
  const charCounter = document.getElementById('char-counter');
  const composeDateInput = document.getElementById('compose-date');
  const composeTimeInput = document.getElementById('compose-time');
  const composeAssigneeSelect = document.getElementById('compose-assignee');
  const composeImageInput = document.getElementById('compose-image');
  const composeAdsInput = document.getElementById('compose-ads');
  const composeNoteInput = document.getElementById('compose-note');

  // Remind Modal
  const remindModal = document.getElementById('remind-modal');
  const remindTextBox = document.getElementById('remind-text-box');

  init();

  function syncSidebar(viewName) {
    sidebarItems.forEach(i => {
      if (i.dataset.view === viewName) {
        i.classList.add('active');
      } else {
        i.classList.remove('active');
      }
    });
  }

  function switchView(viewName) {
    state.currentView = viewName;
    syncSidebar(viewName);
    renderCurrentView();
  }

  function init() {
    renderSidebarCounts();
    renderMemberFilterBar();
    renderVolumeChart();
    renderCurrentView();
    bindEvents();
  }

  function renderSidebarCounts() {
    const stats = store.getStats();
    const badgeQueue = document.getElementById('badge-queue');
    const badgePhase1 = document.getElementById('badge-phase1');
    const badgePhase2 = document.getElementById('badge-phase2');
    const badgePhase3 = document.getElementById('badge-phase3');

    if (badgeQueue) badgeQueue.textContent = stats.total;
    if (badgePhase1) badgePhase1.textContent = stats.phase1;
    if (badgePhase2) badgePhase2.textContent = stats.phase2;
    if (badgePhase3) badgePhase3.textContent = stats.phase3;
  }

  function renderMemberFilterBar() {
    if (!memberFilterStrip) return;
    const members = store.getMembers();
    memberFilterStrip.innerHTML = '<span class="filter-label">Phụ trách:</span>';

    members.forEach(m => {
      const btn = document.createElement('button');
      btn.className = `filter-chip ${state.selectedMemberId === m.id ? 'active' : ''}`;
      btn.textContent = `${m.name} (${m.code})`;
      btn.addEventListener('click', () => {
        state.selectedMemberId = m.id;
        if (state.currentView === 'members' || state.currentView === 'brand') {
          switchView('calendar');
        } else {
          renderCurrentView();
        }
        renderMemberFilterBar();
        showToast(m.id === 'all' ? 'Hiển thị lịch của tất cả thành viên' : `Đang lọc lịch của: ${m.name}`);
      });
      memberFilterStrip.appendChild(btn);
    });

    // Thêm các nút chuyển nhanh giai đoạn chiến dịch
    const phaseDivider = document.createElement('span');
    phaseDivider.style.cssText = 'border-left: 1px solid var(--sprout-border); height: 16px; margin: 0 4px;';
    memberFilterStrip.appendChild(phaseDivider);

    const phases = [
      { id: 'all', label: 'Tất cả giai đoạn', jumpDate: '2026-12-01', sidebarKey: 'calendar' },
      { id: 'Giai đoạn 1 (T12/2026)', label: 'GĐ 1: Tháng 12/2026', jumpDate: '2026-12-01', sidebarKey: 'phase1' },
      { id: 'Giai đoạn 2 (T01/2027)', label: 'GĐ 2: Tháng 01/2027', jumpDate: '2027-01-01', sidebarKey: 'phase2' },
      { id: 'Giai đoạn 3 (T02/2027)', label: 'GĐ 3: Tháng 02/2027', jumpDate: '2027-02-01', sidebarKey: 'phase3' }
    ];

    phases.forEach(p => {
      const btn = document.createElement('button');
      btn.className = `filter-chip ${state.selectedPhase === p.id ? 'active' : ''}`;
      btn.textContent = p.label;
      btn.addEventListener('click', () => {
        state.selectedPhase = p.id;
        state.currentDate = new Date(p.jumpDate);
        state.weekStartDate = getMonday(new Date(p.jumpDate));

        if (state.currentView === 'members' || state.currentView === 'brand') {
          state.currentView = 'calendar';
        }
        syncSidebar(p.sidebarKey);

        renderMemberFilterBar();
        renderCurrentView();
        showToast(`Đã chuyển tới: ${p.label}`);
      });
      memberFilterStrip.appendChild(btn);
    });

    // Thêm các nút lọc theo Kênh & Quảng cáo (Ads)
    const platDivider = document.createElement('span');
    platDivider.style.cssText = 'border-left: 1px solid var(--sprout-border); height: 16px; margin: 0 4px;';
    memberFilterStrip.appendChild(platDivider);

    const channelFilters = [
      { id: 'all', label: 'Tất cả kênh', isAds: false },
      { id: 'ads_only', label: 'Chỉ bài chạy Ads (5 bài)', isAds: true },
      { id: 'tiktok', label: 'TikTok', isAds: false },
      { id: 'facebook', label: 'Facebook', isAds: false },
      { id: 'website', label: 'Website REBOX', isAds: false },
      { id: 'confessions', label: 'UED Confessions', isAds: false },
      { id: 'httt', label: 'Kênh trường (HTTT)', isAds: false }
    ];

    channelFilters.forEach(cf => {
      const btn = document.createElement('button');
      const isSelected = cf.isAds ? state.onlyAds : (!state.onlyAds && state.selectedPlatform === cf.id);
      btn.className = `filter-chip ${cf.isAds ? 'chip-ads' : ''} ${isSelected ? 'active' : ''}`;
      btn.textContent = cf.label;
      btn.addEventListener('click', () => {
        if (cf.isAds) {
          state.onlyAds = !state.onlyAds;
          state.selectedPlatform = 'all';
        } else {
          state.onlyAds = false;
          state.selectedPlatform = cf.id;
        }

        if (state.currentView === 'members' || state.currentView === 'brand') {
          switchView('calendar');
        } else {
          renderCurrentView();
        }
        renderMemberFilterBar();
        showToast(cf.isAds ? (state.onlyAds ? 'Đang lọc các bài chạy Ads (Facebook & TikTok Ads)' : 'Đã bỏ lọc Ads') : `Lọc bài viết kênh: ${cf.label}`);
      });
      memberFilterStrip.appendChild(btn);
    });
  }

  function renderVolumeChart() {
    if (!postVolumeTrack) return;
    postVolumeTrack.innerHTML = '';

    const startDateStr = state.calendarMode === 'week' 
      ? state.weekStartDate.toISOString().split('T')[0]
      : new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1).toISOString().split('T')[0];

    const volumeData = store.getDailyPostVolume(startDateStr, 7);

    volumeData.forEach(item => {
      const dayBox = document.createElement('div');
      dayBox.className = 'volume-day-item';

      const pill = document.createElement('div');
      pill.className = `volume-pill ${item.count === 0 ? 'zero' : ''}`;
      const height = item.count === 0 ? 3 : Math.min(22, 5 + item.count * 5);
      pill.style.height = `${height}px`;
      pill.title = `${item.date}: ${item.count} nhiệm vụ / bài đăng`;

      const text = document.createElement('span');
      text.className = 'volume-day-text';
      text.textContent = item.dayNum;

      dayBox.appendChild(pill);
      dayBox.appendChild(text);
      postVolumeTrack.appendChild(dayBox);
    });
  }

  function renderCurrentView() {
    renderSidebarCounts();
    renderVolumeChart();

    let phaseFilter = state.selectedPhase;
    if (state.currentView === 'phase1') phaseFilter = 'Giai đoạn 1 (T12/2026)';
    else if (state.currentView === 'phase2') phaseFilter = 'Giai đoạn 2 (T01/2027)';
    else if (state.currentView === 'phase3') phaseFilter = 'Giai đoạn 3 (T02/2027)';

    const posts = store.filterPosts({
      memberId: state.selectedMemberId,
      keyword: state.searchKeyword,
      phase: phaseFilter,
      platform: state.selectedPlatform,
      onlyAds: state.onlyAds
    });

    calendarContainer.style.display = 'none';
    tableView.style.display = 'none';
    brandView.style.display = 'none';
    membersView.style.display = 'none';

    if (state.currentView === 'brand') {
      brandView.style.display = 'flex';
      renderBrandAndContacts();
    } else if (state.currentView === 'members') {
      membersView.style.display = 'block';
      renderMembersManagement();
    } else if (state.currentView === 'queue') {
      tableView.style.display = 'block';
      renderTableView(posts);
    } else {
      // Cho 'calendar', 'phase1', 'phase2', 'phase3': hiển thị Lịch trình ô lưới
      calendarContainer.style.display = 'flex';
      if (state.calendarMode === 'week') {
        weekGridView.style.display = 'grid';
        monthGridView.style.display = 'none';
        renderWeekGrid(posts);
      } else {
        weekGridView.style.display = 'none';
        monthGridView.style.display = 'flex';
        renderMonthGrid(posts);
      }
    }
  }

  // --- 1. RENDER 15 KÊNH LIÊN HỆ CÓ ICON PHÙ HỢP & NÚT CẤU HÌNH ---
  function renderBrandAndContacts() {
    const brand = store.getBrand();
    const grid = document.getElementById('contacts-grid-15');
    if (!grid) return;
    grid.innerHTML = '';

    const contacts = brand.contacts || {};
    Object.keys(contacts).forEach(key => {
      const item = contacts[key];
      const box = document.createElement('div');
      box.className = 'contact-box-item';

      const svgIcon = CONTACT_SVGS[item.iconType] || CONTACT_SVGS.website;
      const isUnset = !item.value || item.value === 'Chưa thiết lập';

      box.innerHTML = `
        <div class="contact-box-left">
          <div class="contact-icon-frame">${svgIcon}</div>
          <div class="contact-text-info">
            <div class="contact-item-title">${item.label}</div>
            <div class="contact-item-val ${isUnset ? 'unset' : ''}" title="${item.value}">${item.value}</div>
          </div>
        </div>
        <button class="btn-config-contact" data-key="${key}">Cấu hình</button>
      `;

      box.querySelector('.btn-config-contact').addEventListener('click', () => {
        openContactConfigModal(key, item);
      });

      grid.appendChild(box);
    });
  }

  function openContactConfigModal(key, item) {
    state.editingContactKey = key;
    contactConfigLabel.textContent = `Cấu hình thông tin: ${item.label}`;
    contactConfigInput.value = item.value === 'Chưa thiết lập' ? '' : item.value;
    contactConfigModal.classList.add('active');
  }

  // --- 2. RENDER NHÂN SỰ CHI TIẾT ---
  function renderMembersManagement() {
    const tableBody = document.getElementById('members-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const members = store.getMembers().filter(m => m.id !== 'all');

    members.forEach(m => {
      const row = document.createElement('div');
      row.className = 'members-table-row';
      const isLeader = m.id === 'nv_taythi';

      row.innerHTML = `
        <div>
          <div style="font-weight: 700; color: var(--text-main);">${m.name}</div>
          <div style="font-size: 11px; color: var(--text-muted);">Mã: ${m.code}</div>
        </div>
        <div>${m.role || 'Chuyên viên'}</div>
        <div><strong>${m.phone || 'Chưa có'}</strong></div>
        <div style="overflow: hidden; text-overflow: ellipsis;" title="${m.email}">${m.email || 'Chưa có'}</div>
        <div>${m.dob ? formatDateDisplay(m.dob) : 'Chưa thiết lập'}</div>
        <div style="display: flex; gap: 6px; justify-content: flex-end;">
          <button class="btn-sprout-primary btn-view-member-schedule" data-id="${m.id}" style="padding: 3px 8px; font-size: 11px;" title="Xem các bài đăng phân công cho nhân sự này">Xem lịch trình</button>
          <button class="btn-sprout-secondary btn-edit-member" data-id="${m.id}" style="padding: 3px 6px; font-size: 11px;">Chỉnh sửa</button>
          ${!isLeader ? `<button class="btn-sprout-secondary btn-del-member" data-id="${m.id}" style="padding: 3px 6px; font-size: 11px; color: #dc2626;">Xóa</button>` : ''}
        </div>
      `;

      row.querySelector('.btn-view-member-schedule').addEventListener('click', () => {
        state.selectedMemberId = m.id;
        switchView('calendar');
        renderMemberFilterBar();
        showToast(`Đang hiển thị lịch trình phân công của: ${m.name}`);
      });

      row.querySelector('.btn-edit-member').addEventListener('click', () => {
        openEditMemberModal(m);
      });

      const delBtn = row.querySelector('.btn-del-member');
      if (delBtn) {
        delBtn.addEventListener('click', () => {
          if (confirm(`Bạn có chắc chắn muốn xóa nhân sự "${m.name}" khỏi danh sách?`)) {
            store.deleteMember(m.id);
            renderMembersManagement();
            renderMemberFilterBar();
            showToast(`Đã xóa nhân sự: ${m.name}`);
          }
        });
      }

      tableBody.appendChild(row);
    });
  }

  function formatDateDisplay(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  }

  function openEditMemberModal(m = null) {
    memberForm.reset();
    if (m) {
      state.editingMemberId = m.id;
      memberModalTitle.textContent = `Chỉnh Sửa Thông Tin: ${m.name}`;
      inputMemberName.value = m.name || '';
      inputMemberRole.value = m.role || '';
      inputMemberPhone.value = m.phone || '';
      inputMemberEmail.value = m.email || '';
      inputMemberDob.value = m.dob || '';
    } else {
      state.editingMemberId = null;
      memberModalTitle.textContent = 'Thêm Nhân Sự Mới Vào Team';
    }
    memberModal.classList.add('active');
  }

  // --- 3. RENDER WEEK GRID (LƯỚI 7 CỘT KHÔNG BỊ TRÔI NGÀY CHỦ NHẬT) ---
  function renderWeekGrid(posts) {
    if (!weekGridView) return;
    weekGridView.innerHTML = '';

    const baseDate = new Date(state.weekStartDate);
    const dayNames = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];

    const endDate = new Date(baseDate);
    endDate.setDate(endDate.getDate() + 6);
    if (periodDisplay) {
      periodDisplay.textContent = `Tuần: ${baseDate.getDate()}/${baseDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
    }

    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 0; i < 7; i++) {
      const curDate = new Date(baseDate);
      curDate.setDate(curDate.getDate() + i);
      const dateStr = curDate.toISOString().split('T')[0];
      const isToday = dateStr === todayStr;

      const colCell = document.createElement('div');
      colCell.className = `week-col-cell ${isToday ? 'today-col' : ''}`;

      const header = document.createElement('div');
      header.className = 'week-col-header';
      header.innerHTML = `
        <div class="week-day-title">${dayNames[i]} ${curDate.getDate()}/${curDate.getMonth() + 1}</div>
        <button class="btn-add-day-post" data-date="${dateStr}">+ Thêm nhiệm vụ</button>
      `;

      header.querySelector('.btn-add-day-post').addEventListener('click', () => {
        openComposeDrawer(null, dateStr);
      });

      const postsStream = document.createElement('div');
      postsStream.className = 'week-col-posts-stream';

      const dayPosts = posts.filter(p => p.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));

      if (dayPosts.length === 0) {
        postsStream.innerHTML = `<div style="text-align: center; color: #94a3b8; font-size: 11px; padding: 20px 0;">Không có bài</div>`;
      } else {
        dayPosts.forEach(p => {
          const card = document.createElement('div');
          card.className = 'sprout-post-card';

          const platTagsHtml = (p.platforms && p.platforms.length > 0 ? p.platforms : ['facebook'])
            .map(platId => getPlatformMiniTagHtml(platId)).join('');
          const adsHtml = getAdsBadgeHtml(p.ads, true);

          const assigneeCodes = (p.assignees || []).map(id => store.getMemberById(id)?.code || 'NV').join(', ');

          let imgHtml = '';
          if (p.image) {
            imgHtml = `<div class="card-thumbnail-box"><img src="${p.image}" alt="Hình bài đăng"></div>`;
          }

          card.innerHTML = `
            <div class="card-top-meta" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 4px; margin-bottom: 4px;">
              <div style="display: flex; flex-wrap: wrap; gap: 2px; align-items: center;">
                ${platTagsHtml}
                ${adsHtml}
              </div>
              <span class="card-time">${p.time}</span>
            </div>
            <div class="card-content-excerpt" title="${p.title}"><strong>${p.title}</strong><br>${p.content}</div>
            ${imgHtml}
            ${p.ads ? `<div style="font-size: 9px; color: #0f172a; font-weight: 700; background: #ffffff; padding: 2.5px 6px; border-radius: 4px; border: 1px solid #cbd5e1; margin-top: 3px; display: inline-flex; align-items: center; gap: 3.5px; line-height: 1.25; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);">${ADS_ICON}<span>Ads: ${p.ads}</span></div>` : ''}
            ${p.note ? `<div style="font-size: 10px; color: #64748b; background: #f8fafc; padding: 3px 5px; border-radius: 2px; margin-top: 2px;">Ghi chú: ${p.note}</div>` : ''}
            <div class="card-footer-actions">
              <span class="assignee-initials" title="Phụ trách: ${assigneeCodes}">PT: ${assigneeCodes}</span>
              <div class="action-links">
                <button class="action-link-btn btn-remind" data-id="${p.id}">Nhắc việc</button>
                <button class="action-link-btn btn-edit" data-id="${p.id}">Sửa</button>
                <button class="action-link-btn btn-delete" data-id="${p.id}" style="color: #dc2626;">Xóa</button>
              </div>
            </div>
          `;

          card.querySelector('.btn-edit').addEventListener('click', (e) => {
            e.stopPropagation();
            openComposeDrawer(p.id);
          });
          card.querySelector('.btn-remind').addEventListener('click', (e) => {
            e.stopPropagation();
            openRemindModal(p.id);
          });
          card.querySelector('.btn-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Bạn có chắc muốn xóa bài "${p.title}"?`)) {
              store.deletePost(p.id);
              renderCurrentView();
              showToast('Đã xóa bài viết khỏi lịch!');
            }
          });

          card.addEventListener('click', () => {
            openComposeDrawer(p.id);
          });

          postsStream.appendChild(card);
        });
      }

      colCell.appendChild(header);
      colCell.appendChild(postsStream);
      weekGridView.appendChild(colCell);
    }
  }

  // --- 4. RENDER MONTH GRID ---
  function renderMonthGrid(posts) {
    const grid = document.getElementById('month-days-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const y = state.currentDate.getFullYear();
    const m = state.currentDate.getMonth();

    if (periodDisplay) {
      periodDisplay.textContent = `Tháng ${m + 1} / ${y}`;
    }

    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    let startingDayOfWeek = firstDay.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;

    const prevMonthLastDay = new Date(y, m, 0).getDate();
    const totalDays = lastDay.getDate();

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === y && today.getMonth() === m;
    const todayDate = today.getDate();

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const cell = document.createElement('div');
      cell.className = 'month-day-cell other-month';
      cell.innerHTML = `<div class="month-day-top"><span class="month-day-num">${dayNum}</span></div>`;
      grid.appendChild(cell);
    }

    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement('div');
      const isToday = isCurrentMonth && day === todayDate;
      cell.className = `month-day-cell ${isToday ? 'today-cell' : ''}`;

      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayPosts = posts.filter(p => p.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));

      let capsulesHtml = '';
      dayPosts.slice(0, 3).forEach(p => {
        const primaryPlat = PLATFORMS[p.platforms[0]] || PLATFORMS.facebook;
        const platTag = primaryPlat.code || 'FB';
        const adsTag = p.ads ? ' [ADS]' : '';
        capsulesHtml += `
          <div class="month-post-capsule" style="border-left-color: ${primaryPlat.color};" data-id="${p.id}" title="${p.time} - [${platTag}] ${p.title} ${p.ads ? '(' + p.ads + ')' : ''}">
            <span style="font-weight:700;">${p.time}</span>
            <span style="font-weight:700; color:${primaryPlat.color};">[${platTag}${adsTag}]</span>
            <span>${p.title}</span>
          </div>
        `;
      });

      if (dayPosts.length > 3) {
        capsulesHtml += `<div style="font-size: 9.5px; color: #0073e6; font-weight:700;">+${dayPosts.length - 3} nhiệm vụ nữa</div>`;
      }

      cell.innerHTML = `
        <div class="month-day-top">
          <span class="month-day-num">${day}</span>
          ${isToday ? '<span style="font-size: 9.5px; color: #0073e6; font-weight:700;">Hôm nay</span>' : ''}
        </div>
        <div class="month-cell-posts">${capsulesHtml}</div>
      `;

      cell.addEventListener('click', (e) => {
        const capsule = e.target.closest('.month-post-capsule');
        if (capsule) {
          openComposeDrawer(capsule.dataset.id);
        } else {
          openComposeDrawer(null, dateStr);
        }
      });

      grid.appendChild(cell);
    }

    const totalCells = startingDayOfWeek + totalDays;
    const remainingDays = (7 - (totalCells % 7)) % 7;
    for (let day = 1; day <= remainingDays; day++) {
      const cell = document.createElement('div');
      cell.className = 'month-day-cell other-month';
      cell.innerHTML = `<div class="month-day-top"><span class="month-day-num">${day}</span></div>`;
      grid.appendChild(cell);
    }
  }

  // --- 5. RENDER TABLE VIEW CHO TOÀN BỘ KẾ HOẠCH ---
  function renderTableView(posts) {
    if (!tableView) return;
    tableView.innerHTML = '';

    if (posts.length === 0) {
      tableView.innerHTML = `
        <div class="table-card" style="padding: 40px 20px; text-align: center; color: var(--text-muted);">
          <div style="font-size: 13px; font-weight: 600;">Không có bài viết nào phù hợp bộ lọc</div>
        </div>
      `;
      return;
    }

    const tableCard = document.createElement('div');
    tableCard.className = 'table-card';

    posts.forEach(p => {
      const row = document.createElement('div');
      row.className = 'table-row';

      const platBadgesHtml = (p.platforms && p.platforms.length > 0 ? p.platforms : ['facebook'])
        .map(platId => getPlatformBadgeHtml(platId)).join('');
      const adsBadgeHtml = getAdsBadgeHtml(p.ads);

      const statusInfo = POST_STATUSES[p.status] || POST_STATUSES.scheduled;
      const assigneeNames = (p.assignees || []).map(id => store.getMemberById(id)?.name || id).join(', ');

      row.innerHTML = `
        <div style="width: 215px; min-width: 215px; max-width: 215px; flex-shrink: 0;">
          <div style="display: flex; flex-wrap: wrap; gap: 3px; align-items: center;">
            ${platBadgesHtml}
          </div>
          ${adsBadgeHtml}
          <div style="margin-top: 6px; padding-top: 5px; border-top: 1px dashed #e2e8f0;">
            <div style="font-size: 11.5px; font-weight: 800; color: #0f172a; letter-spacing: 0.2px;">
              ${formatDateDisplay(p.date)}
            </div>
            <div style="font-size: 10.5px; font-weight: 600; color: #64748b; margin-top: 2px;">
              ${p.time} &bull; <span style="color: #0284c7;">${p.phase ? p.phase.replace('Giai đoạn ', 'GĐ ') : ''}</span>
            </div>
          </div>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 13.5px; font-weight: 700; color: var(--text-main); line-height: 1.4;">${p.title}</div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-top: 3px; line-height: 1.45;">
            ${p.content}
          </div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 5px; line-height: 1.4;">
            Định dạng: <strong>${p.format || 'Bài viết'}</strong> &bull; Phụ trách: <strong>${assigneeNames}</strong>
            ${p.ads ? ` &bull; <strong style="color: #0f172a; background: #f8fafc; padding: 1.5px 5px; border-radius: 3px; border: 1px solid #cbd5e1;">Ads: ${p.ads}</strong>` : ''}
            ${p.note ? ` &bull; <em>Ghi chú: ${p.note}</em>` : ''}
          </div>
        </div>
        <div style="display: flex; gap: 8px; flex-shrink: 0; align-items: flex-start; margin-top: 2px;">
          <button class="btn-sprout-secondary btn-remind-row" data-id="${p.id}" style="padding: 4px 8px; font-size: 11px;">Nhắc việc</button>
          <button class="btn-sprout-secondary btn-edit-row" data-id="${p.id}" style="padding: 4px 8px; font-size: 11px;">Chỉnh sửa</button>
        </div>
      `;

      row.querySelector('.btn-edit-row').addEventListener('click', () => openComposeDrawer(p.id));
      row.querySelector('.btn-remind-row').addEventListener('click', () => openRemindModal(p.id));

      tableCard.appendChild(row);
    });

    tableView.appendChild(tableCard);
  }

  // --- 6. COMPOSE DRAWER ---
  function openComposeDrawer(postId = null, defaultDate = null) {
    state.editingPostId = postId;
    composeForm.reset();

    renderProfilePills();
    renderAssigneeSelect();

    if (postId) {
      const p = store.getPostById(postId);
      if (!p) return;
      composeTitle.textContent = 'Chỉnh Sửa Bài Viết Truyền Thông REBOX';
      document.getElementById('compose-title-input').value = p.title || '';
      composeTextarea.value = p.content || '';
      composeDateInput.value = p.date || '';
      composeTimeInput.value = p.time || '12:00';
      composeImageInput.value = p.image || '';
      if (composeAdsInput) composeAdsInput.value = p.ads || '';
      composeNoteInput.value = p.note || '';
      document.getElementById('compose-format-input').value = p.format || 'Bài viết';
      document.getElementById('compose-status').value = p.status || 'scheduled';

      if (p.platforms && p.platforms.length > 0) {
        profilePillsWrap.querySelectorAll('.profile-pill-item').forEach(pill => {
          pill.classList.toggle('selected', p.platforms.includes(pill.dataset.id));
        });
      }
      if (p.assignees && p.assignees.length > 0) {
        composeAssigneeSelect.value = p.assignees[0];
      }
    } else {
      composeTitle.textContent = 'Soạn Bài Viết Mới Cho Chiến Dịch REBOX';
      const todayStr = defaultDate || state.currentDate.toISOString().split('T')[0];
      composeDateInput.value = todayStr;
      composeTimeInput.value = '11:15';
      document.getElementById('compose-format-input').value = 'Bài viết, thông cáo báo chí';
      document.getElementById('compose-status').value = 'scheduled';
      if (composeAdsInput) composeAdsInput.value = '';
      const firstPill = profilePillsWrap.querySelector('[data-id="facebook"]');
      if (firstPill) firstPill.classList.add('selected');
    }

    updateCharCount();
    composeOverlay.classList.add('active');
  }

  function closeComposeDrawer() {
    composeOverlay.classList.remove('active');
  }

  function renderProfilePills() {
    profilePillsWrap.innerHTML = '';
    Object.values(PLATFORMS).forEach(plat => {
      const pill = document.createElement('div');
      pill.className = 'profile-pill-item';
      pill.dataset.id = plat.id;
      const icon = PLATFORM_ICONS[plat.id] || '';
      pill.innerHTML = `${icon}<span>${plat.name}</span>`;
      pill.addEventListener('click', () => {
        pill.classList.toggle('selected');
      });
      profilePillsWrap.appendChild(pill);
    });
  }

  function getSelectedPlatforms() {
    const selected = profilePillsWrap.querySelectorAll('.profile-pill-item.selected');
    const ids = Array.from(selected).map(p => p.dataset.id);
    if (ids.length === 0) return ['facebook'];
    return ids;
  }

  function renderAssigneeSelect() {
    composeAssigneeSelect.innerHTML = '';
    const members = store.getMembers().filter(m => m.id !== 'all');
    members.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `${m.name} (${m.role})${m.phone ? ' - SĐT: ' + m.phone : ''}`;
      composeAssigneeSelect.appendChild(opt);
    });
  }

  function updateCharCount() {
    const len = composeTextarea.value.length;
    charCounter.textContent = `${len} ký tự`;
  }

  function openRemindModal(postId) {
    const p = store.getPostById(postId);
    if (!p) return;

    const plat = PLATFORMS[p.platforms[0]] || PLATFORMS.facebook;
    const status = POST_STATUSES[p.status] || POST_STATUSES.scheduled;
    const assignees = (p.assignees || []).map(id => {
      const m = store.getMemberById(id);
      return m ? `${m.name} (${m.phone})` : id;
    }).join(', ');

    const text = `[THONG BAO NHIEM VU TRUYEN THONG - DU AN REBOX]
------------------------------------------------------------
Tieu de: ${p.title.toUpperCase()}
Giai doan: ${p.phase || 'Ke hoach REBOX'}
Dinh dang: ${p.format || 'Bai viet'}
Kenh xuat ban: ${plat.name}
Thoi gian dang: ${p.time} ngay ${formatDateDisplay(p.date)}
Trang thai: ${status.name}
Nhan su phu trach: ${assignees}

Noi dung chu chot:
${p.content || 'Xem chi tiet tai he thong REBOX'}

Ghi chu / KPI / Chay ads:
${p.note || 'Khong co ghi chu dac biet'}
------------------------------------------------------------
De nghi team Content, Design, Media chu dong phoi hop dung tien do!`;

    remindTextBox.textContent = text;
    remindModal.classList.add('active');
  }

  function showToast(msg) {
    const container = document.getElementById('toast-box');
    const t = document.createElement('div');
    t.className = 'sprout-toast';
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transition = 'opacity 0.2s';
      setTimeout(() => t.remove(), 200);
    }, 2600);
  }

  // --- BIND EVENTS ---
  function bindEvents() {
    sidebarItems.forEach(item => {
      item.addEventListener('click', () => {
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        state.currentView = item.dataset.view;

        // Nếu bấm vào giai đoạn 1, 2, 3 thì nhảy tới ngày đầu tháng tương ứng
        if (item.dataset.view === 'phase1') {
          state.currentDate = new Date('2026-12-01');
          state.weekStartDate = getMonday(new Date('2026-12-01'));
          state.selectedPhase = 'Giai đoạn 1 (T12/2026)';
        } else if (item.dataset.view === 'phase2') {
          state.currentDate = new Date('2027-01-01');
          state.weekStartDate = getMonday(new Date('2027-01-01'));
          state.selectedPhase = 'Giai đoạn 2 (T01/2027)';
        } else if (item.dataset.view === 'phase3') {
          state.currentDate = new Date('2027-02-01');
          state.weekStartDate = getMonday(new Date('2027-02-01'));
          state.selectedPhase = 'Giai đoạn 3 (T02/2027)';
        } else if (item.dataset.view === 'calendar') {
          state.selectedPhase = 'all';
        }

        renderMemberFilterBar();
        renderCurrentView();
      });
    });

    btnModeWeek.addEventListener('click', () => {
      btnModeWeek.classList.add('active');
      btnModeMonth.classList.remove('active');
      state.calendarMode = 'week';
      if (state.currentView === 'members' || state.currentView === 'brand') {
        switchView('calendar');
      } else {
        renderCurrentView();
      }
    });

    btnModeMonth.addEventListener('click', () => {
      btnModeMonth.classList.add('active');
      btnModeWeek.classList.remove('active');
      state.calendarMode = 'month';
      if (state.currentView === 'members' || state.currentView === 'brand') {
        switchView('calendar');
      } else {
        renderCurrentView();
      }
    });

    document.getElementById('btn-nav-prev').addEventListener('click', () => {
      if (state.calendarMode === 'week') {
        state.weekStartDate.setDate(state.weekStartDate.getDate() - 7);
        state.currentDate.setDate(state.currentDate.getDate() - 7);
      } else {
        state.currentDate.setMonth(state.currentDate.getMonth() - 1);
        state.weekStartDate = getMonday(state.currentDate);
      }
      if (state.currentView === 'members' || state.currentView === 'brand') {
        switchView('calendar');
      } else {
        renderCurrentView();
      }
    });

    document.getElementById('btn-nav-next').addEventListener('click', () => {
      if (state.calendarMode === 'week') {
        state.weekStartDate.setDate(state.weekStartDate.getDate() + 7);
        state.currentDate.setDate(state.currentDate.getDate() + 7);
      } else {
        state.currentDate.setMonth(state.currentDate.getMonth() + 1);
        state.weekStartDate = getMonday(state.currentDate);
      }
      if (state.currentView === 'members' || state.currentView === 'brand') {
        switchView('calendar');
      } else {
        renderCurrentView();
      }
    });

    document.getElementById('btn-nav-today').addEventListener('click', () => {
      // Trở lại mốc đầu chiến dịch 01/12/2026
      state.currentDate = new Date('2026-12-01');
      state.weekStartDate = getMonday(new Date('2026-12-01'));
      if (state.currentView === 'members' || state.currentView === 'brand') {
        switchView('calendar');
      } else {
        renderCurrentView();
      }
    });

    document.getElementById('btn-open-compose').addEventListener('click', () => openComposeDrawer());
    document.getElementById('btn-close-compose').addEventListener('click', closeComposeDrawer);
    document.getElementById('btn-cancel-compose').addEventListener('click', closeComposeDrawer);

    composeTextarea.addEventListener('input', updateCharCount);

    document.querySelectorAll('.optimal-item-row').forEach(row => {
      row.addEventListener('click', () => {
        composeTimeInput.value = row.dataset.time;
        showToast(`Đã áp dụng khung giờ vàng: ${row.dataset.time}`);
      });
    });

    composeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('compose-title-input').value.trim();
      const content = composeTextarea.value.trim();
      const format = document.getElementById('compose-format-input').value.trim();
      const date = composeDateInput.value;
      const time = composeTimeInput.value;
      const status = document.getElementById('compose-status').value;
      const image = composeImageInput.value.trim();
      const ads = composeAdsInput ? composeAdsInput.value.trim() : null;
      const note = composeNoteInput.value.trim();
      const platforms = getSelectedPlatforms();
      const assignees = [composeAssigneeSelect.value];

      const data = {
        title: title || content.slice(0, 40) + '...',
        content,
        format,
        date,
        time,
        status,
        image,
        ads: ads || null,
        note,
        platforms,
        assignees
      };

      if (state.editingPostId) {
        store.updatePost(state.editingPostId, data);
        showToast('Đã cập nhật bài viết thành công!');
      } else {
        store.addPost(data);
        showToast('Đã thêm bài viết mới vào chiến dịch REBOX!');
      }

      closeComposeDrawer();
      if (state.currentView === 'members' || state.currentView === 'brand') {
        switchView('calendar');
      } else {
        renderCurrentView();
      }
    });

    document.getElementById('btn-save-draft').addEventListener('click', () => {
      document.getElementById('compose-status').value = 'draft';
      composeForm.dispatchEvent(new Event('submit'));
    });

    const searchInput = document.getElementById('search-posts-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchKeyword = e.target.value;
        if (state.currentView === 'members' || state.currentView === 'brand') {
          switchView('calendar');
        } else {
          renderCurrentView();
        }
      });
    }

    document.getElementById('form-contact-config').addEventListener('submit', (e) => {
      e.preventDefault();
      if (state.editingContactKey) {
        const val = contactConfigInput.value.trim() || 'Chưa thiết lập';
        store.updateContact(state.editingContactKey, val);
        contactConfigModal.classList.remove('active');
        renderBrandAndContacts();
        showToast('Đã lưu cấu hình kênh liên hệ!');
      }
    });

    document.getElementById('btn-close-contact-config').addEventListener('click', () => {
      contactConfigModal.classList.remove('active');
    });

    document.getElementById('btn-open-add-member').addEventListener('click', () => {
      openEditMemberModal();
    });

    document.getElementById('btn-close-member-modal').addEventListener('click', () => {
      memberModal.classList.remove('active');
    });

    memberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = inputMemberName.value.trim();
      const role = inputMemberRole.value.trim();
      const phone = inputMemberPhone.value.trim();
      const email = inputMemberEmail.value.trim();
      const dob = inputMemberDob.value;

      if (!name) return;
      const words = name.split(' ');
      const code = words.length > 1 ? (words[0][0] + words[words.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();

      const memberData = {
        name,
        role: role || 'Thành viên',
        phone,
        email,
        dob,
        code
      };

      if (state.editingMemberId) {
        store.updateMember(state.editingMemberId, memberData);
        showToast(`Đã cập nhật nhân sự: ${name}`);
      } else {
        memberData.color = '#0073e6';
        store.addMember(memberData);
        showToast(`Đã thêm nhân sự: ${name}`);
      }

      memberModal.classList.remove('active');
      renderMembersManagement();
      renderMemberFilterBar();
    });

    document.getElementById('btn-copy-remind').addEventListener('click', () => {
      navigator.clipboard.writeText(remindTextBox.textContent).then(() => {
        showToast('Đã sao chép nội dung thông báo vào bộ nhớ tạm!');
      }).catch(() => {
        showToast('Vui lòng chọn văn bản và bấm Ctrl+C');
      });
    });
    document.getElementById('btn-close-remind').addEventListener('click', () => {
      remindModal.classList.remove('active');
    });

    document.getElementById('btn-export-json').addEventListener('click', () => {
      const json = store.exportData();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `REBOX_Campaign_TayThi_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Đã xuất file sao lưu dữ liệu toàn bộ!');
    });

    document.getElementById('input-import-json').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const ok = store.importData(event.target.result);
        if (ok) {
          showToast('Khôi phục dữ liệu thành công 100%!');
          renderCurrentView();
          renderMemberFilterBar();
        } else {
          alert('Tệp dữ liệu không hợp lệ!');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }
});
