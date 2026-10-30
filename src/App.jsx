import { useEffect, useMemo, useRef, useState } from 'react'
import miindoImage from './assets/miindo.png'
import miTuongDenImage from './assets/mituongden.png'
import miTronDaHeoImage from './assets/mitrondaheo.png'
import phoTronFullToppingImage from './assets/photronfulltopping.png'
import combo45kImage from './assets/combo45k.png'
import gaVienChienImage from './assets/gavienchien.png'
import kimbapImage from './assets/kimbap.png'
import comboBanhMiImage from './assets/combobanhmi.png'
import xoaiLacImage from './assets/xoailac.png'
import caPheImage from './assets/caphe.png'
import duiGaImage from './assets/duiga.png'
import nuocCamEpImage from './assets/nuoccamep.png'
import combo85kImage from './assets/combo85k.png'
import comboBanhBaoImage from './assets/combobanhbao.png'
import suiCaoImage from './assets/suicao.png'
import xucXichGaLapXuongImage from './assets/xxxiengalapxuong.png'
import nuocEpLeImage from './assets/eple.png'
import nuocDuaHauImage from './assets/nuocduahau.png'
import oiImage from './assets/oi.png'
import banhGaImage from './assets/banhga.png'
import manImage from './assets/man.png'
import traManImage from './assets/traman.png'
import miGaSieuCayPhoMaiImage from './assets/migasieucayphomai.png'
import miYImage from './assets/miy.png'
import khoaiChienImage from './assets/khoaichien.png'
import duaHauImage from './assets/duahau.png'
import xoiImage from './assets/xoi.png'
import './App.css'

