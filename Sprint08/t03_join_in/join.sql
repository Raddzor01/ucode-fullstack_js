USE ucode_web;

SELECT heroes.name,
       teams.name
FROM heroes
LEFT JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
LEFT JOIN teams ON heroes_teams.team_id = teams.id;

SELECT heroes.name,
       powers.name
FROM heroes
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
LEFT JOIN powers ON heroes_powers.power_id = powers.id;

SELECT heroes.name,
       teams.name,
       powers.name
FROM heroes
LEFT JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
LEFT JOIN teams ON heroes_teams.team_id = teams.id
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
LEFT JOIN powers ON heroes_powers.power_id = powers.id;