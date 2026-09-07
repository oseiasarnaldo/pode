# Ritmo e espaço

## O mapa de fundos vem antes do conteúdo

Decida onde a página é escura e onde é clara **antes** de escrever uma linha de
texto. O fundo não é decoração, é **sinalização de assunto**.

## Ritmo é bloco, não zebra

O erro mais comum: alternar claro e escuro a cada dobra. Isso cansa e não
comunica nada, porque a mudança perde significado quando acontece sempre.

```
ERRADO (zebra)          CERTO (blocos)
escuro                  escuro
claro                   escuro
escuro                  escuro
claro                   escuro
escuro                  escuro
claro                   CLARO      ← aqui o assunto muda
                        escuro     ← volta
                        claro
                        claro
```

No exemplo certo, a página fica **cinco dobras no escuro**, quebra no claro
exatamente onde o assunto muda (de "o que fazemos" para "prova"), volta ao
escuro por uma dobra e termina claro.

A quebra clara vale porque é rara. Se acontece a cada dobra, não vale nada.

## Escala de espaço vertical

Três alturas de dobra, não uma:

```css
--section-y-tight: 3.5rem;   /* dobra densa: logos, números */
--section-y:       5.5rem;   /* padrão */
--section-y-loose: 7rem;     /* dobra que precisa respirar: manifesto, CTA */
```

Dobra com o mesmo padding sempre é o que faz a página parecer uma planilha.

## Container e padding lateral

```css
--container: 1320px;   /* largura máxima do conteúdo */
--pad-x:     1.5rem;   /* mobile */
--pad-x-md:  3.5rem;   /* 768px pra cima */
```

O container **não** deve ser 100% da tela em monitor grande. Linha de 1900px de
largura é ilegível.

## Escala de raio

Quatro degraus, cada um com um papel:

```css
--r-btn:   4px;   /* botão e campo */
--r-card:  6px;   /* card de conteúdo */
--r-glass: 12px;  /* painel de vidro */
--r-panel: 18px;  /* container grande */
```

Raio uniforme em tudo achata a hierarquia. Raio aleatório desorganiza. Quatro
degraus com regra resolve.

**Detalhe que quase ninguém faz:** quando um elemento arredondado está dentro de
outro, o raio interno deve ser **menor** que o externo, não igual.

## Espaço entre elementos

Use uma escala, não números soltos: `.375rem`, `.625rem`, `1rem`, `1.5rem`,
`2.5rem`, `4rem`. Se você escreveu `gap: 13px`, provavelmente está corrigindo um
problema de outro lugar.

## Breakpoints: capacidade, não largura

Este é o erro mais caro do responsivo.

Quando a decisão é "tem hover?" ou "é dedo ou mouse?", **pergunte isso**, não a
largura da tela:

```css
/* ERRADO: um iPad tem 820px e NÃO tem hover.
   A informação escondida atrás do hover fica inalcançável. */
@media (min-width: 768px) { .card:hover .verso { opacity: 1 } }

/* CERTO */
@media (hover: hover) and (pointer: fine) {
  .card:hover .verso { opacity: 1 }
}
@media not all and (hover: hover) {
  .card .verso { opacity: 1 }   /* em toque, sempre visível */
}
```

Mesma lógica para alvo de toque:

```css
@media (hover: none), (max-width: 860px) {
  nav a { min-height: 44px; }   /* dedo precisa de 44px, mouse não */
}
```

## Alvo de toque de 44px sem estragar o desenho

Quando o elemento **precisa** ser pequeno (um bullet de 8px, por exemplo), o
alvo cresce por fora com um pseudo invisível:

```css
.bullet { position: relative; width: 8px; height: 8px; }
.bullet::before {
  content: ""; position: absolute;
  left: 50%; top: 50%;
  width: 44px; height: 44px;
  transform: translate(-50%, -50%);
}
```

O visual continua 8px. A área clicável tem 44px.

---

## Checklist

- [ ] Mapa de fundos desenhado antes do conteúdo
- [ ] Ritmo em blocos, não zebra
- [ ] Três alturas de dobra
- [ ] Container com largura máxima
- [ ] Quatro degraus de raio, raio interno menor que o externo
- [ ] Espaço vindo de uma escala
- [ ] `hover` e `pointer` usados onde a pergunta é de capacidade
- [ ] Alvo de 44px em toque, expandido por pseudo quando preciso
