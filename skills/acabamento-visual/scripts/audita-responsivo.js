/* Auditoria responsiva. Cole no console, ou rode via chrome-devtools MCP.
   Rode UMA VEZ POR LARGURA, e para testar toque de verdade use
   emulate com "390x844x1,mobile,touch" (senao hover:hover sempre da true).

   Verifica: overflow do documento, elementos estourando a viewport,
   alvos de toque pequenos, e como cada grid esta se comportando.        */
(() => {
  const vw = document.documentElement.clientWidth;
  const toque = !matchMedia('(hover: hover)').matches;

  // elementos que vivem fora da tela POR DESENHO, nao sao defeito
  const PERDOADOS = ['#mobilePanel', '.marquee', '.kit-marquee', 'pre'];
  const perdoado = el => PERDOADOS.some(s => el.closest(s));

  const estouros = [];
  document.querySelectorAll('body *').forEach(el => {
    if (perdoado(el)) return;
    if (getComputedStyle(el).position === 'fixed') return;
    const b = el.getBoundingClientRect();
    if (!b.width || !b.height) return;
    if (b.right > vw + 2 || b.left < -2) {
      const c = (el.className || '').toString().split(' ')[0];
      estouros.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (c ? '.' + c : ''));
    }
  });

  const alvos = [];
  document.querySelectorAll('a,button,input,select,textarea,[role="tab"]').forEach(el => {
    if (perdoado(el)) return;
    const b = el.getBoundingClientRect();
    if (!b.width || !b.height) return;
    if (getComputedStyle(el).visibility === 'hidden') return;
    // conta o pseudo de expansao quando existe
    const antes = getComputedStyle(el, '::before');
    const expH = parseFloat(antes.height) || 0, expW = parseFloat(antes.width) || 0;
    const h = Math.max(b.height, expH), w = Math.max(b.width, expW);
    if (h < 40 || w < 40) alvos.push({
      texto: (el.textContent || '').trim().slice(0, 22) || '(sem texto)',
      w: Math.round(w), h: Math.round(h),
      secao: el.closest('section,header,footer,nav')?.id || '(topo)',
    });
  });

  /* Estado dos grids: descobre sozinho, sem seletor fixo.
     Serve para conferir se as colunas degradam como voce planejou. */
  const grids = [];
  document.querySelectorAll('*').forEach(el => {
    const cs = getComputedStyle(el);
    if (cs.display !== 'grid' && cs.display !== 'inline-grid') return;
    const n = cs.gridTemplateColumns.split(' ').filter(Boolean).length;
    if (n < 2) return;                       // 1 coluna nao interessa
    if (el.getBoundingClientRect().width < 200) return;
    const nome = el.id || (el.className || '').toString().split(' ')[0]
                 || el.closest('[id]')?.id || el.tagName.toLowerCase();
    grids.push(`${nome}: ${n} col`);
  });

  /* Titulos: pega leading frouxo, que e o erro tipografico mais comum */
  const leadingFrouxo = [];
  document.querySelectorAll('h1, h2, .display').forEach(el => {
    const cs = getComputedStyle(el);
    const fs = parseFloat(cs.fontSize), lh = parseFloat(cs.lineHeight);
    if (fs >= 28 && lh / fs > 1.25) {
      leadingFrouxo.push(`${el.textContent.trim().slice(0, 28)} (${(lh / fs).toFixed(2)})`);
    }
  });

  return {
    largura: vw,
    modoToque: toque,
    overflowX: document.documentElement.scrollWidth - vw,
    alturaPagina: document.body.scrollHeight,
    estouros: [...new Set(estouros)].slice(0, 10),
    // alvo de toque so importa quando o ponteiro e o dedo
    alvosPequenos: toque ? alvos.slice(0, 12) : `${alvos.length} (ignorados: ponteiro fino)`,
    grids: [...new Set(grids)].slice(0, 12),
    // display com line-height acima de 1.25 tem cara de template
    leadingFrouxo,
  };
})()
