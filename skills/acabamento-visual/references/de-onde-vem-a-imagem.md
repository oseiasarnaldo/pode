# De onde vem cada imagem

Quatro origens, e só duas dependem de alguém de fora. Escolha o **papel** da
peça primeiro (ambiente, elucidação ou prova, na SKILL.md), porque o papel é
que manda na origem.

| Origem | Custo | Melhor pra | Pior pra |
|---|---|---|---|
| **1 · O agente desenha** | zero, nem conta tem | elucidação, ambiente, selo, diagrama | fotografia de coisa real |
| **2 · Foto de quem vende** | zero | prova, ambiente do lugar, quem ensina | o que não existe pra fotografar |
| **3 · Pixabay** | grátis, com chave grátis | textura, objeto, ambiente genérico | qualquer coisa específica do negócio |
| **4 · Gemini** | paga por peça | arte sob medida, coerente em série | quem não quer ligar faturamento |

A ordem da tabela é a ordem de tentativa. **Só desça um degrau quando o de cima
não resolver**, porque cada degrau adiciona dependência, peso e licença pra
conferir.

---

## Regra que atravessa tudo: pessoa, só a de verdade

O item 6 dos doze erros é foto de banco de imagem com gente sorrindo. Trocar
arte por foto de estoque de pessoa não economiza: **piora a página**, e piora
onde ela tenta parecer confiável.

E tem o lado que não é estético: a licença do Pixabay proíbe uso enganoso, e
avisa que conteúdo com pessoa identificável pode exigir autorização dela. Uma
foto de modelo desconhecido posicionada como "nossa aluna" numa página de
vendas é exatamente o caso.

> **Pessoa na página é ou a pessoa de verdade do negócio, ou ninguém.**

---

## 1 · O agente desenha

É a origem mais forte, e a maioria das páginas fecha só com ela.

Sem nenhuma foto, uma dobra decente tem de três a cinco camadas, e a do meio é
a que quase sempre falta:

```
5. grão por cima de tudo, 2 a 5%          ← tira o aspecto de plástico
4. luz da marca, radial, mascarada        ← o acento, como luz e não tinta
3. o motivo: painel de vidro, mini        ← é isto que a pessoa realmente vê
   interface, diagrama, selo, cartão
2. grade em CSS, mascarada no centro      ← dá escala e profundidade
1. fundo escuro da dobra                  ← a base
```

Peças que se desenham sem imagem nenhuma, e explicam melhor que foto:

| Peça | O que é | Onde está |
|---|---|---|
| Mini interface | barra de navegador, o domínio, barras no lugar do texto | `efeitos.md` seção 9, `icones.md` seção 4 |
| Painel de status | linhas com chip, nome e pílula de estado, uma destacada | `icones.md` seção 4 |
| Quadro de passo | wireframe, checklist, fluxo, com um vocabulário só de traços | `efeitos.md` seção 7 |
| Cartão de vidro flutuante | `backdrop-filter`, borda de luz, ciclos diferentes por cartão | `efeitos.md` seção 3 |
| Selo de garantia | serrilha calculada, número grande, giro lento e linear | `efeitos.md` seção 5 |
| Barras de progresso | uma cheia, uma parcial com brilho varrendo, uma vazia | `icones.md` seção 4 |
| Marquee de logos | com máscara de fade nas duas bordas | `profundidade.md` seção 4 |

**Uma peça por dobra que pede apoio visual**, não uma pra página inteira.

---

## 2 · A foto do celular de quem vende

Antes de procurar qualquer imagem na internet, **peça a que já existe**. Numa
escola, num curso ou num consultório, a foto do lugar de verdade vale mais que
qualquer acervo, e não por estética: **é prova**.

O que pedir, e é rápido de tirar:

- o espaço, vazio, com luz natural, na horizontal
- quem ensina, trabalhando, sem posar
- o material, o quadro, a bancada, o produto na mão
- um print de conversa, de resultado, de tela

Se vier torta ou escura, o tratamento é o de sempre: recorte na proporção em
que aparece, máscara pra dissolver a borda, scrim de três camadas se entrar
texto por cima.

---

## 3 · Pixabay, a fonte gratuita

Cadastro grátis, chave na hora, e o acervo é de foto profissional de verdade.
Serve pra **textura, objeto e ambiente genérico**: madeira, papel, céu,
superfície, uma mesa de trabalho, um detalhe de material.

