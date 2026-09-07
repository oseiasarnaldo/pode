# Auditoria visual: medir em vez de achar

A diferença entre "acho que está bom" e "está bom" é um número.

**Regra dura: nada é entregue no olhômetro.**

Tudo aqui roda em `localhost`, antes de publicar: contraste, responsivo,
estabilidade e peso do primeiro carregamento. O que só dá pra medir com a URL no
ar (nota de carregamento, mobile real, leitura por agente) é a skill
`entrar-no-ar`, em `../entrar-no-ar/references/auditoria-publicacao.md`.

---

## Por que ler o código não basta

Numa página real, seis defeitos foram encontrados. **Nos seis o código estava
plausível**, e todos só apareceram na tela:

| Defeito | No código parecia | Na tela era |
|---|---|---|
| logos invisíveis | `filter: brightness(0) invert(1)`, correto | retângulos cinzas sólidos |
| blend não funcionando | as duas linhas fazem sentido juntas | `opacity` matava o `mix-blend-mode` |
| layout quebrado no mobile | media query certa | colunas lado a lado, texto sumido |
| faixa invisível | `z-index` declarado | z-index é ignorado em `position: static` |
| luz que não aparecia | gradiente perfeito | ficava atrás do fundo da seção seguinte |
| conteúdo inalcançável | `min-width: 768px`, razoável | iPad tem 820px e não tem hover |

Revisão de código teria aprovado os seis.

---

## Como rodar os scripts

Os dois scripts em `scripts/` são JavaScript puro. Não precisam de instalação.

**Sem terminal:** abra a página, aperte F12, vá em Console, cole o script inteiro
e dê Enter.

**Com Claude Code e MCP do Chrome:** peça ao Claude para rodar via
`evaluate_script`.

---

## O que auditar

### Contraste

Regra WCAG AA: **4,5:1** para texto normal, **3:1** para texto grande (24px, ou
18,66px em peso 700).

`scripts/audita-contraste.js` percorre todo texto da página, resolve o fundo real
(subindo a árvore até achar um ancestral opaco), compõe a cor com o próprio alpha
e devolve só o que reprova. Lista vazia significa página aprovada.

Dois cuidados que fazem o script valer alguma coisa:

1. **Gradiente não tem `backgroundColor`.** Um botão com `background-image`
   devolve transparente e gera falso positivo. O script extrai a parada mais
   clara do gradiente, que é o pior caso para texto branco em cima.
2. **Cor com alpha precisa ser composta com o fundo** antes do cálculo. Branco a
   60% não é branco.

### Responsivo

`scripts/audita-responsivo.js` verifica overflow do documento, elementos
estourando a viewport, alvos de toque e o estado de cada grid.

**Rode uma vez por largura.** Larguras que importam: 360, 390, 430, 600, 768,
1024, 1280.

Dois cuidados:

1. **Emule toque de verdade.** Só redimensionar a janela não basta:
   `@media (hover: hover)` continua verdadeiro no desktop, e o bug do iPad fica
   invisível. No Claude Code, use `emulate` com `390x844x1,mobile,touch`.
2. **Alguns elementos vivem fora da tela por desenho** (marquee, painel mobile,
   `<pre>` com scroll). Sem uma lista de perdoados, o auditor devolve dezenas de
   "estouros" e nenhum é defeito.

### Estabilidade de altura

Se algo troca de conteúdo (carrossel, abas), meça a altura em cada estado:

```js
const alturas = [];
document.querySelectorAll('.bullet').forEach(b => {
  b.click();
  alturas.push(document.querySelector('.copy').offsetHeight);
});
console.log(alturas, 'pulo:', Math.max(...alturas) - Math.min(...alturas));
```

Pulo aceitável: **zero**.

### Peso real

Estimativa não vale. Meça o que o navegador baixou:

```js
performance.getEntriesByType('resource')
  .reduce((a, x) => a + (x.transferSize || 0), 0) / 1024;
```

Referência para uma home densa: até 1,5 MB no primeiro carregamento do desktop,
e abaixo de 600 KB no mobile.

---

## Isole para calibrar

Não recarregue a página inteira para acertar um detalhe. Crie uma página de
teste de trinta linhas com só aquele elemento, em todas as variantes lado a lado.

Isso economiza mais tempo do que qualquer outra técnica desta skill. Um elemento
que levaria dez iterações fica pronto em duas quando você vê as variantes juntas.

Páginas de calibração que valem a pena:

- **uma por componente difícil** (o divisor, o card, o glow)
- **folha de contato** de todas as imagens geradas, para ver coerência de série
- **banco responsivo**: iframes de várias larguras lado a lado

Todas descartáveis. Nenhuma vai para o ar.

---

## Checklist

- [ ] Contraste medido, lista de reprovações vazia
- [ ] Alvo de toque de 44px em toque, medido
- [ ] Overflow horizontal zero em 360, 390, 768 e 1280
- [ ] Toque emulado de verdade, não só janela redimensionada
- [ ] Pulo de altura zero no que troca de conteúdo
- [ ] Peso do primeiro carregamento medido em localhost, não estimado
- [ ] Console sem erro
- [ ] Nenhuma imagem quebrada

Passou nos oito, a página está pronta pra subir. A partir daí é
`entrar-no-ar`, em `../entrar-no-ar/references/auditoria-publicacao.md`: nota de
carregamento, mobile no ar e leitura por agente.
