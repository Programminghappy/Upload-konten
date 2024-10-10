// Menangani pengiriman form login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (validateLogin(username, password)) {
    // Tambahkan animasi sukses
    document.getElementById('username').classList.add('success');
    document.getElementById('password').classList.add('success');
    document.getElementById('submit-btn').classList.add('animate-success');

    // Alihkan ke halaman form setelah 1 detik (untuk melihat animasi)
    setTimeout(() => {
      window.location.href = "Form page.html"; // Update ke halaman form yang sebenarnya
    }, 1000); // Alihkan setelah 1 detik

  } else {
    // Tambahkan animasi error dan tampilkan popup kesalahan
    document.getElementById('username').classList.add('error');
    document.getElementById('password').classList.add('error');
    document.getElementById('submit-btn').classList.add('animate-error');

    showErrorPopup();
  }
});

// Fungsi untuk memvalidasi login
function validateLogin(username, password) {
  const users = [
    { username: 'aryasha', password: 'digital agency' },
    { username: 'iqbal', password: 'digital agency' },
    { username: 'nadia', password: 'digital agency' },
    { username: 'latipah', password: 'digital agency' },
    { username: 'risma', password: 'digital agency' },
    { username: 'mutia', password: 'digital agency' },
    { username: 'regza', password: 'digital agency' }
  ];

  return users.some(user => user.username === username && user.password === password);
}

// Menampilkan popup kesalahan
function showErrorPopup() {
  const errorPopup = document.getElementById('error-popup');
  errorPopup.classList.add('open-popup');

  // Menghapus input dan mereset gaya
  setTimeout(() => {
    errorPopup.classList.remove('open-popup');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('username').classList.remove('error');
    document.getElementById('password').classList.remove('error');
    document.getElementById('submit-btn').classList.remove('animate-error');
  }, 3000); // Popup akan hilang setelah 3 detik
}

// Menangani pengiriman form upload
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const inputs = document.querySelectorAll('input, textarea, select');
  let valid = true;
  let firstInvalid = null;

  inputs.forEach(input => {
    if (input.value === '') {
      valid = false;
      input.classList.add('error');
      input.classList.remove('success');
      if (!firstInvalid) {
        firstInvalid = input;
      }
    } else {
      input.classList.remove('error');
      input.classList.add('success');
    }
  });

  if (!valid) {
    // Gulung ke field yang tidak valid dan tampilkan popup kesalahan
    firstInvalid.scrollIntoView({ behavior: 'smooth' });
    showErrorPopup();
  } else {
    // Jika semua field diisi, kirim data ke spreadsheet
    const formData = {};
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });

    // Simulasikan pengiriman data ke Google Spreadsheet
    google.script.run.withSuccessHandler(function () {
      // Alihkan ke halaman terima kasih setelah data berhasil terkirim
      document.getElementById('success-message').style.display = 'block';
      window.location.href = 'thank-you.html'; // Update ke halaman terima kasih
    }).writeDataToSpreadsheet(formData); // Pastikan fungsi ini ada di Google Apps Script
  }
});

// Fungsi untuk menampilkan popup kesalahan untuk form upload
function showErrorPopup() {
  const errorPopup = document.getElementById('error-popup');
  errorPopup.classList.add('open-popup');

  // Popup akan hilang setelah 3 detik
  setTimeout(() => {
    errorPopup.classList.remove('open-popup');
  }, 3000);
}