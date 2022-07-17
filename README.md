# Intro

First, run the development server:

```bash
yarn dev
```

Or start a production server:

```bash
yarn build && yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Start the Visual Test by running storybook:

```bash
yarn storybook
```

The page auto-updates as you edit the file.

```.env.local``` is for your local environment
```.env.development``` is for your develop environment (development)
```.env.production``` is for your production environment (production)

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/[your api path]`.

Current api list

``` bash
/historyCurrencyHandler
/latestCurrencyHandler
/symbolsHandler
```

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
