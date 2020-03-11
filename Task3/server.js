conCREATE SEQUENCE public.permissions_seq;

CREATE TABLE public.permissions(
  id INT NOT NULL DEFAULT NEXTVAL ('public.permissions_seq'),
  name VARCHAR(64) NOT NULL,
  PRIMARY KEY (id)
);


CREATE SEQUENCE public.role_seq;

CREATE TABLE public.role(
  id INT NOT NULL DEFAULT NEXTVAL ('public.role_seq'),
  name VARCHAR(64) NOT NULL,
  PRIMARY KEY (id)
);


CREATE SEQUENCE public.user_seq;

CREATE TABLE public.user(
  id INT NOT NULL DEFAULT NEXTVAL ('public.user_seq'),
  name VARCHAR(64),
  role_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES public.role(id)
);


CREATE TABLE public.role_permission_relation (
	role_id int4 NOT NULL,
	permission_id int4 NOT NULL
);



ALTER TABLE public.role_permission_relation ADD CONSTRAINT role_permission_relation_fk FOREIGN KEY (role_id) REFERENCES role(id);
ALTER TABLE public.role_permission_relation ADD CONSTRAINT role_permission_relation_fk_1 FOREIGN KEY (permission_id) REFERENCES permissions(id);


CREATE OR REPLACE PROCEDURE create_user(VARCHAR, INT, VARCHAR)
LANGUAGE plpgsql
AS $$
begin

	IF (select count(*) from role where id = $2) < 1 then
		insert into public."role" (id, name) values ($2, $3);
	end if;

    INSERT INTO public."user"
	("name", role_id)
	VALUES($1, $2);

END;
$$;


CREATE OR REPLACE PROCEDURE assign_permission_to_role(INT, INT, VARCHAR)
LANGUAGE plpgsql
AS $$
begin

	IF (select count(*) from permissions where id = $2) < 1 then
		insert into public."permissions" (id, name) values ($2, $3);
	end if;

    INSERT INTO public."role_permission_relation"
	(role_id, permission_id)
	VALUES($1, $2);

END;
$$;

CREATE VIEW user_role_permissions AS
SELECT usr."name" as "User Name", role."name" as "Role Name", permissions."name" as "Permission Name"
FROM public.user usr, role, permissions, role_permission_relation rpr
WHERE usr.role_id = role.id
and role.id  = rpr.role_id
and rpr.permission_id = permissions.id;st app = require('express')();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('./routes')(app);

app.listen(4000, () => {
    console.log("Server is up on port", 4000)
});

