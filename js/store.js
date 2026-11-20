/**
 * Data Storage & State Management
 * Quản lý dữ liệu LocalStorage, nhân sự, danh mục và lịch trình
 */

const DEFAULT_MEMBERS = [
  { id: 'all', name: 'Tất cả nhân sự', role: 'Toàn bộ công ty', avatar: '👥', color: '#2563eb' },
  { id: 'nv1', name: 'Nguyễn Văn An', role: 'Trưởng phòng Kế hoạch', avatar: 'AN', color: '#3b82f6', phone: '0912345678', email: 'an.nv@noibo.vn' },
  { id: 'nv2', name: 'Trần Thị Bình', role: 'Chuyên viên Nhân sự', avatar: 'TB', color: '#ec4899', phone: '0923456789', email: 'binh.tt@noibo.vn' },
  { id: 'nv3', name: 'Lê Hoàng Cường', role: 'Kỹ sư Phần mềm', avatar: 'LC', color: '#10b981', phone: '0934567890', email: 'cuong.lh@noibo.vn' },
  { id: 'nv4', name: 'Phạm Thị Dung', role: 'Kế toán trưởng', avatar: 'PD', color: '#f59e0b', phone: '0945678901', email: 'dung.pt@noibo.vn' },
  { id: 'nv5', name: 'Vũ Đức Em', role: 'Nhân viên Kinh doanh', avatar: 'VE', color: '#8b5cf6', phone: '0956789012', email: 'em.vd@noibo.vn' }
];

const CATEGORIES = {
  hop: { id: 'hop', name: 'Họp nội bộ / Khách hàng', color: '#2563eb', bg: '#dbeafe', badgeClass: 'badge-hop' },
  congtac: { id: 'congtac', name: 'Đi công tác / Gặp đối tác', color: '#d97706', bg: '#fef3c7', badgeClass: 'badge-congtac' },
  deadline: { id: 'deadline', name: 'Hạn chót (Deadline)', color: '#dc2626', bg: '#fee2e2', badgeClass: 'badge-deadline' },
  catruc: { id: 'catruc', name: 'Ca trực / Vận hành', color: '#4f46e5', bg: '#e0e7ff', badgeClass: 'badge-catruc' },
  sukien: { id: 'sukien', name: 'Sự kiện chung', color: '#16a34a', bg: '#dcfce7', badgeClass: 'badge-sukien' }
};

// Khởi tạo một số sự kiện mẫu gần với ngày hiện tại
function generateSampleEvents() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = now.getDate();

  const pad = (n) => String(n).padStart(2, '0');

  return [
    {
      id: 'evt_1',
      title: 'Họp giao ban đầu tuần',
      category: 'hop',
      priority: 'high',
      startDate: `${y}-${m}-${pad(d)}`,
      startTime: '08:30',
      endDate: `${y}-${m}-${pad(d)}`,
      endTime: '09:30',
      location: 'Phòng họp VIP 1 & Google Meet',
      assignees: ['nv1', 'nv2', 'nv3', 'nv4', 'nv5'],
      note: 'Báo cáo tiến độ tuần trước và triển khai kế hoạch tuần mới.'
    },
    {
      id: 'evt_2',
      title: 'Gặp gỡ và ký kết Hợp đồng A-Z',
      category: 'congtac',
      priority: 'high',
      startDate: `${y}-${m}-${pad(d)}`,
      startTime: '14:00',
      endDate: `${y}-${m}-${pad(d)}`,
      endTime: '16:00',
      location: 'Trụ sở khách hàng Tân Bình',
      assignees: ['nv1', 'nv5'],
      note: 'Mang theo hợp đồng in sẵn và tài liệu giới thiệu giải pháp.'
    },
    {
      id: 'evt_3',
      title: 'Hạn nộp báo cáo Thuế Quý',
      category: 'deadline',
      priority: 'high',
      startDate: `${y}-${m}-${pad(Math.min(28, d + 1))}`,
      startTime: '17:00',
      endDate: `${y}-${m}-${pad(Math.min(28, d + 1))}`,
      endTime: '18:00',
      location: 'Văn phòng Kế toán',
      assignees: ['nv4'],
      note: 'Kiểm tra kỹ các hóa đơn GTGT đầu vào trước khi nộp.'
    },
    {
      id: 'evt_4',
      title: 'Phỏng vấn ứng viên Lập trình viên',
      category: 'hop',
      priority: 'medium',
      startDate: `${y}-${m}-${pad(Math.min(28, d + 2))}`,
      startTime: '10:00',
      endDate: `${y}-${m}-${pad(Math.min(28, d + 2))}`,
      endTime: '11:00',
      location: 'Phòng họp nhỏ 2',
      assignees: ['nv2', 'nv3'],
      note: 'Xem trước CV của ứng viên trên hệ thống tuyển dụng.'
    },
    {
      id: 'evt_5',
      title: 'Ca trực hệ thống cuối tuần',
      category: 'catruc',
      priority: 'medium',
      startDate: `${y}-${m}-${pad(Math.min(28, d + 3))}`,
      startTime: '08:00',
      endDate: `${y}-${m}-${pad(Math.min(28, d + 3))}`,
      endTime: '17:00',
      location: 'Online / Trực từ xa',
      assignees: ['nv3'],
      note: 'Đảm bảo thời gian phản hồi sự cố server dưới 15 phút.'
    },
    {
      id: 'evt_6',
      title: 'Workshop chia sẻ kỹ năng nội bộ',
      category: 'sukien',
      priority: 'low',
      startDate: `${y}-${m}-${pad(Math.min(28, d + 4))}`,
      startTime: '15:30',
      endDate: `${y}-${m}-${pad(Math.min(28, d + 4))}`,
      endTime: '17:00',
      location: 'Sảnh sinh hoạt chung',
      assignees: ['nv1', 'nv2', 'nv3', 'nv4', 'nv5'],
      note: 'Có teabreak và giao lưu gắn kết các phòng ban.'
    }
  ];
}

