/**
 * An array of routes which are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
*/

export const publicRoutes = [
    "/"
];

/**
 * An array of routes which are used for authentication purposes
 * These routes will redirect users to protected routes of your requirement (for this template it is settings)
 * @type {string[]}
*/

export const authRoutes = [
    "/secure/sign-in",
    "/secure/sign-up"
];

export const apiAuthPrefix = "/api/auth";

/**
 * This is the route to which a logged in user should be redirected
 * @type {string[]}
 */
export const DEFAULT_REDIRECT_ROUTE = "/settings";