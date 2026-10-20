# Oldalterv: Főoldal, Élővilág, Kvíz

A dokumentum a mi három oldalunk tartalmi szerkezetét és kinézetét rögzíti. A Térkép és a Tippek oldal (elérhetőségek, tévhitek, GYIK) a csapat másik feléé, ide csak a rájuk mutató hivatkozások kerülnek.

A dizájn mintája a főoldal. Minden új oldal ugyanazokat a tokeneket, betűtípusokat, gombokat és szekcióritmust használja.

## 1. Közös szabályok

### Felépítés
Minden oldal ugyanabból a vázból áll:

1. Fejléc (header): logó, márkanév, navigáció, témaváltó. Az aktuális oldal menüpontja `active` és `aria-current="page"`.
2. Oldalfejléc sáv (csak aloldalon): `bg-dark` háttér, `h1`, egy-két mondatos bevezető, alatta az oldal szakaszaira mutató linkek. Teljes képernyős hero csak a főoldalon van.
3. Tartalmi szekciók: `container`, a szekciók között `mt-8` / `mb-12` térköz. Hosszabb oldalon egy-egy szekció `bg-dark` sávba kerülhet, ahogy a főoldalon a Galéria.
4. Lábléc: ugyanaz, mint a főoldalon.
5. Vissza a tetejére gomb.

### Vizuális rendszer
- Betűk: Fraunces a címekhez, Inter minden máshoz (már be van állítva).
- Színek: csak a `style.css` tokenjei (`--bg`, `--bg-light`, `--primary` stb.). Nyers hex érték a komponensekben nem lehet.
- Gombok: fő művelet `btn-solid`, másodlagos `btn-outline`. Egy szekcióban legfeljebb egy `btn-solid`.
- Kártya: `card`, háttér `bg-light`, keret `border-muted`. Kártyán belüli mező `bg` vagy `bg-dark`.
- Képek: WebP, `loading="lazy"`, megadott `width` és `height` (ne ugráljon az elrendezés), `ratio` vagy `object-fit-cover` a kártyákban. Minden képnek leíró `alt` szövege van.
- Ikonok: inline SVG (Bootstrap Icons). Emoji nem lehet.
- Állapot: a helyes és a hibás választ szöveg és ikon is jelzi, nem csak a szín.
- Animáció: csak ahol jelentése van (görgetés anchorhoz, carousel, a vissza gomb beúszása, kvíz továbblépés). `prefers-reduced-motion` esetén nincs.

### Aloldali útvonalak
Az aloldalak a `pages/` mappában vannak, ezért minden útvonal `../` előtaggal indul (`../css/style.css`, `../assets/...`, `../index.html`). A `script.js` logóváltója és a többi hivatkozás ezt figyelembe kell vegye.

### Szövegezés
- Tegező, egyszerű, tárgyszerű mondatok. Egy mondat egy állítás.
- Nincs felkiáltójeles reklámnyelv, nincs „lenyűgöző”, „varázslatos”, „a Föld tüdeje” típusú közhely.
- Számadatnál mértékegység és kerekítés egységesen (pl. 30–45 méter, 2000–4000 mm).
- Állatneveknél a magyar név, mellette kisebb, tompított betűvel a tudományos név.

## 2. Főoldal (minta)

Wireframe: [fooldal-wireframe-v2.png](fooldal-wireframe-v2.png)

A szerkezet kész, ezen nem változtatunk:

1. Hero: cím, hook szöveg, Élővilág és Kvíz gomb, Görgess tovább.
2. Miért fontosak az esőerdők? (3 bekezdés, kép)
3. Az esőerdő szintjei (tabok)
4. Galéria (bento, csempénként egy aloldal)
5. Próbakérdés
6. Lábléc

