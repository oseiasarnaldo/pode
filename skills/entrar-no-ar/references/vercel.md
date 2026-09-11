# Vercel

O caminho mais rápido do computador pro ar: um comando, URL na hora, grátis.
É o destino de protótipo, de teste e de mostrar pro cliente antes de decidir.

---

## Publicar

Pela linha de comando, de dentro da pasta do projeto:

```bash
vercel deploy --prod
```

**Use a CLI, não o MCP.** O MCP de deploy exige mandar a árvore de arquivos
embutida na chamada, e alguns megabytes de mídia em base64 estouram o contexto
da conversa antes de o envio começar. A CLI manda direto, sem intermediário.

---

## A armadilha que quebrou três páginas

Um `../assets/vercel.json` copiado de projeto anterior marcava **tudo** dentro de
`/assets` como `immutable` por um ano, incluindo css e js.

O problema: `immutable` diz ao navegador "esse arquivo nunca muda, nem
pergunte". Como os arquivos não têm hash no nome (`lp.css` continua `lp.css`
depois de editado), quem já tinha visitado a página **recebia o css antigo pra
sempre**. O site funcionava perfeito pra você, que nunca tinha visitado, e
aparecia quebrado pra quem já conhecia.

A regra que resolve, e que vale em qualquer hospedagem:

| Tipo de arquivo | Cache | Por quê |
|---|---|---|
| Imagem, vídeo, fonte | `immutable`, 1 ano | o nome muda quando o conteúdo muda |
| css e js | `max-age=0, must-revalidate` | mesmo nome, conteúdo novo a cada deploy |
| HTML | `max-age=0, must-revalidate` | é o arquivo que aponta pra todos os outros |

Modelo pronto em `../assets/vercel.json`.

A alternativa mais robusta é colocar hash no nome do arquivo gerado
(`lp.a3f9c1.css`), e aí tudo pode ser `immutable`. Exige passo de build, e vale
quando o projeto já tem um.

---

## `.vercelignore`

O princípio, que importa mais que a lista: **o que não é servido não sobe.**
Fonte de imagem, material bruto, ferramenta de geração, captura de auditoria e
documentação não têm função no ar, e cada um deles é peso e superfície exposta.

O que costuma entrar na lista: pastas de material bruto e de referência,
ferramentas de build e geração, capturas de QA, arquivos `.md`, scripts de
auditoria, e o arquivo-fonte quando existe um build minificado ao lado.

Perguntar de cada pasta: "o navegador de quem visita pede isso?". Se não, ela
não sobe.

---

## Indexação enquanto é protótipo

Página de teste indexada no Google é problema real: ela concorre com a oficial,
e o cliente descobre pelo lugar errado. Enquanto for protótipo, bloqueie por
cabeçalho no `../assets/vercel.json`, além da meta tag no HTML.

São **dois lugares**, e esquecer um deles é o erro clássico do dia do
lançamento: sai a meta tag do HTML, fica o cabeçalho do servidor, e a página
segue invisível pro Google sem ninguém entender por quê.

---

## Checklist

- [ ] Publicado pela CLI, de dentro da pasta certa
- [ ] `../assets/vercel.json` com css e js revalidando, só mídia como `immutable`
- [ ] `.vercelignore` cobrindo fonte, ferramenta, bruto e documentação
- [ ] Bloqueio de indexação enquanto protótipo, e liberado nos **dois** lugares
      no dia do lançamento
