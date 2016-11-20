#Vasicsek Gábor IOP8IZ
###Dokumentáció
###Tantárgyak felvétele (mini Neptun)
##Követelményanalízis
###Funkcionális követelmények
- Vendégként a tantárgyak a főoldalon megtekinthetőek.
- Vendégként a tantárgyak szabadon böngészhetőek.
- Vendégként a tantárgyak adatai megtekinthetőek.
- Vendégként a tantárgyak kereshetőek.
- Vendégként van lehetőség regisztrációra.
- Felhasználóként van lehetőség belépni az oldalra.
- Felhasználóként van lehetőség saját adatok módosítására.
- Felhasználóként van lehetőség új tantárgy felvételére.
- Felhasználóként van lehetőség tantárgyak módosítására, törlésére.
###Nem funkcionális követelmények
- Felhasználóbarát, ergonomikus elrendezés és kinézet.
- Gyors működés.
- Biztonságos működés: jelszavak tárolása, funkciókhoz való hozzáférés.
###Szerepkörök
- Vendég: Tantárgyak keresését, böngészését és megtekintését végezheti.
- Felhasználó: A vendég szerepkörén túl a saját tantárgyainak kezelésére (új, módosít, törlés) képes.
###Használati esetek
![](docs/images/alkfejlusecasediagramm.PNG)
##Tervezés
###Oldaltérkép
Publikus:

- Főoldal
- Tantárgyak böngészése
    + Tantárgy megtekintése
- Belépés
- Regisztráció

Felhasználó

- Kilépés
- Profiladatok
    + Profiladatok szerkesztése
- Új tantárgy felvitele
###Végpontok
- GET/: főoldal
- GET/login: bejelentkező oldal
- POST/login: bejelentkezési adatok felküldése
- GET/register: regisztráció oldal
- POST/register: regisztrációs adatok felküldése
- GET/logout: kijelentkező oldal
- GET/ownSubjects: saját tantárgyak listázása
- GET/subjects/create: új tantárgy felvitele, űrlap megjelnítése
- POST/subjects/create: új tantárgy felvitele, adatok küldése
- GET/subjects/:id: tantárgy megtekintése
- GET/subjects/:id/edit: tantárgy módosítása
- POST/subjects/:id/edit: tantárgy módosítása, adatok küldése
- GET/subjects/:id/delete: tantárgy törlése
- GET/users/list: felhasználók listázása
- GET/users/:id: felhasználó megtekintése
- GET/users/:id/delete: felhasználó törlése
- GET/users/:id/edit: felhasználó módosítása
- POST/users/:id/edit: felhasználó módosítása, adatok küldése
- GET/search: keresés
###Oldalvázlatok
![](docs/images/fooldal.PNG)
![](docs/images/bejelentkezes.PNG)
![](docs/images/regisztracio.PNG)
![](docs/images/fooldal2.PNG)
![](docs/images/felvesz.PNG)
![](docs/images/megtekint.PNG)
![](docs/images/szerkeszt.PNG)
![](docs/images/fooldal3.PNG)
![](docs/images/felhasznalok.PNG)
![](docs/images/felhasznalomegtekint.PNG)
![](docs/images/felhasznaloszerkeszt.PNG)
![](docs/images/keres.PNG)
###Adatmodell
![](docs/images/alkfejlmodell.png)
##Implementáció
###Fejlesztői környezet
- Visual Studio Code
- Node.js
- Adonis.js
- Git + Github
###Könyvtárstruktúra
##Felhasználói dokumentáció
###A futtatáshoz ajánlott hardver-, szoftver konfiguráció
- Futtatáshoz szükséges operációs rendszer: Tetszőleges operációs rendszer
- A futtatáshoz szükséges hardver: Operációs rendszerek szerint megadva
- Egyéb követelmények: Internet böngésző telepítése, JavaScript ajánlott
###Telepítés lépései
- Terminál nyitása -> git clone https://github.com/vasicsek/alkfejl.git -> cd neptun -> npm start
###A program használata