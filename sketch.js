let myShader;
let myTextArea;
let myInterval;

let loadedObject = {
  title: "20250905",
  thema: "20250905",
  desc: "20250905",
  date: "2025-09-05",
  tags: ["test", "templete"],
};

function preload() {
  // ファイル読み込み
  const date = "20250905";
  loadedObject = loadJSON("/shader/" + date + "/meta.json");
  myShader = loadShader(
    "/shader/" + date + "/shader.vert",
    "/shader/" + date + "/shader.frag"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  shader(myShader);

  // コードの表示エリア
  myTextArea = select("#codeArea");
  myTextArea.size(width - 60, height - 60);
  updateCodeViewer(loadedObject.title, loadedObject.thema, myShader._fragSrc);

  // 1分毎の処理
  // myInterval = setInterval(updateShaderByAI, 60000);
  // updateCodeViewer("基本コード", "初期シェーダー", fragCode);
}

function draw() {
  background(220);

  myShader.setUniform("u_time", millis() / 1000.0);
  noStroke();
  shader(myShader);
  quad(-1, -1, -1, 1, 1, 1, 1, -1);
  resetShader();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  myTextArea.size(width - 60, height - 60);
  myShader.setUniform("u_resolution", [width, height]);
}

function updateCodeViewer(thema, title, code) {
  myTextArea.value(
    "// title: " + title + "\n// thema: " + thema + "\n\n" + code
  );
}

// function updateAIStatus(message, isProgressing) {
//   select("#aiStatus").html(message);
// }

// function mouseMoved() {
//   myShader.setUniform("u_mouse", [mouseX / width, mouseY / height]);
// }
