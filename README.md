# Webová aplikácia – Záverečný projekt

Toto je jednoduchá webová aplikácia vytvorená ako súčasť skúšky z predmetu **Základy klaudových technológií**. Aplikácia je nasadená do verejného cloudu (Railway) a je prístupná cez HTTPS.

---

## Čo aplikácia robí

- Zobrazí aktuálny čas v troch časových pásmach (Bratislava, New York, Tokyo).
- Zobrazí dnešný dátum.
- Počíta počet návštev stránky (uložené v databáze).
- Umožňuje registráciu a prihlásenie používateľov (s hashovaním hesiel).
- Umožňuje pridať študentov a zobraziť ich zoznam.
- Tmavý a svetlý režim stránky (zapamätá sa v prehliadači).
- Zoznam používateľov (meno, email, krajina) na samostatnej podstránke.

---

## Použitý verejný cloud a služby

Aplikácia je nasadená na platforme **Railway**, ktorá zabezpečuje:

- jednoduché nasadenie aplikácie,
- PostgreSQL databázu ako plugin,
- HTTPS certifikát cez Let's Encrypt,
- možnosť automatického reštartu služby pri výpadku.

---

## Čo som vytvoril a použil

- **Frontend:** HTML, CSS, JavaScript (viacero stránok: hlavná, login, register, users)
- **Backend:** Node.js + Express + PostgreSQL
- **Dockerfile:** pre zostavenie kontajnera
- **Skripty:**
  - `prepare-app.sh` – spustí build a pripraví aplikáciu
  - `remove-app.sh` – zruší aplikáciu
  - `push-both.sh` – push projektu na GitHub aj GitLab

---

## Popis súborov

| Súbor               | Popis                                            |
|---------------------|--------------------------------------------------|
| `index.html`        | Hlavná stránka                                  |
| `register.html`     | Registrácia používateľov                        |
| `login.html`        | Prihlásenie používateľov                        |
| `users.html`        | Prehľad zaregistrovaných používateľov           |
| `style.css`         | Štýly stránky s podporou témy                   |
| `script.js`         | Frontendová logika                              |
| `server.js`         | Hlavný server aplikácie                         |
| `routes/auth.js`    | Registrácia, login, výpis používateľov          |
| `routes/students.js`| Správa študentov                                |
| `Dockerfile`        | Definícia Docker kontajnera                     |
| `prepare-app.sh`    | Spustenie aplikácie                             |
| `remove-app.sh`     | Zmazanie aplikácie                              |
| `push-both.sh`      | Upload na GitHub a GitLab                       |

---

## Ako spustiť aplikáciu

```bash
# Príprava aplikácie
./prepare-app.sh

# Odstránenie aplikácie
./remove-app.sh

# Upload projektu
./push-both.sh
```

---

## Návod na použitie

1. Otvor URL aplikácie nasadenej cez Railway.
2. Hlavná stránka ukáže čas, dátum a počet návštev.
3. Pomocou horného menu môžeš prejsť na registráciu alebo prihlásenie.
4. Po registrácii sa údaje ukladajú do databázy.
5. Na stránke používateľov sa zobrazia všetky účty (okrem hesiel).
6. Téma (tmavá/svetlá) sa dá prepínať v pravom hornom rohu.

---

## Zoznam externých zdrojov a nástrojov

- [Railway.app](https://railway.app/) – nasadenie a databáza
- [Node.js](https://nodejs.org/) + Express – backend aplikácie
- [PostgreSQL](https://www.postgresql.org/) – ukladanie dát
- [`bcryptjs`](https://www.npmjs.com/package/bcryptjs) – hashovanie hesiel
- [ChatGPT](https://chat.openai.com) – pomoc pri návrhu a písaní častí dokumentácie

---

## Bezpečnostné upozornenie

Do repozitára **neboli nahraté žiadne citlivé údaje** ako heslá, prístupové tokeny alebo konfigurácie databáz. Premenná `DATABASE_URL` je nastavená iba v Railway.