Tartalmi teendők:
- Lábléc, Hasznos linkek: a `#` linkeknek nincs célja. Javaslat: „Kapcsolat” mutasson a Térkép oldal elérhetőség részére, „Források” egy forráslistára (a Tippek oldal végén vagy a láblécben), az „Adatvédelem” és a „Felhasználási feltételek” kerüljön ki, mert nincs mögöttük oldal.
- Lábléc, A projektről: a specifikáció kéri a GitHub linket, ez jelenleg hiányzik.
- Galéria: a képek még helykitöltő SVG-k („Absztrakt …” alt szöveggel). Valódi fotóknál az alt szöveg írja le, mi látszik a képen.

## 3. Élővilág oldal

Cél: kategóriánként bemutatni az állatokat (kötelező: egzotikus, veszélyeztetett, mérgező), galériát adni, és leírni, mit kell tenni vészhelyzetben.

Wireframe: [elovilag-wireframe.png](elovilag-wireframe.png)

### Szerkezet

**3.1 Oldalfejléc**
- `h1`: Élővilág
- Bevezető: „Az esőerdők a Föld ismert fajainak több mint felének adnak otthont. Itt három csoportban mutatunk be néhányat: feltűnő, veszélyeztetett és mérgező fajokat.”
- Ugrólinkek (`chip` vagy `btn-outline btn-sm`, sortöréssel): Egzotikus, Veszélyeztetett, Mérgező, Galéria, Vészhelyzetben

**3.2 Kategóriaszekciók (3 db, egymás alatt)**
Nem tabok: egymás alatt jobban átlátható, linkelhető (`#egzotikus`), és a kereső is látja. Minden szekció:
- `h2` + egy mondat a kategóriáról
- kártyarács: `row row-cols-1 md:row-cols-2 lg:row-cols-4 g-6`
- kártya: kép (`ratio ratio-4x3`), `h3` magyar név, tudományos név (`text-muted`, dőlt), 2–3 mondat leírás, alul címkék (`badge badge-subtle`)

Címkék:
- élőhely szintje (pl. „Lombkorona”), egységesen a főoldal szintjeivel
- veszélyeztetetteknél IUCN-besorolás szövegesen: „Súlyosan veszélyeztetett (CR)”, „Veszélyeztetett (EN)”, „Sebezhető (VU)”
- mérgezőknél a veszély módja: „Bőrön át mérgező”, „Mérges marás”, „Mérges csípés”

Javasolt fajok (kategóriánként 4):

| Kategória | Faj | Tudományos név | Szint | Megjegyzés |
|---|---|---|---|---|
| Egzotikus | Óriás tukán | *Ramphastos toco* | Lombkorona | Csőre a testhossz harmada, hőleadásra is használja |
| Egzotikus | Arakanga | *Ara macao* | Lombkorona | Folyóparti agyagfalakról agyagot eszik, valószínűleg só miatt |
| Egzotikus | Kék morfólepke | *Morpho peleides* | Cserjeszint | A szárny színét a pikkelyek szerkezete adja, nem festék |
| Egzotikus | Barnatorkú lajhár | *Bradypus variegatus* | Lombkorona | Bundájában algák nőnek |
| Veszélyeztetett | Borneói orangután | *Pongo pygmaeus* | Lombkorona | CR; élőhelyét olajpálma-ültetvények szűkítik |
| Veszélyeztetett | Szumátrai tigris | *Panthera tigris sondaica* | Talajszint | CR |
| Veszélyeztetett | Hárpia | *Harpia harpyja* | Kiemelkedő fák | VU; majmokra és lajhárokra vadászik |
| Veszélyeztetett | Okapi | *Okapia johnstoni* | Talajszint | EN; a zsiráf legközelebbi élő rokona |
| Mérgező | Arany nyílméregbéka | *Phyllobates terribilis* | Talajszint | Bőre érintésre is veszélyes; élénk színe figyelmeztetés |
| Mérgező | Brazil vándorpók | *Phoneutria nigriventer* | Talajszint | Mérges marás |
| Mérgező | Lándzsakígyó | *Bothrops atrox* | Talajszint | Mérges marás; sok kígyómarásos baleset okozója Dél-Amerikában |
| Mérgező | Golyóhangya | *Paraponera clavata* | Talajszint | Az egyik legfájdalmasabb rovarcsípés |

