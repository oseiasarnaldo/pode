# Auditoria de publicação: só dá pra medir com o projeto no ar

Contraste e responsivo você mede no `localhost`. Velocidade real, mobile de
verdade e leitura por agente, não: dependem do servidor, do cache e da rede.
Por isso esta auditoria vem **depois** de publicar, e por isso ela tem esse
nome.

O que roda antes de subir é a skill `acabamento-visual`, em
`../../acabamento-visual/references/auditoria-visual.md`. Se aquela lista ainda tem item aberto,
volte pra lá: acelerar uma página que reprova em contraste é otimizar o
lugar errado.

---

## Regra zero: confirme que você mediu o deploy certo

Antes de olhar **qualquer** número. Duas rodadas inteiras de medição já foram
perdidas por medir a versão velha, servida do cache.

```bash
curl -sI https://seudominio.com.br/ | grep -iE 'x-cache|age|cache-control'
curl -s  https://seudominio.com.br/ | grep 'string-que-so-existe-na-versao-nova'
```

`x-cache: HIT` com `age` alto quer dizer que você está medindo o passado.
Purgue e refaça (o como está em `cloudways.md`). Só depois disso o número vale.

---

## Qual ferramenta pra qual medida

Não há sobreposição, e a divisão é fácil de lembrar: **o Lighthouse do MCP
exclui performance, e é o único que traz a categoria agêntica.**

| O que medir | Ferramenta |
|---|---|
| Acessibilidade, SEO, boas práticas e **agentic browsing** | `lighthouse_audit` do MCP do Chrome, `device: mobile` e depois `desktop` |
| Core Web Vitals e quem bloqueou a thread | `performance_start_trace` mais `performance_analyze_insight` |
| Se a versão medida é a certa | `curl`, a regra zero acima |
| Nota fechada de performance, quando quiser comparar rodadas | `npx lighthouse@12 URL --only-categories=performance --chrome-flags="--headless=new"` |

**Diagnóstico vem do MCP, nota redonda vem do npx.** O `npx` é opcional e serve
quando você precisa de um número estável pra comparar antes e depois. Ele roda
em Chrome limpo, e isso importa: no navegador do dia a dia, uma única extensão
somou 650 ms de thread e mascarou a medição inteira.

---

## Bloco 1 · Carregamento

Meta: a maior nota possível **sem tirar a animação**. Página rápida e sem graça
é fácil, e não é o que a gente vende.

Ordem que rendeu, do maior ganho pro menor. Caso real de set/2026, uma LP de
curso migrada de WordPress mais Elementor pra estático.

| Alavanca | Como | Ganho no caso |
|---|---|---|
| Vídeo | `scale=1280`, `crf 31`, `-maxrate 1100k -bufsize 2200k`, `-an`, `faststart`. Plates de fundo aguentam `crf 33`. Originais ficam em `_raw/` | 15,4 MB para 7,9 MB |
| Poster pra todo vídeo | frame em WebP de 640 a 800px, `<img>` no HTML, `<video>` entra por cima ao ficar pronto (`append`, não `prepend`) | grade aparece na hora |
| Fontes | TTF para woff2 com subset latino: `python3 -m fontTools.subset x.ttf --flavor=woff2 --unicodes=U+0020-007E,U+00A0-017F` (precisa `pip install brotli`) | 406 KB para 51 KB |
| Player de terceiro | `data-src` no iframe, e a API só quando a dobra chega perto | player fora do caminho crítico |
| LCP | descobrir qual é o elemento LCP **no celular** (costuma ser outro), e nele `fetchpriority="high"` mais `preload` | load delay 619 para 0 |
| CSS | embutir no HTML via build. Dois CSS externos custam uma viagem de rede inteira no 4G lento | LCP 1,5 s para 1,2 s |
| Arte grande | versão de 760px com `srcset` e `sizes`, mais `imagesrcset` no preload | metade do peso no celular |

### A segunda rodada, de 67 pra 95 no celular

Os ganhos não óbvios, que só apareceram depois que o básico já estava feito:

| Alavanca | Como | Ganho |
|---|---|---|
| LCP sem viagem de rede no celular | poster do hero de 880px (16 KB) **embutido como data URI** num `<source media="(max-width:980px)">`. No desktop, arquivo normal com preload | load delay 400 para 183 ms |
| `srcset` engana com DPR 3 | `sizes="100vw"` num celular de DPR 3 pede 1170px e pega a arte de 1114 (202 KB). `<picture>` com `media` força a de 760 | 202 para 101 KB |
| Tags fora da thread do LCP | GTM, Ads, pixel e afins entram na **primeira interação, ou 2,5 s após o load**. O `fbevents.js` sozinho bloqueava 1,1 s a 4x de CPU. Com API de Conversões, o PageView sai do servidor e cobre quem abandona antes | TBT 1.490 para 60 ms |
| Vídeo de fundo depois do LCP | plate só 1,2 s depois do `load`. Senão 900 KB de mp4 brigam com a arte do hero | LCP desktop 1,5 para 0,9 s |
| Vídeo e iframe só quando chegam | `rootMargin` de 600/700px carregava três mp4 e o player dentro da janela do LCP no celular. 200/300px, e só após o `load` | TTI 26 para 8,7 s |
| Fontes secundárias | `font-display: optional` nas que não estão no primeiro quadro | sem troca visível |

