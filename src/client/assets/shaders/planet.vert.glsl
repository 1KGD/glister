varying vec2 vUv;

#define M_PI 3.14159265358979323846

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}
float rand(vec2 co, float l) {
    return rand(vec2(rand(co), l));
}
float rand(vec2 co, float l, float t) {
    return rand(vec2(rand(co, l), t));
}

float perlin(vec2 p, float dim, float time) {
    vec2 pos = floor(p * dim);
    vec2 posx = pos + vec2(1.0, 0.0);
    vec2 posy = pos + vec2(0.0, 1.0);
    vec2 posxy = pos + vec2(1.0);

    float c = rand(pos, dim, time);
    float cx = rand(posx, dim, time);
    float cy = rand(posy, dim, time);
    float cxy = rand(posxy, dim, time);

    vec2 d = fract(p * dim);
    d = -0.5 * cos(d * M_PI) + 0.5;

    float ccx = mix(c, cx, d.x);
    float cycxy = mix(cy, cxy, d.x);
    float center = mix(ccx, cycxy, d.y);

    return center * 2.0 - 1.0;
}

// p must be normalized!
float perlin(vec2 p, float dim) {
    return perlin(p, dim, 0.0);
}

float offset(vec2 p) {
    return perlin(p, 12.) * .01 + .99;
}

void main() {
    vUv = abs(1. - 2. * uv);
    vec3 vPosition = position + normal * offset(vUv);
    vec4 modelPosition = modelMatrix * vec4(vPosition, 1.);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}