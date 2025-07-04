import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, Typography, Box, List, ListItem, ListItemText, CircularProgress, Paper } from '@mui/material';

const API_URL = 'http://localhost:3000';

interface Game {
  id: string;
  created_at: string;
  status: string;
  max_players: number;
  players: { id: string; name: string }[];
}

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();

  const { data: game, isPending, error } = useQuery<Game | null>({
    queryKey: ['game', gameId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/games/${gameId}`);
      if (!res.ok) throw new Error('Erreur lors du chargement de la partie');
      return res.json();
    },
    enabled: !!gameId,
  });

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Partie #{gameId}
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6">Joueurs dans la partie</Typography>
          {isPending ? (
            <Box display="flex" justifyContent="center" my={2}><CircularProgress /></Box>
          ) : error ? (
            <Typography color="error">{(error as Error).message}</Typography>
          ) : (
            <List>
              {game?.players?.length ? (
                game.players.map(player => (
                  <ListItem key={player.id}>
                    <ListItemText primary={player.name} />
                  </ListItem>
                ))
              ) : (
                <ListItem><ListItemText primary="Aucun joueur pour le moment" /></ListItem>
              )}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
} 