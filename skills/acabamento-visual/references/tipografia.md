# Tipografia

## Uma família, quatro pesos

Trocar de fonte para criar contraste é o atalho de quem não sabe usar a que já
tem. Uma família bem explorada (400, 500, 600, 700) cobre qualquer hierarquia.

Se você acha que precisa de uma segunda família, o que você precisa é de mais
diferença de **tamanho** entre os níveis.

## O leading é o segredo

Esta é a decisão que mais muda a percepção de qualidade, e a mais barata:

| Papel | Line-height | Efeito |
|---|---|---|
| Display (título de dobra) | **1,05 a 1,15** | cara editorial, de revista |
| Título de card | 1,2 a 1,3 | compacto e legível |
| Corpo | 1,5 a 1,6 | confortável para ler |
| Legenda | 1,4 a 1,5 | densa sem sufocar |

Um título de 48px com `line-height: 1.5` tem 24px de ar entre linhas e parece
formulário. O mesmo título com `1.06` parece capa de revista.

Junto com o leading apertado, use `letter-spacing: -.02em` nos tamanhos grandes.
Fonte grande com espaçamento normal parece esticada.

## Sem caixa alta em título

Caixa alta em título é o recurso de quem quer "força" sem saber onde buscar. Ela
custa legibilidade (a forma da palavra desaparece) e envelheceu.

Onde caixa alta **funciona**, sempre com `letter-spacing` positivo:

- rótulo acima do título (eyebrow), 12px, peso 700, tracking 1,4px
- texto de botão, 13px, peso 700, tracking 0,6px
- tag e etiqueta, 10 a 11px
- legenda de número em painel de dados

Regra: **caixa alta é para rótulo, nunca para título.**

## Escala fluida, sem degraus congelados

O erro clássico: definir um tamanho fixo no mobile e outro no desktop, e deixar
o meio da faixa congelado.

```css
/* ERRADO: fica 26px de 360 a 767, e pula para 48 */
.display { font-size: 1.625rem; }
@media (min-width: 768px) { .display { font-size: 3rem; } }

/* CERTO: escala continuamente */
.display { font-size: clamp(1.625rem, 1.05rem + 2.5vw, 3rem); }
```

Com o `clamp`, um tablet de 600px recebe cerca de 32px, proporcional. Com o
degrau, ele recebe 26px, menor que o corpo do hero ao lado.

**Como montar o clamp:** `clamp(mínimo, base + fator vw, máximo)`. O fator `vw`
controla a velocidade. Comece com `2.5vw` para display e ajuste.

## `text-wrap: balance`

Uma linha de CSS que resolve título com uma palavra órfã na última linha:

```css
.display, h1, h2 { text-wrap: balance; }
```

O navegador redistribui as quebras para equilibrar as linhas. Funciona só em
blocos curtos (até 4 linhas), que é exatamente o caso de título.

## Dois designs de título, não um responsivo

Em telas pequenas, um título de dobra pode mudar mais do que só o tamanho:
alinhamento, peso e até a caixa. Não tenha medo de escrever dois tratamentos.

Só cuidado para não congelar a escala no meio do caminho (ver acima).

## Comprimento de linha

Corpo de texto entre **45 e 80 caracteres** por linha. Além de 80 o olho se
perde no retorno; abaixo de 45 quebra demais.

```css
.lead { max-width: 58ch; }   /* ch = largura do "0" na fonte atual */
```

Use `ch`, não `px`: a medida acompanha a fonte automaticamente.

---

## Checklist

- [ ] Uma família tipográfica
- [ ] No máximo quatro pesos
- [ ] Display com leading entre 1,05 e 1,15
- [ ] `letter-spacing` negativo nos tamanhos grandes
- [ ] Nenhum título em caixa alta
- [ ] Caixa alta só em rótulo, com tracking positivo
- [ ] Escala em `clamp`, sem degrau congelado
- [ ] `text-wrap: balance` nos títulos
- [ ] Corpo entre 45 e 80 caracteres por linha
