class rubiksCube {
  constructor(positionTensor) {
    //create 2x2x2 tensor initialized to 0 or somethings like that, maybe with tensorflow, called cubeTensor
    //squash to create an additional listTensor object
    var cube = [[[0, 1], [2, 3]], [[4, 5], [6, 7]]];
    this.cubies = [];
    var color = new Float32Array(6);
    for (var i = 0; i < 2; i++) {
      for (var k = 0; k < 2; k++) {
        for (var j = 0; j < 2; j++) { //make sure the colors actually line up here, prob a way to simplify this
          const color = [[0, 0, 0, (1-j), (1-j), 0],
            [0, 0, 0, j, j, j],
            [0, 0, 0, 0, i, 0],
            [0, 0, 0, 0, 0, (1-i)],
            [0, 0, 0, (1-k), 0, 0],
            [0, 0, 0, k, k * .647, 0]]; //this is short but not very readable, if it doesnt give an algroithm that allows one to set size of cube its probably better to do a more longwinded but clear approach
          //console.log(cube[i][k][j]);
          //console.log(this.cubies[cube[i][k][j]]);
          this.cubies.push(new SubCube(positionTensor, [i * 1.1, k * 1.1, j * 1.1, 0, 0, 0], color));
        }
      }
    }
    this.cubeTensor = tf.tensor(cube);
  }
  front() {
    //grab relevant slice of tensor and call rotate(Y, 0) on all cubies. Maybe can turn into one function with a parameter that determines which side is rotated
  }
  frontInverse() {

  }
  back() {

  }
  backInverse() {

  }
  left() {

  }
  leftInverse() {

  }
  right() {

  }
  rightInverse() {

  }
  bottom() {

  }
  bottomInverse() {

  }
  top() {

  }
  topInverse() {

  }
}

class SubCube {
  constructor(coordinates, offset, color) {
    //set world matrix to be translated in load function is a better way to do this.
    this.positionVertices = new Float32Array(216);
    this.diff = new Float32Array(216);
    for (var i = 0; i < coordinates.length; i++) {
      for (var j = 0; j < 6; j++) {
        this.positionVertices[i*6 + j] = coordinates[i][j] + offset[j];
        this.diff[i*6 + j] = coordinates[i][j] - this.positionVertices[i*6 + j];
      }
    }
    //convert to proper form without brackets here for web gl
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 36; j++) {
        this.positionVertices[36*i + j] = this.positionVertices[36*i + j] + color[i][j % 6]; // not the real expression
        this.diff[i*36 + j] = coordinates[i][j] - this.positionVertices[i*6 + j];
      }
    }
    console.log("YUMBO");
    //bro this sucks LMAO, def a better way to do this
    this.worldMatrix = glMatrix.mat4.create();
  }
  rotate (rotationAxis, parity) {
    //code goes here lol...
  }
}
