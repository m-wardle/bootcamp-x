const { Pool } = require('pg');
const args = process.argv.slice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers on teachers.id = teacher_id
JOIN students on students.id = student_id
JOIN cohorts on cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`;
const cohortName = args[0];
const values = [`%${cohortName}%`];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    })
  })
  .catch(err => console.error('query error', err.stack));