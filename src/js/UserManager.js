/**
 * Compare if user already exists in the list of users
 * @param {Object} user
 * @param user
 * @param getAllUsers
 * @returns {Promise<boolean>}
 */
async function compareIfUserAlreadyExists(user, getAllUsers) {
  try {
    let alreadyExists = false;
    const JSONParseUsers = JSON.parse(JSON.stringify(getAllUsers));
    const arrayGetAllUsers = Object.values(JSONParseUsers);

    if (arrayGetAllUsers && arrayGetAllUsers.length > 0) {
      alreadyExists = arrayGetAllUsers.some(
        (userInList) => userInList.username.toLowerCase() === user.username.toLowerCase()
          || userInList.email.toLowerCase() === user.email.toLowerCase(),
      );
      return alreadyExists;
    }
  } catch (error) {
    /* empty */
  }
  return false;
}

/**
 * Get user from session storage
 * @returns {null|string}
 */

function getUserFromSessionStorage() {
  const user = sessionStorage.getItem('user');
  if (user) {
    return user;
  }
  return null;
}

export { compareIfUserAlreadyExists, getUserFromSessionStorage };
