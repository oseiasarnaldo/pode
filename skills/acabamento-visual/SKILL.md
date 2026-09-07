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

## Antes da primeira linha de HTML

**Rode estes comandos na pasta do projeto. Levam um segundo e evitam o
retrabalho mais caro do método.**

```bash
grep '^Status' COPY.md
grep -n '\[confirmar:' COPY.md
grep -n 'Fotos próprias\|Cores da marca\|Tipografia' PROJETO.md
```

Depois obedeça a tabela, **mesmo que a pessoa tenha acabado de dizer "pode
ir"**:

| O que voltou | O que você faz |
|---|---|
| O segundo comando devolveu linhas, e o Status não é `liberado` | **PARE. Não escreva HTML nesta resposta.** Mostre a lista de pendências e pergunte: resolve agora, ou a página sobe com esses buracos à mostra? |
| Status não é `liberado`, mas nenhuma pendência sobrou | Siga. Escreva `Status: liberado` no arquivo e **diga que escreveu** |
| Status é `liberado` | Siga |
| O terceiro comando não devolveu cor de marca | Você não inventa cor de marca. Veja "De onde vem o texto, e de onde vem a marca" |

**"Pode ir" autoriza o trabalho, não apaga uma pendência que a pessoa não viu.**
Mostrar a lista custa uma mensagem. Publicar uma página com
`[confirmar: data de início]` no lugar da data custa a venda, e custa a
confiança de quem confiou em você pra revisar.

O `COPY.md` existe justamente pra passar pelas mãos dela antes de virar página.
Pular esse passo esvazia a única etapa do método em que quem vende manda no
texto.

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

### 4. Faça o mapa de imagem, dobra a dobra, antes do HTML

Do mesmo jeito que o mapa de fundos vem antes do conteúdo, **o mapa de imagem
vem antes do layout**. Sem ele, o resultado é sempre o mesmo: um fundo
texturizado e mais nada, e a página fica com cara de rascunho bem diagramado.

> **Fundo texturizado não é o plano de imagem. É a camada zero dele.**

Percorra as dobras do `COPY.md` e decida, uma por uma, **o que carrega
visualmente aquela dobra**:

| Dobra | O que ela costuma pedir |
|---|---|
| Título e abertura | **uma composição, não uma imagem.** Três camadas no mínimo: o motivo principal, algo atrás dele com profundidade, e a luz da marca por cima. Se há expert, é a foto na frente e a demonstração atrás do ombro |
| Proposta de valor | um **diagrama por passo** do método, em vetor, e não um ícone genérico por card |
| Benefícios comparativos | contraste visual entre as duas colunas, não só a tabela: marcador cheio contra vazio, peso diferente, a coluna perdedora dessaturada |
| Prova social | o artefato da prova: print de conversa tratado, painel de números, foto real de quem fala |
| Torre de oferta | um ícone por item, o mesmo conjunto e o mesmo peso, mais o cartão de fechamento com tratamento próprio |
| Garantia | um selo, em vetor, com o prazo em número grande |
| FAQ e fechamento | pode ser a única dobra sem peça. Se for, diga que foi escolha |

**A regra de suficiência:** conte as dobras que pedem apoio visual e conte as
peças do seu mapa. Se o segundo número for muito menor, o mapa não está pronto.
Uma página de sete dobras costuma pedir de **cinco a nove peças**, entre
composição, diagrama, selo, painel e conjunto de ícones.

"Nada" é resposta legítima pra uma dobra, mas precisa ser **argumentada**, não
ser o que sobrou por falta de plano.

Escreva o mapa no `PROJETO.md` antes de abrir o HTML:

```markdown
## Mapa de imagem
| Dobra | Peça | Origem | Estado |
|---|---|---|---|
| 1 hero | composição em 3 camadas: foto + painel de vidro + luz | foto do cliente + CSS | feito |
| 2 método | 4 diagramas em vetor, um por passo | desenhado | feito |
| 3 comparativo | marcadores duotone + coluna dessaturada | Phosphor | feito |
| 5 torre | 7 ícones em chip | Phosphor | feito |
| 6 garantia | selo vetorial com serrilha | desenhado | feito |
```

### 5. Componha a mídia com um DNA fixo

Se for gerar imagem por IA, escreva **um parágrafo de direção que entra em todos
os prompts**. É isso que faz peças criadas em momentos diferentes parecerem do
mesmo ensaio. A mesma lógica vale sem IA: um vocabulário só de traços faz
diagramas separados lerem como família.

→ `references/midia-ia.md`, e `references/imagem-sem-pagar.md` pra compor sem
gastar

### 6. Prefira diagrama a metáfora onde a pessoa precisa entender

Arte abstrata cria clima. Diagrama explica. Nas dobras onde a pessoa decide se
entendeu, mostre o **artefato**, não a metáfora dele: um wireframe, uma
checklist, uma barra de navegador com o domínio. E desenhe em vetor, porque
legibilidade é alinhamento exato e texto nítido.

→ `references/efeitos.md` (seção 7)

### 7. Audite antes de declarar pronto

Nunca entregue no "acho que está bom". Meça.

→ `references/auditoria-visual.md` e os scripts em `scripts/`

### 8. Efeitos prontos, com o motivo do conserto junto

Parallax de mouse por camadas, dissolver imagem sem recorte, cartões de vidro,
fundo em quatro camadas, selo vetorial com serrilha calculada, sanfona que de
fato anima, infográfico em vetor. Cada um com a armadilha que ele esconde.

→ `references/efeitos.md`

### 9. Hero com o expert: a foto entra no primeiro frame

