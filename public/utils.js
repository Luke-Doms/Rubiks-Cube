
async function LoadJSONResource(url) {
  const response = await fetch(url);
  const data = await response.json();
  const vertices = data.twoByTwoByTwoCubie;
  return vertices;
}

async function LoadShaderText(urlVertexShader, urlFragmentShader) {
  const vsResponse = await fetch(urlVertexShader);
  const vsText = await vsResponse.text();
  const fsResponse = await fetch(urlFragmentShader);
  const fsText = await fsResponse.text();
  return {"vertexShaderText": vsText, "fragmentShaderText": fsText};
}

function getClipCoord(gl, e) {
  const rect = gl.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const clipX = x/rect.width * 2 - 1;
  const clipY = y/rect.height * -2 + 1;

  return glMatrix.vec4.fromValues(clipX, clipY, -1, 1);  //syntax correct???
}

//change name to convertFromHomogeneous
function convert(v) {
  const out = glMatrix.vec3.fromValues(
    v[0]/v[3],
    v[1]/v[3],
    v[2]/v[3]
  );
  return out;
}