A besorolásokat beépítés előtt az IUCN Vörös Listán ellenőrizzük, és a forrást a forráslistába írjuk.

**3.3 Galéria** (`bg-dark` sáv, mint a főoldalon)
- A főoldali bento galéria újrahasznosítva, 3 csempével, kategóriánként egy carousellel. Így nem kell új CSS.
- Képaláírás a carouselben: faj neve és hol készült a kép.

**3.4 Vészhelyzetben**
Két oszlop (`lg:col-5` + `lg:col-7`), mobilon egymás alatt.
- Bal: kártya a segélyhívó számokkal, nagy, jól olvasható számokkal, országonként:
  - Brazília: 192 mentők, 193 tűzoltóság és mentés, 190 rendőrség
  - Peru: 106 mentők, 116 tűzoltóság, 105 rendőrség
  - Kolumbia: 123 egységes segélyhívó
  - Alatta: „Térerő nélkül a túravezetőnél lévő műholdas telefon vagy jeladó segít.” és link a Térkép oldalra (mentőpontok, idegenvezetők elérhetősége).
  - A számokat beépítés előtt hivatalos forrásból ellenőrizzük.
- Jobb: accordion helyzetenként, mindegyikben 3–5 lépés számozott listában:
  - Eltévedtél
  - Kígyómarás
  - Pók- vagy rovarcsípés
  - Vérző sérülés
  - Kiszáradás, hőguta
- A kártya `theme-danger` keretet kaphat, de a szöveg normál színű marad, hogy olvasható legyen.

### Kapcsolódások
- A címkék szintneve a főoldal „Az esőerdő szintjei” részére utal.
- A Vészhelyzetben rész alján: „Részletes túlélő technikák a Tippek oldalon.”

## 4. Kvíz oldal

Cél: 10 kérdésből felmérni, mekkora eséllyel élnéd túl a vadont, majd pontszámot, százalékot, szöveges visszajelzést és továbblépési lehetőséget adni.

Wireframe: [kviz-wireframe.png](kviz-wireframe.png)

### Szerkezet

**4.1 Oldalfejléc**
- `h1`: Túlélő kvíz
- Bevezető: „10 kérdés arról, hogyan boldogulnál egyedül az esőerdőben. Nincs időkorlát, az eredményt a végén látod.”
- Gomb: Kezdés (`btn-solid`)

**4.2 Kérdések**
Egy kérdés látszik egyszerre, így mobilon is áttekinthető.
- Fent: „3. kérdés / 10” felirat és `progress` sáv (`aria-valuenow`).
- Kérdés `fieldset` + `legend`, négy válasz `radio` + `label` (`form-field`), a teljes sor kattintható.
- Alul: Vissza (`btn-outline`) és Tovább (`btn-solid`); a Tovább csak kiválasztott válasz után aktív. Az utolsó kérdésnél a gomb felirata: Kiértékelés.
- Kérdés közben nincs helyes/hibás jelzés, minden a végén derül ki.
- JavaScript nélkül mind a 10 kérdés egymás alatt látszik, és a Kiértékelés gomb a végén van.
- Továbblépéskor a fókusz az új kérdés címére kerül.

**4.3 Eredmény**
- Kártya: „7 / 10 helyes válasz”, alatta a túlélési esély százalékban (helyes válaszok × 10%) és `progress` sávval.
- Szöveges értékelés három sávban:
  - 0–4: „Most még nehezen boldogulnál. A Tippek oldalon az alapokkal kezdheted.”
  - 5–7: „Az alapokat ismered, de egy-két hiba a vadonban sokba kerülhet.”
  - 8–10: „Jól felkészültél. Túravezető mellett biztonsággal mozognál az esőerdőben.”
