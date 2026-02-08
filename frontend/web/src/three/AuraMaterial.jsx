import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const AuraMaterial = shaderMaterial(
  {
    uTime: 0,
  },

  // vertex
  `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,

  // fragment
  `
  uniform float uTime;
  varying vec2 vUv;

  float circle(vec2 uv, vec2 p, float r){
    return smoothstep(r, r - 0.02, distance(uv, p));
  }

  void main() {
    vec2 uv = vUv;

    vec2 center = vec2(0.5);

    float pulse = sin(uTime * 0.7) * 0.05;

    float glow =
      circle(uv, center, 0.25 + pulse) +
      circle(uv, center, 0.45 + pulse*0.6) * 0.6 +
      circle(uv, center, 0.75 + pulse*0.4) * 0.3;

    vec3 colorA = vec3(0.55, 0.25, 0.8);   // violet
    vec3 colorB = vec3(0.2, 0.9, 0.75);    // turquoise

    vec3 col = mix(colorA, colorB, uv.y);

    gl_FragColor = vec4(col * glow * 0.9, glow * 0.35);
  }
  `
);

extend({ AuraMaterial });

export default AuraMaterial;
