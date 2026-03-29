// import type { Core } from '@strapi/strapi';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'lucy-revalidate-secret-2026';
const WEBHOOK_URL = `${FRONTEND_URL}/api/revalidate?secret=${REVALIDATE_SECRET}`;

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: any }) {
    // ── 1. Seed profile only if DB has zero profile records ─────────────────
    const count = await strapi.db.query('api::profile.profile').count();

    if (count === 0) {
      await strapi.entityService.create('api::profile.profile', {
        data: {
          name: 'Luccccccy',
          info: "Hi I'm Luccccccy!",
          links: [
            { platform: 'instagram', label: 'Instagram', url: '#' },
            { platform: 'medium', label: 'Medium', url: '#' },
            { platform: 'linkedin', label: 'Linkedin', url: '#' },
          ],
          publishedAt: new Date().toISOString(),
        },
      });
      strapi.log.info('✅ Profile seeded');
    } else {
      strapi.log.info(`ℹ️  Profile exists (${count} records), skipping seed`);
    }

    // ── 2. Grant Public role access to profile find endpoint ────────────────
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const permExists = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({
          where: { action: 'api::profile.profile.find', role: publicRole.id },
        });

      if (!permExists) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action: 'api::profile.profile.find', role: publicRole.id },
        });
        strapi.log.info('✅ Public permission granted for profile.find');
      }
    }

    // ── 3. Register webhook to trigger Next.js revalidation on publish ───────
    const webhookExists = await strapi.db
      .query('strapi::webhook')
      .findOne({ where: { name: 'Frontend Revalidate' } });

    if (!webhookExists) {
      await strapi.db.query('strapi::webhook').create({
        data: {
          name: 'Frontend Revalidate',
          url: WEBHOOK_URL,
          headers: { 'Content-Type': 'application/json' },
          events: ['entry.publish', 'entry.update', 'entry.unpublish'],
          enabled: true,
        },
      });
      strapi.log.info(`✅ Webhook registered → ${WEBHOOK_URL}`);
    } else {
      strapi.log.info('ℹ️  Webhook already exists');
    }
  },
};
