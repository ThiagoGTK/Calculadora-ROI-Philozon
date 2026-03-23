const areas = [
  { nome: "Dentista",           custo: 80,  preco: 1500 },
  { nome: "HOF",                custo: 50,  preco: 5000 },
  { nome: "Enfermeiro(a)",      custo: 14,  preco: null },
  { nome: "Fisioterapeuta",     custo: 14,  preco: 250  },
  { nome: "Veterinário(a)",     custo: 40,  preco: null },
  { nome: "Médico(a)",          custo: 14,  preco: null },
  { nome: "Farmacêutico(a)",    custo: 14,  preco: null },
  { nome: "Tratamento Feridas", custo: 80,  preco: 180  },
  { nome: "AutoHemo",           custo: 140, preco: 750  },
  { nome: "Hemo menor",         custo: 8,   preco: 250  },
];

let areaAtiva = null;

// Renderiza os botões de área de atuação
const areaSelector = document.getElementById('areaSelector');
areas.forEach((a, i) => {
  const btn = document.createElement('button');
  btn.className = 'area-btn';
  btn.textContent = a.nome;
  btn.onclick = () => {
    areaAtiva = i;
    document.querySelectorAll('.area-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('custoInsumos').value = a.custo;
    document.getElementById('custoSugerido').textContent = 'R$ ' + a.custo;
    if (a.preco) document.getElementById('valorProcedimento').value = a.preco;
    calcular();
  };
  areaSelector.appendChild(btn);
});

// Formata valor monetário em BRL
function fmt(v) {
  if (isNaN(v) || !isFinite(v)) return '—';
  return 'R$ ' + Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Formata número com casas decimais
function fmtN(v, dec = 1) {
  if (isNaN(v) || !isFinite(v)) return '—';
  return v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

// Função principal de cálculo
function calcular() {
  const equip  = parseFloat(document.getElementById('valorEquipamento').value) || 0;
  const proc   = parseFloat(document.getElementById('valorProcedimento').value) || 0;
  const atend  = parseFloat(document.getElementById('atendimentos').value) || 0;
  const custo  = parseFloat(document.getElementById('custoInsumos').value) || 0;

  const lucroPorSessao = proc - custo;
  const receitaMensal  = proc * atend;
  const lucroMensal    = lucroPorSessao * atend;
  const payback        = lucroMensal > 0 ? equip / lucroMensal : Infinity;

  document.getElementById('lucroPorSessao').textContent = fmt(lucroPorSessao);
  document.getElementById('receitaMensal').textContent  = fmt(receitaMensal);
  document.getElementById('lucroMensal').textContent    = fmt(lucroMensal);
  document.getElementById('paybackMeses').textContent   = isFinite(payback) ? Math.ceil(payback) + ' m' : '—';

  // Barra de progresso do payback (escala 0–24 meses)
  const pct = Math.min((isFinite(payback) ? payback : 24) / 24 * 100, 100);
  document.getElementById('paybackBar').style.width = pct + '%';

  // Simulação de financiamento
  const finAtivo = document.getElementById('toggleFin').checked;
  if (finAtivo) {
    const entrada         = parseFloat(document.getElementById('entrada').value) || 0;
    const nParc           = parseFloat(document.getElementById('parcelas').value) || 1;
    const taxa            = (parseFloat(document.getElementById('taxaIPCA').value) || 0) / 100;
    const taxaMensal      = taxa / 12;
    const valorFinanciado = equip - entrada;

    // Cálculo de parcela pelo sistema Price
    let parcela;
    if (taxaMensal === 0) {
      parcela = valorFinanciado / nParc;
    } else {
      parcela = valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, nParc)) / (Math.pow(1 + taxaMensal, nParc) - 1);
    }

    const atendParc  = parcela / lucroPorSessao;
    const lucroFin   = lucroMensal - parcela;
    const paybackFin = lucroFin > 0 ? equip / lucroFin : Infinity;

    document.getElementById('valorParcela').textContent = fmt(parcela);
    document.getElementById('atendParc').textContent    = isFinite(atendParc) ? Math.ceil(atendParc) + ' atend.' : '—';
    document.getElementById('lucroFin').textContent     = fmt(lucroFin);
    document.getElementById('paybackFin').textContent   = isFinite(paybackFin) ? Math.ceil(paybackFin) + ' m' : '—';

    document.getElementById('finResults').classList.add('visible');
  } else {
    document.getElementById('finResults').classList.remove('visible');
  }

  // Geração de insights dinâmicos
  const insights = [];
  if (atend > 0 && isFinite(payback)) {
    const atendDia = (atend / 22).toFixed(1);
    insights.push(`Atendendo <strong>${atendDia} pacientes/dia</strong>, o equipamento se paga em <strong>${Math.ceil(payback)} meses</strong>.`);
  }
  if (lucroMensal > 0) {
    insights.push(`O ozônio agrega <strong>${fmt(lucroMensal)}/mês</strong> de lucro líquido à clínica.`);
  }
  if (lucroMensal > 0 && equip > 0) {
    const pct12 = (lucroMensal * 12 / equip * 100).toFixed(0);
    insights.push(`Em 12 meses, o retorno sobre o investimento é de <strong>${pct12}%</strong>.`);
  }
  if (atend > 0 && lucroPorSessao > 0) {
    const paraPagar = Math.ceil(equip / lucroPorSessao);
    insights.push(`São necessários apenas <strong>${paraPagar} atendimentos</strong> no total para recuperar o investimento.`);
  }

  document.getElementById('insightsList').innerHTML = insights.map(t =>
    `<div class="insight-item"><div class="insight-dot"></div><div class="insight-text">${t}</div></div>`
  ).join('');
}

// Toggle do painel de financiamento
document.getElementById('toggleFin').addEventListener('change', function () {
  document.getElementById('finInputs').style.display = this.checked ? 'block' : 'none';
  calcular();
});

// Atualização em tempo real ao digitar
['valorEquipamento', 'valorProcedimento', 'atendimentos', 'custoInsumos', 'entrada', 'parcelas', 'taxaIPCA']
  .forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcular);
  });

// Cálculo inicial ao carregar a página
calcular();
