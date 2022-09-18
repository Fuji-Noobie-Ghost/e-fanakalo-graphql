# E-fanakalo-GraphQL

## #techzara_wcc2

## A GraphQL version of E-fanakalo

* Start your PostgreSQL service and create a new database 
    ```bash
    CREATE DATABASE <your_database_name>;
    ```

* Edit .env files in your project root according to your environment
    
* In your terminal, run the following command
    ```bash
    npm install
    npm run migration:run # Create all Tables
    ```
* Create directory called "uploads" in the project root
    ```bash
    mkdir uploads
    ```

* Finally, you can run the API with the following command
   ```bash
    npm start
    ```

### You can view all queries and mutations in 
this [link](src/schema.gql)

All valid data value for queries are the same as in the [REST version](https://github.com/Fuji-Noobie-Ghost/e-fanakalo)

* <b>sort:</b> username, title, updatedAt, createdAt
* <b>status:</b> active or deactive

### This are some example of request you can test

* Get all exchanges, without pagination

    ```graphql
    query {
        exchanges (findInput: {
            sort: updatedAt
        })
        {
            id
            contact
            username
            createdAt
            photos {
                name
            }
        }
    }
    ```
    Sort is optionnal

## <center>Have a nice Day :)</center>