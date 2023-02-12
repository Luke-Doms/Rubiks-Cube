
var model = function (gl, vertices) {
  this.vertexBufferObject = gl.createBuffer();
  //this.world = new Float32Array(16);
  //glMatrix.mat4.identity(this.world);
  this.world = glMatrix.mat4.create();

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

}

var createShaderProgram = function (gl, vsText, fsText) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vsText);
  gl.shaderSource(fragmentShader, fsText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("error compiling vertexShader.", gl.getShaderInfoLog(vertexShader));
    return;
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("error compiling fragmentShader.", gl.getShaderInfoLog(fragmentShader));
    return;
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("error linking program", gl.getProgramInfoLog(program));
    return;
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("error validating program", gl.getProgramInfoLog(program));
    return;
  }

  return program
}

//starting with basically just using the move method

var camera = function (pos, dir, up) {
  this.Pos = pos;
  this.dir = dir;
  this.up = up;
  this.initialMouseEvent;
}

camera.prototype.Set = function (gl, e, viewMatrix, projMatrix) {
  this.initialMouseEvent = e;
}

camera.prototype.Move = function (gl, e, viewMatrix, projMatrix, lookDirection) {
  const clipCoord = getClipCoord(gl, e);
  const inverse = glMatrix.mat4.create();
  const viewProjMatrix = glMatrix.mat4.create();
  glMatrix.mat4.multiply(viewProjMatrix, projMatrix, viewMatrix);
  glMatrix.mat4.invert(inverse, viewProjMatrix);
  glMatrix.vec4.transformMat4(clipCoord, clipCoord, inverse);

  const clipCoordFormer = getClipCoord(gl, this.initialMouseEvent);
  glMatrix.vec4.transformMat4(clipCoordFormer, clipCoordFormer, inverse);

  const swipeDirection = glMatrix.vec3.create();
  const rotationAxis = glMatrix.vec3.create();
  glMatrix.vec4.subtract(swipeDirection, convert(clipCoord), convert(clipCoordFormer));
  glMatrix.vec3.cross(rotationAxis, swipeDirection, lookDirection);

  const newView = glMatrix.mat4.create();
  const rot = glMatrix.mat4.create();
  glMatrix.mat4.fromRotation(rot, -.5 * glMatrix.vec3.length(rotationAxis), rotationAxis);
  const lookHomogenous = glMatrix.vec4.fromValues(lookDirection[0], lookDirection[1], lookDirection[2], 1);
  glMatrix.mat4.multiply(newView, viewMatrix, rot);
  glMatrix.mat4.invert(rot, rot);
  glMatrix.vec4.transformMat4(lookHomogenous, lookHomogenous, rot);
  lookDirection = convert(lookHomogenous);
  this.initialMouseEvent = e;
  return [newView, lookDirection];
}
