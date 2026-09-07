/* Auditoria de contraste WCAG AA. Cole no console da pagina, ou rode via
   chrome-devtools MCP com evaluate_script.

   Nao confia em variavel CSS nem em cor declarada: le o COMPUTED style,
   sobe a arvore ate achar um ancestral com fundo opaco, compoe a cor do
   texto com o proprio alpha e so entao calcula a razao.

   Retorna so o que REPROVA. Lista vazia = pagina aprovada.            */
(() => {
  const parse = c => {
    const m = c.match(/[\d.]+/g);
    return m ? m.slice(0, 3).map(Number).concat([m[3] !== undefined ? +m[3] : 1]) : null;
  };
  const lum = ([r, g, b]) => {
    const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
    return .2126 * f(r) + .7152 * f(g) + .0722 * f(b);
  };
  const razao = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
  };
  /* Fundo efetivo do elemento.

     Sobe a arvore ate achar algo opaco. Trata GRADIENTE: um botao com
     background-image tem backgroundColor transparente, e sem isso o
     script acusa falso positivo contra o fundo da secao. Quando acha
     gradiente, pega a parada MAIS CLARA dele, que e o pior caso para
     texto branco em cima.                                              */
  const doGradiente = cs => {
    const bi = cs.backgroundImage;
    if (!bi || bi === 'none' || !bi.includes('gradient')) return null;
    const cores = [...bi.matchAll(/rgba?\(([^)]+)\)/g)]
      .map(m => m[1].split(',').map(Number))
      .filter(c => c.length >= 3 && (c[3] === undefined || c[3] > .5));
    if (!cores.length) return null;
    // pior caso = parada mais clara
    return cores.reduce((a, b) => (lum(b) > lum(a) ? b : a)).slice(0, 3).concat([1]);
  };

  const fundoDe = el => {
    let n = el;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      const grad = doGradiente(cs);
      if (grad) return grad;
      const c = parse(cs.backgroundColor);
      if (c && c[3] > .85) return c;
      n = n.parentElement;
    }
    const b = parse(getComputedStyle(document.body).backgroundColor);
    return (b && b[3] > .85) ? b : [255, 255, 255, 1];
  };

  const reprovados = [];
  const SEL = 'p,h1,h2,h3,h4,h5,h6,span,li,a,label,figcaption,blockquote,b,strong,td,th,small';

  document.querySelectorAll(SEL).forEach(el => {
    if (!el.textContent.trim()) return;
    // so folhas de texto: se o primeiro filho nao e texto, o pai que responde
    if (el.children.length && !el.childNodes[0].nodeValue?.trim()) return;

    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;

    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.opacity === '0' || cs.display === 'none') return;

    const fg = parse(cs.color);
    if (!fg || fg[3] < .1) return;

    const bg = fundoDe(el);
    const composta = fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]));
    const cr = razao(composta, bg.slice(0, 3));

    const fs = parseFloat(cs.fontSize), fw = +cs.fontWeight;
    const grande = fs >= 24 || (fs >= 18.66 && fw >= 700);
    const minimo = grande ? 3 : 4.5;

    if (cr < minimo) reprovados.push({
      texto: el.textContent.trim().slice(0, 44),
      razao: +cr.toFixed(2), minimo,
      fontSize: cs.fontSize, cor: cs.color,
      secao: el.closest('section,header,footer,nav')?.id || '(topo)',
    });
  });

  // um por combinacao de secao e texto, para nao repetir
  const vistos = new Set();
  const unicos = reprovados.filter(o => {
    const k = o.secao + o.texto;
    if (vistos.has(k)) return false;
    vistos.add(k); return true;
  });

  return { total: unicos.length, reprovados: unicos };
})()
