# Windows: tudo que muda

Boa parte do público está em Windows, e o método inteiro roda lá. O que muda é
o nome de alguns comandos, não o método.

**Este arquivo é consulta.** Os outros arquivos mostram a versão macOS porque
ela é mais curta; quando o comando não funcionar, é aqui que está a tradução.

---

## Regra zero: instale o Git for Windows

É o único item da lista que não é opcional, e resolve metade dos problemas de
uma vez.

```
winget install Git.Git
```

Com ele vem o **Git Bash**, um terminal onde `ls`, `cat`, `grep`, `curl` e
`rsync` funcionam **igual ao Mac**. Todo comando dos outros arquivos roda ali
sem tradução nenhuma.

Sem ele, o agente cai no PowerShell, onde metade dos comandos tem outro nome, e
alguns têm o mesmo nome fazendo coisa diferente, que é pior.

> **A recomendação, então:** no Windows, use o **Git Bash** como terminal do
> método. O resto deste arquivo é pra quem, mesmo assim, está no PowerShell.

---

## A tradução, comando a comando

| O que você quer | macOS, Linux, Git Bash | PowerShell |
|---|---|---|
| Onde estou | `pwd` | `pwd` (funciona) |
| Listar arquivos | `ls -a` | `Get-ChildItem -Force` |
| Ver um arquivo | `cat arquivo` | `Get-Content arquivo` |
| Procurar texto num arquivo | `grep -n 'termo' arquivo` | `Select-String -Path arquivo -Pattern 'termo'` |
| Ver se um programa existe | `command -v ffmpeg` | `Get-Command ffmpeg -ErrorAction SilentlyContinue` |
| Baixar uma URL | `curl -s url` | **`curl.exe -s url`** |
| Abrir a página | `open index.html` | `start index.html` |
| Criar pasta | `mkdir nome` | `mkdir nome` (funciona) |
| Servidor local | `python3 -m http.server 8000` | `py -m http.server 8000` |

**O `curl.exe` com `.exe` não é firula.** No PowerShell 5.1, que é o que vem no
Windows, `curl` é apelido de outro comando (`Invoke-WebRequest`) e ignora as
opções que o método usa. Escrever `curl.exe` chama o programa de verdade.

---

## Camada 2 · Chrome com porta de depuração

O caminho do Chrome muda, o resto é igual:

```powershell
& "$env:ProgramFiles\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 --user-data-dir="$env:USERPROFILE\.chrome-debug"
```

Se não achar ali, tente `${env:ProgramFiles(x86)}`. Depois, o MCP é idêntico:

```
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest --browser-url=http://127.0.0.1:9222
```

---

## Camada 3 · Mídia

| Ferramenta | Como instalar |
|---|---|
| **ffmpeg** | `winget install Gyan.FFmpeg` |
| **webp** (cwebp) | não tem pacote oficial no winget. Baixe o `libwebp` do site do Google, descompacte, e ponha a pasta `bin` no PATH |
| **Pillow** | `py -m pip install Pillow` |
| **fontTools** | `py -m pip install fonttools brotli` |

Se o `winget` não existir na sua máquina, ele vem no "Instalador de Aplicativo"
da Microsoft Store.

**Alternativa que evita tudo isso:** peça ao agente. Ele lê o erro, descobre o
que falta e instala, e é literalmente pra isso que ele está ali.

---

## O cofre de segredos

O caminho é o mesmo, o jeito de criar muda:

```powershell
mkdir "$HOME\.config\segredos" -Force
'PIXABAY_API_KEY=coloque_a_chave_aqui' | Out-File -Encoding utf8 "$HOME\.config\segredos\pixabay.env"
```

**Não existe `chmod 600` no Windows.** A permissão equivalente é restringir o
acesso à sua conta, e o essencial continua valendo: **a chave mora fora da
pasta do projeto, e nunca entra no Git.**

Pra usar a chave numa sessão do PowerShell:

```powershell
$env:PIXABAY_API_KEY = (Get-Content "$HOME\.config\segredos\pixabay.env") -replace '^.*=', ''
```

---

## O modo sem interrupção

No Mac o atalho é um `alias` no `.zshrc`. No PowerShell, o equivalente é uma
função no seu perfil:

```powershell
notepad $PROFILE
```

E dentro do arquivo:

```powershell
function claude { claude.exe --dangerously-skip-permissions @args }
```

Chamar `claude.exe` por extenso dentro da função é o que evita ela chamar a si
mesma pra sempre. Feche e abra o terminal depois de salvar.

Se o arquivo de perfil não existir, o `notepad` pergunta se quer criar. Diga que
sim.

---

## Publicação

`rsync` não existe no Windows fora do Git Bash. Duas saídas:

1. **Use o Git Bash**, e o comando do método funciona igual.
2. **Use um cliente de FTP** (FileZilla, WinSCP) ou o gerenciador de arquivos do
   painel da hospedagem. O método sempre dá esse caminho ao lado do comando.

---

## Os três tropeços clássicos

| Sintoma | Causa | Conserto |
|---|---|---|
| Erro reclamando de `&&` ou de `irm` | PowerShell e CMD trocados | a barra do PowerShell começa com `PS`. Se não começa, você está no CMD |
| Comando funciona no vídeo e não na sua máquina | o vídeo está no Mac ou no Git Bash | abra o Git Bash, ou traduza pela tabela acima |
| `curl` devolve coisa estranha | apelido do PowerShell | escreva `curl.exe` |

---

## Checklist

- [ ] Git for Windows instalado, e o Git Bash aberto como terminal do método
- [ ] `claude --version` respondendo
- [ ] Caminho do Chrome conferido, se for usar a camada 2
- [ ] `py -m pip` funcionando, se for usar a camada 3
- [ ] Cofre criado em `$HOME\.config\segredos`, fora da pasta do projeto
