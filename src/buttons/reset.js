const reset = (graph, start, end) => {
  graph.nodes.forEach((row) => {
    row.forEach((node) => {
      node.val = 10;
      node.weight = 1;
    });
  });

  graph.starting = start;
  graph.starting.val = 1;

  graph.ending = end;
  graph.ending.val = 2;
  clearInterval(DIJKSTRA_ID);
  clearInterval(DFS_ID);
  clearInterval(BFS_ID);
}

export default reset;
