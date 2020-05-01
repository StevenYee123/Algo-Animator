# Algo-Animator
Welcome to **Algo-Animator!** A fun and interactive way to showcase some common pathfinding algorithms. Algo-Animator provides the features to allow the user change the start and end points. Users can also add walls to block certain paths, and even create "weighted" nodes to represent more "costly" paths and really show off how algorithms will handle different situations! Users will be able to see visual representations of Breadth-First Search, Depth-First Search, and Dijkstra's Algorithm. 
### Technologies Used
- Vanilla js
- Canvas.js
### Features 
The most efficient Algorithm of the 3 featured would be Dijkstra's Algorithm, it works by finding the shortest AND most efficient path between 2 points which means it takes weighted nodes into account.
![dijkstras](app/assets/images/algo-animator.gif)
```js 
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
        let current = minDistanceNode(unvisited, distance);
        unvisited.delete(current);

        for (let neighbor in adjacents[current]){
            let currentToNeighbor = adjacents[current][neighbor];
            let totalNeighborDistance = distance[current] + currentToNeighbor;

            if (distance[neighbor] > totalNeighborDistance){
                distance[neighbor] = totalNeighborDistance;
                previous[neighbor] = current;
            }
        }
    }
    return { distance, previous };
}
```
### Future Directions
- A* Search 
- Best-First Search
