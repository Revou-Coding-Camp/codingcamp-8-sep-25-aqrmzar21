document.addEventListener("DOMContentLoaded", function () {
  // Form dan tempat hasil ditampilkan
  const form = document.getElementById("messageForm");
  const infoBox = document.getElementById("infoBox");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = new FormData(form);
      const name = data.get("name");
      const birthdate = new Date(data.get("birthdate"));
      const gender = data.get("gender");
      const message = data.get("message");

      if (!gender) {
        alert("Silakan pilih jenis kelamin.");
        return;
      }

      const day = String(birthdate.getDate()).padStart(2, "0");
      const month = String(birthdate.getMonth() + 1).padStart(2, "0");
      const year = birthdate.getFullYear();
      const formatted = `${day}/${month}/${year}`;

      infoBox.innerHTML = `
          <div class="mb-1 font-bold">Current time :</div>
          <div id="formTime" class="mb-3">${new Date().toString()}</div>
          <div class="text-black">
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
    const formTimeEl = document.getElementById("formTime");

    if (timeEl) {
      timeEl.textContent = timeNow;
      timeEl.style.color = "black";
    }

    if (formTimeEl) {
      formTimeEl.textContent = timeNow;
    }
  }
  setInterval(updateTime, 1000);
  updateTime();

  // Sapa nama pengguna lewat prompt + animasi ketik sekali + kedip 5 menit
  const welcomeName = prompt("Masukkan nama Anda:");
  const nameTarget = document.getElementById("welcomeName");
  const sapa = document.getElementById("greetings");

  if (nameTarget) {
    const finalName = welcomeName || "Pengunjung";
    if (sapa) sapa.innerText = "";
    nameTarget.textContent = "";

    typeWriterOnce(nameTarget, finalName, 150, () => {
      startBlinking(nameTarget, 5 * 60 * 1000); // 5 menit
    });
  }
});

// Toggle menu mobile
const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggleBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Fungsi animasi pengetikan satu kali
function typeWriterOnce(element, text, speed = 150, onComplete) {
  let index = 0;

  function type() {
    element.textContent = text.slice(0, index);
    index++;

    if (index <= text.length) {
      setTimeout(type, speed);
    } else if (typeof onComplete === "function") {
      onComplete();
    }
  }

  type();
}

// Fungsi kedip selama durasi tertentu
function startBlinking(element, duration) {
  let visible = true;
  const blinkInterval = setInterval(() => {
    element.style.visibility = visible ? "hidden" : "visible";
    visible = !visible;
  }, 800); // kedip setiap 0.8 detik

  setTimeout(() => {
    clearInterval(blinkInterval);
    element.style.visibility = "visible"; // pastikan tetap terlihat setelah selesai
  }, duration);
}

// Tahun dinamis di footer
const yearNow = new Date().getFullYear();
const yearTarget = document.getElementById("copyrightYear");
if (yearTarget) {
  yearTarget.textContent = yearNow;
}

// Tanggal dan hari di home
const dateInfoTarget = document.getElementById("currentDateInfo");
if (dateInfoTarget) {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = now.toLocaleDateString("id-ID", options);
  dateInfoTarget.textContent = `${formattedDate}`;
}
