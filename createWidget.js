import Maze from "./Maze.js";

export default function createWidget(settings) {
  let widgetWidth = 1000, widgetHeight = 700;

  let maze = Maze.create(settings);

  let mazeId = maze.algorithmId + "-" + maze.seed;
  let widgetId = mazeId + "-widget";
  let canvasId = mazeId + "-canvas";
  let styleWidth = widgetWidth ?? widgetSize ?? widgetHeight ?? "auto";
  let styleHeight = widgetHeight ?? widgetSize ?? widgetWidth ?? "auto";
  let paused = settings.paused ?? false;

  const iconImageFolderURL = "https://deno.land/x/maze_generator@wip/images/button-icons";

  function getButtonInnerHTML(buttonName){
    if(true){
      return `<img 
        class="maze-image ${buttonName}-image"
        src="${iconImageFolderURL}/${buttonName}.svg" 
        alt="${buttonName}"
        style="width: 20px"
      />`
    }else{
      return buttonName;
    }

  }

  let html =
  `
  <div class="maze-widget ${maze.algorithmId}" id="${widgetId}" style="display: inline-block; text-align: center;">
  <canvas width="220" height="220" style="width:${styleWidth}; height:${styleHeight}" class="maze-canvas" id="${canvasId}"></canvas>
  <div class="maze-widget-options">
    <button class="play-pause-button maze-widget-button" onClick="document.getElementById('${widgetId}').playPauseMaze()">
      ${getButtonInnerHTML(paused ? "play" : "pause")}
    </button>
    <button class="step-button maze-button" onClick="document.getElementById('${widgetId}').stepMaze()">
      ${getButtonInnerHTML("step")}
    </button>
    <button class="finish-button maze-button" onClick="document.getElementById('${widgetId}').generateMaze()">
      ${getButtonInnerHTML("finish")}
    </button>
    <button class="restart-button maze-button" onClick="document.getElementById('${widgetId}').restartMaze()">
      ${getButtonInnerHTML("restart")}
    </button>
  </div>
</div>
  `;

  document.body.innerHTML += html;

  let widget = document.getElementById(widgetId);

  widget.playPauseMaze = () => {
    paused = !paused;
    widget.getElementsByClassName("play-pause-button")[0].innerHTML = getButtonInnerHTML(paused ? "play" : "pause");
  };

  widget.stepMaze = () => {
    maze.step();
    maze.display({ canvas });
    paused = true;
    widget.getElementsByClassName("play-pause-button")[0].innerHTML = getButtonInnerHTML("play");
  };

  widget.generateMaze = () => {
    maze.generate();
    widget.getElementsByClassName("play-pause-button")[0].disabled = true;
    widget.getElementsByClassName("play-pause-button")[0].style.opacity = 0.4;
    widget.getElementsByClassName("step-button")[0].disabled = true;
    widget.getElementsByClassName("step-button")[0].style.opacity = 0.4;
    widget.getElementsByClassName("finish-button")[0].disabled = true;
    widget.getElementsByClassName("finish-button")[0].style.opacity = 0.4;
    maze.display({ canvas });
  };
  
  widget.restartMaze = () => {
    maze.reset();
    widget.getElementsByClassName("play-pause-button")[0].disabled = false;
    widget.getElementsByClassName("play-pause-button")[0].style.opacity = 1;
    widget.getElementsByClassName("step-button")[0].disabled = false;
    widget.getElementsByClassName("step-button")[0].style.opacity = 1;
    widget.getElementsByClassName("finish-button")[0].disabled = false;
    widget.getElementsByClassName("finish-button")[0].style.opacity = 1;
    maze.display({ canvas });
  };

  let canvas = document.getElementById(canvasId);

  maze.display({ canvas });

  let updateCanvas = () => {
    setTimeout(() => {
      if(!paused){
        maze.step();
        maze.display({
          canvas
        });

        if(maze.finishedGenerating){
          widget.getElementsByClassName("play-pause-button")[0].disabled = true;
          widget.getElementsByClassName("step-button")[0].disabled = true;
          widget.getElementsByClassName("finish-button")[0].disabled = true;
        }
      }

      updateCanvas();
    }, 100);
  };

  updateCanvas();

  return maze;
}
