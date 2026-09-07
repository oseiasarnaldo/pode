---
name: acabamento-visual
description: Aplica o acabamento que separa uma página "feita por IA" de uma que parece cara. Use SEMPRE que for criar ou melhorar qualquer interface visual, landing page, site, página de vendas, dashboard, apresentação ou componente. Cobre paleta e proporção de cor, escala tipográfica, ritmo de fundo, profundidade e sombra, textura, blend modes, movimento, e composição de imagem e vídeo gerados por IA. Aciona também em "melhora o design", "está com cara de template", "deixa mais profissional", "parece feito por IA", "revisa o visual", "por que isso parece amador". E a letra D do metodo P.O.D.E.: vem depois de ofertar-copy e entrega pra entrar-no-ar, que publica e audita.
---

# Acabamento visual

O que separa uma página que parece cara de uma que parece template não é
criatividade. É **um punhado de decisões repetidas com disciplina**, e a maioria
delas é mensurável.

Esta skill é o conjunto dessas decisões.

---

## Regra zero: as três constantes

Trave isto antes de escrever a primeira linha. Não é preferência estética, é o
mecanismo que faz a página parecer coerente.

> **Uma família tipográfica. Duas cores de marca. Três curvas de easing.**

Toda vez que a página parece bagunçada, é porque uma dessas três foi violada.

---

## Os 12 erros que denunciam trabalho amador

Rode esta lista **antes** de entregar. Se algum item bate, corrija antes de mostrar.

| # | Erro | Correção |
|---|---|---|
| 1 | Título em CAIXA ALTA porque "fica forte" | tamanho + peso 700 + leading apertado. Caixa alta só em rótulo |
| 2 | `line-height` de 1.5 no título | display pede 1,05 a 1,15. 1.5 é para corpo |
| 3 | Mais de duas cores de marca | 90% neutro, 10% acento. O resto são tons do neutro |
| 4 | Gradiente roxo para azul | é o gradiente default de todo template desde 2018 |
| 5 | `box-shadow: 0 4px 6px rgba(0,0,0,.1)` em tudo | sombra genérica em tudo é o mesmo que sombra em nada |
| 6 | Foto de banco com gente sorrindo apontando para tela | ou imagem própria, ou objeto/textura abstrata, ou nada |
| 7 | Ícones de bibliotecas diferentes na mesma tela | um conjunto só, mesma espessura de traço |
| 8 | Easing misturado (ease-in-out num loop, linear num hover) | loop é sempre `linear`, interação é sempre out-expo ou ease |
| 9 | Texto cinza-claro sobre branco | abaixo de 4,5:1 reprova. Meça, não estime |
| 10 | Todas as dobras alternando claro e escuro | ritmo é blocos, não zebra |
| 11 | Cards de alturas diferentes na mesma linha | altura travada ou conteúdo padronizado |
| 12 | Emoji no lugar de ícone em interface séria | emoji renderiza diferente em cada sistema |

---

## O método, em ordem

### 1. Defina o sistema antes do layout

Escreva os tokens primeiro. Um bloco `:root` com cor, tipo, espaço, raio e curva.
**Nenhum valor de cor literal fora dele.** Se você escreveu um hexadecimal no
meio do CSS, o sistema já quebrou.

Base pronta em `assets/tokens.css`. Troque o `:root` e tudo muda junto.

→ Detalhes em `references/cor.md` e `references/tipografia.md`

### 2. Planeje o ritmo de fundo antes do conteúdo

Desenhe o mapa de dobras claras e escuras **antes** de escrever texto. O fundo é
sinalização de assunto, não decoração.

→ `references/ritmo.md`

### 3. Escolha o tratamento de profundidade

Sombra, blend, textura e vinheta. É a camada que mais separa profissional de
amador, e a mais ignorada.

→ `references/profundidade.md`

### 4. Componha a mídia com um DNA fixo

Se for gerar imagem ou vídeo por IA, escreva **um parágrafo de direção que entra
em todos os prompts**. É isso que faz peças geradas em momentos diferentes
parecerem do mesmo ensaio.

→ `references/midia-ia.md`

### 5. Prefira diagrama a metáfora onde a pessoa precisa entender

Arte abstrata cria clima. Diagrama explica. Nas dobras onde a pessoa decide se
entendeu, mostre o **artefato**, não a metáfora dele: um wireframe, uma
checklist, uma barra de navegador com o domínio. E desenhe em vetor, porque
legibilidade é alinhamento exato e texto nítido.

→ `references/efeitos.md` (seção 7)

### 6. Audite antes de declarar pronto

Nunca entregue no "acho que está bom". Meça.

→ `references/auditoria-visual.md` e os scripts em `scripts/`

### 7. Efeitos prontos, com o motivo do conserto junto

Parallax de mouse por camadas, dissolver imagem sem recorte, cartões de vidro,
fundo em quatro camadas, selo vetorial com serrilha calculada, sanfona que de
fato anima, infográfico em vetor. Cada um com a armadilha que ele esconde.

