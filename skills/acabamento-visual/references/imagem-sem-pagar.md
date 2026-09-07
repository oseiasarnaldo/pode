# Imagem sem pagar nada

A geração por IA é o caminho mais rápido e o mais sob medida, mas **não é o
único**, e boa parte das pessoas não vai querer ligar faturamento pra fazer uma
página. Este arquivo é o caminho gratuito, em três níveis.

Comece pelo nível 1. Ele resolve mais do que parece, e é o único que não
depende de conta, chave, limite nem de terceiro nenhum.

---

## Antes de tudo: o erro que o gratuito costuma introduzir

O item 6 dos doze erros é **foto de banco de imagem com gente sorrindo
apontando para tela**. Trocar arte gerada por foto de estoque de pessoa não
economiza dinheiro: **piora a página**, e piora exatamente no lugar onde ela
tenta parecer confiável.

Então a regra que atravessa este arquivo inteiro:

> **Acervo gratuito serve pra textura, ambiente e objeto. Nunca pra pessoa.**
>
> Pessoa na página é ou a pessoa de verdade do negócio, ou ninguém.

---

## Nível 1 · O agente desenha. Zero conta, zero chave, zero custo

É o equivalente exato do que a skill faz com ícone: em vez de comprar
ilustração, ela usa uma biblioteca vetorial gratuita e a colore com a marca.
Com fundo e ambiente dá pra ir além, porque **não precisa nem de biblioteca**.

O que substitui foto, e onde está documentado:

| No lugar de | Use | Onde |
|---|---|---|
| Foto de fundo | fundo em quatro camadas: textura de `feTurbulence` inline, grade em CSS, luz radial da marca, grão | `efeitos.md` seção 4 |
| Foto ilustrando um conceito | **diagrama em vetor**: mostre o artefato, não a metáfora dele | `efeitos.md` seção 7 |
| Imagem de "produto" | cartão de vidro com `backdrop-filter`, mini interface em HTML | `efeitos.md` seções 3 e 9 |
| Selo, garantia, lacre | selo em vetor com serrilha calculada | `efeitos.md` seção 5 |
| Textura de papel, granulado | SVG de ruído inline, opacidade entre 2 e 5% | `profundidade.md` seção 6 |

**Isso não é o plano B.** Uma página inteira feita assim carrega em menos de um
segundo, não tem uma requisição externa, não tem licença pra conferir, e não
tem como parecer com a de outra pessoa, porque nasce das cores da marca.

### E não é uma textura de fundo, é composição

O erro que este nível induz, se lido com pressa, é entregar **um fundo
texturizado e mais nada**. Isso não é o nível 1 feito, é o nível 1 começado.

Sem nenhuma foto, uma dobra de abertura decente tem de **três a cinco camadas
empilhadas**, e cada uma tem função:

```
5. grão por cima de tudo, 2 a 5%          ← tira o aspecto de plástico
4. luz da marca, radial, mascarada        ← o acento, como luz e não tinta
3. o motivo: painel de vidro, mini        ← é isto que dá o que olhar
   interface, diagrama, selo, cartão
2. grade em CSS, mascarada no centro      ← dá escala e profundidade
1. fundo escuro da dobra                  ← a base
```

A camada 3 é a que quase sempre falta, e é a única que a pessoa realmente
"vê". Sem ela sobra um degradê bonito com texto em cima.

**Peças que se desenham sem imagem nenhuma, e rendem mais que foto:**

| Peça | O que é | Onde está |
|---|---|---|
| Mini interface | um retângulo com barra de navegador, o domínio, e barras no lugar do texto | `efeitos.md` seção 9, `icones.md` seção 4 |
| Painel de status | linhas com chip, nome e pílula de estado, uma delas destacada | `icones.md` seção 4 |
| Diagrama de passo | wireframe, checklist, fluxo, tudo em vetor com um vocabulário só de traços | `efeitos.md` seção 7 |
| Cartão de vidro flutuante | `backdrop-filter`, borda de luz, ciclos de flutuação diferentes por cartão | `efeitos.md` seção 3 |
| Selo de garantia | serrilha calculada, número grande, giro lento e linear | `efeitos.md` seção 5 |
| Barras de progresso animadas | uma cheia, uma parcial com brilho varrendo, uma vazia | `icones.md` seção 4 |
| Marquee de logos | com máscara de fade nas duas bordas | `profundidade.md` seção 4 |

Monte **uma peça por dobra que pede apoio visual**, não uma pra página inteira.
O custo é seu tempo escrevendo CSS, e é exatamente o que a skill já faz.

---

## Nível 2 · A foto do celular de quem vende

Antes de procurar imagem na internet, **peça a foto que já existe**. Numa
escola, num curso, num consultório, a foto do lugar de verdade vale mais que
qualquer banco de imagem, e por um motivo que não é estético: **ela é prova**.

O que pedir, e é rápido de tirar:

