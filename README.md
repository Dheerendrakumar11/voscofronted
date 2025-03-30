#Next.js Frontend with Auth0 & Node.js Backend

Overview
This project consists of a Next.js frontend with authentication via Auth0 and a Node.js backend. Upon successful authentication, the backend sends an email to the authenticated user containing their authentication token.

#Features
Next.js frontend with Auth0 authentication

Secure API communication between frontend and backend

Node.js backend for validating Auth0 tokens

Email service to send authentication tokens to users in nodemailer

Setup Instructions

#Frontend Setup
Create a Next.js app:
npx create-next-app@latest vosco
cd vosco

Install Auth0 SDK for Next.js:
npm install @auth0/nextjs-auth0@latest

Install additional dependencies:
npm install

Create a .env.local file in the root of the frontend project and add the following:

AUTH0_SECRET=************

AUTH0_BASE_URL=http://localhost:3000

AUTH0_ISSUER_BASE_URL=***********

AUTH0_CLIENT_ID=************

AUTH0_CLIENT_SECRET=********

BACKEND_API_URL=http://localhost:5000

Start the frontend:

npm run dev

The frontend will be available at http://localhost:3000.

#Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install express nodemailer cors nodemon dotenv  axios 

Create a .env file in the root of the backend project and add the following:

AUTH0_DOMAIN=**************

AUTH0_AUDIENCE=**************

EMAIL_USER=*************

EMAIL_PASS=***********

PORT=5000

Start the backend server:

node server.js
The backend will be available at http://localhost:5000.

#Auth0 Configuration

Create an account on Auth0.
In the Auth0 dashboard, create a new application.

Configure the following settings:

Allowed Callback URLs: http://localhost:3000/api/auth/callback

Allowed Logout URLs: http://localhost:3000

Allowed Web Origins: http://localhost:3000


Obtain your Auth0 credentials and update .env.local and .env files accordingly.

#Local Testing

After authentication, the Next.js API route /api/auth/callback will send the access token to the backend endpoint http://localhost:5000/auth/callback.
The backend will verify the token and send an email containing the token to the authenticated user.

#Deployment (Optional)

Deploying the Frontend

Deploy the Next.js frontend to Vercel.

vercel deploy link - https://voscofronted.vercel.app

Update AUTH0_BASE_URL in the .env.local file with the deployed frontend URL.

Deploying the Backend

Deploy the backend to Render.

backed deploy link - https://voscobackend.onrender.com

Update BACKEND_API_URL in the frontend .env.local file to match the deployed backend URL.

Updating Auth0 for Deployment


You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
