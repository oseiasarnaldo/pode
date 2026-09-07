/* Auditor de acabamento.
   Conta as técnicas que existem no CSS aplicado e no HTML, e compara com o
   piso de references/piso-de-acabamento.md.

   Como rodar: abra a página servida (não pelo file://, senão o navegador
   bloqueia a leitura das folhas de estilo) e cole no console. Ou peça pro
   agente rodar por evaluate_script no MCP do Chrome.

   O piso é mínimo, não meta. Uma página bem acabada entrega de duas a três
   vezes cada número. */
(() => {
  const css = [...document.styleSheets]
    .flatMap(s => { try { return [...s.cssRules].map(r => r.cssText); } catch { return []; } })
    .join('\n');
  const html = document.documentElement.outerHTML;

  if (!css) {
    console.warn('Nenhuma folha de estilo legível. Sirva a página por http, não por file://');
    return;
  }

  const conta = (re, fonte = css) => (fonte.match(re) || []).length;

  /* Entrada detectada por COMPORTAMENTO: a página pode chamar de .sobe,
     .reveal ou [data-reveal]. O que conta é ter transição de opacity ou
     transform, senão o auditor reprova uma página que está certa. */
  const entraDeVerdade = (el) => {
    const s = getComputedStyle(el);
    return (parseFloat(s.transitionDuration) || 0) > 0 &&
           /opacity|transform|all/.test(s.transitionProperty || '');
  };
  const totalEntrada = [...document.querySelectorAll('body *')].filter(entraDeVerdade).length;

  const medido = {
    'luz radial':        conta(/radial-gradient/g),
    'entrada no scroll': totalEntrada,
    'máscara':           conta(/mask-image/g),
    'desfoque':          conta(/filter:\s*blur/g),
    'keyframes':         conta(/@keyframes/g),
    'vidro':             conta(/backdrop-filter/g),
    'grão':              conta(/feTurbulence/g, html + css),
    'reduced-motion':    conta(/prefers-reduced-motion/g),
  };

  const piso = {
    'luz radial': 8, 'entrada no scroll': 6, 'máscara': 2, 'desfoque': 1,
    'keyframes': 2, 'vidro': 1, 'grão': 1, 'reduced-motion': 1,
  };

  const linhas = {};
  let abaixo = 0;
  for (const [k, v] of Object.entries(medido)) {
    const ok = v >= piso[k];
    if (!ok) abaixo++;
    linhas[k] = { tem: v, piso: piso[k], veredito: ok ? 'ok' : 'ABAIXO' };
  }
  console.table(linhas);

  /* Imagem sem máscara é o defeito mais comum, e o que mais denuncia
     página montada em builder: borda reta colada no fundo. */
  const semMascara = [...document.images].filter(img => {
    const e = getComputedStyle(img);
    const m = e.maskImage || e.webkitMaskImage;
    return (!m || m === 'none') && img.clientWidth > 240;
  });

  if (semMascara.length) {
    console.warn(`${semMascara.length} imagem(ns) grande(s) sem máscara: ` +
      semMascara.map(i => (i.currentSrc || i.src || '').split('/').pop()).join(', '));
  }

  /* ---- Cobertura por dobra ----
     Contagem não vê distribuição: 37 revelações podem estar todas no hero.
     O piso é POR DOBRA, e é da metade pra baixo que o acabamento morre. */
  const temFundo = (el) => {
    for (const p of [null, '::before', '::after']) {
      const s = getComputedStyle(el, p);
      const bg = s.backgroundImage || '';
      if (bg && bg !== 'none') return bg;
    }
    return '';
  };

  const dobras = [...document.querySelectorAll('section, footer, [data-dobra]')]
    .filter(s => s.offsetHeight > 200);

  /* Detecta por COMPORTAMENTO, não por nome de classe. Uma página pode chamar
     de .sobe, .reveal ou [data-reveal]: o que importa é o elemento ter
     transição de opacity/transform, ou animação rodando. */
  const temEntrada = entraDeVerdade;
  const temVida = (el) => {
    for (const p of [null, '::before', '::after']) {
      const s = getComputedStyle(el, p);
      if (s.animationName && s.animationName !== 'none' && parseFloat(s.animationDuration) > 0) return true;
    }
    return false;
  };

  const cobertura = {};
  const nuas = [];
  const entradas = [];
  let dobrasComVida = 0, vidaEmbaixo = 0;

  dobras.forEach((s, i) => {
    const nome = s.id || s.className.split(' ')[0] || `dobra ${i + 1}`;
    const fundos = [s, ...s.querySelectorAll(':scope > *')].map(temFundo).join(' ');
    const filhos = [...s.querySelectorAll('*')];
    const nEntrada = filhos.filter(temEntrada).length;
    const vida = filhos.some(temVida) || temVida(s);
    if (vida) { dobrasComVida++; if (i >= dobras.length / 2) vidaEmbaixo++; }
    entradas.push(nEntrada);

    const linha = {
      entrada: nEntrada,
      vida:    vida ? 'sim' : 'nao',
      materia: /url\(/.test(fundos) ? 'sim' : 'NAO',
      luz:     /radial-gradient/.test(fundos) ? 'sim' : 'NAO',
    };
    cobertura[nome] = linha;
    if (!nEntrada && !vida && linha.materia === 'NAO' && linha.luz === 'NAO') nuas.push(nome);
  });

  console.log('Cobertura por dobra (o piso é por dobra, não por página):');
  console.table(cobertura);

  if (nuas.length) {
    console.warn(`${nuas.length} dobra(s) sem tratamento nenhum: ${nuas.join(', ')}`);
    abaixo += nuas.length;
  }

  /* Densidade: o defeito não é ausência, é desistência. Compara a metade de
     cima com a de baixo. */
  if (entradas.length >= 4) {
    const meio = Math.ceil(entradas.length / 2);
    const media = (a) => a.reduce((x, y) => x + y, 0) / (a.length || 1);
    const cima = media(entradas.slice(0, meio));
    const baixo = media(entradas.slice(meio));
    console.log(`Densidade de entrada: ${cima.toFixed(1)} por dobra em cima, ${baixo.toFixed(1)} embaixo.`);
    if (baixo < cima * 0.6) {
      console.warn('O acabamento despenca no terço final. Presente não basta, tem que ser parelho.');
      abaixo++;
    }
  }

  if (dobrasComVida && dobrasComVida < 3) {
    console.warn(`Movimento de vida em só ${dobrasComVida} dobra(s). Se o topo tem vida, pelo menos três precisam ter.`);
    abaixo++;
  } else if (dobrasComVida >= 3 && !vidaEmbaixo) {
    console.warn('Todo o movimento de vida está na metade de cima. A página morre ao descer.');
    abaixo++;
  }

  console.log(abaixo === 0
    ? 'Piso de acabamento atingido, e o tratamento chega na última dobra.'
    : `${abaixo} problema(s). Conserte, ou escreva no PROJETO.md por que essa página fica abaixo. Comece pelas dobras de baixo: é lá que o acabamento morre.`);
})();
