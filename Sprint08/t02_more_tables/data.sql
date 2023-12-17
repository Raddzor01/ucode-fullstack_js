USE ucode_web;

INSERT INTO powers(name, type, points) VALUES
('bloody fist', 'attack', '110'),
('iron shield', 'defense', '200'),
('for the emperor!','attack','500'),
('ice block', 'defense', '150');

INSERT INTO races(name) VALUES
('Human'),
('Kree'),
('Zerg'),
('Necron');

INSERT INTO teams(name) VALUES
('Avengers'),
('Hydra'),
('Imperium Hominis'),
('Tau');

INSERT INTO heroes_powers(hero_id, power_id, power_points) VALUES
(1, 1, '400'),
(2, 3, '700'),
(3, 2, '350'),
(4, 4, '400');

INSERT INTO heroes_teams(hero_id, team_id) VALUES
(1, 1),
(1, 2),
(2, 4),
(4, 3);
