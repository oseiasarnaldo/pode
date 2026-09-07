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

  const medido = {
    'luz radial':        conta(/radial-gradient/g),
    'entrada no scroll': conta(/data-reveal/g, html),
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
    console.warn(`${semMascara.length} imagem(ns) grande(s) sem máscara:`, semMascara);
  }

  console.log(abaixo === 0
    ? 'Piso de acabamento atingido.'
    : `${abaixo} item(ns) abaixo do piso. Conserte, ou escreva no PROJETO.md por que essa página fica abaixo.`);
})();
