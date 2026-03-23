# 📊 Calculadora de ROI — Philozon

Ferramenta web interativa para simulação de retorno sobre investimento em equipamentos de ozonioterapia. Desenvolvida para uso interno da equipe comercial e clientes Philozon.

---

## ✨ Funcionalidades

- **Seletor de área de atuação** — preenche automaticamente os valores de custo e preço de referência para cada especialidade (Dentista, Veterinário, Fisioterapeuta, AutoHemo, entre outros)
- **Cálculo em tempo real** — todos os resultados atualizam conforme os campos são preenchidos
- **Simulação à vista** — calcula receita mensal, lucro líquido, lucro por sessão e payback
- **Simulação de financiamento** — calcula valor da parcela, atendimentos necessários para cobrir a parcela e lucro líquido descontado
- **Barra visual de payback** — representação gráfica do tempo de retorno (escala de 0 a 24 meses)
- **Insights automáticos** — frases geradas dinamicamente com base nos números inseridos
- **Glossário** — explicação dos termos ROI, Lucro Líquido, Payback e Insumos

---

## 🚀 Como usar

### Opção 1 — Abrir localmente
Baixe o arquivo `index.html` e abra diretamente no navegador (Chrome, Edge, Firefox). Não requer instalação.

### Opção 2 — Publicar com GitHub Pages (recomendado para compartilhamento)

1. Crie um repositório no [GitHub](https://github.com)
2. Faça upload do arquivo `index.html`
3. Vá em **Settings → Pages**
4. Selecione a branch `main` e salve
5. Acesse o link gerado: `https://seunome.github.io/nome-do-repositorio`

---

## 📁 Estrutura do projeto

```
calculadora-roi-philozon/
├── index.html   # Aplicação completa (HTML + CSS + JS em arquivo único)
└── README.md    # Este arquivo
```

---

## 🧮 Lógica de cálculo

| Métrica | Fórmula |
|---|---|
| Lucro por sessão | Valor do procedimento − Custo dos insumos |
| Receita mensal | Valor do procedimento × Atendimentos/mês |
| Lucro mensal | Lucro por sessão × Atendimentos/mês |
| Payback (à vista) | Valor do equipamento ÷ Lucro mensal |
| Parcela financiada | Fórmula Price com taxa IPCA mensal |
| Lucro c/ financiamento | Lucro mensal − Valor da parcela |

---

## 🏥 Áreas de atuação suportadas

| Área | Custo insumo (ref.) | Preço sugerido (ref.) |
|---|---|---|
| Dentista | R$ 80 | R$ 1.500 |
| HOF | R$ 50 | R$ 5.000 |
| Enfermeiro(a) | R$ 14 | — |
| Fisioterapeuta | R$ 14 | R$ 250 |
| Veterinário(a) | R$ 40 | — |
| Médico(a) | R$ 14 | — |
| Farmacêutico(a) | R$ 14 | — |
| Tratamento Feridas | R$ 80 | R$ 180 |
| AutoHemo | R$ 140 | R$ 750 |
| Hemo menor | R$ 8 | R$ 250 |

> Os valores de referência são sugestões baseadas em pesquisa de mercado. Cada campo pode ser editado livremente.

---

## 🛠️ Tecnologias

- HTML5 + CSS3 + JavaScript puro (vanilla)
- Fonte: [DM Sans + DM Serif Display](https://fonts.google.com) via Google Fonts
- Sem dependências externas — funciona offline após o primeiro carregamento

---

## 📌 Observações

- Os dados **não são salvos** entre sessões — cada acesso começa com os valores padrão
- O link do GitHub Pages é **público** — qualquer pessoa com o link consegue acessar
- Para adicionar autenticação ou salvar dados, seria necessário um backend (fora do escopo desta versão)

---

*Desenvolvido para Philozon — Ozonioterapia*
