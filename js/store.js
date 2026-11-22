/**
 * Kế Hoạch Truyền Thông Dự Án REBOX
 * Phân công nhiệm vụ cho Team Nguyễn Thị Tây Thi (Chuyên viên PR):
 * - Nguyễn Thị Tây Thi (Chuyên viên PR Chiến lược & Quan hệ Đối ngoại)
 * - Phạm Thị Thuỳ Mỹ (Chuyên viên PR - Phụ trách Nội dung & Copywriting)
 * - Nguyễn Thái Vy (Chuyên viên PR - Thiết kế đồ họa & Key Visual)
 * - Mai Thuỳ Linh (Chuyên viên PR - Sản xuất Video, Media & Đối ngoại)
 * - Trịnh Trương Ái Mỹ (Chuyên viên PR)
 */

const DEFAULT_BRAND_INFO = {
  brandName: 'Dự Án REBOX',
  slogan: 'Hộp Gọn Gói Trọn Món Ngon - Trọn Vị Sống Xanh',
  contacts: {
    address: { label: 'Địa chỉ triển khai', value: 'Trường Đại học Sư phạm - ĐH Đà Nẵng, 459 Tôn Đức Thắng & các điểm quán ăn đối tác', iconType: 'location' },
    phone: { label: 'Hotline dự án', value: '0359093139 (Tây Thi) / 0394681091 (Thuỳ Mỹ)', iconType: 'phone' },
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
    role: 'Chuyên viên PR Chiến lược & Quan hệ Đối ngoại',
    code: 'TT',
    color: '#0073e6',
    phone: '0359093139',
    email: 'nguyenthitaythi2007@gmail.com',
    dob: '2007-12-01'
  },
  {
    id: 'nv_mypham',
    name: 'Phạm Thị Thuỳ Mỹ',
    role: 'Chuyên viên PR - Phụ trách Nội dung & Copywriting',
    code: 'PM',
    color: '#0ea5e9',
    phone: '0394681091',
    email: 'mypham1091@gmail.com',
    dob: '2007-10-09'
  },
  {
    id: 'nv_thaivy',
    name: 'Nguyễn Thái Vy',
    role: 'Chuyên viên PR - Thiết kế đồ họa & Key Visual (Design)',
    code: 'TV',
    color: '#8b5cf6',
    phone: '0768520511',
    email: 'nguyenthaivy0511@gmail.com',
    dob: '2007-11-05'
  },
  {
    id: 'nv_mailinh',
    name: 'Mai Thuỳ Linh',
    role: 'Chuyên viên PR - Sản xuất Video, Media',
    code: 'ML',
    color: '#ec4899',
    phone: '0374596585',
    email: 'Maitlinh209@gmail.com',
    dob: '2007-09-02'
  },
  {
    id: 'nv_aimy',
    name: 'Trịnh Trương Ái Mỹ',
    role: 'Chuyên viên PR',
    code: 'AM',
    color: '#10b981',
    phone: '0935777348',
    email: 'aimychannel34@gmail.com',
    dob: '2007-04-03'
  }
];

