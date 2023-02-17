class rubiksCube {
  constructor(positionTensor) {
    this.cubeTensor = [[[0, 1], [2, 3]], [[4, 5], [6, 7]]]; //0 -> [0, 0, 0], 1 -> [0, 0, 1], 2 -> [0, 1, 0], 3 -> [0, 1, 1], 4 -> [1, 0, 0], 5 -> [1, 0, 1], 6 -> [1, 1, 0], 7 -> [1, 1, 1],
    this.cubies = [];
    this.totalTime = 0;
    this.final = [];
    this.toRotate;
    this.rotateAxis;
    this.buffer = glMatrix.mat4.create();
    this.parity;
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
          this.cubies.push(new SubCube(positionTensor, [i * 1.1, k * 1.1, j * 1.1, 0, 0, 0], color));
        }
      }
    }
  }

  setCubies (v, rotationAxis) {
    this.rotateAxis = rotationAxis;
    this.toRotate = [this.cubies[v[0]],
                     this.cubies[v[1]],
                     this.cubies[v[2]],
                     this.cubies[v[3]]];
    for (var i = 0; i < 4; i++) {
      this.final.push(glMatrix.mat4.clone(this.toRotate[i].world));
      glMatrix.mat4.rotate(this.buffer, this.buffer, this.parity * math.PI / 2, this.rotateAxis);
      glMatrix.mat4.multiply(this.final[i], this.buffer, this.final[i]);
      glMatrix.mat4.identity(this.buffer);
    }
    if (this.parity == 1) {
      [this.cubies[v[0]], this.cubies[v[1]], this.cubies[v[2]], this.cubies[v[3]]]
      =
      [this.cubies[v[1]], this.cubies[v[2]], this.cubies[v[3]], this.cubies[v[0]]];
    } else {
      [this.cubies[v[0]], this.cubies[v[1]], this.cubies[v[2]], this.cubies[v[3]]]
      =
      [this.cubies[v[3]], this.cubies[v[0]], this.cubies[v[1]], this.cubies[v[2]]];
    }

  }

  setRotate (face, p) {
    this.totalTime = 0;
    this.parity = p;
    this.final = []
    switch (face) {
      case "Front":
        this.setCubies([0, 1, 3, 2], [1, 0, 0]);
        break;
      case "Left":
        this.setCubies([7, 3, 1, 5], [0, 0, -1]);
        break;
      case "Top":
        this.setCubies([7, 6, 2, 3], [0, -1, 0]);
        break;
      case "Back":
      this.setCubies([4, 6, 7, 5], [-1, 0, 0]);
        break;
      case "Right":
        this.setCubies([6, 4, 0, 2], [0, 0, 1]);
        break;
      case "Bottom":
        this.setCubies([5, 1, 0, 4], [0, 1, 0]);
        break;
    }

  }
  rotate (dt) {
    this.totalTime  = this.totalTime + dt;
    if (this.totalTime > 500) {
      for (var i = 0; i < this.final.length; i++){
        glMatrix.mat4.copy(this.toRotate[i].world, this.final[i]);
      }
      this.toRotate = [];
      glMatrix.mat4.identity(this.buffer);
      return true;
    }
    for (var i = 0; i < 4; i++) {
      glMatrix.vec3.normalize(this.rotateAxis, this.rotateAxis);
      glMatrix.mat4.rotate(this.buffer, this.buffer, this.parity * (dt / 500) * (math.PI / 2), this.rotateAxis);
      glMatrix.mat4.multiply(this.toRotate[i].world, this.buffer, this.toRotate[i].world);
      glMatrix.mat4.identity(this.buffer);
    }
    return false
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
        this.positionVertices[36*i + j] = this.positionVertices[36*i + j] + color[i][j % 6];
        this.diff[i*36 + j] = coordinates[i][j] - this.positionVertices[i*6 + j];
      }
    }
    this.worldMatrix = glMatrix.mat4.create();
  }
}
