# Weather-app

React Native (Expo) -sovellus, jonka tarkoitus on tarjota käyttäjille mahdollisuus tarkastella sääennusteita ensimmäisessä näkymässä ja näyttää heidän sijaintinsa kartalla toisessa näkymässä.

## Asennus
Sovelluksen API avain on saatavilla osoitteessa https://openweathermap.org/api. Sinun tulee luoda tili saadaksesi ilmaisen API avaimen sovelluksen käyttöä varten.

1. Asenna NPM-paketit
 ```sh
npm install
 ```
   
2. Syötä API avain `5DayWeather.js`, `Position.js` sekä `Weather.js` -tiedostoihin.
 ```js
const EXPO_PUBLIC_API_KEY = 'YOUR_API_KEY';
```

3. Käynnistä sovellus
```bash
npm start
```

## Sovelluksen sisältö 

**Sääennuste:**
- kaupunki 
- tämänhetkinen sää
- säätiedot (tuntuu kuin, tuulen nopeus, näkyvyys, ilmankosteus)
- 5 päivän sääennuste
  
 **Sijainti kartalla:** 
- näyttää käyttäjän sijainnin kartalla
- sijainti ikonia painamalla tulee näkyviin "Sijaintisi - olet täällä" -tekstikenttä

<p float="left">
  <img src="https://github.com/Janikavuo/Weather-app/assets/112496055/720e4ef9-79b9-48a8-9b82-d04a493f68b2" width="250" />
  <img src="https://github.com/Janikavuo/Weather-app/assets/112496055/9c918e9b-7cf1-4a91-8f5c-9308f199cb1a" width="250" />
</p>
