const moves = {
  UP: 40,
  RIGHT: 39,
  DOWN: 38,
  LEFT: 37,
  NONE: -1
}

export default moves

export const randomMove = () => {
  const keys = Object.keys(moves)
  keys.splice(keys.indexOf(moves[moves.NONE]), 1)
  const movePosition = Math.floor(Math.random() * keys.length, 1)
  return moves[keys[movePosition]]
}