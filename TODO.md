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

- [X] Créer un module seven wonders game
- [ ] L'évènement Game started : 
- [ ] StartGameUsecase
    - [X] assigne une merveille à chaque joueur au hasard
    - [X] Distribue les cartes
- [ ] PlayCardUseCase
  - Jouer une carte
    - [X] Le joueur prend la carte sur son plateau
    - [ ] Le joueur ne peut pas jouer 2 fois la même carte
    - [ ] Si la carte demande des ressources ou de l'argent, le joueur doit avoir les ressources nécessaires ou l'argent pour jouer la carte
    - [ ] S'il n'a pas les ressources nécessaires, il peut acheter les ressources qui sont chez ses voisins et les payer 2 pièces
  - [ ] Mettre une carte sous sa merveille
  - [ ] Défausser une carte
- [ ] NextTurn
  - [ ] On passe les cartes à son voisin de gauche à l'age 1 et 3, et à son voisin de droite à l'age 2
  - [ ] Si j'ai pris une carte qui me demande de payer quelques chose, la transaction est faite


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