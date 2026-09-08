# Ferramentas

> **No Windows**, veja `../../setup-ambiente/references/windows.md`: caminho do
> Chrome, `winget`, e por que o Git Bash resolve quase tudo.

Nada aqui é obrigatório. **Setenta por cento do resultado vem das regras**, que
funcionam com o Claude e mais nada.

Esta lista é o que amplia a verificação e a produção de mídia.

---

## O que realmente muda o jogo

### MCP do Chrome DevTools

Se você for instalar **uma** coisa, instale esta. É o que permite ao Claude ver
e medir a página, em vez de escrever código no escuro.

```bash
# 1. Chrome com porta de debug (deixe rodando)
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 --user-data-dir="$HOME/.chrome-debug" &

# 2. o MCP
claude mcp add chrome-devtools \
  npx chrome-devtools-mcp@latest --browser-url=http://127.0.0.1:9222
```

No Windows, o caminho do Chrome muda, o resto é igual.

As duas funções que mais entregam:

- **`evaluate_script`**: roda JavaScript na página real. É como os auditores
  medem contraste, alvo de toque e peso.
- **`emulate`**: emula viewport **com toque de verdade**
  (`390x844x1,mobile,touch`). Sem isso, `@media (hover: hover)` sempre dá
  verdadeiro e o defeito do iPad passa batido.

> `resize_page` não desce abaixo de 500px. Para testar 360px, use `emulate` ou
> iframes numa página de teste.

---

## Mídia

| Ferramenta | Para quê | Instalação |
|---|---|---|
| **ffmpeg** | reencodar vídeo, extrair frame de poster | `brew install ffmpeg` |
| **cwebp** | converter para WebP. O `sips` do macOS **não** faz WebP | `brew install webp` |
| **Pillow** | processar PNG, gerar alfa em logo com fundo branco | `pip3 install Pillow` |

No Windows: `winget install ffmpeg` e baixe o `libwebp` do site oficial.

---

## Geração por IA

Qualquer gerador serve, desde que você aplique o DNA de
`midia-ia.md` em todo prompt.

Se for usar a API do Gemini por REST, dois avisos:

1. **Precisa de billing ativo.** O free tier não gera imagem nem vídeo.
2. **Vídeo é operação assíncrona.** O endpoint devolve uma operação e você faz
   polling até terminar. Cada clipe leva de 80 a 120 segundos.

---

## Verificação sem instalar nada

Se você não pode ou não quer instalar:

1. `python3 -m http.server 8000` (Python já vem no macOS e no Linux)
2. Abra `http://localhost:8000` no navegador
3. F12, aba Console, cole os scripts de `scripts/`

Isso cobre contraste, alvo de toque e overflow, que são as três auditorias que
mais pegam defeito.

Para testar toque sem o MCP: F12, ícone de dispositivo (Ctrl+Shift+M), escolha
um celular na lista. O Chrome emula toque de verdade nesse modo.

---

## O que NÃO é necessário

Vale dizer, porque economiza tempo:

- **Framework de frontend.** Nada nesta skill precisa de React, Vue ou similar.
- **Build step.** Os arquivos servidos podem ser os arquivos escritos.
- **Biblioteca de UI.** Os padrões são CSS puro.
- **Biblioteca de carrossel.** Um trilho com `flex-basis` em transição resolve.
- **Biblioteca de animação.** Três curvas de CSS cobrem tudo.
