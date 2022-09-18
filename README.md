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

### The EndPoint is http://localhost:3000/graphql
### You can view the GraphQL Schema this [link](src/schema.gql)

All valid data value for queries are the same as in the [REST version](https://github.com/Fuji-Noobie-Ghost/e-fanakalo)

* <b>sort:</b> username, title, updatedAt, createdAt
* <b>status:</b> active or deactive

<br>

### I suggest you to use [Altair GraphQL](https://altairgraphql.dev) because Altair support file uploads with his beautiful GraphQL query presentation, but you can also use Postman<br>When creating a new exchange, you need to pass picture(s) file by Form-Data. In this case, our mutation should be pass as a text in Form-Data; we all know that making GraphQL Query request in form-data body is really boring.
<br>

### This are some example of request you can test

* Get all exchanges, without pagination

    ```graphql
    query {
        exchanges (sort: "username") {
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
    Sort is optional.

* Get exchanges, with the pagination system
    ```graphql
    query {
        exchangesPaginate (findInput: {
            page: 1,
            perPage: 10,
            sort: "username",
            status: "active"
        }) {
            id
            username
            title
            searchFor
            photos {
                name
            }
        }
    }
    ```
    findInput options are optionals.

* Create exchange

## <center>Have a nice Day :)</center>
