const STORAGE_KEY = 'financeiro-keven-v2';
const THEME_KEY = 'financeiro-keven-theme';

const todayBaseMonth = '2026-07';
let selectedEntryType = 'saida';

const makeId = () => (crypto?.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random()}`);

const initialState = {
  currentBalance: 186.48,
  baseMonth: '2026-07',
  entries: [
    { id: makeId(), month: '2026-07', type: 'entrada', category: 'renda', description: 'Empréstimo Nubank recebido', value: 10000, dueDate: '2026-07-30', status: 'pago', hiddenFromProjection: true },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento atrasado — Abril', value: 1425.57, dueDate: '2026-04-25', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento atrasado — Maio Encargos CEF', value: 1639.40, dueDate: '2026-05-20', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento atrasado — Maio MR/Correção', value: 1517.31, dueDate: '2026-05-25', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento atrasado — Junho', value: 1398.85, dueDate: '2026-06-25', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento — DB Encargos CEF julho', value: 1593.35, dueDate: '2026-07-06', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'cartao', description: 'Julia', value: 1500, dueDate: '2026-07-30', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'pessoas', description: 'Sarah — aniversário Ygor', value: 50, dueDate: '2026-07-30', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'emprestimo', description: 'Cheque especial CAIXA', value: 1498.48, dueDate: '2026-07-30', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'cartao', description: 'Nubank — cartão/assinaturas', value: 219.56, dueDate: '2026-07-30', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'fixo', description: 'Claro — internet/celular', value: 160, dueDate: '2026-07-30', status: 'pendente' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'pessoas', description: 'Pacheco — almoço jogo do Brasil', value: 75, dueDate: '2026-07-30', status: 'pendente' },

    { id: makeId(), month: '2026-08', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: makeId(), month: '2026-08', type: 'saida', category: 'pessoas', description: 'Sarah — parcelas 2/3 + 2/10', value: 463.20, status: 'previsto' },
    { id: makeId(), month: '2026-08', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 1200, status: 'previsto' },
    { id: makeId(), month: '2026-08', type: 'saida', category: 'apartamento', description: 'Taxa R', value: 221.16, dueDate: '2026-08-08', status: 'previsto' },
    { id: makeId(), month: '2026-08', type: 'saida', category: 'apartamento', description: 'MR — mensalidade', value: 1095.64, dueDate: '2026-08-25', status: 'previsto' },

    { id: makeId(), month: '2026-09', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: makeId(), month: '2026-09', type: 'saida', category: 'pessoas', description: 'Sarah — parcelas 3/3 + 3/10', value: 463.20, status: 'previsto' },
    { id: makeId(), month: '2026-09', type: 'saida', category: 'apartamento', description: 'MR — mensalidade', value: 1095.64, dueDate: '2026-09-25', status: 'previsto' },
    { id: makeId(), month: '2026-09', type: 'saida', category: 'apartamento', description: 'SR — anual / época de PLR', value: 5600, dueDate: '2026-09-30', status: 'especial' },

    { id: makeId(), month: '2026-10', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: makeId(), month: '2026-10', type: 'saida', category: 'pessoas', description: 'Sarah — parcela 4/10', value: 223.21, status: 'previsto' },
    { id: makeId(), month: '2026-10', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 650, status: 'previsto' },
    { id: makeId(), month: '2026-10', type: 'saida', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 1/24', value: 799.55, status: 'previsto' },
    { id: makeId(), month: '2026-10', type: 'saida', category: 'apartamento', description: 'MR — mensalidade', value: 1095.64, dueDate: '2026-10-25', status: 'previsto' },

    { id: makeId(), month: '2026-11', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: makeId(), month: '2026-11', type: 'saida', category: 'pessoas', description: 'Sarah — parcela 5/10', value: 223.21, status: 'previsto' },
    { id: makeId(), month: '2026-11', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 650, status: 'previsto' },
    { id: makeId(), month: '2026-11', type: 'saida', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 2/24', value: 799.55, status: 'previsto' },
    { id: makeId(), month: '2026-12', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: makeId(), month: '2026-12', type: 'saida', category: 'pessoas', description: 'Sarah — parcela 6/10', value: 223.21, status: 'previsto' },
    { id: makeId(), month: '2026-12', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 500, status: 'previsto' },
    { id: makeId(), month: '2026-12', type: 'saida', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 3/24', value: 799.55, status: 'previsto' }
  ],
  fixedMonthly: [
    { id: makeId(), type: 'saida', category: 'fixo', description: 'Claro — internet/celular', value: 160, day: null, active: true },
    { id: makeId(), type: 'saida', category: 'fixo', description: 'Save Car — seguro Escort', value: 115, day: null, active: true },
    { id: makeId(), type: 'saida', category: 'fixo', description: 'YouTube Premium com Pacheco', value: 50, day: null, active: true }
  ]
};

let state = loadState();
applyTheme(localStorage.getItem(THEME_KEY) || 'light');

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(initialState);
  try {
    const parsed = JSON.parse(saved);
    return { ...structuredClone(initialState), ...parsed };
  } catch {
    return structuredClone(initialState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function parseMoney(value) {
  if (typeof value === 'number') return value;
  const normalized = String(value || '').replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
  return Number(normalized) || 0;
}

function formatBRL(value) {
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDate(dateString) {
  if (!dateString) return 'sem venc.';
  const [y, m, d] = dateString.split('-');
  return `${d}/${m}`;
}

function monthName(monthKey, long = true) {
  const [year, month] = monthKey.split('-').map(Number);
  const opts = long ? { month: 'long', year: 'numeric' } : { month: 'short', year: '2-digit' };
  return new Date(year, month - 1, 1).toLocaleDateString('pt-BR', opts);
}

function addMonths(monthKey, offset) {
  const [year, month] = monthKey.split('-').map(Number);
  const d = new Date(year, month - 1 + offset, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getVisibleMonths() {
  return [0, 1, 2].map(offset => addMonths(state.baseMonth || todayBaseMonth, offset));
}

function generateMonthOptions() {
  const select = document.getElementById('baseMonthSelect');
  select.innerHTML = '';
  for (let i = -1; i <= 8; i++) {
    const value = addMonths(todayBaseMonth, i);
    const option = document.createElement('option');
    option.value = value;
    option.textContent = monthName(value, false);
    select.appendChild(option);
  }
  select.value = state.baseMonth || todayBaseMonth;
}

function fixedForMonth(monthKey) {
  const julyExclusions = ['Save Car — seguro Escort', 'YouTube Premium com Pacheco'];
  return state.fixedMonthly
    .filter(item => item.active)
    .filter(item => !(monthKey === '2026-07' && julyExclusions.includes(item.description)))
    .filter(item => !state.entries.some(e => e.month === monthKey && e.description === item.description))
    .map(item => ({
      ...item,
      id: `${item.id}-${monthKey}`,
      source: 'fixed',
      month: monthKey,
      status: 'previsto',
      dueDate: item.day ? `${monthKey}-${String(item.day).padStart(2, '0')}` : ''
    }));
}

function entriesForMonth(monthKey) {
  return [...state.entries.filter(e => e.month === monthKey), ...fixedForMonth(monthKey)]
    .sort((a, b) => (a.dueDate || '9999-99-99').localeCompare(b.dueDate || '9999-99-99'));
}

function calculateMonth(monthKey) {
  const entries = entriesForMonth(monthKey).filter(e => !e.hiddenFromProjection);
  const entradas = entries.filter(e => e.type === 'entrada').reduce((sum, e) => sum + Number(e.value), 0);
  const saidas = entries.filter(e => e.type === 'saida').reduce((sum, e) => sum + Number(e.value), 0);
  const pendente = entries.filter(e => e.type === 'saida' && e.status !== 'pago').reduce((sum, e) => sum + Number(e.value), 0);
  return { entries, entradas, saidas, pendente, result: entradas - saidas };
}

function calculateCurrentMonth() {
  const pending = entriesForMonth(state.baseMonth || todayBaseMonth)
    .filter(e => !e.hiddenFromProjection && e.type === 'saida' && e.status !== 'pago')
    .reduce((sum, e) => sum + Number(e.value), 0);
  return { pending, result: Number(state.currentBalance) - pending };
}

function categoryIcon(category) {
  const map = {
    apartamento: 'AP', fixo: 'FX', cartao: 'CT', pessoas: 'PS', emprestimo: 'EM', renda: 'RD', outros: '•'
  };
  return map[category] || '•';
}

function categoryColor(category) {
  const map = {
    apartamento: '#0f766e', fixo: '#51606a', cartao: '#111827', pessoas: '#7c3aed', emprestimo: '#b45309', renda: '#15803d', outros: '#64748b'
  };
  return map[category] || '#64748b';
}

function categoryLabel(category) {
  const map = {
    apartamento: 'Apartamento', fixo: 'Fixo', cartao: 'Cartão', pessoas: 'Pessoas', emprestimo: 'Empréstimo', renda: 'Renda', outros: 'Outros'
  };
  return map[category] || category;
}

function statusLabel(status) {
  const map = { pago: 'Pago', pendente: 'Pendente', previsto: 'Previsto', especial: 'Especial' };
  return map[status] || status;
}

function render() {
  generateMonthOptions();
  document.getElementById('currentBalance').textContent = formatBRL(state.currentBalance);
  document.getElementById('balanceInput').value = String(state.currentBalance).replace('.', ',');
  document.getElementById('entryMonth').value ||= state.baseMonth || todayBaseMonth;
  renderHealth();
  renderUpcoming();
  renderSummaryCards();
  renderMonths();
}

function renderHealth() {
  const current = calculateCurrentMonth();
  const pill = document.getElementById('healthPill');
  if (current.result >= 0) {
    pill.textContent = `🟩 Sobra projetada: ${formatBRL(current.result)}`;
  } else {
    pill.textContent = `🟥 Falta projetada: ${formatBRL(Math.abs(current.result))}`;
  }
}

function renderUpcoming() {
  const list = document.getElementById('upcomingList');
  const months = getVisibleMonths();
  const entries = months.flatMap(month => entriesForMonth(month))
    .filter(e => !e.hiddenFromProjection && e.type === 'saida' && e.status !== 'pago')
    .sort((a, b) => (a.dueDate || `${a.month}-99`).localeCompare(b.dueDate || `${b.month}-99`))
    .slice(0, 5);

  list.innerHTML = '';
  if (!entries.length) {
    list.innerHTML = '<div class="empty-state">Nenhuma pendência nos meses visíveis. Que fase rara, aproveita kkkkk</div>';
    return;
  }
  entries.forEach(entry => list.appendChild(renderTransaction(entry, false)));
}

function renderSummaryCards() {
  const container = document.getElementById('summaryCards');
  container.innerHTML = '';
  getVisibleMonths().forEach((month, index) => {
    const calc = calculateMonth(month);
    const result = index === 0 ? calculateCurrentMonth().result : calc.result;
    const card = document.createElement('article');
    card.className = `summary-card ${result >= 0 ? 'positive' : 'negative'}`;
    card.innerHTML = `
      <span>${monthName(month)}</span>
      <strong>${result >= 0 ? '🟩' : '🟥'} ${formatBRL(result)}</strong>
      <small>${index === 0 ? 'saldo atual - pendências' : `${formatBRL(calc.entradas)} entra • ${formatBRL(calc.saidas)} sai`}</small>
    `;
    container.appendChild(card);
  });
}

function renderMonths() {
  const container = document.getElementById('monthsContainer');
  const template = document.getElementById('monthTemplate');
  container.innerHTML = '';

  getVisibleMonths().forEach((month, index) => {
    const calc = calculateMonth(month);
    const current = index === 0 ? calculateCurrentMonth() : null;
    const resultValue = current ? current.result : calc.result;
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.month-card');
    const title = clone.querySelector('h3');
    const subtitle = clone.querySelector('p');
    const result = clone.querySelector('.month-result');
    const metrics = clone.querySelector('.mini-metrics');
    const list = clone.querySelector('.transaction-list');

    title.textContent = monthName(month);
    subtitle.textContent = index === 0
      ? `saldo ${formatBRL(state.currentBalance)} • pendente ${formatBRL(current.pending)}`
      : `entradas ${formatBRL(calc.entradas)} • saídas ${formatBRL(calc.saidas)}`;
    result.textContent = `${resultValue >= 0 ? '🟩' : '🟥'} ${formatBRL(resultValue)}`;
    result.classList.add(resultValue >= 0 ? 'positive' : 'negative');

    metrics.innerHTML = `
      <div class="metric positive"><span>Entradas</span><strong>${formatBRL(calc.entradas)}</strong></div>
      <div class="metric negative"><span>Saídas</span><strong>${formatBRL(calc.saidas)}</strong></div>
      <div class="metric"><span>Pendente</span><strong>${formatBRL(calc.pendente)}</strong></div>
    `;

    const entries = entriesForMonth(month).filter(e => !e.hiddenFromProjection);
    if (!entries.length) {
      list.innerHTML = '<div class="empty-state">Nenhum lançamento nesse mês.</div>';
    } else {
      entries.forEach(entry => list.appendChild(renderTransaction(entry, true)));
    }
    container.appendChild(card);
  });
}

function renderTransaction(entry, allowDelete) {
  const template = document.getElementById('transactionTemplate');
  const node = template.content.cloneNode(true);
  const item = node.querySelector('.transaction-item');
  const icon = node.querySelector('.transaction-icon');
  const mainTitle = node.querySelector('.transaction-main strong');
  const mainSub = node.querySelector('.transaction-main span');
  const value = node.querySelector('.transaction-side strong');
  const sideSub = node.querySelector('.transaction-side span');
  const deleteBtn = node.querySelector('.delete-chip');

  icon.textContent = categoryIcon(entry.category);
  icon.style.background = categoryColor(entry.category);
  mainTitle.textContent = entry.description;
  mainSub.textContent = `${categoryLabel(entry.category)} • ${statusLabel(entry.status)} • ${formatDate(entry.dueDate)}`;
  value.textContent = `${entry.type === 'entrada' ? '+' : '-'}${formatBRL(entry.value).replace('R$', 'R$ ')}`;
  value.className = entry.type;
  sideSub.textContent = monthName(entry.month, false);

  const canDelete = allowDelete && state.entries.some(e => e.id === entry.id);
  if (canDelete) {
    deleteBtn.dataset.id = entry.id;
  } else {
    deleteBtn.hidden = true;
  }

  if (entry.status === 'pago') item.style.opacity = '.72';
  if (entry.status === 'especial') item.style.outline = '2px solid rgba(226,138,25,.22)';
  return node;
}

function setTab(tab) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(`screen-${tab}`).classList.add('active');
  document.querySelectorAll('.dock-action').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
  closeDrawer();
  closeFloatingNav();
  if (tab === 'add') document.getElementById('entryDescription').focus({ preventScroll: true });
}

function setEntryType(type) {
  selectedEntryType = type;
  document.querySelectorAll('[data-entry-type]').forEach(btn => btn.classList.toggle('selected', btn.dataset.entryType === type));
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, theme === 'dark' ? 'dark' : 'light');
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? '☀' : '☾';
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `backup-financeiro-keven-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data.entries || !Array.isArray(data.entries)) throw new Error('Arquivo inválido');
      state = { ...structuredClone(initialState), ...data };
      saveState();
      render();
      alert('Backup importado com sucesso.');
    } catch (error) {
      alert('Não consegui importar esse arquivo JSON.');
    }
  };
  reader.readAsText(file);
}

