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
  commitments: [
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Abril/2026', amount: 1425.57, dueDate: '2026-04-25', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Maio/2026 — Encargos CEF', amount: 1639.40, dueDate: '2026-05-20', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Maio/2026 — MR/Correção', amount: 1517.31, dueDate: '2026-05-25', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — Junho/2026', amount: 1398.85, dueDate: '2026-06-25', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'apartamento', description: 'Apartamento — DB Encargos CEF', amount: 1593.35, dueDate: '2026-07-06', status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'emprestimo', description: 'Cheque especial CAIXA', amount: 1498.48, status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'cartao', description: 'Julia', amount: 1500, status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'outros', description: 'Sarah — aniversário Ygor', amount: 50, status: 'paid' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'fixo', description: 'Claro — internet/celular', amount: 160, status: 'waiting' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'outros', description: 'Pacheco — almoço jogo do Brasil', amount: 75, status: 'waiting' },
    { id: uid(), month: '2026-07', type: 'expense', category: 'cartao', description: 'Nubank — cartão/assinaturas', amount: 219.56, status: 'paid' },

    { id: uid(), month: '2026-08', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2026-08', type: 'expense', category: 'pessoas', description: 'Sarah — parcelas 2/3 + 2/10', amount: 463.20, status: 'waiting' },
    { id: uid(), month: '2026-08', type: 'expense', category: 'cartao', description: 'Cartão com a Julia', amount: 1200, status: 'waiting' },
    { id: uid(), month: '2026-08', type: 'expense', category: 'apartamento', description: 'Taxa R', amount: 221.16, dueDate: '2026-08-08', status: 'waiting' },
    { id: uid(), month: '2026-08', type: 'expense', category: 'apartamento', description: 'MR — mensalidade', amount: 1095.64, dueDate: '2026-08-25', status: 'waiting' },

    { id: uid(), month: '2026-09', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2026-09', type: 'expense', category: 'pessoas', description: 'Sarah — parcelas 3/3 + 3/10', amount: 463.20, status: 'waiting' },
    { id: uid(), month: '2026-09', type: 'expense', category: 'apartamento', description: 'MR — mensalidade', amount: 1095.64, dueDate: '2026-09-25', status: 'waiting' },
    { id: uid(), month: '2026-09', type: 'expense', category: 'apartamento', description: 'SR — anual', amount: 5600, dueDate: '2026-09-30', status: 'special', note: 'Época de PLR' },

    { id: uid(), month: '2026-10', type: 'income', category: 'renda', description: 'Salário', amount: 4000, status: 'estimated' },
    { id: uid(), month: '2026-10', type: 'expense', category: 'pessoas', description: 'Sarah — parcela 4/10', amount: 223.21, status: 'waiting' },
    { id: uid(), month: '2026-10', type: 'expense', category: 'cartao', description: 'Cartão com a Julia', amount: 650, status: 'waiting' },
    { id: uid(), month: '2026-10', type: 'expense', category: 'apartamento', description: 'MR — mensalidade', amount: 1095.64, dueDate: '2026-10-25', status: 'waiting' },
    { id: uid(), month: '2026-10', type: 'expense', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 1/24', amount: 799.55, status: 'waiting' }
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
    return { ...structuredClone(initialState), ...JSON.parse(raw) };
  } catch {
    return structuredClone(initialState);
  }
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

function commitmentsForMonth(month) {
  return state.commitments
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
  $$('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => setScreen(btn.dataset.nav));
  });

  $$('[data-open-create]').forEach(btn => {
    btn.addEventListener('click', () => openCommitmentModal(btn.dataset.openCreate));
  });

  $('[data-open-fixed]')?.addEventListener('click', openFixedModal);

  $('#menuBtn').addEventListener('click', openDrawer);
  $('#closeDrawerBtn').addEventListener('click', closeDrawer);
  $('#drawerBackdrop').addEventListener('click', closeDrawer);

  $('#themeBtn').addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  $('#prevMonthBtn').addEventListener('click', () => changeMonth(-1));
  $('#nextMonthBtn').addEventListener('click', () => changeMonth(1));
  $('#monthSelectorTrigger').addEventListener('click', toggleMonthSelector);

  $('#closeModalBtn').addEventListener('click', closeCommitmentModal);
  $('#commitmentModal').addEventListener('click', e => {
    if (e.target.id === 'commitmentModal') closeCommitmentModal();
  });

  $$('[data-modal-type]').forEach(btn => {
    btn.addEventListener('click', () => setModalType(btn.dataset.modalType));
  });

  $('#commitmentForm').addEventListener('submit', saveCommitment);

  $('#closeFixedModalBtn').addEventListener('click', closeFixedModal);
  $('#fixedModal').addEventListener('click', e => {
    if (e.target.id === 'fixedModal') closeFixedModal();
  });
  $('#fixedForm').addEventListener('submit', saveFixedRule);

  $$('#statusTabs [data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.filter = btn.dataset.filter;
      renderAgenda();
      $$('#statusTabs [data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === state.filter));
    });
  });

  $$('[data-scenario-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      $('#scenarioValue').value = btn.dataset.scenarioPreset;
      renderScenario();
    });
  });
  $('#scenarioValue').addEventListener('input', renderScenario);

  $('#saveBalanceBtn').addEventListener('click', () => {
    state.currentBalance = parseMoney($('#balanceInput').value) || 0;
    saveState();
    render();
    setScreen('home');
  });

  $('#exportBtn').addEventListener('click', exportBackup);
  $('#importInput').addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) importBackup(file);
    e.target.value = '';
  });
  $('#resetBtn').addEventListener('click', () => {
    if (!confirm('Resetar todos os dados locais?')) return;
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(initialState);
    saveState();
    render();
  });

  $('#undoBtn').addEventListener('click', undoLastAction);
}

