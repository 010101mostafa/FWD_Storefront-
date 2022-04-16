# FWD_Storefront-
## setup the project
### - setup the database 

```sql
CREATE USER shopping_user WITH PASSWORD '123';
CREATE DATABASE shopping;
\c shopping
GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
``` 
___### - the environment variables example (.env file)

```json
DB_NAME=shopping
DB_HOST=127.0.0.1
DB_USER=shopping_user 
DB_PASSWORD=123
HASH_SALT=5
HASH_KEY=mostafaKEY
TOKEN_SECRET=mostafaTOKEN_SECRET
``` 

#### database port is defoult: 5432
___
### - install Dependencies 

```sh
npm install yarn -g
yarn install
yarn db-migrate up

``` 
___
### -  the environment variables example (.env file)

### The scripts needed to test/start/build my application

| todo                       | run                           |
| :------------------------- | :---------------------------- |
| test                       | yarn test|         
| start                      | yarn start <br> yarn watch     |
| build                      | yarn tsc                 |
| linting, Formating and fix | yarn lintingAndFormating:f |

### the endpoints

| endpoint                                  | what's it doing ?                                                        |
| :---------------------------------------- | :----------------------------------------------------------------------- |
| [get]/                                         | show hello massage                                                       |
| [get]/user/                         | get all users [token required]     |
| [post]/user/                         | create a new user    |
| [get]/user/i            | get the user that have id=(i) [token required]  |
| [post]/user/login                         | login user py id and password   |
| [get]/product/                         | get all products      |
| [post]/product/     | create a new product [token required]     |
| [get]/product/topfive    | get the top five most popular products    |
| [get]/Product/category/:categotyName|  get all Products in the category  |
| [get]/Product/i            | get the Product that have id=(i)   |
| [get]/orders/ | get all order data of the signed users [token required]     |
| [get]/orders/Completed | get all order data of the signed users which is Completed [token required]     |
| any other paths                           | response html page with 404 not found                                    |


### other functionality
.
