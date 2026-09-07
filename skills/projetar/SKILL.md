---
name: projetar
description: Decide o que a página precisa ter, antes de escrever qualquer texto. Use SEMPRE que for planejar uma página de vendas nova, revisar uma que não converte, ou definir a oferta de um produto. Cobre briefing do produto e da marca, estudo de como o mercado faz (convenção e diferenciação), arquitetura da oferta (preço, bônus, garantia, front-end e back-end) e diagnóstico de nível de consciência, e só então a estrutura de dobras. Abre perguntando duas coisas: se e projeto do zero ou uplift de pagina existente (mantendo ou nao copy e imagens), e se o modo e passo a passo ou automatico. Aciona em "vou lançar", "monta a página de vendas", "qual a estrutura", "quanto cobrar", "como montar a oferta", "a página não converte", "melhorar minha landing page", "esqueleto da LP". É a letra P do método P.O.D.E., e vem depois de setup-ambiente. Depois de fechar o projeto, use ofertar-copy pra escrever o texto.
---

# Projetar

A ideia vira planta. Que argumento a página faz, em que ordem, e por que ele
convence **esse** público.

Esta skill decide **o que** a página precisa ter e **o que** está sendo vendido.
Não escreve o texto (`ofertar-copy`), não define o visual
(`acabamento-visual`), não publica (`entrar-no-ar`).

---

## Regra zero: template não é projeto

O erro mais comum é começar pelo esqueleto pronto e depois encher com texto.
Quando você faz isso, o template dita o conteúdo, e o resultado é uma página que
poderia ser de qualquer negócio.

A ordem certa é a inversa: **primeiro você descobre o que precisa ser dito, e a
estrutura sai disso.** As sete dobras em `references/dobras.md` continuam
existindo, mas como default e como checklist de cobertura, nunca como ponto de
partida.

Sintoma de que você pulou essa etapa: a página está "pronta" e você não sabe
dizer, em uma frase, por que alguém compraria dela em vez do concorrente.

---

## A fronteira com a próxima letra

**P decide a oferta. O escreve a oferta.**

| Isso é P (decisão) | Isso é O (texto) |
|---|---|
| A oferta entra por R$ 189, com bônus e 7 dias de garantia | "Quero minha vaga por R$ 189" no botão |
| Ancorar no valor somado pro preço parecer pequeno | "R$ 780 → R$ 189. Você economiza R$ 591" |
| A objeção principal é medo de não dar conta | "Se você sabe descrever o seu negócio, você faz" |
| O público chega sabendo do problema, não da solução | A headline que fala com quem já tentou builder |

Se você ainda não sabe o preço, os bônus e a garantia, está no P. Se já sabe e
está brigando com a palavra, está no O.

---

## Como conduzir a conversa

Os arquivos abaixo dizem **o que** decidir. Como **conversar** enquanto decide é
um assunto à parte, e é o que separa método certo de experiência boa.

Três regras que valem do primeiro ao último turno:

1. **No máximo três perguntas por vez.** O briefing tem vinte, e elas são
   material de consulta, não roteiro. Despejadas de uma vez, a pessoa desiste
   antes da terceira.
2. **Registre no `PROJETO.md`.** As decisões vão pra um arquivo na pasta, não
   pro histórico da conversa. É o que permite retomar depois sem repetir
   pergunta.
3. **Ao retomar, leia o `PROJETO.md` antes de perguntar qualquer coisa.**

→ `references/conducao.md`

---

## Antes de tudo: três perguntas de abertura

São as primeiras coisas que o agente pergunta, antes do briefing. As três cabem
numa tela, e perguntar depois custa retrabalho.

**1 · Que nome dá pro projeto?**

É o que vira a pasta, criada **dentro do diretório em que a pessoa abriu o
agente**. Onde os projetos dela moram é escolha dela, não sua.
Converta pra minúsculas com hífen, mostre o resultado e siga: nome de pasta não
é decisão de negócio.

**Antes de criar, veja se a pasta já existe.** Se existir com um `PROJETO.md`
dentro, é **retomada**: leia o arquivo inteiro antes de perguntar qualquer
coisa, e continue da etapa seguinte.

**2 · É projeto do zero ou uplift de uma página que já existe?**

No uplift, vêm duas perguntas junto: mantém a copy? mantém as imagens? A
resposta pode ser "em parte", e aí se marca bloco a bloco. Reescrever tudo é a
resposta preguiçosa, e costuma jogar fora copy que já foi testada com tráfego.

→ `references/tipo-de-projeto.md`

**3 · Modo passo a passo ou automático?**

No passo a passo, o agente para no fim de cada etapa e pede permissão pra
seguir. No automático, ele concentra todas as perguntas aqui no P, pede um
único aval quando o projeto estiver fechado, e vai direto até o D.

→ `references/modos-de-operacao.md`

> Mesmo no automático existem paradas obrigatórias: o aval no fim do P, antes
> de publicar, e qualquer coisa irreversível. Automático é não perguntar sobre
> execução, não é decidir no lugar da pessoa.

---

## O método, em ordem

### 1 · Peça o material base

Logotipo, cores, fotos, apresentação institucional, o site e o Instagram. Quem
já tem negócio já tem coisa pronta, e trabalhar sem olhar produz uma página que
não parece da empresa.

