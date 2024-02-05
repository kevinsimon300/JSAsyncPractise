/**
 * This function change the initial styles of the game
 * @param areUserInSession
 */
function changeInitialStyles(areUserInSession) {
  const modal = document.getElementById('dialogue');
  const game = document.getElementById('game');
  const register = document.getElementById('register');
  const playButton = document.getElementById('play-btn');
  playButton.innerHTML = 'Play';
  modal.style.display = 'none';
  if (areUserInSession === null) {
    game.style.display = 'none';
    register.style.display = 'block';
  } else {
    register.style.display = 'none';
    game.style.display = 'block';
  }
}

/**
 * This function reset the table
 */

function resetTable() {
  const tableBody = document.getElementById('tbody');
  tableBody.innerHTML = '';
}

/**
 * This function show a modal with a text
 */

function seeModalText() {
  const modal = document.getElementById('dialogue');
  const modalText = document.getElementById('modal');
  modal.style.display = 'block';
  modalText.innerHTML = 'Please enter a number type or a positive odd number';
}

/**
 * This function show the users in a table
 * @param listCompetition
 */
function seeAllUsers(listCompetition) {
  if (listCompetition !== null) {
    const tableBody = document.getElementById('tbody');
    const JSONParseUsers = JSON.parse(JSON.stringify(listCompetition));
    const listAllUsers = Object.values(JSONParseUsers);
    listAllUsers.sort((a, b) => a.time - b.time);
    listAllUsers.sort((a, b) => b.cardsNumber - a.cardsNumber);
    for (let i = 0; i < 5 && i < listAllUsers.length; i += 1) {
      const tableRow = document.createElement('tr');
      const tableData = document.createElement('td');
      const tableData2 = document.createElement('td');
      const tableData3 = document.createElement('td');
      const tableData4 = document.createElement('td');
      const tableData5 = document.createElement('td');
      tableData.innerHTML = `${i + 1}`;
      tableData2.innerHTML = `${listAllUsers[i].username}`;
      tableData3.innerHTML = `${listAllUsers[i].email}`;
      tableData4.innerHTML = `${listAllUsers[i].time}`;
      tableData5.innerHTML = `${listAllUsers[i].cardsNumber}`;
      tableRow.appendChild(tableData);
      tableRow.appendChild(tableData2);
      tableRow.appendChild(tableData3);
      tableRow.appendChild(tableData4);
      tableRow.appendChild(tableData5);
      tableBody.appendChild(tableRow);
    }
    const table = document.getElementById('table');
    if (table !== null) {
      table.appendChild(tableBody);
    }
  }
}

/**
 * This function change the text of the button
 */
function changeStylesButton() {
  const playButton = document.getElementById('play-btn');
  playButton.innerHTML = 'Volver a jugar';
}

function seeActualUser(competition) {
  const tableBody = document.getElementById('tbodyA');
  const tableRow = document.createElement('tr');
  const tableData2 = document.createElement('td');
  const tableData3 = document.createElement('td');
  const tableData4 = document.createElement('td');
  const tableData5 = document.createElement('td');
  tableData2.innerHTML = `${competition.username}`;
  tableData3.innerHTML = `${competition.email}`;
  tableData4.innerHTML = `${competition.time}`;
  tableData5.innerHTML = `${competition.cardsNumber}`;
  tableRow.appendChild(tableData2);
  tableRow.appendChild(tableData3);
  tableRow.appendChild(tableData4);
  tableRow.appendChild(tableData5);
  tableBody.appendChild(tableRow);
  const table = document.getElementById('table');
  if (table !== null) {
    table.appendChild(tableBody);
  }
}

export {
  changeInitialStyles, seeModalText, seeAllUsers, changeStylesButton, resetTable, seeActualUser,
};
