import "./styles/index.scss";
import "./styles/modal.scss";
import depthFirstSearch from "./search_algorithms/dfs";
import breadthFirstSearch from "./search_algorithms/bfs";
import dijkstrasTraversal from "./search_algorithms/dijkstra";
import keepwalls from "./buttons/keepwalls";
import gridNodes from "./gridNodes";
import reset from "./buttons/reset";

window.addEventListener("DOMContentLoaded", () => {
  let wallsActivated = false;
  let weightsActivated = false;
  let canvas = document.getElementById("canvas");
  canvas.width = 1310;
  canvas.height = 710;
  let ctx = canvas.getContext("2d");
  init();
  canvas.onmousedown = mouseDown;
  canvas.onmouseup = mouseUp;
  canvas.ondragstart = function () {
    return false;
  };
  //Modal functions
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("myBtn");
  const span = document.getElementsByClassName("close")[0];
  btn.onclick = function () {
    modal.style.display = "block";
  };
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  //Establish a width and Height for our grid
  let WIDTH = 1650;
  let HEIGHT = 750;
  //Establish a set width and height for each Node
  let nodeW = 20;
  let nodeH = 20;
  //Establish the num of rows and columns for the grid
  let gridRows = 31;
  let gridColumns = 57;
  //Establish a bound for our grid
  let bindedX = 0;
  let bindedY = 0;
  //Create our grid
  let graph = new gridNodes();
  //Start and ending nodes
  graph.nodes[13][15].val = 1;
  graph.nodes[gridColumns - 15][15].val = 2;

  function drawRect(x, y, w, h, state) {
    if (state === 1) {
      //Start Node
      ctx.fillStyle = "#3D9970";
    } else if (state === 2) {
      //End Node
      ctx.fillStyle = "#FC7272";
    } else if (state === 10) {
      //Not Checked
      ctx.fillStyle = "#55BCC9";
    } else if (state === 50) {
      //Wall
      ctx.fillStyle = "#111111";
    } else if (state === 75) {
      //Checked
      ctx.fillStyle = "#0074D9";
    } else if (state === 300) {
      ctx.fillStyle = "#FFFF00";
    } else if (state === 350) {
      ctx.fillStyle = "#FEB302";
    }
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }

  function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    return setInterval(drawGrid, 10);
  }

  function clearGrid() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  function drawGrid() {
    clearGrid();
    for (let col = 0; col < gridColumns; col++) {
      for (let row = 0; row < gridRows; row++) {
        drawRect(graph.nodes[col][row].xpos, graph.nodes[col][row].ypos, nodeW, nodeH, graph.nodes[col][row].val);
      }
    }
  }

  let currentStart = graph.starting;
  let currentEnd = graph.ending;

  let startDrag = false;
  let endDrag = false;

  function mouseDown(e) {
    canvas.onmousemove = myMove;
    let position = getMousePosition(canvas, e);
    let posx = position.x;
    let posy = position.y;
    for (let c = 0; c < gridColumns; c++) {
      for (let r = 0; r < gridRows; r++) {
        if (c * (nodeW + 3) < posx && posx < c * (nodeW + 3) + nodeW && r * (nodeH + 3) < posy && posy < r * (nodeH + 3) + nodeH) {
          if (graph.nodes[c][r].val === 10 && wallsActivated === true) {
                graph.nodes[c][r].val = 50;
                bindedX = c;
                bindedY = r;
          } else if (graph.nodes[c][r].val === 50 && wallsActivated === true) {
                graph.nodes[c][r].val = 10;
                bindedX = c;
                bindedY = r;
          } else if (graph.nodes[c][r].val === 10 && weightsActivated === true) {
                graph.nodes[c][r].val = 300;
                graph.nodes[c][r].weight = 8;
                bindedX = c;
                bindedY = r;
          } else if (graph.nodes[c][r].val === 300 && weightsActivated === true) {
                graph.nodes[c][r].val = 10;
                graph.nodes[c][r].weight = 1;
                bindedX = c;
                bindedY = r;
          } else if ( wallsActivated === false && weightsActivated === false && graph.nodes[c][r].val !== 2 && graph.nodes[c][r].val === 1 
            && currentStart.x * (nodeW + 3) < posx && posx < currentStart.x * (nodeW + 3) + nodeW && posy > currentStart.y * (nodeH + 3) 
            && posy < currentStart.y * (nodeH + 3) + nodeH) {
                currentStart.val = 10;
                graph.nodes[c][r].val = 1;
                currentStart = graph.nodes[c][r];
                graph.starting = currentStart;
                bindedX = c;
                bindedY = r;
                startDrag = true;
          } else if (wallsActivated === false && weightsActivated === false && graph.nodes[c][r].val !== 1 && graph.nodes[c][r].val === 2 
            && currentEnd.x * (nodeW + 3) < posx && posx < currentEnd.x * (nodeW + 3) + nodeW && posy > currentEnd.y * (nodeH + 3)
            && posy < currentEnd.y * (nodeH + 3) + nodeH) {
                currentEnd.val = 10;
                graph.nodes[c][r].val = 2;
                currentEnd = graph.nodes[c][r];
                graph.ending = currentEnd;
                bindedX = c;
                bindedY = r;
                endDrag = true;
          }
        }
      }
    }
  }

  function myMove(e) {
    let position = getMousePosition(canvas, e);
    let posx = position.x;
    let posy = position.y;
    for (let c = 0; c < gridColumns; c++) {
      for (let r = 0; r < gridRows; r++) {
        if (c * (nodeW + 3) < posx && posx < c * (nodeW + 3) + nodeW && r * (nodeH + 3) < posy && posy < r * (nodeH + 3) + nodeH) {
          if (graph.nodes[c][r].val === 10 && (c !== bindedX || r !== bindedY) && wallsActivated === true) {
                graph.nodes[c][r].val = 50;
                bindedX = c;
                bindedY = r;
          } else if (graph.nodes[c][r].val === 50 && (c !== bindedX || r !== bindedY) && wallsActivated === true) {
                graph.nodes[c][r].val = 10;
                bindedX = c;
                bindedY = r;
          } else if (graph.nodes[c][r].val === 10 && (c !== bindedX || r !== bindedY) && weightsActivated === true) {
                graph.nodes[c][r].val = 300;
                graph.nodes[c][r].weight = 8;
                bindedX = c;
                bindedY = r;
          } else if (graph.nodes[c][r].val === 300 && (c !== bindedX || r !== bindedY) && weightsActivated === true) {
                graph.nodes[c][r].val = 10;
                graph.nodes[c][r].weight = 1;
                bindedX = c;
                bindedY = r;
          } else if (wallsActivated === false && weightsActivated === false && graph.nodes[c][r].val !== 2 
            && (c !== bindedX || r !== bindedY) && startDrag === true) {
                currentStart.val = 10;
                graph.nodes[c][r].val = 1;
                currentStart = graph.nodes[c][r];
                graph.starting = currentStart;

                bindedX = c;
                bindedY = r;
          } else if (wallsActivated === false && weightsActivated === false && graph.nodes[c][r].val !== 1 
            && (c !== bindedX || r !== bindedY) && endDrag === true
          ) {
                currentEnd.val = 10;
                graph.nodes[c][r].val = 2;
                currentEnd = graph.nodes[c][r];
                graph.ending = currentEnd;

                bindedX = c;
                bindedY = r;
          }
        }
      }
    }
  }
    //Create button functionality
  const dfsButton = document.getElementById("dfs-button");
  dfsButton.onclick = () => {
    keepwalls(graph, currentStart, currentEnd);
    new depthFirstSearch(graph, drawGrid);
  };
  const bfsButton = document.getElementById("bfs-button");
  bfsButton.onclick = () => {
    keepwalls(graph, currentStart, currentEnd);
    new breadthFirstSearch(graph, drawGrid);
  };
  const dijkstrasButton = document.getElementById("dijkstras-button");
  dijkstrasButton.onclick = () => {
    keepwalls(graph, currentStart, currentEnd);
    new dijkstrasTraversal(graph, graph.starting.key, drawGrid);
  };
  const resetButton = document.getElementById("reset-button");
  resetButton.onclick = () => {
    reset(graph, currentStart, currentEnd);
    wallsActivated = false;
    addWallButton.classList.remove("clicked");
    weightsActivated = false;
    addWeightButton.classList.remove("clicked");
  };
  const keepWallsButton = document.getElementById("keepwalls-button");
  keepWallsButton.onclick = () => {
    keepwalls(graph, currentStart, currentEnd);
    wallsActivated = false;
    addWallButton.classList.remove("clicked");
    weightsActivated = false;
    addWeightButton.classList.remove("clicked");
  };
  const addWallButton = document.getElementById("addwalls-button");
  addWallButton.onclick = () => {
    wallsActivated = !wallsActivated;
    weightsActivated = false;
    addWeightButton.classList.remove("clicked");
    addWallButton.classList.toggle("clicked");
  };
  const addWeightButton = document.getElementById("addweights-button");
  addWeightButton.onclick = () => {
    weightsActivated = !weightsActivated;
    wallsActivated = false;
    addWallButton.classList.remove("clicked");
    addWeightButton.classList.toggle("clicked");
  };

  function mouseUp() {
    canvas.onmousemove = null;
    startDrag = false;
    endDrag = false;
  }

  function getMousePosition(canv, event) {
    let box = canv.getBoundingClientRect();
    return {
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    };
  }
});