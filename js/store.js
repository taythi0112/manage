/**
 * Kế Hoạch Truyền Thông Dự Án REBOX
 * Phân công nhiệm vụ cho Team Nguyễn Thị Tây Thi:
 * - Nguyễn Thị Tây Thi (Trưởng nhóm Content & Trưởng dự án)
 * - Mỹ Phạm (Phụ trách Nội dung & Copywriting)
 * - Nguyễn Thái Vy (Thiết kế đồ họa & Visual Design)
 * - Mai Linh (Sản xuất Video, Media & Đối ngoại)
 */

const DEFAULT_BRAND_INFO = {
  brandName: 'Dự Án REBOX',
  slogan: 'Hộp Gọn Gói Trọn Món Ngon - Trọn Vị Sống Xanh',
  contacts: {
    address: { label: 'Địa chỉ triển khai', value: 'Trường Đại học Sư phạm - ĐH Đà Nẵng, 459 Tôn Đức Thắng & các điểm quán ăn đối tác', iconType: 'location' },
    phone: { label: 'Hotline dự án', value: '0359093139 (Tây Thi) / 0394681091 (Mỹ Phạm)', iconType: 'phone' },
    email: { label: 'Email liên hệ', value: 'nguyenthitaythi2007@gmail.com', iconType: 'email' },
    taxCode: { label: 'Mã số dự án / Tổ chức', value: 'REBOX-UED-2026', iconType: 'tax' },
    workingHours: { label: 'Thời gian trạm mở', value: '07:00 - 18:30 (Thứ 2 - Thứ 7)', iconType: 'clock' },
    website: { label: 'Website chính thức', value: 'rebox.danang.vn (Đang triển khai)', iconType: 'website' },
    facebook: { label: 'Facebook Fanpage', value: 'Fanpage REBOX - Hộp Xanh', link: '#', iconType: 'facebook' },
    instagram: { label: 'Instagram', value: '@rebox.vietnam', link: '#', iconType: 'instagram' },
    tiktok: { label: 'Kênh TikTok', value: '@rebox_official', link: '#', iconType: 'tiktok' },
    youtube: { label: 'Kênh YouTube', value: 'REBOX Green Life', iconType: 'youtube' },
    shopee: { label: 'Đối tác Cơm tấm', value: 'Cơm tấm Bụi & Cơm tấm Lộc Thọ', iconType: 'shopee' },
    zaloPersonal: { label: 'Zalo Điều phối', value: 'Nhóm Nội bộ Team REBOX (0359093139)', iconType: 'zalo' },
    zaloOA: { label: 'Kênh Trường', value: 'Đại diện Đoàn trường ĐHSP - ĐH Đà Nẵng', iconType: 'zaloOA' },
    orderLink: { label: 'Trạm mượn hộp', value: '2 Căn tin ĐHSP, Cơm tấm Lộc Thọ, Cơm tấm Bụi', iconType: 'cart' },
    googleMap: { label: 'Bản đồ Trạm', value: 'Hội trường Đất Quảng (A6) & Trạm REBOX ĐHSP Đà Nẵng', iconType: 'map' }
  }
};

const DEFAULT_MEMBERS = [
  { id: 'all', name: 'Tất cả thành viên', role: 'Toàn bộ Team REBOX', code: 'ALL', color: '#0073e6' },
  { 
    id: 'nv_taythi', 
    name: 'Nguyễn Thị Tây Thi', 
    role: 'Trưởng nhóm Content & Trưởng dự án', 
    code: 'TT', 
    color: '#0073e6', 
    phone: '0359093139', 
    email: 'nguyenthitaythi2007@gmail.com', 
    dob: '2007-01-01'
  },
  { 
    id: 'nv_mypham', 
    name: 'Mỹ Phạm', 
    role: 'Phụ trách Nội dung & Copywriting', 
    code: 'MP', 
    color: '#0ea5e9', 
    phone: '0394681091', 
    email: 'mypham1091@gmail.com', 
    dob: '2001-10-09'
  },
  { 
    id: 'nv_thaivy', 
    name: 'Nguyễn Thái Vy', 
    role: 'Thiết kế đồ họa & Key Visual (Design)', 
    code: 'TV', 
    color: '#8b5cf6', 
    phone: '0768520511', 
    email: 'nguyenthaivy0511@gmail.com', 
    dob: '2005-11-05'
  },
  { 
    id: 'nv_mailinh', 
    name: 'Mai Linh', 
    role: 'Sản xuất Video, Media & Đối ngoại', 
    code: 'ML', 
    color: '#ec4899', 
    phone: '0374596585', 
    email: 'Maitlinh209@gmail.com', 
    dob: '2004-09-20'
  }
];

