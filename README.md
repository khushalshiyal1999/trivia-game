# Trivia Game

This is a trivia game built using **Next.js** that fetches questions from the Open Trivia Database API. Users can answer multiple-choice questions and see their results at the end.

## Features

- Fetches trivia questions from the [Open Trivia DB API](https://opentdb.com/)
- Displays 10 multiple-choice questions
- Tracks the user’s score (correct/incorrect answers)
- Provides instant feedback on the correctness of each answer
- Shows error messages if a question is submitted without selecting an answer
- Displays a results page at the end of the game

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: SCSS (CSS Modules)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: Next.js built-in router
- **API**: [Open Trivia DB API](https://opentdb.com/)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: You can download it from [nodejs.org](https://nodejs.org/)
- **npm** or **yarn**: npm is included with Node.js, and you can install yarn globally with `npm install -g yarn`

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/trivia-game.git
    cd trivia-game
    ```

2. Install dependencies:

    Using npm:

    ```bash
    npm install
    ```

    Using yarn:

    ```bash
    yarn install
    ```

### Running the Application

1. Start the development server:

    Using npm:

    ```bash
    npm run dev
    ```

    Using yarn:

    ```bash
    yarn dev
    ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Build for Production

To build the project for production, run:

Using npm:

```bash
npm run build
