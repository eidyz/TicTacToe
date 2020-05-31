import * as React from "react"
import TicTacToe from "../pages/TicTacToe"
import HomePage from "../pages/Homepage"

export default {
    '/': () => <HomePage />,
    '/with-person': () => <TicTacToe useAi={false} />,
    '/with-ai': () => <TicTacToe useAi={true} />,
};