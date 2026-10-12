# Zabu — Website Developer · "The Professional Journey"

Portfolio kể chuyện bằng cuộn trang: nhân vật 2D rời bàn làm việc, đi qua các "trạm" sự nghiệp, bước vào phòng triển lãm dự án và kết thúc ở quán cà phê với form liên hệ.

## Chạy thử

Site tĩnh, không cần build. Mở thẳng `index.html`, hoặc chạy server local:

```bash
python3 -m http.server 5173
# mở http://localhost:5173
```

## Cấu trúc

```
index.html        Khung trang + cảnh SVG (bàn làm việc, quán café, nhân vật)
css/style.css     Giao diện, glassmorphism, bố cục ngang (desktop) / dọc (mobile)
js/data.js        ★ NỘI DUNG: kinh nghiệm, dự án, mạng xã hội, email
js/scenes.js      Sinh tòa nhà, skyline, mock giao diện dự án, icon
js/character.js   Rig nhân vật đi bộ — bước chân tính theo quãng đường cuộn
js/i18n.js        Từ điển EN/VI + tự chọn ngôn ngữ theo IP
js/main.js        GSAP ScrollTrigger: pin + cuộn ngang, reveal, gallery, modal, form
```

## Chỉnh nội dung

- **Kinh nghiệm, dự án, mạng xã hội, email**: sửa `js/data.js`. Toàn bộ dữ liệu hiện tại là **mẫu**.
- **Trạm sự nghiệp**: mảng `experience` trong `js/data.js`. `building` chọn toà nhà có animation (`bank`, `vending`, `finance`, `luxury`, `pod`); `scene` chọn cảnh Zabu đang làm việc (`bank` dùng máy POS, `ops` quét QR, `loan` tư vấn vay online, `luxury` giới thiệu điện thoại, `pod` nhận đơn trên laptop).
- **Nhân vật**: dựng trong `js/avatar.js`. Trang phục từng thời kỳ là biến CSS (`.outfit-bank`, `.outfit-ops`, `.outfit-finance`, `.outfit-luxury`, `.outfit-beach`, `.outfit-cinema` trong `css/style.css`), muốn đổi màu áo hay quần chỉ cần sửa biến. Khi đi ngang qua một cảnh, nhân vật đi bộ mờ dần và "hoà" vào cảnh diễn, rồi tiếp tục đi trong trang phục của cảnh đó.
- **Tiếng đàn**: `js/fx.js` mô phỏng cây acoustic rải ngón và chơi theo **tab**: `song.tab` trong mục guitar của `js/data.js`. Mỗi ô nhịp chia 16 móc kép; mỗi nốt ghi `[vị trí, 'dây:ngăn']`, ví dụ `[0, 'A:5', 'B:2']`. Nốt được để ngân; gảy lại dây hoặc đổi thế bấm sẽ chặn tiếng như tay thật. Trình duyệt chỉ cho phát tiếng sau lần chạm, bấm hoặc gõ phím đầu tiên; có nút bật/tắt trong thẻ Guitar.
- **Sở thích**: mảng `hobbies` trong `js/data.js`, gồm tiêu đề, mô tả và tag (song ngữ). Trường `art` chọn cảnh: `guitar`, `dota` (Pudge tung Meat Hook), `travel` (bãi biển), `movies` (rạp 3D). Bối cảnh nằm trong `js/scenes.js` (`hobbyArts`), Zabu diễn trong `js/avatar.js`; animation chỉ chạy khi đang hiển thị trên màn hình.
- **Câu giới thiệu và số liệu ở hero** (5+ năm, 40+ website…): sửa trực tiếp trong `index.html`.
- **Form liên hệ**: điền `contact.formEndpoint` (ví dụ Formspree) để gửi thật. Nếu để trống, form sẽ mở ứng dụng email (mailto).
- **Video dự án**: đặt file vào `assets/` rồi điền `video: 'assets/ten-du-an.mp4'`. Video tự play khi hover. Nếu không có video, site hiển thị một bản mock giao diện tự cuộn.

## Ngôn ngữ (EN / VI)

