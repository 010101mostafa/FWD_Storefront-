CREATE TABLE OrdersProduct (
    OrdersId integer references Orders(id) ,
    ProductID integer references Product(id) ,
    quantity numeric default 1.0,
    PRIMARY KEY (OrdersId, ProductID)
     );