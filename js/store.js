/**
 * Sprout Social Style - Content Management Store
 * Quản lý Bài đăng, Nhân sự (Chi tiết Tên, SĐT, Email, Ngày sinh), và 15 Kênh Liên Hệ Thương Hiệu
 */

const DEFAULT_BRAND_INFO = {
  brandName: 'Lù Noodle',
  logoUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=160&auto=format&fit=crop&q=80',
  faviconUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=160&auto=format&fit=crop&q=80',
  contacts: {
    address: { label: 'Địa chỉ', value: '261-263 Nguyễn Chí Thanh, Đà Nẵng', iconType: 'location' },
    phone: { label: 'Số điện thoại', value: '0888261263', iconType: 'phone' },
    email: { label: 'Email', value: 'Philumia.sgai@gmail.com', iconType: 'email' },
    taxCode: { label: 'Mã số thuế', value: 'Chưa thiết lập', iconType: 'tax' },
    workingHours: { label: 'Giờ hoạt động', value: '10:00-14:00 or 17:00-20:00', iconType: 'clock' },
    website: { label: 'Website chính thức', value: 'Chưa thiết lập', iconType: 'website' },
    facebook: { label: 'Facebook', value: 'Fanpage Lù Noodle', link: 'https://www.facebook.com/profile.php?id=61565322502332', iconType: 'facebook' },
    instagram: { label: 'Instagram', value: '@lunoodle263', link: 'https://www.instagram.com/lunoodle263', iconType: 'instagram' },
    tiktok: { label: 'Kênh TikTok', value: '@lunoodle_', link: 'https://www.tiktok.com/@lunoodle_', iconType: 'tiktok' },
    youtube: { label: 'Kênh YouTube', value: 'Chưa thiết lập', iconType: 'youtube' },
    shopee: { label: 'Cửa hàng Shopee', value: 'Chưa thiết lập', iconType: 'shopee' },
    zaloPersonal: { label: 'Zalo Cá nhân', value: 'Nhóm nội bộ', link: 'https://zalo.me/g/4489109139625117086/', iconType: 'zalo' },
    zaloOA: { label: 'Zalo OA', value: 'Tài khoản doanh nghiệp', link: 'https://zalo.me/3629713828797931350', iconType: 'zaloOA' },
    orderLink: { label: 'Đường dẫn đặt hàng', value: 'Chưa thiết lập', iconType: 'cart' },
    googleMap: { label: 'Bản đồ Google Map', value: 'Vị trí bản đồ trực tiếp', link: 'https://www.google.com/maps', iconType: 'map' }
  }
};

const DEFAULT_MEMBERS = [
  { 
    id: 'all', 
    name: 'Tất cả nhân sự', 
    role: 'Toàn bộ nhóm', 
    code: 'ALL', 
    color: '#0073e6' 
  },
  { 
    id: 'nv_taythi', 
    name: 'Nguyễn Thị Tây Thi', 
    role: 'Trưởng nhóm Content & Quản lý', 
    code: 'TT', 
    color: '#0073e6', 
    phone: '0888261263', 
    email: 'taythi.nguyen@lùnoodle.vn', 
    dob: '1998-05-15'
  },
  { 
    id: 'nv_cs1', 
    name: 'Cộng sự 1', 
    role: 'Biên tập nội dung (Copywriter)', 
    code: 'CS1', 
    color: '#0ea5e9', 
    phone: '0905123456', 
    email: 'congsu1@lùnoodle.vn', 
    dob: '2001-08-20'
  },
  { 
    id: 'nv_cs2', 
    name: 'Cộng sự 2', 
    role: 'Thiết kế đồ họa (Designer)', 
    code: 'CS2', 
    color: '#8b5cf6', 
    phone: '0905234567', 
    email: 'congsu2@lùnoodle.vn', 
    dob: '2000-11-12'
  },
  { 
    id: 'nv_cs3', 
    name: 'Cộng sự 3', 
    role: 'Sản xuất Video & TikTok Editor', 
    code: 'CS3', 
    color: '#ec4899', 
    phone: '0905345678', 
    email: 'congsu3@lùnoodle.vn', 
    dob: '2002-03-28'
  },
  { 
    id: 'nv_cs4', 
    name: 'Cộng sự 4', 
    role: 'Quản trị viên Fanpage & Seeding', 
    code: 'CS4', 
    color: '#10b981', 
    phone: '0905456789', 
    email: 'congsu4@lùnoodle.vn', 
    dob: '1999-09-09'
  }
];

