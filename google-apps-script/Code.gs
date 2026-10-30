/**
 * MỘC HOLA order receiver for the user's order spreadsheet.
 * Paste this file into Extensions > Apps Script from the target spreadsheet,
 * save it, then deploy it as a web app.
 */
const SPREADSHEET_ID = '1lD6TPOCngDfNv6u-yvlT508mbSQ2G0BCT7mAXGee6kY';
const ORDER_SHEET_NAME = 'Đơn hàng';

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Thiếu dữ liệu đơn hàng.');
  }

  const order = JSON.parse(e.postData.contents);
  if (!order.name || !order.phone || !order.address || !Array.isArray(order.items) || !order.items.length) {
    throw new Error('Đơn hàng thiếu thông tin người nhận hoặc danh sách món.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(ORDER_SHEET_NAME)
      || spreadsheet.insertSheet(ORDER_SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Mã đơn', 'Thời gian', 'Tên khách', 'Điện thoại', 'Địa chỉ', 'Món', 'Tổng tiền', 'Ghi chú']);
      sheet.setFrozenRows(1);
    }

    const items = order.items.map(item =>
      `${item.name}${item.size ? ` (${item.size})` : ''} x${item.quantity} — ${item.price * item.quantity}đ`
    ).join('\n');
    const safeText = value => {
      const text = String(value || '');
      return /^[=+@\-]/.test(text) ? `'${text}` : text;
    };

    sheet.appendRow([
      safeText(order.orderId),
      new Date(order.createdAt || Date.now()),
      safeText(order.name),
      safeText(order.phone),
      safeText(order.address),
      safeText(items),
      Number(order.total) || 0,
      safeText(order.note),
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, orderId: order.orderId }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
