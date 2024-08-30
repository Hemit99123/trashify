import { handleAuth } from '@auth0/nextjs-auth0';

/**
 * @swagger
 * 
 * /api/auth/login:
 *   get:
 *     tags:
 *       - Auth
 *     description: Redirects to the Auth0 login page.
 *     responses:
 *       302:
 *         description: Redirect to the login page.
 * 
 * /api/auth/logout:
 *   get:
 *     tags:
 *       - Auth
 *     description: Logs out the user and redirects to the specified logout URL.
 *     responses:
 *       302:
 *         description: Redirect to the logout page.
 * 
 * /api/auth/callback:
 *   get:
 *     tags:
 *       - Auth
 *     description: Handles the Auth0 callback after authentication.
 *     responses:
 *       302:
 *         description: Redirect after successful login.
 * 
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     description: Returns the authenticated user's profile in JSON format.
 *     responses:
 *       200:
 *         description: User profile information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sub:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 */


export const GET = handleAuth();