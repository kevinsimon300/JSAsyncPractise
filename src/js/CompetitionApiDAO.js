/**
 * Get random cards from the pokeapi
 * @param {object} competition
 * @param competition
 * @returns {Promise<any|null>}
 */
async function postCompetition(competition) {
  try {
    const response = await fetch(
      'https://kevinsimonalbertgarrido-default-rtdb.europe-west1.firebasedatabase.app/competition.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(competition),
      },
    );
    return await response.json();
  } catch (error) {
    /* empty */
    return null;
  }
}

/**
 * Get all competitions
 * @returns {Promise<any|null>}
 */

async function getAllCompetitions() {
  try {
    const response = await fetch(
      'https://kevinsimonalbertgarrido-default-rtdb.europe-west1.firebasedatabase.app/competition.json',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return await response.json();
  } catch (error) {
    /* empty */
  }
  return null;
}

export { postCompetition, getAllCompetitions };
