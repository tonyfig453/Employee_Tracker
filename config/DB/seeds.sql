
use employeeTracker_db;
INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 1000000, 1),
    ('Salesperson', 90000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 150000, 2),
    ('Account Manager', 170000, 3),
    ('Accountant', 122000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Bobby', 'Brown', 1, NULL),
    ('Lady', 'Gaga', 2, 1),
    ('Ariana', 'Grande', 3, NULL),
    ('Spongebob', 'Squarepants', 4, 3),
    ('Donald', 'Trump', 5, NULL),
    ('Tom', 'Doe', 6, 5),
    ('Winifred', 'Sanderson', 7, NULL),
    ('Beyonce', 'Queenbee', 8, 7);