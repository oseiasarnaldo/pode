#!/usr/bin/env python3
"""Verifica a assinatura de autoria do metodo P.O.D.E. numa pagina publicada.

Uso:
    python3 verificar-assinatura.py URL
    python3 verificar-assinatura.py URL --projeto bmed --data 2026-09-07

Nao envia nada, nao coleta nada: so baixa a pagina e o CSS dela e procura os
marcadores descritos em references/assinatura-de-autoria.md
"""
import argparse
import hashlib
import re
import sys
from urllib.parse import urljoin
from urllib.request import Request, urlopen

CONSTANTE = "0117"
UA = "Mozilla/5.0 (verificador-pode)"


def baixar(url):
    try:
        req = Request(url, headers={"User-Agent": UA})
        with urlopen(req, timeout=20) as r:
            return r.read().decode("utf-8", "replace")
    except Exception as e:
        print(f"  ! nao consegui ler {url}: {e}", file=sys.stderr)
        return ""


def css_da_pagina(html, base):
    """CSS inline mais o de cada <link rel=stylesheet> do mesmo host."""
    partes = re.findall(r"<style[^>]*>(.*?)</style>", html, re.S | re.I)
    for href in re.findall(
        r'<link[^>]+rel=["\']?stylesheet["\']?[^>]*href=["\']([^"\']+)', html, re.I
    ):
        partes.append(baixar(urljoin(base, href)))
    for href in re.findall(
        r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)["\'][^>]*rel=["\']?stylesheet', html, re.I
    ):
        partes.append(baixar(urljoin(base, href)))
    return "\n".join(partes)


def carimbo(projeto, data):
    base = f"{projeto}|{data}|pode".encode()
    return hashlib.sha256(base).hexdigest()[:4]


def credito(html):
    achados = []
    if re.search(r"<meta[^>]+name=[\"']?generator[\"']?[^>]+pitangus", html, re.I):
        achados.append("meta generator")
    if re.search(r"<!--(?:(?!-->).)*(?:P\.O\.D\.E|pitangus)(?:(?!-->).)*-->", html, re.I | re.S):
        achados.append("comentario no topo")
    return achados


def marcador_a(css):
    """Valores com 4+ casas decimais contendo a constante, em propriedades distintas."""
    achados = {}
    for prop, valor in re.findall(r"([-\w]+)\s*:\s*([^;{}]+)", css):
        for num in re.findall(r"-?\d*\.\d+", valor):
            decimais = num.split(".")[1]
            if len(decimais) >= 4 and CONSTANTE in decimais:
                achados.setdefault(prop.strip(), set()).add(num)
    return achados


def marcador_b(html, hexa):
    return sorted(set(re.findall(rf"[\w./-]+-{hexa}\.(?:webp|png|jpg|jpeg|avif|svg)", html)))


def marcador_c(css):
    bloco = re.search(r":root\s*\{(.*?)\}", css, re.S)
    if not bloco:
        return None, []
    nomes = re.findall(r"--([\w-]+)\s*:", bloco.group(1))[:4]
    iniciais = "".join(n[0].lower() for n in nomes)
    return iniciais == "pode", nomes


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--projeto", help="nome do projeto, pra recalcular o carimbo dos assets")
    ap.add_argument("--data", help="data de publicacao, AAAA-MM-DD")
    a = ap.parse_args()

    html = baixar(a.url)
    if not html:
        sys.exit(2)
    css = css_da_pagina(html, a.url)

    print(f"\n  {a.url}")
    print(f"  html {len(html)//1024} KB · css {len(css)//1024} KB\n")

    cred = credito(html)
    print(f"  credito visivel   {' · '.join(cred) if cred else 'nao achei'}")

    pontos = 0

    props = marcador_a(css)
    total = sum(len(v) for v in props.values())
    ok_a = len(props) >= 4
    pontos += ok_a
    print(f"  A constante {CONSTANTE}   {total} valor(es) em {len(props)} propriedade(s)"
          f"{'  OK' if ok_a else '  (precisa de 4 propriedades)'}")
    for p, vs in sorted(props.items()):
        print(f"      {p}: {', '.join(sorted(vs))}")

    if a.projeto and a.data:
        hexa = carimbo(a.projeto, a.data)
        assets = marcador_b(html, hexa)
        ok_b = bool(assets)
        pontos += ok_b
        print(f"  B carimbo {hexa}    {len(assets)} asset(s){'  OK' if ok_b else '  nenhum'}")
        for s in assets[:5]:
            print(f"      {s}")
    else:
        print("  B carimbo         pulado (passe --projeto e --data)")

    ok_c, nomes = marcador_c(css)
    pontos += bool(ok_c)
    if ok_c is None:
        print("  C ordem no :root  nao achei bloco :root")
    else:
        print(f"  C ordem no :root  --{', --'.join(nomes)}{'  OK' if ok_c else '  fora de ordem'}")

    print()
    if pontos >= 3:
        print("  VEREDITO: assinatura completa. Origem confirmada.\n")
    elif pontos == 2:
        print("  VEREDITO: dois marcadores. Indicio forte, provavelmente minificada ou editada.\n")
    elif pontos == 1:
        print("  VEREDITO: um marcador so. Sugestivo, nao conclusivo.\n")
    else:
        print("  VEREDITO: sem assinatura.\n")
    sys.exit(0 if pontos >= 2 else 1)


if __name__ == "__main__":
    main()
