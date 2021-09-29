export const authRoutes = [/^(\/auth\/)((signin)|(signup))$/];
export const publicRoutes = [/^\/$/];

export const isAuthRoute = (route: string): boolean => {
  return authRoutes.some((ar) => ar.test(route));
};
export const isPublicRoute = (route: string): boolean => {
  return authRoutes.some((ar) => ar.test(route));
};
export const isPrivateRoute = (route: string): boolean => {
  return !(isAuthRoute(route) || isPublicRoute(route));
};
