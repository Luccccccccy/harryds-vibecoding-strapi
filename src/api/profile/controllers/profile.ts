import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::profile.profile', ({ strapi }) => ({
  async like(ctx) {
    const docs = await strapi.documents('api::profile.profile').findMany({
      status: 'published',
    });
    const doc = docs[0];
    if (!doc) return ctx.notFound('Profile not found');

    const newCount = (doc.like_count ?? 0) + 1;

    // Update draft then publish so both versions stay in sync
    await strapi.documents('api::profile.profile').update({
      documentId: doc.documentId,
      data: { like_count: newCount } as any,
    });

    const published = await strapi.documents('api::profile.profile').publish({
      documentId: doc.documentId,
    });

    ctx.body = { like_count: (published as any).like_count ?? newCount };
  },
}));
