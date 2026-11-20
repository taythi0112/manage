/**
 * App UI Logic & Calendar Rendering
 * Tương tác giao diện, lịch tháng, danh sách, bộ lọc, modal & thông báo
 */

document.addEventListener('DOMContentLoaded', () => {
  const store = window.appStore;

  // Trạng thái ứng dụng
  const state = {
    currentDate: new Date(),
    viewMode: 'calendar', // 'calendar' hoặc 'agenda'
    selectedMemberId: 'all',
    searchKeyword: '',
    selectedCategories: Object.keys(CATEGORIES),
    editingEventId: null
  };

  // DOM Elements
  const memberListEl = document.getElementById('member-list');
  const categoryFiltersEl = document.getElementById('category-filters');
  const currentPeriodTitleEl = document.getElementById('current-period-title');
  const calendarViewContainer = document.getElementById('calendar-view-container');
  const agendaViewContainer = document.getElementById('agenda-view-container');
  const searchInput = document.getElementById('search-input');
  const notificationCountBadge = document.getElementById('notification-badge');
  const notifListEl = document.getElementById('notif-list');
  const notifPanel = document.getElementById('notification-panel');

  // Modals
  const eventModal = document.getElementById('event-modal');
  const eventForm = document.getElementById('event-form');
  const modalTitle = document.getElementById('modal-title');
  const deleteEventBtn = document.getElementById('btn-delete-event');
  const memberChipsContainer = document.getElementById('member-chips');
  const memberManageModal = document.getElementById('member-manage-modal');
  const shareModal = document.getElementById('share-modal');
  const shareContentBox = document.getElementById('share-content-box');

  // Khởi chạy ứng dụng
  initUI();

  function initUI() {
    renderMembersSidebar();
    renderCategoryFilters();
    renderView();
    updateNotificationBadge();
    bindEvents();
  }

  // --- Rendering Functions ---

  function renderMembersSidebar() {
    const members = store.getMembers();
    const events = store.getEvents();

    memberListEl.innerHTML = '';
    members.forEach(member => {
      // Đếm số lịch của từng người
      let count = 0;
      if (member.id === 'all') {
        count = events.length;
      } else {
        count = events.filter(e => e.assignees && e.assignees.includes(member.id)).length;
      }

      const item = document.createElement('div');
      item.className = `member-item ${state.selectedMemberId === member.id ? 'active' : ''}`;
      item.dataset.id = member.id;

      const avatarStyle = member.id === 'all' 
        ? 'background: #2563eb; color: white;' 
        : `background: ${member.color || '#3b82f6'};`;

      item.innerHTML = `
        <div class="member-avatar" style="${avatarStyle}">
          ${member.avatar || member.name.charAt(0)}
        </div>
        <div class="member-info">
          <div class="member-name">${member.name}</div>
          <div class="member-role">${member.role || 'Thành viên'}</div>
        </div>
        <span class="member-count">${count}</span>
      `;

      item.addEventListener('click', () => {
        state.selectedMemberId = member.id;
        renderMembersSidebar();
        renderView();
        updateNotificationBadge();
      });

      memberListEl.appendChild(item);
    });
  }

  function renderCategoryFilters() {
    categoryFiltersEl.innerHTML = '';
    Object.values(CATEGORIES).forEach(cat => {
      const isEnabled = state.selectedCategories.includes(cat.id);
      const tag = document.createElement('div');
      tag.className = `category-tag ${!isEnabled ? 'disabled' : ''}`;
      tag.innerHTML = `
        <span class="cat-dot" style="background: ${cat.color};"></span>
        <span>${cat.name}</span>
      `;
      tag.addEventListener('click', () => {
        if (isEnabled) {
          state.selectedCategories = state.selectedCategories.filter(c => c !== cat.id);
        } else {
          state.selectedCategories.push(cat.id);
        }
        renderCategoryFilters();
        renderView();
      });
      categoryFiltersEl.appendChild(tag);
    });
  }

  function renderView() {
    updatePeriodTitle();
    const filteredEvents = store.filterEvents({
      memberId: state.selectedMemberId,
      keyword: state.searchKeyword,
      categories: state.selectedCategories
    });

    if (state.viewMode === 'calendar') {
      calendarViewContainer.style.display = 'block';
      agendaViewContainer.style.display = 'none';
      renderCalendar(filteredEvents);
    } else {
      calendarViewContainer.style.display = 'none';
      agendaViewContainer.style.display = 'flex';
      renderAgenda(filteredEvents);
    }
  }

  function updatePeriodTitle() {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth() + 1;
    currentPeriodTitleEl.textContent = `Tháng ${month} / ${year}`;
  }

  // --- Render Month Calendar ---
  function renderCalendar(events) {
    const calendarGrid = document.getElementById('calendar-days-grid');
    calendarGrid.innerHTML = '';

    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();

    // Ngày đầu tiên và ngày cuối cùng của tháng
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Tính thứ của ngày đầu tiên (Chủ nhật = 0, Thứ hai = 1,...)
    // Chuyển về: Thứ 2 = 0, ..., Chủ Nhật = 6
    let startingDayOfWeek = firstDay.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const totalDays = lastDay.getDate();

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();

    // Các ngày của tháng trước để lấp đầy hàng đầu
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const cell = document.createElement('div');
      cell.className = 'calendar-cell other-month';
      cell.innerHTML = `
        <div class="day-header"><span class="day-number">${dayNum}</span></div>
      `;
      calendarGrid.appendChild(cell);
    }

    // Các ngày trong tháng hiện tại
    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement('div');
      const isToday = isCurrentMonth && day === todayDate;
      cell.className = `calendar-cell ${isToday ? 'today' : ''}`;

      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.startDate <= dateStr && e.endDate >= dateStr);

      let eventsHtml = '';
      const maxDisplay = 3;
      const displayEvents = dayEvents.slice(0, maxDisplay);

      displayEvents.forEach(evt => {
        const cat = CATEGORIES[evt.category] || CATEGORIES.hop;
        eventsHtml += `
          <div class="event-capsule" 
               style="background: ${cat.bg}; color: ${cat.color}; border-left-color: ${cat.color};"
               data-event-id="${evt.id}"
               title="${evt.startTime} ${evt.title}">
            <span>${evt.startTime}</span>
            <span style="overflow:hidden;text-overflow:ellipsis;">${evt.title}</span>
          </div>
        `;
      });

      if (dayEvents.length > maxDisplay) {
        eventsHtml += `
          <button class="event-more-btn" data-date="${dateStr}">
            +${dayEvents.length - maxDisplay} lịch nữa...
          </button>
        `;
      }

      cell.innerHTML = `
        <div class="day-header">
          <span class="day-number">${day}</span>
          ${isToday ? '<span style="font-size: 0.65rem; color: var(--primary); font-weight:700;">Hôm nay</span>' : ''}
        </div>
        <div class="cell-events">${eventsHtml}</div>
      `;

      // Bấm vào ô ngày để tạo nhanh lịch trình cho ngày đó
      cell.addEventListener('click', (e) => {
        if (e.target.closest('.event-capsule')) {
          const evtId = e.target.closest('.event-capsule').dataset.eventId;
          openEditEventModal(evtId);
          return;
        }
        if (e.target.closest('.event-more-btn')) {
          // Chuyển sang xem danh sách ngày đó
          state.viewMode = 'agenda';
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'agenda'));
          renderView();
          return;
        }
        openCreateEventModal(dateStr);
      });

      calendarGrid.appendChild(cell);
    }

    // Lấp đầy các ô trống còn lại của tuần cuối
    const totalCells = startingDayOfWeek + totalDays;
    const remainingDays = (7 - (totalCells % 7)) % 7;
    for (let day = 1; day <= remainingDays; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-cell other-month';
      cell.innerHTML = `
        <div class="day-header"><span class="day-number">${day}</span></div>
      `;
      calendarGrid.appendChild(cell);
    }
  }

  // --- Render Agenda / List View ---
  function renderAgenda(events) {
    agendaViewContainer.innerHTML = '';

    if (events.length === 0) {
      agendaViewContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📅</div>
          <p style="font-weight: 600; font-size: 1rem;">Không có lịch trình nào phù hợp</p>
          <p style="font-size: 0.85rem; margin-top: 0.25rem;">Hãy thử tìm kiếm từ khóa khác hoặc nhấn "+ Thêm lịch mới"</p>
        </div>
      `;
      return;
    }

    // Nhóm sự kiện theo ngày
    const grouped = {};
    events.forEach(evt => {
      const dateKey = evt.startDate;
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(evt);
    });

    // Sắp xếp ngày tăng dần
    const sortedDates = Object.keys(grouped).sort();

    sortedDates.forEach(dateStr => {
      const groupEl = document.createElement('div');
      groupEl.className = 'agenda-group';

      const d = new Date(dateStr + 'T00:00:00');
      const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const dayName = daysOfWeek[d.getDay()];
      const formattedDate = `${dayName}, ngày ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

      let itemsHtml = '';
      grouped[dateStr].forEach(evt => {
        const cat = CATEGORIES[evt.category] || CATEGORIES.hop;
        const priorityLabels = { high: 'Khẩn cấp', medium: 'Quan trọng', low: 'Bình thường' };

        // Tên những người phụ trách
        const assigneeNames = (evt.assignees || []).map(id => {
          const m = store.getMemberById(id);
          return m ? m.name : id;
        }).join(', ');

        itemsHtml += `
          <div class="agenda-item" data-id="${evt.id}">
            <div class="agenda-time">
              <span>🕒</span> ${evt.startTime} - ${evt.endTime}
            </div>
            <div class="agenda-details">
              <div class="agenda-title">
                <span>${evt.title}</span>
                <span class="badge ${cat.badgeClass}">${cat.name}</span>
                <span class="badge priority-${evt.priority}">${priorityLabels[evt.priority] || ''}</span>
              </div>
              <div class="agenda-desc">
                📍 <strong>Địa điểm:</strong> ${evt.location || 'Chưa ghi rõ'} &nbsp;|&nbsp; 
                👤 <strong>Phụ trách:</strong> ${assigneeNames || 'Tất cả'}
              </div>
              ${evt.note ? `<div class="agenda-desc" style="margin-top: 0.25rem; color: #475569;">📝 <em>${evt.note}</em></div>` : ''}
            </div>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-secondary btn-icon btn-share-evt" title="Soạn thông báo gửi Zalo/Email" data-id="${evt.id}">
                📤
              </button>
              <button class="btn btn-secondary btn-icon btn-edit-evt" title="Chỉnh sửa lịch" data-id="${evt.id}">
                ✏️
              </button>
            </div>
          </div>
        `;
      });

      groupEl.innerHTML = `
        <div class="agenda-date-header">
          <span>${formattedDate}</span>
          <span style="font-size: 0.78rem; font-weight: 500; color: var(--text-muted);">${grouped[dateStr].length} sự kiện</span>
        </div>
        <div class="agenda-list">${itemsHtml}</div>
      `;

      agendaViewContainer.appendChild(groupEl);
    });

    // Gắn sự kiện cho các nút trong agenda view
    agendaViewContainer.querySelectorAll('.btn-edit-evt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditEventModal(btn.dataset.id);
      });
    });

    agendaViewContainer.querySelectorAll('.btn-share-evt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openShareModal(btn.dataset.id);
      });
    });
  }

  // --- Modal: Thêm / Sửa Lịch Trình ---
  function openCreateEventModal(defaultDate = null) {
    state.editingEventId = null;
    modalTitle.textContent = 'Thêm Lịch Trình Mới';
    deleteEventBtn.style.display = 'none';
    eventForm.reset();

    const todayStr = defaultDate || new Date().toISOString().split('T')[0];
    document.getElementById('event-start-date').value = todayStr;
    document.getElementById('event-end-date').value = todayStr;
    document.getElementById('event-start-time').value = '09:00';
    document.getElementById('event-end-time').value = '10:00';

    // Đánh dấu chọn người phụ trách mặc định theo người đang lọc
    renderMemberChips(state.selectedMemberId !== 'all' ? [state.selectedMemberId] : []);
    eventModal.classList.add('active');
  }

  function openEditEventModal(eventId) {
    const evt = store.getEventById(eventId);
    if (!evt) return;

    state.editingEventId = eventId;
    modalTitle.textContent = 'Chỉnh Sửa Lịch Trình';
    deleteEventBtn.style.display = 'inline-flex';

    document.getElementById('event-title').value = evt.title;
    document.getElementById('event-category').value = evt.category;
    document.getElementById('event-priority').value = evt.priority;
    document.getElementById('event-start-date').value = evt.startDate;
    document.getElementById('event-start-time').value = evt.startTime;
    document.getElementById('event-end-date').value = evt.endDate;
    document.getElementById('event-end-time').value = evt.endTime;
    document.getElementById('event-location').value = evt.location || '';
    document.getElementById('event-note').value = evt.note || '';

    renderMemberChips(evt.assignees || []);
    eventModal.classList.add('active');
  }

  function renderMemberChips(selectedIds = []) {
    memberChipsContainer.innerHTML = '';
    const members = store.getMembers().filter(m => m.id !== 'all');

    members.forEach(m => {
      const chip = document.createElement('div');
      const isSelected = selectedIds.includes(m.id);
      chip.className = `member-chip ${isSelected ? 'selected' : ''}`;
      chip.dataset.id = m.id;
      chip.innerHTML = `<span>${m.avatar || '👤'}</span> <span>${m.name}</span>`;

      chip.addEventListener('click', () => {
        chip.classList.toggle('selected');
      });

      memberChipsContainer.appendChild(chip);
    });
  }

  function getSelectedAssigneeIds() {
    const selectedChips = memberChipsContainer.querySelectorAll('.member-chip.selected');
    const ids = Array.from(selectedChips).map(c => c.dataset.id);
    // Nếu không chọn ai, coi như toàn bộ nhân sự
    if (ids.length === 0) {
      return store.getMembers().filter(m => m.id !== 'all').map(m => m.id);
    }
    return ids;
  }

  // --- Modal Thông Báo / Chia Sẻ Qua Zalo/Email ---
  function openShareModal(eventId) {
    const evt = store.getEventById(eventId);
    if (!evt) return;

    const cat = CATEGORIES[evt.category] || CATEGORIES.hop;
    const priorityLabels = { high: '🔴 Khẩn cấp', medium: '🟡 Quan trọng', low: '🟢 Bình thường' };
    const assigneeNames = (evt.assignees || []).map(id => {
      const m = store.getMemberById(id);
      return m ? `${m.name} (${m.role})` : id;
    }).join('\n- ');

    const messageTemplate = `📢 [THÔNG BÁO LỊCH TRÌNH NỘI BỘ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Sự kiện: ${evt.title.toUpperCase()}
📂 Loại: ${cat.name}
⚡ Mức độ: ${priorityLabels[evt.priority] || 'Bình thường'}
🕒 Thời gian: ${evt.startTime} - ${evt.endTime} (Ngày ${evt.startDate})
📍 Địa điểm: ${evt.location || 'Tại văn phòng'}
👥 Thành phần tham dự:
- ${assigneeNames}
📝 Nội dung chi tiết:
${evt.note || 'Không có ghi chú thêm.'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Đề nghị các anh/chị sắp xếp công việc tham gia đúng giờ!`;

    shareContentBox.textContent = messageTemplate;
    shareModal.classList.add('active');
  }

  // --- Trung tâm thông báo (Notification Center) ---
  function updateNotificationBadge() {
    const notifs = store.getNotificationsForMember(state.selectedMemberId);
    notificationCountBadge.textContent = notifs.length;
    notificationCountBadge.style.display = notifs.length > 0 ? 'inline-block' : 'none';

    notifListEl.innerHTML = '';
    if (notifs.length === 0) {
      notifListEl.innerHTML = `
        <div style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          🎉 Không có lịch trình sắp tới nào!
        </div>
      `;
      return;
    }

    notifs.forEach(n => {
      const item = document.createElement('div');
      item.className = 'notif-item';
      item.innerHTML = `
        <div class="notif-icon">🔔</div>
        <div class="notif-content">
          <div class="notif-msg">${n.title}</div>
          <div class="notif-sub">🕒 ${n.time} | Ngày ${n.date}</div>
          <div class="notif-sub">📍 ${n.location}</div>
          <div class="notif-sub">👥 ${n.assignees}</div>
          <div class="notif-actions">
            <button class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.72rem;" onclick="window.viewEventFromNotif('${n.eventId}')">
              Xem chi tiết
            </button>
            <button class="btn btn-primary" style="padding: 0.2rem 0.5rem; font-size: 0.72rem;" onclick="window.shareEventFromNotif('${n.eventId}')">
              Gửi thông báo
            </button>
          </div>
        </div>
      `;
      notifListEl.appendChild(item);
    });
  }

  window.viewEventFromNotif = function(eventId) {
    notifPanel.classList.remove('active');
    openEditEventModal(eventId);
  };

  window.shareEventFromNotif = function(eventId) {
    notifPanel.classList.remove('active');
    openShareModal(eventId);
  };

  // Toast Notification
  function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✅</span> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Event Listeners ---
  function bindEvents() {
    // Chuyển view Calendar / Agenda
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.viewMode = btn.dataset.view;
        renderView();
      });
    });

    // Điều hướng ngày tháng
    document.getElementById('btn-prev-month').addEventListener('click', () => {
      state.currentDate.setMonth(state.currentDate.getMonth() - 1);
      renderView();
    });
    document.getElementById('btn-next-month').addEventListener('click', () => {
      state.currentDate.setMonth(state.currentDate.getMonth() + 1);
      renderView();
    });
    document.getElementById('btn-today').addEventListener('click', () => {
      state.currentDate = new Date();
      renderView();
    });

    // Tìm kiếm
    searchInput.addEventListener('input', (e) => {
      state.searchKeyword = e.target.value;
      renderView();
    });

    // Nút mở modal thêm lịch
    document.getElementById('btn-add-schedule').addEventListener('click', () => {
      openCreateEventModal();
    });

    // Đóng modal
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // Submit form thêm / sửa lịch
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const eventData = {
        title: document.getElementById('event-title').value.trim(),
        category: document.getElementById('event-category').value,
        priority: document.getElementById('event-priority').value,
        startDate: document.getElementById('event-start-date').value,
        startTime: document.getElementById('event-start-time').value,
        endDate: document.getElementById('event-end-date').value,
        endTime: document.getElementById('event-end-time').value,
        location: document.getElementById('event-location').value.trim(),
        note: document.getElementById('event-note').value.trim(),
        assignees: getSelectedAssigneeIds()
      };

      if (state.editingEventId) {
        store.updateEvent(state.editingEventId, eventData);
        showToast('Đã cập nhật lịch trình thành công!');
      } else {
        store.addEvent(eventData);
        showToast('Đã tạo lịch trình mới thành công!');
      }

      eventModal.classList.remove('active');
      renderMembersSidebar();
      renderView();
      updateNotificationBadge();
    });

    // Xóa lịch trình
    deleteEventBtn.addEventListener('click', () => {
      if (state.editingEventId && confirm('Bạn có chắc chắn muốn xóa lịch trình này không?')) {
        store.deleteEvent(state.editingEventId);
        eventModal.classList.remove('active');
        showToast('Đã xóa lịch trình!');
        renderMembersSidebar();
        renderView();
        updateNotificationBadge();
      }
    });

    // Mở / Đóng bảng thông báo
    document.getElementById('btn-notification-bell').addEventListener('click', (e) => {
      e.stopPropagation();
      notifPanel.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!notifPanel.contains(e.target) && e.target.id !== 'btn-notification-bell') {
        notifPanel.classList.remove('active');
      }
    });

    // Copy nội dung thông báo
    document.getElementById('btn-copy-share').addEventListener('click', () => {
      const text = shareContentBox.textContent;
      navigator.clipboard.writeText(text).then(() => {
        showToast('Đã copy nội dung thông báo vào bộ nhớ tạm!');
      }).catch(() => {
        showToast('Vui lòng chọn và copy nội dung bằng phím tắt Ctrl+C');
      });
    });

    // Nút thông báo Web Notification của trình duyệt
    document.getElementById('btn-request-web-notif').addEventListener('click', () => {
      if (!('Notification' in window)) {
        alert('Trình duyệt này không hỗ trợ Web Notification.');
        return;
      }
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showToast('Đã bật quyền thông báo trình duyệt!');
          new Notification('Hệ Thống Lịch Nội Bộ', {
            body: 'Tính năng thông báo lịch trình đã sẵn sàng hoạt động!',
            icon: 'favicon.ico'
          });
        } else {
          alert('Quyền thông báo bị từ chối.');
        }
      });
    });

    // Quản lý Nhân sự Modal
    document.getElementById('btn-manage-members').addEventListener('click', () => {
      renderManageMembersTable();
      memberManageModal.classList.add('active');
    });

    document.getElementById('member-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-member-name').value.trim();
      const role = document.getElementById('new-member-role').value.trim();
      const email = document.getElementById('new-member-email').value.trim();
      const phone = document.getElementById('new-member-phone').value.trim();

      if (!name) return;

      const colors = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const words = name.split(' ');
      const avatar = words.length > 1 
        ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
        : name.substr(0, 2).toUpperCase();

      store.addMember({
        name,
        role: role || 'Thành viên',
        email,
        phone,
        color: randomColor,
        avatar
      });

      document.getElementById('member-form').reset();
      renderManageMembersTable();
      renderMembersSidebar();
      showToast(`Đã thêm nhân sự: ${name}`);
    });

    // Export Data JSON
    document.getElementById('btn-export-data').addEventListener('click', () => {
      const json = store.exportData();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Lich_Noi_Bo_Backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Đã tải xuống file sao lưu dữ liệu!');
    });

    // Import Data JSON
    document.getElementById('input-import-file').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const success = store.importData(event.target.result);
        if (success) {
          showToast('Khôi phục dữ liệu thành công!');
          renderMembersSidebar();
          renderView();
          updateNotificationBadge();
        } else {
          alert('File không hợp lệ hoặc sai định dạng!');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }

  function renderManageMembersTable() {
    const listContainer = document.getElementById('manage-members-list');
    const members = store.getMembers().filter(m => m.id !== 'all');
    listContainer.innerHTML = '';

    members.forEach(m => {
      const row = document.createElement('div');
      row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid var(--border-light);';
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <div class="member-avatar" style="background: ${m.color || '#3b82f6'};">${m.avatar}</div>
          <div>
            <div style="font-weight: 600; font-size: 0.85rem;">${m.name}</div>
            <div style="font-size: 0.74rem; color: var(--text-muted);">${m.role} &bull; ${m.email || 'Chưa có email'}</div>
          </div>
        </div>
        <button class="btn btn-danger" style="padding: 0.25rem 0.6rem; font-size: 0.72rem;" data-id="${m.id}">Xóa</button>
      `;

      row.querySelector('button').addEventListener('click', () => {
        if (confirm(`Bạn có chắc chắn muốn xóa nhân sự "${m.name}" khỏi danh sách?`)) {
          store.deleteMember(m.id);
          renderManageMembersTable();
          renderMembersSidebar();
          renderView();
          updateNotificationBadge();
          showToast(`Đã xóa nhân sự: ${m.name}`);
        }
      });

      listContainer.appendChild(row);
    });
  }
});
