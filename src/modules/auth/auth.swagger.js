// https://mherman.org/blog/swagger-and-nodejs/
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth module and routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendOTP:
 *       type: object
 *       required:
 *         - mobile
 *       properties:
 *         mobile:
 *           type: string
 *     CheckOTP:
 *       type: object
 *       required:
 *         - mobile
 *         - code
 *       properties:
 *         mobile:
 *           type: string
 *         code:
 *           type: string
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Login with OTP in this endpoint
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/SendOTP'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendOTP'
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: Check OTP validation
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CheckOTP'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckOTP'
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags:
 *       - Auth
 *     responses:
 *       '200':
 *         description: Success
 */
