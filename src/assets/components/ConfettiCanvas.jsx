import { useEffect, useRef } from "react";

const ConfettiCanvas = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const COLORS = [
      [235, 90, 70],
      [97, 189, 79],
      [242, 214, 0],
      [0, 121, 191],
      [195, 119, 224],
    ];
    const NUM_CONFETTI = 40;
    const PI_2 = 2 * Math.PI;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resizeWindow = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeWindow);

    const range = (a, b) => (b - a) * Math.random() + a;

    const drawCircle = (a, b, c, d) => {
      context.beginPath();
      context.moveTo(a, b);
      context.bezierCurveTo(a - 17, b + 14, a + 13, b + 5, a - 5, b + 22);
      context.lineWidth = 2;
      context.strokeStyle = d;
      context.stroke();
    };

    const drawCircle2 = (a, b, c, d) => {
      context.beginPath();
      context.moveTo(a, b);
      context.lineTo(a + 6, b + 9);
      context.lineTo(a + 12, b);
      context.lineTo(a + 6, b - 9);
      context.closePath();
      context.fillStyle = d;
      context.fill();
    };

    const drawCircle3 = (a, b, c, d) => {
      context.beginPath();
      context.moveTo(a, b);
      context.lineTo(a + 5, b + 5);
      context.lineTo(a + 10, b);
      context.lineTo(a + 5, b - 5);
      context.closePath();
      context.fillStyle = d;
      context.fill();
    };

    let xpos = 0.9;
    document.onmousemove = (e) => {
      xpos = e.pageX / w;
    };

    class Confetti {
      constructor() {
        this.style = COLORS[~~range(0, COLORS.length)];
        this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
        this.r = ~~range(2, 6);
        this.r2 = 2 * this.r;
        this.replace();
      }

      replace() {
        this.opacity = 0;
        this.dop = 0.03 * range(1, 4);
        this.x = range(-this.r2, w - this.r2);
        this.y = range(-20, h - this.r2);
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = range(0, 2) + 8 * xpos - 5;
        this.vy = 0.7 * this.r + range(-1, 1);
      }

      draw() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;
        if (this.opacity > 1) {
          this.opacity = 1;
          this.dop *= -1;
        }
        if (this.opacity < 0 || this.y > this.ymax) {
          this.replace();
        }
        if (this.x < 0 || this.x > this.xmax) {
          this.x = (this.x + this.xmax) % this.xmax;
        }
        drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
        drawCircle3(
          0.5 * ~~this.x,
          ~~this.y,
          this.r,
          `${this.rgb},${this.opacity})`
        );
        drawCircle2(
          1.5 * ~~this.x,
          1.5 * ~~this.y,
          this.r,
          `${this.rgb},${this.opacity})`
        );
      }
    }

    const confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());

    const step = () => {
      requestAnimationFrame(step);
      context.clearRect(0, 0, w, h);
      confetti.forEach((c) => c.draw());
    };

    step();
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Canvas for confetti animation */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      {/* Children passed to component */}
      <div className="relative z-1">{children}</div>
    </div>
  );
};

export default ConfettiCanvas;
