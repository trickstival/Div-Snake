export default (block) => {
  const x = block.x,
        y = block.y
  return [
    {
      name: 'Right',
      x: x + 1,
      y
    },
    {
      name: 'Down',
      x,
      y: y + 1
    },
    {
      name: 'Left',
      x: x - 1,
      y
    },
    {
      name: 'Up',
      x,
      y: y - 1
    },
    {
      name: 'Upright',
      x: x + 1,
      y: y - 1
    },
    {
      name: 'Upleft',
      x: x - 1,
      y: y - 1
    },
    {
      name: 'Downright',
      x: x + 1,
      y: y + 1,
    },
    {
      name: 'Downleft',
      x: x - 1,
      y: y + 1
    }
  ]
}
