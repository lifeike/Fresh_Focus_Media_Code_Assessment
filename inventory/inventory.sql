-- create database inventory
create database if not exists inventory charset utf8;

-- select database
use inventory;

-- create table inventory
create table if not exists inventory(
	id int primary key auto_increment,
	category varchar(32),
	part varchar(32),
	name varchar(64),
	quantity int,
	location varchar(128),
	retail_price int,
	wholesale_price int
)charset utf8;

-- insert data into table
insert into inventory values
(1,"hardware","I(internal)","cpu",50,"downtown calgary",40,38),
(2,"hardware","I(internal)","ram",50,"downtown calgary",50,48),
(3,"hardware","I(internal)","cpu",30,"SW calgary",40,38),
(4,"hardware","E(external)","keyboard",40,"downtown Calgary",20,18),
(5,"hardware","E(external)","keyboard",40,"SW Calgary",20,18),
(6,"software","A(application)","pc_application",20,"SW calgary",100,98),
(7,"software","A(application)","web_application",80,"SW calgary",80,78),
(8,"software","S(server)","database",77,"Downtown Calgary",60,58),
(9,"software","S(server)","database",7,"SW calgary",60,58),
(10,"software","M(marketing)","seo",5,"Downton Calgary",100,50);
