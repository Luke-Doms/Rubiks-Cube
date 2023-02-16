//this section needs to be heavily reworked for readability/modularity

class rubiksCube {
  constructor(positionTensor) {
    //create 2x2x2 tensor initialized to 0 or somethings like that, maybe with tensorflow, called cubeTensor
    //squash to create an additional listTensor object
    //far index controls left to right, first index controls front to back, and middle index controls up down (roughly, from the fixed camera perspective)
    this.cubeTensor = [[[0, 1], [2, 3]], [[4, 5], [6, 7]]];
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
    //this.cubeTensor = tf.tensor(cube);
  }

  setRotate (face, p) {
    this.totalTime = 0;
    this.parity = p;
    this.final = []
    switch (face) {
      case "Front":
        //console.log(this.cubeTensor[0][0][0]);
        this.toRotate = [this.cubies[this.cubeTensor[0][0][0]],
                         this.cubies[this.cubeTensor[0][0][1]],
                         this.cubies[this.cubeTensor[0][1][0]],
                         this.cubies[this.cubeTensor[0][1][1]]];
        for (var i = 0; i < 4; i++) {
          this.final.push(glMatrix.mat4.clone(this.toRotate[i].world));
          //glMatrix.mat4.rotateX(this.final[i], this.final[i], math.PI / 2);
          glMatrix.mat4.rotateX(this.buffer, this.buffer,this.parity * math.PI / 2);
          glMatrix.mat4.multiply(this.final[i], this.buffer, this.final[i]);
          glMatrix.mat4.identity(this.buffer);
          //console.log(this.final[i]);
        }
        if (this.parity == 1) {
          [this.cubeTensor[0][0][0], this.cubeTensor[0][0][1], this.cubeTensor[0][1][1], this.cubeTensor[0][1][0]] =
          [this.cubeTensor[0][0][1], this.cubeTensor[0][1][1], this.cubeTensor[0][1][0], this.cubeTensor[0][0][0]];
        } else {
          [this.cubeTensor[0][0][0], this.cubeTensor[0][0][1], this.cubeTensor[0][1][1], this.cubeTensor[0][1][0]] =
          [this.cubeTensor[0][1][0], this.cubeTensor[0][0][0], this.cubeTensor[0][0][1], this.cubeTensor[0][1][1]];
        }
        this.rotateAxis = [1, 0, 0];
        break;
      case "Left":
        this.toRotate = [this.cubies[this.cubeTensor[1][1][1]],
                        this.cubies[this.cubeTensor[0][1][1]],
                        this.cubies[this.cubeTensor[1][0][1]],
                        this.cubies[this.cubeTensor[0][0][1]]];
        for (var i = 0; i < 4; i++) {
          this.final.push(glMatrix.mat4.clone(this.toRotate[i].world));
          //glMatrix.mat4.rotateZ(this.final[i], this.final[i], -math.PI / 2);
          glMatrix.mat4.rotateZ(this.buffer, this.buffer,this.parity * -math.PI / 2);
          glMatrix.mat4.multiply(this.final[i], this.buffer, this.final[i]);
          glMatrix.mat4.identity(this.buffer);
        }
        if (this.parity == 1) {
          [this.cubeTensor[1][1][1], this.cubeTensor[0][1][1], this.cubeTensor[0][0][1], this.cubeTensor[1][0][1]] =
          [this.cubeTensor[0][1][1], this.cubeTensor[0][0][1], this.cubeTensor[1][0][1], this.cubeTensor[1][1][1]];
        } else {
          [this.cubeTensor[1][1][1], this.cubeTensor[0][1][1], this.cubeTensor[0][0][1], this.cubeTensor[1][0][1]] =
          [this.cubeTensor[1][0][1], this.cubeTensor[1][1][1], this.cubeTensor[0][1][1], this.cubeTensor[0][0][1]];
        }

        this.rotateAxis = [0, 0, -1];
        break;
      case "Top":
        this.toRotate = [this.cubies[this.cubeTensor[1][1][1]],
                        this.cubies[this.cubeTensor[0][1][1]],
                        this.cubies[this.cubeTensor[0][1][0]],
                        this.cubies[this.cubeTensor[1][1][0]]];
        for (var i = 0; i < 4; i++) {
          this.final.push(glMatrix.mat4.clone(this.toRotate[i].world));
          //glMatrix.mat4.rotateZ(this.final[i], this.final[i], -math.PI / 2);
          glMatrix.mat4.rotateY(this.buffer, this.buffer,this.parity * -math.PI / 2);
          glMatrix.mat4.multiply(this.final[i], this.buffer, this.final[i]);
          glMatrix.mat4.identity(this.buffer);
        }
        if (this.parity == 1) {
          [this.cubeTensor[1][1][1], this.cubeTensor[0][1][1], this.cubeTensor[0][1][0], this.cubeTensor[1][1][0]] =
          [this.cubeTensor[1][1][0], this.cubeTensor[1][1][1], this.cubeTensor[0][1][1], this.cubeTensor[0][1][0]];
        } else {
          [this.cubeTensor[1][1][1], this.cubeTensor[0][1][1], this.cubeTensor[0][1][0], this.cubeTensor[1][1][0]] =
          [this.cubeTensor[0][1][1], this.cubeTensor[0][1][0], this.cubeTensor[1][1][0], this.cubeTensor[1][1][1]];
        }

        this.rotateAxis = [0, -1, 0];
        break;
      case "Back":
        //console.log(this.cubeTensor[0][0][0]);
        this.toRotate = [this.cubies[this.cubeTensor[1][0][0]],
                         this.cubies[this.cubeTensor[1][0][1]],
                         this.cubies[this.cubeTensor[1][1][0]],
                         this.cubies[this.cubeTensor[1][1][1]]];
        for (var i = 0; i < 4; i++) {
          this.final.push(glMatrix.mat4.clone(this.toRotate[i].world));
          //glMatrix.mat4.rotateX(this.final[i], this.final[i], math.PI / 2);
          glMatrix.mat4.rotateX(this.buffer, this.buffer,-1* this.parity * math.PI / 2);
          glMatrix.mat4.multiply(this.final[i], this.buffer, this.final[i]);
          glMatrix.mat4.identity(this.buffer);
          //console.log(this.final[i]);
        }
        if (this.parity == 1) {
          [this.cubeTensor[1][0][0], this.cubeTensor[1][0][1], this.cubeTensor[1][1][1], this.cubeTensor[1][1][0]] =
          [this.cubeTensor[1][1][0], this.cubeTensor[1][0][0], this.cubeTensor[1][0][1], this.cubeTensor[1][1][1]];
        } else {
          [this.cubeTensor[1][0][0], this.cubeTensor[1][0][1], this.cubeTensor[1][1][1], this.cubeTensor[1][1][0]] =
          [this.cubeTensor[1][0][1], this.cubeTensor[1][1][1], this.cubeTensor[1][1][0], this.cubeTensor[1][0][0]];
        }
        this.rotateAxis = [-1, 0, 0];
        break;
      case "Right":
        this.toRotate = [this.cubies[this.cubeTensor[1][1][0]],
                        this.cubies[this.cubeTensor[0][1][0]],
                        this.cubies[this.cubeTensor[1][0][0]],
                        this.cubies[this.cubeTensor[0][0][0]]];
        for (var i = 0; i < 4; i++) {
          this.final.push(glMatrix.mat4.clone(this.toRotate[i].world));
          //glMatrix.mat4.rotateZ(this.final[i], this.final[i], -math.PI / 2);
          glMatrix.mat4.rotateZ(this.buffer, this.buffer,this.parity * math.PI / 2);
          glMatrix.mat4.multiply(this.final[i], this.buffer, this.final[i]);
          glMatrix.mat4.identity(this.buffer);
        }
        if (this.parity == 1) {
          [this.cubeTensor[1][1][0], this.cubeTensor[0][1][0], this.cubeTensor[0][0][0], this.cubeTensor[1][0][0]] =
          [this.cubeTensor[1][0][0], this.cubeTensor[1][1][0], this.cubeTensor[0][1][0], this.cubeTensor[0][0][0]];
        } else {
          [this.cubeTensor[1][1][0], this.cubeTensor[0][1][0], this.cubeTensor[0][0][0], this.cubeTensor[1][0][0]] =
          [this.cubeTensor[0][1][0], this.cubeTensor[0][0][0], this.cubeTensor[1][0][0], this.cubeTensor[1][1][0]];
        }

        this.rotateAxis = [0, 0, 1];
        break;
      case "Bottom":
        this.toRotate = [this.cubies[this.cubeTensor[1][0][1]],
                        this.cubies[this.cubeTensor[0][0][1]],
                        this.cubies[this.cubeTensor[0][0][0]],
                        this.cubies[this.cubeTensor[1][0][0]]];
        for (var i = 0; i < 4; i++) {
          this.final.push(glMatrix.mat4.clone(this.toRotate[i].world));
          //glMatrix.mat4.rotateZ(this.final[i], this.final[i], -math.PI / 2);
          glMatrix.mat4.rotateY(this.buffer, this.buffer,this.parity * math.PI / 2);
          glMatrix.mat4.multiply(this.final[i], this.buffer, this.final[i]);
          glMatrix.mat4.identity(this.buffer);
        }
        if (this.parity == 1) {
          [this.cubeTensor[1][0][1], this.cubeTensor[0][0][1], this.cubeTensor[0][0][0], this.cubeTensor[1][0][0]] =
          [this.cubeTensor[0][0][1], this.cubeTensor[0][0][0], this.cubeTensor[1][0][0], this.cubeTensor[1][0][1]];
        } else {
          [this.cubeTensor[1][0][1], this.cubeTensor[0][0][1], this.cubeTensor[0][0][0], this.cubeTensor[1][0][0]] =
          [this.cubeTensor[1][0][0], this.cubeTensor[1][0][1], this.cubeTensor[0][0][1], this.cubeTensor[0][0][0]];
        }

        this.rotateAxis = [0, 1, 0];
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
      //console.log(this.toRotate[i].world);
      //call function instead
      //glMatrix.mat4.rotate(this.toRotate[i].world, this.toRotate[i].world, (dt / 500) * (math.PI / 2), this.rotateAxis);  //adjust for time
      glMatrix.mat4.rotate(this.buffer, this.buffer, this.parity * (dt / 33000) * (math.PI / 2), this.rotateAxis); //this factor is a little suspicisous...
      //glMatrix.mat4.multiply(this.toRotate[i].world, this.buffer, this.toRotate[i].world);
      glMatrix.mat4.multiply(this.toRotate[i].world, this.buffer, this.toRotate[i].world);
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
