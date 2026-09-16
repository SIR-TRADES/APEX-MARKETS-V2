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

  localStorage.setItem('apexPendingAccount', JSON.stringify({ name, email, joined: 'Today, 10:15', status: 'Pending', investments: 'UGX 0' }));
  window.location.href = `index.html?registered=${encodeURIComponent(email)}`;
};
