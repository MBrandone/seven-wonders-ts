# TODO & THOUGHTS

## Game Management

- Démarrer une partie quand celle-ci est pleine
  - [X] Quand un joueur s'inscrit, on garde son adresse (IP, device ?) pour pouvoir le rediriger vers game/:gameid quand la partie est pleine.
  - [X] L'emission d'évènement par le serveur ne devrait pas être dans le GameService. Il faudrait créer un bus d'évènement qui répond à l'évènement "game full". Cet évènement est pivot entre Game Management & 7 Wonder Game.
  - [X] Renommer Game en game management ?
  - [ ] La couche de services est dépendante de la persistence. Il faudrait créer des interfaces de Repository

## 7 Wonders Game

- [ ] Créer un module seven wonders game
- [ ] La logique de récupérer tout les joueurs participants à une partie ne doit pas être dans le module Game, mais dans celui qui gère la partie de 7 wonders
- [ ] L'évènement "player joined" peut générer un nouvel évènement "game started"
- [ ] L'évènement Game started : 
    - [ ] créer un plateau
    - [ ] assigne une merveille à chaque joueur au hasard
    - [ ] Distribue les cartes
    - [ ] Redirige l'utilisateur vers la page de jeu
    - [ ] Chaque joueur a un plateau différent. On affiche uniquement les noms des merveilles dans un premier temps.
- [ ] Je vois mon plateau à l'endroit, et je vois le nombre de joueurs contre qui je joue par dessus.
    - [ ] Plus simple ? Affiche que mon plateau et faire jouer une carte au hasard aux autres joueurs

## Transverse

- Deployer ?
- Testabilité ?