const STORAGE_KEY = 'financeiro-keven-v1';

const initialState = {
  currentBalance: 186.48,
  entries: [
    // Julho já pago / resolvido
    { id: crypto.randomUUID(), month: '2026-07', type: 'entrada', category: 'renda', description: 'Empréstimo Nubank consignado', value: 10000, status: 'pago' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento atrasado — abril/2026', value: 1425.57, status: 'pago', dueDate: '2026-04-25' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento atrasado — maio/2026 Encargos CEF', value: 1639.40, status: 'pago', dueDate: '2026-05-20' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento atrasado — maio/2026 MR/Correção', value: 1517.31, status: 'pago', dueDate: '2026-05-25' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento atrasado — junho/2026', value: 1398.85, status: 'pago', dueDate: '2026-06-25' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'apartamento', description: 'Apartamento — DB Encargos CEF julho', value: 1593.35, status: 'pago', dueDate: '2026-07-06' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'cartao', description: 'Julia', value: 1500, status: 'pago' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'pessoas', description: 'Sarah — aniversário Ygor', value: 50, status: 'pago' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'outros', description: 'Cheque especial CAIXA', value: 1498.48, status: 'pago' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'cartao', description: 'Nubank — cartão/assinaturas', value: 219.56, status: 'pago' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'fixo', description: 'Claro — internet/celular', value: 160, status: 'pendente' },
    { id: crypto.randomUUID(), month: '2026-07', type: 'saida', category: 'pessoas', description: 'Pacheco — almoço jogo do Brasil', value: 75, status: 'pendente' },

    // Agosto
    { id: crypto.randomUUID(), month: '2026-08', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-08', type: 'saida', category: 'pessoas', description: 'Sarah — parcelas 2/3 + 2/10', value: 463.20, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-08', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 1200, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-08', type: 'saida', category: 'apartamento', description: 'Taxa R', value: 221.16, status: 'previsto', dueDate: '2026-08-08' },
    { id: crypto.randomUUID(), month: '2026-08', type: 'saida', category: 'apartamento', description: 'MR — mensalidade', value: 1095.64, status: 'previsto', dueDate: '2026-08-25' },

    // Setembro
    { id: crypto.randomUUID(), month: '2026-09', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-09', type: 'saida', category: 'pessoas', description: 'Sarah — parcelas 3/3 + 3/10', value: 463.20, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-09', type: 'saida', category: 'apartamento', description: 'MR — mensalidade', value: 1095.64, status: 'previsto', dueDate: '2026-09-25' },
    { id: crypto.randomUUID(), month: '2026-09', type: 'saida', category: 'apartamento', description: 'SR — anual / época de PLR', value: 5600, status: 'previsto', dueDate: '2026-09-30' },

    // Outubro
    { id: crypto.randomUUID(), month: '2026-10', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-10', type: 'saida', category: 'pessoas', description: 'Sarah — parcela 4/10', value: 223.21, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-10', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 650, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-10', type: 'saida', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 1/24', value: 799.55, status: 'previsto' },

    // Novembro e Dezembro já deixados na base para quando chegar
    { id: crypto.randomUUID(), month: '2026-11', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-11', type: 'saida', category: 'pessoas', description: 'Sarah — parcela 5/10', value: 223.21, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-11', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 650, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-11', type: 'saida', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 2/24', value: 799.55, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-12', type: 'entrada', category: 'renda', description: 'Salário', value: 4000, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-12', type: 'saida', category: 'pessoas', description: 'Sarah — parcela 6/10', value: 223.21, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-12', type: 'saida', category: 'cartao', description: 'Cartão com a Julia', value: 500, status: 'previsto' },
    { id: crypto.randomUUID(), month: '2026-12', type: 'saida', category: 'emprestimo', description: 'Empréstimo Nubank consignado — 3/24', value: 799.55, status: 'previsto' }
  ],
  fixedMonthly: [
    { id: crypto.randomUUID(), type: 'saida', category: 'fixo', description: 'Claro — internet/celular', value: 160, day: null, active: true },
    { id: crypto.randomUUID(), type: 'saida', category: 'fixo', description: 'Save Car — seguro Escort', value: 115, day: null, active: true },
    { id: crypto.randomUUID(), type: 'saida', category: 'fixo', description: 'YouTube Premium com Pacheco', value: 50, day: null, active: true }
  ]
};

let state = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(initialState);
  try { return JSON.parse(saved); } catch { return structuredClone(initialState); }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function monthName(monthKey) {
  const [year, month] = monthKey.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

function getVisibleMonths() {
  // travado em julho/2026 por enquanto, igual nosso controle atual.
  // Depois dá pra trocar para new Date() automaticamente.
  const base = new Date(2026, 6, 1);
  return [0, 1, 2].map(offset => {
    const d = new Date(base.getFullYear(), base.getMonth() + offset, 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });
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
      status: 'previsto',
      dueDate: item.day ? `${monthKey}-${String(item.day).padStart(2, '0')}` : ''
    }));
}

function entriesForMonth(monthKey) {
  return [...state.entries.filter(e => e.month === monthKey), ...fixedForMonth(monthKey)]
    .sort((a, b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999'));
}

function calculateMonth(monthKey) {
  const entries = entriesForMonth(monthKey);
  const entradas = entries.filter(e => e.type === 'entrada').reduce((sum, e) => sum + Number(e.value), 0);
  const saidas = entries.filter(e => e.type === 'saida').reduce((sum, e) => sum + Number(e.value), 0);
  return { entries, entradas, saidas, result: entradas - saidas };
}

function calculateJulyFromCurrentBalance() {
  const pendings = entriesForMonth('2026-07').filter(e => e.type === 'saida' && e.status !== 'pago');
  const pendingTotal = pendings.reduce((sum, e) => sum + Number(e.value), 0);
  return { pendingTotal, result: state.currentBalance - pendingTotal };
}

function render() {
  document.getElementById('currentBalance').textContent = formatBRL(state.currentBalance);
  const months = getVisibleMonths();
  renderSummary(months);
  renderMonths(months);
  setupDefaults();
}

function renderSummary(months) {
  const strip = document.getElementById('summaryStrip');
  strip.innerHTML = '';
  months.forEach(month => {
    const calc = month === '2026-07' ? calculateJulyFromCurrentBalance() : calculateMonth(month);
    const card = document.createElement('div');
    card.className = `summary-card ${calc.result >= 0 ? 'positive' : 'negative'}`;
    card.innerHTML = `<span>${monthName(month)}</span><strong>${calc.result >= 0 ? '🟩' : '🟥'} ${formatBRL(calc.result)}</strong>`;
    strip.appendChild(card);
  });
}

function renderMonths(months) {
  const container = document.getElementById('monthsContainer');
  const template = document.getElementById('monthTemplate');
  container.innerHTML = '';

  months.forEach(month => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.month-card');
    const title = clone.querySelector('h3');
    const subtitle = clone.querySelector('.month-header p');
    const result = clone.querySelector('.month-result');
    const tbody = clone.querySelector('tbody');

    const calc = calculateMonth(month);
    const july = month === '2026-07' ? calculateJulyFromCurrentBalance() : null;

    title.textContent = monthName(month);
    if (month === '2026-07') {
      subtitle.textContent = `Saldo atual ${formatBRL(state.currentBalance)} • pendências ${formatBRL(july.pendingTotal)}`;
      result.textContent = `${july.result >= 0 ? '🟩' : '🟥'} ${formatBRL(july.result)}`;
      result.classList.add(july.result >= 0 ? 'positive' : 'negative');
    } else {
      subtitle.textContent = `Entradas ${formatBRL(calc.entradas)} • saídas ${formatBRL(calc.saidas)}`;
      result.textContent = `${calc.result >= 0 ? '🟩' : '🟥'} ${formatBRL(calc.result)}`;
      result.classList.add(calc.result >= 0 ? 'positive' : 'negative');
    }

    if (calc.entries.length === 0) {
      tbody.innerHTML = `<tr><td class="empty" colspan="7">Nenhum lançamento nesse mês ainda.</td></tr>`;
    } else {
      calc.entries.forEach(entry => tbody.appendChild(renderRow(entry)));
    }

    container.appendChild(card);
  });
}

function renderRow(entry) {
  const tr = document.createElement('tr');
  const canDelete = state.entries.some(e => e.id === entry.id);
  tr.innerHTML = `
    <td class="status ${entry.status}">${statusLabel(entry.status)}</td>
    <td class="type-${entry.type}">${entry.type === 'entrada' ? '+' : '-'}</td>
    <td class="value">${formatBRL(Number(entry.value))}</td>
    <td>${entry.dueDate ? formatDate(entry.dueDate) : '—'}</td>
    <td>${categoryLabel(entry.category)}</td>
    <td>${entry.description}</td>
    <td>${canDelete ? `<button class="delete-btn" data-id="${entry.id}">Excluir</button>` : ''}</td>
  `;
  return tr;
}

function statusLabel(status) {
  const map = { pago: '✅ Pago', pendente: '🟨 Pendente', previsto: '🟦 Previsto' };
  return map[status] || status;
}

function categoryLabel(category) {
  const map = {
    apartamento: 'Apartamento', fixo: 'Fixo', cartao: 'Cartão', pessoas: 'Pessoas',
    emprestimo: 'Empréstimo', renda: 'Renda', outros: 'Outros'
  };
  return map[category] || category;
}

function formatDate(dateString) {
  const [y, m, d] = dateString.split('-');
  return `${d}/${m}/${y}`;
}

function setupDefaults() {
  document.getElementById('entryMonth').value ||= '2026-07';
}

document.getElementById('entryForm').addEventListener('submit', event => {
  event.preventDefault();
  const entry = {
    id: crypto.randomUUID(),
    month: document.getElementById('entryMonth').value,
    type: document.getElementById('entryType').value,
    description: document.getElementById('entryDescription').value.trim(),
    value: Number(document.getElementById('entryValue').value),
    category: document.getElementById('entryCategory').value,
    dueDate: document.getElementById('entryDueDate').value,
    status: document.getElementById('entryStatus').value
  };
  state.entries.push(entry);
  saveState();
  event.target.reset();
  render();
});

document.getElementById('fixedForm').addEventListener('submit', event => {
  event.preventDefault();
  state.fixedMonthly.push({
    id: crypto.randomUUID(),
    type: 'saida',
    category: 'fixo',
    description: document.getElementById('fixedDescription').value.trim(),
    value: Number(document.getElementById('fixedValue').value),
    day: Number(document.getElementById('fixedDay').value) || null,
    active: true
  });
  saveState();
  event.target.reset();
  render();
});

document.addEventListener('click', event => {
  if (!event.target.matches('.delete-btn')) return;
  const id = event.target.dataset.id;
  state.entries = state.entries.filter(entry => entry.id !== id);
  saveState();
  render();
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `backup-financeiro-keven-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});

document.getElementById('importInput').addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported.entries)) throw new Error('Backup inválido');
    state = imported;
    saveState();
    render();
  } catch (error) {
    alert('Não consegui importar esse arquivo. Parece não ser um backup válido.');
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Resetar todos os dados locais e voltar para a base inicial?')) return;
  state = structuredClone(initialState);
  saveState();
  render();
});

render();
