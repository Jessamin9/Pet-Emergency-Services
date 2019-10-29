require("dotenv").config();
const pg = require("pg-promise")();

const db = pg(process.env.DB_URL);

exports.handler = async (event, context) => {
  const { lat, lon } = event.queryStringParameters;

  const clinics = await db.any(
    "SELECT * FROM clinic ORDER BY coordinates <-> ST_MakePoint(${lat}, ${lon})::geography",
    { lat, lon }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ clinics })
  };
};