const PLATFORMS = {
  facebook: { id: 'facebook', name: 'Facebook', code: 'FB', color: '#1877f2', bg: '#e7f3ff' },
  tiktok: { id: 'tiktok', name: 'TikTok', code: 'TT', color: '#111827', bg: '#f3f4f6' },
  instagram: { id: 'instagram', name: 'Instagram', code: 'IG', color: '#c13584', bg: '#fdf2f8' },
  website: { id: 'website', name: 'Website', code: 'WEB', color: '#0284c7', bg: '#e0f2fe' },
  zalo: { id: 'zalo', name: 'Zalo OA', code: 'ZL', color: '#0068ff', bg: '#e0f2fe' },
  youtube: { id: 'youtube', name: 'YouTube', code: 'YT', color: '#dc2626', bg: '#fee2e2' }
};

const POST_STATUSES = {
  draft: { id: 'draft', name: 'Bản nháp', color: '#6b7280', bg: '#f3f4f6' },
  scheduled: { id: 'scheduled', name: 'Đã lên lịch', color: '#0073e6', bg: '#eef6ff' },
  needs_approval: { id: 'needs_approval', name: 'Chờ duyệt', color: '#d97706', bg: '#fef3c7' },
  published: { id: 'published', name: 'Đã xuất bản', color: '#059669', bg: '#ecfdf5' },
  rejected: { id: 'rejected', name: 'Cần sửa đổi', color: '#dc2626', bg: '#fee2e2' }
};

