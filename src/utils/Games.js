export const games = (gameLogic) => [
  {
    id: 1,
    image: require("../images/img1.jpeg"),
    logo: require("../images/logo1.jpeg"),
    title: "Call Of Duty",
    date: "26 Feb-6 Mar, 08:00 PM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    winPrice: "₹28k",
    playerSlot: "4v4",
    onClick: gameLogic.startChessServer, // Reference the game logic function
  },
  {
    id: 2,
    image: require("../images/img2.jpg"),
    logo: require("../images/logo2.jpeg"),
    title: "PUBG Mobile",
    date: "1 Mar-10 Mar, 09:00 PM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    winPrice: "₹30k",
    playerSlot: "2v2",
    onClick: gameLogic.startChessServer,
  },
  {
    id: 3,
    image: require("../images/img3.jpeg"),
    logo: require("../images/logo3.png"),
    title: "Fortnite",
    date: "5 Mar-12 Mar, 07:00 PM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
    winPrice: "₹25k",
    playerSlot: "Solo",
    onClick: gameLogic.startChessServer,
  },
  {
    id: 4,
    image: require("../images/group.png"), // Placeholder image
    logo: require("../images/group.png"),
    title: "Geography Quiz",
    date: "Anytime",
    description: "Test your geography knowledge with friends.",
    winPrice: "100 Coins",
    playerSlot: "Solo",
    onClick: gameLogic.openGeography, // Reference geography logic
  },
  {
    id: 5,
    image: require("../images/group.png"),
    logo: require("../images/group.png"),
    title: "Tic-Tac-Toe",
    date: "Anytime",
    description: "Play Tic-Tac-Toe with your friends!",
    winPrice: "100 Coins",
    playerSlot: "2 Players",
    onClick: gameLogic.openTicTacToe, // Reference Tic-Tac-Toe logic
  },
];