### A chave

Vai no cofre, igual a qualquer outra:

```bash
printf 'PIXABAY_API_KEY=coloque_a_chave_aqui\n' > ~/.config/segredos/pixabay.env
chmod 600 ~/.config/segredos/pixabay.env
```

No Windows, o equivalente está em `../../setup-ambiente/references/windows.md`.

### A busca

```bash
source ~/.config/segredos/pixabay.env
curl -s "https://pixabay.com/api/?key=$PIXABAY_API_KEY&q=dark+wood+texture&image_type=photo&orientation=horizontal&min_width=1600&safesearch=true&per_page=10" \
  | python3 -c "import json,sys; [print(h['id'],'|',h['imageWidth'],'x',h['imageHeight'],'|',h['largeImageURL']) for h in json.load(sys.stdin)['hits']]"
```

No PowerShell, a mesma busca com os nomes de lá (`curl.exe` com o `.exe` não é
firula: sem ele o PowerShell chama outro comando):

```powershell
curl.exe -s "https://pixabay.com/api/?key=$env:PIXABAY_API_KEY&q=dark+wood+texture&image_type=photo&orientation=horizontal&min_width=1600&safesearch=true&per_page=10" | ConvertFrom-Json | ForEach-Object { $_.hits } | Select-Object id, imageWidth, imageHeight, largeImageURL
```

Parâmetros que mais rendem: `image_type=photo`, `illustration` ou **`vector`**
(vetor é ótimo pra peça de elucidação), `orientation=horizontal` pra arte de
dobra, `min_width` pra não pegar arquivo pequeno demais, e `colors` quando você
quer algo que já converse com a paleta.

### As três regras do Pixabay que não são opcionais

1. **Não pode hotlink.** Baixe pro seu servidor. O método já manda fazer isso
   de qualquer jeito, então é de graça pra você.
2. **Cache de 24 horas** nas respostas da API. Na prática: baixou, guardou,
   acabou. Não fique refazendo a mesma busca.
3. **Limite de 100 chamadas por minuto.** Mais que suficiente, e se estourar é
   porque você está buscando em vez de decidir.

Crédito **não** é obrigatório na licença deles, mas a licença proíbe uso
enganoso e venda do arquivo sozinho, e alerta sobre pessoa e marca
identificáveis. Some isso à regra do topo e o uso seguro fica simples: textura,
objeto e ambiente, sem gente e sem logo de terceiro.

---

## 4 · Gemini, quando quiser arte sob medida

É o caminho de quem quer peça original, coerente em série, feita com o DNA da
marca. Paga-se **por imagem gerada**, não assinatura, e exige faturamento ativo
na conta do Google.

Vale quando o Pixabay não tem o que você precisa e o desenho em CSS não dá
conta: uma cena específica do negócio, uma série de peças que precisam parecer
do mesmo ensaio, um objeto que não existe pronto.

- O DNA de prompt e os erros comuns: `midia-ia.md`
- A chave e o faturamento: `../setup-ambiente/references/apis.md`

**Não empurre esse caminho.** Ofereça as três origens de cima primeiro, e diga
que essa custa. Muita gente não vai querer ligar faturamento pra fazer uma
página, e não precisa.

---

## Depois de baixar, seja de onde for

1. **Abra a imagem antes de usar.** Acervo às vezes tem marca d'água, texto
   queimado ou logo no canto.
2. **Corte na proporção em que ela aparece**, não na que veio.
3. **Converta pra WebP** na largura em que é exibida, o dobro pra retina.
4. **Guarde o original em `_raw/`**, fora da pasta que sobe.
5. **Anote origem e licença** no `PROJETO.md`, junto do mapa de imagem.

---

## Checklist

- [ ] Papel da peça escolhido antes da origem
- [ ] Tentado desenhar antes de buscar, e pedido foto própria antes de acervo
- [ ] Nenhuma foto de estoque com pessoa
- [ ] Imagem de Pixabay baixada pro projeto, nunca apontada por link
- [ ] Imagem aberta e conferida antes de entrar na página
- [ ] Convertida pra WebP na largura real, original em `_raw/`
- [ ] Origem e licença anotadas no `PROJETO.md`
