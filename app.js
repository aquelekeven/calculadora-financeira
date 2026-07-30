const STORAGE_KEY = 'financeiro-keven-agenda-v1';
const THEME_KEY = 'financeiro-keven-theme';
const TODAY = new Date('2026-07-30T14:02:00-03:00');
const TODAY_MONTH = '2026-07';

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialState = {
  currentBalance: 186.48,
  baseMonth: '2026-07',
  filter: 'all',
  selectedContactId: '',
  contacts: [
    { id: 'sarah', name: 'Sarah', note: 'Contas combinadas/pagas para a Sarah' },
    { id: 'pacheco', name: 'Pacheco', note: 'Divisões e pagamentos para o Pacheco' },
    { id: 'julia', name: 'Julia', note: 'Contas e cartão com a Julia' }
  ],
  commitments: [
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Abril/2026', amount: 1425.57, dueDate: '2026-04-25', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Maio/2026 — Encargos CEF', amount: 1639.40, dueDate: '2026-05-20', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Maio/2026 — MR/Correção', amount: 1517.31, dueDate: '2026-05-25', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Junho/2026', amount: 1398.85, dueDate: '2026-06-25', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — DB Encargos CEF', amount: 1593.35, dueDate: '2026-07-06', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'emprestimo', description: 'Cheque especial CAIXA', amount: 1498.48, status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'cartao', description: 'Julia', amount: 1500, status: 'paid', contactId: 'julia' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'pessoas', description: 'Aliança', amount: 239.99, status: 'paid', contactId: 'sarah', installmentCurrent: 1, installmentTotal: 3, note: 'Parcela da aliança paga para a Sarah.' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'paid', contactId: 'sarah', installmentCurrent: 1, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'outros', description: 'Sarah — aniversário Ygor', amount: 50, status: 'paid', contactId: 'sarah' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'fixo', description: 'Claro — internet/celular', amount: 160, status: 'waiting' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'outros', description: 'Pacheco — almoço jogo do Brasil', amount: 75, contactId: 'pacheco', status: 'waiting' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'cartao', description: 'Nubank — cartão/assinaturas', amount: 219.56, status: 'paid' },

    { id: uid(), month: '2026-08', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2026-08', type: 'expense', category: 'pessoas', description: 'Aliança', amount: 239.99, status: 'waiting', contactId: 'sarah', installmentCurrent: 2, installmentTotal: 3, note: 'Parcela da aliança paga para a Sarah.' },
    { id: uid(), month: '2026-08', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 2, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
    { id: uid(), month: '2026-08', type: 'expense', category: 'cartao', description: 'Cartão com a Julia', amount: 1200, contactId: 'julia', status: 'waiting' },
    { id: uid(), month: '2026-08', type: 'expense', category: 'apartamento', description: 'Taxa R', amount: 221.16, dueDate: '2026-08-08', status: 'waiting' },
    { id: uid(), month: '2026-08', type: 'expense', category: 'apartamento', description: 'MR — mensalidade', amount: 1095.64, dueDate: '2026-08-25', status: 'waiting' },

    { id: uid(), month: '2026-09', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2026-09', type: 'expense', category: 'pessoas', description: 'Aliança', amount: 239.99, status: 'waiting', contactId: 'sarah', installmentCurrent: 3, installmentTotal: 3, note: 'Parcela da aliança paga para a Sarah.' },
    { id: uid(), month: '2026-09', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 3, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
    { id: uid(), month: '2026-09', type: 'expense', category: 'apartamento', description: 'MR — mensalidade', amount: 1095.64, dueDate: '2026-09-25', status: 'waiting' },
    { id: uid(), month: '2026-09', type: 'expense', category: 'apartamento', description: 'SR — anual', amount: 5600, dueDate: '2026-09-30', status: 'special', note: 'Época de PLR' },

    { id: uid(), month: '2026-10', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2026-10', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 4, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
    { id: uid(), month: '2026-10', type: 'expense', category: 'cartao', description: 'Cartão com a Julia', amount: 650, contactId: 'julia', status: 'waiting' },
    { id: uid(), month: '2026-10', type: 'expense', category: 'apartamento', description: 'MR — mensalidade', amount: 1095.64, dueDate: '2026-10-25', status: 'waiting' },
    { id: uid(), month: '2026-10', type: 'expense', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 1/24', amount: 799.55, status: 'waiting' },
{ id: uid(), month: '2026-11', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2026-11', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 5, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
    { id: uid(), month: '2026-12', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2026-12', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 6, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
    { id: uid(), month: '2027-01', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2027-01', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 7, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
    { id: uid(), month: '2027-02', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2027-02', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 8, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
    { id: uid(), month: '2027-03', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2027-03', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 9, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
    { id: uid(), month: '2027-04', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2027-04', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 10, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' }
  ],
  rules: [
    { id: uid(), type: 'income', category: 'renda', description: 'Salário', amount: 4000, startMonth: '2026-08', endMonth: '', day: null, active: true },
    { id: uid(), type: 'expense', category: 'fixo', description: 'Claro — internet/celular', amount: 160, startMonth: '2026-08', endMonth: '', day: null, active: true },
    { id: uid(), type: 'expense', category: 'fixo', description: 'Save Car — seguro Escort', amount: 115, startMonth: '2026-08', endMonth: '', day: null, active: true },
    { id: uid(), type: 'expense', category: 'fixo', description: 'YouTube Premium com Pacheco', amount: 50, startMonth: '2026-08', endMonth: '', day: null, active: true },
    { id: uid(), type: 'expense', category: 'emprestimo', description: 'Empréstimo Nubank consignado', amount: 799.55, startMonth: '2026-10', endMonth: '2028-09', day: null, active: true }
  ]
};

let state = loadState();
let modalType = 'expense';
let pendingUndo = null;
let undoTimer = null;
let activeDetailId = null;

init();

function init() {
  applyTheme(localStorage.getItem(THEME_KEY) || 'light');
  bindEvents();
  render();
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(initialState);

  try {
    const loaded = { ...structuredClone(initialState), ...JSON.parse(raw) };
    return migrateState(loaded);
  } catch {
    return structuredClone(initialState);
  }
}

function migrateState(loaded) {
  loaded.contacts = loaded.contacts?.length ? loaded.contacts : structuredClone(initialState.contacts);
  loaded.selectedContactId = loaded.selectedContactId || '';
  loaded.commitments = migrateSarahCommitments(loaded.commitments || []);
  return loaded;
}

function migrateSarahCommitments(commitments) {
  const hasSplit = commitments.some(item => item.contactId === 'sarah' && ['Aliança', 'Chalé'].includes(item.description));
  if (hasSplit) return commitments;

  const replacements = {
    '2026-07': [
      { month: '2026-07', status: 'paid', currentA: 1, currentC: 1 }
    ],
    '2026-08': [
      { month: '2026-08', status: 'waiting', currentA: 2, currentC: 2 }
    ],
    '2026-09': [
      { month: '2026-09', status: 'waiting', currentA: 3, currentC: 3 }
    ]
  };

  let result = commitments.filter(item => !/Sarah — parcelas|Sarah — parcela/.test(item.description || ''));

  Object.values(replacements).flat().forEach(row => {
    result.push({ id: uid(), month: row.month, type: 'expense', category: 'pessoas', description: 'Aliança', amount: 239.99, status: row.status, contactId: 'sarah', installmentCurrent: row.currentA, installmentTotal: 3, note: 'Parcela da aliança paga para a Sarah.' });
    result.push({ id: uid(), month: row.month, type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: row.status, contactId: 'sarah', installmentCurrent: row.currentC, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' });
  });

  for (let i = 4; i <= 10; i++) {
    const month = addMonths('2026-10', i - 4);
    result.push({ id: uid(), month, type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: i, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' });
  }

  return result.map(item => {
    if ((item.description || '').includes('Julia')) item.contactId = item.contactId || 'julia';
    if ((item.description || '').includes('Pacheco')) item.contactId = item.contactId || 'pacheco';
    if ((item.description || '').includes('Sarah')) item.contactId = item.contactId || 'sarah';
    return item;
  });
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function parseMoney(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return value;
  const normalized = String(value).replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function money(value) {
  if (value === null || value === undefined) return 'sem valor';
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function monthName(monthKey, long = true) {
  const [year, month] = monthKey.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString('pt-BR', long ? { month: 'long', year: 'numeric' } : { month: 'short', year: '2-digit' });
}

function addMonths(monthKey, offset) {
  const [year, month] = monthKey.split('-').map(Number);
  const d = new Date(year, month - 1 + offset, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function dateLabel(date) {
  if (!date) return 'sem vencimento';
  const [y, m, d] = date.split('-');
  return `${d}/${m}/${y}`;
}

function statusLabel(status) {
  return { waiting: 'Aguardando', paid: 'Pago', unpaid: 'Não pago', estimated: 'Previsto', special: 'Especial', waiting_value: 'Aguardando valor' }[status] || status;
}

function statusIcon(status) {
  return { waiting: '•', paid: '✓', unpaid: '!', estimated: '~', special: '*', waiting_value: '?' }[status] || '•';
}

function catLabel(cat) {
  return { apartamento: 'Apartamento', fixo: 'Fixo', pessoas: 'Pessoas', cartao: 'Cartão', emprestimo: 'Empréstimo', renda: 'Renda', outros: 'Outros' }[cat] || cat;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function contactById(id) {
  return state.contacts?.find(contact => contact.id === id) || null;
}

function contactName(id) {
  return contactById(id)?.name || '';
}

function initials(name) {
  return String(name || '?').trim().split(/\s+/).slice(0,2).map(p => p[0]?.toUpperCase()).join('') || '?';
}

function normalizeCommitment(item) {
  return {
    installmentCurrent: null,
    installmentTotal: null,
    note: '',
    ...item
  };
}

function commitmentsForMonth(month) {
  return state.commitments
    .map(normalizeCommitment)
    .filter(item => item.month === month)
    .sort((a, b) => (a.dueDate || `${a.month}-99`).localeCompare(b.dueDate || `${b.month}-99`));
}

function calcMonth(month) {
  const items = commitmentsForMonth(month);
  const income = items.filter(i => i.type === 'income').reduce((s, i) => s + (Number(i.amount) || 0), 0);
  const expenses = items.filter(i => i.type === 'expense').reduce((s, i) => s + (Number(i.amount) || 0), 0);
  const pending = items.filter(i => i.type === 'expense' && !['paid'].includes(i.status)).reduce((s, i) => s + (Number(i.amount) || 0), 0);
  const paid = items.filter(i => i.status === 'paid').reduce((s, i) => s + (Number(i.amount) || 0), 0);
  return { items, income, expenses, pending, paid, result: income - expenses };
}

function currentProjection() {
  const { pending } = calcMonth(state.baseMonth);
  return Number(state.currentBalance || 0) - pending;
}

function isLate(item) {
  if (!item.dueDate || item.status === 'paid' || item.type === 'income') return false;
  const due = new Date(`${item.dueDate}T23:59:59-03:00`);
  return due < TODAY;
}

function bindEvents() {
  document.addEventListener('click', handleGlobalClick, true);

  $('#commitmentForm')?.addEventListener('submit', saveCommitment);
  $('#fixedForm')?.addEventListener('submit', saveFixedRule);
  $('#contactForm')?.addEventListener('submit', saveContact);

  $$('#statusTabs [data-filter]').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      state.filter = btn.dataset.filter;
      renderAgenda();
      $$('#statusTabs [data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === state.filter));
    });
  });

  $$('[data-modal-type]').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setModalType(btn.dataset.modalType);
    });
  });

  $$('[data-scenario-preset]').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      $('#scenarioValue').value = btn.dataset.scenarioPreset;
      renderScenario();
    });
  });

  $('#scenarioValue')?.addEventListener('input', renderScenario);

  $('#importInput')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) importBackup(file);
    e.target.value = '';
  });
}

function handleGlobalClick(event) {
  const target = event.target;

  const navButton = target.closest?.('[data-nav]');
  if (navButton) {
    event.preventDefault();
    event.stopPropagation();
    setScreen(navButton.dataset.nav);
    return;
  }

  const createButton = target.closest?.('[data-open-create]');
  if (createButton) {
    event.preventDefault();
    event.stopPropagation();
    openCommitmentModal(createButton.dataset.openCreate);
    return;
  }

  const fixedButton = target.closest?.('[data-open-fixed]');
  if (fixedButton) {
    event.preventDefault();
    event.stopPropagation();
    openFixedModal();
    return;
  }

  if (target.closest?.('#menuBtn')) {
    event.preventDefault();
    event.stopPropagation();
    openDrawer();
    return;
  }

  if (target.closest?.('#closeDrawerBtn') || target.id === 'drawerBackdrop') {
    event.preventDefault();
    event.stopPropagation();
    closeDrawer();
    return;
  }

  if (target.closest?.('#themeBtn')) {
    event.preventDefault();
    event.stopPropagation();
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    return;
  }

  if (target.closest?.('#prevMonthBtn')) {
    event.preventDefault();
    event.stopPropagation();
    changeMonth(-1);
    return;
  }

  if (target.closest?.('#nextMonthBtn')) {
    event.preventDefault();
    event.stopPropagation();
    changeMonth(1);
    return;
  }

  if (target.closest?.('#currentMonthBtn')) {
    event.preventDefault();
    event.stopPropagation();
    selectMonth(TODAY_MONTH);
    return;
  }

  if (target.closest?.('#monthSelectorTrigger')) {
    event.preventDefault();
    event.stopPropagation();
    toggleMonthSelector();
    return;
  }

  if (target.closest?.('#closeModalBtn') || target.id === 'commitmentModal') {
    event.preventDefault();
    event.stopPropagation();
    closeCommitmentModal();
    return;
  }

  if (target.closest?.('#closeFixedModalBtn') || target.id === 'fixedModal') {
    event.preventDefault();
    event.stopPropagation();
    closeFixedModal();
    return;
  }

  if (target.closest?.('#addContactBtn')) {
    event.preventDefault();
    event.stopPropagation();
    openContactModal();
    return;
  }

  if (target.closest?.('#closeContactModalBtn') || target.id === 'contactModal') {
    event.preventDefault();
    event.stopPropagation();
    closeContactModal();
    return;
  }

  if (target.closest?.('#undoBtn')) {
    event.preventDefault();
    event.stopPropagation();
    undoLastAction();
    return;
  }

  if (target.closest?.('#detailCloseBtn') || target.id === 'detailModal') {
    event.preventDefault();
    event.stopPropagation();
    closeDetailModal();
    return;
  }

  if (target.closest?.('#detailEditBtn')) {
    event.preventDefault();
    event.stopPropagation();
    if (!activeDetailId) return;
    const id = activeDetailId;
    closeDetailModal();
    openCommitmentModal('edit', id);
    return;
  }

  if (target.closest?.('#detailDeleteBtn')) {
    event.preventDefault();
    event.stopPropagation();
    if (!activeDetailId) return;
    const id = activeDetailId;
    closeDetailModal();
    deleteCommitment(id);
    return;
  }

  if (target.closest?.('#detailStatusBtn')) {
    event.preventDefault();
    event.stopPropagation();
    if (!activeDetailId) return;
    cycleStatus(activeDetailId);
    const refreshed = state.commitments.find(i => i.id === activeDetailId);
    if (refreshed) fillDetailModal(refreshed);
    return;
  }

  if (target.closest?.('#resetBtn')) {
    event.preventDefault();
    event.stopPropagation();
    if (!confirm('Resetar todos os dados locais?')) return;
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(initialState);
    saveState();
    renderWithContentTransition();
    return;
  }

  if (target.closest?.('#saveBalanceBtn')) {
    event.preventDefault();
    event.stopPropagation();
    state.currentBalance = parseMoney($('#balanceInput')?.value) || 0;
    saveState();
    renderWithContentTransition();
    setScreen('home');
    return;
  }

  if (target.closest?.('#exportBtn')) {
    event.preventDefault();
    event.stopPropagation();
    exportBackup();
    return;
  }
}

function setScreen(name) {
  const target = $(`#screen-${name}`);
  if (!target) return;

  $$('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.opacity = '';
    s.style.transform = '';
    s.style.transition = '';
  });

  target.classList.add('active');
  target.classList.add('content-transition');
  setTimeout(() => target.classList.remove('content-transition'), 260);

  $$('.bottom-nav [data-nav]').forEach(btn => btn.classList.toggle('active', btn.dataset.nav === name));
  closeDrawer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDrawer() {
  $('#sideDrawer').classList.add('open');
  $('#sideDrawer').setAttribute('aria-hidden', 'false');
  $('#drawerBackdrop').classList.add('show');
}

function closeDrawer() {
  $('#sideDrawer').classList.remove('open');
  $('#sideDrawer').setAttribute('aria-hidden', 'true');
  $('#drawerBackdrop').classList.remove('show');
}

function changeMonth(offset) {
  const month = addMonths(state.baseMonth, offset);
  selectMonth(month);
}

function render() {
  renderMonthRail();
  $('#currentBalance').textContent = money(state.currentBalance);
  $('#balanceInput').value = String(state.currentBalance).replace('.', ',');

  renderHome();
  renderAgenda();
  renderContacts();
  renderFixed();
  renderApartment();
  renderScenario();
  populateContactSelect();
}

function renderMonthRail() {
  $('#monthRailCurrent').textContent = monthName(state.baseMonth);
  const currentBtn = $('#currentMonthBtn');
  if (currentBtn) currentBtn.textContent = state.baseMonth === TODAY_MONTH ? 'Você já está no mês atual' : 'Voltar para o mês atual';

  const pills = $('#monthPills');
  pills.innerHTML = '';

  for (let i = -6; i <= 6; i++) {
    const month = addMonths(state.baseMonth, i);
    const date = new Date(month + '-01T00:00:00');
    const monthNum = String(date.getMonth() + 1).padStart(2, '0');
    const yearShort = String(date.getFullYear()).slice(-2);
    const monthShort = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    const monthLong = date.toLocaleDateString('pt-BR', { month: 'long' });

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `month-pill${month === state.baseMonth ? ' active' : ''}`;
    button.dataset.month = month;
    button.innerHTML = `
      <div class="month-pill-top">
        <strong>${monthNum}</strong>
        <small>${date.getFullYear()}</small>
      </div>
      <div class="month-pill-bottom">
        <strong>${monthLong}</strong>
      </div>
    `;
    button.addEventListener('click', () => selectMonth(month, button));
    pills.appendChild(button);
  }

  requestAnimationFrame(centerActiveMonth);
}


function selectMonth(month, button) {
  if (month === state.baseMonth) {
    centerActiveMonth();
    return;
  }

  button?.classList.add('selecting');

  const activeScreen = document.querySelector('.screen.active');
  if (activeScreen) {
    activeScreen.style.opacity = '0';
    activeScreen.style.transform = 'translateY(8px)';
    activeScreen.style.transition = 'opacity .16s ease, transform .16s ease';
  }

  setTimeout(() => {
    state.baseMonth = month;
    saveState();

    render();

    const pills = $('#monthPills');
    pills?.classList.remove('sliding');
    void pills?.offsetWidth;
    pills?.classList.add('sliding');

    requestAnimationFrame(() => {
      centerActiveMonth();

      const currentScreen = document.querySelector('.screen.active');
      if (currentScreen) {
        currentScreen.style.transition = 'none';
        currentScreen.style.opacity = '0';
        currentScreen.style.transform = 'translateY(8px)';

        requestAnimationFrame(() => {
          currentScreen.style.transition = 'opacity .22s ease, transform .22s ease';
          currentScreen.style.opacity = '1';
          currentScreen.style.transform = 'translateY(0)';
        });
      }
    });
  }, 150);
}

function toggleMonthSelector() {
  const card = $('#monthSelectorCard');
  const isOpen = card.classList.toggle('open');
  $('#monthSelectorTrigger').setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  $('#monthSelectorPanel').setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  if (isOpen) requestAnimationFrame(centerActiveMonth);
}

function closeMonthSelector() {
  $('#monthSelectorCard').classList.remove('open');
  $('#monthSelectorTrigger').setAttribute('aria-expanded', 'false');
  $('#monthSelectorPanel').setAttribute('aria-hidden', 'true');
}

function centerActiveMonth() {
  const pills = $('#monthPills');
  const active = pills?.querySelector('.month-pill.active');
  if (!pills || !active) return;

  const left = active.offsetLeft - (pills.clientWidth / 2) + (active.clientWidth / 2);
  pills.scrollTo({ left, behavior: 'smooth' });
}

function renderWithContentTransition() {
  const activeScreen = document.querySelector('.screen.active');
  if (!activeScreen) {
    render();
    return;
  }

  activeScreen.style.opacity = '0';
  activeScreen.style.transform = 'translateY(8px)';
  activeScreen.style.transition = 'opacity .16s ease, transform .16s ease';

  setTimeout(() => {
    render();
    activeScreen.style.opacity = '1';
    activeScreen.style.transform = 'translateY(0)';
  }, 160);
}

function renderHome() {
  const calc = calcMonth(state.baseMonth);
  const projection = currentProjection();

  $('#pendingTotal').textContent = money(calc.pending);
  $('#projectedResult').textContent = money(projection);
  $('#resultCard').classList.toggle('positive', projection >= 0);
  $('#resultCard').classList.toggle('negative', projection < 0);

  const late = calc.items.filter(isLate);
  $('#lateCount').textContent = late.length;
  renderList($('#lateList'), late);

  const current = calc.items.filter(i => i.type === 'expense' && i.status !== 'paid' && !isLate(i));
  $('#currentListTotal').textContent = `Total: ${money(current.reduce((sum, item) => sum + (Number(item.amount) || 0), 0))}`;
  renderList($('#currentList'), current);

  const future = $('#futureMonths');
  future.innerHTML = '';
  [1, 2].map(i => addMonths(state.baseMonth, i)).forEach(month => {
    const c = calcMonth(month);
    const card = document.createElement('article');
    card.className = 'future-card';
    card.innerHTML = `
      <div>
        <span>${monthName(month)}</span>
        <strong>${money(c.pending)} pendente</strong>
        <small>${money(c.income)} entra • ${money(c.expenses)} sai</small>
      </div>
      <div>
        <span>resultado</span>
        <strong>${money(c.result)}</strong>
      </div>
    `;
    future.appendChild(card);
  });
}

function renderAgenda() {
  const calc = calcMonth(state.baseMonth);
  $('#agendaSummary').innerHTML = `
    <div><span>Entradas</span><strong>${money(calc.income)}</strong></div>
    <div><span>Saídas</span><strong>${money(calc.expenses)}</strong></div>
    <div><span>Pendente</span><strong>${money(calc.pending)}</strong></div>
  `;

  let items = [...calc.items];
  if (state.filter !== 'all') items = items.filter(i => i.status === state.filter);

  renderList($('#agendaList'), items);
  $$('#statusTabs [data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === state.filter));
}


function populateContactSelect() {
  const select = $('#commitmentContact');
  if (!select) return;

  const current = select.value;
  select.innerHTML = '<option value="">Sem contato</option>';
  (state.contacts || []).forEach(contact => {
    const option = document.createElement('option');
    option.value = contact.id;
    option.textContent = contact.name;
    select.appendChild(option);
  });
  if ([...select.options].some(option => option.value === current)) select.value = current;
}

function renderContacts() {
  const grid = $('#contactsGrid');
  const list = $('#contactHistoryList');
  const card = $('#contactHistoryCard');
  if (!grid || !list || !card) return;

  grid.innerHTML = '';

  const contacts = state.contacts || [];
  if (!contacts.length) {
    grid.innerHTML = '<div class="empty-state">Nenhum contato cadastrado ainda.</div>';
    card.classList.add('is-hidden');
    return;
  }

  contacts.forEach(contact => {
    const related = state.commitments.filter(item => item.contactId === contact.id);
    const paid = related.filter(item => item.status === 'paid').reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const pending = related.filter(item => item.status !== 'paid').reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `contact-card${contact.id === state.selectedContactId ? ' active' : ''}`;
    button.innerHTML = `
      <div class="contact-avatar">${escapeHtml(initials(contact.name))}</div>
      <div>
        <strong>${escapeHtml(contact.name)}</strong>
        <span>${related.length} conta(s) • ${money(pending)} pendente</span>
      </div>
      <small>${money(paid)}<br/>pago</small>
    `;
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      state.selectedContactId = contact.id;
      saveState();
      renderContacts();
    });
    grid.appendChild(button);
  });

  if (!state.selectedContactId) {
    card.classList.add('is-hidden');
    list.innerHTML = '';
    return;
  }

  const selected = contactById(state.selectedContactId);
  if (!selected) {
    card.classList.add('is-hidden');
    return;
  }

  card.classList.remove('is-hidden');
  $('#contactHistoryTitle').textContent = selected.name;

  const history = state.commitments
    .filter(item => item.contactId === state.selectedContactId)
    .sort((a, b) => (a.month || '').localeCompare(b.month || '') || (a.dueDate || '99').localeCompare(b.dueDate || '99'));

  renderList(list, history);
}

function openContactModal() {
  $('#contactForm').reset();
  $('#contactModal').classList.add('open');
  $('#contactModal').setAttribute('aria-hidden', 'false');
}

function closeContactModal() {
  $('#contactModal').classList.remove('open');
  $('#contactModal').setAttribute('aria-hidden', 'true');
}

function saveContact(event) {
  event.preventDefault();
  const name = $('#contactName').value.trim();
  if (!name) return;

  const id = name.toLowerCase()
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || uid();

  const uniqueId = state.contacts.some(c => c.id === id) ? `${id}-${Date.now()}` : id;

  state.contacts.push({
    id: uniqueId,
    name,
    note: $('#contactNote').value.trim()
  });
  state.selectedContactId = uniqueId;
  saveState();
  closeContactModal();
  render();
  setScreen('contacts');
}

function renderFixed() {
  const list = $('#fixedList');
  list.innerHTML = '';

  if (!state.rules.length) {
    list.innerHTML = '<div class="empty-state">Nenhum fixo cadastrado ainda.</div>';
    return;
  }

  state.rules.forEach(rule => {
    const item = document.createElement('article');
    item.className = 'rule-item';
    item.innerHTML = `
      <div>
        <strong>${rule.description}</strong>
        <span>${catLabel(rule.category)} • ${rule.type === 'income' ? 'Entrada' : 'Saída'}</span>
        <small>${rule.startMonth || 'sem início'} até ${rule.endMonth || 'sem fim'}</small>
      </div>
      <strong>${money(rule.amount)}</strong>
    `;
    list.appendChild(item);
  });
}

function renderApartment() {
  const items = commitmentsForMonth(state.baseMonth).filter(i => i.category === 'apartamento');
  const mr = items.find(i => i.description.toLowerCase().includes('mr'));
  const sr = items.find(i => i.description.toLowerCase().includes('sr'));
  const caixa = items.find(i => i.description.toLowerCase().includes('caixa') || i.description.toLowerCase().includes('evolução'));

  $('#aptMR').textContent = mr ? money(mr.amount) : 'não lançado';
  $('#aptSR').textContent = sr ? money(sr.amount) : 'não lançado';
  $('#aptCaixa').textContent = caixa ? money(caixa.amount) : 'aguardando';

  renderList($('#apartmentList'), items);
}

function renderScenario() {
  const extra = parseMoney($('#scenarioValue').value) || 0;
  const base = currentProjection();
  const simulated = base + extra;
  $('#scenarioResult').innerHTML = `
    <span>Resultado atual do mês</span>
    <strong>${money(base)}</strong>
    <span>Com entrada extra de ${money(extra)}</span>
    <strong>${simulated >= 0 ? '🟩' : '🟥'} ${money(simulated)}</strong>
  `;
}

function renderList(container, items) {
  container.innerHTML = '';
  if (!items.length) {
    container.innerHTML = '<div class="empty-state">Nada por aqui.</div>';
    return;
  }
  items.forEach(item => container.appendChild(renderCommitment(item)));
}

function installmentLabel(item) {
  const current = Number(item.installmentCurrent);
  const total = Number(item.installmentTotal);
  if (current && total) return `${current}/${total}`;
  return '';
}

function renderCommitment(item) {
  const node = $('#commitmentTemplate').content.cloneNode(true);
  const article = node.querySelector('.commitment-item');
  const dot = node.querySelector('.status-dot');
  const title = node.querySelector('.commitment-main strong');
  const sub = node.querySelector('.commitment-main span');
  const value = node.querySelector('.commitment-value strong');
  const status = node.querySelector('.commitment-value span');

  article.classList.add(`status-${item.status}`);
  dot.textContent = statusIcon(item.status);
  dot.title = 'Clique para alternar status';

  const parcel = installmentLabel(item);
  title.innerHTML = `${escapeHtml(item.description)}${parcel ? ` <small>parcela ${parcel}</small>` : ''}`;
  sub.innerHTML = `${escapeHtml(catLabel(item.category))}${item.contactId ? ` <span class="contact-badge">${escapeHtml(contactName(item.contactId))}</span>` : ''}`;
  value.textContent = item.type === 'income' ? `+${money(item.amount)}` : money(item.amount);
  status.textContent = statusLabel(item.status);

  dot.addEventListener('click', (e) => {
    e.stopPropagation();
    cycleStatus(item.id);
  });

  article.addEventListener('click', () => openDetailModal(item.id));

  return node;
}

function cycleStatus(id) {
  const item = state.commitments.find(i => i.id === id);
  if (!item) return;

  const previous = { ...item };
  const cycle = ['waiting', 'paid', 'unpaid'];
  const currentIndex = cycle.indexOf(item.status);
  item.status = cycle[(currentIndex + 1) % cycle.length] || 'waiting';

  saveState();
  render();
  if (activeDetailId === id) {
    const refreshed = state.commitments.find(i => i.id === id);
    if (refreshed) fillDetailModal(refreshed);
  }
  showUndo(`Status alterado: ${item.description}`, () => {
    Object.assign(item, previous);
    saveState();
    render();
  });
}

function openCommitmentModal(mode = 'bill', id = '') {
  $('#commitmentForm').reset();
  $('#commitmentId').value = '';
  $('#commitmentInstallmentCurrent').value = '';
  $('#commitmentInstallmentTotal').value = '';

  let type = 'expense';
  let title = 'Adicionar conta';

  if (mode === 'income') {
    type = 'income';
    title = 'Adicionar entrada';
    $('#commitmentCategory').value = 'renda';
  } else if (mode === 'apartment') {
    type = 'expense';
    title = 'Adicionar item do apartamento';
    $('#commitmentCategory').value = 'apartamento';
  }

  if (mode === 'edit') {
    const item = state.commitments.find(i => i.id === id);
    if (!item) return;
    title = 'Editar compromisso';
    type = item.type;
    $('#commitmentId').value = item.id;
    $('#commitmentDescription').value = item.description;
    $('#commitmentAmount').value = item.amount ?? '';
    $('#commitmentMonth').value = item.month;
    $('#commitmentDue').value = item.dueDate || '';
    $('#commitmentCategory').value = item.category;
    $('#commitmentStatus').value = item.status;
    $('#commitmentContact').value = item.contactId || '';
    $('#commitmentNote').value = item.note || '';
    $('#commitmentInstallmentCurrent').value = item.installmentCurrent || '';
    $('#commitmentInstallmentTotal').value = item.installmentTotal || '';
  } else {
    $('#commitmentMonth').value = state.baseMonth;
    $('#commitmentStatus').value = type === 'income' ? 'estimated' : 'waiting';
    $('#commitmentContact').value = '';
  }

  setModalType(type);
  $('#modalTitle').textContent = title;
  $('#commitmentModal').classList.add('open');
  $('#commitmentModal').setAttribute('aria-hidden', 'false');
}

function closeCommitmentModal() {
  $('#commitmentModal').classList.remove('open');
  $('#commitmentModal').setAttribute('aria-hidden', 'true');
}

function setModalType(type) {
  modalType = type;
  $$('[data-modal-type]').forEach(btn => btn.classList.toggle('selected', btn.dataset.modalType === type));
}

function saveCommitment(event) {
  event.preventDefault();

  const id = $('#commitmentId').value;
  const installmentCurrent = Number($('#commitmentInstallmentCurrent').value) || null;
  const installmentTotal = Number($('#commitmentInstallmentTotal').value) || null;

  const data = {
    id: id || uid(),
    month: $('#commitmentMonth').value,
    type: modalType,
    category: $('#commitmentCategory').value,
    description: $('#commitmentDescription').value.trim(),
    amount: parseMoney($('#commitmentAmount').value),
    dueDate: $('#commitmentDue').value,
    status: $('#commitmentStatus').value,
    note: $('#commitmentNote').value.trim(),
    contactId: $('#commitmentContact').value || '',
    installmentCurrent,
    installmentTotal
  };

  if (id) {
    const index = state.commitments.findIndex(i => i.id === id);
    if (index >= 0) state.commitments[index] = data;
  } else {
    state.commitments.push(data);
  }

  saveState();
  closeCommitmentModal();
  render();
  if (activeDetailId) {
    const refreshed = state.commitments.find(i => i.id === activeDetailId);
    if (refreshed) fillDetailModal(refreshed);
  }
}


function openDetailModal(id) {
  const item = state.commitments.find(i => i.id === id);
  if (!item) return;
  activeDetailId = id;
  fillDetailModal(item);
  $('#detailModal').classList.add('open');
  $('#detailModal').setAttribute('aria-hidden', 'false');
}

function fillDetailModal(item) {
  const panel = $('#detailModal .modal-panel');
  panel?.classList.toggle('detail-expense', item.type === 'expense');
  panel?.classList.toggle('detail-income', item.type === 'income');

  $('#detailTitle').textContent = item.description || 'Conta';
  $('#detailAmount').textContent = item.type === 'income' ? `+${money(item.amount)}` : money(item.amount);
  $('#detailStatusText').textContent = statusLabel(item.status);
  $('#detailCategory').textContent = item.contactId ? `${catLabel(item.category)} • ${contactName(item.contactId)}` : catLabel(item.category);
  $('#detailDueDate').textContent = dateLabel(item.dueDate);
  $('#detailInstallment').textContent = installmentLabel(item) ? `Parcela ${installmentLabel(item)}` : 'Não parcelado';
  $('#detailMonth').textContent = monthName(item.month);
  $('#detailDescription').textContent = item.note?.trim() ? item.note : 'Sem descrição adicional.';

  const dot = $('#detailStatusBtn');
  dot.textContent = statusIcon(item.status);
  dot.className = `status-dot large status-${item.status}`;
}

function closeDetailModal() {
  $('#detailModal').classList.remove('open');
  $('#detailModal').setAttribute('aria-hidden', 'true');
  activeDetailId = null;
}

function deleteCommitment(id) {
  const item = state.commitments.find(i => i.id === id);
  if (!item) return;
  if (!confirm(`Excluir "${item.description}"?`)) return;

  state.commitments = state.commitments.filter(i => i.id !== id);
  if (activeDetailId === id) closeDetailModal();
  saveState();
  render();

  showUndo(`Excluído: ${item.description}`, () => {
    state.commitments.push(item);
    saveState();
    render();
  });
}

function openFixedModal() {
  $('#fixedForm').reset();
  $('#fixedStart').value = state.baseMonth;
  $('#fixedModal').classList.add('open');
  $('#fixedModal').setAttribute('aria-hidden', 'false');
}

function closeFixedModal() {
  $('#fixedModal').classList.remove('open');
  $('#fixedModal').setAttribute('aria-hidden', 'true');
}

function saveFixedRule(event) {
  event.preventDefault();

  state.rules.push({
    id: uid(),
    type: 'expense',
    category: $('#fixedCategory').value,
    description: $('#fixedDescription').value.trim(),
    amount: parseMoney($('#fixedAmount').value) || 0,
    day: Number($('#fixedDay').value) || null,
    startMonth: $('#fixedStart').value || state.baseMonth,
    endMonth: $('#fixedEnd').value,
    active: true
  });

  saveState();
  closeFixedModal();
  render();
}

function showUndo(text, action) {
  if (undoTimer) clearTimeout(undoTimer);
  pendingUndo = action;

  $('#undoText').textContent = text;
  $('#undoToast').hidden = false;
  requestAnimationFrame(() => $('#undoToast').classList.add('show'));

  undoTimer = setTimeout(() => {
    $('#undoToast').classList.remove('show');
    pendingUndo = null;
    setTimeout(() => {
      if (!$('#undoToast').classList.contains('show')) $('#undoToast').hidden = true;
    }, 220);
  }, 10000);
}

function undoLastAction() {
  if (!pendingUndo) return;
  pendingUndo();
  pendingUndo = null;
  if (undoTimer) clearTimeout(undoTimer);
  $('#undoToast').classList.remove('show');
  setTimeout(() => $('#undoToast').hidden = true, 220);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, theme === 'dark' ? 'dark' : 'light');
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `agenda-financeira-keven-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data.commitments)) throw new Error('JSON inválido');
      state = { ...structuredClone(initialState), ...data };
      saveState();
      render();
      alert('Backup importado com sucesso.');
    } catch {
      alert('Não consegui importar esse arquivo.');
    }
  };
  reader.readAsText(file);
}