- Truy cập từ **IP Việt Nam** sẽ thấy tiếng Việt, các nước khác thấy tiếng Anh. Site tra quốc gia qua dịch vụ miễn phí `api.country.is` (dự phòng: `ipapi.co`) và cache kết quả trong phiên.
- Trong lúc chờ mạng, site đoán nhanh theo múi giờ hoặc ngôn ngữ trình duyệt để chữ không bị nháy.
- Người xem có thể bấm **VI / EN** trên thanh menu. Lựa chọn này được ghi nhớ và ưu tiên hơn IP.
- Xem thử từng ngôn ngữ: thêm `?lang=vi` hoặc `?lang=en` vào URL.
- Thêm hoặc sửa câu chữ giao diện trong `js/i18n.js`. Nội dung trong `data.js` dùng dạng `{ en: '...', vi: '...' }`.
- Nếu deploy trên Vercel, Netlify hoặc Cloudflare, có thể đổi sang header geo của edge (ví dụ `x-vercel-ip-country`) để không cần gọi dịch vụ bên ngoài.

## Cơ chế hoạt động

| Màn hình | Hành vi |
|---|---|
| Desktop (≥ 901px, cao ≥ 540px) | Pin + cuộn ngang. Nhân vật đứng dậy, cầm balo, đi bộ theo con lăn chuột: dừng cuộn thì đứng lại, cuộn ngược thì quay đầu. Đến cuối, nhân vật ngồi xuống quán café và đưa danh thiếp. |
| Mobile / tablet (màn hình dọc) | Dạng "sân khấu": trang không cuộn. Dock ở đáy có 4 tab section, dưới mỗi tab là các chấm (mỗi chấm là một điểm dừng, chấm hiện tại kéo dài). Nút chính ghi rõ điểm đến tiếp theo ("Tiếp: Trạm 03 · Nova Commerce"), đến cuối thì thành "Viết lời nhắn". Bấm tab hoặc nút thì nhân vật tự đi tới đó; vuốt cũng sang điểm kế tiếp. Lần truy cập đầu tiên có bong bóng gợi ý cử chỉ, chỉ hiện một lần. Form liên hệ mở dạng bottom sheet. |
| Điện thoại xoay ngang | Bố cục dọc, có parallax nhẹ (màn hình quá thấp cho cảnh ngang). |
| `prefers-reduced-motion` | Bố cục dọc, không có parallax. |
| GSAP không tải được | Bố cục dọc, vẫn đầy đủ nội dung. |

## Thay asset bằng AI (Giai đoạn 2 trong plan)

Nhân vật và bối cảnh hiện được vẽ bằng SVG flat vector nên nhẹ và không vỡ nét. Khi đã có asset từ Midjourney, Krea hoặc LottieFiles:

- **Bối cảnh**: thay các khối `<svg class="scene ...">` trong `index.html` bằng `<img>` (WebP). Giữ nguyên class `scene` để vị trí và kích thước tự khớp với nhân vật. Ghế ngồi nằm ở khoảng 38% chiều ngang ảnh.
- **Khuôn mặt giống thật hơn**: phần đầu của cả 3 nhân vật nằm trong `<g class="head">` (hệ toạ độ chung, tâm đầu tại 77,36). Có thể thay nội dung nhóm này bằng `<image href="assets/head.svg" x="54" y="10" width="50" height="58" />`, vẽ đầu nghiêng nhìn sang phải. Thân, tay, chân vẫn giữ rig nên nhân vật vẫn đi bộ được.
- **Nhân vật Lottie**: thay SVG trong `#walker` bằng `lottie-web`. Trong `tick()` ở `main.js`, gọi `anim.goToAndStop(phase, false)` thay cho `walker.update(...)` để animation vẫn bám theo thao tác cuộn.
- Tối ưu ảnh: WebP/AVIF, chiều rộng tối đa 1920px, thêm `loading="lazy"` cho ảnh ngoài hero.

## Deploy

Kéo thả cả thư mục lên Netlify / Vercel / GitHub Pages là chạy được.
