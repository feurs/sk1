# Projekt: Moja Webstránka na Railway

## Popis aplikácie
Jednoduchá webová stránka zobrazujúca statický obsah cez server NGINX. Aplikácia je nasadená na verejný cloud Railway, kde je dostupná cez HTTPS.

## Použitý verejný cloud
- **Railway.com** – poskytuje jednoduché nasadenie aplikácie z GitHubu a automaticky nastavuje HTTPS certifikát.

## Použité objekty
- **Docker**: Na vytvorenie image obsahujúceho NGINX a webstránku.
- **Railway**: Automatické buildovanie a spustenie kontajnera.
- **HTTPS**: Automaticky spravovaný certifikát Railway.

## Opis súborov
- **app/index.html**: Jednoduchá HTML stránka.
- **Dockerfile**: Definuje image aplikácie s NGINX.
- **prepare-app.sh**: Skript na build Docker image.
- **remove-app.sh**: Skript na odstránenie Docker image.
- **README.md**: Táto dokumentácia.

## Návod na použitie
1. Vytvor Docker image:
   ```bash
   ./prepare-app.sh