Peça **agora**, junto do briefing, porque material demora a chegar. Pedir na
hora de desenhar é o que faz o projeto parar. Salve na pasta `base/` e registre
o estado de cada item no `PROJETO.md`.

→ `references/material-base.md`

### 2 · Entenda o que está sendo vendido

O que o produto é de verdade, pra quem, e o que a marca pode e não pode dizer.
Parece óbvio e é onde mais se erra: o que o cliente descreve raramente é o que a
pessoa compra.

→ `references/briefing.md`

### 3 · Veja como o mercado faz

A pessoa descreve o negócio e a concorrência, e você vai **olhar de verdade**,
na internet. Dois objetivos em tensão proposital:

- **Não ser tão diferente** que a pessoa não entenda o que está vendo. Uma
  página pode ser boa e ilegível ao mesmo tempo.
- **Não ser tão igual** que vire commodity, e a decisão caia no preço.

Convenção pra ser entendido, diferenciação pra ser escolhido.

→ `references/estudo-de-mercado.md`

### 4 · Monte a oferta

O que entra, por quanto, com que bônus e que garantia. E a conta por trás: essa
venda precisa dar lucro sozinha, ou o lucro está na próxima?

Essa decisão muda tudo o que vem depois. Oferta de entrada barata e oferta de
ticket alto não pedem a mesma página.

→ `references/arquitetura-de-oferta.md`

### 5 · Descubra em que ponto a pessoa chega

Quem clica no anúncio não sabe o que você sabe. Descobrir **quanto** ela já sabe
é o que define por onde a página começa. Público que nem sabe que tem o problema
precisa de uma página completamente diferente de quem já está comparando
fornecedor.

Daí sai o **argumento**: a sequência de ideias que leva do que ela pensa hoje
até a compra.

→ `references/consciencia-e-argumento.md`

### 6 · Só então, a estrutura

Com os quatro anteriores fechados, a ordem das dobras é quase automática. Use o
default quando o argumento não pedir outra coisa, e use o checklist pra
garantir que nenhuma função ficou descoberta.

→ `references/dobras.md`

---

## A saída desta skill

Antes de passar pra `ofertar-copy`, você precisa ter, por escrito:

1. **O tipo de projeto e o modo**, decididos nas perguntas de abertura.
1. **O material base**: o que foi recebido, o que não existe, e a cor e a
   tipografia da marca definidas.
2. **O que é o produto**, em uma frase que a pessoa que vai comprar reconheceria.
3. **A ficha da oferta**: o que entra, preço, bônus, garantia, prazo.
4. **A tabela de convenção contra diferenciação**: o que seguir do mercado e o
   que quebrar de propósito.
5. **O argumento**: a sequência de ideias, do que ela pensa hoje até a compra.
6. **O mapa de dobras**: a ordem, com o que cada dobra precisa resolver.

Sem esses seis, a copy vira chute bem escrito.

---

## O que essa skill NÃO faz

- **Não escreve headline nem texto de venda.** Isso é `ofertar-copy`.
- **Não decide cor, tipografia nem layout.** Isso é `acabamento-visual`.
- **Não publica.** Isso é `entrar-no-ar`.
- **Não inventa dado de mercado.** O estudo é feito olhando páginas reais, e o
  que não foi verificado entra marcado como suposição.

---

## Antes de pedir permissão pra seguir

**Mostre o que você fez, como checklist marcada.** A pessoa não tem como saber
se o trabalho aconteceu ou se você só disse que aconteceu.

```
✓ <o resultado, não a tarefa>
✓ <outro resultado>
✓ PROJETO.md atualizado
○ <o que não passou, com o motivo>
○ <o que está esperando resposta dela>
```

Quatro regras: de cinco a oito linhas; **o que não passou aparece com `○` e o
motivo**, nunca escondido; cada linha diz o resultado ("4 concorrentes
abertos"), não a tarefa ("fiz o estudo de mercado"); e nada de item de processo
tipo "li os arquivos".

Depois da checklist vêm três linhas: **a decisão** que isso trava e o porquê,
**o que vem agora**, e **posso seguir?**

---

## Checklist

- [ ] Nome do projeto perguntado, pasta criada, e checado se já existia
- [ ] Perguntado se é do zero ou uplift, e o escopo do uplift definido
- [ ] Perguntado o modo: passo a passo ou automático
- [ ] `PROJETO.md` criado, e atualizado a cada etapa
- [ ] Material base pedido no começo, salvo em `base/`, e com estado registrado
- [ ] Site e Instagram de fato abertos, não só anotados
- [ ] Cor e tipografia da marca resolvidas, nem que seja por extração do logo
- [ ] Briefing fechado sem despejar as vinte perguntas de uma vez
- [ ] Pelo menos três concorrentes olhados de verdade, não presumidos
- [ ] Tabela de convenção contra diferenciação escrita
- [ ] Ficha da oferta completa: preço, bônus, garantia, prazo
- [ ] Definido se a venda se paga sozinha ou se o lucro vem depois
- [ ] Nível de consciência do tráfego identificado, com base em de onde ele vem
- [ ] Argumento escrito como sequência, não como lista de tópicos
- [ ] Mapa de dobras derivado do argumento, não copiado do default
- [ ] As sete funções do checklist de cobertura têm resposta na página
- [ ] Passar pra `ofertar-copy` com os seis itens da saída por escrito