- Válaszaid: `list-group`, kérdésenként a te válaszod, a helyes válasz és egy mondatos magyarázat. Helyes válasznál pipa ikon és „Helyes” szöveg, hibásnál x ikon és „Hibás” szöveg.
- Gombok: Tippek oldal (`btn-solid`), Újrakezdés (`btn-outline`), Élővilág (link).

### Kérdések

| # | Téma | Kérdés | Helyes válasz | Rossz válaszok |
|---|---|---|---|---|
| 1 | Víz | Mit tegyél a patak vizével, mielőtt megiszod? | Forrald legalább egy percig. | Szűrd át egy pólón. / Hagyd állni egy órát. / Semmit, a folyó víz tiszta. |
| 2 | Menedék | Hol a legveszélyesebb éjszakára tábort verni? | Kiszáradt patakmederben. | Enyhe lejtőn. / Két fa között. / Az ösvénytől pár méterre. |
| 3 | Alvás | Miért érdemes a talajtól felemelve aludni? | A földön rovarok, kígyók és nedvesség érhet. | Fent melegebb van. / Onnan messzebbre látsz. / Reggel gyorsabban felkelsz. |
| 4 | Eltévedés | Mi az első teendő, ha eltévedtél? | Megállsz, megnyugszol, és ott maradsz, ahol vagy. | Elindulsz a legközelebbi hang felé. / Éjszaka is továbbmész. / Felmászol a legmagasabb fára. |
| 5 | Tájékozódás | Ha folyót találsz, merre érdemes követni? | Folyásirányban lefelé. | Folyásiránnyal szemben. / Mindegy. / Nem érdemes követni. |
| 6 | Elsősegély | Mit tegyél kígyómarás után? | Maradj nyugton, mozgasd minél kevésbé a végtagot, és hívj segítséget. | Szívd ki a mérget. / Szorítsd el erősen a végtagot. / Vágd be a sebet. |
| 7 | Állatok | Mi jelzi gyakran, hogy egy béka mérgező? | Élénk, feltűnő színe. | Nagy mérete. / Hangos brekegése. / Hogy vízben él. |
| 8 | Táplálék | Ismeretlen bogyót találsz. Mit teszel? | Nem eszed meg. | Megkóstolsz belőle keveset. / Megeszed, ha a madarak is eszik. / Megfőzöd, és megeszed. |
| 9 | Tűz | Miért nehéz tüzet gyújtani az esőerdőben? | Szinte minden nedves, száraz anyagot csak álló, elhalt ágakról vagy kéreg alól találsz. | Mert kevés a fa. / Mert a levegőben kevés az oxigén. / Mert a fák nem gyúlnak meg. |
| 10 | Jelzés | Hogyan vehet észre legkönnyebben egy mentőhelikopter? | Tisztásra vagy folyópartra mész, ahol fentről látszol. | Kiabálsz. / Zseblámpával világítasz a fák alól. / Tüzet raksz a sűrű erdőben. |

A válaszok sorrendje kérdésenként változzon, hogy a helyes ne mindig ugyanott legyen.

### Kapcsolódások
- A főoldali próbakérdés (lajhár) nem szerepel a 10 kérdés között, így nem ismétlődik.
- Az eredményből a Tippek oldalra mutató link a specifikáció része.

## 5. Nyitott kérdések
- Képek: az Élővilág oldalhoz kategóriánként 4 fotó kell (szabad licencű, pl. Wikimedia Commons), a forrással együtt. Generált kép ne kerüljön valódi fajként az oldalra.
- Forráslista: hol legyen (lábléc vagy Tippek oldal)? Ezt a Tippek oldal készítőivel kell egyeztetni.
- Szerzők neve a láblécben: a főoldalon „Ménes Megyer” szerepel, a git szerzőnél „Megyer Menes”. Melyik a helyes?