const menu = [
  { category: 'Mì & xôi', icon: '🍜', name: 'Xôi thập cẩm', price: 35000 },
  { category: 'Mì & xôi', icon: '🍚', name: 'Xôi xúc xích & lạp xưởng Đài Loan', price: 35000 },
  { category: 'Mì & xôi', icon: '🍚', name: 'Xôi xúc xích trứng / trứng ngải', price: 35000 },
  { category: 'Mì & xôi', icon: '🍗', name: 'Xôi gà nấm', prices: [10000, 45000], sizes: ['1 nắm', 'Combo 5 cái'] },
  { category: 'Mì & xôi', icon: '🍝', name: 'Mì trộn tương đen', prices: [35000, 40000, 50000], sizes: ['Thường', 'Thêm topping', 'Đặc biệt'], note: 'Không cay? Nhắn bếp nhé' },
  { category: 'Mì & xôi', icon: '🍝', name: 'Mì Indomie full topping', prices: [35000, 40000, 50000], sizes: ['Thường', 'Thêm topping', 'Đặc biệt'], popular: true },
  { category: 'Mì & xôi', icon: '🧀', name: 'Mì cay spaghetti phô mai', prices: [40000, 45000, 55000], sizes: ['Thường', 'Thêm topping', 'Đặc biệt'], note: 'Mì trộn, không phải mì Ý' },
  { category: 'Mì & xôi', icon: '🥓', name: 'Mì trộn da heo', prices: [35000, 40000, 50000], sizes: ['Thường', 'Thêm topping', 'Đặc biệt'], popular: true },
  { category: 'Mì & xôi', icon: '🥬', name: 'Mì trộn kim chi', prices: [35000, 40000, 50000], sizes: ['Thường', 'Thêm topping', 'Đặc biệt'] },
  { category: 'Mì & xôi', icon: '🍜', name: 'Phở trộn full topping', prices: [35000, 40000, 50000], sizes: ['Thường', 'Thêm topping', 'Đặc biệt'] },
  { category: 'Mì & xôi', icon: '🍝', name: 'Mì Ý', prices: [40000, 50000], sizes: ['Thường', 'Đặc biệt'], note: 'Thêm trứng +7k · lạp xưởng Đài Loan +15k' },
  { category: 'Mì & xôi', icon: '🌶️', name: 'Mì gà siêu cay phô mai', prices: [40000, 47000, 55000], sizes: ['Thường', 'Thêm trứng', 'Đặc biệt'], note: 'Thêm mì +12k' },
  { category: 'Bánh mì', icon: '🥖', name: 'Bánh mì nướng bơ mật ong', prices: [10000, 45000], sizes: ['1 cái', 'Combo 5 cái'] },
  { category: 'Bánh mì', icon: '🥖', name: 'Bánh mì nem khoai', price: 25000, popular: true },
  { category: 'Bánh mì', icon: '🥖', name: 'Bánh mì nem thịt xúc xích', price: 30000, popular: true },
  { category: 'Bánh mì', icon: '🥖', name: 'Bánh mì xúc xích, 2 trứng', price: 25000 },
  { category: 'Bánh mì', icon: '🥖', name: 'Bánh mì xúc xích, 2 trứng ngải cứu', price: 25000 },
  { category: 'Bánh mì', icon: '🥖', name: 'Bánh mì trứng bò khô', price: 25000 },
  { category: 'Bánh mì', icon: '🥖', name: 'Bánh mì kẹp lạp xưởng Đài Loan', price: 25000 },
  { category: 'Bánh mì', icon: '🥖', name: 'Bánh mì trứng / trứng ngải kẹp lạp xưởng Đài Loan', price: 30000 },
  { category: 'Bánh mì', icon: '🥖', name: 'Bánh mì muối ớt đặc biệt', prices: [30000, 40000], sizes: ['Thường', 'Đặc biệt'], popular: true },
  { category: 'Ăn vặt', icon: '🍟', name: 'Combo viên chiên', prices: [45000, 55000, 65000, 75000, 85000], sizes: ['45k', '55k', '65k', '75k', '85k'] },
  { category: 'Ăn vặt', icon: '🥟', name: 'Sủi cảo nhân thịt', prices: [3000, 35000], sizes: ['1 viên', 'Combo 12 viên'] },
  { category: 'Ăn vặt', icon: '🥟', name: 'Há cảo tam giác', prices: [5000, 25000], sizes: ['2 viên', '10 viên'] },
  { category: 'Ăn vặt', icon: '🧀', name: 'Xù cá cam phô mai', prices: [3000, 35000], sizes: ['1 viên', 'Combo 12 viên'] },
  { category: 'Ăn vặt', icon: '🥖', name: 'Combo ăn vặt bánh mì', price: 30000, note: 'Xúc xích, nem chua, viên rau củ, cá viên, khoai lang' },
  { category: 'Ăn vặt', icon: '🥟', name: 'Combo ăn vặt bánh bao', price: 30000, note: 'Xúc xích, nem chua, viên rau củ, cá viên, khoai lang' },
  { category: 'Ăn vặt', icon: '🍗', name: 'Combo gà 85k', price: 85000, note: '1 đùi, 1 cánh, khoai tây, 1 nước' },
  { category: 'Ăn vặt', icon: '🍗', name: 'Combo gà 130k', price: 130000, note: 'Đùi, cánh, kimbap, xúc xích, lạp sườn, khoai' },
  { category: 'Ăn vặt', icon: '🍗', name: 'Cánh gà chiên', prices: [30000, 35000, 35000, 40000], sizes: ['Thường · nhỏ', 'Thường · lớn', 'Cay · nhỏ', 'Cay · lớn'] },
  { category: 'Ăn vặt', icon: '🍗', name: 'Đùi gà chiên', prices: [35000, 40000], sizes: ['Thường', 'Cay'], popular: true },
  { category: 'Ăn vặt', icon: '🍗', name: 'Gà viên chiên', prices: [50000, 55000, 55000], sizes: ['Thường', 'Lắc phô mai', 'Sốt cay'], popular: true },
  { category: 'Ăn vặt', icon: '🥟', name: 'Kimbap chiên (2 cuộn)', price: 35000 },
  { category: 'Ăn vặt', icon: '🐔', name: 'Bánh gà truyền thống', prices: [8000, 35000], sizes: ['1 cái', '5 cái'] },
  { category: 'Ăn vặt', icon: '🌭', name: 'Xúc xích chiên', prices: [10000, 45000], sizes: ['1 cái', 'Combo 5 cái'] },
  { category: 'Ăn vặt', icon: '🌭', name: 'Hotdog', prices: [15000, 20000], sizes: ['Thường', 'Loại to'] },
  { category: 'Ăn vặt', icon: '🥓', name: 'Nem thịt', prices: [6000, 30000, 55000], sizes: ['1 cái', '5 cái', '10 cái'] },
  { category: 'Ăn vặt', icon: '🐔', name: 'Bánh gà phô mai', prices: [10000, 45000], sizes: ['1 cái', 'Combo 5 cái'] },
  { category: 'Ăn vặt', icon: '🍢', name: 'Gà xiên que', price: 12000 },
  { category: 'Ăn vặt', icon: '🧀', name: 'Khoai môn lệ phố phô mai', price: 30000, note: '6 viên' },
  { category: 'Ăn vặt', icon: '🍟', name: 'Khoai lang / khoai tây cọng chiên bơ giòn', price: 30000, popular: true },
  { category: 'Ăn vặt', icon: '🍠', name: 'Khoai lang kén', price: 30000 },
  { category: 'Ăn vặt', icon: '🌽', name: 'Ngô ngọt chiên', prices: [30000, 35000], sizes: ['Thường', 'Lắc phô mai'] },
  { category: 'Ăn vặt', icon: '🌽', name: 'Xiên rau củ', price: 5000 },
  { category: 'Ăn vặt', icon: '🍗', name: 'Nem chua rán phô mai', prices: [30000, 45000], sizes: ['6 cái', '10 cái'], popular: true },
  { category: 'Ăn vặt', icon: '🥓', name: 'Lạp sườn Đài Loan', prices: [15000, 145000], sizes: ['1 cái', 'Combo 10 cái'] },
  { category: 'Hoa quả', icon: '🥭', name: 'Xoài lắc', prices: [30000, 35000], sizes: ['Muối ớt', 'Lắc bò khô'] },
  { category: 'Hoa quả', icon: '🍉', name: 'Dưa hấu Sài Gòn', price: 25000 },
  { category: 'Hoa quả', icon: '🍑', name: 'Mận hậu lắc muối ớt', price: 35000 },
  { category: 'Hoa quả', icon: '🍏', name: 'Ổi bổ', price: 25000 },
  { category: 'Sinh tố', icon: '🥑', name: 'Sinh tố bơ', prices: [30000, 40000, 60000], sizes: ['M', 'L', 'XL'] },
  { category: 'Sinh tố', icon: '🥭', name: 'Sinh tố xoài', prices: [30000, 40000, 60000], sizes: ['M', 'L', 'XL'] },
  { category: 'Sinh tố', icon: '🍓', name: 'Sinh tố dâu tây', prices: [30000, 40000, 60000], sizes: ['M', 'L', 'XL'] },
  { category: 'Sinh tố', icon: '🫐', name: 'Sinh tố việt quất', prices: [30000, 40000, 55000], sizes: ['M', 'L', 'XL'] },
  { category: 'Sinh tố', icon: '🥥', name: 'Sinh tố dừa', prices: [30000, 40000, 60000], sizes: ['M', 'L', 'XL'] },
  { category: 'Sinh tố', icon: '🍈', name: 'Sinh tố mãng cầu', prices: [30000, 40000, 60000], sizes: ['M', 'L', 'XL'] },
  { category: 'Sữa chua', icon: '🧋', name: 'Sữa tươi trân châu đường đen', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua việt quất', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua dâu tây', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua táo xanh', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua dứa xoài', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua xoài', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua cam nha đam', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua dứa', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥝', name: 'Sữa chua kiwi', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua chanh leo', price: 30000, popular: true },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua lắc trân châu việt quất', prices: [30000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua lắc trân châu dâu tây', prices: [30000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua lắc trân châu xoài', prices: [30000, 35000], sizes: ['M', 'L'] },
  { category: 'Sữa chua', icon: '🍍', name: 'Sữa chua lắc trân châu dứa', prices: [30000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua lắc trân châu kiwi', prices: [30000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua lắc trân châu chanh leo', prices: [30000, 40000, 60000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🥤', name: 'Sữa chua lắc trân châu cà phê', prices: [30000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🍵', name: 'Latte matcha trân châu', prices: [35000, 50000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🍫', name: 'Latte socola trân châu', prices: [35000, 50000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🍠', name: 'Latte khoai môn trân châu', prices: [35000, 50000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🍓', name: 'Latte dâu trân châu', prices: [35000, 50000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Sữa chua', icon: '🍋', name: 'Chanh tuyết', price: 25000 },
  { category: 'Sữa chua', icon: '🍋', name: 'Chanh leo tuyết', price: 30000, popular: true },
  { category: 'Cà phê & trà', icon: '☕', name: 'Cà phê đen / nâu', price: 25000 },
  { category: 'Cà phê & trà', icon: '☕', name: 'Cà phê sữa nóng / đá', price: 25000 },
  { category: 'Cà phê & trà', icon: '☕', name: 'Bạc sỉu nóng', price: 30000 },
  { category: 'Cà phê & trà', icon: '☕', name: 'Bạc sỉu đặc biệt', price: 30000, popular: true },
  { category: 'Cà phê & trà', icon: '🥛', name: 'Sữa tươi cà phê đường đen', price: 30000 },
  { category: 'Cà phê & trà', icon: '🥥', name: 'Cà phê cốt dừa', price: 30000 },
  { category: 'Cà phê & trà', icon: '🥛', name: 'Milo nóng / đá', prices: [25000, 35000, 50000], sizes: ['Thường', 'Lớn', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🍫', name: 'Cacao nóng / đá', prices: [25000, 35000, 50000], sizes: ['Thường', 'Lớn', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🍫', name: 'Cacao / Milo đá xay', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🍵', name: 'Matcha đá xay', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🍑', name: 'Trà đào', prices: [27000, 40000, 42000], sizes: ['Thường', 'Siêu to', 'Siêu to khổng lồ'] },
  { category: 'Cà phê & trà', icon: '🌿', name: 'Trà bạc hà', prices: [25000, 40000, 42000], sizes: ['Thường', 'Siêu to', 'Siêu to khổng lồ'] },
  { category: 'Cà phê & trà', icon: '🌺', name: 'Trà ổi hồng', prices: [27000, 42000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🍊', name: 'Trà đào cam sả', prices: [35000, 48000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🧋', name: 'Trà Thái', prices: [20000, 35000], sizes: ['700 ml', '1 lít'] },
  { category: 'Cà phê & trà', icon: '🍋', name: 'Nước mía bạc hà', prices: [25000, 40000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🍋', name: 'Trà chanh', prices: [15000, 20000], sizes: ['Thường', 'Có cá bơi tung tăng'] },
  { category: 'Cà phê & trà', icon: '🍊', name: 'Trà tắc', prices: [15000, 20000], sizes: ['Thường', 'Có cá bơi tung tăng'] },
  { category: 'Cà phê & trà', icon: '🥤', name: 'Trà tắc dâu lắc sữa', prices: [25000, 40000], sizes: ['Thường', 'Siêu to'], popular: true },
  { category: 'Cà phê & trà', icon: '🍓', name: 'Trà chanh dâu lắc sữa', prices: [25000, 40000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🍊', name: 'Trà tắc Thái xanh xí muội', prices: [25000, 40000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🍑', name: 'Trà mận', price: 25000 },
  { category: 'Cà phê & trà', icon: '🥛', name: 'Quất lắc sữa', prices: [25000, 40000], sizes: ['Thường', 'Siêu to'] },
  { category: 'Cà phê & trà', icon: '🥤', name: 'Bò húc lắc sữa', price: 30000, popular: true },
  { category: 'Cà phê & trà', icon: '🥤', name: 'Sting đỏ / vàng lắc sữa', price: 25000 },
  { category: 'Cà phê & trà', icon: '🥤', name: 'Soda việt quất / dâu / đào / bạc hà / vải', price: 20000 },
  { category: 'Nước ép', icon: '🍊', name: 'Nước cam ép', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Nước ép', icon: '🍈', name: 'Nước ép dưa vàng', prices: [30000, 40000, 60000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Nước ép', icon: '🍉', name: 'Nước ép dưa hấu', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Nước ép', icon: '🍏', name: 'Nước ép ổi', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Nước ép', icon: '🍎', name: 'Nước ép táo', prices: [30000, 40000, 60000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Nước & món khác', icon: '🥤', name: 'Bò húc', price: 18000 },
  { category: 'Nước & món khác', icon: '🥤', name: 'Coca / Pepsi / Sting', price: 15000 },
  { category: 'Nước ép', icon: '🍐', name: 'Nước ép lê', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Nước ép', icon: '🍍', name: 'Nước ép dứa', prices: [25000, 35000, 50000], sizes: ['M', 'L', 'Siêu to'] },
  { category: 'Nước & món khác', icon: '🍮', name: 'Tào phớ truyền thống', price: 20000 },
]

const categories = ['Tất cả', ...new Set(menu.map((item) => item.category))]
const money = (value) => `${new Intl.NumberFormat('vi-VN').format(value)}đ`
const makeOrderId = () => `MOCHOLA-${Date.now()}`
const foodPhotos = {
  noodles: miindoImage,
  indomie: miindoImage,
  banhMi: 'https://images.unsplash.com/photo-1571917411767-20545014a0bc?auto=format&fit=crop&w=720&q=82',
  fried: 'https://images.unsplash.com/photo-1652957392622-17e7c96f1369?auto=format&fit=crop&w=720&q=82',
  smoothie: 'https://images.unsplash.com/photo-1645783916385-1c99860a2a42?auto=format&fit=crop&w=720&q=82',
  smoothieBo: 'https://images.unsplash.com/photo-1557753478-d111aef068be?auto=format&fit=crop&w=720&q=82',
  smoothieXoai: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=720&q=82',
  smoothieDau: 'https://images.unsplash.com/photo-1589734575451-8ddc34c5752b?auto=format&fit=crop&w=720&q=82',
  smoothieVietQuat: 'https://images.unsplash.com/photo-1588929473475-d16ffd5d068c?auto=format&fit=crop&w=720&q=82',
  drink: 'https://images.pexels.com/photos/33241823/pexels-photo-33241823/free-photo-of-refreshing-iced-thai-tea-in-lush-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=720',
  mango: 'https://images.unsplash.com/photo-1519096845289-95806ee03a1a?auto=format&fit=crop&w=720&q=82',
  xoi: 'https://cdn.pixabay.com/photo/2020/03/25/02/27/english-sticky-rice-4965904_1280.jpg',
  yogurtVietQuat: 'https://images.unsplash.com/photo-1484119117138-9aa37d8eec2a?auto=format&fit=crop&w=720&q=82',
  yogurtDauTay: 'https://images.unsplash.com/photo-1670843839025-d50924a51f31?auto=format&fit=crop&w=720&q=82',
  yogurtXoai: 'https://images.unsplash.com/photo-1601045108758-eaa0444f68fc?auto=format&fit=crop&w=720&q=82',
  yogurtChanhLeo: 'https://images.unsplash.com/photo-1501199643997-e3ed9bfbd317?auto=format&fit=crop&w=720&q=82',
  yogurtKiwi: 'https://images.unsplash.com/photo-1650265929240-fbf163e0d003?auto=format&fit=crop&w=720&q=82',
  nuocEpDuaVang: 'https://www.clarin.com/img/2024/07/10/Op0hirz1l_720x0__1.jpg',
  nuocEpOi: 'https://nguoiduatin.mediacdn.vn/media/le-thi-duyen/2021/05/22/nuoc-ep-oi-2.png',
  nuocEpTao: 'https://images.unsplash.com/photo-1668236513754-9be63d18970a?auto=format&fit=crop&w=720&q=82',
  nuocEpDua: 'https://images.unsplash.com/photo-1705246535138-953e01125cb0?auto=format&fit=crop&w=720&q=82',
  bacXiu: 'https://localbeansroastery.com/pic/news/images/what-is-bac-xiu-coffee.jpg',
  matcha: 'https://www.huongnghiepaau.com/wp-content/uploads/2016/10/cach-lam-matcha-da-xay.jpg',
  traDao: 'https://artfultea.com/cdn/shop/files/0-1_2f43135a-b317-47d8-8f56-5e79f8a4265f.jpg?width=900',
  traTac: 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/186932/Originals/tra-tac-bao-nhieu-calo.jpg',
  boHuc: 'https://karthika.sg/image/catalog/products/EnergyDrink/121015.jpg',
  soda: 'https://bsmedia.business-standard.com/_media/bs/img/article/2025-03/04/full/1741107215-303.jpg',
  taoPho: 'https://thucthan.com/media/2019/07/tao-pho/tao-pho.jpg',
  banhMiBoMatOng: 'https://happycooking.uk/cdn/shop/articles/main_2x_copy_a9869558-f85c-4c28-8b2d-6581302fb47d.jpg?v=1781868690&width=900',
  banhMiNemKhoai: 'https://i.vietgiaitri.com/2020/5/12/banh-mi-nem-khoai-va-5-mon-an-xe-chieu-hut-gioi-tre-o-tphcm-71a-4927037.jpg',
  banhMiNemThitXucXich: 'https://static.takeaway.com/images/restaurants/be/015P5Q11/products/chefs_banh_mi.png',
  banhMiXucXichTrung: 'https://photo.znews.vn/w660/Uploaded/sgogtn/2020_07_03/90086492_2914757925212018_41553644278182284_n.jpg',
  banhMiTrungBoKho: 'https://www.kaneta-group.co.jp/media/images/_u/recipe/27zs1zw606.jpg',
  banhMiLapXuong: 'https://d1w7312wesee68.cloudfront.net/gaXvppPxyCJrolqN0_qdDcbzuI2nZ9hLa57gLJ5psnc/resize%3Afit%3A720%3A720/plain/s3%3A/toasttab/menu_service/restaurants/c77ddae7-c2e8-4d73-ac5e-baa3f04cc252/MenuItem/b476a7a6-dc19-4792-a92b-57552eced808.jpg',
  banhMiTrungLapXuong: 'https://i0.wp.com/farm9.staticflickr.com/8168/7418447328_ba519034f8_c.jpg',
  banhMiMuoiOt: 'https://www.huongnghiepaau.com/wp-content/uploads/2024/04/banh-mi-nuong-muoi-ot.jpg',
  xoiLapXuong: 'https://ang-cooks.com/images/xoi-lap-xuong.jpg',
  xoiTrung: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/f0/58/03/sticky-rice-with-sausage.jpg?h=500&s=1&w=900',
  xoiGaNam: 'https://www.cet.edu.vn/wp-content/uploads/2018/03/xoi-ga-xe-nam-huong.jpg',
}
function imageFor(item) {
  if (item.name === 'Dưa hấu Sài Gòn') return duaHauImage
  if (item.name === 'Bánh gà truyền thống') return banhGaImage
  if (item.name === 'Mận hậu lắc muối ớt') return manImage
  if (item.name === 'Trà mận') return traManImage
  if (item.name === 'Mì gà siêu cay phô mai') return miGaSieuCayPhoMaiImage
  if (item.name === 'Mì Ý') return miYImage
  if (item.name === 'Ổi bổ') return oiImage
  if (item.name === 'Xoài lắc') return xoaiLacImage
  if (item.name === 'Sủi cảo nhân thịt') return suiCaoImage
  if (item.name.includes('Khoai') || item.name.includes('Ngô ngọt chiên')) return khoaiChienImage
  if (item.name === 'Xúc xích chiên' || item.name === 'Gà xiên que' || item.name.includes('Lạp sườn')) return xucXichGaLapXuongImage
  if (item.name === 'Đùi gà chiên') return duiGaImage
  if (item.name === 'Nước cam ép') return nuocCamEpImage
  if (item.name === 'Nước ép lê') return nuocEpLeImage
  if (item.name === 'Nước ép dưa hấu') return nuocDuaHauImage
  if (item.name === 'Nước ép dưa vàng') return foodPhotos.nuocEpDuaVang
  if (item.name === 'Nước ép ổi') return foodPhotos.nuocEpOi
  if (item.name === 'Nước ép táo') return foodPhotos.nuocEpTao
  if (item.name === 'Nước ép dứa') return foodPhotos.nuocEpDua
  if (item.name === 'Combo gà 85k') return combo85kImage
  if (item.name === 'Combo ăn vặt bánh bao') return comboBanhBaoImage
  if (item.category === 'Sữa chua') {
    if (item.name.includes('việt quất')) return foodPhotos.yogurtVietQuat
    if (item.name.includes('dâu tây')) return foodPhotos.yogurtDauTay
    if (item.name.includes('xoài')) return foodPhotos.yogurtXoai
    if (item.name.includes('chanh leo')) return foodPhotos.yogurtChanhLeo
    if (item.name.includes('dừa')) return foodPhotos.yogurtXoai
    if (item.name.includes('kiwi')) return foodPhotos.yogurtKiwi
    if (item.name.includes('cà phê')) return caPheImage
  }
  if (item.name === 'Combo ăn vặt bánh mì') return comboBanhMiImage
  if (item.name === 'Combo viên chiên') return combo45kImage
  if (item.name === 'Gà viên chiên') return gaVienChienImage
  if (item.name === 'Kimbap chiên (2 cuộn)') return kimbapImage
  if (item.name === 'Sinh tố bơ') return foodPhotos.smoothieBo
  if (item.name === 'Sinh tố xoài') return foodPhotos.smoothieXoai
  if (item.name === 'Sinh tố dâu tây') return foodPhotos.smoothieDau
  if (item.name === 'Sinh tố việt quất') return foodPhotos.smoothieVietQuat
  if (item.name === 'Cà phê đen / nâu') return caPheImage
  if (item.name === 'Bạc sỉu đặc biệt') return foodPhotos.bacXiu
  if (item.name === 'Matcha đá xay') return foodPhotos.matcha
  if (item.name === 'Trà đào') return foodPhotos.traDao
  if (item.name === 'Trà chanh' || item.name === 'Trà tắc' || item.name === 'Trà tắc dâu lắc sữa') return foodPhotos.traTac
  if (item.name === 'Bò húc') return foodPhotos.boHuc
  if (item.name === 'Coca / Pepsi / Sting') return foodPhotos.soda
  if (item.name === 'Tào phớ truyền thống') return foodPhotos.taoPho
  if (item.name === 'Bánh mì nướng bơ mật ong') return foodPhotos.banhMiBoMatOng
  if (item.name === 'Bánh mì nem khoai') return foodPhotos.banhMiNemKhoai
  if (item.name === 'Bánh mì nem thịt xúc xích') return foodPhotos.banhMiNemThitXucXich
  if (item.name === 'Bánh mì xúc xích, 2 trứng') return foodPhotos.banhMiXucXichTrung
  if (item.name === 'Bánh mì trứng bò khô') return foodPhotos.banhMiTrungBoKho
  if (item.name === 'Bánh mì kẹp lạp xưởng Đài Loan') return foodPhotos.banhMiLapXuong
  if (item.name === 'Bánh mì trứng kẹp lạp xưởng') return foodPhotos.banhMiTrungLapXuong
  if (item.name === 'Bánh mì muối ớt đặc biệt') return foodPhotos.banhMiMuoiOt
  if (item.name === 'Xôi thập cẩm') return xoiImage
  if (item.name === 'Xôi xúc xích & lạp xưởng Đài Loan') return foodPhotos.xoiLapXuong
  if (item.name === 'Xôi xúc xích trứng / trứng ngải') return foodPhotos.xoiTrung
  if (item.name === 'Xôi gà nấm') return foodPhotos.xoiGaNam
  if (item.category === 'Mì & xôi') {
    if (item.name === 'Mì trộn tương đen') return miTuongDenImage
    if (item.name === 'Mì trộn da heo') return miTronDaHeoImage
    if (item.name === 'Phở trộn full topping') return phoTronFullToppingImage
    if (item.name.includes('Indomie')) return foodPhotos.indomie
    return foodPhotos.noodles
  }
  if (item.category === 'Bánh mì') return foodPhotos.banhMi
  if (item.category === 'Ăn vặt') return foodPhotos.fried
  if (item.category === 'Hoa quả') return foodPhotos.mango
  if (item.category === 'Sinh tố') return foodPhotos.smoothie
  return foodPhotos.drink
}

function App() {
  const [category, setCategory] = useState('Tất cả')
  const [search, setSearch] = useState('')
  const [choices, setChoices] = useState({})
  const [cart, setCart] = useState([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', note: '' })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')
  const [success, setSuccess] = useState(false)
  const [addNotice, setAddNotice] = useState('')
  const addNoticeTimer = useRef(null)
  useEffect(() => () => window.clearTimeout(addNoticeTimer.current), [])
  const visible = useMemo(() => menu.filter((item) => (category === 'Tất cả' || item.category === category) && item.name.toLowerCase().includes(search.toLowerCase())), [category, search])
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  function addItem(item) {
    const index = choices[item.name] || 0
    const price = item.prices ? item.prices[index] : item.price
    const size = item.sizes ? item.sizes[index] : ''
    const key = `${item.name}-${index}`
    setCart((current) => {
      const existing = current.find((row) => row.key === key)
      return existing ? current.map((row) => row.key === key ? { ...row, quantity: row.quantity + 1 } : row) : [...current, { key, name: item.name, size, price, quantity: 1 }]
    })
    setAddNotice(`Đã thêm ${item.name} vào giỏ`)
    window.clearTimeout(addNoticeTimer.current)
    addNoticeTimer.current = window.setTimeout(() => setAddNotice(''), 2200)
  }

  function changeQuantity(key, amount) {
    setCart((current) => current.map((row) => row.key === key ? { ...row, quantity: row.quantity + amount } : row).filter((row) => row.quantity > 0))
  }

  async function submitOrder(event) {
    event.preventDefault()
    const endpoint = import.meta.env.VITE_SHEETS_WEBHOOK
    if (!endpoint) {
      setStatus('Chưa cấu hình Google Sheet. Vui lòng thêm VITE_SHEETS_WEBHOOK trong file .env.local.')
      return
    }
    setSending(true)
    setStatus('')
    const order = { orderId: makeOrderId(), createdAt: new Date().toISOString(), ...customer, items: cart, total, shippingNote: 'Phí ship 5.000–30.000đ tùy khoảng cách, quán xác nhận sau.' }
    try {
      await fetch(endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(order) })
      setSuccess(true)
      setCart([])
    } catch {
      setStatus('Chưa gửi được đơn. Kiểm tra kết nối mạng hoặc thử lại nhé.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="site-shell">
      <main id="menu" className="menu-section">
        <div className="section-heading"><div className="menu-title"><span className="eyebrow">GỌI MÓN DỄ DÀNG</span><h2>MỘC HOLA</h2><p>Chọn món bạn thích, bếp lo phần còn lại 💛</p><a className="call-cta" href="tel:0327146083"><span className="call-icon">☎</span><span><small>GỌI QUÁN ĐẶT MÓN</small><b>0327 146 083</b></span><span className="call-arrow">↗</span></a></div><div className="searchbox"><span>⌕</span><input aria-label="Tìm món" placeholder="Bạn đang thèm món gì?" value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
        <nav className="category-list" aria-label="Danh mục món ăn">{categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}</nav>
        <div className="result-line"><span>{category === 'Tất cả' ? 'Món ngon đang có' : category}</span><span>{visible.length} món</span></div>
        <div className="product-grid">{visible.map((item, index) => {
          const choice = choices[item.name] || 0
          const price = item.prices ? item.prices[choice] : item.price
          return <article className="product-card" key={item.name}><div className={`product-art art-${index % 6}`}><img src={imageFor(item)} alt="" loading="lazy" />{item.popular && <b>BÁN CHẠY</b>}<small>ẢNH MINH HỌA</small></div><div className="product-info"><div className="product-category">{item.category}</div><h3>{item.name}</h3>{item.note && <p className="product-note">{item.note}</p>}{item.sizes && <label className="size-select"><span>Chọn loại</span><select value={choice} onChange={(e) => setChoices((current) => ({ ...current, [item.name]: Number(e.target.value) }))}>{item.sizes.map((size, i) => <option key={size} value={i}>{size} · {money(item.prices[i])}</option>)}</select></label>}<div className="product-bottom"><strong>{money(price)}</strong><button className="add-button" aria-label={`Thêm ${item.name}`} onClick={() => addItem(item)}>+</button></div></div></article>
        })}</div>
        {!visible.length && <div className="empty-search">Chưa tìm thấy món này, thử từ khóa khác nha.</div>}
      </main>

      <section className="shipping-banner"><div className="shipping-icon">🛵</div><div><strong>Quán có hỗ trợ ship nha!</strong><p>Phí giao hàng từ 5.000đ–30.000đ tùy vị trí xa gần. Bếp sẽ xác nhận phí ship sau khi nhận đơn.</p></div><a href="tel:0327146083">Gọi quán <span>↗</span></a></section>
      <footer><span className="footer-brand">MỘC HOLA</span><p>Ăn ngon một chút, vui cả ngày ✨</p><a href="tel:0327146083">0327 146 083</a><small>© MỘC HOLA · Cảm ơn bạn đã ủng hộ quán</small></footer>

      {addNotice && <div className="add-notice" role="status" aria-live="polite"><span aria-hidden="true">✓</span>{addNotice}</div>}
      {quantity > 0 && <button className="cart-fab" aria-label={`Xem giỏ hàng, ${quantity} món, tổng cộng ${money(total)}`} onClick={() => { setShowCheckout(true); setSuccess(false) }}><span className="cart-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6"/><circle cx="10" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/></svg></span><span className="cart-label"><b>{quantity} món trong giỏ</b><small>Xem giỏ hàng</small></span><strong>{money(total)}</strong><span className="cart-arrow" aria-hidden="true">→</span></button>}

      {showCheckout && <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setShowCheckout(false)}><section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><button className="close-modal" onClick={() => setShowCheckout(false)} aria-label="Đóng">×</button>{success ? <div className="success-state"><div className="success-mark">✓</div><span className="eyebrow">MỘC HOLA ĐÃ NHẬN ĐƯỢC ĐƠN</span><h2>Cảm ơn bạn nha!</h2><p>Quán sẽ gọi xác nhận món và phí ship trong ít phút.</p><a href="tel:0327146083">☎ 0327 146 083</a><button className="primary-button" onClick={() => { setShowCheckout(false); setSuccess(false) }}>Đặt thêm món</button></div> : <><span className="eyebrow">SẮP XONG RỒI</span><h2 id="checkout-title">Xác nhận đơn hàng</h2><div className="cart-lines">{cart.map((item) => <div className="cart-row" key={item.key}><div><b>{item.name}</b><small>{item.size && `${item.size} · `}{money(item.price)}</small></div><div className="quantity-control"><button onClick={() => changeQuantity(item.key, -1)}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.key, 1)}>+</button></div><strong>{money(item.price * item.quantity)}</strong></div>)}</div><div className="total-line"><span>Tạm tính</span><strong>{money(total)}</strong></div><p className="shipping-note">Phí ship 5.000đ–30.000đ tùy vị trí, quán sẽ báo bạn trước khi giao.</p><form className="customer-form" onSubmit={submitOrder}><label>Họ tên<input required autoComplete="name" placeholder="Tên người nhận" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></label><div className="form-two"><label>Số điện thoại<input required type="tel" autoComplete="tel" placeholder="09xx xxx xxx" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></label><label>Địa chỉ nhận<input required autoComplete="street-address" placeholder="Số nhà, đường, khu vực" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} /></label></div><label>Ghi chú cho bếp / shipper <span className="optional">(không bắt buộc)</span><textarea rows="2" placeholder="Ít cay, không hành..." value={customer.note} onChange={(e) => setCustomer({ ...customer, note: e.target.value })} /></label>{status && <p className="form-status">{status}</p>}<button className="primary-button" type="submit" disabled={sending || !cart.length}>{sending ? 'Đang gửi đơn…' : <>Xác nhận đặt món <span>·</span> {money(total)}</>}</button></form><p className="checkout-phone">Cần hỗ trợ? <a href="tel:0327146083">Gọi 0327 146 083</a></p></>}</section></div>}
    </div>
  )
}

export default App