function generateSamplePosts() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = now.getDate();
  const pad = (n) => String(n).padStart(2, '0');

  return [
    {
      id: 'sp_1',
      title: 'Giới thiệu thực đơn mùa đông và ưu đãi thức uống',
      content: 'Không khí se lạnh là thời điểm hoàn hảo để thưởng thức một tô mì ấm nóng tại Lù Noodle. Giảm 20% cho tất cả set combo trưa từ 11h đến 14h hàng ngày.',
      date: `${y}-${m}-${pad(d)}`,
      time: '12:55',
      platforms: ['facebook', 'instagram'],
      assignees: ['nv_taythi', 'nv_cs1'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80',
      note: 'Hình ảnh tô mì bốc khói, kèm hashtag #LuNoodle #DaNangFood.'
    },
    {
      id: 'sp_2',
      title: 'Video hậu trường làm nước dùng hầm xương 12 tiếng',
      content: 'Bí quyết để nước dùng Lù Noodle ngọt thanh tự nhiên chính là quy trình ninh xương ống tươi liên tục trong 12 giờ.',
      date: `${y}-${m}-${pad(d)}`,
      time: '12:42',
      platforms: ['tiktok'],
      assignees: ['nv_cs3'],
      status: 'needs_approval',
      image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&auto=format&fit=crop&q=80',
      note: 'Video ngắn 30s góc cận cảnh, lồng tiếng giới thiệu ấm áp.'
    },
    {
      id: 'sp_3',
      title: 'Gợi ý món ngon cuối tuần cho gia đình và nhóm bạn',
      content: 'Cuối tuần rồi, ghé Lù Noodle 261-263 Nguyễn Chí Thanh nạp năng lượng thôi nào! Đặt bàn trước để nhận vị trí đẹp nhất.',
      date: `${y}-${m}-${pad(Math.min(28, d + 1))}`,
      time: '08:30',
      platforms: ['facebook', 'website'],
      assignees: ['nv_cs2'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80',
      note: 'Thiết kế album 4 ảnh tỉ lệ vuông.'
    },
    {
      id: 'sp_4',
      title: 'Chăm sóc khách quen qua Zalo OA',
      content: 'Gửi mã voucher giảm 10% đến các khách hàng quen đã đăng ký thành viên Zalo OA của Lù Noodle.',
      date: `${y}-${m}-${pad(Math.min(28, d + 1))}`,
      time: '14:30',
      platforms: ['zalo'],
      assignees: ['nv_cs4'],
      status: 'draft',
      image: '',
      note: 'Lên danh sách gửi vào chiều thứ Sáu.'
    },
    {
      id: 'sp_5',
      title: 'Bài viết SEO: Top địa điểm ẩm thực đặc sắc tại Đà Nẵng',
      content: 'Khám phá hương vị mì gia truyền tại trung tâm Đà Nẵng được đông đảo thực khách và du khách yêu thích.',
      date: `${y}-${m}-${pad(Math.min(28, d + 2))}`,
      time: '10:00',
      platforms: ['website', 'facebook'],
      assignees: ['nv_taythi', 'nv_cs1'],
      status: 'needs_approval',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=80',
      note: 'Độ dài 1200 từ chuẩn SEO.'
    }
  ];
}

class SproutStore {
  constructor() {
    this.KEY_POSTS = 'SPROUT_CONTENT_POSTS_V2';
    this.KEY_MEMBERS = 'SPROUT_CONTENT_MEMBERS_V2';
    this.KEY_BRAND = 'SPROUT_CONTENT_BRAND_V2';
    this.init();
  }

  init() {
    // Brand & Contacts
    const rawBrand = localStorage.getItem(this.KEY_BRAND);
    if (!rawBrand) {
      this.brand = JSON.parse(JSON.stringify(DEFAULT_BRAND_INFO));
      this.saveBrand();
    } else {
      try {
        this.brand = JSON.parse(rawBrand);
      } catch (e) {
        this.brand = JSON.parse(JSON.stringify(DEFAULT_BRAND_INFO));
      }
    }

    // Members
    const rawMembers = localStorage.getItem(this.KEY_MEMBERS);
    if (!rawMembers) {
      this.members = [...DEFAULT_MEMBERS];
      this.saveMembers();
    } else {
      try {
        this.members = JSON.parse(rawMembers);
      } catch (e) {
        this.members = [...DEFAULT_MEMBERS];
      }
    }

    // Posts
    const rawPosts = localStorage.getItem(this.KEY_POSTS);
    if (!rawPosts) {
      this.posts = generateSamplePosts();
      this.savePosts();
    } else {
      try {
        this.posts = JSON.parse(rawPosts);
      } catch (e) {
        this.posts = generateSamplePosts();
      }
    }
  }

  saveBrand() {
    localStorage.setItem(this.KEY_BRAND, JSON.stringify(this.brand));
  }

  saveMembers() {
    localStorage.setItem(this.KEY_MEMBERS, JSON.stringify(this.members));
  }

  savePosts() {
    localStorage.setItem(this.KEY_POSTS, JSON.stringify(this.posts));
  }

  // --- Brand & Contacts ---
  getBrand() {
    return this.brand;
  }

  updateContact(key, value) {
    if (this.brand && this.brand.contacts && this.brand.contacts[key]) {
      this.brand.contacts[key].value = value;
      this.saveBrand();
      return true;
    }
    return false;
  }

  // --- Members ---
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

  updateMember(id, data) {
    const idx = this.members.findIndex(m => m.id === id);
    if (idx !== -1) {
      this.members[idx] = { ...this.members[idx], ...data };
      this.saveMembers();
      return this.members[idx];
    }
    return null;
  }

  deleteMember(id) {
    if (id === 'all' || id === 'nv_taythi') return;
    this.members = this.members.filter(m => m.id !== id);
    this.posts.forEach(p => {
      if (p.assignees) {
        p.assignees = p.assignees.filter(aId => aId !== id);
      }
    });
    this.saveMembers();
    this.savePosts();
  }

  // --- Posts ---
  getPosts() {
    return this.posts;
  }

  getPostById(id) {
    return this.posts.find(p => p.id === id);
  }

  addPost(data) {
    const newPost = {
      ...data,
      id: 'sp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)
    };
    this.posts.push(newPost);
    this.savePosts();
    return newPost;
  }

  updatePost(id, data) {
    const idx = this.posts.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.posts[idx] = { ...this.posts[idx], ...data };
      this.savePosts();
      return this.posts[idx];
    }
    return null;
  }

  deletePost(id) {
    this.posts = this.posts.filter(p => p.id !== id);
    this.savePosts();
  }

  filterPosts({ memberId = 'all', keyword = '', status = 'all' }) {
    return this.posts.filter(p => {
      if (memberId !== 'all') {
        if (!p.assignees || !p.assignees.includes(memberId)) {
          return false;
        }
      }

      if (status !== 'all' && p.status !== status) {
        return false;
      }

      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matchTitle = (p.title || '').toLowerCase().includes(q);
        const matchContent = (p.content || '').toLowerCase().includes(q);
        const matchNote = (p.note || '').toLowerCase().includes(q);
        if (!matchTitle && !matchContent && !matchNote) {
          return false;
        }
      }

      return true;
    });
  }

  getDailyPostVolume(startDateStr, daysCount = 7) {
    const counts = [];
    const baseDate = new Date(startDateStr);
    for (let i = 0; i < daysCount; i++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const count = this.posts.filter(p => p.date === dateStr).length;
      counts.push({
        date: dateStr,
        dayNum: d.getDate(),
        count
      });
    }
    return counts;
  }

  getStats() {
    return {
      total: this.posts.length,
      scheduled: this.posts.filter(p => p.status === 'scheduled').length,
      needs_approval: this.posts.filter(p => p.status === 'needs_approval').length,
      draft: this.posts.filter(p => p.status === 'draft').length,
      published: this.posts.filter(p => p.status === 'published').length
    };
  }

  exportData() {
    return JSON.stringify({
      brand: this.brand,
      members: this.members,
      posts: this.posts,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  importData(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (data && Array.isArray(data.posts)) {
        this.posts = data.posts;
        this.savePosts();
      }
      if (data && Array.isArray(data.members)) {
        this.members = data.members;
        this.saveMembers();
      }
      if (data && data.brand) {
        this.brand = data.brand;
        this.saveBrand();
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

window.sproutStore = new SproutStore();
