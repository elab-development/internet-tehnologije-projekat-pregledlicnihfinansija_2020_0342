# Internet Tehnologije Projekat - Pregled Ličnih Finansija

## Opis projekta
Ovaj projekat omogućava korisnicima da prate svoje lične finansije. Korisnici mogu dodavati prihode i troškove, postavljati finansijske ciljeve (izazove) i pratiti njihov napredak. Projekat je razvijen koristeći React za frontend i Laravel za backend.

## Tehnologije koje se koriste
- **Frontend:** React, Bootstrap
- **Backend:** Laravel
- **Baza podataka:** MySQL

## Instalacija

### Backend
1. Repozitorijum je moguće klonirati sa sledećeg linka:
   
   git clone https://github.com/elab-development/internet-tehnologije-projekat-pregledlicnihfinansija_2020_0342.git
   
2. Projekat se može naći u direktorijumu:
   
   cd internet-tehnologije-projekat-pregledlicnihfinansija_2020_0342
   
3. Zavisnosti se instaliraju komandom:
   
   composer install
   
4. Potrebno je kopirati `.env.example` u `.env` i postaviti vrednosti za bazu podataka:
   
   cp .env.example .env
   
5. Generisanje ključa aplikacije vrši se komandom:
   
   php artisan key:generate
   
6. Migracije i seederi se pokreću komandom:
   
   php artisan migrate --seed
   
7. Server se pokreće komandom:
   
   php artisan serve
   

### Frontend
1. Frontend direktorijum se nalazi na:
   
   cd React
   
2. Zavisnosti se instaliraju komandom:
   
   npm install
   
3. Razvojni server se pokreće komandom:
   
   npm start
   

## Upotreba
1. Moguće je registrovati se i prijaviti na aplikaciju.
2. Dodavanje prihoda i troškova.
3. Postavljanje finansijskih ciljeva (izazova).
4. Praćenje napretka izazova i finansija.

## Struktura projekta


internet-tehnologije-projekat-pregledlicnihfinansija_2020_0342/
├── Laravel/
│    ├── app/
│    ├── bootstrap/
│    ├── config/
│    ├── database/
│    ├── public/
│    ├── resources/
│    ├── routes/
│    ├── storage/
│    ├── tests/
│    └── vendor/
├── React/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── server/
│   │   └── App.js

