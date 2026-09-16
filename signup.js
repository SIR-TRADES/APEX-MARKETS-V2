const signupForm = document.getElementById('signupForm');
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

signupForm.onsubmit = event => {
  event.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmation = document.getElementById('confirmPassword').value;

  if (password !== confirmation) {
    showToast('Passwords do not match.');
    document.getElementById('confirmPassword').focus();
    return;
  }

  const users = JSON.parse(localStorage.getItem('apexUsers') || '[]');
  if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
    showToast('An account with this email already exists.');
    return;
  }
  users.unshift({ name, email, password, joined: 'Today, 10:15', status: 'Pending', investments: 'UGX 0', portfolio: 0, activeInvestment: 0 });
  localStorage.setItem('apexUsers', JSON.stringify(users));
  window.location.href = `index.html?registered=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
};
