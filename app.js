const STORAGE_KEY = 'financeiro-keven-agenda-v1';
const THEME_KEY = 'financeiro-keven-theme';
const TODAY_MONTH = '2026-07';
const TODAY = new Date('2026-07-30T15:39:00-03:00');

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const baseContacts = [
  { id: 'sarah', name: 'Sarah', note: 'Contas combinadas/pagas para a Sarah' },
  { id: 'pacheco', name: 'Pacheco', note: 'Divisões e pagamentos para o Pacheco' },
  { id: 'julia', name: 'Julia', note: 'Contas e cartão com a Julia' }
];

const baseCommitments = [
  { month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Abril/2026', amount: 1425.57, dueDate: '2026-04-25', status: 'paid' },
  { month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Maio/2026 — Encargos CEF', amount: 1639.40, dueDate: '2026-05-20', status: 'paid' },
  { month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Maio/2026 — MR/Correção', amount: 1517.31, dueDate: '2026-05-25', status: 'paid' },
  { month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Junho/2026', amount: 1398.85, dueDate: '2026-06-25', status: 'paid' },
  { month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — DB Encargos CEF', amount: 1593.35, dueDate: '2026-07-06', status: 'paid' },
  { month: '2026-07', type: 'expense', category: 'emprestimo', description: 'Cheque especial CAIXA', amount: 1498.48, status: 'paid' },
  { month: '2026-07', type: 'expense', category: 'cartao', description: 'Julia', amount: 1500, status: 'paid', contactId: 'julia' },
  { month: '2026-07', type: 'expense', category: 'pessoas', description: 'Aliança', amount: 239.99, status: 'paid', contactId: 'sarah', installmentCurrent: 1, installmentTotal: 3, note: 'Parcela da aliança paga para a Sarah.' },
  { month: '2026-07', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'paid', contactId: 'sarah', installmentCurrent: 1, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
  { month: '2026-07', type: 'expense', category: 'outros', description: 'Sarah — aniversário Ygor', amount: 50, status: 'paid', contactId: 'sarah' },
  { month: '2026-07', type: 'expense', category: 'fixo', description: 'Claro — internet/celular', amount: 160, status: 'waiting' },
  { month: '2026-07', type: 'expense', category: 'outros', description: 'Pacheco — almoço jogo do Brasil', amount: 75, status: 'waiting', contactId: 'pacheco' },
  { month: '2026-07', type: 'expense', category: 'cartao', description: 'Nubank — cartão/assinaturas', amount: 219.56, status: 'paid' },

  { month: '2026-08', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
  { month: '2026-08', type: 'expense', category: 'pessoas', description: 'Aliança', amount: 239.99, status: 'waiting', contactId: 'sarah', installmentCurrent: 2, installmentTotal: 3, note: 'Parcela da aliança paga para a Sarah.' },
  { month: '2026-08', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 2, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
  { month: '2026-08', type: 'expense', category: 'cartao', description: 'Cartão com a Julia', amount: 1200, status: 'waiting', contactId: 'julia' },
  { month: '2026-08', type: 'expense', category: 'apartamento', description: 'Taxa R', amount: 221.16, dueDate: '2026-08-08', status: 'waiting' },
  { month: '2026-08', type: 'expense', category: 'apartamento', description: 'MR — mensalidade', amount: 1095.64, dueDate: '2026-08-25', status: 'waiting' },

  { month: '2026-09', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
  { month: '2026-09', type: 'expense', category: 'pessoas', description: 'Aliança', amount: 239.99, status: 'waiting', contactId: 'sarah', installmentCurrent: 3, installmentTotal: 3, note: 'Parcela da aliança paga para a Sarah.' },
  { month: '2026-09', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 3, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
  { month: '2026-09', type: 'expense', category: 'apartamento', description: 'MR — mensalidade', amount: 1095.64, dueDate: '2026-09-25', status: 'waiting' },
  { month: '2026-09', type: 'expense', category: 'apartamento', description: 'SR — anual', amount: 5600, dueDate: '2026-09-30', status: 'special', note: 'Época de PLR' },

  { month: '2026-10', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
  { month: '2026-10', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 4, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
  { month: '2026-10', type: 'expense', category: 'cartao', description: 'Cartão com a Julia', amount: 650, status: 'waiting', contactId: 'julia' },
  { month: '2026-10', type: 'expense', category: 'apartamento', description: 'MR — mensalidade', amount: 1095.64, dueDate: '2026-10-25', status: 'waiting' },
  { month: '2026-10', type: 'expense', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 1/24', amount: 799.55, status: 'waiting' },

  { month: '2026-11', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
  { month: '2026-11', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 5, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
  { month: '2026-11', type: 'expense', category: 'cartao', description: 'Cartão com a Julia', amount: 650, status: 'waiting', contactId: 'julia' },

  { month: '2026-12', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
  { month: '2026-12', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 6, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },
  { month: '2026-12', type: 'expense', category: 'cartao', description: 'Cartão com a Julia', amount: 500, status: 'waiting', contactId: 'julia' },

  { month: '2027-01', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
  { month: '2027-01', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 7, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },

  { month: '2027-02', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
  { month: '2027-02', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 8, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },

  { month: '2027-03', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
  { month: '2027-03', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 9, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' },

  { month: '2027-04', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
  { month: '2027-04', type: 'expense', category: 'pessoas', description: 'Chalé', amount: 223.21, status: 'waiting', contactId: 'sarah', installmentCurrent: 10, installmentTotal: 10, note: 'Parcela do chalé paga para a Sarah.' }
].map(item => ({ id: uid(), ...item }));

const baseRules = [
  { id: uid(), type: 'income', category: 'renda', description: 'Salário', amount: 4000, startMonth: '2026-08', endMonth: '', day: null, active: true },
  { id: uid(), type: 'expense', category: 'fixo', description: 'Claro — internet/celular', amount: 160, startMonth: '2026-08', endMonth: '', day: null, active: true },
  { id: uid(), type: 'expense', category: 'fixo', description: 'Save Car — seguro Escort', amount: 115, startMonth: '2026-08', endMonth: '', day: null, active: true },
  { id: uid(), type: 'expense', category: 'fixo', description: 'YouTube Premium com Pacheco', amount: 50, startMonth: '2026-08', endMonth: '', day: null, active: true },
  { id: uid(), type: 'expense', category: 'emprestimo', description: 'Empréstimo Nubank consignado', amount: 799.55, startMonth: '2026-10', endMonth: '2028-09', day: null, active: true }
];

const initialState = {
  currentBalance: 186.48,
  baseMonth: '2026-07',
  currentScreen: 'home',
  filter: 'all',
  selectedContactId: '',
  contacts: baseContacts,
  commitments: baseCommitments,
  rules: baseRules
};

let state = loadState();
let modalType = 'expense';
let activeDetailId = null;
let pendingUndo = null;
let undoTimer = null;

init();

function init() {
  applyTheme(localStorage.getItem(THEME_KEY) || 'light');
  bindEvents();
  render();
  setScreen(state.currentScreen || 'home', { silent: true });
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = structuredClone(initialState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const loaded = JSON.parse(raw);
    return migrateState({ ...structuredClone(initialState), ...loaded });
  } catch {
    const seeded = structuredClone(initialState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function migrateState(loaded) {
  loaded.contacts = mergeById(baseContacts, loaded.contacts || []);
  loaded.commitments = normalizeAndMergeCommitments(loaded.commitments || []);
  loaded.rules = Array.isArray(loaded.rules) ? loaded.rules : baseRules;
  loaded.baseMonth = loaded.baseMonth || TODAY_MONTH;
  loaded.currentScreen = loaded.currentScreen || 'home';
  loaded.filter = loaded.filter || 'all';
  loaded.currentBalance = Number.isFinite(Number(loaded.currentBalance)) ? Number(loaded.currentBalance) : 186.48;
  loaded.selectedContactId = loaded.selectedContactId || '';
  return loaded;
}

function mergeById(base, existing) {
  const map = new Map();
  [...base, ...existing].forEach(item => {
    if (!item?.id) return;
    map.set(item.id, { ...map.get(item.id), ...item });
  });
  return [...map.values()];
}

function normalizeAndMergeCommitments(existing) {
  const normalizedExisting = existing
    .filter(Boolean)
    .map(item => normalizeCommitment(item))
    .filter(item => item.description && item.month);

  const key = (item) => [
    item.month,
    item.description,
    String(item.amount ?? ''),
    item.contactId || '',
    item.installmentCurrent || '',
    item.installmentTotal || ''
  ].join('|');

  const map = new Map();
  baseCommitments.forEach(item => map.set(key(item), normalizeCommitment(item)));

  normalizedExisting.forEach(item => {
    // remove old bundled Sarah entries so the separated Aliança/Chalé base is the source of truth
    if (/Sarah — parcelas|Sarah — parcela/.test(item.description || '')) return;
    map.set(key(item), { ...map.get(key(item)), ...item });
  });

  return [...map.values()];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindEvents() {
  document.addEventListener('click', handleClick);
  document.getElementById('commitmentForm').addEventListener('submit', saveCommitment);
  document.getElementById('fixedForm').addEventListener('submit', saveFixedRule);
  document.getElementById('contactForm').addEventListener('submit', saveContact);
  document.getElementById('scenarioValue').addEventListener('input', renderScenario);
}

function handleClick(event) {
  const target = event.target;

  const screenBtn = target.closest('[data-screen]');
  if (screenBtn) {
    event.preventDefault();
    setScreen(screenBtn.dataset.screen);
    return;
  }

  const openCreate = target.closest('[data-open-create]');
  if (openCreate) {
    event.preventDefault();
    openCommitmentModal(openCreate.dataset.openCreate);
    return;
  }

  const modalTypeBtn = target.closest('[data-modal-type]');
  if (modalTypeBtn) {
    event.preventDefault();
    setModalType(modalTypeBtn.dataset.modalType);
    return;
  }

  const closeModalBtn = target.closest('[data-close-modal]');
  if (closeModalBtn) {
    event.preventDefault();
    closeModal(closeModalBtn.dataset.closeModal);
    return;
  }

  if (target.classList.contains('modal')) {
    closeModal(target.id);
    return;
  }

  const filterBtn = target.closest('[data-filter]');
  if (filterBtn) {
    event.preventDefault();
    state.filter = filterBtn.dataset.filter;
    saveState();
    renderAgenda();
    return;
  }

  const presetBtn = target.closest('[data-scenario-preset]');
  if (presetBtn) {
    event.preventDefault();
    document.getElementById('scenarioValue').value = presetBtn.dataset.scenarioPreset;
    renderScenario();
    return;
  }

  if (target.closest('#menuBtn')) {
    openDrawer();
    return;
  }

  if (target.closest('.js-close-drawer') || target.id === 'drawerBackdrop') {
    closeDrawer();
    return;
  }

  if (target.closest('#themeBtn')) {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    return;
  }

  if (target.closest('#monthSelectorTrigger')) {
    toggleMonthSelector();
    return;
  }

  if (target.closest('#prevMonthBtn')) {
    changeMonth(-1);
    return;
  }

  if (target.closest('#nextMonthBtn')) {
    changeMonth(1);
    return;
  }

  if (target.closest('#currentMonthBtn')) {
    selectMonth(TODAY_MONTH);
    return;
  }

  if (target.closest('#addFixedBtn')) {
    openFixedModal();
    return;
  }

  if (target.closest('#addContactBtn')) {
    openContactModal();
    return;
  }

  if (target.closest('#detailEditBtn')) {
    if (!activeDetailId) return;
    const id = activeDetailId;
    closeModal('detailModal');
    openCommitmentModal('edit', id);
    return;
  }

  if (target.closest('#detailDeleteBtn')) {
    if (!activeDetailId) return;
    const id = activeDetailId;
    closeModal('detailModal');
    deleteCommitment(id);
    return;
  }

  if (target.closest('#detailStatusBtn')) {
    if (!activeDetailId) return;
    cycleStatus(activeDetailId);
    const item = state.commitments.find(c => c.id === activeDetailId);
    if (item) fillDetailModal(item);
    return;
  }

  if (target.closest('#undoBtn')) {
    undoLastAction();
  }
}

function setScreen(name, options = {}) {
  const target = document.getElementById(`screen-${name}`);
  if (!target) return;

  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  target.classList.add('active');

  document.querySelectorAll('.bottom-nav [data-screen]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === name);
  });

  state.currentScreen = name;
  saveState();
  closeDrawer();

  if (!options.silent) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDrawer() {
  document.getElementById('sideDrawer').classList.add('open');
  document.getElementById('sideDrawer').setAttribute('aria-hidden', 'false');
  document.getElementById('drawerBackdrop').classList.add('show');
}

function closeDrawer() {
  document.getElementById('sideDrawer').classList.remove('open');
  document.getElementById('sideDrawer').setAttribute('aria-hidden', 'true');
  document.getElementById('drawerBackdrop').classList.remove('show');
}

function toggleMonthSelector() {
  const card = document.getElementById('monthSelectorCard');
  const isOpen = card.classList.toggle('open');
  document.getElementById('monthSelectorTrigger').setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.getElementById('monthSelectorPanel').setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  if (isOpen) requestAnimationFrame(centerActiveMonth);
}

function selectMonth(month) {
  if (!month || month === state.baseMonth) {
    centerActiveMonth();
    return;
  }

  const content = document.getElementById('contentArea');
  content.classList.add('is-changing');

  setTimeout(() => {
    state.baseMonth = month;
    saveState();
    render();
    content.classList.remove('is-changing');
    requestAnimationFrame(centerActiveMonth);
  }, 150);
}

function changeMonth(offset) {
  selectMonth(addMonths(state.baseMonth, offset));
}

function centerActiveMonth() {
  const pills = document.getElementById('monthPills');
  const active = pills.querySelector('.month-pill.active');
  if (!active) return;
  const left = active.offsetLeft - (pills.clientWidth / 2) + (active.clientWidth / 2);
  pills.scrollTo({ left, behavior: 'smooth' });
}

function render() {
  renderMonthSelector();
  renderHome();
  renderAgenda();
  renderContacts();
  renderFixed();
  renderApartment();
  renderScenario();
  populateContactSelect();
}

function renderMonthSelector() {
  document.getElementById('monthTitle').textContent = monthName(state.baseMonth);
  document.getElementById('currentMonthBtn').textContent = state.baseMonth === TODAY_MONTH
    ? 'Você já está no mês atual'
    : 'Voltar para o mês atual';

  const pills = document.getElementById('monthPills');
  pills.innerHTML = '';

  for (let i = -6; i <= 6; i++) {
    const month = addMonths(state.baseMonth, i);
    const date = new Date(`${month}-01T00:00:00`);
    const monthNum = String(date.getMonth() + 1).padStart(2, '0');
    const monthLong = date.toLocaleDateString('pt-BR', { month: 'long' });

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `month-pill${month === state.baseMonth ? ' active' : ''}`;
    button.innerHTML = `
      <div class="month-pill-top">
        <strong>${monthNum}</strong>
        <small>${date.getFullYear()}</small>
      </div>
      <div class="month-pill-bottom">
        <strong>${monthLong}</strong>
      </div>
    `;
    button.addEventListener('click', () => selectMonth(month));
    pills.appendChild(button);
  }

  requestAnimationFrame(centerActiveMonth);
}

function renderHome() {
  const calc = calcMonth(state.baseMonth);
  const projection = currentProjection();

  document.getElementById('currentBalance').textContent = money(state.currentBalance);
  document.getElementById('pendingTotal').textContent = money(calc.pending);

  const resultCard = document.getElementById('resultCard');
  resultCard.classList.toggle('positive', projection >= 0);
  resultCard.classList.toggle('negative', projection < 0);
  document.getElementById('projectedResult').textContent = money(projection);

  const late = calc.items.filter(isLate);
  document.getElementById('lateCount').textContent = late.length;
  renderList(document.getElementById('lateList'), late);

  const current = calc.items.filter(item => item.type === 'expense' && item.status !== 'paid' && !isLate(item));
  document.getElementById('currentListTotal').textContent = `Total: ${money(sum(current))}`;
  renderList(document.getElementById('currentList'), current);

  const future = document.getElementById('futureMonths');
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
  document.getElementById('agendaSummary').innerHTML = `
    <div><span>Entradas</span><strong>${money(calc.income)}</strong></div>
    <div><span>Saídas</span><strong>${money(calc.expenses)}</strong></div>
    <div><span>Pendente</span><strong>${money(calc.pending)}</strong></div>
  `;

  document.querySelectorAll('#statusTabs [data-filter]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === state.filter);
  });

  let items = [...calc.items];
  if (state.filter !== 'all') items = items.filter(item => item.status === state.filter);
  renderList(document.getElementById('agendaList'), items);
}

function renderContacts() {
  const grid = document.getElementById('contactsGrid');
  const historyCard = document.getElementById('contactHistoryCard');
  const historyList = document.getElementById('contactHistoryList');

  grid.innerHTML = '';

  state.contacts.forEach(contact => {
    const related = state.commitments.filter(item => item.contactId === contact.id);
    const paid = related.filter(item => item.status === 'paid');
    const pending = related.filter(item => item.status !== 'paid');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `contact-card${state.selectedContactId === contact.id ? ' active' : ''}`;
    btn.innerHTML = `
      <div class="contact-avatar">${escapeHtml(initials(contact.name))}</div>
      <div>
        <strong>${escapeHtml(contact.name)}</strong>
        <span>${related.length} conta(s) • ${money(sum(pending))} pendente</span>
      </div>
      <small>${money(sum(paid))}<br>pago</small>
    `;
    btn.addEventListener('click', () => {
      state.selectedContactId = contact.id;
      saveState();
      renderContacts();
    });
    grid.appendChild(btn);
  });

  if (!state.selectedContactId) {
    historyCard.classList.add('is-hidden');
    historyList.innerHTML = '';
    return;
  }

  const contact = contactById(state.selectedContactId);
  if (!contact) {
    historyCard.classList.add('is-hidden');
    return;
  }

  historyCard.classList.remove('is-hidden');
  document.getElementById('contactHistoryTitle').textContent = contact.name;

  const items = state.commitments
    .filter(item => item.contactId === contact.id)
    .sort((a, b) => (a.month || '').localeCompare(b.month || '') || (a.dueDate || '').localeCompare(b.dueDate || ''));

  renderList(historyList, items);
}

function renderFixed() {
  const list = document.getElementById('fixedList');
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
        <strong>${escapeHtml(rule.description)}</strong>
        <span>${catLabel(rule.category)} • ${rule.type === 'income' ? 'Entrada' : 'Saída'}</span>
        <small>${rule.startMonth || 'sem início'} até ${rule.endMonth || 'sem fim'}</small>
      </div>
      <strong>${money(rule.amount)}</strong>
    `;
    list.appendChild(item);
  });
}

function renderApartment() {
  const items = commitmentsForMonth(state.baseMonth).filter(item => item.category === 'apartamento');
  const mr = items.find(item => item.description.toLowerCase().includes('mr'));
  const sr = items.find(item => item.description.toLowerCase().includes('sr'));
  const caixa = items.find(item => item.description.toLowerCase().includes('caixa') || item.description.toLowerCase().includes('evolução'));

  document.getElementById('aptMR').textContent = mr ? money(mr.amount) : 'não lançado';
  document.getElementById('aptSR').textContent = sr ? money(sr.amount) : 'não lançado';
  document.getElementById('aptCaixa').textContent = caixa ? money(caixa.amount) : 'aguardando';

  renderList(document.getElementById('apartmentList'), items);
}

function renderScenario() {
  const extra = parseMoney(document.getElementById('scenarioValue').value) || 0;
  const base = currentProjection();
  const simulated = base + extra;

  document.getElementById('scenarioResult').innerHTML = `
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

function renderCommitment(item) {
  const template = document.getElementById('commitmentTemplate');
  const node = template.content.cloneNode(true);
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

  dot.addEventListener('click', event => {
    event.stopPropagation();
    cycleStatus(item.id);
  });

  article.addEventListener('click', () => openDetailModal(item.id));
  return node;
}

function openCommitmentModal(mode = 'bill', id = '') {
  const form = document.getElementById('commitmentForm');
  form.reset();
  document.getElementById('commitmentId').value = '';
  document.getElementById('commitmentInstallmentCurrent').value = '';
  document.getElementById('commitmentInstallmentTotal').value = '';
  populateContactSelect();

  let type = 'expense';
  let title = 'Adicionar conta';

  if (mode === 'income') {
    type = 'income';
    title = 'Adicionar entrada';
    document.getElementById('commitmentCategory').value = 'renda';
  }

  if (mode === 'apartment') {
    type = 'expense';
    title = 'Adicionar item do apartamento';
    document.getElementById('commitmentCategory').value = 'apartamento';
  }

  if (mode === 'edit') {
    const item = state.commitments.find(commitment => commitment.id === id);
    if (!item) return;

    title = 'Editar compromisso';
    type = item.type;
    document.getElementById('commitmentId').value = item.id;
    document.getElementById('commitmentDescription').value = item.description;
    document.getElementById('commitmentAmount').value = item.amount ?? '';
    document.getElementById('commitmentMonth').value = item.month;
    document.getElementById('commitmentDue').value = item.dueDate || '';
    document.getElementById('commitmentCategory').value = item.category;
    document.getElementById('commitmentStatus').value = item.status;
    document.getElementById('commitmentContact').value = item.contactId || '';
    document.getElementById('commitmentInstallmentCurrent').value = item.installmentCurrent || '';
    document.getElementById('commitmentInstallmentTotal').value = item.installmentTotal || '';
    document.getElementById('commitmentNote').value = item.note || '';
  } else {
    document.getElementById('commitmentMonth').value = state.baseMonth;
    document.getElementById('commitmentStatus').value = type === 'income' ? 'estimated' : 'waiting';
    document.getElementById('commitmentContact').value = '';
  }

  setModalType(type);
  document.getElementById('modalTitle').textContent = title;
  openModal('commitmentModal');
}

function saveCommitment(event) {
  event.preventDefault();

  const id = document.getElementById('commitmentId').value;
  const item = {
    id: id || uid(),
    month: document.getElementById('commitmentMonth').value,
    type: modalType,
    category: document.getElementById('commitmentCategory').value,
    description: document.getElementById('commitmentDescription').value.trim(),
    amount: parseMoney(document.getElementById('commitmentAmount').value),
    dueDate: document.getElementById('commitmentDue').value,
    status: document.getElementById('commitmentStatus').value,
    contactId: document.getElementById('commitmentContact').value || '',
    installmentCurrent: Number(document.getElementById('commitmentInstallmentCurrent').value) || null,
    installmentTotal: Number(document.getElementById('commitmentInstallmentTotal').value) || null,
    note: document.getElementById('commitmentNote').value.trim()
  };

  if (id) {
    const index = state.commitments.findIndex(commitment => commitment.id === id);
    if (index >= 0) state.commitments[index] = item;
  } else {
    state.commitments.push(item);
  }

  saveState();
  closeModal('commitmentModal');
  render();
}

function openFixedModal() {
  document.getElementById('fixedForm').reset();
  document.getElementById('fixedStart').value = state.baseMonth;
  openModal('fixedModal');
}

function saveFixedRule(event) {
  event.preventDefault();

  state.rules.push({
    id: uid(),
    type: 'expense',
    category: document.getElementById('fixedCategory').value,
    description: document.getElementById('fixedDescription').value.trim(),
    amount: parseMoney(document.getElementById('fixedAmount').value) || 0,
    day: Number(document.getElementById('fixedDay').value) || null,
    startMonth: document.getElementById('fixedStart').value || state.baseMonth,
    endMonth: document.getElementById('fixedEnd').value,
    active: true
  });

  saveState();
  closeModal('fixedModal');
  render();
}

function openContactModal() {
  document.getElementById('contactForm').reset();
  openModal('contactModal');
}

function saveContact(event) {
  event.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  if (!name) return;

  const baseId = slugify(name) || uid();
  const id = state.contacts.some(contact => contact.id === baseId) ? `${baseId}-${Date.now()}` : baseId;

  state.contacts.push({
    id,
    name,
    note: document.getElementById('contactNote').value.trim()
  });
  state.selectedContactId = id;
  saveState();
  closeModal('contactModal');
  render();
  setScreen('contacts');
}

function openDetailModal(id) {
  const item = state.commitments.find(commitment => commitment.id === id);
  if (!item) return;

  activeDetailId = id;
  fillDetailModal(item);
  openModal('detailModal');
}

function fillDetailModal(item) {
  const panel = document.querySelector('#detailModal .modal-panel');
  panel.classList.toggle('detail-expense', item.type === 'expense');
  panel.classList.toggle('detail-income', item.type === 'income');

  document.getElementById('detailTitle').textContent = item.description || 'Conta';
  document.getElementById('detailAmount').textContent = item.type === 'income' ? `+${money(item.amount)}` : money(item.amount);
  document.getElementById('detailStatusText').textContent = statusLabel(item.status);
  document.getElementById('detailCategory').textContent = item.contactId ? `${catLabel(item.category)} • ${contactName(item.contactId)}` : catLabel(item.category);
  document.getElementById('detailDueDate').textContent = dateLabel(item.dueDate);
  document.getElementById('detailInstallment').textContent = installmentLabel(item) ? `Parcela ${installmentLabel(item)}` : 'Não parcelado';
  document.getElementById('detailMonth').textContent = monthName(item.month);
  document.getElementById('detailDescription').textContent = item.note?.trim() ? item.note : 'Sem descrição adicional.';

  const dot = document.getElementById('detailStatusBtn');
  dot.textContent = statusIcon(item.status);
}

function deleteCommitment(id) {
  const item = state.commitments.find(commitment => commitment.id === id);
  if (!item) return;
  if (!confirm(`Excluir "${item.description}"?`)) return;

  state.commitments = state.commitments.filter(commitment => commitment.id !== id);
  saveState();
  render();

  showUndo(`Excluído: ${item.description}`, () => {
    state.commitments.push(item);
    saveState();
    render();
  });
}

function cycleStatus(id) {
  const item = state.commitments.find(commitment => commitment.id === id);
  if (!item) return;

  const previous = { ...item };
  const cycle = ['waiting', 'paid', 'unpaid'];
  const current = cycle.indexOf(item.status);
  item.status = cycle[(current + 1) % cycle.length] || 'waiting';

  saveState();
  render();

  showUndo(`Status alterado: ${item.description}`, () => {
    Object.assign(item, previous);
    saveState();
    render();
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');

  if (id === 'detailModal') activeDetailId = null;
}

function setModalType(type) {
  modalType = type;
  document.querySelectorAll('[data-modal-type]').forEach(button => {
    button.classList.toggle('selected', button.dataset.modalType === type);
  });
}

function populateContactSelect() {
  const select = document.getElementById('commitmentContact');
  const current = select.value;
  select.innerHTML = '<option value="">Sem contato</option>';

  state.contacts.forEach(contact => {
    const option = document.createElement('option');
    option.value = contact.id;
    option.textContent = contact.name;
    select.appendChild(option);
  });

  if ([...select.options].some(option => option.value === current)) select.value = current;
}

function showUndo(text, action) {
  if (undoTimer) clearTimeout(undoTimer);
  pendingUndo = action;

  const toast = document.getElementById('undoToast');
  document.getElementById('undoText').textContent = text;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add('show'));

  undoTimer = setTimeout(() => {
    toast.classList.remove('show');
    pendingUndo = null;
    setTimeout(() => {
      if (!toast.classList.contains('show')) toast.hidden = true;
    }, 220);
  }, 10000);
}

function undoLastAction() {
  if (!pendingUndo) return;

  pendingUndo();
  pendingUndo = null;

  if (undoTimer) clearTimeout(undoTimer);
  const toast = document.getElementById('undoToast');
  toast.classList.remove('show');
  setTimeout(() => toast.hidden = true, 220);
}

function calcMonth(month) {
  const items = commitmentsForMonth(month);
  const income = sum(items.filter(item => item.type === 'income'));
  const expenses = sum(items.filter(item => item.type === 'expense'));
  const pending = sum(items.filter(item => item.type === 'expense' && item.status !== 'paid'));
  const paid = sum(items.filter(item => item.status === 'paid'));
  return { items, income, expenses, pending, paid, result: income - expenses };
}

function commitmentsForMonth(month) {
  return state.commitments
    .filter(item => item.month === month)
    .sort((a, b) => (a.dueDate || `${a.month}-99`).localeCompare(b.dueDate || `${b.month}-99`));
}

function currentProjection() {
  return Number(state.currentBalance || 0) - calcMonth(state.baseMonth).pending;
}

function isLate(item) {
  if (!item.dueDate || item.status === 'paid' || item.type === 'income') return false;
  const due = new Date(`${item.dueDate}T23:59:59-03:00`);
  return due < TODAY;
}

function sum(items) {
  return items.reduce((total, item) => total + (Number(item.amount) || 0), 0);
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
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function addMonths(monthKey, offset) {
  const [year, month] = monthKey.split('-').map(Number);
  const d = new Date(year, month - 1 + offset, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthName(monthKey, long = true) {
  const [year, month] = monthKey.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString('pt-BR', long ? { month: 'long', year: 'numeric' } : { month: 'short', year: '2-digit' });
}

function dateLabel(date) {
  if (!date) return 'sem vencimento';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function statusLabel(status) {
  return {
    waiting: 'Aguardando',
    paid: 'Pago',
    unpaid: 'Não pago',
    estimated: 'Previsto',
    special: 'Especial',
    waiting_value: 'Aguardando valor'
  }[status] || status;
}

function statusIcon(status) {
  return {
    waiting: '•',
    paid: '✓',
    unpaid: '!',
    estimated: '~',
    special: '*',
    waiting_value: '?'
  }[status] || '•';
}

function catLabel(category) {
  return {
    apartamento: 'Apartamento',
    fixo: 'Fixo',
    pessoas: 'Pessoas',
    cartao: 'Cartão',
    emprestimo: 'Empréstimo',
    renda: 'Renda',
    outros: 'Outros'
  }[category] || category;
}

function installmentLabel(item) {
  const current = Number(item.installmentCurrent);
  const total = Number(item.installmentTotal);
  return current && total ? `${current}/${total}` : '';
}

function contactById(id) {
  return state.contacts.find(contact => contact.id === id) || null;
}

function contactName(id) {
  return contactById(id)?.name || '';
}

function initials(name) {
  return String(name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('') || '?';
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, theme === 'dark' ? 'dark' : 'light');
}
