# Strapi CMS

Strapi CMS with PostgreSQL, pre-configured for one-click deployment on Zeabur.

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/7YJAKW)

## Deploy

Click the button above to deploy your own Strapi CMS instance. You will be asked to:

1. Enter a domain name (e.g. `my-cms`, your site will be at `my-cms.zeabur.app`)
2. Click **Deploy**
3. Wait a few minutes for the build to complete
4. Open `https://<your-domain>.zeabur.app/admin` to create your admin account

PostgreSQL and all required environment variables are configured automatically.

## Local Development

```bash
cp .env.example .env
# Edit .env with your own values
npm install
npm run develop
```

Open [http://localhost:1337/admin](http://localhost:1337/admin) to access the admin panel.

## Environment Variables

See [`.env.example`](.env.example) for a full list of configurable variables. Key variables:

| Variable | Description |
|---|---|
| `DATABASE_CLIENT` | Database type (`sqlite` or `postgres`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `APP_KEYS` | Application keys (comma-separated) |
| `ADMIN_JWT_SECRET` | Secret for admin JWT tokens |
| `JWT_SECRET` | Secret for user JWT tokens |

## Learn More

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi CLI Reference](https://docs.strapi.io/dev-docs/cli)
- [Zeabur Documentation](https://zeabur.com/docs)
