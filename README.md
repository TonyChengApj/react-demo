# React Entra ID demo

A React and TypeScript application built with Vite and Microsoft Authentication Library (MSAL).

## Set up Microsoft Entra ID

1. In the [Microsoft Entra admin center](https://entra.microsoft.com/), register an application in your tenant. Choose the supported account types appropriate for your tenant.
2. Under **Authentication**, add a **Single-page application** platform and register `http://localhost:5173/` as a redirect URI. Add the deployed application URL as another SPA redirect URI when deploying.
3. Copy the application's **Application (client) ID** and **Directory (tenant) ID** from the app registration overview.
4. Copy `.env.example` to `.env.local` and fill in both IDs. These IDs are public configuration, not client secrets. Never put a client secret in a Vite environment variable or in this browser app.

## Run locally

Use Node.js 20.19+ or 22.12+ (as required by Vite), then run:

```sh
npm install
npm run dev
```

Open `http://localhost:5173/`, sign in, and sign out. The redirect URI in Entra must match the URL used by the app, including the port and trailing slash. Restart Vite after changing environment variables.

For a production build, run `npm run build`; use `npm run preview` to serve the build locally. Register the preview URL separately as an SPA redirect URI if testing sign-in there. Run `npm run lint` to check the source.
