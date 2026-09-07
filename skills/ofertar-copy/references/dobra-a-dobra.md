# O texto de cada dobra

O par de `../projetar/references/dobras.md`. Lá se define **o que** cada dobra
resolve. Aqui, **o que o texto precisa fazer** dentro dela.

Se o argumento pediu uma ordem diferente do default, siga o argumento: o que
importa é que cada função tenha texto que a cumpra.

---

## Dobra 1 · Título e abertura

**O trabalho:** parar o scroll e fazer a pessoa saber, em dois segundos, se
aquilo é pra ela.

**O texto precisa:** entregar o resultado no h1 e a viabilidade no h2, com data
e formato quando existirem. Detalhe em `headline-e-promessa.md`.

**O texto não pode:** começar contando a história da instituição, abrir com
"seja bem-vindo", ou usar o nome do produto como se fosse conhecido.

**Teste:** cubra tudo menos a primeira tela. Dá pra dizer o que é, pra quem, e o
que a pessoa ganha? Se não, essa dobra não está pronta.

**Em educação:** essa dobra é onde mais se perde lead sem perceber. Já
aconteceu de um anúncio ter taxa de clique altíssima e volume baixo de
matrícula, porque o tráfego caía numa página institucional genérica em vez da
página do curso anunciado. A
primeira tela precisa **continuar a conversa exata que o anúncio começou**: se o
anúncio falou de curso técnico noturno, é isso que abre a página, não o nome da
instituição.

---

## Dobra 2 · Proposta de valor

**O trabalho:** fazer entender antes de tentar vender. Ninguém compra o que não
entendeu.

**O texto precisa:** responder cinco coisas, na ordem: o que eu faço por você,
como é feito, por que é diferente, o que muda depois, por que confiar.

O "como é feito" é o mais subestimado. Mostrar o processo em passos nomeados faz
a promessa parecer executável, e a maioria dos concorrentes tem processo e nunca
mostrou.

**O texto não pode:** virar lista de funcionalidade. Cada etapa do método
precisa dizer o que a pessoa **sai com**, não o que ela vai assistir.

**Em educação:** aqui a tentação é listar grade curricular. Grade é o produto,
não o resultado. Um colégio que descreve "carga horária estendida e metodologia
ativa" está falando de si; o mesmo colégio dizendo "seu filho sai do 9º ano
lendo em inglês sem tradução, e você não precisa de professor particular" está
falando com quem paga.

---

## Dobra 3 · Benefícios comparativos

**O trabalho:** transformar afirmação em prova por contraste.

**O texto precisa:** ser objetivo em cada linha. Critério concreto de um lado,
critério concreto do outro. Tempo, custo, esforço, posse.

```
Primeira página no ar    Em uma tarde      Um fim de semana, se tudo encaixar
Mudar um texto depois    Um prompt         Abrir o editor, achar o widget, limpar cache
De quem é o código       Seu               Da plataforma. Parou de pagar, parou
```

**O texto não pode:** atacar o concorrente pessoalmente, nem construir um
espantalho. Comparação contra "os outros que cobram caro e demoram" não convence
quem já ouviu esse discurso.

**A frase que fecha bem:** reconhecer o mérito do outro lado antes de separar.
"Não é que o builder seja ruim, é que ele foi feito pra outra coisa" soa honesto
e desarma a defesa.

---

## Dobra 4 · Prova social

**O trabalho:** tirar a afirmação da sua boca e colocar na de quem já passou.

**O texto precisa:** ser específico. Nome, contexto, número, situação. Um
depoimento com resultado mensurável vale mais que dez elogios.

Quando não há depoimento (produto novo), o texto sustenta com processo e tempo
de estrada, e diz isso com honestidade em vez de fabricar.

**O texto não pode:** usar "centenas de clientes satisfeitos". Isso lê como
enchimento e contamina a credibilidade do resto da página.

---

## Dobra 5 · A oferta

**O trabalho:** empilhar valor até o preço parecer pequeno, e deixar claro o que
fazer.

**O texto precisa:** nomear cada item pelo problema que resolve, mostrar valor
individual, fazer a conta em uma linha, e justificar o preço quando ele for
baixo. Detalhe inteiro em `texto-da-oferta.md`.

**O texto não pode:** listar entregas sem valor ao lado, nem inflar número.

---

## Dobra 6 · Garantia

**O trabalho:** remover o motivo real de não comprar, que é medo de perder
dinheiro.

**O texto precisa:** prazo em número grande, condição em uma frase, e primeira
pessoa assumindo o risco.

**O texto não pode:** ter letra miúda. Toda condição adicional reduz a força da
garantia mais do que protege você.

---

## Dobra 7 · FAQ e contato

**O trabalho:** matar a última objeção específica de quem ainda não decidiu.

**O texto precisa:** usar perguntas reais, que já chegaram de verdade. Resposta
direta na primeira linha, contexto depois. De seis a dez perguntas: menos parece
incompleto, mais começa a repetir.

**O texto não pode:** abrir com "ótima pergunta", inventar pergunta pra parecer
completo, ou responder com evasiva. Uma resposta honesta que diz "isso não é pra
você se..." aumenta a confiança no resto.

**O contato importa tanto quanto o FAQ:** o canal direto pega a dúvida que
nenhuma pergunta pré-escrita cobre. E vale dizer que tem gente do outro lado,
porque hoje isso não é presumido.

---

## O texto que atravessa: os CTAs

Não é dobra, é camada. O botão aparece em pelo menos quatro pontos, e cada um
responde à objeção da dobra onde está. Textos e regra em `texto-da-oferta.md`.

---

## Como entregar pra próxima letra

Tudo isto vai pra um **`COPY.md` único** na pasta do projeto, uma seção por
dobra, cada bloco debaixo de um rótulo em negrito que diz o que ele é: `**H1**`,
`**Lead**`, `**Corpo**`, `**Botão**`. O formato completo está em
`arquivo-de-copy.md`.

Texto entregue como bloco corrido força quem desenha a adivinhar a hierarquia, e
é aí que aparece o `h4` solitário escolhido por tamanho de fonte, que quebra a
árvore de acessibilidade e derruba a nota agêntica.

E o arquivo existe por outro motivo, que é maior: **a pessoa precisa poder abrir
o texto e mexer nele sem medo**, antes de virar página. Enquanto o `Status` do
arquivo não for `liberado`, a letra D não começa.

---

## Checklist

- [ ] Cada dobra tem texto que cumpre a função que `projetar` definiu
- [ ] A primeira tela passa no teste de cobrir o resto
- [ ] O "como é feito" mostra o que a pessoa sai com, não o que vai assistir
- [ ] A comparação usa critério concreto, sem espantalho
- [ ] Prova social é específica ou honestamente substituída
- [ ] FAQ com perguntas reais, resposta direta primeiro
- [ ] CTA em pelo menos quatro pontos, com texto contextual
- [ ] Entregue com dobras e hierarquia identificadas
