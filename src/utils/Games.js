export const games = (gameLogic) => [
  {
    id: 1,
    image: require("../images/chess.jpg"),
    logo: require("../images/board.png"),
    title: "Chess",
    date: "26 Feb-6 Mar, 08:00 PM",
    description:
      "Chess is a strategic two-player game focused on checkmating the opponent's king.",
    winPrice: "500 coins",
    playerSlot: "2v2",
    onClick: gameLogic.startChessServer, // Reference the game logic function
  },
  {
    id: 2,
    image: require("../images/tictactoe.jpg"),
    logo: require("../images/logo2.jpeg"),
    title: "Tic-Tac-Toe",
    date: "1 Mar-10 Mar, 09:00 PM",
    description:
      "Tic-Tac-Toe is a two-player game to align three marks in a row on a 3x3 grid.",
    winPrice: "500 coins",
    playerSlot: "2v2",
    onClick: gameLogic.openTicTacToe,
  },
  {
    id: 3,
    image: require("../images/geogame.jpg"), // Placeholder image
    logo: require("../images/group.png"),
    title: "Geography Quiz",
    date: "Anytime",
    description: "Test your geography knowledge with friends.",
    winPrice: "500 Coins",
    playerSlot: "Solo",
    onClick: gameLogic.openGeography, // Reference geography logic
  },
  {
    id: 4,
    image: require("../images/memogame.jpg"), // Placeholder image
    logo: require("../images/group.png"),
    title: "Memory Game",
    date: "Upcoming...",
    description: "Match pairs to test your memory in a sleek, dark-themed game",
    winPrice: "500 Coins",
    playerSlot: "2v2",
    onClick: gameLogic.openMemory, // Reference geography logic
  },
];
