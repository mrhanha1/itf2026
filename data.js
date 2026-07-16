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
    image: "images/stage-1-truoc-mang-thai.png", // PLACEHOLDER - thay ảnh tại đây
    pageUrl: "pages/truoc-mang-thai.html", // PLACEHOLDER - trang đích
    subPages: [ // PLACEHOLDER - 4 ảnh full-page: 1.Mục tiêu 2.Khuyến cáo 3.Giải pháp 4.Trang mới
      "images/1.1.jpg",
      "images/1.2.jpg",
      "images/1.3.jpg",
      "images/1.4.jpg"
    ]
  },
  {
    id: "mang-thai",
    title: "MANG THAI",
    image: "images/stage-2-mang-thai.png", // PLACEHOLDER
    pageUrl: "pages/mang-thai.html", // PLACEHOLDER
    subPages: [ // PLACEHOLDER
      "images/2.1.jpg",
      "images/2.2.jpg",
      "images/2.3.jpg",
      "images/2.4.jpg",
      "images/2.5.jpg"
    ]
  },
  {
    id: "sau-sinh",
    title: "SAU SINH",
    image: "images/stage-3-sau-sinh.png", // PLACEHOLDER
    pageUrl: "pages/sau-sinh.html", // PLACEHOLDER
    subPages: [ // PLACEHOLDER
      "images/3.1.jpg",
      "images/3.2.jpg",
      "images/3.3.jpg",
      "images/3.4.jpg",
      "images/3.5.jpg"
    ]
  },
  {
    id: "phau-thuat-phu-khoa",
    title: "PHẪU THUẬT PHỤ KHOA",
    image: "images/stage-4-phau-thuat-phu-khoa.png", // PLACEHOLDER
    pageUrl: "pages/phau-thuat-phu-khoa.html", // PLACEHOLDER
    subPages: [ // PLACEHOLDER
      "images/4.1.jpg",
      "images/4.2.jpg",
      "images/4.3.jpg",
      "images/4.4.jpg",
      "images/4.5.jpg"
    ]
  },
  {
    id: "tien-man-kinh",
    title: "TIỀN MÃN KINH",
    image: "images/stage-5-tien-man-kinh.png", // PLACEHOLDER
    pageUrl: "pages/tien-man-kinh.html", // PLACEHOLDER
    subPages: [ // PLACEHOLDER
      "images/5.1.jpg",
      "images/5.2.jpg",
      "images/5.3.jpg",
      "images/5.4.jpg"
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