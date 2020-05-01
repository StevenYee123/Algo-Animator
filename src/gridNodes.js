class GridNodes {
  constructor() {
    this.determineNeighbors = this.determineNeighbors.bind(this);
    this.nodeGenerator = this.nodeGenerator.bind(this);
    this.nodes = this.nodeGenerator();
    this.starting = this.nodes[13][15];
    this.ending = this.nodes[42][15];
  }

  nodeGenerator() {
    let nodes = [];
    let boxW = 20;
    let boxH = 20;
    for (let i = 0; i < 57; i++) {
      nodes.push([]);
      for (let n = 0; n < 31; n++) {
        nodes[i].push(new Node(10, [i, n], i * (boxW + 3), n * (boxH + 3)));
      }
    }
    this.determineNeighbors(nodes);
    return nodes;
  }

  determineNeighbors(nodes) {
    const positions = [
      [0, -1],
      [-1, 0],
      [0, 1],
      [1, 0],
    ];
    let flattened = flatten(nodes);
    flattened.forEach(function (node) {
      positions.forEach(function (position) {
        let neighbor = [node.x + position[0], node.y + position[1]];
        if (
          neighbor[0] >= 0 &&
          neighbor[0] < 57 &&
          neighbor[1] >= 0 &&
          neighbor[1] < 31 &&
          !node.neighbors.includes(nodes[neighbor[0]][neighbor[1]])
        ) {
          node.neighbors.push(nodes[neighbor[0]][neighbor[1]]);
        }
      });
    });
  }
}

function flatten(arr) {
  if (!Array.isArray(arr)) return [arr];

  let allElements = [];
  arr.forEach((ele) => {
    let flattened = flatten(ele);
    allElements.push(...flattened);
  });

  return allElements;
}

class Node {
  constructor(val, [x, y], xpos, ypos) {
    this.val = val;
    this.key = `[${x}][${y}]`;
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.xpos = xpos;
    this.ypos = ypos;
    this.weight = 1;
  }
}

export default GridNodes;