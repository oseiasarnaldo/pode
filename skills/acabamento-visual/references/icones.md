# Ícones: um conjunto, um peso, duas camadas

Descoberta útil: numa página de vendas cara, o que parecia ilustração
encomendada era **Phosphor Icons no peso Duotone**. Os SVGs ainda carregavam os
nomes originais do pacote (`rocket-launch`, `microphone-stand`,
`chart-line-up`) e a marca `Weight=Duotone` no `<g>`. Vale abrir o código de
qualquer página que você admira antes de concluir que aquilo foi desenhado do
zero.

---

## 1. Por que o duotone parece caro

Dois motivos, nenhum deles é o desenho:

1. **Duas camadas na mesma cor.** O traço principal cheio e uma segunda camada
   (a "sombra" do objeto) com 55% de opacidade. Dá volume sem virar ilustração
   3D e sem sair da paleta.
2. **O chip.** O ícone nunca fica solto no texto: senta num quadrado de canto
   arredondado, 40 a 52 px, fundo um passo mais claro que a dobra, borda de
   1 px quase invisível. O chip é o que alinha tudo; o ícone é detalhe.

Regra dos 12 erros, item 7: ícones de bibliotecas diferentes na mesma tela
denunciam amador. Duotone só funciona se **todos** forem duotone.

---

## 2. Qual biblioteca

| Biblioteca | Pesos | Duotone | Veredito |
|---|---|---|---|
| **Phosphor** | thin, light, regular, bold, fill, duotone | sim | padrão desta skill |
| Solar (Iconify) | linear, bold, duotone, bold-duotone | sim | alternativa, mais cara de app |
| Hugeicons | stroke, duotone, twotone, solid | parte paga | só se já tiver licença |
| Lucide | um traço, espessura ajustável | não | ótimo pra interface, seco pra LP |
| Tabler | outline e filled | não | enorme e coerente, sem a segunda camada |
| Iconoir | um traço | não | elegante, pouco conhecido |

Phosphor: gratuito (MIT), 9.000+ ícones, SVG puro, sem fonte de ícone.

---

## 3. Como usar sem dependência

Baixar o SVG direto do pacote oficial e **inlinar** no HTML (nada de fonte,
nada de script):

```
https://cdn.jsdelivr.net/npm/@phosphor-icons/core@2/assets/duotone/<nome>-duotone.svg
```

O arquivo vem assim: `viewBox="0 0 256 256"`, `fill="currentColor"`, e a camada
secundária é o `<path>` com `opacity="0.2"`. É esse atributo que a gente usa
como gancho no CSS:

```css
.ph { width: 1em; height: 1em; display: block; fill: currentColor; flex: none; }
.ph path[opacity] { opacity: .55; fill: var(--marca-a-hi); }   /* a segunda camada na cor de acento */
.ph-chip { width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center;
  color: #fff; font-size: 22px; background: rgba(255,255,255,.05);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); }
```

Tamanho do ícone vai por `font-size` no chip (o `.ph` mede `1em`). Cor
principal por `color`. Cor da segunda camada por `fill` no `path[opacity]`.

Detalhe de rede: baixar 17 ícones em sequência com `urllib` travou num deles.
Use `curl --max-time 20` por arquivo, ou baixe em lote uma vez e versione a
pasta (`assets/img/ph/`).

---

## 4. Um mapa de uso que funciona

Tamanho e tratamento mudam por função, não por gosto. Um mapa que se repete
bem de página em página:

| Onde | Tamanho do chip | Tratamento |
|---|---|---|
| Dobra da dor | 52 px | ícone grande, segunda camada na cor de acento, é o momento de peso |
| Tabela comparativa | sem chip, 22 px | `check-circle` de um lado, `x-circle` do outro. O "x" com a segunda camada a 45% reprova sem gritar |
| Itens da oferta | 40 px, à esquerda do rótulo | um ícone por item, e o chip ganha tinta no hover |
| Selos de fechamento | inline, 20 px | substitui o `::before` de check, que é o vício mais comum |
| Números de autoridade | 36 px no canto | decorativo, `aria-hidden="true"` |

O que **não** vira ícone de biblioteca: os diagramas que explicam o método
(wireframe, camadas, fluxo). Diagrama explica, ícone rotula. Não misture os
dois papéis.

### Quando o diagrama em SVG "não fica maneiro": vire mini interface

Uma dobra de dor com dois diagramas desenhados à mão (logos com selinhos,
linha do tempo com bolinhas) parecia slide, não página. A troca que funcionou:
**painéis de status em HTML**, na mesma linguagem de uma mini interface. Chip
duotone, nome, pílula de estado. A linha problemática sempre destacada com a
cor de acento a 6% no fundo, borda de acento no chip e pílula piscando devagar.

- Painel 1, um "status": três linhas, duas resolvidas e uma travada, com o
  ícone da ferramenta em cada.
- Painel 2, um "fluxo": quatro barras de progresso. As duas primeiras cheias
  com o tempo ao lado, a terceira parcial com brilho varrendo e o contador
  correndo, a última vazia com "esperando".

Armadilha: dentro de um cartão que já estiliza `<i>` (um número de ordem, por
exemplo), qualquer `<i>` novo herda aquele estilo. Barras e leds em `<span>`.
`prefers-reduced-motion` desliga o brilho e a piscada.

---

## 5. Checklist

- [ ] Uma biblioteca, um peso, em toda a página
- [ ] Ícone inline como SVG, `aria-hidden="true"` quando é decorativo
- [ ] Segunda camada na cor de acento, entre 45% e 55%
- [ ] Chip com o mesmo raio e a mesma borda em todos os lugares
- [ ] Diagrama continua diagrama; ícone só rotula
