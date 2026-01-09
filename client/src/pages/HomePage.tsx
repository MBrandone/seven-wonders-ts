import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000';
const SOCKET_URL = API_URL;

interface Game {
  id: string;
  created_at: string;
  status: string;
  max_players: number;
  playerCount: number;
}

export default function HomePage() {
  const queryClient = useQueryClient();
  const [maxPlayers, setMaxPlayers] = useState(3);
  const [joinGameId, setJoinGameId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [joinError, setJoinError] = useState<string | null>(null);
  const [creatorName, setCreatorName] = useState('');
  const navigate = useNavigate();

  const { data: gamesData = [], isPending: loadingGames, error: errorGames } = useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: async () => {
      const res = await fetch(API_URL + '/games');
      if (!res.ok) throw new Error('Erreur lors du chargement des parties');
      return res.json();
    },
  });

  const createGameMutation = useMutation({
    mutationFn: async (maxPlayers: number) => {
      const res = await fetch(API_URL + '/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxPlayers, playerName: creatorName }),
      });
      if (!res.ok) throw new Error('Erreur lors de la création de la partie');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] })
  });

  const joinGameMutation = useMutation({
    mutationFn: async ({ gameId, playerName }: { gameId: string; playerName: string }) => {
      const gameRes = await fetch(API_URL + `/games/${gameId}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName }),
      });
      if (!gameRes.ok) {
        const err = await gameRes.json();
        throw new Error(err.error || 'Erreur lors de la jointure');
      }
      return gameRes.json();
    },
    onSuccess: () => {
      setJoinGameId(null);
      queryClient.invalidateQueries({ queryKey: ['games'] });
    }
  });

  const handleCreateGame = () => {
    createGameMutation.mutate(maxPlayers);
  };

  const handleJoinGame = (gameId: string) => {
    setJoinGameId(gameId);
    setPlayerName('');
    setJoinError(null);
  };

  const handleConfirmJoin = () => {
    if (!playerName.trim()) {
      setJoinError('Le nom est requis');
      return;
    }
    joinGameMutation.mutate({ gameId: joinGameId!, playerName }, {
      onError: (e: Error) => setJoinError(e.message || 'Erreur lors de la jointure')
    });
  };

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);
    if (joinGameId) {
      socket.emit('join', joinGameId); // côté backend, il faudra gérer cet event si besoin
    }
    socket.on('gameFull', ({ gameId }) => {
      if (joinGameId === gameId) {
        navigate(`/game/${gameId}`);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [joinGameId, navigate]);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          7 Wonders - Accueil
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6">Créer une partie</Typography>
          <Box display="flex" alignItems="center" gap={2} mt={2}>
            <TextField
              select
              label="Nombre de joueurs"
              value={maxPlayers}
              onChange={e => setMaxPlayers(Number(e.target.value))}
              size="small"
              sx={{ width: 180 }}
            >
              {[3,4,5,6,7].map(n => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Votre nom"
              value={creatorName}
              onChange={e => setCreatorName(e.target.value)}
              size="small"
              sx={{ width: 180 }}
            />
            <Button variant="contained" onClick={handleCreateGame} disabled={createGameMutation.isPending || !creatorName}>
              {createGameMutation.isPending ? <CircularProgress size={24} /> : 'Créer'}
            </Button>
          </Box>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Parties disponibles</Typography>
          {loadingGames ? (
            <Box display="flex" justifyContent="center" my={2}><CircularProgress /></Box>
          ) : (
            <List>
              {gamesData.length === 0 && <ListItem><ListItemText primary="Aucune partie disponible" /></ListItem>}
              {gamesData.map((game: Game) => (
                <ListItem key={game.id} divider>
                  <ListItemText
                    primary={`Partie #${game.id.slice(0, 8)}`}
                    secondary={`Joueurs : ${game.playerCount} / ${game.max_players}`}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      onClick={() => handleJoinGame(game.id)}
                      disabled={game.playerCount >= game.max_players}
                    >
                      Rejoindre
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          {errorGames && <Typography color="error" mt={2}>{errorGames.message}</Typography>}
        </Paper>
      </Box>
      <Dialog open={!!joinGameId} onClose={() => setJoinGameId(null)}>
        <DialogTitle>Rejoindre la partie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Votre nom"
            fullWidth
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            disabled={joinGameMutation.isPending}
            error={!!joinError}
            helperText={joinError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJoinGameId(null)} disabled={joinGameMutation.isPending}>Annuler</Button>
          <Button onClick={handleConfirmJoin} variant="contained" disabled={joinGameMutation.isPending}>
            {joinGameMutation.isPending ? <CircularProgress size={24} /> : 'Rejoindre'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 
