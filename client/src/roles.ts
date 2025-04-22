export const RBAC_RULES = {
  admin: {
    view: ['home', 'admin'],
    actions: ['books:get', 'books:edit', 'books:delete'],
  },
  user: {
    view: ['home'],
    actions: [],
  },
}
