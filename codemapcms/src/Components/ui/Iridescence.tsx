"use client";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Add a subtle offset based on the mouse position
  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

interface IridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  className?: string;
}

export default function Iridescence({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);
    ctn.appendChild(gl.canvas);

    let program: Program | null = null;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        const aspect = gl.canvas.width / gl.canvas.height;
        program.uniforms.uResolution.value = new Float32Array([
          gl.canvas.width,
          gl.canvas.height,
          aspect,
        ]);
      }
    }
    window.addEventListener("resize", resize);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Float32Array(color) },
        uResolution: {
          value: new Float32Array([
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ]),
        },
        uMouse: {
          value: new Float32Array([mousePos.current.x, mousePos.current.y]),
        },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      if (program) {
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene: mesh });
      }
    }
    animateId = requestAnimationFrame(update);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
      if (program) {
        program.uniforms.uMouse.value[0] = x;
        program.uniforms.uMouse.value[1] = y;
      }
    }
    if (mouseReact) {
      ctn.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (mouseReact) {
        ctn.removeEventListener("mousemove", handleMouseMove);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, speed, amplitude, mouseReact]);

  return (
    <div
      ref={ctnDom}
      className={`w-full h-full relative ${rest.className ?? ""}`}
    >
      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="bg-gradient-to-b from-black to-purple-700 bg-clip-text text-transparent font-extrabold text-[13vmin] lg:text-[16vmin]">
          ContenZ CMS
        </p>
        <p className="lg:mt-2 bg-gradient-to-b from-black  to-purple-700 bg-clip-text text-transparent font-medium text-sm lg:text-lg">
          (&nbsp;CMS powered by Codemap&nbsp;)
        </p>

        <div className="flex gap-x-5">
          <button className="bg-blue-700 text-white px-3 py-3 lg:px-5 lg:py-3 lg:text-lg mt-8 rounded-lg transition-all duration-300 hover:bg-white hover:text-black">
            Go To Dashboard
          </button>
          <button className="px-3 py-3 lg:px-7 lg:py-3 text-lg mt-8 rounded-lg transition-all duration-300 text-black bg-white hover:text-white hover:bg-blue-700">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
