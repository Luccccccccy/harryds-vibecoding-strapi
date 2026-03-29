export default {
  routes: [
    { method: 'GET',    path: '/profile',      handler: 'profile.find',   config: { auth: false } },
    { method: 'PUT',    path: '/profile',      handler: 'profile.update', config: {} },
    { method: 'DELETE', path: '/profile',      handler: 'profile.delete', config: {} },
    { method: 'POST',   path: '/profile/like', handler: 'profile.like',   config: { auth: false } },
  ],
};
