class depthFirstSearch{
  constructor(graph, draw){
    this.visited = new Set();
    this.graph = graph;
    this.stack = [graph.starting];
    this.interval = null;
    this.addToStack = this.addToStack.bind(this);
    this.draw = draw;

    this.interval = setInterval(this.addToStack, 20);
    DFS_ID = this.interval;
  }

  addToStack() {
    let node;
    const first = this.stack[0];
    if (this.stack.length > 0) {
      node = this.stack[this.stack.length - 1];
    }
    if (first === this.graph.starting) {
      node = this.graph.starting;
    }
    if (node === this.graph.ending || this.stack.length === 0) {
      clearInterval(this.interval);
      this.stack = [];
      this.draw();
      return;
    } else if (this.visited.has(node)) {
      return;
    }
    node = this.stack.pop();
    this.visited.add(node);
    node.neighbors.forEach((neighbor) => {
      if (
        !this.visited.has(neighbor) &&
        neighbor.val !== 50 &&
        !this.stack.includes(neighbor)
      ) {
        this.stack.push(neighbor);
      }
    });
    if (node.val === 10) {
      node.val = 75;
    } else if (node.val === 300) {
      node.val = 350;
    }

    this.draw();
  }
}

export default depthFirstSearch;