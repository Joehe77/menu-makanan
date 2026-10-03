const NOMOR_WA = "6281233964272";

const menuMakanan = [
  {
    nama: "Donat",
    harga: 10000,
    desc: "Donat lembut aneka topping",
    gambar: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400"
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
  }
];

const menuMinuman = [
  {
    nama: "Coklat",
    harga: 12000,
    desc: "Es coklat creamy",
    gambar: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400"
  },
  {
    nama: "Red Velvet",
    harga: 15000,
    desc: "Red velvet latte dingin",
    gambar: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=400"
  },
  {
    nama: "Matcha",
    harga: 15000,
    desc: "Matcha latte premium",
    gambar: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400"
  }
];

function renderMenu(data, containerId) {
  const container = document.getElementById(containerId);

  data.forEach(item => {
    const pesanWA = encodeURIComponent(
      `Halo, saya mau pesan:\n\n🍽️ ${item.nama}\n💰 Rp ${item.harga.toLocaleString('id-ID')}\n\nTerima kasih!`
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
renderMenu(menuMinuman, "menuMinuman");
