precision highp float;
uniform float u_time;
uniform vec2 u_mouse;
void main() {
  vec3 color = vec3(sin(u_time) * 0.5 + 0.5, u_mouse.x, u_mouse.y);
  gl_FragColor = vec4(color, 1.0);
}