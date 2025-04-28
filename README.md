# Moja Aplikácia 2.0

Toto je moja webová aplikácia vytvorená pre skúšku z predmetu Základy klaudových technológií.  
Aplikácia zobrazuje aktuálny čas vo viacerých časových pásmach, dnešný dátum a počet návštev.  
Okrem toho umožňuje registráciu a prihlasovanie používateľov a správu študentov.

---

## Čo aplikácia robí

- Zobrazí aktuálny čas v Bratislave, New Yorku a Tokyu.
- Ukáže dnešný dátum.
- Počíta, koľko ľudí navštívilo stránku.
- Dá sa zaregistrovať a prihlásiť.
- Umožňuje pridať a zobraziť študentov (meno, štátna príslušnosť, dátum narodenia, fakulta, priemer).

---

## Aký cloud som použil

Použil som Railway.app, kde som nasadil moju aplikáciu aj PostgreSQL databázu.  
HTTPS certifikát bol nastavený automaticky cez Railway.

---

## Čo som vytvoril

- **Frontend** (HTML, CSS, JavaScript) – hlavná stránka, prihlasovanie a registrácia.
- **Backend** (Node.js + Express) – spracovanie prihlásenia, registrácie, práca s databázou.
- **Databázu** (PostgreSQL) – uchováva údaje o návštevách, používateľoch a študentoch.
- **Dockerfile** – aby som mohol aplikáciu zabaliť do kontajnera.
- **Skripty** na spustenie a odstránenie aplikácie.

---

## Popis hlavných súborov

- `index.html` – hlavná stránka
- `login.html` – prihlásenie
- `register.html` – registrácia
- `style.css` – štýly stránky
- `script.js` – logika na strane prehliadača
- `server.js` – hlavný server
- `auth.js` – registrácia a prihlásenie
- `students.js` – práca so študentami
- `Dockerfile` – vytvorenie kontajnera
- `prepare-app.sh` – skript na prípravu
- `remove-app.sh` – skript na odstránenie
- `push-both.sh` – skript na push na GitHub a GitLab

---

## Ako spustiť aplikáciu

1. Buildni aplikáciu:
```bash
./prepare-app.sh
2. Ak chceš aplikáciu odstrániť:
```bash
./remove-app.sh
3. Ak chceš nahrať zmeny na GitHub a GitLab:
```bash
./push-both.sh

## Na čo si dať pozor
