import { postUser, actUser, getAllUsers } from './UserApiDAO.js';
import { compareIfUserAlreadyExists, getUserFromSessionStorage } from './UserManager.js';
import {
  changeInitialStyles, seeModalText, seeAllUsers, changeStylesButton, resetTable, seeActualUser,
} from './StylesManager.js';
import { checkGenerationNumber, playGame } from './GameManager.js';
import { postCompetition, getAllCompetitions } from './CompetitionApiDAO.js';
import { getRandomCard } from './CardApiDAO.js';

/**
 * Main function
 */
document.addEventListener('DOMContentLoaded', async () => {
  const areUserInSession = getUserFromSessionStorage();
  const listCompetitions = await getAllCompetitions();
  await seeAllUsers(listCompetitions);
  const userForm = document.getElementById('user-form');
  const gameForm = document.getElementById('game-form');
  const logoutButton = document.getElementById('logout-btn');
  changeInitialStyles(areUserInSession);
  userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const listAllUsers = await getAllUsers();
    const user = {
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
    };
    if (await compareIfUserAlreadyExists(user, listAllUsers)) {
      await actUser(user);
    } else {
      await postUser(user);
    }
    const userId = user.username;
    const emailId = user.email;
    sessionStorage.setItem('user', userId);
    sessionStorage.setItem('email', emailId);
    const listCompetitionsUser = await getAllCompetitions();
    await seeAllUsers(listCompetitionsUser);
    const areUserInSessionNow = getUserFromSessionStorage();
    changeInitialStyles(areUserInSessionNow);
  });

  gameForm.addEventListener('submit', async () => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    resetTable();
    const listCompetitionsPreGame = await getAllCompetitions();
    await seeAllUsers(listCompetitionsPreGame);
    const cardsNumber = document.getElementById('cards-number').value;
    const isCorrectNumber = checkGenerationNumber(cardsNumber);
    if (isCorrectNumber === true) {
      changeStylesButton();
      const cardList = await getRandomCard(cardsNumber);
      const timeDoGame = await playGame(cardList);
      const competition = {
        email: sessionStorage.getItem('email'),
        username: sessionStorage.getItem('user'),
        time: timeDoGame,
        cardsNumber,
        position: 0,
      };
      await postCompetition(competition);
      resetTable();
      const listCompetitionsNow = await getAllCompetitions();
      seeActualUser(competition);
      await seeAllUsers(listCompetitionsNow);
    } else {
      seeModalText();
    }
  });

  logoutButton.addEventListener('click', async () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('email');
    const areUserInSessionToClose = getUserFromSessionStorage();
    changeInitialStyles(areUserInSessionToClose);
  });
});
