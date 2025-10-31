import { Hono } from 'jsr:@hono/hono';
import { serveStatic } from 'jsr:@hono/hono/deno';
const app = new Hono();

app.use('/*', serveStatic({ root: './public' }));

// GETリクエストに対する処理 (フォームデータ)
app.get('/api/users/:name', (c) => {
  const name = c.req.param('name');
  return c.json({ message: 'GET', user: name });
});

// POSTリクエストに対する処理 (フォームデータ)
app.post('/api', async (c) => {
  const form = await c.req.parseBody();
  return c.json({
    message: 'POST',
    form: {
      name: form.name,
      rank: form.rank
    }
  });
});

// PUTリクエストに対する処理 (フォームデータ)
app.put('/api', async (c) => {
  const json = await c.req.json();
  return c.json({
    message: 'PUT',
    json: {
      name: json.name,
      rank: json.rank
    }
  });
});

// DELETEリクエストに対する処理 (フォームデータ)
app.delete('/api', async (c) => {
  const form = await c.req.parseBody();
  return c.json({
    message: 'DELETE',
    form: {
      name: form.name,
      rank: form.rank
    }
  });
});

Deno.serve(app.fetch);