Se a pessoa que ensina é parte da oferta, a foto dela abre a página em qualquer
largura. Demonstração, arte ou animação ficam **atrás do ombro**, apresentadas
por ela, nunca no lugar dela. No mobile, sai o segundo botão para o rosto caber
na primeira tela. Elementos apoiados na foto (mascote, selo) herdam o parallax
dela.

→ `references/hero-expert.md`

### 10. Ícones: um conjunto, um peso, duas camadas

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

## De onde vem o texto, e de onde vem a marca

Você não recebe nada pela conversa. Você **lê dois arquivos da pasta**, sempre,
antes de escrever a primeira linha de HTML:

**1 · `COPY.md`.** A página inteira em texto, uma seção por dobra, cada bloco
com um rótulo (`**H1**`, `**Lead**`, `**Corpo**`, `**Botão**`). Os rótulos são
o mapa da hierarquia: siga o que está escrito, não escolha nível de heading por
tamanho de fonte.

> **Leia o arquivo do disco, não o que você lembra da conversa.** A pessoa pode
> ter editado ontem, em outra sessão, sem você. O que está no disco vence.

> **Só comece se o `Status` do arquivo for `liberado`.** Se estiver `rascunho`
> ou `em revisão`, o texto ainda vai mudar, e desenhar agora é retrabalho.
>
> **Se a pessoa mandar seguir mesmo assim**, faça duas checagens antes:
>
> 1. **Procure `[confirmar:` no arquivo.** Se sobrou algum, **pare e mostre a
>    lista.** Cada um é um buraco que vai aparecer na página publicada, e ela
>    provavelmente não leu o arquivo se eles ainda estão lá. Pergunte se quer
>    resolver agora ou se prefere que a página suba com os buracos marcados.
> 2. **Escreva `Status: liberado` no arquivo você mesmo, e diga que escreveu.**
>    Um arquivo que diz "em revisão" enquanto a página já existe faz a próxima
>    sessão tomar a decisão errada.

**2 · A marca, que veio na letra P.** Logotipo, cores e tipografia estão na
pasta `base/` e registrados no `PROJETO.md`. **Você não escolhe cor de marca**,
você aplica a que já existe: troque o bloco MARCA de `assets/tokens.css` pelas
cores registradas e siga.

Se a tabela de material disser que não há cor definida, aí sim proponha, e diga
que foi proposta sua.

**Se a edição da pessoa quebrou alguma coisa** (a promessa ficou maior que a
entrega, o botão perdeu o valor, a prova sumiu da dobra onde a dúvida nasce),
diga qual é o risco e devolva a decisão pra ela. Não "melhore" o texto dela em
silêncio.

**3 · O plano de imagem, e ele se decide antes do layout.**

Olhe a linha `Fotos próprias` da tabela de material base e resolva **antes** de
escrever HTML, porque isso muda o desenho da dobra, não só o preenchimento dela:

| O que a tabela diz | O que você faz |
|---|---|
| Fotos próprias recebidas | use as fotos. Recorte na proporção em que aparecem, converta pra WebP, e **abra cada uma antes** pra ver se não tem texto queimado |
| Não tem fotos, mas dá pra tirar hoje | **peça a foto do celular**. Numa escola ou num curso ela vale mais que qualquer acervo, porque é prova |
| Não tem fotos, e a camada de mídia está pronta | **gere a arte**, com o DNA de marca em todo prompt |
| Não tem fotos, e a camada de mídia não está pronta | **não pare, e não empurre a conta.** O caminho gratuito resolve a maioria dos casos: `references/imagem-sem-pagar.md` |

Conferir se a camada de mídia existe leva um segundo:

```bash
ls ~/.config/segredos/ 2>/dev/null    # a chave de API está guardada?
command -v ffmpeg cwebp               # as ferramentas de imagem e vídeo existem?
```

**Se não estiver pronta, apresente as duas saídas, nessa ordem, e sem empurrar
a paga:**

1. **De graça.** Fundo em quatro camadas, diagrama em vetor, cartão de vidro e
   textura de ruído resolvem a maioria das páginas sem uma única imagem, e
   deixam o carregamento mais rápido. Se faltar textura específica, o Openverse
   devolve acervo CC0 **sem pedir chave nenhuma**. Tudo em
   `references/imagem-sem-pagar.md`.
2. **Pagando por peça.** Arte sob medida, coerente em série, feita com o DNA da
   marca. Custa por imagem gerada, não assinatura, e o passo a passo está em
   `../setup-ambiente/references/apis.md`.

Diga que a primeira existe **antes** de falar da segunda. Muita gente não vai
querer ligar faturamento pra fazer uma página, e não precisa: a diferença entre
página cara e página de template está nas regras desta skill, não na conta de
API.

O que **nunca** entra, em nenhum dos dois caminhos, é foto de banco de imagem
com gente sorrindo. É o item 6 dos doze erros, e trocar arte gerada por foto de
estoque de pessoa não economiza dinheiro: piora a página.

→ `references/midia-ia.md` pro DNA de prompt, `references/ferramentas.md` pra
instalação

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

- [ ] `COPY.md` lido do disco, com `Status: liberado`
- [ ] Hierarquia vinda dos rótulos do arquivo, não do tamanho de fonte
- [ ] Cor e tipografia vindas da marca registrada, não escolhidas por você
- [ ] Nenhum `[confirmar:` sobrando no `COPY.md`, ou a pessoa avisada dos que sobraram
- [ ] Mapa de imagem escrito dobra a dobra no `PROJETO.md`, antes do HTML
- [ ] Número de peças compatível com o número de dobras que pedem apoio visual
- [ ] O hero é uma composição em camadas, não uma imagem chapada
- [ ] Toda dobra sem peça tem o motivo escrito
- [ ] Se falta a chave de API, o caminho gratuito foi oferecido **antes** do pago
- [ ] Nenhuma foto de banco de imagem
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