const PLATFORMS = {
  facebook: { id: 'facebook', name: 'Facebook', code: 'FB', color: '#1877f2', bg: '#e7f3ff' },
  tiktok: { id: 'tiktok', name: 'TikTok', code: 'TT', color: '#111827', bg: '#f3f4f6' },
  website: { id: 'website', name: 'Website', code: 'WEB', color: '#0284c7', bg: '#e0f2fe' },
  confessions: { id: 'confessions', name: 'UED Confessions', code: 'UED', color: '#7c3aed', bg: '#f5f3ff' },
  offline: { id: 'offline', name: 'Trạm / Offline', code: 'OFL', color: '#059669', bg: '#ecfdf5' },
  email: { id: 'email', name: 'Email / Story', code: 'EML', color: '#d97706', bg: '#fef3c7' }
};

const POST_STATUSES = {
  scheduled: { id: 'scheduled', name: 'Đã lên lịch', color: '#0073e6', bg: '#eef6ff' },
  needs_approval: { id: 'needs_approval', name: 'Chờ duyệt', color: '#d97706', bg: '#fef3c7' },
  draft: { id: 'draft', name: 'Bản nháp', color: '#6b7280', bg: '#f3f4f6' },
  published: { id: 'published', name: 'Đã xuất bản', color: '#059669', bg: '#ecfdf5' },
  rejected: { id: 'rejected', name: 'Cần sửa đổi', color: '#dc2626', bg: '#fee2e2' }
};

