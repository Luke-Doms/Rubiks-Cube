
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

var camera = function (pos, dir, up) {
  this.pos = pos;
  this.dir = dir;
  this.up = up;
  this.initialClick;
}

camera.prototype.Move = function () {
  //get coordinates of mouse current - mouse initial and convert them to a vector in 3 space that then take cross procuct of 
  // with "look at" vector to get axis of rotation. Use magnitude to get radians for rotation, then update view matrix
}
