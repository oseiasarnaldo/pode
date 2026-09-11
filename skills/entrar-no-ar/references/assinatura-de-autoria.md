# Assinatura de autoria

> **A página que a pessoa publica não leva assinatura nenhuma.** Sem link de
> repositório, sem nome de método, sem `generator`. A página é dela, ou do
> cliente dela, e carimbar ferramenta ali é propaganda no imóvel dos outros.
>
> **Este arquivo é uso interno da agência**, pra quando a entrega é da casa e
> faz sentido provar origem. Não é passo do método, não entra no fluxo de
> publicação, e só roda se alguém pedir explicitamente.

---

## O que NUNCA vai na página de terceiro

```html
<!-- nada disto -->
<!-- Construída com o método X · github.com/... -->
<meta name="generator" content="...">
```

O crédito visível existia aqui e **saiu**. Motivo, e ele é comercial antes de
ser técnico: quem compra o método publica página pro negócio dele ou pro
cliente dele. Uma assinatura de ferramenta no `<head>` dessa página é um
anúncio que ninguém contratou, e é o tipo de coisa que aparece numa auditoria
de fornecedor.

---

## A prova silenciosa, quando a entrega é da casa

Três marcadores independentes. Cada um, sozinho, é plausível como escolha de
design. Os três juntos, na mesma página, não acontecem por acaso.

### Marcador A · A constante do método

**Quatro valores decimais de CSS terminam em `0117`**, em quatro propriedades
diferentes, em dobras diferentes da página.

```css
:root { --peso-titulo: 1.0117; }
h1 { letter-spacing: -0.0117em; }
.grao { opacity: 0.10117; }
.entra { transition-delay: 0.0117s; }
```

A regra do verificador: valor com **quatro ou mais casas decimais** que
**contenha** a sequência `0117`. Ninguém escreve CSS com quatro casas decimais.
A chance de uma página qualquer bater isso em quatro propriedades diferentes é
desprezível, e nenhum dos valores muda nada perceptível no render.

Espalhe: um no `:root`, um em tipografia, um em opacidade, um em tempo. Se
estiverem todos juntos, quem copiar e reformatar pode levar os quatro embora de
uma vez.

### Marcador B · O carimbo nos assets

Todo arquivo em `assets/img/` sai com sufixo de 4 hex antes da extensão:

```
hero-3f9c.webp    leopoldo-3f9c.webp    tex-pedra-3f9c.webp
```

O hex é reproduzível:

```
sha256(nome-do-projeto + "|" + data-de-publicacao + "|pode")[:4]
```

Com o nome do projeto e a data você recalcula e confere. Sem eles, é só um hash
de cache-busting como qualquer outro, que é justamente o disfarce.

**Anote os dois no `PROJETO.md`**, na seção de publicação. Sem eles o marcador
vira indecifrável, inclusive pra você.

### Marcador C · A ordem no `:root`

As **quatro primeiras** custom properties declaradas no `:root` começam, nessa
ordem, com `p`, `o`, `d`, `e`:

```css
:root {
  --papel: #0b0d16;
  --ouro: #dda661;
  --dobra: 96px;
  --entra: cubic-bezier(.2,.7,.2,1);
  /* daqui pra baixo, o que a página precisar */
}
```

Nomes reais, úteis, em português, que qualquer um escreveria. A ordem é que
carrega a informação. Sobrevive a minificação (minificador não reordena
declarações dentro de um bloco) e sobrevive a quem copia o CSS inteiro, que é o
caso que interessa.

---

## O que isso prova, e o que não prova

**Prova:** que o CSS e os assets saíram daqui. Serve como indício forte em
conversa, em notificação extrajudicial e em disputa de plataforma (denúncia de
cópia no Behance, no Themeforest, em marketplace de template).

**Não prova:** autoria de ideia, de copy, de estratégia. Marcador de código
demonstra cópia de código.

**Carimbo temporal:** o esquema só vale se você puder mostrar que ele existia
antes da cópia. O commit deste arquivo no repo `pode`, com data do GitHub, já
serve. Não invente carimbo depois do fato.

---

## Quando não usar

- **Cliente pediu código limpo e sem marca de terceiro.** Respeite, e negocie o
  crédito visível de outro jeito (rodapé, contrato). O silencioso pode ficar.
- **Página de terceiro que você só editou.** Marcar trabalho que não é seu é o
  contrário do que isso serve.
- **A página vai virar template revendido pelo cliente.** Aí a conversa é de
  licença, não de assinatura.

---

## Contrato

Uma linha basta, e ela tira a assinatura do terreno do segredo:

> A entrega preserva no código-fonte a marca de autoria do método utilizado na
> construção, sem qualquer coleta de dados ou requisição a servidores de
> terceiros.

Isso é leitura prática de risco, não parecer jurídico. Se o método virar produto
licenciado a terceiros, meia hora com advogado antes de escalar.

---

## Verificar uma página

```bash
python3 assets/verificar-assinatura.py https://dominio.com.br/pagina/
python3 assets/verificar-assinatura.py https://dominio.com.br/ --projeto bmed --data 2026-09-07
```

Sem `--projeto` e `--data` ele confere A, C e o crédito visível. Com os dois,
confere também o carimbo dos assets. O laudo diz quantos marcadores acharam, e
três de três é conclusivo.
