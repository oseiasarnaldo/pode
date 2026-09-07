# Material base: o que pedir antes de decidir qualquer coisa

Quem já tem negócio já tem coisa pronta: logotipo, cores, fotos, um site, um
Instagram com dois anos de post. Trabalhar sem olhar nada disso produz uma
página que não parece da empresa, e é o tipo de erro que a pessoa não sabe
nomear, ela só diz "ficou estranho".

Pedir isso é trabalho da letra **P**, e é aqui pelo mesmo motivo que o resto
está: **é decisão, não execução.** A letra D não escolhe cor, ela aplica a que
já existe.

---

## Regra zero: pedir cedo, e aceitar o que vier

Peça no começo, junto do briefing, **não** na hora de desenhar. Material chega
devagar: a pessoa precisa achar o arquivo, pedir pro designer antigo, lembrar a
senha do Drive. Se você pedir na letra D, o projeto para.

E aceite o que vier. Quase ninguém tem tudo, e faltar material **não trava o
projeto**: trava só a suposição de que existia. O que não vier, você registra
como não existente e resolve de outro jeito, dizendo isso em voz alta.

---

## O que pedir

Três blocos, e não peça os três de uma vez. O primeiro é o que trava a página,
os outros dois enriquecem.

### 1 · Marca (o que trava a letra D)

| Item | Por que importa | Formato bom |
|---|---|---|
| **Logotipo** | vai no topo e no rodapé, e precisa funcionar sobre fundo escuro | SVG, ou PNG com fundo transparente, grande |
| **Cores da marca** | duas cores, não seis. É o que faz a página parecer da empresa | os códigos, ou o manual de marca, ou "tira do logo" |
| **Tipografia** | uma família resolve a página inteira | nome da fonte, ou o arquivo, ou "não tem" |
| **Manual de marca**, se existir | resolve os três de uma vez | PDF |

Se não houver nada disso além do logo: **tire a paleta do próprio logotipo** e
diga que foi isso que você fez. É uma decisão defensável, e a pessoa precisa
saber que ela foi tomada.

### 2 · Prova e conteúdo

| Item | Vira o quê na página |
|---|---|
| **Fotos próprias** (equipe, aula, espaço, produto) | a dobra que não usa banco de imagem, que é o que diferencia |
| **Apresentação institucional** ou proposta comercial | o texto de "quem somos" já escrito, e os números que a empresa usa |
| **Depoimentos, prints de conversa, avaliações** | a dobra de prova social inteira |
| **Números** (anos, alunos, turmas, aprovações) | a autoridade, quando não há depoimento fresco |

### 3 · O que já está no ar

| Item | Pra quê |
|---|---|
| **Site principal** | ver o tom, o que a marca já promete, e o que não pode ser contradito |
| **Instagram** | a linguagem real com que ela fala com o público, e as fotos que existem |
| **Páginas ou campanhas anteriores** | o que já rodou tráfego, e o que já foi testado |
| **Link de checkout ou formulário** | vai no botão, na letra E |

---

## Onde guardar

Uma pasta `base/` dentro do projeto. Sem subpasta, sem organização elaborada:
a pessoa vai jogar arquivo lá dentro e precisa ser fácil.

```
minha-pagina/
├── PROJETO.md
├── base/
│   ├── logo.svg
│   ├── manual-de-marca.pdf
│   ├── apresentacao.pdf
│   └── fotos/
└── COPY.md
```

**Salve você mesmo o que a pessoa mandar.** Se ela colar um link do Drive, baixe
e guarde. Se ela mandar o arquivo pelo chat, escreva na pasta. Material que fica
só na conversa some na sessão seguinte, e aí você pede de novo, que é o jeito
mais rápido de parecer desorganizado.

---

## Olhe o que chegou, não só arquive

Receber não é ler. De cada coisa, extraia e registre:

- **Do logotipo:** as cores exatas, e se ele funciona sobre fundo escuro.
- **Do site:** o tom, a promessa que já está pública, o que a marca chama as
  coisas (se eles dizem "unidade" e você escrever "filial", soa de fora).
- **Do Instagram:** como ela fala com o público de verdade, quais posts tiveram
  mais reação, e que fotos existem pra usar.
- **Da apresentação institucional:** os números que a empresa usa em público, e
  o que ela promete por escrito. Nada além disso vira promessa na página.

O que você extrair vai pro `PROJETO.md`, não fica na sua cabeça.

---

## Registre no `PROJETO.md`

```markdown
## Material base
Pasta: base/

| Item | Estado | Onde |
|---|---|---|
| Logotipo | recebido | base/logo.svg |
| Cores da marca | tirado do logo | #1F4E79 e #E8A33D |
| Tipografia | não tem | vou propor uma na letra D |
| Site | olhado em 07/09 | escola.com.br |
| Instagram | olhado em 07/09 | @escola |
| Fotos próprias | não tem | vai precisar de arte gerada |
| Depoimentos | pendente | ela vai pedir pro time comercial |
```

A coluna `Estado` tem quatro valores, e cada um manda numa consequência
diferente: `recebido`, `pendente` (vai chegar), `não tem` (não existe, e a
página se vira sem), `olhado` (é link, você foi ver).

---

## O que fazer quando falta

| Falta | O que você faz |
|---|---|
| Logotipo | pergunte se existe em qualquer lugar (site, Instagram, um PDF antigo). Extrair do site é melhor que não ter |
| Cores | tire do logo, e diga que foi isso |
| Tipografia | proponha uma, e explique em uma linha por que ela combina com o negócio |
| Fotos próprias | avise que a alternativa é arte gerada, e que foto de banco de imagem é o que faz a página parecer igual a todas |
| Depoimento | a prova vira processo, número e tempo de estrada. Nunca invente depoimento |

**Nada disso trava o projeto.** Todos têm saída, e a saída fica registrada.

---

## Checklist

- [ ] Material pedido no começo do P, junto do briefing, não na hora de desenhar
- [ ] Pedido em blocos, nunca a lista inteira de uma vez
- [ ] Pasta `base/` criada, e o que chegou salvo nela por você
- [ ] Link (site, Instagram) de fato aberto e olhado, não só anotado
- [ ] Cores e tipografia definidas, mesmo que por extração ou proposta
- [ ] Tabela de material no `PROJETO.md`, com o estado de cada item
- [ ] O que falta tem saída escrita, e a pessoa sabe qual é
