# Ferramentas, por camada

Cada camada tem: o que instalar, como testar, e o que fazer quando o teste
falha. **Não avance sem o teste passar.**

---

## Camada 1 · Essencial

Com isso você já faz uma página inteira.

### O terminal

É a janela onde o agente trabalha. Duas opções, e as duas servem:

| Opção | Quando escolher |
|---|---|
| **O terminal que já veio** (Terminal no macOS, Windows Terminal no Windows) | você quer começar agora, sem instalar nada |
| **Warp** | você quer um terminal mais moderno, com histórico navegável e blocos separados por comando, que ajuda quando você ainda não tem intimidade com a ferramenta |

Não existe resposta errada aqui. O agente roda igual nos dois, e trocar depois
é indolor.

**Teste:** abra o terminal, digite `pwd` e dê Enter. Se apareceu um caminho de
pasta, funcionou.

### Claude Code

O agente. A instalação está na documentação oficial da Anthropic, que é a fonte
que fica atualizada.

**Teste:** dentro de uma pasta qualquer, rode `claude` e veja se abre a conversa.

### A pasta do projeto

Uma pasta por página. Crie e entre nela antes de chamar o agente:

```bash
mkdir minha-pagina
cd minha-pagina
claude
```

O agente trabalha **dentro da pasta em que você o abriu**. Abrir na pasta errada
é a causa mais comum de "ele criou o arquivo, mas eu não acho".

**Teste da camada 1:** peça uma página simples ao agente, e depois abra o
arquivo no navegador. Se você viu a página, a camada 1 está fechada e você já
pode fazer o método inteiro.

---

## Camada 2 · Verificação

Aqui o agente ganha olhos. Sem isso ele escreve código no escuro e você confere
tudo na mão.

É a camada com melhor relação entre esforço e ganho: **quase todo defeito real
passa em revisão de código e só aparece na tela.**

### Chrome com porta de depuração

O Chrome precisa rodar com uma porta aberta pro agente conversar com ele:

```bash
# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 --user-data-dir="$HOME/.chrome-debug" &
```

No Windows o caminho do Chrome muda, o resto é igual. O `--user-data-dir`
separado é proposital: ele abre um perfil limpo, sem as suas extensões.

**Isso importa mais do que parece.** Extensão contamina medição: num caso real,
uma sozinha somou 650 ms de processamento e mascarou o diagnóstico inteiro.

### O MCP

```bash
claude mcp add chrome-devtools \
  npx chrome-devtools-mcp@latest --browser-url=http://127.0.0.1:9222
```

**Teste:** peça ao agente pra abrir uma página e tirar uma captura. Se voltou
imagem, a camada 2 está fechada.

**Se falhar:** confira se o Chrome do comando acima ainda está aberto. Ele
precisa estar rodando pro MCP conectar.

---

## Camada 3 · Mídia

Só quando você chegar na letra D e quiser arte própria em vez de banco de
imagem.

| Ferramenta | Pra quê | Instalação no macOS |
|---|---|---|
| **ffmpeg** | comprimir vídeo, extrair frame pra poster, converter pra AVIF | `brew install ffmpeg` |
| **webp** | converter imagem pra WebP. O conversor nativo do macOS não faz | `brew install webp` |
| **Pillow** | ler e processar imagem por script | `pip3 install Pillow` |

No Windows: `winget install ffmpeg`, e o `libwebp` sai do site oficial.

**Teste:** `ffmpeg -version` precisa responder com a versão.

Chave de API pra gerar imagem e vídeo fica em `apis.md`.

---

## Camada 4 · Publicação

Não se instala, se organiza. O que você precisa ter **em mãos**, guardado no
cofre:

- endereço do servidor, usuário e senha da hospedagem
- qual pasta é a raiz do site (costuma ser `public_html`)
- onde o domínio está registrado, se for diferente da hospedagem

Se você usa Vercel, o acesso é a própria conta e a instalação é
`npm i -g vercel`.

**Teste:** conseguir entrar no painel da hospedagem e achar a pasta raiz. Se
você acha a pasta, sabe publicar.

Detalhe de cada destino em `../entrar-no-ar/references/`.

---

## Quando alguma coisa não funciona

Na ordem, porque resolve a maioria dos casos:

1. **Leia o erro inteiro.** Ele quase sempre diz o que falta, e a linha útil
   costuma ser a última, não a primeira.
2. **Confira em que pasta você está** (`pwd`). Metade dos problemas é estar na
   pasta errada.
3. **Confirme que instalou de verdade**, com o teste da camada.
4. **Cole o erro pro agente.** Ele lê mensagem de erro melhor que a gente, e é
   pra isso que ele está aí.

---

## Checklist

- [ ] Camada 1 fechada: página criada e aberta no navegador
- [ ] Camada 2, se for usar verificação: captura de tela voltou
- [ ] Chrome de depuração em perfil separado, sem extensão
- [ ] Camada 3, se for usar arte própria: `ffmpeg -version` responde
- [ ] Camada 4: sei entrar no painel e achar a pasta raiz
- [ ] Cada teste passou antes de avançar
