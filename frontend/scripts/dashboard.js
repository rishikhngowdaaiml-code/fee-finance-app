const API = 'https://fee-finance-backend-1.onrender.com/api/fees';

document.getElementById('studentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const due_date = document.getElementById('dueDate').value;

  fetch(`${API}/add-student`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, due_date })
  }).then(res => res.json()).then(data => alert('Student added'));
});

function sendAlerts() {
  fetch(`${API}/send-alerts`)
    .then(res => res.json())
    .then(data => alert(`${data.count} alerts sent`));
}