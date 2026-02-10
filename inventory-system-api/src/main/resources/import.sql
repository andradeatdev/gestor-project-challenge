-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

INSERT INTO raw_materials (id, code, name, stock_quantity) VALUES (1, 'RM001', 'Madeira', 50.0);
INSERT INTO raw_materials (id, code, name, stock_quantity) VALUES (2, 'RM002', 'Prego', 200.0);
INSERT INTO raw_materials (id, code, name, stock_quantity) VALUES (3, 'RM003', 'Verniz', 10.0);

INSERT INTO products (id, code, name, value) VALUES (1, 'PROD001', 'Mesa', 300.00);
INSERT INTO products (id, code, name, value) VALUES (2, 'PROD002', 'Cadeira', 50.00);

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES (1, 1, 5.0);
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES (1, 2, 20.0);
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES (1, 3, 1.0);

INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES (2, 1, 1.0);
INSERT INTO product_raw_materials (product_id, raw_material_id, quantity) VALUES (2, 2, 5.0);

ALTER SEQUENCE raw_materials_id_seq RESTART WITH 4;
ALTER SEQUENCE products_id_seq RESTART WITH 3;
ALTER SEQUENCE product_raw_materials_id_seq RESTART WITH 6;