class Store {
  constructor() {
    this.STORAGE_KEY_EVENTS = 'NOIBO_SCHEDULE_EVENTS_V1';
    this.STORAGE_KEY_MEMBERS = 'NOIBO_SCHEDULE_MEMBERS_V1';
    this.init();
  }

  init() {
    // Load members
    const rawMembers = localStorage.getItem(this.STORAGE_KEY_MEMBERS);
    if (!rawMembers) {
      localStorage.setItem(this.STORAGE_KEY_MEMBERS, JSON.stringify(DEFAULT_MEMBERS));
      this.members = [...DEFAULT_MEMBERS];
    } else {
      try {
        this.members = JSON.parse(rawMembers);
      } catch (e) {
        this.members = [...DEFAULT_MEMBERS];
      }
    }

    // Load events
    const rawEvents = localStorage.getItem(this.STORAGE_KEY_EVENTS);
    if (!rawEvents) {
      const initialEvents = generateSampleEvents();
      localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(initialEvents));
      this.events = initialEvents;
    } else {
      try {
        this.events = JSON.parse(rawEvents);
      } catch (e) {
        this.events = generateSampleEvents();
      }
    }
  }

  saveEvents() {
    localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(this.events));
  }

  saveMembers() {
    localStorage.setItem(this.STORAGE_KEY_MEMBERS, JSON.stringify(this.members));
  }

  // --- Member Actions ---
  getMembers() {
    return this.members;
  }

  getMemberById(id) {
    return this.members.find(m => m.id === id);
  }

  addMember(member) {
    member.id = 'nv_' + Date.now();
    this.members.push(member);
    this.saveMembers();
    return member;
  }

  deleteMember(id) {
    if (id === 'all') return;
    this.members = this.members.filter(m => m.id !== id);
    // Xóa thành viên này khỏi các sự kiện đang gán
    this.events.forEach(evt => {
      evt.assignees = evt.assignees.filter(aId => aId !== id);
    });
    this.saveMembers();
    this.saveEvents();
  }

  // --- Event Actions ---
  getEvents() {
    return this.events;
  }

  getEventById(id) {
    return this.events.find(e => e.id === id);
  }

  addEvent(eventData) {
    const newEvent = {
      ...eventData,
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)
    };
    this.events.push(newEvent);
    this.saveEvents();
    return newEvent;
  }

  updateEvent(id, updatedData) {
    const index = this.events.findIndex(e => e.id === id);
    if (index !== -1) {
      this.events[index] = { ...this.events[index], ...updatedData };
      this.saveEvents();
      return this.events[index];
    }
    return null;
  }

  deleteEvent(id) {
    this.events = this.events.filter(e => e.id !== id);
    this.saveEvents();
  }

  // Lọc lịch trình theo người và bộ lọc
  filterEvents({ memberId = 'all', keyword = '', categories = [] }) {
    return this.events.filter(event => {
      // Lọc theo người
      if (memberId !== 'all') {
        if (!event.assignees || !event.assignees.includes(memberId)) {
          return false;
        }
      }

      // Lọc theo danh mục
      if (categories.length > 0 && !categories.includes(event.category)) {
        return false;
      }

      // Lọc theo từ khóa
      if (keyword.trim()) {
        const query = keyword.toLowerCase().trim();
        const matchTitle = (event.title || '').toLowerCase().includes(query);
        const matchLocation = (event.location || '').toLowerCase().includes(query);
        const matchNote = (event.note || '').toLowerCase().includes(query);
        if (!matchTitle && !matchLocation && !matchNote) {
          return false;
        }
      }

      return true;
    });
  }

  // Sinh thông báo lịch trình cho một người cụ thể hoặc toàn thể
  getNotificationsForMember(memberId = 'all') {
    const todayStr = new Date().toISOString().split('T')[0];
    const userEvents = this.events.filter(evt => {
      if (memberId === 'all') return true;
      return evt.assignees && evt.assignees.includes(memberId);
    });

    // Sắp xếp theo ngày tăng dần
    userEvents.sort((a, b) => (a.startDate + a.startTime).localeCompare(b.startDate + b.startTime));

    const notifications = [];

    userEvents.forEach(evt => {
      const isToday = evt.startDate === todayStr;
      const isUpcoming = evt.startDate >= todayStr;

      if (isUpcoming) {
        notifications.push({
          id: 'notif_' + evt.id,
          eventId: evt.id,
          title: evt.title,
          isToday,
          date: evt.startDate,
          time: evt.startTime + ' - ' + evt.endTime,
          location: evt.location || 'Chưa xác định',
          priority: evt.priority,
          assignees: evt.assignees.map(id => this.getMemberById(id)?.name || id).join(', ')
        });
      }
    });

    return notifications;
  }

  // Sao lưu và phục hồi dữ liệu (Backup / Restore)
  exportData() {
    const data = {
      members: this.members,
      events: this.events,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(data, null, 2);
  }

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data && Array.isArray(data.events)) {
        this.events = data.events;
        this.saveEvents();
        if (Array.isArray(data.members)) {
          this.members = data.members;
          this.saveMembers();
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  }

  resetToDefault() {
    localStorage.removeItem(this.STORAGE_KEY_EVENTS);
    localStorage.removeItem(this.STORAGE_KEY_MEMBERS);
    this.init();
  }
}

window.appStore = new Store();
