class dijkstrasTraversal{
    constructor(graph, source, draw){
        let {previous} = dijkstras(graph, source);
        this.traversal = this.traversal.bind(this);
        this.draw = draw;
        this.start = graph.starting;
        this.end = graph.ending;
        this.path = [this.end.key];
        this.interval = null;
        this.node = this.start;

        while(this.path[this.path.length - 1] !== this.start.key){
            this.path.push(previous[this.path[this.path.length - 1]]);
        }

        this.path = this.path.reverse().slice(1);

        let allNodes = flatten(graph.nodes);
        this.pathNodes = [];

        this.path.forEach((key) => {
            allNodes.forEach((node) => {
                if(key === node.key){
                    this.pathNodes.push(node);
                }
            });
        });

        this.interval = setInterval(this.traversal, 20);
        DIJKSTRA_ID = this.interval;
    }

    traversal(){
        if (this.node === this.end || this.pathNodes.length === 0){
            clearInterval(this.interval);
            this.draw();
            return;
        }

        this.node = this.pathNodes.shift();
        if (this.node.val === 10){
            this.node.val = 75;
        } else if (this.node.val === 300){
            this.node.val = 350;
        }
        this.draw();
    }
}

function dijkstras(graph, source){
    let adjacents = {};

    let nodes = flatten(graph.nodes);
    nodes.forEach((node) => {
        let nodeNeighbors = {};
        node.neighbors.forEach((neighbor) => {
            if (neighbor.val !== 50){
                nodeNeighbors[neighbor.key] = neighbor.weight;
            }
        });
        adjacents[node.key] = nodeNeighbors;
    });

    let distance = {};
    for (let node in adjacents){
        distance[node] = Infinity;
    }
    distance[source] = 0;

    let unvisited = new Set(Object.keys(adjacents));
    let previous = {};

    while (unvisited.size > 0){
        let currNode = minDistanceNode(unvisited, distance);
        unvisited.delete(currNode);

        for (let neighbor in adjacents[currNode]){
            let distanceFromCurrToNeighbor = adjacents[currNode][neighbor];
            let totalNeighborDistance = distance[currNode] + distanceFromCurrToNeighbor;

            if (distance[neighbor] > totalNeighborDistance){
                distance[neighbor] = totalNeighborDistance;
                previous[neighbor] = currNode;
            }
        }
    }

    return { distance, previous };
}

function minDistanceNode(nodes, distance){
    return Array.from(nodes).reduce((minNode, node) => (
        distance[node] < distance[minNode] ? node : minNode
    ));
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

export default dijkstrasTraversal;