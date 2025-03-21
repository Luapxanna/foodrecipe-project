const express = require('express');
const recipesController = require('../controllers/recipes.controller');
const imgUpload = require('../middlewares/img-upload.middleware');
const { methodNotAllowed } = require('../controllers/errors.controller')

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/foodrecipe', router);

    /**
     * @swagger
     * /api/v1/foodrecipe/latest:
     *  get:
     *      summary: Get the latest recipes
     *      description: Retrieves a list of the latest recipes based on creation date.
     *      parameters:
     *          - $ref: '#/components/parameters/limitParam'
     *          - $ref: '#/components/parameters/pageParam'
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: A list of latest recipes
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipes:
     *                                          type: array
     *                                          items:
     *                                              $ref: '#/components/schemas/Recipe'
     *                                      metadata:
     *                                          $ref: '#/components/schemas/PaginationMetadata'
     * 
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/latest', recipesController.getLatestRecipes);

    /**
     * @swagger
     * /api/v1/foodrecipe/popular:
     *  get:
     *      summary: Get the most popular recipes
     *      description: Retrieves a list of the most popular recipes based on rate.
     *      parameters:
     *          - $ref: '#/components/parameters/limitParam'
     *          - $ref: '#/components/parameters/pageParam'
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: A list of popular recipes
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipes:
     *                                          type: array
     *                                          items:
     *                                              $ref: '#/components/schemas/Recipe'
     *                                      metadata:
     *                                          $ref: '#/components/schemas/PaginationMetadata'
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/popular', recipesController.getPopularRecipes);

    /**
     * @swagger
     * /api/v1/foodrecipe:
     *  get:
     *      summary: Get recipes by filters
     *      description: Retrieves a list of recipes based on filter.
     *      parameters:
     *          - in: query
     *            name: text
     *            description: info of recipe (like name or ingredients, tags, etc)
     *            schema:
     *              type: string
     *          - $ref: '#/components/parameters/limitParam'
     *          - $ref: '#/components/parameters/pageParam'
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: A list of recipes that match filter
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipes:
     *                                          type: array
     *                                          items:
     *                                              $ref: '#/components/schemas/Recipe'
     *                                      metadata:
     *                                          $ref: '#/components/schemas/PaginationMetadata'
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/', recipesController.getRecipeByFilter);

    /**
     * @swagger
     * /api/v1/foodrecipe/{recipe_id}:
     *  get:
     *      summary: Get recipes by id
     *      description: Retrieves recipe information by id
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            description: ID of the recipe
     *            required: true
     *            schema:
     *              type: integer
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: recipe information
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Recipe'                
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/:recipe_id', recipesController.getRecipeById);

    /**
     * @swagger
     * /api/v1/foodrecipe:
     *  post:
     *      summary: Add a new recipe
     *      description: Adds a new recipe to the database.
     *      requestBody:
     *          required: true
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      $ref: '#/components/schemas/Recipe'
     *      tags:
     *          - recipes
     *      responses:
     *          201:
     *              description: Recipe created successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipe:
     *                                          $ref: '#/components/schemas/Recipe'
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.post('/', imgUpload, recipesController.addRecipe);

    /**
     * @swagger
     * /api/v1/foodrecipe/{recipe_id}:
     *  put:
     *      summary: Update a recipe by id
     *      description: Update a recipe by id
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            required: true
     *            description: The id of the recipe to update
     *            schema:
     *              type: integer
     *      requestBody:
     *          required: true
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      $ref: '#/components/schemas/Recipe'
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: Recipe updated successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipe:
     *                                          $ref: '#/components/schemas/Recipe'
     *          404:
     *              description: Recipe not found
     *          500:
     *              description: Internal server error
     */
    router.put('/:recipe_id', imgUpload, recipesController.updateRecipe);
    
    /**
     * @swagger
     * /api/v1/foodrecipe/save/{recipe_id}:
     *  post:
     *      summary: Save a recipe by recipe_id
     *      description: Save a recipe by id. This is used to mark a recipe as saved for future reference.
     *      parameters:
     *          - in: query
     *            name: user_id
     *            description: ID of the user
     *            required: true
     *            schema:
     *              type: integer
     *          - in: path
     *            name: recipe_id
     *            description: ID of the recipe
     *            required: true
     *            schema:
     *              type: integer
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: Recipe saved successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipe:
     *                                          $ref: '#/components/schemas/Recipe'     
     *          404:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.post('/save/:recipe_id', recipesController.saveRecipe);

    /**
     * @swagger
     * /api/v1/foodrecipe/{recipe_id}:
     *  delete:
     *      summary: Delete a recipe
     *      description: delete a recipe by its id
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            description: the id of the recipe to be deleted
     *            schema:
     *              type: integer
     *            required: true
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: Recipe deleted successfully
     *          404:
     *              description: Recipe not found
     *          500:
     *              description: Internal server error
     */
    router.delete('/:recipe_id', recipesController.deleteRecipe);

    /**
     * @swagger
     * /api/v1/foodrecipe/avg/{recipe_id}:
     *  get:
     *      summary: Get average rating of a recipe
     *      description: Get average rating of a recipe
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            description: id of the recipe
     *            required: true
     *            schema:
     *              type: integer
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: rating of the recipe retrieved successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: float
     *                                  description: average rate of recipe
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/avg/:recipe_id', recipesController.getAvgRate);
    /**
     * @swagger
     * /api/v1/foodrecipe/remove/{recipe_id}:
     *  delete:
     *      summary: Remove a favorite recipe
     *      description: Remove a recipe from a user's favorite list
     *      parameters:
     *          - in: query
     *            name: user_id
     *            description: ID of the user
     *            required: true
     *            schema:
     *              type: integer
     *          - in: path
     *            name: recipe_id
     *            description: ID of the recipe
     *            required: true
     *            schema:
     *              type: integer
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: Recipe removed from favorite
     *          404: 
     *              description: Recipe not found
     *          500: 
     *              description: Interal server error
     */
    router.delete('/remove/:recipe_id', recipesController.removefromFavorite)
    router.all('/', methodNotAllowed);
    router.all('/:recipe_id', methodNotAllowed);
};