// ===== GANTI NOMOR WA DI SINI =====
const NOMOR_WA = "6281233964272";

// ===== MAKANAN =====
const menuMakanan = [
  {
    nama: "Donat",
    harga: 10000,
    desc: "Donat lembut aneka topping",
    gambar: "https://i.ibb.co.com/hQ64qLj/resep-donat-kampung.jpg"
  },
  {
    nama: "Kentang Goreng",
    harga: 15000,
    desc: "French fries crispy + saus",
    gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"
  },
  {
    nama: "Dimsum",
    harga: 20000,
    desc: "Dimsum ayam isi 4 pcs",
    gambar: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400"
  },
  {
    nama: "Tahu Kocek",
    harga: 10000,
    desc: "Tahu crispy isi cabai rawit",
    gambar: "https://i.ibb.co.com/7dtHcM2m/images.jpg"
  },
  {
    nama: "Sosis Goreng",
    harga: 12000,
    desc: "Sosis goreng crispy + saus",
    gambar: "https://i.ibb.co.com/zhvmXG6z/resep-sosis-goreng-kriuk.jpg"
  },
  {
    nama: "Pisang Keju",
    harga: 15000,
    desc: "Pisang goreng topping keju",
    gambar: "https://i.ibb.co.com/VpBk1X8d/images-1.jpg"
  },
  {
    nama: "Telur Gulung",
    harga: 10000,
    desc: "Telur gulung isi sosis & sayur",
    gambar: "https://i.ibb.co.com/HLndVzh8/images-2.jpg"
  },
  {
    nama: "Sempol",
    harga: 8000,
    desc: "Sempol ayam isi 3 pcs + saus",
    gambar: "https://i.ibb.co.com/dJMyBdBt/resep-sempol-ayam-43.jpg"
  }
];

// ===== RENDER MENU =====
function renderMenu(data, containerId) {
  const container = document.getElementById(containerId);

  data.forEach(item => {
    const pesanWA = encodeURIComponent(
      `Halo Nendra Shop, saya mau pesan:\n\n🛒 ${item.nama}\n💰 Rp ${item.harga.toLocaleString('id-ID')}\n\nTerima kasih!`
    );

    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}" loading="lazy" />
      <div class="menu-info">
        <h3>${item.nama}</h3>
        <p class="desc">${item.desc}</p>
        <p class="price">Rp ${item.harga.toLocaleString('id-ID')}</p>
        <a href="https://wa.me/${NOMOR_WA}?text=${pesanWA}"
           class="btn-pesan" target="_blank">
          Pesan via WA
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

renderMenu(menuMakanan, "menuMakanan");
