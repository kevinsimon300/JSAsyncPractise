/**
 * Post a new user to the database
 * @param {string} username
 * @param user
 * @returns {Promise<any|null>}
 */
async function postUser(user) {
  try {
    const response = await fetch(
      'https://kevinsimonalbertgarrido-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    );
    return await response.json();
  } catch (error) {
    /* empty */
  }
  return null;
}

/**
 * Update a user in the database
 * @param user
 * @returns {Promise<any|null>}
 */
async function actUser(user) {
  try {
    // eslint-disable-next-line no-use-before-define
    const allUsers = await getAllUsers();
    // eslint-disable-next-line max-len
    const userKey = Object.keys(allUsers).find((key) => allUsers[key].username?.toLowerCase() === user.username.toLowerCase()
      || allUsers[key].email?.toLowerCase() === user.email.toLowerCase());

    if (userKey !== undefined) {
      const response = await fetch(
        `https://kevinsimonalbertgarrido-default-rtdb.europe-west1.firebasedatabase.app/users/${userKey}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );
      return await response.json();
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
  return null;
}

/**
 * Get all users
 * @returns {Promise<any|null>}
 */

async function getAllUsers() {
  try {
    const response = await fetch(
      'https://kevinsimonalbertgarrido-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.json();
  } catch (error) {
    /* empty */
  }
  return null;
}

export { postUser, actUser, getAllUsers };
