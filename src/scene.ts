const VERT = `#version 300 es
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMobile;

in vec2 vUv;
out vec4 fragColor;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.11, 0.17, 0.13));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float sdOctahedron(vec3 p, float s) {
  p = abs(p);
  return (p.x + p.y + p.z - s) * 0.57735027;
}

float sdBoxFrame(vec3 p, vec3 b, float e) {
  p = abs(p) - b;
  vec3 q = abs(p + e) - e;
  return min(
    min(
      length(max(vec3(p.x, q.y, q.z), 0.0)) + min(max(p.x, max(q.y, q.z)), 0.0),
      length(max(vec3(q.x, p.y, q.z), 0.0)) + min(max(q.x, max(p.y, q.z)), 0.0)
    ),
    length(max(vec3(q.x, q.y, p.z), 0.0)) + min(max(q.x, max(q.y, p.z)), 0.0)
  );
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float map(vec3 p) {
  float t = uTime;

  vec3 q = p;
  q.xz *= rot(t * 0.22);
  q.yz *= rot(t * 0.14);

  float crystal = sdOctahedron(q, 0.56);
  float cage = sdBoxFrame(q, vec3(0.78), 0.024);

  float s = 0.56;
  float nodes = length(q - vec3(s, 0.0, 0.0));
  nodes = min(nodes, length(q + vec3(s, 0.0, 0.0)));
  nodes = min(nodes, length(q - vec3(0.0, s, 0.0)));
  nodes = min(nodes, length(q + vec3(0.0, s, 0.0)));
  nodes = min(nodes, length(q - vec3(0.0, 0.0, s)));
  nodes = min(nodes, length(q + vec3(0.0, 0.0, s)));
  nodes -= 0.05;

  vec3 g1 = p;
  g1.xy *= rot(t * 0.58);
  float ring1 = sdTorus(g1, vec2(1.22, 0.016));

  vec3 g2 = p;
  g2.yz *= rot(t * 0.41 + 1.05);
  float ring2 = sdTorus(g2.xzy, vec2(1.42, 0.013));

  vec3 g3 = p;
  g3.xz *= rot(-t * 0.33);
  float ring3 = sdTorus(g3.yxz, vec2(1.62, 0.01));

  float d = min(crystal, cage);
  d = min(d, nodes);
  d = min(d, ring1);
  d = min(d, ring2);
  d = min(d, ring3);
  return d;
}

vec3 calcNormal(vec3 p) {
  float e = 0.0016;
  vec2 h = vec2(e, 0.0);
  return normalize(vec3(
    map(p + h.xyy) - map(p - h.xyy),
    map(p + h.yxy) - map(p - h.yxy),
    map(p + h.yyx) - map(p - h.yyx)
  ));
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 4; i++) {
    float h = 0.02 + 0.11 * float(i);
    float d = map(p + n * h);
    occ += (h - d) * sca;
    sca *= 0.72;
  }
  return clamp(1.0 - occ * 1.35, 0.0, 1.0);
}

vec3 env(vec3 rd) {
  float sky = rd.y * 0.5 + 0.5;
  vec3 col = mix(vec3(0.012, 0.014, 0.018), vec3(0.1, 0.16, 0.22), pow(sky, 1.35));
  col += vec3(0.4, 0.95, 1.0) * pow(max(dot(rd, normalize(vec3(0.5, 0.75, 0.25))), 0.0), 26.0);
  col += vec3(1.0, 0.72, 0.4) * pow(max(dot(rd, normalize(vec3(-0.65, 0.2, 0.45))), 0.0), 40.0);
  col += vec3(0.45, 0.35, 1.0) * pow(max(dot(rd, normalize(vec3(0.05, -0.15, 0.95))), 0.0), 18.0) * 0.4;
  return col;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag - 0.5 * uResolution) / uResolution.y;
  vec2 m = uMouse;

  vec3 ta = vec3(mix(0.92, 0.0, uMobile), 0.02, 0.0);
  vec3 ro = vec3(ta.x - 0.12 + m.x * 0.38, 0.14 + m.y * 0.26, 3.7);

  vec3 ww = normalize(ta - ro);
  vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
  vec3 vv = cross(uu, ww);
  vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.9 * ww);

  float t = 0.0;
  float hit = 0.0;
  vec3 p = ro;
  int maxSteps = uMobile > 0.5 ? 40 : 72;
  float far = 14.0;

  for (int i = 0; i < 72; i++) {
    if (i >= maxSteps) break;
    p = ro + rd * t;
    float d = map(p);
    if (d < 0.001) {
      hit = 1.0;
      break;
    }
    if (t > far) break;
    t += d * 0.8;
  }

  vec3 col = env(rd) * 0.18;

  if (hit > 0.5) {
    vec3 n = calcNormal(p);
    vec3 l1 = normalize(vec3(0.55, 0.82, 0.32));
    vec3 l2 = normalize(vec3(-0.72, 0.12, 0.38));
    vec3 h = normalize(l1 - rd);
    float diff = max(dot(n, l1), 0.0);
    float spec = pow(max(dot(n, h), 0.0), 96.0);
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.4);
    float ao = calcAO(p, n);
    vec3 ref = reflect(rd, n);
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 2.4);
    vec3 irid = 0.5 + 0.5 * cos(vec3(0.0, 0.33, 0.67) * 6.2831 + n.y * 2.2);
    vec3 albedo = mix(vec3(0.08, 0.09, 0.11), irid * vec3(0.35, 0.85, 1.0), 0.12);
    vec3 lit = albedo * (0.08 + diff * 0.9) * ao;
    lit += env(ref) * mix(0.2, 0.96, fres);
    lit += vec3(0.75, 0.97, 1.0) * spec * 1.7;
    lit += vec3(0.25, 0.9, 1.0) * rim * 0.95;
    lit += albedo * max(dot(n, l2), 0.0) * 0.16;
    col = lit;
  }

  float fog = 1.0 - exp(-t * t * 0.01);
  col = mix(col, vec3(0.02, 0.022, 0.028), fog * (1.0 - hit * 0.4));

  float vig = 1.0 - 0.32 * dot(uv, uv);
  col *= vig;
  col += (hash(vec3(frag, uTime * 8.0)) - 0.5) * 0.025;
  col = pow(max(col, 0.0), vec3(0.92));
  fragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("[lab-scene]", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext): WebGLProgram | null {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("[lab-scene]", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function mountLabScene(canvas: HTMLCanvasElement): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  const hero = document.querySelector<HTMLElement>("#hero");

  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });

  const fallback = document.querySelector<HTMLElement>("[data-lab-fallback]");

  if (!gl) {
    canvas.hidden = true;
    return () => undefined;
  }

  const program = createProgram(gl);
  if (!program) {
    canvas.hidden = true;
    return () => undefined;
  }

  fallback?.setAttribute("hidden", "");

  const vao = gl.createVertexArray();
  const buf = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const locRes = gl.getUniformLocation(program, "uResolution");
  const locTime = gl.getUniformLocation(program, "uTime");
  const locMouse = gl.getUniformLocation(program, "uMouse");
  const locMobile = gl.getUniformLocation(program, "uMobile");

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent): void => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -((e.clientY / window.innerHeight) * 2 - 1);
    mouse.tx = nx;
    mouse.ty = ny;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const dprCap = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
  let raf = 0;
  let start = performance.now();
  let last = start;
  let pageVisible = document.visibilityState === "visible";

  const fadeLayer = (opacity: number): void => {
    canvas.style.opacity = String(opacity);
    if (fallback && !fallback.hasAttribute("hidden")) {
      fallback.style.opacity = String(opacity);
    }
  };

  const updateFade = (): void => {
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const gone = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
    fadeLayer(1 - gone * 0.62);
  };

  const resize = (): void => {
    const w = Math.max(1, Math.floor(window.innerWidth * dprCap));
    const h = Math.max(1, Math.floor(window.innerHeight * dprCap));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  const draw = (now: number): void => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 4));
    mouse.y += (mouse.ty - mouse.y) * (1 - Math.exp(-dt * 4));
    updateFade();
    resize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.uniform2f(locRes, canvas.width, canvas.height);
    gl.uniform1f(locTime, reduced ? 1.4 : (now - start) / 1000);
    gl.uniform2f(locMouse, mouse.x, mouse.y);
    gl.uniform1f(locMobile, mobile ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const loop = (now: number): void => {
    if (!pageVisible) return;
    draw(now);
    if (!reduced) raf = requestAnimationFrame(loop);
  };

  const startLoop = (): void => {
    if (reduced || !pageVisible) return;
    cancelAnimationFrame(raf);
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };

  const onVis = (): void => {
    pageVisible = document.visibilityState === "visible";
    if (pageVisible) startLoop();
    else cancelAnimationFrame(raf);
  };
  document.addEventListener("visibilitychange", onVis);

  window.addEventListener("scroll", updateFade, { passive: true });

  resize();
  draw(performance.now());
  startLoop();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("scroll", updateFade);
    document.removeEventListener("visibilitychange", onVis);
    gl.deleteBuffer(buf);
    gl.deleteVertexArray(vao);
    gl.deleteProgram(program);
  };
}