O maior ganho isolado da rodada foi adiar as tags de rastreamento. Guarde isso:
**a tag que mede a conversão costuma ser a que atrapalha a conversão.**

### Imagens

O que o Lighthouse aponta, e o conserto sem tocar no original (sempre gerar
arquivo novo ao lado):

- **`uses-responsive-images`**: quase sempre o problema é o **recorte**, não o
  tamanho. Imagem 1:1 exibida em 5:3 com `cover` joga fora a metade cortada, e
  você pagou o download dela. Gerar na proporção em que aparece (880x528).
- **AVIF antes do webp**, com `<source type="image/avif">`: de 30 a 45% a menos
  em foto e arte gerada. Sem `avifenc` na máquina,
  `ffmpeg -c:v libsvtav1 -crf 34 -preset 4 -frames:v 1 x.avif` resolve. O
  servidor precisa de `AddType image/avif`.
- **`offscreen-images`** em marquee: `loading="lazy"` nos logos, mesmo com o
  trilho duplicado pelo JS.
- **`unsized-images`** em print: `width` e `height` no `<img>`, sem reescrever o
  arquivo (o PIL lê as dimensões pra você).

### O que não é defeito da página

Boas práticas abaixo de 100 por cookie de terceiro, e SEO abaixo de 100 por
`noindex` proposital enquanto a página é protótipo. Anotar e seguir. Nota
redonda não é o objetivo, página rápida é.

---

## Bloco 2 · Mobile

O mobile do Lighthouse é o modo padrão e simula um aparelho modesto com CPU 4x
mais lenta e rede 4G ruim. É mais duro que o celular real do seu público, e é
exatamente por isso que serve: quem passa ali passa em qualquer lugar.

- **O elemento LCP no celular costuma ser outro.** Descubra qual é antes de
  otimizar, senão você acelera o elemento errado com muito capricho.
- **`srcset` engana com DPR 3**, como na tabela acima. Vale repetir porque é o
  erro que mais sobrevive a revisão de código: o cálculo está certo, o resultado
  é que é ruim.
- **O que só existe no ar**: barra fixa de CTA sem cobrir conteúdo, teclado
  virtual não quebrando o formulário, `viewport` correto, e alvo de toque
  conferido no aparelho, não só no emulador.
- **Rode mobile e desktop na mesma sessão** e registre as duas notas juntas.
  Comparar rodada de terças diferentes, em horários diferentes, é comparar
  ruído.

---

## Bloco 3 · Agêntica

Quem procura curso hoje pergunta pra um assistente antes de pesquisar no Google.
Uma página que o agente não consegue ler não entra na resposta, e você não fica
sabendo que perdeu. Esse bloco existe por isso.

### 1 · `../assets/llms.txt`

Arquivo em `/llms.txt`, na raiz, em markdown. A ordem é definida pela
especificação e não é livre:

1. `#` H1 com o nome (**o único item obrigatório**)
2. blockquote com o resumo
3. corpo opcional
4. seções `##` com listas de links no formato `[nome](url): descrição`

Uma seção `## Optional`, por convenção, marca o que o agente pode pular quando
precisa de contexto curto. Modelo pronto em `../assets/llms.txt`.

Numa página de oferta, o que o agente precisa saber é o que qualquer pessoa
perguntaria: o que é, pra quem, quanto custa, onde compra, qual a garantia, como
falar com alguém. Junto do `../assets/llms.txt` vão o `../assets/robots.txt` e o `sitemap.xml`, que
costumam faltar em LP.

### 2 · Hierarquia de conteúdo

Um `h1` só. `h2` por dobra. `h3` só dentro de dobra. Nunca pular nível.

**Nível de heading é estrutura, tamanho de letra é CSS.** O sintoma clássico de
que alguém confundiu os dois é um `h4` solitário no meio da página: ele não
existe porque a hierarquia pedia, existe porque alguém queria um texto menor.

Conferir rápido, no console:

```js
[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
  .map(h => h.tagName + ' · ' + h.textContent.trim().slice(0, 60));
```

Um `h1`, e nenhum salto de nível na sequência.

### 3 · A auditoria

`lighthouse_audit` do MCP em `device: mobile` e depois `desktop`, lendo a
categoria de agentic browsing junto com acessibilidade e SEO. Cada reprovação
vai pra uma de duas pilhas: **defeito da página** (conserta) ou **escolha
proposital** (anota o motivo e segue).

---

## Checklist

- [ ] Confirmado por `curl` que a URL serve a versão nova, não o cache
- [ ] Cache purgado depois do envio, nos dois hosts (com e sem `www`)
- [ ] Lighthouse rodado em mobile e desktop, as duas notas registradas juntas
- [ ] Elemento LCP do celular identificado, não presumido pelo desktop
- [ ] Tags de rastreamento fora da thread do LCP
- [ ] Imagens no formato e no recorte em que aparecem, com `width` e `height`
- [ ] Nenhum css ou js servido como `immutable` sem hash no nome
- [ ] Checklist de `antes-de-subir.md` cumprido: checkout, domínio, indexação
- [ ] `../assets/llms.txt`, `../assets/robots.txt` e `sitemap.xml` no ar e acessíveis
- [ ] Um `h1` só, `h2` por dobra, nenhum nível pulado
- [ ] Auditoria agêntica rodada, reprovações classificadas
- [ ] Reprovação de SEO ou boas práticas explicada, não ignorada
