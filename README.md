# slack_chat
A Chat Messenger similar to slack

# Tech Stack

    - NodeJs (Express) - REST API
    - SocketIO - Two way communication between server and client (send and receive messages)
    - MongoDB - store or database fro messages
    - React.js - UI
    - TypeScript - Data Type check and OOP
    - Styled Components - Css components
    - Redux.js - State Management

#Folder Structure

`Followed the Atomic pattern structure`

```Client Side
    - Components - Contains Reusable simple components which will be used while rendering the layout
        - Atom
        - Molecule
        - Organism
    - Container
        - store (contains all the store data)
        - context (All the Rest API will be made here and data will be provided as container to the children components and the communication with the store happens here)
    - layout - contains all the page level components with reusable components from component and container folder
    - types - data types for all the store datas
```

```
Server Side
    - server - consists of all server API
        - Controller - middleware betwen API and DB (all the routes must go through here to access db)
        - models - contains all the database operation
        - routes - contains all the routes for the REST API
```

# Installing dependencies

    Use either ``` npm i ``` or ```yarn``` to install all the dependecenies.

# Running the Application

    Use `npm start` to start the client side
    Use `npm run server` to start the server

    Run the file with queryparam userName:
    ```http://localhost:8080/?userName=srinath```

Hosted Link:

    ``` https://slackmessenger.herokuapp.com/ ```