// Events

document.addEventListener('click', event => {
  const navTarget = event.target.closest('[data-tab]');
  if (navTarget) {
    const tab = navTarget.dataset.tab;
    if (navTarget.dataset.kind) setEntryType(navTarget.dataset.kind);
    setTab(tab);
  }

  const deleteBtn = event.target.closest('.delete-chip');
  if (deleteBtn && deleteBtn.dataset.id) {
    state.entries = state.entries.filter(entry => entry.id !== deleteBtn.dataset.id);
    saveState();
    render();
  }

  const preset = event.target.closest('[data-preset]');
  if (preset) document.getElementById('entryValue').value = preset.dataset.preset;

  if (!event.target.closest('#floatingNav')) closeFloatingNav();
});

document.querySelectorAll('[data-entry-type]').forEach(btn => {
  btn.addEventListener('click', () => setEntryType(btn.dataset.entryType));
});

document.getElementById('themeBtn').addEventListener('click', () => {
  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

function openDrawer() {
  const drawer = document.getElementById('sideDrawer');
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  const drawer = document.getElementById('sideDrawer');
  if (!drawer) return;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
}

function toggleFloatingNav() {
  const nav = document.getElementById('floatingNav');
  const trigger = document.getElementById('navTrigger');
  nav.classList.toggle('open');
  trigger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
}

function closeFloatingNav() {
  const nav = document.getElementById('floatingNav');
  const trigger = document.getElementById('navTrigger');
  if (!nav || !trigger) return;
  nav.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
}

document.getElementById('menuBtn').addEventListener('click', openDrawer);
document.getElementById('closeDrawerBtn').addEventListener('click', closeDrawer);
document.getElementById('sideDrawer').addEventListener('click', event => {
  if (event.target.id === 'sideDrawer') closeDrawer();
});
document.getElementById('navTrigger').addEventListener('click', event => {
  event.stopPropagation();
  toggleFloatingNav();
});

document.getElementById('baseMonthSelect').addEventListener('change', event => {
  state.baseMonth = event.target.value;
  saveState();
  render();
});

document.getElementById('entryForm').addEventListener('submit', event => {
  event.preventDefault();
  const entry = {
    id: makeId(),
    month: document.getElementById('entryMonth').value,
    type: selectedEntryType,
    description: document.getElementById('entryDescription').value.trim(),
    value: parseMoney(document.getElementById('entryValue').value),
    category: document.getElementById('entryCategory').value,
    dueDate: document.getElementById('entryDueDate').value,
    status: document.getElementById('entryStatus').value
  };
  state.entries.push(entry);
  saveState();
  event.target.reset();
  document.getElementById('entryMonth').value = state.baseMonth || todayBaseMonth;
  setEntryType('saida');
  render();
  setTab('home');
});

document.getElementById('fixedForm').addEventListener('submit', event => {
  event.preventDefault();
  state.fixedMonthly.push({
    id: makeId(),
    type: 'saida',
    category: 'fixo',
    description: document.getElementById('fixedDescription').value.trim(),
    value: parseMoney(document.getElementById('fixedValue').value),
    day: Number(document.getElementById('fixedDay').value) || null,
    active: true
  });
  saveState();
  event.target.reset();
  render();
});

document.getElementById('saveBalanceBtn').addEventListener('click', () => {
  state.currentBalance = parseMoney(document.getElementById('balanceInput').value);
  saveState();
  render();
  setTab('home');
});

document.getElementById('exportBtn').addEventListener('click', exportBackup);
document.getElementById('importInput').addEventListener('change', event => {
  const file = event.target.files?.[0];
  if (file) importBackup(file);
  event.target.value = '';
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Resetar os dados locais e voltar pra base inicial?')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(initialState);
  saveState();
  render();
  setTab('home');
});

render();
