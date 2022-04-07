CREATE TABLE Orders (
    id serial primary key ,
    status varchar(1) default 'A',
    userId int REFERENCES _user(id)
     );