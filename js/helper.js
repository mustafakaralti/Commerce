import { uiElements } from "./ui.js";

// localStorage'a kayıt yapacak fonksiyon
const saveToLocalStorage = (key, cart) => {
  // Dışarıdan verilen key değeri ve cart dizisi ile locale ekleme yap
  localStorage.setItem(key, JSON.stringify(cart));
};
// localStorage'dan elemanları alacak fonksiyon
const getFromLocalStorage = (key) => {
  // localStorage'dan belirtilen key'e sahip elemanları al ve js objesine çevirip return et
  const strData = localStorage.getItem(key);

  // Eğer strData varsa bunu js nesnesine çevirip return et ama yoksa [] return et
  return strData ? JSON.parse(strData) : [];
};

// Sepetteki ürün miktarını hesaplayarak sepet ikonu yanındaki miktarı güncelleyen fonksiyon
const updateCartIcon = (cart) => {
  // reduce metodu ile dizideki elemanların toplam miktarını hesapl
  const totalQuantity = cart.reduce(
    (total, item) => total + parseInt(item.quantity),
    0
  );

  // Elde edilen ürün miktarını sepet ikonu kısmına yazdır
  uiElements.cartIcon.setAttribute("data-quantity", totalQuantity);
};

// Sepetteki toplam ürün fiyatını hesapla
const calculateCartTotal = (cart) =>
  cart.reduce((total, product) => total + product.price * product.quantity, 0);

// Toplam ürün fiyatını render eden fonksiyon
const renderCartTotal = (cart) => {
  // Toplam fiyata eriş
  const totalPrice = calculateCartTotal(cart);

  const cargoFee = 50.0;

  // Sepetteki toplam ürünlerin fiyatını render et

  // totalPrice 100'den küçükse kargo ücreti ekle değilse ekleme
  uiElements.cartTotal.textContent =
    totalPrice > 0 && totalPrice < 100
      ? (cargoFee + Number(totalPrice)).toFixed(2)
      : Number(totalPrice.toFixed(2));
};

export {
  saveToLocalStorage,
  getFromLocalStorage,
  updateCartIcon,
  calculateCartTotal,
  renderCartTotal,
};
