class breadthFirstSearch{
    constructor(graph, draw){
        this.queue = [graph.starting];
        this.visited = new Set();
        this.interval = null;
        this.draw = draw;
        this.graph = graph;
        this.addToQueue = this.addToQueue.bind(this);

        this.interval = setInterval(this.addToQueue, 20);
        BFS_ID = this.interval;
    }

    addToQueue(){
        let node;
        if (this.queue.length > 0){
            node = this.queue[0];
        }
        if (this.queue[0] === this.graph.starting){
            node = this.graph.starting;
        }
        if (node === this.graph.ending || this.queue.length === 0){
            clearInterval(this.interval);
            this.queue = [];
            this.draw();
            return;
        } else if (this.visited.has(node)){
            return;
        }
        node = this.queue.shift();
        this.visited.add(node);
        node.neighbors.forEach((neighbor) => {
            if (!this.visited.has(neighbor) && neighbor.val !== 50 && !this.queue.includes(neighbor)){
                this.queue.push(neighbor);
            }
        })
        if (node.val === 10){
            node.val = 75;
        } else if (node.val === 300){
            node.val = 350;
        } 

        this.draw();
    }
}

export default breadthFirstSearch;