- o espaço, vazio, com luz natural, na horizontal
- quem ensina, trabalhando, sem posar
- o material, o quadro, a bancada, o produto na mão
- um print de conversa, de resultado, de tela

Celular moderno resolve. O que estraga é flash, contraluz e foto na vertical
pra um espaço que vai aparecer deitado.

Se vier torta, escura ou com fundo bagunçado, o tratamento é o mesmo de sempre:
recorte na proporção em que aparece, máscara pra dissolver a borda, e scrim de
três camadas se for entrar texto por cima. Está em `profundidade.md` e
`efeitos.md`.

---

## Nível 3 · Acervo gratuito por API

Quando faltar textura ou ambiente específico e o nível 1 não cobrir, existem
três acervos com API gratuita. Todos verificados em set/2026.

| Acervo | Precisa de chave? | Limite | O que exige |
|---|---|---|---|
| **Openverse** | **não** | 20 por minuto, 200 por dia | nada, se você filtrar por CC0 |
| **Pexels** | sim, grátis e na hora | 200 por hora, 20 mil por mês | crédito visível: link pro Pexels e ao fotógrafo |
| **Pixabay** | sim, grátis | 100 por minuto | proíbe hotlink, manda baixar pro seu servidor |

### Openverse é o primeiro a tentar, porque não pede nada

Sem cadastro, sem chave, sem e-mail. Uma chamada resolve:

```bash
curl -s "https://api.openverse.org/v1/images/?q=dark%20abstract%20texture&license=cc0,pdm&page_size=5" \
  | python3 -c "import json,sys; [print(r['title'][:40],'|',r['license'],'|',r['url']) for r in json.load(sys.stdin)['results']]"
```

**O filtro `license=cc0,pdm` é o detalhe que importa.** CC0 e domínio público
não exigem crédito nenhum. Sem esse filtro vem CC BY e CC BY-SA, que obrigam a
citar o autor na página, e CC BY-SA ainda contamina o que você derivar dela.

Expectativa honesta: o acervo é de museu e de Flickr, então **textura, céu,
papel, madeira, superfície e objeto isolado saem bem. Arte de hero polida, não.**
Se você precisa de arte de hero polida e não quer pagar, o caminho é o nível 1.

### Pexels e Pixabay, quando a qualidade importar mais

Ambos exigem cadastro grátis e devolvem foto profissional de verdade. A chave
vai no cofre, igual à paga:

```bash
printf 'PEXELS_API_KEY=coloque_a_chave_aqui\n' > ~/.config/segredos/pexels.env
chmod 600 ~/.config/segredos/pexels.env
```

**No Pexels o crédito é obrigatório**, e isso é decisão de página: uma linha
discreta no rodapé resolve, mas ela existe. **No Pixabay o hotlink é proibido**,
e você tem que baixar pro seu servidor, o que o método já manda fazer de
qualquer jeito.

---

## O que fazer com o arquivo depois de baixar

Igual ao que vem de qualquer origem, e não é opcional:

1. **Abra a imagem antes de usar.** Foto de acervo às vezes tem marca d'água,
   texto queimado ou logo no canto.
2. **Corte na proporção em que ela aparece**, não na que veio.
3. **Converta pra WebP** na largura em que é exibida, o dobro pra retina.
4. **Guarde o original fora da pasta que sobe**, em `_raw/`.
5. **Anote a origem e a licença** no `PROJETO.md`, junto do material base. Daqui
   a um ano alguém vai perguntar de onde veio aquela foto.

---

## A decisão, em uma tabela

| Situação | Caminho |
|---|---|
| Tem foto própria, ou dá pra tirar hoje | nível 2, sempre. É prova, e é grátis |
| Precisa de fundo, textura ou ambiente | nível 1. O agente desenha, e fica mais leve |
| Precisa explicar um conceito | nível 1, diagrama em vetor. Nunca foto |
| Precisa de uma textura específica que o CSS não faz | nível 3, Openverse com filtro CC0 |
| Quer arte sob medida, coerente, em série | aí sim a geração paga compensa, e o DNA está em `midia-ia.md` |
| Precisa de foto de pessoa e não tem | **nenhum dos três.** Reescreva a dobra pra não depender de foto de gente |

---

## Checklist

- [ ] Mapa de imagem feito dobra a dobra antes de qualquer coisa
- [ ] Nenhuma dobra ficou só com fundo texturizado por falta de plano
- [ ] Nível 1 tentado antes de procurar imagem em qualquer lugar
- [ ] Foto própria pedida antes de recorrer a acervo
- [ ] Nenhuma foto de estoque com pessoa
- [ ] Openverse filtrado por `license=cc0,pdm`, ou o crédito escrito na página
- [ ] Imagem aberta e conferida antes de entrar
- [ ] Convertida pra WebP na largura real, original guardado em `_raw/`
- [ ] Origem e licença anotadas no `PROJETO.md`
