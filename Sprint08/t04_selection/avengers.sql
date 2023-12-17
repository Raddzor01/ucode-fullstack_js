USE ucode_web;

SELECT heroes.name, SUM(powers.points) AS points
FROM heroes
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
LEFT JOIN powers ON heroes_powers.power_id = powers.id
GROUP BY heroes.id
ORDER BY points DESC
LIMIT 1;

SELECT heroes.name, SUM(powers.points) AS points
FROM heroes
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
LEFT JOIN powers ON heroes_powers.power_id = powers.id
WHERE powers.type = 'defense'
GROUP BY heroes.id
ORDER BY points ASC
LIMIT 1;

SELECT heroes.name,
       teams.name,
       SUM(powers.points) AS points
FROM heroes
LEFT JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
LEFT JOIN teams ON heroes_teams.team_id = teams.id
LEFT JOIN powers ON heroes_powers.power_id = powers.id
WHERE teams.name = 'Avengers'
GROUP BY heroes.id
ORDER BY points DESC;

SELECT teams.name,
       SUM(powers.points) AS points
FROM heroes
LEFT JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
LEFT JOIN teams ON heroes_teams.team_id = teams.id
LEFT JOIN powers ON heroes_powers.power_id = powers.id
WHERE teams.name = 'Avengers' OR teams.name = 'Hydra'
GROUP BY teams.name
ORDER BY SUM(points);