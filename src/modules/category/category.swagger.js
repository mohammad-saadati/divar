// https://mherman.org/blog/swagger-and-nodejs/
/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category module and routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *       properties:
 *         name:
 *           type: string
 *         icon:
 *           type: string
 *         slug:
 *           type: string
 *         parent:
 *           type: string
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create new category
 *     tags:
 *       - Category
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /category:
 *  get:
 *     summary: get all categories
 *     tags:
 *       - Category
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *           $ref: '#/components/schemas/CreateCategory'
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/CreateCategory'
 *     response:
 *       '200':
 *         description: Success
 */
