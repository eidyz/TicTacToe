import * as _ from "lodash"
import * as React from "react"
import { useEffect, useState } from "react"
import { arrayContainsArray, wait } from "../helpers/helpers"
import { navigate } from "hookrouter"

export default ({ useAi = true }: { useAi?: boolean }) => {
  const emptyBoard = new Array(9).fill(null, 0, 9)

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [board, setBoard] = useState([...emptyBoard])
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [gameState, setGameState] = useState(null)

  const makeMove = (i: number) => {
    setBoard(_.map(board, (item, index) => index === i ? currentPlayer : item))
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const getEmptyIndexes = (): number[] => {
    return board.reduce((acc, boardItem, index) => {
      if (_.isNil(boardItem)) acc.push(index)
      return acc;
    }, []);
  }

  const getXIndexes = (): number[] => {
    return board.reduce((acc, boardItem, index) => {
      if (boardItem === "X") acc.push(index)
      return acc;
    }, []);
  }

  const getOIndexes = (): number[] => {
    return board.reduce((acc, boardItem, index) => {
      if (boardItem === "O") acc.push(index)
      return acc;
    }, []);
  }

  const makeAiMove = async () => {
    const randomEmptyIndex = _.sample(getEmptyIndexes())
    await wait(600)
    makeMove(randomEmptyIndex)
  }

  useEffect(() => {
    const oIndexes = getOIndexes()
    const xIndexes = getXIndexes()
    const gameWonByX = _.some(_.map(winningConditions, conditions => arrayContainsArray(xIndexes, conditions)))
    const gameWonByO = _.some(_.map(winningConditions, conditions => arrayContainsArray(oIndexes, conditions)))
    const gameDraw = _.every(board, item => !_.isNil(item)) && (gameWonByX === false && gameWonByO === false)

    setGameState(
      gameWonByX ? "X's won" : gameWonByO ? "O's won" : gameDraw ? "Draw" : null
    )

    if (useAi && !gameWonByX && currentPlayer === "O") {
      makeAiMove()
    }

  }, [currentPlayer])

  useEffect(() => {
    (async () => {
      if (!_.isNil(gameState)) {
        await wait(3000)
        navigate("/")
      }
    })()
  }, [gameState])

  return (
    <div className="position-relative">
      {!_.isNil(gameState) && <div className="game-state">{gameState}</div>}
      <div className="board">
        {
          _.map(board, ((item, i) => {
            return <div
              className="board__item"
              key={i}
              onClick={
                () => _.isNil(item) && (useAi ? currentPlayer === "X" : true) && _.isNil(gameState)
                  ? makeMove(i)
                  : _.noop()
              }>
              {item}
            </div>
          }))
        }
      </div>
    </div>
  )
}