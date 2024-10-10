document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah pengiriman form secara default

    const formData = {
        tanggal: document.getElementById('tanggal').value,
        nama: document.getElementById('nama').value,
        keterangan: document.getElementById('keterangan').value,
        link_video: document.getElementById('link_video').value,
        bagian: document.getElementById('bagian').value,
        kategori: document.getElementById('kategori').value,
    };

    // Validasi form
    for (let key in formData) {
        if (!formData[key]) {
            showErrorPopup('Semua field harus diisi!'); // Tampilkan pesan error jika ada field kosong
            return; // Hentikan eksekusi jika ada field yang kosong
        }
    }

    // Mengirim data ke server
    fetch('https://script.google.com/macros/s/AKfycbzJ28ssTWSPoLhBjWPUiqU3_5ZP8Z42HRg-FuSK22kEmrpOk2CaO52C54YKxpnWa2A/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        document.getElementById('success-message').classList.add('show'); // Tampilkan pesan sukses
        setTimeout(() => {
            window.location.href = 'thank-you.html'; // Alihkan ke halaman terima kasih
        }, 2000); // Misalnya, 2 detik
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorPopup('Terjadi kesalahan saat mengirim form. Silakan coba lagi.'); // Tampilkan popup error jika ada kesalahan
    });
});

// Fungsi untuk menampilkan popup error
function showErrorPopup(errorMessage) {
    const errorPopup = document.getElementById('error-popup');
    errorPopup.textContent = errorMessage;
    errorPopup.classList.add('open-popup');
    setTimeout(() => {
        errorPopup.classList.remove('open-popup');
    }, 3000);
}