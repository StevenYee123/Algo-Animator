const enableWalls = (walls) => {
  if (walls === true) {
    walls = false;
  } else {
    walls = true;
  }
  return walls;
}

export default enableWalls;
