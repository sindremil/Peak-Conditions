# Peak Conditions

## Viktig informasjon
Det finnes to versjoner av appen. Den som er på virtual machine bruker samme bilde på alle destinasjoner. Hvis man kjører med npm run dev så vil man få de faktiske bildene.

## Kjøring av appen

For å kjøre appen i så må man skrive npm install og så npm run dev.

## Beskrivelse av appen

Peak Conditions skal gi brukere en bedre måte sjekek været på. Når man først går inn på siden så ser man destinasjoner og været på det laveste punktet til skistedet. Når man trykker på detaljer så får man været akuratt nå på tre punkter og et langtidsvarsel for det laveste punktet. Hvis man trykker på en av de to andre punktene så langtidsvarslet gjelde for det punktet.

## Valg vi har tatt

Vi har antatt at man kan presantere ett og ett kort i en grid (en form for liste) der scorlling er muligheten til å bla seg frem eller tilbake. Man hopper til en spesifikk ressurs ved å trykke på 'detaljer' under kortet.

Vi har et filter der man kan sortere skisteder etter navn. Man kan også velge å bare vise favoritter. Favoritter huskes hvis du lukker igjen nettleseren din og åpner den igjen. Hvis du refresher siden vil den huske om du filtrerer alfabetisk eller reversert alfabetisk, men hvis laster inn siden på nytt så vil den filtrere  alfabetisk.

Man kan trykke på stjernen i et destinasjonskort for å legge den til som favoritt. Dette valget huskes hvis du starer nettleseren på nytt.

Siden er responsiv som gjør at appen kan brukes på store skjermen og mindre smarttelefoner.

Et godt eksempel av ryddig utforming er langtidsvarselet til et skisted. Hvis man er på mobil så endres presentasjonen av tabellen drastisk for å beholde ryddig utforming.

## Tekniske prestasjon

Peak Conditions vil aldri sende flere requests til meteorologisk institutts API enn nødvendig. Appen sjekker når meteorologisk institutt skal oppdatere værvarslingen for en destinasjon og holder dataen fersk helt frem til da.

## Hva som er testet

Det er komponent tester for NavBar og DestinationCard. Dekningsgraden på komponentene er høy, og API kall blir avbrutt av Mock Service Worker. NavBar har i tillegg en snapshot test.

## Endringer fra første til andre vurdering

- Fikset bug som gjorde at siden ikke hadde riktig font.
- Fikset bug som gjorde at musepekeren ikke endret tilstand når den svevet over en klikkbar WeatherNow Componenet
- Gjorde det enklere å se hvilket punkt langstidsvarslet tilhører
- Endret fargene til iconene på WeatherNow componenten

## Expanding the ESLint configuration

- Fikset bug som gjorde at siden ikke hadde riktig font.
- Fikset bug som gjorde at musepekeren ikke endret tilstand når den svevet over en klikkbar WeatherNow Componenet
- Gjorde det enklere å se hvilket punkt langstidsvarslet tilhører
- Endret fargene til iconene på WeatherNow componenten
- La til favicon.
- La til dynamisk document title som er basert på hvilke side man er på
- Endret navbar til å være position absolute fra position fixed
- Endret på filstrukturen til prosjektets sånn at filer som hører sammen er gruppert.
- Endret på ESLint config til airbnb, airbnb typescript og prettier (Altså config som fjerner formattering fra ESLint).
- Endret på ForecastList til å vise time for time og mer tilpasset informasjon.

