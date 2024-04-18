import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import { Router } from 'express';

const router = Router();

const options: Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'FMCG APIs Documentation',
        version: '1.0.0',
        description: 'API end-points documentation for the FMCG',
      },
      tags: [
        { name: 'Users', description: 'API endpoints related to user operations' },
        { name: 'Admin', description: 'API endpoints related to admin operations' },
        { name: 'Categories', description: 'API endpoints related to category operations' },
        { name: 'Products', description: 'API endpoints related to product operations' },
        { name: 'Cart', description: 'API endpoints related to cart operations' },
        { name: 'Orders', description: 'API endpoints related to order operations' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [], 
        },
      ],
    },
    apis: ['./src/routes/*.ts'],
  };

const specs = swaggerJsdoc(options);

export default specs;

