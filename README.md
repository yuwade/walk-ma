﻿# maze_generator

This is all very much work-in-progress, however feedback is welcome.

Example usage
```javascript
import {Maze} from "./MazeClasses.js"

let mazeSettings = {
  width: 15,
  height: 15,
  algorithm: "recursive backtracker"
}

//initialize the maze
let m = Maze.create(mazeSettings);

//generate it
m.generate();


console.log(JSON.stringify(m));

```
