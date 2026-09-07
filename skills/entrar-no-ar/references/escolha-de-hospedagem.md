# Onde publicar

A decisão leva trinta segundos e quase sempre cai numa destas quatro linhas.

| Se | Publique em | Porque |
|---|---|---|
| é teste, protótipo ou pra mostrar pro cliente | **Vercel** | um comando, URL na hora, grátis, e você joga fora depois |
| o cliente já tem servidor, ou a página precisa viver dentro de um domínio que já roda WordPress | **Cloudways** | pasta física vence o WordPress, e o pixel fica no domínio principal |
| você está começando, ou é a hospedagem que a pessoa já paga | **Hostinger** | barata, painel simples, FTP direto, SSL incluso |
| a hospedagem é outra, com cPanel ou FTP | **genérico** | o princípio é idêntico, muda o nome dos botões |

---

## O critério que resolve os casos difíceis

Quando duas opções parecem servir, decida por esta pergunta:

> **O pixel precisa estar no mesmo domínio do site principal?**

Se sim, a página tem que morar dentro daquele domínio, e isso costuma
significar a hospedagem que já está lá. Cookie de primeira parte, atribuição
inteira e nenhum problema de domínio cruzado.

Se não (lançamento próprio, domínio novo, teste), publique onde for mais rápido.

---

## O que não muda entre elas

Trocar de hospedagem não muda quase nada do trabalho, porque os quatro problemas
são os mesmos em todo lugar:

1. **Cache de css e js.** Toda hospedagem guarda. Carimbo de versão ou hash no
   nome, sempre.
2. **Indexação.** Bloquear enquanto protótipo, liberar no lançamento, e lembrar
   que costuma estar em dois lugares.
3. **`https://` forçado.** Página de vendas em `http://` mostra aviso de
   insegurança e perde a venda antes da headline.
4. **Confirmar que subiu.** `curl` na URL procurando algo que só existe na
   versão nova. Vale em qualquer destino.

O que muda de verdade é só **onde ficam os arquivos** e **se existe um proxy
guardando o HTML na frente** (o caso da Cloudways, com o Varnish).

---

## Migrar depois é barato

Uma página estática é uma pasta. Mudar de hospedagem é copiar a pasta pro novo
lugar e apontar o domínio. Não há banco de dados, plugin nem versão de PHP pra
combinar.

Isso é o oposto de site em builder, onde a página é dado dentro da plataforma e
sair significa refazer. **O código ser seu é o que torna essa decisão
reversível**, e por isso ela não precisa ser perfeita agora.
