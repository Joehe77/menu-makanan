const NOMOR_WA = "6281233964272"; // 🔴 GANTI nomor WA Anda

// ===== MAKANAN =====
const menuMakanan = [
  { nama: "Donat", harga: 10000, desc: "Donat lembut aneka topping",
    gambar: "https://i.ibb.co.com/hQ64qLj/resep-donat-kampung.jpg" },
  { nama: "Kentang Goreng", harga: 15000, desc: "French fries crispy + saus",
    gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
  { nama: "Dimsum", harga: 20000, desc: "Dimsum ayam isi 4 pcs",
    gambar: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400" },
  { nama: "Tahu Kocek", harga: 10000, desc: "Tahu crispy isi cabai rawit",
    gambar: "https://i.ibb.co.com/7dtHcM2m/images.jpg" },
  { nama: "Sosis Goreng", harga: 12000, desc: "Sosis goreng crispy + saus",
    gambar: "https://i.ibb.co.com/zhvmXG6z/resep-sosis-goreng-kriuk.jpg" },
  { nama: "Pisang Keju", harga: 15000, desc: "Pisang goreng topping keju",
    gambar: "https://i.ibb.co.com/VpBk1X8d/images-1.jpg" },
  { nama: "Telur Gulung", harga: 10000, desc: "Telur gulung isi sosis & sayur",
    gambar: "https://i.ibb.co.com/HLndVzh8/images-2.jpg" },
  { nama: "Sempol", harga: 8000, desc: "Sempol ayam isi 3 pcs + saus",
    gambar: "https://i.ibb.co.com/dJMyBdBt/resep-sempol-ayam-43.jpg" }
];

// ===== STATE =====
let keranjang = {};
let pilihan = {};

// ===== RENDER MENU =====
function renderMenu(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  data.forEach((item, index) => {
    const qty = pilihan[index] || 0;
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}" loading="lazy" />
      <div class="menu-info">
        <h3>${item.nama}</h3>
        <p class="desc">${item.desc}</p>
        <p class="price">Rp ${item.harga.toLocaleString('id-ID')}</p>
        <div class="qty-control">
          <button class="qty-btn" onclick="ubahPilihan(${index}, -1)">−</button>
          <span class="qty-value" id="pilih-${index}">${qty}</span>
          <button class="qty-btn" onclick="ubahPilihan(${index}, 1)">+</button>
        </div>
        <button class="btn-keranjang" onclick="masukkanKeranjang(${index})">
          + Masukkan Keranjang
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ===== UBAH PILIHAN DI KARTU =====
function ubahPilihan(index, delta) {
  if (!pilihan[index]) pilihan[index] = 0;
  pilihan[index] += delta;
  if (pilihan[index] < 0) pilihan[index] = 0;
  document.getElementById(`pilih-${index}`).textContent = pilihan[index];
}

// ===== MASUKKAN KE KERANJANG =====
function masukkanKeranjang(index) {
  const qty = pilihan[index] || 0;
  if (qty === 0) {
    alert("Pilih jumlah dulu pakai tombol +");
    return;
  }
  if (!keranjang[index]) keranjang[index] = 0;
  keranjang[index] += qty;

  pilihan[index] = 0;
  document.getElementById(`pilih-${index}`).textContent = 0;

  renderKeranjang();
}

// ===== UBAH QTY DI KERANJANG =====
function ubahQtyKeranjang(index, delta) {
  if (!keranjang[index]) return;
  keranjang[index] += delta;
  if (keranjang[index] <= 0) delete keranjang[index];
  renderKeranjang();
}

// ===== RENDER KERANJANG =====
function renderKeranjang() {
  const box = document.getElementById("cartBox");
  const itemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  let total = 0;
  let adaItem = false;
  itemsEl.innerHTML = "";

  Object.keys(keranjang).forEach(i => {
    const qty = keranjang[i];
    if (qty > 0) {
      adaItem = true;
      const item = menuMakanan[i];
      const subtotal = qty * item.harga;
      total += subtotal;

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="cart-item-name">${item.nama}</div>
        <div class="cart-item-row">
          <div class="qty-control">
            <button class="qty-btn" onclick="ubahQtyKeranjang(${i}, -1)">−</button>
            <span class="qty-value">${qty}</span>
            <button class="qty-btn" onclick="ubahQtyKeranjang(${i}, 1)">+</button>
          </div>
          <span class="cart-item-price">Rp ${subtotal.toLocaleString('id-ID')}</span>
        </div>
      `;
      itemsEl.appendChild(row);
    }
  });

  totalEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;

  if (adaItem) box.classList.add("active");
  else box.classList.remove("active");
}

// ===== KIRIM KE WA =====
function kirimPesanan() {
  let pesan = "Halo Nendra Shop, saya mau pesan:\n\n";
  let total = 0;

  Object.keys(keranjang).forEach(i => {
    const qty = keranjang[i];
    if (qty > 0) {
      const item = menuMakanan[i];
      const subtotal = qty * item.harga;
      total += subtotal;
      pesan += `▪ ${item.nama} x${qty} = Rp ${subtotal.toLocaleString('id-ID')}\n`;
    }
  });

  if (total === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  pesan += `\n💰 Total: Rp ${total.toLocaleString('id-ID')}\n\nTerima kasih!`;
  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`, "_blank");
}

// ===== START =====
renderMenu(menuMakanan, "menuMakanan");
