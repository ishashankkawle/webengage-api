# webengage-api

## Folder Struture:

* `/app/index.mjs` : Main entry point for api
* `/app/public/resources.mjs` : Shared configurations
* `/app/core` : Contails core services such as HTTP Service , utilities
* `/app/controller` : Contains main processing classes
* `/app/initilizer/appInstanceInitializer.mjs` : This manages single instance for all services and acts as source of all components throughout the application
* `/drop/` : Location where new csv file gets generated

## How to run:
* Clone the repository on local machine
* Go inside the cloned folder and run command : `npm i`
* Once command completed successfully, run command : `npm run dev`
* Once executed, api will start listining at default address : `http://localhost:3000`
