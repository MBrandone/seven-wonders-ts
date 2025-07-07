import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Game Management (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a game, add 2 players, and status should be in_progress', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/games')
      .send({ maxPlayers: 3, playerName: 'Alice' })
      .expect(201);
    expect(createRes.body).toHaveProperty('id');
    const gameId = createRes.body.id;

    await request(app.getHttpServer())
      .post(`/games/${gameId}/players`)
      .send({ playerName: 'Bob' })
      .expect(201);
    await request(app.getHttpServer())
      .post(`/games/${gameId}/players`)
      .send({ playerName: 'Charlie' })
      .expect(201);

    // Récupère la partie
    const getRes = await request(app.getHttpServer())
      .get(`/games/${gameId}`)
      .expect(200);
    expect(getRes.body.players.length).toBe(3);
    expect(getRes.body).toHaveProperty('status', 'in_progress');
  });
}); 