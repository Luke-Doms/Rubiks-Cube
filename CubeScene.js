var vertexShaderText =
[
"precision mediump float;",
"",
"attribute vec3 vertPosition;",
"attribute vec3 vertColor;",
"uniform mat4 mWorld;",
"uniform mat4 mView;",
"uniform mat4 mProj;",
"",
"varying vec3 fragColor;",
"void main()",
"{",
"  fragColor = vertColor;",
"  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);",
"}"
].join("\n");

var fragmentShaderText =
[
"precision mediump float;",
"",
"varying vec3 fragColor;",
"void main()",
"{",
"  gl_FragColor = vec4(fragColor, 1.0);",
"}"
].join("\n");

/*
let baseCube =
[
  [-1.0, 1.0, -1.0, 0.0, 0.0, 0.0],
  [-1.0, 0.0, -1.0, 0.0, 0.0, 0.0],
  [0.0, 1.0, -1.0, 0.0, 0.0, 0.0],

  [0.0, 0.0, -1.0, 0.0, 0.0, 0.0],
  [-1.0, 0.0, -1.0, 0.0, 0.0, 0.0],
  [0.0, 1.0, -1.0, 0.0, 0.0, 0.0],

  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [-1.0, 1.0, 0.0, 0.0, 0.0, 0.0],

  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 1.0, 0.0, 0.0, 0.0, 0.0],
  [-1.0, 1.0, 0.0, 0.0, 0.0, 0.0],

  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, -1.0, 0.0, 0.0, 0.0],
  [0.0, 1.0, -1.0, 0.0, 0.0, 0.0],

  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 1.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 1.0, -1.0, 0.0, 0.0, 0.0],

  [-1.0, 1.0, -1.0, 0.0, 0.0, 0.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [-1.0, 0.0, -1.0, 0.0, 0.0, 0.0],

  [-1.0, 1.0, -1.0, 0.0, 0.0, 0.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [-1.0, 1.0, 0.0, 0.0, 0.0, 0.0],

  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, -1.0, 0.0, 0.0, 0.0],
  [-1.0, 0.0, -1.0, 0.0, 0.0, 0.0],

  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [-1.0, 0.0, -1.0, 0.0, 0.0, 0.0],

  [-1.0, 1.0, -1.0, 0.0, 0.0, 0.0],
  [0.0, 1.0, -1.0, 0.0, 0.0, 0.0],
  [-1.0, 1.0, 0.0, 0.0, 0.0, 0.0],

  [0.0, 1.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 1.0, -1.0, 0.0, 0.0, 0.0],
  [-1.0, 1.0, 0.0, 0.0, 0.0, 0.0]

]; */

let baseCube =
[
  [-1.05, -0.05, -1.05, 0.0, 0.0, 0.0],
  [-1.05, -1.05, -1.05, 0.0, 0.0, 0.0],
  [-0.05, -0.05, -1.05, 0.0, 0.0, 0.0],

  [-0.05, -1.05, -1.05, 0.0, 0.0, 0.0],
  [-1.05, -1.05, -1.05, 0.0, 0.0, 0.0],
  [-0.05, -0.05, -1.05, 0.0, 0.0, 0.0],

  [-0.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-1.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-1.05, -0.05, -0.05, 0.0, 0.0, 0.0],

  [-0.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-0.05, -0.05, -0.05, 0.0, 0.0, 0.0],
  [-1.05, -0.05, -0.05, 0.0, 0.0, 0.0],

  [-0.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-0.05, -1.05, -1.05, 0.0, 0.0, 0.0],
  [-0.05, -0.05, -1.05, 0.0, 0.0, 0.0],

  [-0.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-0.05, -0.05, -0.05, 0.0, 0.0, 0.0],
  [-0.05, -0.05, -1.05, 0.0, 0.0, 0.0],

  [-1.05, -0.05, -1.05, 0.0, 0.0, 0.0],
  [-1.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-1.05, -1.05, -1.05, 0.0, 0.0, 0.0],

  [-1.05, -0.05, -1.05, 0.0, 0.0, 0.0],
  [-1.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-1.05, -0.05, -0.05, 0.0, 0.0, 0.0],

  [-0.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-0.05, -1.05, -1.05, 0.0, 0.0, 0.0],
  [-1.05, -1.05, -1.05, 0.0, 0.0, 0.0],

  [-0.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-1.05, -1.05, -0.05, 0.0, 0.0, 0.0],
  [-1.05, -1.05, -1.05, 0.0, 0.0, 0.0],

  [-1.05, -0.05, -1.05, 0.0, 0.0, 0.0],
  [-0.05, -0.05, -1.05, 0.0, 0.0, 0.0],
  [-1.05, -0.05, -0.05, 0.0, 0.0, 0.0],

  [-0.05, -0.05, -0.05, 0.0, 0.0, 0.0],
  [-0.05, -0.05, -1.05, 0.0, 0.0, 0.0],
  [-1.05, -0.05, -0.05, 0.0, 0.0, 0.0]

];

//maybe put the stuff above here in a different file.

var puzzleScene = function (gl) {
  this.gl = gl;
}

