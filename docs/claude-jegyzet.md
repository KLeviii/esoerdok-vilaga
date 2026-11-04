# Jegyzet a 2026. 11. 04-i javításokról (Claude)

Kérted, hogy a saját döntéseimről itt értesítselek. Röviden: a dokumentáció 10. fejezetében felsorolt, kódban javítható pontokat megcsináltam, a Bootstrap 6 maradt, és a dokumentáció v1.3-ra lépett.

## Mi készült el

| Nyitott pont | Mit csináltam | Hol |
|---|---|---|
| Fenntarthatósági tippek (kötelező) | Új szekció: „Mit tehetünk mi az esőerdőkért?”, 6 ötlet számozott listában (Bootstrap `list-group-numbered`). Minden oldal láblécében új link vezet rá. | `pages/tippek.html#mittehetunk` |
| Növényvilág | Új „Növényvilág” szekció 4 kártyával: kapokfa, óriás tavirózsa, óriás rafflézia, kakaófa. A kártyák az állatkártyákkal azonos szerkezetűek. Új gomb a lap tetején. | `pages/elovilag.html#novenyek` |
| style.css validálás | A `container` / `@container` helyett `@media (width < 1024px)` / `(width >= 1024px)`. A hero overlay `linear-gradient` két azonos színstopot kapott. W3C CSS Validator: mindhárom CSS-fájl 0 hiba. | `css/style.css` |
| Idegenvezetők képei | Három különböző kép, leíró alt szöveggel. | `pages/terkep.html`, `assets/idegenvezeto-*.webp` |
| Térkép: útvonaltáblázat | Összehasonlító táblázat: útvonal, kiindulópont, jellemző hossz, nehézség, ajánlott szint. | `pages/terkep.html`, a kártyák alatt |
| Inline témaszkript | Átkerült a `js/tema.js` fájlba, amely a `<body>` elején, szinkron töltődik be. A HTML-ben nincs több inline szkript. | mind az 5 oldal |
| README | Helyes klónozási URL, a tényleges munkamegosztás, Bootstrap 6 a technológiák között, élő oldal és dokumentáció linkje. | `README.md` |
| Dokumentáció | v1.3: borító, checklist (33 / 1 / 1), 5., 7., 8., 9., 10. és 11. fejezet, verziótörténet, fejléc. A `fájl:sor` hivatkozásokat a diff alapján az új sorszámokra frissítettem. | `docs/Projektdokumentacio-Esoerdok-vilaga-v1.3.docx` |

## Saját döntések, amiket érdemes átnézned

1. **Növényképek.** Három új fotót töltöttem le a Wikimedia Commonsról (erre engedélyt adtál): óriás tavirózsa (CC BY-SA 4.0), óriás rafflézia (CC BY-SA 4.0), kakaófa (CC BY-SA 3.0). A kapokfához a főoldal meglévő képét (`fooldal-a-3.webp`) használtam újra. A szerzők és a licencek bekerültek a `docs/kepforrasok.md`-be és az Élővilág oldal „Képek forrása” részébe.
2. **Idegenvezetők képei.** Mateo maradt a régi `idegenvezeto.webp`. Carlos és Gabriel képe a „munka közben” galéria `kep1.webp`, illetve `kep2.webp` képéből készült négyzetes kivágat. Ezek ugyanúgy generált képek, mint az eredeti, csak most mindhárom kártya mást mutat. Ha vannak saját képeitek, ezeket érdemes lecserélni.
3. **Útvonaltáblázat adatai.** A kiindulópontok és a túrahosszak tájékoztató becslések. Ezt a táblázat felirata ki is mondja. Ha Megyernek pontos forrása van, írja át.
4. **Apró javítások a Térkép oldalon.** „Beszülött” → „Bennszülött vezetővel” (a kártyacímkén és a táblázatban), „túlélelési” → „túlélési”, „kapcsolódáson,biztonságon” → „kapcsolódáson, a biztonságon”. A carousel angol „Previous/Next/Slide” feliratai magyarra változtak.
5. **Fenntarthatósági tippek.** 6 ötlet lett, nem 5 (a feladat legalább 4–5-öt kér). Ez nem kártyarács, hanem számozott lista, hogy ne nézzen ki „AI-sablonnak”.
6. **Galéria-töréspont.** A galéria a `.container`-ben van, ami 1024 px alatt 768 px-nél keskenyebb. A `@media (width >= 1024px)` ezért pontosan ugyanott vált, ahol eddig a container query. Mértem 700, 900, 1023, 1040 és 1300 px-en.
7. **Commit-szám a dokumentációban.** 69 commitot írtam bele (54 Levente, 15 Megyer; merge nélkül 60), ez a dokumentációs committal együtt értendő.

## Ellenőrzés

- Helyi másolat, Chromium: 5 oldal × 360, 768 és 1440 px, sötét és világos téma: 0 konzolhiba, 0 hibás kérés, 0 vízszintes túlcsordulás, 0 törött vagy torz kép.
- Nu Html Checker: 5/5 oldal 0 hiba (csak tájékoztató üzenetek).
- W3C CSS Validator: `style.css`, `terkep.css`, `tippek.css` 0 hiba.
- A Word-fájlt a Word-ből PDF-be exportálva oldalanként átnéztem.
- **Nem ellenőriztem:** az élő GitHub Pages oldalt a push után, Firefoxot, Safarit, valódi telefont.

## Amit neked kell megcsinálnod

1. **A régi v1.2 Word-fájl.** A gitből kivettem, de a gépeden még ott van: a Wordben nyitva volt, ezért nem tudtam átnevezni vagy törölni. Zárd be a Wordöt, és töröld a `docs/Projektdokumentacio-Esoerdok-vilaga-v1.2.docx`-et és a `docs/~$ojektdokumentacio-…` zárolási fájlt. A v1.3-ba ne a régi, nyitott példányban írj tovább.
2. **Képernyőképek a dokumentációban.** Ezek még a v1.2 állapotát mutatják: az új táblázat, a növények és a tippek nem látszanak rajtuk. A verziótörténet ezt jelzi. Ha kell, cseréld őket a Wordben.
3. **A dokumentumban szereplő kódhivatkozások.** Az általam átírt bekezdésekben a fájlnevek nem Consolas betűsek, mint a többi helyen. Ez apró formai eltérés; Wordben egy kattintással formázható.
4. **Továbbra is nyitott** (a dokumentáció 10. fejezete szerint): Bootstrap 5 vs. 6 egyeztetése, hangeffekt (opcionális), döntési játék (opcionális), a térkép csak az Amazonast fedi, a Firefox- és telefonos tesztelés, a Trello, a kutatási jegyzet.

## Git

- Új branch: `fix/nyitott-pontok`, két commit: kód és dokumentáció. Attribúció egyikben sincs.
- A branchet fast-forwarddal a `main`-be is összefésültem, és mindkettőt pusholtam, hogy a GitHub Pages frissüljön. Ha inkább PR-t szerettél volna, a branch megvan; a `main` visszaállítható az előző `fd9a142` commitra.
