INSERT  INTO _user(id,firstName,lastName,password)
                VALUES(1,'mostafa' , 'safwat', "$2b$05$Kb9bCB6.GWPzzp1L.vGl7eZH6jQTd2dMZmeAWk3UoUy9nb9v6Ul3S") ON CONFLICT (id) do
				update  set firstName='mostafa', lastName='safwat', password="$2b$05$Kb9bCB6.GWPzzp1L.vGl7eZH6jQTd2dMZmeAWk3UoUy9nb9v6Ul3S" ;

INSERT  INTO pruduct (id,name,price ,category)
            VALUES(1,'pc' , 1000, "hw") ON CONFLICT (id) do
            update  set name='pc', price=1000, category="hw" ;			
