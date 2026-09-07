# FTP genérico

Qualquer hospedagem com cPanel, Plesk ou painel próprio. Os nomes dos botões
mudam, o trabalho é o mesmo.

---

## O modelo mental

Existe uma pasta no servidor que é a raiz do seu domínio. Ela costuma se chamar
`public_html`, `www` ou `htdocs`. O que você põe lá aparece no endereço:

```
public_html/index.html        →  seudominio.com.br
public_html/oferta/index.html →  seudominio.com.br/oferta/
public_html/assets/css/lp.css →  seudominio.com.br/assets/css/lp.css
```

É só isso. Pasta vira caminho, `index.html` vira a página que abre sozinha.

Quem vem de builder demora pra acreditar que é tão direto. É.

---

## Como mandar

**Pelo painel**, no gerenciador de arquivos: aceita arrastar, e quase sempre
aceita subir um zip e extrair no servidor, que é muito mais rápido que mandar
duzentos arquivos um a um.

**Por cliente de FTP** (FileZilla, Cyberduck, Transmit): configure host,
usuário, senha e porta. Prefira **SFTP na porta 22** quando existir. FTP puro,
na 21, manda a senha em texto aberto pela rede.

**Por terminal**, quando a hospedagem der SSH:

```bash
rsync -avz --delete ./ usuario@host:/caminho/public_html/oferta/
```

O `--delete` remove no servidor o que não existe mais no seu computador, o que
mantém os dois lados iguais. Confira o caminho de destino **antes** de rodar com
`--delete`: apontar pra pasta errada apaga a pasta errada.

---

## Os quatro cuidados que valem em toda hospedagem

**1 · Carimbo de versão em css e js.** O navegador de quem já visitou guarda o
arquivo antigo. Como o nome não muda quando você edita, ele não busca de novo:

```html
<link rel="stylesheet" href="assets/css/lp.css?v=20260906143012">
```

**2 · Permissão.** 644 pra arquivo, 755 pra pasta. Alguns clientes de FTP sobem
com permissão restritiva e o servidor devolve erro 403 sem explicar.

**3 · `https://` forçado.** Ative o SSL grátis (quase toda hospedagem tem, via
Let's Encrypt) e force o redirecionamento. Página de vendas com aviso de "não
seguro" perde a venda antes da headline.

**4 · Confirme que subiu.** Sempre, antes de comemorar:

```bash
curl -s https://seudominio.com.br/oferta/ | grep 'algo-que-so-existe-na-versao-nova'
```

---

## `.htaccess`, quando o servidor é Apache

A maioria das hospedagens compartilhadas usa Apache, e aí o `.htaccess` na pasta
controla compressão, cache por tipo de arquivo e bloqueio de indexação. Modelo
em `assets/htaccess-modelo.txt`.

Se o servidor for nginx, o `.htaccess` é ignorado e a configuração fica no
painel ou com o suporte.

---

## Checklist

- [ ] Arquivos na raiz certa, com `index.html` no lugar
- [ ] SFTP em vez de FTP puro, quando disponível
- [ ] Permissão 644 em arquivo, 755 em pasta
- [ ] Carimbo de versão em css e js
- [ ] SSL ativo e `https://` forçado
- [ ] Versão no ar confirmada por `curl`
- [ ] Credencial no cofre, nunca no projeto
