create EXTENSION pgcrypto;

create table accounts (
    id serial primary key,
    username text,
    password text
);

insert into accounts(username, password) values('wesley.santos', crypt('1234', gen_salt('bf')));
insert into accounts(username, password) values('wesley.paulo', crypt('4321', gen_salt('bf')));

create table vehicles (
    id serial primary key,
    model text,
    plate text
);

insert into vehicles(model, plate) values('Hyundai Verna 1.6 SX', 'AAA9999');
insert into vehicles(model, plate) values('Hyundai HB20 1.0', 'BBB1111');

create table booked_vehicles (
    id serial primary key,
    account_id serial,
    plate text,
    reserved_at timestamp,
    returned_at timestamp,

    constraint fk_account
        foreign key(account_id)
            references accounts(id)
);