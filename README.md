# MỘC HOLA

Trang menu đặt món bằng React + Vite. Đơn hàng được ghi vào Google Sheet có ID `1lD6TPOCngDfNv6u-yvlT508mbSQ2G0BCT7mAXGee6kY`, trong tab `Đơn hàng`.

## Bật gửi đơn vào Google Sheet

1. Mở [Google Sheet nhận đơn](https://docs.google.com/spreadsheets/d/1lD6TPOCngDfNv6u-yvlT508mbSQ2G0BCT7mAXGee6kY/edit).
2. Chọn **Tiện ích mở rộng → Apps Script**.
3. Thay nội dung `Code.gs` bằng file `google-apps-script/Code.gs`, rồi lưu project.
4. Chọn **Deploy → New deployment → Web app**. Chọn chạy dưới tài khoản của bạn và quyền truy cập **Anyone**, rồi deploy và cấp quyền cho Apps Script truy cập Sheet.
5. Sao chép URL web app kết thúc bằng `/exec` vào `.env.local`:

   ```env
   VITE_SHEETS_WEBHOOK=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   ```

6. Khởi động lại Vite hoặc build lại sau khi sửa biến môi trường. Mỗi đơn được ghi thành một dòng trong tab `Đơn hàng`.

## Chạy trang

```sh
npm install
npm run dev
```

Tạo bản tĩnh:

```sh
npm run build
```

Đưa thư mục `dist` lên hosting tĩnh (Netlify, Vercel hoặc GitHub Pages). Cấu hình `VITE_SHEETS_WEBHOOK` trong môi trường build của hosting.

Giá trong menu được lấy từ nội dung menu đã gửi; một vài món có nhiều mức giá nên khách chọn loại/size trước khi thêm vào giỏ. Phí giao hàng 5.000–30.000đ được quán xác nhận theo địa chỉ.
