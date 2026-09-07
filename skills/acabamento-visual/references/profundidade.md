# Profundidade, sombra e textura

A camada mais ignorada, e a que mais separa profissional de amador. Uma página
com sistema de cor e tipo corretos ainda parece chapada sem isto.

---

## 1. Sombra

### O problema da sombra genérica

```css
box-shadow: 0 4px 6px rgba(0, 0, 0, .1);   /* em tudo */
```

Sombra igual em todos os elementos é o mesmo que sombra em nenhum: some a
hierarquia. E `rgba(0,0,0,.1)` sobre fundo colorido vira cinza sujo.

### Sombra em camadas

Sombra real tem **duas partes**: um contato próximo e duro, e uma difusão longa
e suave.

```css
/* elevação baixa: card em repouso */
box-shadow:
  0 1px 2px rgba(10, 12, 15, .12),
  0 2px 8px rgba(10, 12, 15, .08);

/* elevação alta: card em hover, modal */
box-shadow:
  0 2px 4px rgba(10, 12, 15, .16),
  0 18px 40px rgba(10, 12, 15, .32);
```

### A sombra herda a cor do fundo

Preto puro sobre fundo azulado vira mancha cinza. A sombra deve ser uma versão
**mais escura e mais saturada** do fundo:

```css
/* fundo grafite azulado */
--shadow-cor: rgba(10, 12, 15, .32);   /* escuro, com o mesmo viés frio */
```

### Sombra colorida no elemento de destaque

Só no CTA principal, e só no hover. A cor vem da própria cor do botão:

```css
.btn--primary:hover {
  box-shadow: 0 10px 30px color-mix(in srgb, var(--marca-b) 28%, transparent);
  transform: translateY(-2px);
}
```

### Sombra em fundo escuro é luz, não sombra

Em interface dark, sombra quase não aparece. Para elevar um elemento, use uma
**borda interna clara** em vez de sombra:

```css
box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .07);
```

Isso simula a luz batendo na borda superior de um objeto elevado.

---

## 2. Scrim: a camada que faz texto ler sobre imagem

Um scrim é o véu escuro entre a imagem de fundo e o texto. Quase todo mundo usa
**um** gradiente. Um só não basta.

```css
/* ERRADO: escurece tudo por igual, mata a imagem */
background: rgba(0, 0, 0, .5);

/* CERTO: três camadas, cada uma com um trabalho */
background:
  /* 1. horizontal: protege a coluna de texto à esquerda */
  linear-gradient(90deg, rgba(20,24,30,.97) 0%, rgba(20,24,30,.62) 62%, rgba(20,24,30,.42) 100%),
  /* 2. vertical de baixo: assenta o conteúdo no rodapé */
  linear-gradient(to top, rgba(20,24,30,.92) 0%, rgba(20,24,30,.30) 42%),
  /* 3. topo: dá contraste para o menu */
  linear-gradient(180deg, rgba(20,24,30,.55) 0%, transparent 22%);
```

> **Se o fundo for vídeo**, o scrim precisa aguentar **qualquer frame**, não só
> o primeiro. Um dolly-in que aproxima e clareia vai furar um scrim calibrado no
> frame inicial. Teste no meio e no fim do clipe.

---

## 3. Blend modes

`mix-blend-mode` é a ferramenta mais subutilizada de CSS. Dois usos que valem:

### `screen`: apaga o preto

Sobre fundo escuro, `screen` faz o preto da camada virar transparente. Serve
para colocar brilho, luz e fumaça sem precisar de canal alfa:

```css
.glow {
  background: radial-gradient(circle, color-mix(in srgb, var(--marca-a) 42%, transparent), transparent 70%);
  mix-blend-mode: screen;
}
```

**Só funciona sobre fundo escuro.** É por isso que a dobra que usa `screen`
costuma ser a mais escura da página.

### `luminosity`: uniformiza logos de cores diferentes

```css
.logos img { mix-blend-mode: luminosity; opacity: .7; }
```

Transforma logos coloridos em monocromáticos sem editar arte nenhuma.

### As duas armadilhas do blend

**1. `opacity` mata `mix-blend-mode`.** Aplicar opacity a um elemento cria um
grupo de composição isolado, e o blend passa a acontecer dentro desse grupo, não
contra o fundo real.

```css
/* ERRADO: o blend não acontece */
.glow { mix-blend-mode: screen; opacity: .7; }

/* CERTO: atenue com filter */
.glow { mix-blend-mode: screen; filter: brightness(.7); }
```