// Toàn bộ các bài đăng theo kế hoạch truyền thông chính thức REBOX (3 giai đoạn)
function generateReboxCampaignPosts() {
  return [
    // GIAI ĐOẠN 1: THÁNG 12/2026
    {
      id: 'rb_1',
      title: 'REBOX ra mắt sản phẩm hộp đựng thức ăn tái sử dụng, hộp gọn gói trọn món ngon, trọn vị sống xanh',
      content: 'Lên bài về ra mắt REBOX hộp đựng thức ăn tái sử dụng trên nền tảng Facebook và Website. Thông cáo báo chí chính thức.',
      format: 'Bài viết, thông cáo báo chí',
      date: '2026-12-01',
      time: '09:00',
      platforms: ['facebook', 'website'],
      assignees: ['nv_taythi', 'nv_mypham'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80',
      note: 'Chạy ads Facebook (02/12 - 06/12). Chuẩn bị bài PR chính thức.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_2',
      title: 'Ẩn sau sự tiện lợi: Những nguy cơ từ hộp nhựa dùng một lần',
      content: 'Chiến dịch: “Đằng sau mỗi chiếc hộp sử dụng 1 lần là những hệ luỵ khó lường”. REBOX – Chung một vòng xanh: Vì sao cần một giải pháp thay thế hộp dùng một lần?',
      format: 'Video ngắn (TikTok & Reels)',
      date: '2026-12-03',
      time: '19:30',
      platforms: ['facebook', 'tiktok'],
      assignees: ['nv_mailinh', 'nv_mypham'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400&auto=format&fit=crop&q=80',
      note: 'Thay đổi nhận thức của công chúng khi sử dụng hộp đựng thức ăn 1 lần. Chạy ads TikTok từ 04/12 - 07/12.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_3',
      title: 'REBOX chính thức có mặt tại các điểm đối tác',
      content: 'REBOX chính thức có mặt tại 4 điểm đối tác đầu tiên: 2 căn tin trường ĐHSP, Cơm tấm Bụi (40 Phạm Như Xương) và Cơm tấm Lộc Thọ (26 Phạm Như Xương). Hướng dẫn nhận biết POSM và các địa điểm mượn.',
      format: 'Bài viết ngắn & Album ảnh',
      date: '2026-12-08',
      time: '11:00',
      platforms: ['facebook'],
      assignees: ['nv_mypham', 'nv_thaivy'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80',
      note: 'Thái Vy thiết kế bản đồ nhận diện trạm POSM rõ ràng, dễ tìm.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_4',
      title: 'Khám phá một ngày làm việc của REBOX - Mô hình mượn - dùng - trả',
      content: 'Giới thiệu mô hình mượn – dùng – trả hộp để mọi sinh viên hiểu rõ quy trình tiện lợi và sạch sẽ chuẩn ISO.',
      format: 'Video 3-5 phút',
      date: '2026-12-09',
      time: '11:30',
      platforms: ['facebook', 'tiktok'],
      assignees: ['nv_mailinh'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=80',
      note: 'CTA: Hãy trải nghiệm sản phẩm REBOX. Chạy ads Facebook & TikTok (09/12 - 11/12).',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_5',
      title: 'Đồng loạt phủ sóng ấn phẩm kỹ thuật tại các trạm đối tác',
      content: 'Lắp đặt Billboard, Banner, Standee hướng dẫn tại 02 quán ăn đối tác và 2 khu vực căn tin trường để tạo nhận diện thụ động cho sinh viên. Phát Brochure.',
      format: 'Triển khai Offline & POSM',
      date: '2026-12-10',
      time: '08:00',
      platforms: ['offline'],
      assignees: ['nv_thaivy', 'nv_taythi'],
      status: 'scheduled',
      image: '',
      note: 'Thái Vy bàn giao đầy đủ file in Standee và Brochure cho đội hậu cần.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_6',
      title: 'REBOX đang làm gì mà bận rộn vậy? - Teaser ngày ra mắt',
      content: 'Cung cấp cảnh mọi người đang chuẩn bị cho các trạm, standee và đội ngũ đang bận rộn sáng tạo, tạo cảm giác hào hứng trước ngày sự kiện.',
      format: 'Video & Reel (45 - 60s)',
      date: '2026-12-11',
      time: '18:00',
      platforms: ['facebook', 'tiktok'],
      assignees: ['nv_mailinh', 'nv_mypham'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80',
      note: 'Thông báo thời gian, địa điểm sự kiện sáng mai tại Hội trường Đất Quảng.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_7',
      title: 'Tổ chức sự kiện ra mắt sản phẩm REBOX (7h30 - 10h00)',
      content: 'Địa điểm: Hội trường Đất Quảng (phòng 202 nhà A6) trường ĐH Sư phạm ĐH Đà Nẵng. Thành phần: Giám đốc REBOX, Frankfurt Zoological Society, IESC-UED, GreenViet, Phê La, Cơm tấm Bụi, Đoàn trường và sinh viên.',
      format: 'Sự kiện Offline & Truyền thông trực tiếp',
      date: '2026-12-12',
      time: '07:30',
      platforms: ['offline', 'facebook'],
      assignees: ['nv_taythi', 'nv_mailinh', 'nv_thaivy', 'nv_mypham'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&auto=format&fit=crop&q=80',
      note: 'Chuẩn bị: 9 standee, 5 hashtag cầm tay, MC, bàn đại biểu, nước ly, 10 nhân sự hỗ trợ.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_8',
      title: 'Phát động thử thách số "7 ngày dùng xanh cùng REBOX"',
      content: 'Phát động trên Facebook & TikTok ngay trong sự kiện. Sử dụng KOCs sinh viên quay video trải nghiệm mượn - trả hộp văn minh. Giải nhất 1tr, giải nhì 700k, voucher Phê La & Cơm tấm Bụi.',
      format: 'Chiến dịch Viral TikTok & Fanpage',
      date: '2026-12-12',
      time: '11:00',
      platforms: ['facebook', 'tiktok'],
      assignees: ['nv_taythi', 'nv_mypham'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80',
      note: 'Bộ hashtag: #REBOX #HopXanhTronVi #BocVanMonNgon #7ngaydungxanhcungREBOX.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_9',
      title: 'Đăng bài REUP tổng hợp hình ảnh sự kiện ra mắt REBOX',
      content: 'Bài đăng tổng hợp những khoảnh khắc đẹp, lời phát biểu ý nghĩa và sự hưởng ứng nồng nhiệt của các thầy cô, sinh viên.',
      format: 'Album ảnh & Bài viết',
      date: '2026-12-12',
      time: '15:00',
      platforms: ['facebook'],
      assignees: ['nv_mypham', 'nv_thaivy'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&auto=format&fit=crop&q=80',
      note: 'Gửi lời cảm ơn đối tác và nhà tài trợ Phê La, Cơm tấm Bụi.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_10',
      title: 'Thông báo hạn cuối bình chọn thử thách "7 ngày dùng xanh"',
      content: 'Bài đăng thông báo hạn chót gửi video và kêu gọi bình chọn lượt tương tác cho các video dự thi xuất sắc.',
      format: 'Bài đăng nhắc nhở & Poster',
      date: '2026-12-19',
      time: '17:00',
      platforms: ['facebook'],
      assignees: ['nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Đóng cổng bình chọn lúc 23h59 ngày 20/12.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_11',
      title: 'Video Recap tổng quan thử thách 7 ngày dùng xanh cùng REBOX',
      content: 'Tổng hợp tất cả các video tham gia của sinh viên thành 1 video ngắn truyền cảm hứng mạnh mẽ về thói quen giảm rác thải nhựa.',
      format: 'Video Recap ngắn',
      date: '2026-12-21',
      time: '19:45',
      platforms: ['facebook', 'tiktok'],
      assignees: ['nv_mailinh'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop&q=80',
      note: 'Mai Linh phụ trách dựng video hiệu ứng âm nhạc tươi vui.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_12',
      title: 'Chương trình MERRY REBOX “Mượn hộp xanh, nhận quà giáng sinh”',
      content: 'Tặng 200 sticker Giáng sinh độc quyền khi mượn hộp. Poster chương trình đặt tại các trạm. Chạy ads trên Facebook & TikTok.',
      format: 'Chiến dịch khuyến mại Giáng sinh',
      date: '2026-12-22',
      time: '09:00',
      platforms: ['facebook', 'tiktok', 'offline'],
      assignees: ['nv_thaivy', 'nv_mypham'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?w=400&auto=format&fit=crop&q=80',
      note: 'Thái Vy thiết kế 200 sticker chủ đề Noel.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_13',
      title: 'Trao giải video thử thách "7 ngày dùng xanh cùng REBOX"',
      content: 'Bài đăng công bố kết quả giải nhất, nhì, ba và danh sách sinh viên liên hệ nhận thưởng voucher và tiền mặt.',
      format: 'Bài đăng công bố & Banner',
      date: '2026-12-27',
      time: '10:00',
      platforms: ['facebook'],
      assignees: ['nv_taythi', 'nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Tây Thi xác nhận danh sách trúng thưởng.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },
    {
      id: 'rb_14',
      title: 'Nhìn lại hoạt động trải nghiệm, nhắc sinh viên hoàn thành lượt trả hộp',
      content: 'Tổng kết kết quả bước đầu tháng 12, kêu gọi duy trì thói quen mượn - trả hộp và hé lộ chuỗi chương trình tháng 1/2027.',
      format: 'Bài đăng tổng kết',
      date: '2026-12-30',
      time: '14:30',
      platforms: ['facebook', 'website'],
      assignees: ['nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Đăng tải trên Facebook và Website REBOX.',
      phase: 'Giai đoạn 1 (T12/2026)'
    },

    // GIAI ĐOẠN 2: THÁNG 01/2027
    {
      id: 'rb_15',
      title: 'Khởi động tháng 1 - Green UED Tour - REBOX GREEN WEEK',
      content: 'Công bố chuỗi hoạt động diễn ra trong tháng 1. Ảnh tổng 4 hoạt động + caption truyền cảm hứng.',
      format: 'Ảnh tổng 4 hoạt động (2 bài)',
      date: '2027-01-01',
      time: '09:00',
      platforms: ['facebook', 'confessions'],
      assignees: ['nv_taythi', 'nv_thaivy'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&auto=format&fit=crop&q=80',
      note: 'Đăng trên Fanpage và liên hệ kênh truyền thông trường ĐHSP (HTTT).',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_16',
      title: 'Mở đăng ký Seminar: “Một lần sử dụng, bao lâu để phân hủy?”',
      content: 'Giới thiệu vấn đề đặt ra trong Seminar, thời gian, địa điểm tổ chức, link form đăng ký cho sinh viên.',
      format: 'Ảnh thông tin sự kiện & Caption',
      date: '2027-01-02',
      time: '11:00',
      platforms: ['facebook', 'confessions'],
      assignees: ['nv_mypham', 'nv_thaivy'],
      status: 'scheduled',
      image: '',
      note: 'Thái Vy thiết kế ảnh kích thước chuẩn Facebook.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_17',
      title: 'Mở đăng ký Workshop: Behind the REBOX - Phía sau chiếc hộp có gì?',
      content: 'Giới thiệu nội dung workshop thực tế về quy trình làm sạch và chuẩn ISO an toàn vệ sinh.',
      format: 'Ảnh & Infographic ngắn',
      date: '2027-01-03',
      time: '11:00',
      platforms: ['facebook', 'confessions'],
      assignees: ['nv_mypham', 'nv_thaivy'],
      status: 'scheduled',
      image: '',
      note: 'Kèm link đăng ký tham gia có giấy chứng nhận.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_18',
      title: 'Mở đăng ký cuộc thi: Từ nhận thức đến hành động - "Chạy" cùng REBOX',
      content: 'Poster thể lệ, bài đăng kêu gọi sinh viên tham gia cuộc thi vận động kết hợp nhặt rác và sống xanh.',
      format: 'Poster thể lệ & Bài viết',
      date: '2027-01-04',
      time: '11:00',
      platforms: ['facebook', 'confessions'],
      assignees: ['nv_thaivy', 'nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Kêu gọi các khoa và câu lạc bộ sinh viên.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_19',
      title: 'Trước khi đến triển lãm - Một chiếc hộp dùng một lần sẽ đi về đâu?',
      content: 'Bài 1: Giới thiệu về tham quan. Bài 2: Xác nhận người tham gia và đóng link đăng ký seminar.',
      format: 'Ảnh thiết kế gợi mở & Bài phân tích (2 bài)',
      date: '2027-01-05',
      time: '14:00',
      platforms: ['facebook'],
      assignees: ['nv_mypham', 'nv_thaivy'],
      status: 'scheduled',
      image: '',
      note: 'Phân tích góc nhìn nghệ thuật dẫn đến triển lãm.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_20',
      title: 'Gặp gỡ diễn giả Seminar - Người đồng hành cùng những cuộc đối thoại',
      content: 'Poster thiết kế giới thiệu lý lịch và những cống hiến của diễn giả khách mời chuyên gia môi trường.',
      format: 'Ảnh chân dung + Poster',
      date: '2027-01-06',
      time: '11:00',
      platforms: ['facebook'],
      assignees: ['nv_thaivy', 'nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Đăng tải trích dẫn hay của diễn giả.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_21',
      title: '24 giờ trước Seminar - Bạn đã sẵn sàng đặt câu hỏi chưa?',
      content: 'Nhắc về thời gian, địa điểm. Đăng story đếm ngược trên Facebook và gửi email xác nhận tham gia với sinh viên đăng ký.',
      format: 'Ảnh countdown & Email xác nhận (3 bài)',
      date: '2027-01-07',
      time: '08:30',
      platforms: ['facebook', 'email'],
      assignees: ['nv_mypham', 'nv_mailinh'],
      status: 'scheduled',
      image: '',
      note: 'Gửi email hàng loạt cho sinh viên đã đăng ký.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_22',
      title: 'Seminar: Lắng nghe và đối thoại & Bài chuyên đề chuẩn ISO REBOX',
      content: 'Story cập nhật khoảnh khắc nổi bật tại sự kiện. Bài chuyên đề: "Liệu hộp thức ăn dùng nhiều lần có thực sự sạch? Giải mã quy trình vệ sinh chuẩn ISO đằng sau chiếc hộp xanh REBOX".',
      format: 'Story trực tiếp & Bài chuyên đề website',
      date: '2027-01-08',
      time: '09:00',
      platforms: ['facebook', 'website'],
      assignees: ['nv_taythi', 'nv_mypham', 'nv_mailinh'],
      status: 'scheduled',
      image: '',
      note: 'Đăng bài chuyên đề lên website chính thức.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_23',
      title: 'Workshop: Behind the REBOX - Phía sau chiếc hộp REBOX có gì?',
      content: 'Đăng timeline trong ngày, story cập nhật workshop đang diễn ra, ảnh/video tại chỗ gửi email nhắc người tham gia.',
      format: 'Ảnh timeline, story, clip tại chỗ (3 bài)',
      date: '2027-01-09',
      time: '08:30',
      platforms: ['facebook', 'email'],
      assignees: ['nv_mailinh', 'nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Mai Linh trực tiếp ghi hình tại workshop.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_24',
      title: 'Từ nhận thức đến hành động: Cuộc thi “chạy” cùng REBOX',
      content: 'Bài 1: Thông báo hoạt động trong ngày (00h). Bài 2: Cập nhật không khí các trạm. Bài 3: Đăng bài công bố kết quả cuộc thi.',
      format: 'Album ảnh & Story trực tiếp (3 bài)',
      date: '2027-01-10',
      time: '06:00',
      platforms: ['facebook'],
      assignees: ['nv_mypham', 'nv_mailinh', 'nv_thaivy'],
      status: 'scheduled',
      image: '',
      note: 'Phụ trách đưa tin trực tiếp trong suốt buổi chạy.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_25',
      title: 'Tham quan triển lãm REBOX tại UED',
      content: 'Bài 1: Giới thiệu không gian, tác phẩm, chất liệu, khách mời. Bài 2: Bài viết về giá trị và thông điệp phía sau tác phẩm trưng bày.',
      format: 'Album ảnh & Bài viết (2 bài)',
      date: '2027-01-11',
      time: '09:00',
      platforms: ['facebook'],
      assignees: ['nv_mypham', 'nv_thaivy'],
      status: 'scheduled',
      image: '',
      note: 'Ảnh chụp chất lượng cao các tác phẩm nghệ thuật tái chế.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_26',
      title: 'RECAP - Green UED Tour – REBOX GREEN LIVING WEEK',
      content: 'Video phỏng vấn cả 4 hoạt động (1p30s - 2p) và story ngắn recap hành trình tuần lễ sống xanh.',
      format: 'Video ngắn & Story recap (2 bài)',
      date: '2027-01-13',
      time: '19:45',
      platforms: ['facebook', 'tiktok'],
      assignees: ['nv_mailinh'],
      status: 'scheduled',
      image: '',
      note: 'Đạt tối thiểu 2.000 lượt xem trên TikTok.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_27',
      title: 'Những câu hỏi còn ở lại sau chuỗi trải nghiệm REBOX',
      content: 'Tổng hợp các câu hỏi nổi bật, nhận định hay từ Seminar, workshop, cuộc thi và triển lãm. Kết nối vấn đề rác thải với hộp nhiều lần.',
      format: 'Carousel hỏi - đáp (2 bài)',
      date: '2027-01-15',
      time: '11:00',
      platforms: ['facebook', 'confessions'],
      assignees: ['nv_mypham', 'nv_thaivy'],
      status: 'scheduled',
      image: '',
      note: 'Đăng trên Fanpage và bài viết trên trang trường.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_28',
      title: 'REBOX x Báo Đà Nẵng - Người trẻ chung tay giảm rác thải nhựa',
      content: 'Chia sẻ bài báo viết về dự án REBOX trên Báo Đà Nẵng về fanpage chính thức.',
      format: 'Share liên kết báo chí (2 bài)',
      date: '2027-01-18',
      time: '10:00',
      platforms: ['facebook'],
      assignees: ['nv_taythi'],
      status: 'scheduled',
      image: '',
      note: 'Gắn thẻ tác giả và cơ quan báo chí.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_29',
      title: '5 điều sinh viên thường băn khoăn khi dùng REBOX',
      content: 'Thu thập các câu hỏi từ sinh viên trên story gợi mở, giải đáp thắc mắc về tiền cọc, cách rửa hộp, vị trí trả.',
      format: 'Carousel FAQ (1 bài)',
      date: '2027-01-24',
      time: '14:30',
      platforms: ['facebook'],
      assignees: ['nv_mypham', 'nv_thaivy'],
      status: 'scheduled',
      image: '',
      note: 'Thiết kế định dạng slide vuốt ngang dễ đọc.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },
    {
      id: 'rb_30',
      title: 'Tổng kết chuỗi truyền thông tháng 1 & Chuẩn bị chặng Tết',
      content: 'Bài viết và video truyền thông điểm lại những bước tiến vượt bậc của dự án REBOX tại ĐH Sư Phạm.',
      format: 'Video + Bài viết đăng fanpage',
      date: '2027-01-31',
      time: '19:45',
      platforms: ['facebook', 'tiktok'],
      assignees: ['nv_mailinh', 'nv_mypham'],
      status: 'scheduled',
      image: '',
      note: '1 video + 1 bài viết.',
      phase: 'Giai đoạn 2 (T01/2027)'
    },

    // GIAI ĐOẠN 3: THÁNG 02/2027
    {
      id: 'rb_31',
      title: 'Nhắc sinh viên trả hộp trước khi về quê ăn Tết (24 Âm lịch)',
      content: 'Nhắc sinh viên dọn tủ lạnh, ngắt cầu dao về quê ăn Tết và thông báo trạm tạm dừng từ 03/02/2027. CTA: “Kiểm tra ngay giỏ đồ và mang REBOX ra trạm gần nhất trả trước 17h ngày 03/02 để nhận lại tiền cọc nhé.”',
      format: 'Bài viết và Infographic (120 - 150 chữ)',
      date: '2027-02-01',
      time: '09:00',
      platforms: ['facebook', 'confessions'],
      assignees: ['nv_mypham', 'nv_thaivy'],
      status: 'scheduled',
      image: '',
      note: 'Mục tiêu: Thu hồi >90% lượng hộp lưu hành trước Tết. 300+ tương tác.',
      phase: 'Giai đoạn 3 (T02/2027)'
    },
    {
      id: 'rb_32',
      title: 'Thiệp chúc mừng năm mới: Khai niên rực rỡ – Cả năm sống xanh',
      content: '“REBOX gửi đến quý vị Khai niên rực rỡ – Cả năm sống xanh cùng REBOX. Chúc cả nhà năm mới vui vẻ, cung hỉ phát tài”',
      format: 'Thiệp chúc Tết thiết kế (80 - 100 chữ)',
      date: '2027-02-06',
      time: '20:00',
      platforms: ['facebook'],
      assignees: ['nv_thaivy', 'nv_mypham'],
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?w=400&auto=format&fit=crop&q=80',
      note: 'Giữ nhận diện thương hiệu dịp Tết (29 Âm lịch). 200+ tương tác.',
      phase: 'Giai đoạn 3 (T02/2027)'
    },
    {
      id: 'rb_33',
      title: 'Poster thông báo hệ thống trạm REBOX hoạt động trở lại',
      content: 'Thông báo hệ thống trạm REBOX chính thức hoạt động trở lại vào ngày 12/02/2027 (Mùng 6 Tết). CTA: “Lên lịch quay lại trường và sẵn sàng quét mã mượn hộp từ sáng mai 12/02 cùng REBOX nào.”',
      format: 'Poster thông báo (100 - 120 chữ)',
      date: '2027-02-11',
      time: '11:00',
      platforms: ['facebook'],
      assignees: ['nv_thaivy', 'nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Đạt 1.500+ lượt tiếp cận. Kêu gọi lại người dùng cũ.',
      phase: 'Giai đoạn 3 (T02/2027)'
    },
    {
      id: 'rb_34',
      title: 'Phát động thử thách tích 3 lần mượn - trả hộp nhận vé Minishow',
      content: 'Phát động thử thách (15–21/02/2027). Tung poster giấu mặt nghệ sĩ bí ẩn. CTA: “Quét mã mượn hộp ngay hôm nay để tích đủ 3 lượt đổi vé và đoán xem nhân vật bí ẩn ngày 21/02 là ai nào.”',
      format: 'Poster thể lệ và Video TikTok 30s',
      date: '2027-02-15',
      time: '11:15',
      platforms: ['facebook', 'confessions', 'tiktok'],
      assignees: ['nv_mypham', 'nv_thaivy', 'nv_mailinh'],
      status: 'scheduled',
      image: '',
      note: 'Đạt 3.000+ lượt tiếp cận. 500+ lượt mượn hộp trong 3 ngày đầu.',
      phase: 'Giai đoạn 3 (T02/2027)'
    },
    {
      id: 'rb_35',
      title: 'Tung poster Key Visual & Clip teaser công bố ca sĩ khách mời KhoiVu',
      content: 'Công bố chính thức nghệ sĩ khách mời KhoiVu cùng thể lệ săn vé chặng cuối. CTA: “Chỉ còn 4 ngày cuối! Hãy nhanh tay hoàn thành 3 lượt mượn – trả hộp để đổi vé gặp KhoiVu nhé.”',
      format: 'Poster Key Visual và Clip teaser 15s',
      date: '2027-02-17',
      time: '19:45',
      platforms: ['facebook', 'tiktok'],
      assignees: ['nv_thaivy', 'nv_mailinh', 'nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Đạt 4.000+ lượt tiếp cận. Phát hết 100% số lượng vé Minishow.',
      phase: 'Giai đoạn 3 (T02/2027)'
    },
    {
      id: 'rb_36',
      title: 'Bài viết trang trọng và Bộ ảnh tri ân nhà tài trợ và đối tác',
      content: 'Gửi lời cảm ơn chân thành tới Trường ĐHSP – ĐHĐN, Cơm Tấm Bụi, Phê La và các đơn vị đồng hành cùng các đối tác xanh của REBOX.',
      format: 'Bài viết trang trọng & Bộ ảnh tri ân (250 - 300 chữ)',
      date: '2027-02-23',
      time: '14:30',
      platforms: ['facebook'],
      assignees: ['nv_taythi', 'nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Giữ quan hệ đối tác. 100% đối tác được gắn thẻ và chia sẻ lại.',
      phase: 'Giai đoạn 3 (T02/2027)'
    },
    {
      id: 'rb_37',
      title: 'Đăng khoảnh khắc bùng nổ và công bố con số thành công Minishow',
      content: 'Album ảnh đêm nhạc ngày 21/02 cùng nghệ sĩ KhoiVu. CTA: “Hãy chia sẻ những khoảnh khắc và cảm nhận của bạn về đêm nhạc cùng REBOX.”',
      format: 'Album ảnh sự kiện (15–20 ảnh)',
      date: '2027-02-25',
      time: '11:15',
      platforms: ['facebook', 'confessions'],
      assignees: ['nv_mailinh', 'nv_mypham'],
      status: 'scheduled',
      image: '',
      note: 'Tạo hiệu ứng lan tỏa sau sự kiện. 500+ lượt tương tác, chia sẻ.',
      phase: 'Giai đoạn 3 (T02/2027)'
    },
    {
      id: 'rb_38',
      title: 'Video Recap và bài viết tổng kết hành trình 3 tháng toàn chiến dịch REBOX',
      content: 'Video Recap (60–90s) tổng kết hành trình 3 tháng của toàn bộ chiến dịch REBOX tại ĐHSP. CTA: “Hành trình 3 tháng khép lại nhưng thói quen xanh vẫn tiếp diễn. Hãy tiếp tục đồng hành cùng REBOX mỗi ngày.”',
      format: 'Video Recap (60–90s) và bài viết (250–300 chữ)',
      date: '2027-02-28',
      time: '19:45',
      platforms: ['facebook', 'tiktok'],
      assignees: ['nv_taythi', 'nv_mailinh'],
      status: 'scheduled',
      image: '',
      note: 'Đạt 3.500+ lượt xem video. Khép lại chiến dịch trọn vẹn.',
      phase: 'Giai đoạn 3 (T02/2027)'
    }
  ];
}

class SproutStore {
  constructor() {
    this.KEY_POSTS = 'SPROUT_REBOX_POSTS_V3';
    this.KEY_MEMBERS = 'SPROUT_REBOX_MEMBERS_V3';
    this.KEY_BRAND = 'SPROUT_REBOX_BRAND_V3';
    this.init();
  }

  init() {
    // Luôn nạp thông tin thành viên chính xác theo yêu cầu người dùng
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

    // Luôn nạp thông tin thương hiệu REBOX
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

    // Luôn nạp toàn bộ kế hoạch bài đăng REBOX
    const rawPosts = localStorage.getItem(this.KEY_POSTS);
    if (!rawPosts) {
      this.posts = generateReboxCampaignPosts();
      this.savePosts();
    } else {
      try {
        this.posts = JSON.parse(rawPosts);
      } catch (e) {
        this.posts = generateReboxCampaignPosts();
      }
    }
  }

  saveMembers() {
    localStorage.setItem(this.KEY_MEMBERS, JSON.stringify(this.members));
  }

  saveBrand() {
    localStorage.setItem(this.KEY_BRAND, JSON.stringify(this.brand));
  }

  savePosts() {
    localStorage.setItem(this.KEY_POSTS, JSON.stringify(this.posts));
  }

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

  getPosts() {
    return this.posts;
  }

  getPostById(id) {
    return this.posts.find(p => p.id === id);
  }

  addPost(data) {
    const newPost = {
      ...data,
      id: 'rb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)
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

  filterPosts({ memberId = 'all', keyword = '', status = 'all', phase = 'all' }) {
    return this.posts.filter(p => {
      if (memberId !== 'all') {
        if (!p.assignees || !p.assignees.includes(memberId)) {
          return false;
        }
      }

      if (status !== 'all' && p.status !== status) {
        return false;
      }

      if (phase !== 'all' && p.phase !== phase) {
        return false;
      }

      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matchTitle = (p.title || '').toLowerCase().includes(q);
        const matchContent = (p.content || '').toLowerCase().includes(q);
        const matchNote = (p.note || '').toLowerCase().includes(q);
        const matchFormat = (p.format || '').toLowerCase().includes(q);
        if (!matchTitle && !matchContent && !matchNote && !matchFormat) {
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
      phase1: this.posts.filter(p => (p.phase || '').includes('Giai đoạn 1')).length,
      phase2: this.posts.filter(p => (p.phase || '').includes('Giai đoạn 2')).length,
      phase3: this.posts.filter(p => (p.phase || '').includes('Giai đoạn 3')).length,
      scheduled: this.posts.filter(p => p.status === 'scheduled').length
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

  // Khôi phục dữ liệu gốc chuẩn từ PDF
  resetToDefault() {
    this.posts = generateReboxCampaignPosts();
    this.members = [...DEFAULT_MEMBERS];
    this.brand = JSON.parse(JSON.stringify(DEFAULT_BRAND_INFO));
    this.savePosts();
    this.saveMembers();
    this.saveBrand();
  }
}

window.sproutStore = new SproutStore();
