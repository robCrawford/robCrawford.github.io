export function createStarBackground() {
  const existingCanvas = document.querySelector('canvas[data-star-background]');
  if (existingCanvas) {
    return;
  }

  const W = window;
  const d = document;
  const M = Math;
  const p = 200;
  const z = "068acdef".split("");
  const sp = -1;
  let a = [], b = [], c = [];
  let cvs = d.createElement("canvas");
  cvs.setAttribute('data-star-background', 'true');
  let ctx = cvs.getContext("2d");
  d.body.appendChild(cvs);
  Object.assign(cvs.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1"
  });

  const resize = () => {
    cvs.width = W.innerWidth;
    cvs.height = W.innerHeight;
  };
  W.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < p; i++) {
    a[i] = M.round(M.random() * (cvs.width >> 1)) - (cvs.width >> 2);
    b[i] = M.round(M.random() * (cvs.height >> 1)) - (cvs.height >> 2);
    c[i] = M.round(255 * M.random()) + 1;
  }

  const draw = () => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    for (let i = 0; i < p; i++) {
      c[i] = (c[i] - sp + 255) % 255 || -sp;
      let fx = 255 * a[i] / c[i] + (cvs.width >> 1), fy = 255 * b[i] / c[i] + (cvs.height >> 1);
      if (fx > -50 && fx < cvs.width + 50 && fy > -50 && fy < cvs.height + 50) {
        let m = (255 - c[i]) >> 5;
        ctx.fillStyle = `#${z[m]}${z[m]}${z[m]}`;
        ctx.fillRect(fx, fy, 2, 2);
      }
    }

    W.requestAnimationFrame(draw);
  };
  draw();
}

export function removeStarBackground() {
  const canvas = document.querySelector('canvas[data-star-background]');
  if (canvas) {
    canvas.remove();
  }
}

