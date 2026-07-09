/* ============================================================
   DATA.JS — NƠI DUY NHẤT CẦN SỬA KHI THÊM/SỬA NỘI DUNG
   - Muốn đổi hình ảnh: sửa đường dẫn trong "image"
   - Muốn đổi nội dung trang con: sửa "pageContent" hoặc "pageUrl"
   - Muốn thêm 1 giai đoạn (button) mới: copy 1 object, dán vào mảng,
     sửa id/title/image là xong — không cần đụng vào script.js
   ============================================================ */

// ẢNH NỀN TRANG CHÍNH (toàn bộ text/logo đã được designer đặt cứng trong ảnh này)
const mainBackground = "images/main-background.jpg"; // PLACEHOLDER - thay ảnh nền tại đây

// 5 GIAI ĐOẠN CHÍNH (5 button hình ảnh ở giữa)
const stagesData = [
  {
    id: "truoc-mang-thai",
    title: "TRƯỚC MANG THAI",
    image: "images/stage-1-truoc-mang-thai.jpg", // PLACEHOLDER - thay ảnh tại đây
    pageUrl: "pages/truoc-mang-thai.html", // PLACEHOLDER - trang đích
    subPages: [ // PLACEHOLDER - 3 ảnh full-page: 1.Mục tiêu 2.Khuyến cáo 3.Giải pháp
      "images/truoc-mang-thai-1-muc-tieu.jpg",
      "images/truoc-mang-thai-2-khuyen-cao.jpg",
      "images/truoc-mang-thai-3-giai-phap.jpg"
    ]
  },
  {
    id: "mang-thai",
    title: "MANG THAI",
    image: "images/stage-2-mang-thai.jpg", // PLACEHOLDER
    pageUrl: "pages/mang-thai.html", // PLACEHOLDER
    subPages: [ // PLACEHOLDER
      "images/mang-thai-1-muc-tieu.jpg",
      "images/mang-thai-2-khuyen-cao.jpg",
      "images/mang-thai-3-giai-phap.jpg"
    ]
  },
  {
    id: "sau-sinh",
    title: "SAU SINH",
    image: "images/stage-3-sau-sinh.jpg", // PLACEHOLDER
    pageUrl: "pages/sau-sinh.html", // PLACEHOLDER
    subPages: [ // PLACEHOLDER
      "images/sau-sinh-1-muc-tieu.jpg",
      "images/sau-sinh-2-khuyen-cao.jpg",
      "images/sau-sinh-3-giai-phap.jpg"
    ]
  },
  {
    id: "phau-thuat-phu-khoa",
    title: "PHẪU THUẬT PHỤ KHOA",
    image: "images/stage-4-phau-thuat-phu-khoa.jpg", // PLACEHOLDER
    pageUrl: "pages/phau-thuat-phu-khoa.html", // PLACEHOLDER
    subPages: [ // PLACEHOLDER
      "images/phau-thuat-phu-khoa-1-muc-tieu.jpg",
      "images/phau-thuat-phu-khoa-2-khuyen-cao.jpg",
      "images/phau-thuat-phu-khoa-3-giai-phap.jpg"
    ]
  },
  {
    id: "tien-man-kinh",
    title: "TIỀN MÃN KINH",
    image: "images/stage-5-tien-man-kinh.jpg", // PLACEHOLDER
    pageUrl: "pages/tien-man-kinh.html", // PLACEHOLDER
    subPages: [ // PLACEHOLDER
      "images/tien-man-kinh-1-muc-tieu.jpg",
      "images/tien-man-kinh-2-khuyen-cao.jpg",
      "images/tien-man-kinh-3-giai-phap.jpg"
    ]
  }
];

// 3 NHÃN HÀNG (ô chữ hình ảnh có glow chạy viền)
const brandsData = [
  {
    id: "ferlatum",
    image: "images/brand-ferlatum.png" // PLACEHOLDER - thay ảnh logo tại đây
  },
  {
    id: "gemapaxane",
    image: "images/brand-gemapaxane.png" // PLACEHOLDER
  },
  {
    id: "natecal-d3",
    image: "images/brand-natecal-d3.png" // PLACEHOLDER
  }
];