function setScreen(name) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(`#screen-${name}`)?.classList.add('active');
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
  renderFixed();
  renderApartment();
  renderScenario();
}

function renderMonthRail() {
  $('#monthRailCurrent').textContent = monthName(state.baseMonth);
  $('#monthRailLabel').textContent = monthName(state.baseMonth, false);

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

  setTimeout(() => {
    state.baseMonth = month;
    saveState();
    render();

    document.querySelectorAll('.screen.active, .month-selector-card').forEach(el => {
      el.classList.remove('month-fade');
      void el.offsetWidth;
      el.classList.add('month-fade');
    });

    requestAnimationFrame(centerActiveMonth);
  }, 120);
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
  title.textContent = item.description;
  sub.textContent = `${catLabel(item.category)} • ${dateLabel(item.dueDate)}`;
  value.textContent = item.type === 'income' ? `+${money(item.amount)}` : money(item.amount);
  status.textContent = statusLabel(item.status);

  dot.addEventListener('click', (e) => {
    e.stopPropagation();
    cycleStatus(item.id);
  });

  article.addEventListener('click', () => article.classList.toggle('open'));

  article.querySelector('[data-action="edit"]').addEventListener('click', (e) => {
    e.stopPropagation();
    openCommitmentModal('edit', item.id);
  });

  article.querySelector('[data-action="delete"]').addEventListener('click', (e) => {
    e.stopPropagation();
    deleteCommitment(item.id);
  });

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
  showUndo(`Status alterado: ${item.description}`, () => {
    Object.assign(item, previous);
    saveState();
    render();
  });
}

function openCommitmentModal(mode = 'bill', id = '') {
  $('#commitmentForm').reset();
  $('#commitmentId').value = '';

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
    $('#commitmentNote').value = item.note || '';
  } else {
    $('#commitmentMonth').value = state.baseMonth;
    $('#commitmentStatus').value = type === 'income' ? 'estimated' : 'waiting';
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
  const data = {
    id: id || uid(),
    month: $('#commitmentMonth').value,
    type: modalType,
    category: $('#commitmentCategory').value,
    description: $('#commitmentDescription').value.trim(),
    amount: parseMoney($('#commitmentAmount').value),
    dueDate: $('#commitmentDue').value,
    status: $('#commitmentStatus').value,
    note: $('#commitmentNote').value.trim()
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
}

function deleteCommitment(id) {
  const item = state.commitments.find(i => i.id === id);
  if (!item) return;
  if (!confirm(`Excluir "${item.description}"?`)) return;

  state.commitments = state.commitments.filter(i => i.id !== id);
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