const PLATFORMS = {
  tiktok: { id: 'tiktok', name: 'TikTok', code: 'TIKTOK', color: '#ffffff', bg: '#0f172a', border: '#0f172a' },
  facebook: { id: 'facebook', name: 'Facebook', code: 'FACEBOOK', color: '#1877f2', bg: '#e7f3ff', border: '#bad9fb' },
  website: { id: 'website', name: 'Website REBOX', code: 'WEBSITE', color: '#0284c7', bg: '#e0f2fe', border: '#bae6fd' },
  confessions: { id: 'confessions', name: 'UED Confessions', code: 'CONFESSIONS', color: '#ea580c', bg: '#ffedd5', border: '#fed7aa' },
  httt: { id: 'httt', name: 'Kênh Trường (HTTT)', code: 'TRƯỜNG ĐHSP', color: '#7c3aed', bg: '#f5f3ff', border: '#e9d5ff' },
  bao_danang: { id: 'bao_danang', name: 'Báo Đà Nẵng', code: 'BÁO ĐÀ NẴNG', color: '#b91c1c', bg: '#fee2e2', border: '#fecaca' },
  offline: { id: 'offline', name: 'Trạm / Offline POSM', code: 'TRẠM POSM', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  email: { id: 'email', name: 'Email / Story', code: 'EMAIL', color: '#d97706', bg: '#fef3c7', border: '#fde68a' }
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
    {
      "id": "rb_1",
      "title": "REBOX ra mắt sản phẩm hộp đựng thức ăn tái sử dụng, hộp gọn gói trọn món ngon, trọn vị sống xanh",
      "content": "Lên bài về ra mắt REBOX hộp đựng thức ăn tái sử dụng trên nền tảng Website và Facebook. Thông cáo báo chí chính thức.",
      "format": "Bài viết, thông cáo báo chí",
      "date": "2026-12-01",
      "time": "09:00",
      "platforms": [
        "website",
        "facebook"
      ],
      "ads": "Facebook Ads (02/12 - 06/12)",
      "assignees": [
        "nv_taythi",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80",
      "note": "Chạy ads Facebook (02/12 - 06/12). Lên bài thông cáo báo chí trên Website và Fanpage.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_2",
      "title": "Ẩn sau sự tiện lợi: Những nguy cơ từ hộp nhựa dùng một lần",
      "content": "Chiến dịch truyền thông: “Đằng sau mỗi chiếc hộp sử dụng 1 lần là những hệ luỵ khó lường”. REBOX – Chung một vòng xanh: Vì sao cần một giải pháp thay thế hộp dùng một lần? Những hiểm hoạ sức khoẻ khi dùng hộp nhựa.",
      "format": "Video ngắn (TikTok & Reels)",
      "date": "2026-12-03",
      "time": "19:30",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": "TikTok Ads (04/12 - 07/12)",
      "assignees": [
        "nv_mailinh",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400&auto=format&fit=crop&q=80",
      "note": "Chạy ads trên TikTok từ 04/12 - 07/12. Thay đổi nhận thức của công chúng khi sử dụng hộp đựng thức ăn 1 lần.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_3",
      "title": "REBOX chính thức có mặt tại các điểm đối tác",
      "content": "REBOX chính thức có mặt tại 4 điểm đối tác đầu tiên: 2 căn tin trường ĐHSP, Cơm tấm Bụi (40 Phạm Như Xương) và Cơm tấm Lộc Thọ (26 Phạm Như Xương). Hướng dẫn nhận biết POSM, các địa điểm mượn REBOX.",
      "format": "Bài viết ngắn & Album ảnh",
      "date": "2026-12-08",
      "time": "11:00",
      "platforms": [
        "facebook",
        "offline"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80",
      "note": "Thái Vy thiết kế bản đồ nhận diện trạm POSM rõ ràng, dễ tìm tại 4 điểm đối tác.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_4",
      "title": "Khám phá một ngày làm việc của REBOX - Mô hình mượn - dùng - trả",
      "content": "Giới thiệu mô hình mượn – dùng – trả hộp để mọi sinh viên hiểu rõ quy trình tiện lợi và sạch sẽ chuẩn ISO.",
      "format": "Video 3-5 phút",
      "date": "2026-12-09",
      "time": "11:30",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": "Facebook & TikTok Ads (09/12 - 11/12)",
      "assignees": [
        "nv_mailinh"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=80",
      "note": "CTA: Hãy trải nghiệm sản phẩm REBOX - hộp đựng thức ăn tái sử dụng. Chạy ads ở Facebook và TikTok (09/12 - 11/12).",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_5",
      "title": "Đồng loạt phủ sóng các ấn phẩm kỹ thuật tại các trạm đối tác",
      "content": "Lắp đặt Billboard, Banner, Standee hướng dẫn tại 02 quán ăn đối tác (Cơm tấm Lộc Thọ, Cơm tấm Bụi) cùng 2 khu vực căn tin trường để tạo nhận diện thụ động cho sinh viên. Phát Brochure.",
      "format": "Triển khai Offline & POSM",
      "date": "2026-12-10",
      "time": "08:00",
      "platforms": [
        "offline"
      ],
      "ads": null,
      "assignees": [
        "nv_thaivy",
        "nv_taythi"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Thái Vy bàn giao đầy đủ file in Billboard, Standee và Brochure cho đội hậu cần.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_6",
      "title": "REBOX đang làm gì mà bận rộn vậy? - Teaser ngày ra mắt",
      "content": "Cung cấp cảnh mọi người đang chuẩn bị cho các trạm, standee và đội ngũ đang bận rộn edit, sáng tạo... (tạo cảm giác hào hứng) cung cấp thông tin địa chỉ và chương trình sáng mai diễn ra ở đâu, mấy giờ...",
      "format": "Video & Reel (45 - 60s)",
      "date": "2026-12-11",
      "time": "18:00",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mailinh",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80",
      "note": "Reels/TikTok 45-60s hé lộ hậu trường chuẩn bị sự kiện ra mắt sáng mai tại Hội trường Đất Quảng.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_7",
      "title": "Tổ chức sự kiện ra mắt sản phẩm REBOX (7g30 - 10g00)",
      "content": "Hội trường Đất Quảng (phòng 202 tòa nhà A6) trường ĐH Sư phạm ĐH Đà Nẵng. Giám đốc REBOX, Frankfurt Zoological Society, IESC-UED, GreenViet, các quán đối tác, Cơm tấm Bụi, Phê La, Đoàn trường và sinh viên.",
      "format": "Sự kiện trực tiếp & Truyền thông trực tiếp",
      "date": "2026-12-12",
      "time": "07:30",
      "platforms": [
        "offline",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_taythi",
        "nv_mailinh",
        "nv_thaivy",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&auto=format&fit=crop&q=80",
      "note": "9 standee, 5 hashtag cầm tay, MC, bàn đại biểu, nước ly, 10 nhân sự hỗ trợ tại trạm.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_8",
      "title": "Phát động thử thách số \"7 ngày dùng xanh cùng REBOX\"",
      "content": "Phát động trên Facebook và TikTok ngay trong sự kiện ra mắt sản phẩm REBOX. Mạng lưới Đại sứ xanh (KOCs/Micro-influencers sinh viên) quay video trải nghiệm mượn - trả hộp. Bộ hashtag #REBOX #HopXanhTronVi #BocVanMonNgon #7ngaydungxanhcungREBOX.",
      "format": "Thử thách Viral TikTok & Fanpage",
      "date": "2026-12-12",
      "time": "11:00",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_taythi",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80",
      "note": "KOCs sinh viên quay video trải nghiệm mượn - trả hộp REBOX văn minh tạo hiệu ứng đám đông.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_9",
      "title": "Đăng bài REUP sự kiện ra mắt sản phẩm REBOX",
      "content": "Bài đăng tổng hợp hình ảnh trong buổi ra mắt sự kiện tại Hội trường Đất Quảng.",
      "format": "Album ảnh & Bài viết",
      "date": "2026-12-12",
      "time": "15:00",
      "platforms": [
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&auto=format&fit=crop&q=80",
      "note": "Tổng hợp hình ảnh đẹp, khách mời, phát biểu đối tác và sinh viên tham gia.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_10",
      "title": "Đăng bài thông báo hạn cuối bình chọn video thử thách \"7 ngày dùng xanh cùng REBOX\"",
      "content": "Bài đăng thông báo hạn cuối bình chọn video thử thách số 7 ngày dùng xanh cùng REBOX.",
      "format": "Bài đăng thông báo & Poster",
      "date": "2026-12-19",
      "time": "17:00",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Nhắc sinh viên chốt lượt tương tác video trên TikTok & Facebook.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_11",
      "title": "REUP đăng bài tổng quan về thử thách \"7 ngày dùng xanh cùng REBOX\"",
      "content": "Tổng hợp tất cả các video tham gia và làm thành 1 video ngắn recap truyền cảm hứng sống xanh.",
      "format": "Video recap ngắn",
      "date": "2026-12-21",
      "time": "19:45",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mailinh"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop&q=80",
      "note": "Video recap tổng hợp các khoảnh khắc sinh viên dùng hộp REBOX.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_12",
      "title": "Chương trình MERRY REBOX “Mượn hộp xanh, nhận quà giáng sinh”",
      "content": "200 Sticker chủ đề giáng sinh, bài đăng chương trình, poster đặt tại các trạm. Chạy ads bài đăng trên Facebook và TikTok.",
      "format": "Chiến dịch truyền thông & Quà tặng POSM",
      "date": "2026-12-22",
      "time": "09:00",
      "platforms": [
        "tiktok",
        "facebook",
        "offline"
      ],
      "ads": "Facebook & TikTok Ads (22/12 - 26/12)",
      "assignees": [
        "nv_thaivy",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1543258103-a62bdc069871?w=400&auto=format&fit=crop&q=80",
      "note": "Chạy ads bài đăng trên Facebook và TikTok (22/12 - 26/12). 200 sticker Noel tại các trạm.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_13",
      "title": "Trao giải video thử thách số \"7 ngày dùng xanh cùng REBOX\"",
      "content": "Bài đăng công bố kết quả giải nhất (1tr), giải nhì (700k), giải ba (500k), khuyến khích (300k) và danh sách liên hệ nhận thưởng voucher Phê La & Cơm tấm Bụi.",
      "format": "Bài đăng công bố & Banner",
      "date": "2026-12-27",
      "time": "10:00",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_taythi",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Công bố giải thưởng chính thức và trao voucher cho sinh viên.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_14",
      "title": "Nhìn lại hoạt động trải nghiệm và nhắc sinh viên hoàn thành lượt trả hộp",
      "content": "Khép lại tháng 12, tiếp tục vòng xanh: Tổng kết kết quả bước đầu và kêu gọi duy trì thói quen. Mở ra các chương trình tháng 1. Đăng trên Facebook, Website.",
      "format": "Bài đăng tổng kết",
      "date": "2026-12-30",
      "time": "14:30",
      "platforms": [
        "website",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Bài đăng trên Facebook và Website REBOX chính thức.",
      "phase": "Giai đoạn 1 (T12/2026)"
    },
    {
      "id": "rb_15",
      "title": "Khởi động tháng 1 - Green UED Tour - REBOX GREEN WEEK",
      "content": "Bài viết công bố chuỗi hoạt động diễn ra trong tháng 1. Ảnh tổng 4 hoạt động + caption. Kênh: Fanpage, chạy ads (trên facebook) + Kênh truyền thông của trường (HTTT). 2 bài.",
      "format": "Ảnh tổng 4 hoạt động (2 bài)",
      "date": "2027-01-01",
      "time": "09:00",
      "platforms": [
        "facebook",
        "httt"
      ],
      "ads": "Facebook Ads (Khởi động GĐ 2)",
      "assignees": [
        "nv_taythi",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&auto=format&fit=crop&q=80",
      "note": "Chạy ads trên Facebook. Phối hợp Kênh truyền thông của trường (HTTT) đăng 2 bài.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_16",
      "title": "Mở đăng ký Seminar: “Một lần sử dụng, bao lâu để phân hủy?”",
      "content": "Giới thiệu vấn đề đặt ra trong Seminar, thời gian, địa điểm tổ chức, link đăng ký… Kênh: Fanpage, HTTT của nhà trường, các khoa. 1 bài.",
      "format": "Ảnh thông tin sự kiện & Caption",
      "date": "2027-01-02",
      "time": "11:00",
      "platforms": [
        "httt",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Đăng trên Fanpage và Kênh truyền thông HTTT của nhà trường, các khoa.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_17",
      "title": "Mở đăng ký Workshop: Behind the REBOX - Phía sau chiếc hộp REBOX có gì?",
      "content": "Ảnh + infographic ngắn. Giới thiệu nội dung workshop thực tế về quy trình làm sạch chuẩn ISO. Kênh: Fanpage, HTTT của nhà trường, các khoa. 1 bài.",
      "format": "Ảnh + Infographic ngắn",
      "date": "2027-01-03",
      "time": "11:00",
      "platforms": [
        "httt",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Đăng trên Fanpage và Kênh truyền thông HTTT nhà trường, các khoa.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_18",
      "title": "Mở đăng ký - Từ nhận thức đến hành động: Cuộc thi “chạy” cùng REBOX",
      "content": "Poster thể lệ, bài đăng kêu gọi tham gia. Kênh: Fanpage, HTTT của nhà trường, các khoa. 1 bài.",
      "format": "Poster thể lệ, bài đăng kêu gọi tham gia",
      "date": "2027-01-04",
      "time": "11:00",
      "platforms": [
        "httt",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_thaivy",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Poster thể lệ và link đăng ký thi chạy, đăng Fanpage & kênh trường HTTT.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_19",
      "title": "Trước khi đến triển lãm - Một chiếc hộp dùng một lần sẽ đi về đâu?",
      "content": "Bài 1: Giới thiệu về tham quan. Bài 2: Xác nhận người tham gia và đóng link đăng ký seminar. Ảnh được design gợi mở về chất liệu, phân tích góc nhìn nghệ thuật. Kênh: Fanpage, HTTT nhà trường, các khoa. 2 bài.",
      "format": "Ảnh design gợi mở & Bài phân tích (2 bài)",
      "date": "2027-01-05",
      "time": "14:00",
      "platforms": [
        "httt",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "",
      "note": "2 bài: Giới thiệu tham quan triển lãm và chốt danh sách Seminar.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_20",
      "title": "Gặp gỡ diễn giả Seminar - Người đồng hành cùng những cuộc đối thoại",
      "content": "Ảnh chân dung + poster thiết kế giới thiệu chuyên gia môi trường đồng hành. Kênh: Fanpage. 1 bài.",
      "format": "Ảnh chân dung + Poster thiết kế",
      "date": "2027-01-06",
      "time": "11:00",
      "platforms": [
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_thaivy",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Ảnh chân dung + poster giới thiệu diễn giả và trích dẫn tâm đắc.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_21",
      "title": "24 giờ trước Seminar - Bạn đã sẵn sàng đặt câu hỏi chưa?",
      "content": "Nhắc về thời gian, địa điểm… Đăng story trên Facebook đếm ngược và gửi email xác nhận tham gia với những người đăng ký. Kênh: Fanpage, email cho người đăng ký. (1 bài, 1 story Facebook, và các bài email -> 3 bài).",
      "format": "Ảnh nhắc lịch, Story countdown & Email (3 bài)",
      "date": "2027-01-07",
      "time": "08:30",
      "platforms": [
        "email",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_mailinh"
      ],
      "status": "scheduled",
      "image": "",
      "note": "1 bài Fanpage, 1 story Facebook countdown và hệ thống gửi email xác nhận.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_22",
      "title": "Seminar - Lắng nghe và đối thoại & Bài chuyên đề chuẩn ISO REBOX",
      "content": "Story cập nhật, ảnh chụp nhanh tại sự kiện (2 story). Bài chuyên đề: \"Liệu hộp thức ăn dùng nhiều lần có thực sự sạch? Giải mã quy trình vệ sinh chuẩn ISO đằng sau chiếc hộp xanh REBOX\". Đăng trên Website chính thức của REBOX (1 bài).",
      "format": "Story trực tiếp & Bài chuyên đề Website",
      "date": "2027-01-08",
      "time": "09:00",
      "platforms": [
        "website",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_taythi",
        "nv_mypham",
        "nv_mailinh"
      ],
      "status": "scheduled",
      "image": "",
      "note": "2 story cập nhật trực tiếp tại sự kiện và 1 bài chuyên đề trên Website chính thức.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_23",
      "title": "Workshop Behind the REBOX - Phía sau chiếc hộp REBOX có gì?",
      "content": "Đăng timeline trong ngày. Story cập nhật workshop đang diễn ra… Ảnh timeline, story, ảnh/video tại chỗ. Kênh: Fanpage, story, email nhắc người đăng ký (1 bài, 2 story -> 3 bài).",
      "format": "Ảnh timeline, Story & Email nhắc lịch (3 bài)",
      "date": "2027-01-09",
      "time": "08:30",
      "platforms": [
        "email",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mailinh",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Đăng timeline, 2 story trực tiếp và gửi email nhắc người đăng ký tham dự.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_24",
      "title": "Từ nhận thức đến hành động: Cuộc thi “chạy” cùng REBOX",
      "content": "Bài 1: Thông báo hoạt động trong ngày (00h 10/01). Bài 2: Cập nhật không khí các “trạm” người tham gia và thông điệp. Bài 3 (sau cuộc thi): Đăng bài công bố kết quả. Kênh: Fanpage, story. 3 bài.",
      "format": "Bài đăng timeline, Story & Album kết quả (3 bài)",
      "date": "2027-01-10",
      "time": "06:00",
      "platforms": [
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_mailinh",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "",
      "note": "3 bài: Thông báo 00h, story trực tiếp các trạm và bài công bố kết quả.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_25",
      "title": "Tham quan triển lãm REBOX tại UED",
      "content": "Bài 1: Giới thiệu không gian, tác phẩm, chất liệu, khách mời… Bài 2: Bài viết về giá trị và thông điệp phía sau của tác phẩm trưng bày. Album ảnh, ảnh không gian và thông tin tham quan. Kênh: Fanpage, story. 2 bài.",
      "format": "Album ảnh, ảnh không gian & Bài viết (2 bài)",
      "date": "2027-01-11",
      "time": "09:00",
      "platforms": [
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "",
      "note": "2 bài: Album ảnh không gian triển lãm và bài viết thông điệp tác phẩm.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_26",
      "title": "RECAP - Green UED Tour – REBOX GREEN LIVING WEEK",
      "content": "Video và hình ảnh, video phỏng vấn của cả 4 hoạt động (dài từ 1p30s - 2p). Video, story ngắn. Kênh: Fanpage, video TikTok (1 video, 1 story -> 2 bài).",
      "format": "Video phỏng vấn & Story ngắn (2 bài)",
      "date": "2027-01-13",
      "time": "19:45",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mailinh"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Video phỏng vấn cả 4 hoạt động (1p30s-2p) đăng TikTok và Fanpage.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_27",
      "title": "Những câu hỏi còn ở lại sau chuỗi trải nghiệm REBOX",
      "content": "Tổng hợp các câu hỏi nổi bật, nhận định hay từ Seminar, workshop, cuộc thi và triển lãm. Kết nối vấn đề rác thải với lựa chọn sử dụng hộp nhiều lần. Carousel hỏi - đáp. Kênh: Fanpage, bài viết trên trang trường và fanpage trường (2 bài).",
      "format": "Carousel hỏi - đáp (2 bài)",
      "date": "2027-01-15",
      "time": "11:00",
      "platforms": [
        "httt",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Đăng trên Fanpage REBOX và bài viết trên trang thông tin, fanpage nhà trường.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_28",
      "title": "REBOX x Báo Đà Nẵng: Người trẻ chung tay giảm thiểu rác thải nhựa dùng một lần",
      "content": "Người trẻ chung tay giảm thiểu rác thải nhựa dùng một lần qua dự án REBOX. Share về Fanpage của REBOX. Kênh: Báo Đà Nẵng, Fanpage (2 bài).",
      "format": "Share liên kết Báo Đà Nẵng (2 bài)",
      "date": "2027-01-18",
      "time": "10:00",
      "platforms": [
        "bao_danang",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_taythi"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Bài phóng sự trên Báo Đà Nẵng và bài share lan tỏa trên Fanpage REBOX.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_29",
      "title": "5 điều sinh viên thường băn khoăn khi dùng REBOX",
      "content": "Thu thập các câu hỏi từ sinh viên trên bài đăng story gợi mở, sau đó đăng bài từ những thắc mắc đó. Carousel FAQ. Kênh: Fanpage, story hỏi đáp (1 bài).",
      "format": "Carousel FAQ (1 bài)",
      "date": "2027-01-24",
      "time": "14:30",
      "platforms": [
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Story hỏi đáp gợi mở và bài đăng Carousel FAQ giải đáp 5 thắc mắc.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_30",
      "title": "Tổng kết hoạt động truyền thông tháng 1 & Chuẩn bị chặng Tết",
      "content": "Video và bài viết truyền thông. Video + bài viết đăng Fanpage & TikTok (1 video, 1 bài viết).",
      "format": "Video + Bài viết tổng kết",
      "date": "2027-01-31",
      "time": "19:45",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mailinh",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "1 video TikTok và 1 bài viết Fanpage tổng kết trọn vẹn tháng 1.",
      "phase": "Giai đoạn 2 (T01/2027)"
    },
    {
      "id": "rb_31",
      "title": "Nhắc sinh viên trả hộp trước khi về quê ăn Tết (24 Âm lịch)",
      "content": "Nhắc sinh viên dọn tủ lạnh, ngắt cầu dao về quê ăn Tết và thông báo trạm tạm dừng từ 03/02/2027. CTA: “Kiểm tra ngay giỏ đồ và mang REBOX ra trạm gần nhất trả trước 17h ngày 03/02 để nhận lại tiền cọc nhé.”",
      "format": "Bài viết và Infographic (120 – 150 chữ)",
      "date": "2027-02-01",
      "time": "09:00",
      "platforms": [
        "confessions",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Kênh: Fanpage REBOX, UED Confessions. Mục tiêu thu hồi >90% hộp, 300+ tương tác.",
      "phase": "Giai đoạn 3 (T02/2027)"
    },
    {
      "id": "rb_32",
      "title": "Thiệp chúc Tết thiết kế: “Khai niên rực rỡ – Cả năm sống xanh cùng REBOX”",
      "content": "Chúc mừng năm mới với thông điệp: “REBOX gửi đến quý vị Khai niên rực rỡ – Cả năm sống xanh cùng REBOX. Chúc cả nhà năm mới vui vẻ, cung hỉ phát tài” (29 Âm lịch).",
      "format": "Thiệp chúc Tết thiết kế (80 – 100 chữ)",
      "date": "2027-02-06",
      "time": "20:00",
      "platforms": [
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_thaivy",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "https://images.unsplash.com/photo-1543258103-a62bdc069871?w=400&auto=format&fit=crop&q=80",
      "note": "Kênh: Fanpage REBOX. Giữ nhận diện thương hiệu dịp Tết. 200+ tương tác.",
      "phase": "Giai đoạn 3 (T02/2027)"
    },
    {
      "id": "rb_33",
      "title": "Poster thông báo hệ thống trạm REBOX hoạt động trở lại",
      "content": "Thông báo hệ thống trạm REBOX chính thức hoạt động trở lại vào ngày 12/02/2027 (Mùng 5 Tết). CTA: “Lên lịch quay lại trường và sẵn sàng quét mã mượn hộp từ sáng mai 12/02 cùng REBOX nào.”",
      "format": "Poster thông báo (100 – 120 chữ)",
      "date": "2027-02-11",
      "time": "11:00",
      "platforms": [
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_thaivy",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Kênh: Fanpage REBOX. Đạt 1.500+ lượt tiếp cận. Kêu gọi lại người dùng cũ.",
      "phase": "Giai đoạn 3 (T02/2027)"
    },
    {
      "id": "rb_34",
      "title": "Phát động thử thách tích 3 lần mượn – trả hộp nhận vé Minishow & Poster giấu mặt nghệ sĩ",
      "content": "Phát động thử thách tích 3 lần mượn – trả hộp đúng hạn (15–21/02/2027) nhận vé Minishow. Tung poster giấu mặt nghệ sĩ. CTA: “Quét mã mượn hộp ngay hôm nay để tích đủ 3 lượt đổi vé và đoán xem nhân vật bí ẩn ngày 21/02 là ai nào.”",
      "format": "Poster thể lệ và Video TikTok (180 – 220 chữ / Video 30s)",
      "date": "2027-02-15",
      "time": "11:15",
      "platforms": [
        "tiktok",
        "confessions",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mypham",
        "nv_thaivy",
        "nv_mailinh"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Kênh: Fanpage REBOX, UED Confessions, TikTok. Đạt 3.000+ tiếp cận, 500+ lượt mượn trong 3 ngày đầu.",
      "phase": "Giai đoạn 3 (T02/2027)"
    },
    {
      "id": "rb_35",
      "title": "Tung poster Key Visual chính thức công bố nghệ sĩ khách mời KhoiVu & Clip teaser săn vé",
      "content": "Tung poster chính thức công bố nghệ sĩ khách mời KhoiVu cùng thể lệ săn vé chặng cuối. CTA: “Chỉ còn 4 ngày cuối! Hãy nhanh tay hoàn thành 3 lượt mượn – trả hộp để đổi vé gặp KhoiVu nhé.”",
      "format": "Poster Key Visual và Clip teaser (120 – 150 chữ / Clip 15s)",
      "date": "2027-02-17",
      "time": "19:45",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_thaivy",
        "nv_mailinh",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Kênh: Fanpage REBOX, TikTok. Đạt 4.000+ tiếp cận. Phát hết 100% vé Minishow.",
      "phase": "Giai đoạn 3 (T02/2027)"
    },
    {
      "id": "rb_36",
      "title": "Bài viết trang trọng và Bộ ảnh tri ân nhà tài trợ và đối tác",
      "content": "Gửi lời cảm ơn tới nhà tài trợ và đơn vị đồng hành: “Xin cảm ơn Trường ĐHSP – ĐHĐN. Xin cảm ơn thương hiệu cà phê Phê La. Xin cảm ơn Cơm Tấm Bụi. Và một lần nữa REBOX xin được gửi lời cảm ơn chân thành đến tất cả các đơn vị đồng hành và các đối tác xanh của REBOX.”",
      "format": "Bài viết trang trọng và Bộ ảnh tri ân (250 – 300 chữ)",
      "date": "2027-02-23",
      "time": "14:30",
      "platforms": [
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_taythi",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Kênh: Fanpage REBOX. Giữ quan hệ với các đối tác, nhà tài trợ. 100% đối tác được gắn thẻ và chia sẻ lại.",
      "phase": "Giai đoạn 3 (T02/2027)"
    },
    {
      "id": "rb_37",
      "title": "Đăng khoảnh khắc bùng nổ và công bố các con số thành công của buổi Minishow ngày 21/02",
      "content": "Đăng khoảnh khắc bùng nổ và công bố các con số thành công của buổi Minishow ngày 21/02. CTA: “Hãy chia sẻ những khoảnh khắc và cảm nhận của bạn về đêm nhạc cùng REBOX.”",
      "format": "Album ảnh sự kiện (15–20 ảnh) (180 – 200 chữ)",
      "date": "2027-02-25",
      "time": "11:15",
      "platforms": [
        "confessions",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_mailinh",
        "nv_mypham"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Kênh: Fanpage REBOX, UED Confessions. Tạo hiệu ứng lan tỏa sau sự kiện. 500+ tương tác, chia sẻ.",
      "phase": "Giai đoạn 3 (T02/2027)"
    },
    {
      "id": "rb_38",
      "title": "Video Recap và bài viết tổng kết hành trình 3 tháng toàn chiến dịch REBOX",
      "content": "Video Recap tổng kết hành trình 3 tháng của toàn bộ chiến dịch REBOX tại ĐHSP. CTA: “Hành trình 3 tháng khép lại nhưng thói quen xanh vẫn tiếp diễn. Hãy tiếp tục đồng hành cùng REBOX mỗi ngày.”",
      "format": "Video Recap (60–90s) và bài viết tổng kết (250–300 chữ)",
      "date": "2027-02-28",
      "time": "19:45",
      "platforms": [
        "tiktok",
        "facebook"
      ],
      "ads": null,
      "assignees": [
        "nv_taythi",
        "nv_mailinh"
      ],
      "status": "scheduled",
      "image": "",
      "note": "Kênh: Fanpage REBOX, TikTok. Đạt 3.500+ lượt xem video. Khép lại chiến dịch trọn vẹn.",
      "phase": "Giai đoạn 3 (T02/2027)"
    }
  ];
}

class SproutStore {
  constructor() {
    this.KEY_POSTS = 'SPROUT_REBOX_POSTS_V4';
    this.KEY_MEMBERS = 'SPROUT_REBOX_MEMBERS_V5';
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

  filterPosts({ memberId = 'all', keyword = '', status = 'all', phase = 'all', platform = 'all', onlyAds = false }) {
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

      if (platform !== 'all') {
        if (!p.platforms || !p.platforms.includes(platform)) {
          return false;
        }
      }

      if (onlyAds) {
        if (!p.ads) return false;
      }

      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matchTitle = (p.title || '').toLowerCase().includes(q);
        const matchContent = (p.content || '').toLowerCase().includes(q);
        const matchNote = (p.note || '').toLowerCase().includes(q);
        const matchFormat = (p.format || '').toLowerCase().includes(q);
        const matchAds = (p.ads || '').toLowerCase().includes(q);
        if (!matchTitle && !matchContent && !matchNote && !matchFormat && !matchAds) {
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
