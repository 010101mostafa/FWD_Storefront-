CREATE TABLE _user (
    id serial primary key ,
    firstName varchar(100) not null ,
    lastName varchar(100) ,
    password text not null
    );