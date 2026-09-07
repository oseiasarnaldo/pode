# Movimento

## Três curvas, e só três

Misturar easing é o que produz aquela sensação de "animação de template". Cada
curva tem um trabalho:

| Curva | Valor | Onde |
|---|---|---|
| **Out-expo** | `cubic-bezier(.22, 1, .36, 1)` | entrada e saída de destaque. Dispara rápido, freia longo |
| **Soft** | `cubic-bezier(.25, .1, .25, 1)` | hover, troca de estado, slide-in. O ease do dia a dia |
| **Linear** | `linear` | **só** loop infinito |

**A regra que mais segura o resultado:** loop infinito é sempre `linear`.
Transição disparada por interação é sempre out-expo ou soft.

Um marquee com `ease-in-out` acelera e desacelera a cada volta, e o olho percebe
o defeito mesmo sem saber nomear.

## Durações por tipo de evento

```css
--dur-micro: .3s;    /* hover, foco, mudança de cor */
--dur-face:  .5s;    /* troca de face, revelação */
--dur-enter: .6s;    /* entrada de bloco no scroll */
--dur-hero:  .85s;   /* troca de slide, transição grande */
/* loop ambiental: de 12s a 52s */
```

Acima de 1 segundo, movimento disparado por clique vira espera. Abaixo de 0,2s,
não é percebido como movimento.

## Anime transform e opacity, mais nada

Só essas duas propriedades são compostas pela GPU. Animar `width`, `height`,
`top`, `left`, `margin` ou `background-color` força recálculo de layout a cada
quadro.

```css
/* ERRADO */
transition: left .3s, width .3s;

/* CERTO */
transition: transform .3s var(--ease-soft), opacity .3s ease;
```

**Exceção prática:** `flex-basis` anima aceitavelmente em poucos elementos, e é
o que permite um item de trilho expandir empurrando os vizinhos.

## Troca de imagem: deslize, não pisque

Um fade puro entre duas imagens parece falha de carregamento. Um deslize curto
com out-expo parece intenção:

```css
.camada { --shift: clamp(44px, 7vw, 96px); }
.camada.entra { transform: translate3d(var(--shift), 0, 0); opacity: 0; }
.camada.sai   { transform: translate3d(calc(var(--shift) * -1), 0, 0); opacity: 0; }
.camada.anima { transition: transform .85s var(--ease-out-expo), opacity .85s ease; }
```

O deslocamento em `vw` mantém a proporção do movimento em qualquer tela.

## Trave a altura do que troca

Se o conteúdo muda (carrossel, abas), **calibre a altura pelo pior caso** e use
`min-height`, nunca `height` fixo:

```css
.copy { min-height: 428px; }   /* medido no slide com mais texto */
```

Com `height` fixo, um texto maior transborda. Sem altura nenhuma, a página pula
a cada troca. `min-height` calibrado resolve os dois.

**Como calibrar:** meça a altura real em cada estado e use o maior.

## `prefers-reduced-motion` não é opcional

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

E no JavaScript, não inicie carrossel automático:

```js
const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduzido) setInterval(proximo, 6000);
```

Isso não é detalhe de acessibilidade: movimento involuntário causa enjoo real em
parte das pessoas.

## Nada some sem JavaScript

Animação de entrada no scroll costuma começar com `opacity: 0`. Se o script
falhar, o conteúdo **desaparece para sempre**.

```css
/* a regra de ocultar só vale se o JS confirmou que roda */
.js [data-reveal] { opacity: 0; transform: translateY(24px); }
.js [data-reveal].visivel { opacity: 1; transform: none; transition: ... }
```

```js
document.documentElement.classList.add('js');   // primeira linha do script
```

---

## Checklist

- [ ] Três curvas no projeto inteiro
- [ ] Loop infinito sempre `linear`
- [ ] Durações vindas de tokens, não números soltos
- [ ] Só `transform` e `opacity` animados
- [ ] Altura travada por `min-height` calibrado no pior caso
- [ ] `prefers-reduced-motion` no CSS e no JS
- [ ] Nada fica invisível se o JavaScript falhar
