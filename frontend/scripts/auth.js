const API = 'https://fee-finance-backend-1.onrender.com/api/auth';

function sendOTP() {
  const phone = document.getElementById('phone').value;
  fetch(`${API}/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  }).then(res => res.json()).then(data => alert(data.message));
}

function verifyOTP() {
  const phone = document.getElementById('phone').value;
  const otp = document.getElementById('otp').value;
  fetch(`${API}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  }).then(res => res.json()).then(data => {
    if (data.message === 'OTP verified') {
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message);
    }
  });
}