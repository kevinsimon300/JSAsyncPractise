[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6xf2tuQr)
# **M06-UF4-PR01_INITIAL_CODE**

Repositori del codi inicial de la pràctica M06-UF4

# **Instruccions**
- Si el professor ho considera convenient serà necessari superar una entrevista o presentació de la pràctica mostrant el correcte funcionament de l'aplicació per poder obtenir una nota.
- L'entrega es realitzarà utilitzant 2 plataformes: Sallenet i Github. És obligatoria l'entrega dins del termini a les dues per poder obtenir una nota.

# **Instruccions de comandes de testing**
Hi han 3 comandes programades en aquest projecte:
- *npm run lint*: Executa ESLint per tots els fitxers amb extensió ".js" que estiguin dins de la carpeta "js" i també els que estiguin a un nivell de carpetes inferior.
- *npm run test:e2e*: Executa uns tests end-to-end amb l'eina "Cypress", preparats per comprovar si el funcionament general de l'aplicació és correcte. Els tests validaran si la pràctica funciona correctament (tingues en compte que els tests no validen algunes funcions com els punts suspensius del ranking, hi haurà requisits que s'han de provar manualment).
- *npm run test:e2e:open*: Executa els tests end-to-end amb una plataforma visual.

# **Enunciat**
## **LS PokeMemory**
Se'ns demana crear una aplicació similar a un joc del Memory utilizant imatges de pokemons.

### **Instruccions del joc Memory simple**
L'usuari té X parelles de cartes girades cap per avall sobre el tauler (on X és un nombre natural qualsevol).
Quan l'usuari clica a una carta, aquesta es gira i es mostra la imatge de la cara superior. Al clicar a una segona carta, també es gira, si no té la mateixa imatge que l'anterior es tornen a girar cap per avall les dues cartes, si té la mateixa imatge que l'anterior es mantenen destapades i ja no es poden tocar més aquestes dues cartes.
Quan l'usuari ha destapat totes les cartes (ha trobat totes les parelles guanya).

### **Interaccions de l'usuari del PokeMemory**
#### **Registre**
Al principi l'usuari veurà només un formulari de registre amb id "*user-form*". En aquest formulari se li demanarà les següents dades amb els següents inputs HTML:
  - Username: amb un input HTML amb id "*username*".
  - Email: amb un input HTML amb id "*email*".

Quan l'usuari cliqui al botó de submit del formulari s'haurà de:
  1. Utilitzant l'API i la BBDD "Realtime DB" que ofereix l'aplicació de Firebase (fent servir el mètode "fetch", no la llibreria de Firebase) cal comprovar si el email existeix a la BBDD.
     - Si existeix, s'ha de sobreescriure el username.
     - Si no existeix, s'ha d'afegir un nou registre.
  2. L'id d'usuari que retorni l'API s'haurà de guardar al sessionStorage amb la clau "*user*".

#### **Joc**
Sempre que hi hagi un id d'usuari amb la clau "*user*" al sessionStorage, no es mostrarà el formulari de registre, sino que es mostrarà la vista del joc.
La vista del joc consistirà en 3 parts, totes 3 dins d'un contenidor amb id "*game*":
  1. Al costat esquerra es mostrarà el següent:
      - Un formulari amb id "*game-form*" per introduir quantes cartes l'usuari vol que tingui la partida.
        - Per fer-ho hi haurà un input HTML amb id "*cards-number*", i un botó de submit amb la id "*play-btn*".
        - Quan es cliqui al botó de submit del formulari, caldrà verificar si a l'input hi ha un nombre enter, positiu i parell.
          - Si no compleix la verificació, caldrà mostrar un missatge d'error en un tag dialog amb la id "modal".
        - Si és correcte, començarà la partida:
          - Es canviarà el text del botó "*play-btn*" per un missatge similar a "Volver a jugar", i quan es cliqui s'ha de parar la partida actual i començar-ne una de nova.
          - S'iniciarà un contador amb id "*timer*", en el que es veuran els minuts i segons se la següent forma "0m 3s".
          - Es mostrarà el taulell del joc amb la id "*game-board*" amb les cartes girades.
            - No cal crear l'efecte de girar una carta. Al clicar-ne una, es pot mostrar la imatge directament. Si es fa contarà dins del punt "styles".
            - Quan una carta es giri o mostri la imatge caldrà que se li afegeixi una classe CSS anomenada "*flipped*".
            - La imatge s'ha de mostrar utilitzant l'atribut CSS "background-image".
            - Cada carta tindrà un atribut HTML "*data-id*" igual a la id del pokemon que contingui.
          - Quan l'usuari hagi trobat dues cartes iguals, s'han de marcar amb el color verd de background, afegeix-li una classe CSS anomenada "*matched*".
          - Per obtenir les imatges dels pokemons es farà servir l'API "pokeapi". Les imatges seran aleatories del 1 al X (on X és el número que vulgueu que sigui el màxim, sempre que existeixi un pokemon amb aquest nombre).
          - Quan l'usuari guanyi s'ha de parar el temporitzador.
  2. Al costat dret hi haurà un ranking de totes les partides finalitzades:
      - Aquest ranking tindrà 4 columnes: Posició, Username, Mail, Temps i Número de cartes.
      - Cada cop que es guanyi una partida s'haurà de crear un nou registre a la BBDD de Firebase (utilitzant l'API propia, és a dir, fent servir el mètode fetch).
      - De cada registre caldrà guardar l'id de l'usuari, el temps que ha tardat en completar el joc i el nombre de cartes que ha escollit.
      - El registre acabat d'afegir s'haurà de resaltar posant-lo amb el fons de color groc, afegeix-li una classe CSS anomenada "*highlight*".
      - Els registres es mostraran ordenats primer per cartes (de major a menor) i després per temps (de menor a major).
      - Si hi ha més de 5 registres de ranking, es mostraran només els 4 primers i uns punts suspensius, sempre que el registre acabat d'afegir no estigui entre els 5 primers, caldrà mostrar els punts supensius + el registre + uns altres punts suspensius.
  3. Un botó amb id "*logout-btn*" per eliminar l'id guardada al sessionStorage amb la clau "*user*" i recarregar la pàgina.

# **Distribució de la puntuació**
- Feature 1: *(2p)* Formulari de registre
- Feature 2: *(3p)* Joc (costat esquerra)
- Feature 3: *(1,5p)* Ranking (costat dret)
- Feature 4: *(0,5p)* Logout

- **Files:** _(1p)_ \*Distribueix correctament el codi en diferents fitxers i fes servir imports i exports.
  - \*L'anterior puntuació, només s'obtindrà si s'arriba a una nota de 4 a la pràctica amb les puntuacions de les features.

- **Code Quality:** _-0,25p_ Per cada error de HTMLHint i ESLint.

- **Styles:** _(1p)_ \*\*Estils: Cal que hi hagi suficient codi CSS per a que es pugui valorar.
- **Github:** _(1p)_ \*\*Seguiment fent servir GitHub amb branques una per cada feature (amb merge al main quan estiguin acabades) i mínim un commit per classe (amb suficient feina feta), els noms de les branques i dels commits han de seguir la convenció i tenir sentit.
  - \*\*Les dues anteriors puntuacions, només s'obtindran completes si tots els tests e2e funcionen correctament, i no hi ha més de 4 errors de qualitat de codi.
  - \*\*S'obtindrà la meitat de les dues anteriors puntuacions si falla algun dels tests e2e o hi ha més de 4 errors de qualitat de codi, i s'aprova la pràctica amb la resta de les puntuacions
