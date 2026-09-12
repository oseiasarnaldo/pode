# Primeiros passos: do zero ao agente rodando

> **Esta é a única peça do método que precisa funcionar sem nada instalado.**
>
> Existe um paradoxo aqui: quem precisa instalar o terminal e o agente ainda
> não tem o agente pra pedir ajuda. Então este arquivo é escrito pra ser lido
> por uma pessoa, não executado por uma máquina.

Meta única: terminar com o agente rodando e uma página de teste aberta no
navegador. Nada além disso.

---

## Regra de ouro: uma tela, um comando, um resultado

Quem nunca usou terminal não tem medo de errar, tem medo de **quebrar alguma
coisa**. Três cuidados que resolvem quase tudo:

1. **Saiba o resultado esperado de cada comando.** "Vai aparecer uma linha
   começando com `/Users/`". Sem isso, não dá pra saber se deu certo.
2. **Muita coisa é normal e assusta.** Texto passando rápido, aviso amarelo,
   uma pausa de trinta segundos. Nada disso é erro.
3. **Uma linha por vez.** Não cole três comandos de uma vez na primeira semana.

---

## Antes de começar

O acesso ao agente exige conta com plano pago ou crédito de API. Não existe
caminho gratuito, e é melhor saber disso agora do que no meio da instalação.
Crie a conta e resolva o pagamento **antes** de abrir o terminal: cair numa
tela de assinatura no meio do setup é o jeito mais rápido de desistir.

---

## 1 · O terminal

É a janela onde você conversa com o computador digitando. Serve o que já veio
na máquina (Terminal no macOS, Windows Terminal no Windows) ou o Warp
(warp.dev), que separa cada comando num bloco visual e por isso facilita
enxergar **onde** deu errado quando dá.

O primeiro comando existe só pra tirar o medo:

```
pwd
```

Ele mostra onde você está. Apareceu uma linha com o seu nome de usuário?
Pronto, você já usou o terminal.

---

## 2 · O agente

Um comando, e ele **não exige instalar mais nada antes**: nem Node, nem
programa nenhum.

No Mac:

```
curl -fsSL https://claude.ai/install.sh | bash
```

No Windows, dentro do PowerShell:

```
irm https://claude.ai/install.ps1 | iex
```

Confirme que funcionou:

```
claude --version
```

Tem que aparecer um número seguido de `(Claude Code)`. Se apareceu, a parte que
assusta acabou.

Pra entrar:

```
claude
```

Abre o navegador na primeira vez. Com a conta já criada, leva segundos.

Duas coisas boas que vale saber: a instalação **se atualiza sozinha**, você
nunca mais precisa mexer nisso; e no plano de entrada o agente já trabalha sem
pedir permissão a cada passo.

**No Windows, um detalhe que economiza suporte:** instale também o Git for
Windows. Sem ele o agente usa PowerShell no lugar do terminal padrão e alguns
comandos mudam. Se aparecer erro reclamando de `&&` ou de `irm`, é PowerShell
contra CMD trocados: a barra do PowerShell começa com `PS`.

**O teste que fecha o passo:** peça qualquer coisa ao agente e veja ele
responder. Não precisa ser útil, precisa provar que está vivo.

---

## 3 · O método na máquina

Um comando, e é o mesmo comando pra atualizar depois:

```
git clone https://github.com/oseiasarnaldo/pitangus.git ~/.claude/skills/pitangus
```

Feche e abra o terminal. O que importa mais que o comando: o método fica **na
sua máquina**, funciona em todos os projetos, e quando sair versão nova é só
rodar `git pull` na mesma pasta. Você não precisa voltar aqui.

**Teste:** dentro do Claude Code, digite `/pitangus`. Se ele responder puxando
o método, está instalado.

---

## 4 · Onde o agente trabalha

Essa é a única coisa que confunde no começo, e entender agora economiza muita
dor: **o agente trabalha na pasta em que você o abriu.** Os arquivos nascem
ali, e em lugar nenhum além dali.

Ou seja, quem escolhe onde os seus projetos moram é você. Pode ser dentro de
Documentos, na área de trabalho, num HD externo, tanto faz. O que não pode é
abrir o agente em qualquer lugar e depois procurar o arquivo pelo computador
inteiro.

**Escolha o seu lugar e vá até ele.** No Mac, por exemplo:

```
cd ~/Documents
```

Se você não faz ideia de onde está, `pwd` responde. E `cd ~` sempre volta pra
sua pasta pessoal, de onde quer que você esteja: é o comando que salva quando
você se perde.

**Agora a pasta do primeiro projeto, dentro do lugar que você escolheu:**

```
mkdir piloto
cd piloto
claude
```

**Sobre o nome `piloto`:** é de propósito. Esse primeiro não precisa ser o
projeto da sua vida, ele existe pra você ver a coisa funcionando. Se você já
sabe o que quer fazer, use o nome do seu negócio. Se ainda não sabe, use
`piloto` e siga: decidir o que vender não é pré-requisito pra aprender a
ferramenta.

Da próxima vez, o caminho inteiro é uma linha só, trocando o começo pelo lugar
que você escolheu:

```
cd ~/Documents && mkdir nome-do-projeto && cd nome-do-projeto && claude
```

---

## Os quatro pontos onde todo mundo trava

| Trava | O que você vê | O conserto |
|---|---|---|
| Comando não encontrado | `command not found` | fechar e abrir o terminal de novo. Resolve na maioria das vezes |
| Pasta errada | criou o arquivo e não acha | `pwd` mostra onde você está, e o agente trabalha **onde foi aberto** |
| Login travado | a página abriu e nada acontece | voltar pro terminal, ele já continuou |
| Permissão | palavra em inglês com "permission" | não force nada: mande a mensagem pro agente e ele resolve |

**A instrução que resolve 80% dos problemas:** *cole o erro inteiro no agente e
pergunte o que fazer.* Ele lê mensagem de erro melhor que gente, e é pra isso
que ele está ali.

---

## O que fica de fora, de propósito

As camadas 2, 3 e 4 do setup (Chrome Canary com MCP, mídia, hospedagem) **não** entram
aqui. Elas entram quando fazem falta:

| Camada | Quando ela aparece |
|---|---|
| Chrome Canary com MCP | na letra D, quando for medir a página |
| ffmpeg e chave de API | na letra D, quando for gerar arte |
| Acesso da hospedagem | na letra E, quando for publicar |

Instalar tudo antes de começar é o jeito mais eficiente de travar num erro de
uma ferramenta que você só usaria daqui a três semanas.

---

## Checklist

- [ ] Conta criada e pagamento resolvido antes de abrir o terminal
- [ ] `pwd` respondeu com um caminho
- [ ] `claude --version` respondeu com um número
- [ ] Login feito
- [ ] Método instalado, e `/pitangus` respondendo
- [ ] Você escolheu onde seus projetos moram, e criou a pasta do primeiro lá
- [ ] Uma página pedida ao agente e aberta no navegador
- [ ] Nenhuma camada além da primeira instalada por enquanto
