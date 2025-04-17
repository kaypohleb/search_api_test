# Weather App
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## UI/Implementation Considerations
1. No initial state of the website before any search is mentioned in requirements 
   - implemented on mount geolocation to get the user's current location
2. Search can turn up multiple results of cities/countries
   - implemented a options menu to select the desired location
3. Search history is stored in local storage trivially, although we could also store it in a database/redux store
   - it is sufficient for the purpose of this project
4. UI mockup is unclear on dealing with the overflow of the search history -
   - implemented a scroll bar to handle the overflow
5. Assets lacking for weather conditions for the project 
   - opted to use a OpenWeather icons more appropriately


## Getting Started

First install all frameworks and libraries
```bash
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.