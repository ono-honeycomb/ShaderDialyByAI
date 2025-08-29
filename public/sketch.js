let myShader;
let vertCode;
let fragCode;
let myTextArea;
let myInterval;

function preload() {
  // 頂点シェーダーは変更しないので事前に読み込む
  vertCode = `
    precision highp float;
    // p5.jsのデフォルトの頂点位置属性
    attribute vec3 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 1.0);
    }
  `;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // 初期シェーダーを設定
  fragCode = `
precision highp float;
uniform float u_time;
uniform vec2 u_mouse; // マウス位置 0~1
void main() {
  vec3 color = vec3(sin(u_time) * 0.5 + 0.5, u_mouse.x, u_mouse.y);
  gl_FragColor = vec4(color, 1.0);
}
  `;
  myShader = createShader(vertCode, fragCode);
  shader(myShader); // なぜかshader()を実行しないとコンパイルされない

  // コードの表示エリア
  myTextArea = select("#codeArea");
  myTextArea.size(width - 60, height - 60);

  // 1分毎の処理
  // myInterval = setInterval(updateShaderByAI, 60000);
  updateCodeViewer("基本コード", "初期シェーダー", fragCode);
}

function draw() {
  background(220);

  myShader.setUniform("u_time", millis() / 1000.0);
  noStroke();
  shader(myShader);
  quad(-1, -1, -1, 1, 1, 1, 1, -1);
  resetShader();
}

function mouseClicked() {
  updateShaderByAI(); // デバッグ
}

async function updateShaderByAI() {
  // updateAIStatus("AI is generating shader...");
  updateAIStatus("AI思考中...", true);
  // aiから生成
  const shaderData = await generateFrag(fragCode);
  // print(shaderData.title);
  // print(shaderData.fragCode);
  const thema = shaderData.thema;
  const title = shaderData.title;
  const compilingFragCode = shaderData.fragCode;

  const compilingShader = createShader(vertCode, compilingFragCode);
  shader(compilingShader); // shaderを実行しないとコンパイルされない

  // コンパイルエラーのチェック
  const firstCompileRes = checkShaderCompile(compilingShader);
  if (firstCompileRes.error) {
    // 一回だけ修正のチャンスを与える
    console.log("シェーダーコンパイルエラー コードの修正開始");
    // updateAIStatus("AI is correcting shader...");
    updateAIStatus(
      "AI作成コードのコンパイルエラー　もう一度AIが修正中...",
      true
    );
    const correctionData = await correctionCode(
      compilingFragCode,
      firstCompileRes.message
    );
    const correctionShader = createShader(vertCode, correctionData.fragCode);
    shader(correctionShader); // shaderを実行しないとコンパイルされない
    if (checkShaderCompile(correctionShader).error) {
      console.log("修正後のシェーダーもコンパイルエラー");
      console.log(correctionData.fragCode);
      updateAIStatus("AIの修正コードもコンパイルエラー", false);
    } else {
      console.log("修正後のシェーダーはコンパイル成功");
      updateShader(correctionShader, correctionData.fragCode);
      updateCodeViewer(thema, title, correctionData.fragCode);
      updateAIStatus("", false);
    }
  } else {
    updateShader(compilingShader, compilingFragCode);
    updateCodeViewer(thema, title, compilingFragCode);
    updateAIStatus("", false);
  }
}

function updateShader(shader, code) {
  myShader = shader;
  fragCode = code;
}

function updateCodeViewer(thema, title, code) {
  myTextArea.value(
    "// thema: " + thema + "\n// title: " + title + "\n\n" + code
  );
}

function updateAIStatus(message, isProgressing) {
  select("#aiStatus").html(message);
}

function checkShaderCompile(shader) {
  const gl = shader._renderer.GL;
  const frag_compile_status = gl.getShaderParameter(
    shader._fragShader,
    gl.COMPILE_STATUS
  );
  if (frag_compile_status == false) {
    const errorMessage = gl.getShaderInfoLog(shader._fragShader);
    print("shaderコンパイルエラー: " + errorMessage);
    return { error: true, message: errorMessage };
  } else {
    return { success: true };
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
  myShader.setUniform("u_mouse", [mouseX / width, mouseY / height]);
}
