// Toggle menu mobile dengan ARIA
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  if (isOpen) {
    menu.removeAttribute('hidden');
    menu.focus();
  } else {
    menu.setAttribute('hidden', '');
  }
});

// Tutup menu jika klik di luar
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
      menu.setAttribute('hidden', '');
    }
  }
});

// Tahun otomatis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form handler dengan validasi tambahan
const form = document.getElementById('formPPDB');
const msg = document.getElementById('formMsg');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const required = ['nama', 'lahir', 'kelas', 'ortu', 'telp', 'alamat'];
  const invalid = required.filter(k => !data[k]);
  if (invalid.length) {
    msg.textContent = 'Mohon lengkapi semua kolom wajib.';
    msg.style.color = '#b91c1c';
    return;
  }
  // Validasi nomor telepon sederhana (hanya angka, spasi, dan +)
  const telpPattern = /^[\d+ ]+$/;
  if (!telpPattern.test(data.telp)) {
    msg.textContent = 'Nomor WhatsApp tidak valid.';
    msg.style.color = '#b91c1c';
    return;
  }
  msg.textContent = 'Terima kasih! Data pendaftaran Anda telah direkam. Admin kami akan menghubungi via WhatsApp.';
  msg.style.color = '#065f46';

  // Konfirmasi kirim ke WhatsApp
  const wa = '6281200000000';
  const text = encodeURIComponent(`PPDB Online%0ANama Anak: ${data.nama}%0AKelas: ${data.kelas}%0AOrtu: ${data.ortu}%0AWA: ${data.telp}%0AAlamat: ${data.alamat}`);
  if (confirm('Apakah Anda ingin mengirim data pendaftaran melalui WhatsApp?')) {
    window.open(`https://wa.me/${wa}?text=${text}`, '_blank');
  }
  form.reset();
});