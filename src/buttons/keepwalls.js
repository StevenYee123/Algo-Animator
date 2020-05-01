const keepwalls = (graph, start, end) => {
    graph.nodes.forEach((row) => {
        row.forEach((node) => {
            if (node.val !== 50 && node.val !== 300 && node.val !== 350){
                node.val = 10;
                node.weight = 1;
            } else if (node.val === 350){
                node.val = 300;
                node.weight = 8;
            }
        });
    });

    graph.starting = start;
    graph.starting.val = 1;
    
    graph.ending = end;
    graph.ending.val = 2;

    clearInterval(BFS_ID);
    clearInterval(DFS_ID);
    clearInterval(DIJKSTRA_ID);
}

export default keepwalls;