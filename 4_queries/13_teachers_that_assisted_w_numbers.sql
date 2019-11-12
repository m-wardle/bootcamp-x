SELECT teachers.name as teacher, cohorts.name as cohort, count(assistance_requests.teacher_id) as total_assistances
FROM assistance_requests
JOIN teachers on teachers.id = teacher_id
JOIN students on students.id = student_id
JOIN cohorts on cohorts.id = cohort_id
WHERE cohorts.name = 'JUL02'
GROUP BY teacher, cohort
ORDER BY teacher;