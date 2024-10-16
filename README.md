# GameMate - Multiplayer Game Invitation and Matchmaking System

![Screenshot 2024-10-16 145458](https://github.com/user-attachments/assets/31d2b118-e416-489d-8909-04597c35a679)

## Project Overview

GameMate is a real-time multiplayer game invitation and matchmaking platform where users can connect with friends, send game invites, and participate in various online games. The platform supports seamless game invites, matchmaking, and automatic coin staking. The application is built using React for the frontend and Socket.IO for real-time communication, with a backend hosted on Azure.

## Features

- **Friend Management**: View the list of friends, their online status (online, busy, or offline), and send game invites to them.
- **Real-time Game Invitations**: Receive game invites through Socket.IO. Users can accept or decline game invites in real time.
- **Matchmaking**: After accepting a game invite, a match is created between the two users, and the game URL is launched in a new window.
- **Coin Staking**: Automatically stake coins (500) when a game is initiated, allowing for friendly competitions.
- **Dynamic UI**: The app features a dynamic user interface with responsive game invite notifications, friend lists, and match creation.

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS for styling
  - Socket.IO for real-time communication
  - React Icons for icons
  - React Router for navigation
- **Backend**:
  - Node.js with Express
  - Socket.IO for real-time server-client communication
  - REST APIs for user and match management
  - Azure Web Services for deployment

## Setup Instructions

### Prerequisites

1. Ensure that Node.js is installed on your machine.
2. A modern browser to view the application.
3. Access to the backend servers (replace the URLs with your own if necessary).

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/username/gamemate.git
   cd gamemate
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

   The app will be served at `http://localhost:3000`.

### Backend Setup

The backend consists of multiple REST API endpoints and WebSocket communication hosted on Azure. Ensure the following URLs are accessible:

- **Friend API**: `https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/friends`
- **Matchmaking API**: `https://gamemateserver3-eresf4e6c0drdnaf.southindia-01.azurewebsites.net/`
- **Coin Staking API**: `https://gamemateserver-ezf2bagbgbhrdcdt.westindia-01.azurewebsites.net/configure-coins`

### Environment Variables

Make sure you configure the environment variables required for the application (such as API URLs, WebSocket servers, etc.).

### Game Server

Each game invite has a specific `gameUrl` that is used to start the game session. Ensure that these URLs are correctly configured in the backend and that they are dynamically assigned upon successful matchmaking.

## Key Functionalities

### 1. Friend List Display
- Users can view a list of their friends along with their current online status.
- Each friend is clickable and allows the user to send a game invite to them.

### 2. Game Invite System
- Real-time game invites are received via Socket.IO.
- Invites include the sender's email, the game type, and the game URL.
- Users can accept or decline invites with a click of a button.

### 3. Match Creation and Coin Staking
- Once a game invite is accepted, a new match is created between the sender and the receiver.
- 500 coins are automatically staked for the game session.

### 4. Matchmaking
- Game invites are matched in real-time, and the invite details are relayed back to the users via Socket.IO events.
- Matches are stored on the server to track ongoing games.

## Screenshots

- **Friends List**: Displays the friends with their status (online, offline, busy).
- **Invite Notification**: Shows real-time invite with options to accept or decline.
- **Matchmaking Process**: Automatically opens a new tab to launch the game after invite acceptance.

## Future Enhancements

- **Leaderboard**: Adding a global leaderboard system to track wins/losses and coins earned.
- **Chat Integration**: Allowing users to chat within the game lobby or during gameplay.
- **Multiple Game Support**: Expanding support for more game types with different stake amounts.
- **Profile Customization**: Allow users to customize their profile, including avatars and bios.


## Contact

For any issues or inquiries, please contact Abhay Pratap Singh at pratapsinghabhay999@gmail.com.

