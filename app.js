const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const viewContent = document.getElementById('viewContent');
const toast = document.getElementById('toast');
let currentRole = 'client';
let currentUser = null;
const defaultUsers = [
  { name: 'Sarah Namukasa', email: 'sarah@example.com', joined: 'Today, 08:42', status: 'Pending', investments: 'UGX 0' },
  { name: 'Daniel Okello', email: 'daniel@example.com', joined: '15 Sep 2026', status: 'Active', investments: 'UGX 850,000' },
  { name: 'Miriam Atwine', email: 'miriam@example.com', joined: '14 Sep 2026', status: 'Active', investments: 'UGX 2,100,000' }
];
const storedUsers = JSON.parse(localStorage.getItem('apexUsers') || '[]');
const users = [...storedUsers, ...defaultUsers.filter(defaultUser => !storedUsers.some(user => user.email === defaultUser.email))];
function persistUsers(){ localStorage.setItem('apexUsers', JSON.stringify(users.filter(user => !defaultUsers.some(defaultUser => defaultUser.email === user.email)))); }
const pendingRequests = JSON.parse(localStorage.getItem('apexRequests') || '[]');
function persistRequests(){ localStorage.setItem('apexRequests', JSON.stringify(pendingRequests)); }
const transactions = [
  { icon: 'M', name: 'MTN Mobile Money', meta: 'Deposit · Today, 09:41', amount: '+ UGX 250,000', type: 'deposit' },
  { icon: 'A', name: 'Airtel Money', meta: 'Deposit · 14 Sep 2026', amount: '+ UGX 75,000', type: 'deposit' },
  { icon: 'W', name: 'Bank withdrawal', meta: 'Withdrawal · 11 Sep 2026', amount: '- UGX 100,000', type: 'withdraw' }
];
const adminLogin = { id: 'sir trades', password: 'Rolic123#', name: 'SIR TRADES' };
const marketData = [
  { symbol: 'SPX', name: 'S&P 500', price: 5618.25, change: 0.84, category: 'Indices', color: 'blue' },
  { symbol: 'NDX', name: 'Nasdaq 100', price: 19412.10, change: 0.32, category: 'Indices', color: 'yellow' },
  { symbol: 'DJI', name: 'Dow Jones', price: 41408.75, change: -0.18, category: 'Indices', color: '' },
  { symbol: 'DAX', name: 'Germany 40', price: 18572.40, change: 0.58, category: 'Indices', color: 'blue' },
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0852, change: -0.12, category: 'Forex', color: 'yellow' },
  { symbol: 'GBP/USD', name: 'British Pound / Dollar', price: 1.2914, change: 0.24, category: 'Forex', color: '' },
  { symbol: 'USD/JPY', name: 'US Dollar / Yen', price: 156.22, change: 0.41, category: 'Forex', color: 'blue' },
  { symbol: 'USD/UGX', name: 'US Dollar / Uganda Shilling', price: 3692.50, change: -0.08, category: 'Forex', color: 'yellow' },
  { symbol: 'GOLD', name: 'Gold / USD', price: 2563.40, change: -0.12, category: 'Commodities', color: '' },
  { symbol: 'BRENT', name: 'Brent Crude', price: 73.55, change: 0.16, category: 'Commodities', color: 'blue' },
  { symbol: 'SILVER', name: 'Silver / USD', price: 29.18, change: 0.46, category: 'Commodities', color: 'yellow' },
  { symbol: 'WTI', name: 'WTI Crude', price: 70.12, change: 0.27, category: 'Commodities', color: '' },
  { symbol: 'NATGAS', name: 'Natural Gas', price: 3.18, change: -0.64, category: 'Commodities', color: 'blue' },
  { symbol: 'BTC/USD', name: 'Bitcoin / Dollar', price: 104282, change: 1.72, category: 'Digital assets', color: '' },
  { symbol: 'ETH/USD', name: 'Ethereum / Dollar', price: 3874.60, change: 1.18, category: 'Digital assets', color: 'yellow' },
  { symbol: 'SOL/USD', name: 'Solana / Dollar', price: 238.44, change: 2.06, category: 'Digital assets', color: 'blue' },
  { symbol: 'US10Y', name: 'US 10 Year Yield', price: 4.244, change: -0.06, category: 'Rates', color: '' },
  { symbol: 'VIX', name: 'Volatility Index', price: 16.42, change: -1.24, category: 'Volatility', color: 'yellow' },
  { symbol: 'NIKKEI', name: 'Japan 225', price: 38320.10, change: 0.76, category: 'Indices', color: 'blue' },
  { symbol: 'FTSE', name: 'UK 100', price: 8284.30, change: 0.21, category: 'Indices', color: '' },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: 0.6548, change: -0.18, category: 'Forex', color: 'yellow' },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.3742, change: 0.13, category: 'Forex', color: 'blue' }
];
const marketNews = [
  { time: '09:42', tag: 'CENTRAL BANKS', title: 'Markets weigh the next rate decision as inflation data cools.', impact: 'medium' },
  { time: '09:28', tag: 'EQUITIES', title: 'Technology shares lead early gains across US index futures.', impact: 'positive' },
  { time: '08:56', tag: 'COMMODITIES', title: 'Brent crude steadies as traders assess updated supply guidance.', impact: 'neutral' },
  { time: '08:31', tag: 'UGANDA', title: 'The shilling opens steady against the dollar in Kampala trading.', impact: 'neutral' },
  { time: '07:48', tag: 'MACRO', title: 'Asian manufacturing reading beats expectations overnight.', impact: 'positive' },
  { time: '07:22', tag: 'BONDS', title: 'Treasury yields edge lower as demand returns to duration.', impact: 'positive' },
  { time: '06:58', tag: 'DIGITAL ASSETS', title: 'Bitcoin holds above six figures as spot volumes improve.', impact: 'positive' },
  { time: '06:35', tag: 'EUROPE', title: 'European futures point to a measured open ahead of earnings.', impact: 'neutral' },
  { time: '06:12', tag: 'FOREX', title: 'Dollar trades mixed against major currencies in early dealing.', impact: 'medium' },
  { time: '05:46', tag: 'ENERGY', title: 'Natural gas slips as weather forecasts reduce near-term demand.', impact: 'medium' },
  { time: '05:18', tag: 'EARNINGS', title: 'Investors await guidance from the next wave of global results.', impact: 'neutral' }
];
const registeredParams = new URLSearchParams(window.location.search);
const registeredEmail = registeredParams.get('registered');
const registeredName = registeredParams.get('name');
if(registeredEmail && document.getElementById('email')){
  document.getElementById('email').value = registeredEmail;
  if(registeredName && !users.some(user => user.email.toLowerCase() === registeredEmail.toLowerCase())){
    const newUser = { name: registeredName, email: registeredEmail, joined: 'Today, 10:15', status: 'Pending', investments: 'UGX 0', portfolio: 0, activeInvestment: 0 };
    users.unshift(newUser);
    localStorage.setItem('apexUsers', JSON.stringify(users.filter(user => !defaultUsers.some(defaultUser => defaultUser.email === user.email))));
  }
  showToast('Account created. Sign in to continue.');
}
function initials(name){ return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(); }
function updateUserChrome(user){ const shortName = user.name.split(' ')[0]; const userInitials = initials(user.name); document.getElementById('pageTitle').innerHTML = currentRole === 'admin' ? 'Admin operations <span>~</span>' : `Good morning, ${shortName} <span>~</span>`; document.getElementById('sidebarName').textContent = user.name; document.getElementById('topName').textContent = user.name; document.getElementById('sidebarAvatar').textContent = userInitials; document.getElementById('topAvatar').textContent = userInitials; }
function money(value){ return 'UGX ' + Number(value).toLocaleString('en-US'); }
function showToast(message){ toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200); }
function renderOverview(){
  const portfolio = currentUser.portfolio || 0; const activeInvestment = currentUser.activeInvestment || 0;
  const userTransactions = portfolio ? transactions : [];
  const planStatus = currentUser.investmentStatus === 'Running' ? `Plan running · ${currentUser.investmentDaysRemaining || 14} days remaining` : activeInvestment ? 'Investment plan active' : 'No active investment';
  viewContent.innerHTML = `<div class="welcome-row"><div><h3>Your capital at a glance</h3><p>Stay close to the moves that matter.</p></div><div class="date-badge">16 Sep 2026 <span>v</span></div></div>
  <div class="summary-grid"><article class="summary-card highlight"><div class="card-label">Total portfolio</div><h4>${money(portfolio)}</h4><div class="card-foot"><span class="trend">${portfolio ? '+ UGX 1,250,000' : 'UGX 0 deposited'}</span> ${portfolio ? 'this cycle' : 'ready when you are'}</div><div class="mini-chart">⌁⌁⌁</div></article><article class="summary-card"><div class="card-label">Active investment</div><h4>${money(activeInvestment)}</h4><div class="card-foot">${activeInvestment ? '12 days remaining' : 'No active investment'}</div></article><article class="summary-card"><div class="card-label">Projected growth</div><h4 class="trend">${portfolio ? '+35%' : '0%'} <span style="font-size:12px;color:var(--muted);font-family:'DM Sans'">/ day</span></h4><div class="card-foot">14-day investment cycle</div></article></div>
  <div class="section-grid"><article class="content-card"><div class="card-heading"><h3>Portfolio allocation</h3><a href="#" data-view-link="markets">View markets &rarr;</a></div><div class="allocation-chart"><div class="donut"><div class="donut-center">${money(portfolio)}</div></div><div class="legend"><div class="legend-row"><span><i class="legend-dot" style="background:var(--teal)"></i> Standard markets</span><strong>${portfolio ? '58%' : '0%'}</strong></div><div class="legend-row"><span><i class="legend-dot" style="background:var(--lime)"></i> Active investment</span><strong>${activeInvestment ? '23%' : '0%'}</strong></div><div class="legend-row"><span><i class="legend-dot" style="background:var(--orange)"></i> Available cash</span><strong>${portfolio ? '19%' : '0%'}</strong></div></div></div></article><article class="content-card"><div class="card-heading"><h3>Quick actions</h3></div><p style="font-size:12px;color:var(--muted);line-height:1.6;margin:0">Move money into your account or request a withdrawal when you need it.</p><div class="action-row"><button class="action-button deposit" data-action="deposit">+ Deposit</button><button class="action-button withdraw" data-action="withdraw">- Withdraw</button></div><div class="plan-status">${planStatus}</div></article></div>
  <div class="section-grid" style="margin-top:15px"><article class="content-card"><div class="card-heading"><h3>Recent activity</h3><a href="#" data-view-link="activity">See all &rarr;</a></div><div class="transaction-list">${userTransactions.length ? userTransactions.map(transactionTemplate).join('') : '<div class="empty-view"><p>No activity yet. Your confirmed deposits and investments will appear here.</p></div>'}</div></article><article class="content-card"><div class="card-heading"><h3>Markets</h3><a href="#" data-view-link="markets">Open market &rarr;</a></div><div class="forex-list">${forexTemplate('SPX','S&P 500','5,618.25','+0.84%','blue')}${forexTemplate('NDX','Nasdaq 100','19,412.10','+0.32%','yellow')}${forexTemplate('GOLD','Gold / USD','2,563.40','-0.12%','')}</div></article></div>`;
  bindDynamicEvents();
}
function transactionTemplate(item){ return `<div class="transaction"><div class="transaction-name"><span class="pair-icon">${item.icon}</span><span><strong>${item.name}</strong><small>${item.meta}</small></span></div><div class="transaction-amount ${item.type === 'deposit' ? 'deposit-text' : 'withdraw-text'}">${item.amount}<small>${item.type === 'deposit' ? 'Completed' : 'Processed'}</small></div></div>`; }
function forexTemplate(pair,name,price,change,color){ return `<div class="forex-row"><div class="pair"><span class="pair-icon ${color}">${pair.slice(0,3)}</span><span>${pair}<small>${name}</small></span></div><span class="forex-price">${price}</span><span class="forex-change" style="${change[0] === '-' ? 'color:var(--red)' : ''}">${change}</span></div>`; }
function marketTemplate(market){ const signedChange = `${market.change >= 0 ? '+' : ''}${market.change.toFixed(2)}%`; return `<button class="market-tile" data-market-symbol="${market.symbol}"><span class="pair-icon ${market.color}">${market.symbol.slice(0,3)}</span><span class="market-tile-copy"><strong>${market.symbol}</strong><small>${market.name} · ${market.category}</small></span><span class="market-tile-price">${market.price.toLocaleString('en-US', { maximumFractionDigits: 4 })}<small class="${market.change >= 0 ? 'deposit-text' : 'withdraw-text'}">${signedChange}</small></span><span class="market-tile-arrow">&rarr;</span></button>`; }
function newsTemplate(item){ return `<article class="news-item"><span class="news-time">${item.time}</span><span class="news-copy"><b>${item.tag}</b><strong>${item.title}</strong></span><i class="news-impact ${item.impact}"></i></article>`; }
function openMarketChat(symbol){ const market = marketData.find(item => item.symbol === symbol); const modal = document.createElement('div'); modal.className = 'modal-backdrop'; modal.id = 'marketModal'; modal.innerHTML = `<div class="modal market-modal"><div class="market-modal-head"><div><p class="eyebrow">LIVE INSTRUMENT</p><h3>${market.symbol} · ${market.name}</h3></div><span class="live-badge"><i></i> LIVE</span></div><div class="market-quote"><strong>${market.price.toLocaleString('en-US', { maximumFractionDigits: 4 })}</strong><span class="${market.change >= 0 ? 'deposit-text' : 'withdraw-text'}">${market.change >= 0 ? '+' : ''}${market.change.toFixed(2)}%</span></div><div class="market-sparkline"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="chat-heading"><h4>Market chat</h4><small>Join the conversation</small></div><div class="market-chat" id="marketChat"><p><b>Analyst desk</b> Watching momentum around the next data release.</p><p><b>Market pulse</b> Volume is building in ${market.category.toLowerCase()}.</p></div><div class="chat-compose"><input id="chatMessage" placeholder="Share a market view..."><button class="confirm-button" id="sendChat">Send</button></div><button class="cancel-button market-close" id="closeMarket">Close</button></div>`; document.body.appendChild(modal); document.getElementById('closeMarket').onclick = () => modal.remove(); document.getElementById('sendChat').onclick = () => { const input = document.getElementById('chatMessage'); if(!input.value.trim()) return; const message = document.createElement('p'); message.innerHTML = `<b>You</b> ${input.value.trim()}`; document.getElementById('marketChat').appendChild(message); input.value = ''; }; }
function renderView(view){
  if(view === 'markets' && currentRole === 'admin'){ renderAdmin(); return; }
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === view));
  if(view === 'overview'){ renderOverview(); return; }
  if(view === 'markets'){ viewContent.innerHTML = `<div class="welcome-row"><div><h3>Live markets</h3><p>Track indices, forex, commodities and digital assets in one place.</p></div><div class="live-badge"><i></i> Live simulation</div></div><div class="market-layout"><div class="content-card market-board"><div class="card-heading"><h3>All instruments</h3><span class="market-updated">Updated just now</span></div><div class="market-filters"><button class="filter-chip active">All</button><button class="filter-chip">Indices</button><button class="filter-chip">Forex</button><button class="filter-chip">Commodities</button><button class="filter-chip">Digital assets</button></div><div class="market-grid">${marketData.map(marketTemplate).join('')}</div></div><div class="content-card news-board"><div class="card-heading"><h3>Fundamental news</h3><span class="live-badge"><i></i> Live</span></div><p class="news-caption">Macro headlines moving markets today.</p><div class="news-list">${marketNews.map(newsTemplate).join('')}</div></div></div>`; }
  if(view === 'activity'){ viewContent.innerHTML = `<div class="welcome-row"><div><h3>How to invest</h3><p>Follow these simple steps to put your capital to work.</p></div></div><div class="investment-guide"><article class="content-card investment-step"><span class="step-number">01</span><div><h3>Choose your amount</h3><p>Decide how much you want to invest. Deposits start from UGX 15,000.</p></div></article><article class="content-card investment-step"><span class="step-number">02</span><div><h3>Send your deposit</h3><p>Tap the button below, choose your mobile-money provider, and send the payment to the displayed number.</p></div></article><article class="content-card investment-step"><span class="step-number">03</span><div><h3>Wait for confirmation</h3><p>Submit your payment details. Our team reviews the deposit and confirms it manually.</p></div></article><article class="content-card investment-step"><span class="step-number">04</span><div><h3>Track your investment</h3><p>Once confirmed, your balance and active investment plan appear on your Overview page.</p></div></article></div><div class="content-card investment-start"><div><h3>Ready to begin?</h3><p>Start your investment with a secure deposit request.</p></div><button class="action-button deposit" data-action="deposit">+ Make a deposit</button></div>`; }
  if(view === 'settings'){ viewContent.innerHTML = `<div class="welcome-row"><div><h3>Account settings</h3><p>Manage your personal account preferences.</p></div></div><div class="empty-view"><h3>${currentUser.name}</h3><p>Personal account · ${currentUser.email}</p><button class="action-button deposit" style="max-width:180px;margin-top:22px" onclick="showToast('Settings are saved automatically.')">Update profile</button></div>`; }
  if(view === 'admin'){ renderAdmin(); }
  bindDynamicEvents();
}
function renderAdmin(){
  viewContent.innerHTML = `<div class="welcome-row"><div><h3>Admin panel</h3><p>Review new registrations and manage account access.</p></div><div class="date-badge">${users.length} accounts <span>v</span></div></div><div class="summary-grid"><article class="summary-card"><div class="card-label">New users</div><h4>${users.filter(user => user.status === 'Pending').length}</h4><div class="card-foot">Awaiting review</div></article><article class="summary-card"><div class="card-label">Pending requests</div><h4>${pendingRequests.filter(request => request.status === 'Pending').length}</h4><div class="card-foot">Deposits and withdrawals</div></article><article class="summary-card highlight"><div class="card-label">Payment connection</div><h4>Sandbox</h4><div class="card-foot">API credentials stay server-side</div></article></div><article class="content-card"><div class="card-heading"><h3>Pending deposits and withdrawals</h3><span class="trend" style="font-size:11px">Confirm manually</span></div><table class="admin-table"><thead><tr><th>Client</th><th>Type</th><th>Amount</th><th>Submitted</th><th>Action</th></tr></thead><tbody>${pendingRequests.filter(request => request.status === 'Pending').map((request, index) => `<tr><td><strong>${request.name}</strong><small style="display:block;color:var(--muted);margin-top:4px">${request.email}</small></td><td><span class="request-type ${request.type}">${request.type}</span></td><td>${money(request.amount)}</td><td>${request.submitted}</td><td><button class="admin-action" data-request-action="approve" data-request-index="${index}">Confirm</button><button class="admin-action reject-action" data-request-action="reject" data-request-index="${index}">Reject</button></td></tr>`).join('') || '<tr><td colspan="5">No pending payment requests.</td></tr>'}</tbody></table></article><article class="content-card"><div class="card-heading"><h3>User management</h3><span class="trend" style="font-size:11px">Manual review required</span></div><table class="admin-table"><thead><tr><th>User</th><th>Joined</th><th>Invested</th><th>Status</th><th>Action</th></tr></thead><tbody>${users.map((user, index) => `<tr><td><strong>${user.name}</strong><small style="display:block;color:var(--muted);margin-top:4px">${user.email}</small></td><td>${user.joined}</td><td>${user.investments}</td><td><span class="status-pill ${user.status === 'Pending' ? 'pending' : ''}">${user.status}</span></td><td>${user.status === 'Pending' ? `<button class="admin-action" data-user-action="approve" data-user-index="${index}">Approve</button>` : `<button class="admin-action" data-user-action="suspend" data-user-index="${index}">Suspend</button>`}</td></tr>`).join('')}</tbody></table></article>`;
  document.querySelectorAll('[data-user-action]').forEach(button => button.onclick = () => {
    const user = users[Number(button.dataset.userIndex)];
    user.status = button.dataset.userAction === 'approve' ? 'Active' : 'Suspended';
    persistUsers();
    showToast(`${user.name} is now ${user.status.toLowerCase()}.`);
    renderAdmin();
  });
  document.querySelectorAll('[data-request-action]').forEach(button => button.onclick = () => {
    const request = pendingRequests.filter(item => item.status === 'Pending')[Number(button.dataset.requestIndex)];
    request.status = button.dataset.requestAction === 'approve' ? 'Confirmed' : 'Rejected';
    if(request.status === 'Confirmed'){
      const client = users.find(user => user.email.toLowerCase() === request.email.toLowerCase());
      if(client){
        client.portfolio = client.portfolio || 0;
        client.activeInvestment = client.activeInvestment || 0;
        if(request.type === 'deposit'){
          client.portfolio += request.amount;
          client.activeInvestment = request.amount;
          client.investmentStatus = 'Running';
          client.investmentStarted = 'Today';
          client.investmentDaysRemaining = 14;
          client.investments = money(client.portfolio);
        } else {
          client.portfolio = Math.max(0, client.portfolio - request.amount);
          client.investments = money(client.portfolio);
        }
        persistUsers();
      }
    }
    persistRequests();
    showToast(`${request.type} request ${request.status.toLowerCase()}${request.status === 'Confirmed' && request.type === 'deposit' ? '. Investment plan is now running.' : '.'}`);
    renderAdmin();
  });
}
function openModal(type){
  const isDeposit = type === 'deposit';
  const modal = document.createElement('div'); modal.className = 'modal-backdrop'; modal.id = 'moneyModal';
  modal.innerHTML = `<div class="modal"><h3>${isDeposit ? 'Make a deposit' : 'Request a withdrawal'}</h3><p>${isDeposit ? 'Payments are currently handled manually while the payment integration is paused.' : 'Withdraw available funds to your mobile money account.'}</p>${isDeposit ? '<label for="provider">Mobile money provider</label><select id="provider"><option>MTN Mobile Money</option><option>Airtel Money</option></select><div class="payment-destination"><strong>Send payment to</strong><b>+256 758 760 840</b><small>Use the selected mobile-money network, then submit your amount below.</small></div>' : '<label for="withdrawProvider">Send to</label><select id="withdrawProvider"><option>MTN Mobile Money · 0772 123 456</option><option>Airtel Money · 0701 555 024</option></select>'}<label for="amount">Amount (UGX)</label><input id="amount" type="number" min="${isDeposit ? '15000' : '1000'}" max="20000000" placeholder="${isDeposit ? '15,000' : '100,000'}"><div class="limit-note">${isDeposit ? 'Minimum deposit: UGX 15,000 · Maximum: UGX 20,000,000' : 'Available to withdraw: UGX 1,250,000'}</div><div class="modal-actions"><button class="cancel-button" id="cancelModal">Cancel</button><button class="confirm-button" id="confirmModal">${isDeposit ? 'Submit payment details' : 'Request withdrawal'}</button></div></div>`;
  document.body.appendChild(modal); document.getElementById('cancelModal').onclick = () => modal.remove(); document.getElementById('confirmModal').onclick = () => { const amount = Number(document.getElementById('amount').value); if(isDeposit && (amount < 15000 || amount > 20000000)){ showToast('Enter an amount between UGX 15,000 and UGX 20,000,000.'); return; } if(!amount){ showToast('Enter an amount to continue.'); return; } pendingRequests.unshift({ name: currentUser.name, email: currentUser.email, type: isDeposit ? 'deposit' : 'withdrawal', amount, submitted: 'Just now', status: 'Pending' }); persistRequests(); modal.remove(); showToast(isDeposit ? 'Deposit sent to admin for confirmation.' : 'Withdrawal sent to admin for confirmation.'); };
}
function bindDynamicEvents(){ document.querySelectorAll('[data-action]').forEach(button => button.onclick = () => openModal(button.dataset.action)); document.querySelectorAll('[data-view-link]').forEach(link => link.onclick = event => { event.preventDefault(); renderView(link.dataset.viewLink); }); document.querySelectorAll('[data-market-symbol]').forEach(button => button.onclick = () => openMarketChat(button.dataset.marketSymbol)); document.querySelectorAll('.filter-chip').forEach(button => button.onclick = () => { document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active')); button.classList.add('active'); const category = button.textContent; document.querySelectorAll('.market-tile').forEach(tile => { const market = marketData.find(item => item.symbol === tile.dataset.marketSymbol); tile.hidden = category !== 'All' && market.category !== category; }); }); }
const loginForm = document.getElementById('loginForm');
if(loginForm){ loginForm.onsubmit = event => { event.preventDefault(); currentRole = document.getElementById('accountType').value; const email = document.getElementById('email').value.trim().toLowerCase(); const password = document.getElementById('password').value; if(currentRole === 'client'){ currentUser = users.find(user => user.email.toLowerCase() === email && user.status !== 'Suspended' && (!user.password || user.password === password)); if(!currentUser){ showToast('Email or password not recognised, or this account is suspended.'); return; } } else { if(email !== adminLogin.id || password !== adminLogin.password){ showToast('Administrator credentials not recognised.'); return; } currentUser = { name: adminLogin.name, email: adminLogin.id, status: 'Active', portfolio: 0, activeInvestment: 0 }; } window.location.href = `dashboard.html?email=${encodeURIComponent(currentUser.email)}&name=${encodeURIComponent(currentUser.name)}&role=${currentRole}`; }; }
const logoutButton = document.getElementById('logoutButton');
if(logoutButton){ logoutButton.onclick = () => { window.location.href = 'index.html'; }; }
const showPassword = document.getElementById('showPassword');
if(showPassword){ showPassword.onclick = () => { const input = document.getElementById('password'); input.type = input.type === 'password' ? 'text' : 'password'; showPassword.textContent = input.type === 'password' ? 'SHOW' : 'HIDE'; }; }
const forgotLink = document.getElementById('forgotLink');
if(forgotLink){ forgotLink.onclick = event => { event.preventDefault(); showToast('Password reset instructions are on their way.'); }; }
const notificationButton = document.getElementById('notificationButton');
if(notificationButton){ notificationButton.onclick = () => { showToast('Live market news refreshed.'); viewContent.innerHTML = `<div class="welcome-row"><div><h3>Market notifications</h3><p>Fundamental headlines and account alerts in one stream.</p></div><div class="live-badge"><i></i> Live feed</div></div><div class="content-card"><div class="card-heading"><h3>Latest fundamental news</h3><span class="market-updated">Just now</span></div><div class="news-list">${marketNews.map(newsTemplate).join('')}</div></div>`; }; }
document.querySelectorAll('.nav-item').forEach(item => item.onclick = () => renderView(item.dataset.view));
if(dashboard){
  currentRole = registeredParams.get('role') || 'client';
  const dashboardEmail = (registeredParams.get('email') || '').toLowerCase();
  currentUser = users.find(user => user.email.toLowerCase() === dashboardEmail) || { name: registeredParams.get('name') || 'Alex Morgan', email: dashboardEmail, status: 'Active', portfolio: 0, activeInvestment: 0 };
  dashboard.classList.toggle('admin-mode', currentRole === 'admin');
  updateUserChrome(currentUser);
  renderView(currentRole === 'admin' ? 'admin' : 'overview');
  setInterval(() => { marketData.forEach(market => { market.price *= 1 + ((Math.random() - 0.48) / 500); market.change = Math.max(-9.99, Math.min(9.99, market.change + (Math.random() - 0.5) / 10)); const tile = document.querySelector(`[data-market-symbol="${market.symbol}"]`); if(tile){ const price = tile.querySelector('.market-tile-price'); price.firstChild.textContent = market.price.toLocaleString('en-US', { maximumFractionDigits: 4 }); const change = price.querySelector('small'); change.textContent = `${market.change >= 0 ? '+' : ''}${market.change.toFixed(2)}%`; change.className = market.change >= 0 ? 'deposit-text' : 'withdraw-text'; } }); const updated = document.querySelector('.market-updated'); if(updated) updated.textContent = 'Updated just now'; }, 5000);
  setInterval(() => { marketNews.push(marketNews.shift()); document.querySelectorAll('.news-list').forEach(list => { list.innerHTML = marketNews.map(newsTemplate).join(''); }); }, 12000);
}