**2. `transform` e `animation` criam stacking context.** Um elemento dentro de
um contêiner animado blenda contra esse contêiner, não contra a página. Se o
blend "não funciona" e o pai tem `transform`, é isso.

Quando não der para evitar, resolva na origem: processe a imagem com alfa de
verdade em vez de contar com o blend.

---

## 4. Máscara: conter o que vaza

Toda camada de luz é retangular. Sem máscara, a luz vaza e aparece um corte reto
na borda:

```css
.glow {
  mask-image: radial-gradient(circle at 50% 50%, #000 34%, transparent 70%);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 34%, transparent 70%);
}
```

Mesma lógica para o marquee de logos, onde os elementos precisam nascer e morrer
em fade nas bordas:

```css
.marquee::before, .marquee::after {
  content: ""; position: absolute; top: 0; bottom: 0;
  width: clamp(48px, 9vw, 150px); z-index: 2; pointer-events: none;
}
.marquee::before { left: 0;  background: linear-gradient(90deg,  var(--fundo), transparent); }
.marquee::after  { right: 0; background: linear-gradient(270deg, var(--fundo), transparent); }
```

---

## 5. O divisor de dobra

Uma linha de 1px que marca a virada de assunto. Três camadas:

```css
.divisor {
  position: relative;
  z-index: 5;                      /* OBRIGATÓRIO: sem isto o derrame fica
                                      atrás do fundo opaco da seção seguinte */
  height: 1px;
  /* 1. a linha. O BRANCO no meio é o que a faz parecer ACESA */
  background: linear-gradient(90deg,
    transparent 0%,
    color-mix(in srgb, var(--marca-a) 20%, transparent) 10%,
    color-mix(in srgb, var(--marca-b) 75%, transparent) 34%,
    #fff 50%,                       /* o branco no meio é o que ACENDE */
    color-mix(in srgb, var(--marca-b) 75%, transparent) 66%,
    color-mix(in srgb, var(--marca-a) 20%, transparent) 90%,
    transparent 100%);
}
/* 2. o halo: a mesma linha desfocada, só no miolo */
.divisor::before {
  content: ""; position: absolute; left: 50%; top: 50%;
  width: min(52%, 620px); height: 5px;
  transform: translate(-50%, -50%);
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--marca-b-hi) 70%, #fff) 50%, transparent);
  filter: blur(5px);
}
/* 3. o derrame: a elipse é MAIS ESTREITA que o box (68% de 94%),
      senão encosta na borda e aparece corte reto */
.divisor::after {
  content: ""; position: absolute; left: 50%; top: 0;
  width: min(94%, 1200px); height: 190px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse 68% 100% at 50% 0%,
    color-mix(in srgb, var(--marca-b) 22%, transparent) 0%, transparent 78%);
}
```

**Se o divisor for um `<hr>`, declare `overflow: visible`.** A folha de
estilo padrão do Chrome põe `overflow: hidden` em `<hr>`, e o halo e o
derrame (que vivem em pseudo-elementos maiores que a caixa de 1px) somem
sem erro nenhum: sobra só a linha, e ela parece "fraca demais". Achado
numa LP, pintando o `::after` de vermelho pra provar que ele existia.

**Variante para virada escuro → claro:** inverta o derrame para cima. Luz sobre
branco vira sujeira; sobre o escuro de cima, vira brilho.

```css
.divisor--sobe::after {
  top: auto; bottom: 0;
  background: radial-gradient(ellipse 68% 100% at 50% 100%, color-mix(in srgb, var(--marca-b) 26%, transparent), transparent 78%);
}
```

Use nas **viradas de assunto**, não entre toda dobra. Repetido demais, morre.

---

## 6. Textura

Fundo chapado parece plástico. Duas maneiras baratas de dar matéria:

**Grão sutil**, via SVG inline, sem arquivo externo:

```css
.textura::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  opacity: .035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

**Vinheta**, que concentra o olho no centro:

```css
box-shadow: inset 0 0 180px 40px rgba(10, 12, 15, .5);
```

Ambos ficam entre 2% e 5% de intensidade. Se dá para ver que existe, está forte
demais.

---

## Checklist

- [ ] Sombra em duas camadas, não uma
- [ ] Cor da sombra herdando o viés do fundo, não preto puro
- [ ] Em fundo escuro, elevação por borda interna clara
- [ ] Scrim em três camadas, testado no pior frame se for vídeo
- [ ] `mix-blend-mode` sem `opacity` no mesmo elemento
- [ ] Camada de luz contida por máscara radial
- [ ] Divisor com `z-index` e elipse mais estreita que o box
- [ ] Textura e vinheta entre 2% e 5%
