# TODO

## Game Management

- Démarrer une partie quand celle-ci est pleine
  - [X] Quand un joueur s'inscrit, on garde son adresse (IP, device ?) pour pouvoir le rediriger vers game/:gameid quand la partie est pleine.
  - [ ] L'emission d'évènement par le serveur ne devrait pas être dans le GameService. Il faudrait créer un bus d'évènement qui répond à l'évènement "game full". Cet évènement est pivot entre Game Management & 7 Wonder Game

## 7 Wonders Game

- Afficher le même nombre de plateau sur le board
- Chaque joueur a un plateau différent. On affiche uniquement les noms des merveilles dans un premier temps.
- Je vois mon plateau à l'endroit, et je vois le nombre de joueurs contre qui je joue par dessus.

## Transverse

- Deployer ?
- Testabilité ?