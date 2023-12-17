USE ucode_web;

SELECT heroes.name FROM heroes
LEFT JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
LEFT JOIN races ON heroes.race_id = races.id
WHERE heroes.name LIKE '%a%'
AND races.name != 'human'
AND (heroes.class_role = 'tankman' OR heroes.class_role = 'healer')
GROUP BY heroes.id
HAVING COUNT(heroes_teams.hero_id) > 1
ORDER BY heroes.id DESC
LIMIT 1;