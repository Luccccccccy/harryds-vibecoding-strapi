/**
 * Seed profile data from profile.json into Strapi
 * Run with: npx ts-node -e "require('./scripts/seed-profile')"
 * Or via: node -r ts-node/register scripts/seed-profile.ts
 */

const Strapi = require('@strapi/strapi');

async function seed() {
  const app = await Strapi.createStrapi({
    appDir: __dirname + '/..',
    distDir: __dirname + '/../dist',
  }).load();

  try {
    const profileData = {
      name: 'Luccccccy',
      info: "Hi I'm Luccccccy!",
      links: [
        { platform: 'instagram', label: 'Instagram', url: '#' },
        { platform: 'medium', label: 'Medium', url: '#' },
        { platform: 'linkedin', label: 'Linkedin', url: '#' },
      ],
      publishedAt: new Date(),
    };

    // Check if profile already exists
    const existing = await app.entityService.findOne('api::profile.profile', null, {
      populate: ['links'],
    });

    if (existing) {
      console.log('Profile already exists, updating...');
      await app.entityService.update('api::profile.profile', null, {
        data: profileData,
      });
      console.log('✅ Profile updated!');
    } else {
      console.log('Creating profile...');
      await app.entityService.create('api::profile.profile', {
        data: profileData,
      });
      console.log('✅ Profile created!');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await app.destroy();
    process.exit(0);
  }
}

seed();