puzzleScene.prototype.Load = function () {
  var me = this;

  me.cube = new rubiksCube(baseCube);
  for (var cubie = 0; cubie < me.cube.cubies.length; cubie++) {
    me.cube.cubies[cubie] = new model(this.gl, me.cube.cubies[cubie].positionVertices); //this is sketch, feeling like we dont even need cubie objects lol
  }


  //create shaders/program...
  me.Program = createShaderProgram(
    me.gl,
    vertexShaderText,
    fragmentShaderText
  );

  me.Program.uniforms = {
    mProj: me.gl.getUniformLocation(me.Program, 'mProj'),
    mView: me.gl.getUniformLocation(me.Program, 'mView'),
    mWorld: me.gl.getUniformLocation(me.Program, 'mWorld'),
  };

  me.Program.attribs = {
    vertPosition: me.gl.getAttribLocation(me.Program, 'vertPosition'),
    vertColor: me.gl.getAttribLocation(me.Program, 'vertColor'),
  };

  me.viewMatrix = glMatrix.mat4.create();
  me.projMatrix = glMatrix.mat4.create();

  glMatrix.mat4.lookAt(me.viewMatrix, [-5, -5, 3], [0, 0, 0], [0, -1, 0]);
  glMatrix.mat4.perspective(me.projMatrix, glMatrix.glMatrix.toRadian(45), me.gl.canvas.clientWidth/me.gl.canvas.clientHeight, 0.1, 1000.0);

  me.pressedKeys = {
    Right : false,
    Left : false,
    Top : false,
    Bottom : false,
    Front : false,
    Back : false,
    Modifier: false
  }
}

puzzleScene.prototype.Unload = function () {

}

puzzleScene.prototype.Begin = function () {
  var me = this;

  this.__KeyDownWindowListener = this._OnKeyDown.bind(this);
  this.__KeyUpWindowListener = this._OnKeyUp.bind(this);

  window.addEventListener("keydown", this.__KeyDownWindowListener);
  window.addEventListener("keyup", this.__KeyUpWindowListener);

  var previousFrame = performance.now();
  var dt = 0;
  this.ANIMATION_NOT_RUNNING = true;
  var loop = function (currentFrameTime) {
    dt = currentFrameTime - previousFrame;
    me.Update(dt);
    previousFrame = currentFrameTime;

    me.Render();

    me.nextFrameHandle = requestAnimationFrame(loop);
  }
  me.nextFrameHandle = requestAnimationFrame(loop);
}


puzzleScene.prototype.Update = function (dt) {
  //not sure if this will update "backwards" in the way it needs to...
  if (this.pressedKeys.Front && !this.pressedKeys.Modifier && this.ANIMATION_NOT_RUNNING) {
    this.ANIMATION_NOT_RUNNING = false;
    this.cube.setRotate("Front", 1);
    //this.pressedKeys.Front = false;
  }
  if (this.pressedKeys.Front && this.pressedKeys.Modifier && this.ANIMATION_NOT_RUNNING) {
    this.ANIMATION_NOT_RUNNING = false;
    this.cube.setRotate("Front", -1);
    //this.pressedKeys.Front = false;
  }
  if (this.pressedKeys.Left && !this.pressedKeys.Modifier && this.ANIMATION_NOT_RUNNING) {
    this.ANIMATION_NOT_RUNNING = false;
    this.cube.setRotate("Left", 1);
    //this.pressedKeys.Left = false;
  }
  if (this.pressedKeys.Left && this.pressedKeys.Modifier && this.ANIMATION_NOT_RUNNING) {
    this.ANIMATION_NOT_RUNNING = false;
    this.cube.setRotate("Left", -1);
    //this.pressedKeys.Left = false;
  }
  if (!this.ANIMATION_NOT_RUNNING) {
    this.ANIMATION_NOT_RUNNING = this.cube.rotate(dt);
  }
}

puzzleScene.prototype._OnKeyDown = function (e) {
  switch (e.code) {
    case 'KeyQ':
      console.log("yuckers buckers :)");
      this.pressedKeys.Modifier = true;
      break;
    case 'KeyE':
      this.pressedKeys.Front = true;
      break;
    case 'KeyW':
      this.pressedKeys.Left = true;
      break;
  }
}

puzzleScene.prototype._OnKeyUp = function (e) {
  console.log("UP");
  switch (e.code) {
    case 'KeyQ':
      this.pressedKeys.Modifier = false;
      break;
    case 'KeyE':
      this.pressedKeys.Front = false;
      break;
    case 'KeyW':
      this.pressedKeys.Left = false;
      break;
  }
}

puzzleScene.prototype.Render = function () {
  var gl = this.gl;

  //gl.enable(gl.CULL_FACE);  ??????????
  gl.enable(gl.DEPTH_TEST);

  gl.clearColor(.9, .9, .9, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.useProgram(this.Program);

  gl.uniformMatrix4fv(this.Program.uniforms.mView, gl.FALSE, this.viewMatrix);
  gl.uniformMatrix4fv(this.Program.uniforms.mProj, gl.FALSE, this.projMatrix);

  for (var i = 0; i < this.cube.cubies.length; i++) {
    var cubie = this.cube.cubies[i];
    gl.uniformMatrix4fv(
      this.Program.uniforms.mWorld,
      gl.FALSE,
      cubie.world
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, cubie.vertexBufferObject);
    gl.vertexAttribPointer(
      this.Program.attribs.vertPosition,  //also unsure of syntax, also array buffer vs index buffer may come into play here to throw and error
      3, gl.FLOAT, gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, 0
    );
    gl.enableVertexAttribArray(this.Program.attribs.vertPosition);

    gl.vertexAttribPointer(
      this.Program.attribs.vertColor,
      3, gl.FLOAT, gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT
    )
    gl.enableVertexAttribArray(this.Program.attribs.vertColor);

    gl.drawArrays(gl.TRIANGLES, 0, 36);
  }
}
