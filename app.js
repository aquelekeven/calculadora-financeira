const STORAGE_KEY = 'financeiro-keven-v14';
const THEME_KEY = 'financeiro-keven-theme';
const todayBaseMonth = '2026-07';
let selectedEntryType = 'saida';

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialState = {
  currentBalance: 186.48,
  baseMonth: '2026-07',
  entries: [
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento — Abril/2026', value: 1425.57, dueDate: '2026-04-25', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento — Maio/2026 — Encargos CEF', value: 1639.40, dueDate: '2026-05-20', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento — Maio/2026 — MR/Correção', value: 1517.31, dueDate: '2026-05-25', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento — Junho/2026', value: 1398.85, dueDate: '2026-06-25', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento — DB Encargos CEF', value: 1593.35, dueDate: '2026-07-06', status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'emprestimo', description: 'Cheque especial CAIXA', value: 1498.48, status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'cartao', description: 'Julia', value: 1500, status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'outros', description: 'Sarah — aniversário Ygor', value: 50, status: 'pago' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'fixo', description: 'Claro — internet/celular', value: 160, status: 'pendente' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'outros', description: 'Pacheco — almoço jogo do Brasil', value: 75, status: 'pendente' },
    { id: makeId(), month: '2026-07', type: 'saida', category: 'cartao', description: 'Nubank — cartão/assinaturas', value: 219.56, status: 'pago' },

    { id: makeId(), month: '2026-08', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: makeId(), month: '2026-08', type: 'saida', category: 'pessoas', description: 'Sarah — parcelas 2/3 + 2/10', value: 463.20, status: 'previsto' },
    { id: makeId(), month: '2026-08', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 1200, status: 'previsto' },
    { id: makeId(), month: '2026-08', type: 'saida', category: 'apartamento', description: 'Taxa R', value: 221.16, dueDate: '2026-08-08', status: 'previsto' },
    { id: makeId(), month: '2026-08', type: 'saida', category: 'apartamento', description: 'MR — mensalidade', value: 1095.64, dueDate: '2026-08-25', status: 'previsto' },

    { id: makeId(), month: '2026-09', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: makeId(), month: '2026-09', type: 'saida', category: 'pessoas', description: 'Sarah — parcelas 3/3 + 3/10', value: 463.20, status: 'previsto' },
    { id: makeId(), month: '2026-09', type: 'saida', category: 'apartamento', description: 'MR — mensalidade', value: 1095.64, dueDate: '2026-09-25', status: 'previsto' },
    { id: makeId(), month: '2026-09', type: 'saida', category: 'apartamento', description: 'SR — anual', value: 5600, dueDate: '2026-09-30', status: 'especial' },

    { id: makeId(), month: '2026-10', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: makeId(), month: '2026-10', type: 'saida', category: 'pessoas', description: 'Sarah — parcela 4/10', value: 223.21, status: 'previsto' },
    { id: makeId(), month: '2026-10', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 650, status: 'previsto' },
    { id: makeId(), month: '2026-10', type: 'saida', category: 'apartamento', description: 'MR — mensalidade', value: 1095.64, dueDate: '2026-10-25', status: 'previsto' },
    { id: makeId(), month: '2026-10', type: 'saida', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 1/24', value: 799.55, status: 'previsto' }
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
function monthName(monthKey, long = true) {
  const [year, month] = monthKey.split('-').map(Number);
  const opts = long ? { month: 'long', year: 'numeric' } : { month: 'short', year: '2-digit' };
  return new Date(year, month - 1, 1).toLocaleDateString('pt-BR', opts);
}
function formatDate(dateString) {
  if (!dateString) return 'sem venc.';
  const [y, m, d] = dateString.split('-');
  return `${d}/${m}`;
}
function addMonths(monthKey, offset) {
  const [year, month] = monthKey.split('-').map(Number);
  const d = new Date(year, month - 1 + offset, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
function getVisibleMonths() {
  return [0, 1, 2].map(offset => addMonths(state.baseMonth || todayBaseMonth, offset));
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
      month: monthKey,
      dueDate: item.day ? `${monthKey}-${String(item.day).padStart(2, '0')}` : '',
      status: 'previsto'
    }));
}
function entriesForMonth(monthKey) {
  return [...state.entries.filter(e => e.month === monthKey), ...fixedForMonth(monthKey)]
    .sort((a, b) => (a.dueDate || `${a.month}-99`).localeCompare(b.dueDate || `${b.month}-99`));
}
function calculateMonth(monthKey) {
  const entries = entriesForMonth(monthKey);
  const entradas = entries.filter(e => e.type === 'entrada').reduce((sum, e) => sum + Number(e.value), 0);
  const saidas = entries.filter(e => e.type === 'saida').reduce((sum, e) => sum + Number(e.value), 0);
  const pendente = entries.filter(e => e.type === 'saida' && e.status !== 'pago').reduce((sum, e) => sum + Number(e.value), 0);
  return { entries, entradas, saidas, pendente, result: entradas - saidas };
}
function calculateCurrentMonth() {
  const month = state.baseMonth || todayBaseMonth;
  const pending = entriesForMonth(month)
    .filter(e => e.type === 'saida' && e.status !== 'pago')
    .reduce((sum, e) => sum + Number(e.value), 0);
  return { pending, result: Number(state.currentBalance) - pending };
}

function categoryLabel(category) {
  return ({ apartamento: 'Apartamento', fixo: 'Fixo', cartao: 'Cartão', pessoas: 'Pessoas', emprestimo: 'Empréstimo', renda: 'Renda', outros: 'Outros' })[category] || category;
}
function statusLabel(status) {
  return ({ pago: 'Pago', pendente: 'Pendente', previsto: 'Previsto', especial: 'Especial' })[status] || status;
}
function categoryIcon(category) {
  return ({ apartamento: 'AP', fixo: 'FX', cartao: 'CT', pessoas: 'PS', emprestimo: 'EM', renda: 'RD', outros: '•' })[category] || '•';
}
function categoryColor(category) {
  return ({ apartamento: '#0f766e', fixo: '#4b5563', cartao: '#111827', pessoas: '#7c3aed', emprestimo: '#b45309', renda: '#1f7a45', outros: '#64748b' })[category] || '#64748b';
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

function render() {
  generateMonthOptions();
  document.getElementById('currentBalance').textContent = formatBRL(state.currentBalance);
  document.getElementById('currentMonthLabel').textContent = monthName(state.baseMonth || todayBaseMonth);
  document.getElementById('balanceInput').value = String(state.currentBalance).replace('.', ',');
  document.getElementById('entryMonth').value ||= state.baseMonth || todayBaseMonth;
  renderHealth();
  renderSummaryCards();
  renderUpcoming();
  renderMonths();
  renderChart();
}

function renderHealth() {
  const current = calculateCurrentMonth();
  const pill = document.getElementById('healthPill');
  const flowTotal = document.getElementById('monthFlowTotal');
  const flowCaption = document.getElementById('monthFlowCaption');
  if (current.result >= 0) {
    pill.textContent = `Sobra projetada: ${formatBRL(current.result)}`;
    flowCaption.textContent = 'saldo previsto';
  } else {
    pill.textContent = `Falta projetada: ${formatBRL(Math.abs(current.result))}`;
    flowCaption.textContent = 'falta prevista';
  }
  flowTotal.textContent = formatBRL(current.result);
}

function renderSummaryCards() {
  const container = document.getElementById('summaryCards');
  container.innerHTML = '';
  getVisibleMonths().forEach((month, index) => {
    const calc = calculateMonth(month);
    const result = index === 0 ? calculateCurrentMonth().result : calc.result;
    const card = document.createElement('div');
    card.className = `month-pill ${result >= 0 ? 'positive' : 'negative'}`;
    card.innerHTML = `
      <span>${monthName(month, false)}</span>
      <strong>${result >= 0 ? '🟩' : '🟥'} ${formatBRL(result)}</strong>
      <small>${index === 0 ? 'saldo atual - pendências' : `${formatBRL(calc.entradas)} entra • ${formatBRL(calc.saidas)} sai`}</small>
    `;
    container.appendChild(card);
  });
}

function renderUpcoming() {
  const list = document.getElementById('upcomingList');
  list.innerHTML = '';
  const visible = getVisibleMonths().flatMap(month => entriesForMonth(month).map(entry => ({ ...entry })));
  const entries = visible
    .filter(e => e.type === 'saida' && e.status !== 'pago')
    .sort((a, b) => (a.dueDate || `${a.month}-99`).localeCompare(b.dueDate || `${b.month}-99`))
    .slice(0, 5);

  if (!entries.length) {
    list.innerHTML = '<div class="empty-state">Sem pendências nos meses visíveis. Aproveita essa raridade kkkk</div>';
    return;
  }
  entries.forEach(entry => list.appendChild(renderTransaction(entry, false)));
}

function renderMonths() {
  const container = document.getElementById('monthsContainer');
  const template = document.getElementById('monthTemplate');
  container.innerHTML = '';
  getVisibleMonths().forEach((month, index) => {
    const calc = calculateMonth(month);
    const current = index === 0 ? calculateCurrentMonth() : null;
    const resultValue = current ? current.result : calc.result;
    const node = template.content.cloneNode(true);
    node.querySelector('h3').textContent = monthName(month);
    node.querySelector('p').textContent = index === 0
      ? `saldo ${formatBRL(state.currentBalance)} • pendente ${formatBRL(current.pending)}`
      : `entradas ${formatBRL(calc.entradas)} • saídas ${formatBRL(calc.saidas)}`;
    const result = node.querySelector('.month-result');
    result.textContent = `${resultValue >= 0 ? '🟩' : '🟥'} ${formatBRL(resultValue)}`;
    result.classList.add(resultValue >= 0 ? 'positive' : 'negative');

    const metrics = node.querySelector('.month-metrics');
    metrics.innerHTML = `
      <div class="metric-box"><span>Entradas</span><strong>${formatBRL(calc.entradas)}</strong></div>
      <div class="metric-box"><span>Saídas</span><strong>${formatBRL(calc.saidas)}</strong></div>
      <div class="metric-box"><span>Pendente</span><strong>${formatBRL(calc.pendente)}</strong></div>
    `;

    const list = node.querySelector('.transaction-list');
    if (!calc.entries.length) {
      list.innerHTML = '<div class="empty-state">Nenhum lançamento nesse mês.</div>';
    } else {
      calc.entries.forEach(entry => list.appendChild(renderTransaction(entry, true)));
    }
    container.appendChild(node);
  });
}

function renderTransaction(entry, allowDelete) {
  const template = document.getElementById('transactionTemplate');
  const node = template.content.cloneNode(true);
  const item = node.querySelector('.transaction-item');
  const avatar = node.querySelector('.transaction-avatar');
  const title = node.querySelector('.transaction-main strong');
  const sub = node.querySelector('.transaction-main span');
  const value = node.querySelector('.transaction-side strong');
  const side = node.querySelector('.transaction-side span');
  const deleteBtn = node.querySelector('.delete-chip');

  avatar.textContent = categoryIcon(entry.category);
  avatar.style.background = categoryColor(entry.category);
  title.textContent = entry.description;
  sub.textContent = `${categoryLabel(entry.category)} • ${statusLabel(entry.status)} • ${formatDate(entry.dueDate)}`;
  value.textContent = `${entry.type === 'entrada' ? '+' : '-'}${formatBRL(entry.value).replace('R$', 'R$ ')}`;
  value.classList.add(entry.type);
  side.textContent = monthName(entry.month, false);

  const canDelete = allowDelete && state.entries.some(e => e.id === entry.id);
  if (canDelete) deleteBtn.dataset.id = entry.id;
  else deleteBtn.hidden = true;

  if (entry.status === 'pago') item.style.opacity = '.72';
  return node;
}

function renderChart() {
  const chart = document.getElementById('trendChart');
  const months = getVisibleMonths();
  const values = months.map((month, index) => index === 0 ? calculateCurrentMonth().result : calculateMonth(month).result);
  const width = 320;
  const height = 140;
  const padding = 16;
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 0);
  const range = Math.max(max - min, 1);
  const points = values.map((value, index) => {
    const x = padding + ((width - padding * 2) / Math.max(values.length - 1, 1)) * index;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return { x, y, value };
  });

  const linePath = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  const gridLines = [0.25, 0.5, 0.75].map(r => {
    const y = padding + (height - padding * 2) * r;
    return `<line x1="${padding}" x2="${width - padding}" y1="${y}" y2="${y}" stroke="currentColor" stroke-opacity="0.08"/>`;
  }).join('');
  const labels = points.map((p, index) => `<text x="${p.x}" y="${height - 2}" font-size="11" text-anchor="middle" fill="currentColor" fill-opacity="0.55">${monthName(months[index], false).split('/')[0]}</text>`).join('');
  const dots = points.map(point => `<circle cx="${point.x}" cy="${point.y}" r="4.5" fill="var(--accent)" stroke="var(--surface-2)" stroke-width="3"></circle>`).join('');
  chart.innerHTML = `
    <defs>
      <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.28"></stop>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.02"></stop>
      </linearGradient>
    </defs>
    ${gridLines}
    <path d="${areaPath}" fill="url(#chartFill)"></path>
    <path d="${linePath}" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
    ${dots}
    ${labels}
  `;
}

function setTab(tab) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(`screen-${tab}`).classList.add('active');
  closeDrawer();
  closeFab();
  if (tab === 'add') document.getElementById('entryDescription').focus({ preventScroll: true });
}
function setEntryType(type) {
  selectedEntryType = type;
  document.querySelectorAll('[data-entry-type]').forEach(btn => btn.classList.toggle('selected', btn.dataset.entryType === type));
}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, theme === 'dark' ? 'dark' : 'light');
}
function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `financeiro-keven-backup-${new Date().toISOString().slice(0,10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}
function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data.entries)) throw new Error('Arquivo inválido');
      state = { ...structuredClone(initialState), ...data };
      saveState();
      render();
      alert('Backup importado com sucesso.');
    } catch {
      alert('Não consegui importar esse JSON.');
    }
  };
  reader.readAsText(file);
}

function openDrawer() {
  document.getElementById('sideDrawer').classList.add('open');
  document.getElementById('sideDrawer').setAttribute('aria-hidden', 'false');
}
function closeDrawer() {
  document.getElementById('sideDrawer').classList.remove('open');
  document.getElementById('sideDrawer').setAttribute('aria-hidden', 'true');
}
function toggleFab() {
  const isOpen = document.body.classList.toggle('fab-open');
  document.getElementById('fabTrigger').setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}
function closeFab() {
  document.body.classList.remove('fab-open');
  document.getElementById('fabTrigger').setAttribute('aria-expanded', 'false');
}

// events

document.addEventListener('click', event => {
  const tabTarget = event.target.closest('[data-tab]');
  if (tabTarget) {
    if (tabTarget.dataset.kind) setEntryType(tabTarget.dataset.kind);
    setTab(tabTarget.dataset.tab);
  }

  const preset = event.target.closest('[data-preset]');
  if (preset) document.getElementById('entryValue').value = preset.dataset.preset;

  const deleteBtn = event.target.closest('.delete-chip');
  if (deleteBtn?.dataset.id) {
    state.entries = state.entries.filter(entry => entry.id !== deleteBtn.dataset.id);
    saveState();
    render();
  }
});

document.querySelectorAll('[data-entry-type]').forEach(btn => {
  btn.addEventListener('click', () => setEntryType(btn.dataset.entryType));
});

document.getElementById('themeBtn').addEventListener('click', () => {
  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

document.getElementById('menuBtn').addEventListener('click', openDrawer);
document.getElementById('closeDrawerBtn').addEventListener('click', closeDrawer);
document.getElementById('sideDrawer').addEventListener('click', event => {
  if (event.target.id === 'sideDrawer') closeDrawer();
});

document.getElementById('fabTrigger').addEventListener('click', event => {
  event.stopPropagation();

  // Fechado: abre o menu.
  // Aberto: o próprio botão vira atalho rápido de SAÍDA.
  if (document.body.classList.contains('fab-open')) {
    setEntryType('saida');
    setTab('add');
    closeFab();
    return;
  }

  toggleFab();
});
document.getElementById('fabBackdrop').addEventListener('click', closeFab);
document.getElementById('globalOverlay').addEventListener('click', closeFab);

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
    category: document.getElementById('entryCategory').value,
    description: document.getElementById('entryDescription').value.trim(),
    value: parseMoney(document.getElementById('entryValue').value),
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
  if (!confirm('Resetar os dados locais e voltar pra base?')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(initialState);
  saveState();
  render();
  setTab('home');
});

render();
