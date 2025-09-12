document.addEventListener("DOMContentLoaded", function () {
  // Form dan tempat hasil ditampilkan
  const form = document.getElementById("messageForm");
  const infoBox = document.getElementById("infoBox");

  // Handle form submit
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Ambil data dari form
      const data = new FormData(form);
      const name = data.get("name");
      const birthdate = new Date(data.get("birthdate"));
      const gender = data.get("gender");
      const message = data.get("message");

      // Validasi: jenis kelamin harus dipilih
      if (!gender) {
        alert("Silakan pilih jenis kelamin.");
        return;
      }

      // Format tanggal ke dd/mm/yyyy
      const day = String(birthdate.getDate()).padStart(2, "0");
      const month = String(birthdate.getMonth() + 1).padStart(2, "0");
      const year = birthdate.getFullYear();
      const formatted = `${day}/${month}/${year}`;

      // Tampilkan hasil input di infoBox
      infoBox.innerHTML = `
        <div class="mb-1 font-bold">Current time :</div>
        <div id="currentTime" class="mb-3">${new Date().toString()}</div>
        <div>
          <b>Nama</b> : ${name}<br />
          <b>Tanggal Lahir</b> : ${formatted}<br />
          <b>Jenis Kelamin</b> : ${gender}<br />
          <b>Pesan</b> : ${message}
        </div>
      `;
      form.reset();
    });
  }

  // Update waktu setiap detik
  function updateTime() {
    const timeNow = new Date().toString();
    const timeEl = document.getElementById("currentTime");
    if (timeEl) {
      timeEl.textContent = timeNow;
      timeEl.style.color = "black";
    }
  }
  setInterval(updateTime, 1000);
  updateTime();

  // Sapa nama pengguna lewat prompt
  const welcomeName = prompt("Masukkan nama Anda:");
  const nameTarget = document.getElementById("welcomeName");
  if (nameTarget) {
    const finalName = welcomeName || "Pengunjung";
    typeWriterLoop(nameTarget, finalName);
  }
});

const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Fungsi animasi pengetikan tak terbatas
function typeWriterLoop(element, text, speed = 150) {
  let index = 0;

  function type() {
    element.textContent = text.slice(0, index);
    index++;

    if (index > text.length) {
      setTimeout(() => {
        index = 0;
        type();
      }, 1000); // jeda sebelum mengulang
    } else {
      setTimeout(type, speed);
    }
  }

  type();
}

const yearNow = new Date().getFullYear();
const yearTarget = document.getElementById("copyrightYear");
if (yearTarget) {
  yearTarget.textContent = yearNow;
}

const dateInfoTarget = document.getElementById("currentDateInfo");
if (dateInfoTarget) {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = now.toLocaleDateString("id-ID", options); // Bahasa Indonesia
  dateInfoTarget.textContent = `Hari ini: ${formattedDate}`;
}