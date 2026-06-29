document.addEventListener('DOMContentLoaded', () => {
  const formObserver = new MutationObserver(() => {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', handleSubmit);
      formObserver.disconnect();
    }
  });
  formObserver.observe(document.body, { childList: true, subtree: true });
});

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  if (!data.name || !data.message) {
    showAlert('Mohon isi nama dan pesan!', 'error');
    return;
  }

  if (data.email && !isValidEmail(data.email)) {
    showAlert('Email tidak valid!', 'error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  try {
    const res = await fetch('/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      showAlert('Pesan berhasil dikirim! Saya akan menghubungi Anda segera.', 'success');
      form.reset();
    } else {
      showAlert('Gagal mengirim pesan. Coba lagi nanti.', 'error');
    }
  } catch {
    showAlert('Gagal terhubung ke server.', 'error');
  }

  btn.disabled = false;
  btn.textContent = 'Kirim Pesan';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(msg, type) {
  const existing = document.querySelector('.form-alert');
  if (existing) existing.remove();

  const alert = document.createElement('div');
  alert.className = `form-alert form-alert-${type}`;
  alert.textContent = msg;

  const form = document.getElementById('contactForm');
  form.parentNode.insertBefore(alert, form);

  setTimeout(() => alert.remove(), 4000);
}
