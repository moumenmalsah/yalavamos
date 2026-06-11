import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uResolution;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  const float PI = 3.141592653;

  vec2 distortion(vec2 p, float time) {
    float sinVal = sin(p.y * 4.0 * PI + time * 0.5) * 0.05;
    return vec2(p.x + sinVal, p.y);
  }

  void main() {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (1.0), 1.0),
      min((uResolution.y / uResolution.x) / (1.0), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec2 distortedUV = mix(uv, distortion(uv, uTime), uHover * 0.8);
    vec4 tex = texture2D(uTexture, distortedUV);
    float bulge = smoothstep(0.0, 1.0, 1.0 - length(uv - 0.5));
    gl_FragColor = vec4(mix(tex.rgb, tex.rgb * bulge, uHover * 0.4), 1.0);
  }
`;

interface DistortionImageProps {
  imageUrl: string;
}

function DistortionImage({ imageUrl }: DistortionImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const uniforms = {
      uTime: { value: 0.0 },
      uHover: { value: 0.0 },
      uTexture: { value: texture },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const geometry = new THREE.PlaneGeometry(2 * aspect, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      uniforms.uTime.value += 0.01;
      uniforms.uHover.value = THREE.MathUtils.lerp(
        uniforms.uHover.value,
        hovered ? 1.0 : 0.0,
        0.1
      );
      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      const newAspect = w / h;
      camera.left = -newAspect;
      camera.right = newAspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageUrl, hovered]);

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setHovered(true)}
      onMouseUp={() => setHovered(false)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111111',
        minHeight: 300,
      }}
    />
  );
}

export default function PredictionMethodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    gsap.fromTo(
      left,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      right,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="methodology"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#0a0a0a',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 0',
      }}
    >
      <div
        className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* Left Column - Text */}
        <div ref={leftRef}>
          <p
            className="uppercase"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '0.8px',
              color: '#26ff6a',
            }}
          >
            HOW WE PREDICT
          </p>
          <h2
            className="uppercase mt-3"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-1px',
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            THE SCIENCE OF FORECASTING
          </h2>
          <p
            className="mt-5"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: 520,
            }}
          >
            Machine learning models trained on 20 years of international football data — now
            laser-focused on <strong>World Cup 2026</strong> across 16 host cities in the USA, Canada, and
            Mexico. We factor in everything — head-to-head history, home advantage, travel fatigue,
            tactical styles, even the weather. Every prediction comes with a confidence score so you
            know exactly where we stand.
          </p>

          {/* Stats */}
          <div className="flex gap-10 mt-10">
            {[
              { value: '98.2%', label: 'Model Accuracy' },
              { value: '10K+', label: 'Data Points' },
              { value: '64', label: 'Matches' },
            ].map((stat, i) => (
              <div key={i}>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 32,
                    fontWeight: 500,
                    color: '#26ff6a',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-1"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    color: 'rgba(255, 255, 255, 0.35)',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-10 group"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 14,
              color: '#26ff6a',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Explore Our Method
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Right Column - WebGL Distortion */}
        <div ref={rightRef} style={{ aspectRatio: '4/3' }}>
          <DistortionImage imageUrl="/images/prediction-method.jpg" />
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          #methodology > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
