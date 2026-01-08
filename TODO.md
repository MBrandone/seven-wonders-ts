# TODO & THOUGHTS

## Game Management

- Démarrer une partie quand celle-ci est pleine
  - [X] Quand un joueur s'inscrit, on garde son adresse (IP, device ?) pour pouvoir le rediriger vers game/:gameid quand la partie est pleine.
  - [X] L'emission d'évènement par le serveur ne devrait pas être dans le GameService. Il faudrait créer un bus d'évènement qui répond à l'évènement "game full". Cet évènement est pivot entre Game Management & 7 Wonder Game.
  - [X] Renommer Game en game management ?
  - [X] La couche de services est dépendante de la persistence. Il faudrait créer des interfaces de Repository
  - [X] Créer des tests e2e
    - [X] Je crée une partie pour 3 joueurs, 2 joueurs se rajoutent à la partie, je récupère ma partie, et elle est en cours
  - [X] Créer des tests de game-management service
    - Tester tout les cas d'usages
      - createGame
        - Un joueur crée une partie, si son nom est connu, je crée la partie
        - Un joueur crée une partie, si son nom est inconnu, je l'ajoute aux joueurs dispos et crée la partie
      - addPlayerToGame
      - listAvailableGame
  - [X] Créer des tests de player joined reactor
  - [X] Un joueur ne peut pas rejoindre plusieurs fois une partie
  - [X] Créer une base de tests pour les test e2e
  - [ ] Ne pas enregistrer des dates javascript dans la base de données

## 7 Wonders Game

### Métier
- [X] Créer un module seven wonders game
- [X] StartGameUsecase
    - [X] assigne une merveille à chaque joueur au hasard
    - [X] Distribue les cartes
- [ ] Voir les cartes en la possession du joueur
    - [ ] Voir le nom des cartes
    - [ ] Voir si je peux la jouer ou pas, ou oui avec paiement
    - [ ] Voir quelle transaction je peux faire pour la jouer
- [ ] ChooseCardUseCase
  - [ ] Le joueur ne peut pas jouer 2 fois la même carte
      - [ ] Si la carte demande des ressources ou de l'argent, le joueur doit avoir les ressources nécessaires ou l'argent pour jouer la carte
      - [ ] S'il n'a pas les ressources nécessaires, il peut acheter les ressources qui sont chez ses voisins et les payer 2 pièces
    - [ ] Mettre une carte sous sa merveille
    - [ ] Défausser une carte
- [ ] PlayCardUseCase
  - Jouer une carte
    - [X] Le joueur prend la carte sur son plateau
    - [ ] Si j'ai pris une carte qui me demande de payer quelques chose, la transaction est faite
- [ ] NextTurn
  - [X] On passe à son voisin
  - [X] On passe les cartes à son voisin de gauche à l'age 1 et 3, et à son voisin de droite à l'age 2
  - [ ] Si c'est le dernier tour, les cartes restantes vont dans la defausse
- [X] NextAge
  - [X] Fait la guerre
  - [X] Redistribue des nouvelles cartes
- [ ] EndGame
  - [X] Compte les points
  - [X] Donner les propriétés de points aux cartes : CIVIL, SCIENCE et MILITAIRE
  - [X] Donner les propriétés de points aux cartes (COMMERCIAL)
  - [X] Donner les propriétés de points aux cartes (GUILD)
  - [ ] Donner les propriétés de points à la carte commercial Arène, et carte guild qui concerne les merveilles
  - [ ] Determine un classement

### Tech

## Refactoring

- [ ] Expliciter les standards de code pour l'IA
- [ ] La logique de récupérer tout les joueurs participants à une partie ne doit pas être dans le module Game, mais dans celui qui gère la partie de 7 wonders
- [ ] L'évènement "player joined" peut générer un nouvel évènement "game started"
- [ ] On ne devrait pas passer par des objets du domaine pour lire des données
- Quand le jeu a commencé (FRONT)
  - [ ] Je vois mon plateau à l'endroit, et je vois le nombre de joueurs contre qui je joue par dessus.
    - [ ] Plus simple ? Affiche que mon plateau et faire jouer une carte au hasard aux autres joueurs
    - [ ] Je peux jouer n'importe quel carte (sans contraintes de ressources, duplicata de cartes) au départ
    - [ ] Redirige l'utilisateur vers la page de jeu
    - [ ] Chaque joueur a un plateau différent. On affiche uniquement les noms des merveilles dans un premier temps.

## Transverse

- Deployer ?
- Testabilité ?
- Pipeline de tests
- Ouvrir et fermer la db quand tu joues les test e2e