→ `references/efeitos.md`

### 8. Hero com o expert: a foto entra no primeiro frame

Se a pessoa que ensina é parte da oferta, a foto dela abre a página em qualquer
largura. Demonstração, arte ou animação ficam **atrás do ombro**, apresentadas
por ela, nunca no lugar dela. No mobile, sai o segundo botão para o rosto caber
na primeira tela. Elementos apoiados na foto (mascote, selo) herdam o parallax
dela.

→ `references/hero-expert.md`

### 9. Ícones: um conjunto, um peso, duas camadas

Phosphor Duotone inlinado como SVG, segunda camada na cor de acento a 55%,
sempre dentro de um chip. É o padrão desta skill. Lucide
serve pra interface; pra página de vendas perde a segunda camada.

→ `references/icones.md`

---

## Níveis de ferramenta

A skill funciona em três cenários. Identifique em qual você está e siga o
correspondente.

### Nível 0 · Só o Claude, sem terminal

Você não consegue rodar script nem gerar mídia. Ainda assim:

- Aplique tokens, tipografia, ritmo e profundidade. **Isto é 70% do resultado.**
- Peça ao Claude para calcular contraste manualmente (ele acerta a fórmula WCAG).
- Para mídia, use as diretrizes de `references/midia-ia.md` em qualquer gerador
  de imagem que você tenha, colando o DNA em todo prompt.
- Substitua auditoria automática pelo **checklist manual** ao fim de cada
  arquivo de referência.

### Nível 1 · Claude Code com terminal, sem extras

Some ao nível 0:

- Rode um servidor local: `python3 -m http.server 8000`
- Abra no navegador e **cole os scripts de `scripts/` no console** (F12). Eles
  são JavaScript puro, funcionam em qualquer navegador, sem instalar nada.
- Isso já pega contraste, alvo de toque e overflow.

### Nível 2 · Ambiente completo

Some ao nível 1:

- **MCP do Chrome DevTools**: o Claude vê e mede a página sozinho. Muda o jogo,
  porque quase todo defeito real passa em revisão de código e só aparece na tela.
- **ffmpeg + cwebp**: otimização de vídeo e imagem
- **API de geração** (Gemini, ou outra): mídia sob medida

Instalação em `references/ferramentas.md`.

> **Importante:** o nível 2 melhora a verificação, não o gosto. Uma página feita
> no nível 0 com as regras aplicadas ganha de uma página do nível 2 sem elas.

---

## O que essa skill NÃO faz

Ela cuida de **como a coisa parece**, não de:

- Estrutura de persuasão e arquitetura da oferta → `projetar`
- Texto, headline, prova e objeção → `ofertar-copy`
- Publicação, cache, performance de servidor e leitura por agente → `entrar-no-ar`

Essas são competências vizinhas. Misturar as duas na mesma decisão é o que
produz página bonita que não vende, e página que vende e parece golpe.

Esta é a letra **D** do método P.O.D.E. Ela recebe o texto de `ofertar-copy`,
já com as dobras e a hierarquia identificadas, e entrega pra `entrar-no-ar`
uma página que passou na auditoria visual.

---

## O `PROJETO.md` e o modo definido no P

**Leia o `PROJETO.md` da pasta antes de começar.** Ele tem o tipo de projeto, o
modo, e tudo que já foi decidido. Perguntar de novo o que a pessoa já respondeu
é o jeito mais rápido de perder a confiança dela.

**Atualize o `PROJETO.md`** com o que esta etapa decidir, principalmente o que
fugir do padrão. Daqui a três meses alguém vai olhar uma escolha estranha e
"consertar" o que era proposital.

Sobre o modo: em **passo a passo**, termine cada etapa com resumo, a decisão
principal, o que vem agora, e o pedido de aval. Em **automático**, execute sem
parar, e só interrompa nas paradas obrigatórias (dado de negócio que faltou e
ação irreversível).

→ `../projetar/references/conducao.md` e `../projetar/references/modos-de-operacao.md`

---

## Checklist final

Não entregue sem passar por aqui:

- [ ] Uma família tipográfica, no máximo quatro pesos
- [ ] Duas cores de marca, proporção 90/10 com o neutro
- [ ] Três curvas de easing, loop sempre `linear`
- [ ] Nenhum valor de cor literal fora do `:root`
- [ ] Título sem caixa alta, leading entre 1,05 e 1,15
- [ ] Escala tipográfica fluida, sem congelar entre breakpoints
- [ ] Mapa de fundos em blocos, não zebra
- [ ] Contraste medido: 4,5:1 texto normal, 3:1 texto grande
- [ ] Alvo de toque de 44px em dispositivo de toque
- [ ] Sem overflow horizontal em 360, 390, 768 e 1280
- [ ] `prefers-reduced-motion` respeitado
- [ ] Expert no primeiro frame em 390, 768 e 1440, quando ele é parte da oferta
- [ ] Os 12 erros acima, todos verificados
