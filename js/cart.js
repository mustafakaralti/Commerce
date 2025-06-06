import {
    getFromLocalStorage,
    renderCartTotal,
    saveToLocalStorage,
    updateCartIcon,
  } from "./helper.js";
  import { renderCartItems } from "./ui.js";
  
  // localStorage'dan cart elemanlarını al
  let cart = getFromLocalStorage("cart");
  
  // Sepete ürün ekleyen fonksiyon
  const addToCart = (e, products) => {
    // Tıklanılan elemana ait id'ye eriş
    const productId = Number(e.target.dataset.id);
  
    // Id'si bilinen elemanı products içerisinde bul
    const product = products.find((product) => product.id === productId);
  
    // Sepete eklenecek eleman öncesinde eklendi mi ?
    const exitingItem = cart.find((item) => item.id === productId);
  
    // Eğer ürün sepete eklendiyse
    if (exitingItem) {
      // Ürününün miktarını güncelle
      exitingItem.quantity++;
    } else {
      // Ürünü sepete ekle
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
  
      // Sepet dizisine ürün ekle
      cart.push(cartItem);
    }
  
    // Sepeti güncelle
    saveToLocalStorage("cart", cart);
  
    // Add To Cart butonunun içeriğini güncelle
    e.target.textContent = "Added";
  
    // 2s sonra Add To Cart butonunun içeriğini eski haline çevir
    setTimeout(() => {
      e.target.textContent = "Add to cart";
    }, 2000);
  
    // Sepet ikonunu güncelle
    updateCartIcon(cart);
  };
  
  // Sepetten ürün kaldıran fonksiyon
  const removeFromCart = (e) => {
    // Kullanıcıdan silme işlemi için onay al
    const response = confirm("Silme işlemini onaylıyor musunuz ?");
  
    // Eğer kullanıcı silme işlemini onayladıysa
    if (response) {
      // Tıklanılan ürün'ün id'sine eriş
      const productId = parseInt(e.target.dataset.id);
  
      // Sepetten tıklanan elemanı kaldır
      cart = cart.filter((item) => item.id !== productId);
  
      // localStorage'ı güncelle
      saveToLocalStorage("cart", cart);
  
      // Arayüzü renderla
      renderCartItems(cart);
  
      // Sepet ikonunu güncelle
      updateCartIcon(cart);
  
      // Toplam fiyatı renderla
      renderCartTotal(cart);
    }
  };
  
  // Sepetteki ürün miktarını güncelleyen fonksiyon
  const onQuantityChange = (e) => {
    // Güncellenecek elemanın id'sine eriş
    const productId = +e.target.dataset.id;
  
    // Yeni ürün miktarına eriş
    const newQuantity = e.target.value;
  
    // Yeni miktar 0'dan büyükse
    if (newQuantity > 0) {
      // Güncellenecek elemanı dizi içerisinde bul
      const updatedItem = cart.find((item) => item.id === productId);
      // Ürün miktarını güncelle
      updatedItem.quantity = newQuantity;
  
      // localeStorage'ı güncelle
      saveToLocalStorage("cart", cart);
    } else {
      removeFromCart(e);
    }
  
    // Sepet ikonunu güncelle
    updateCartIcon(cart);
  
    // Toplam fiyatı renderla
    renderCartTotal(cart);
  };
  
  export { addToCart, removeFromCart, onQuantityChange };