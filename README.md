# Peak Conditions

## Valg vi har tatt

Vi har antatt at man kan presantere ett og ett kort i en grid (en form for liste) der scorlling er muligheten til å bla seg frem eller tilbake. Man hopper til en spesifikk ressurs ved å trykke på 'detaljer' under kortet.

Vi har et filter der man kan sortere skisteder etter navn. Man kan også velge å bare vise favoritter. Favoritter huskes hvis du lukker igjen nettleseren din og åpner den igjen. Hvis du refresher siden vil den huske om du filtrerer alfabetisk eller reversert alfabetisk, men hvis laster inn siden på nytt så vil den filtrere  alfabetisk.

Man kan trykke på stjernen i et destinasjonskort for å legge den til som favoritt. Dette valget huskes hvis du starer nettleseren på nytt.

Siden er responsiv som gjør at appen kan brukes på store skjermen og mindre smarttelefoner.

Et godt eksempel av ryddig utforming er langtidsvarselet til et skisted. Hvis man er på mobil så endres presentasjonen av tabellen drastisk for å beholde ryddig utforming.

## Tekniske prestasjon

Peak Conditions vil aldri sende flere requests til meteorologisk institutts API enn nødvendig. Appen sjekker når meteorologisk institutt skal oppdatere værvarslingen for en destinasjon og holder dataen fersk helt frem til da.

## Hva som er testet

Ettersom dekningsgrad ikke var fokuset for P1, har vi bare testet en komponent. DestinationCardComponent har to normale komponent tester, og en snapshot test. Dataen er mocket slik at ingen API kall blir gjort. For å kjøre testene kjør 'npm test'.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
