precision mediump float;

#include "/node_modules/lygia/generative/random.glsl"
#include "/node_modules/lygia/generative/snoise.glsl"

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
void main() {
    vec2 pixelPos = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);

    vec3 bgColor = vec3(.98, .98, 1.);


    // float centerColPos = u_resolution.x / 2.;
    // float leftSidePos = 4.;
    // float rightSidePos = u_resolution.x - 4.;
    // float leftColPos = (u_resolution.x / 2. - 4.) / 2.;
    // float rightColPos = (u_resolution.x / 2. - 4.) / 2. + u_resolution.x / 2.;

    float GAP_SIZE = 8.;
    float NUM_COLS = 12.;
    float NUM_LINES = 4.;

    float distanceBetweenLines = (NUM_COLS / NUM_LINES) * (
        GAP_SIZE +
        (u_resolution.x - GAP_SIZE * (NUM_COLS + 1.)) / NUM_COLS
    );

    float distanceFromLastLine = mod(pixelPos.x, distanceBetweenLines);
    gl_FragColor = vec4(bgColor, 1.);//vec4(vec3(distanceFromLastLine), 1.);

    if (distanceFromLastLine <= GAP_SIZE) {
        // we are in a gap that needs a line
        
        // how close to the center of the gap are we? between 0 and half the gap size
        float distanceToGapCenterPx = abs(distanceFromLastLine - GAP_SIZE / 2.);

        // 1 means at center, 0 means at edge
        float centerLerp = 1. - distanceToGapCenterPx / (GAP_SIZE / 2.);

        if (centerLerp >= 0.87) {
            gl_FragColor = vec4(0.93, 0.18, 0.18, 1.0);
            return;
        }
    }

    float rand = random(vec3(pixelPos / 3., floor(u_time * 3. / 1000.))) * 0.02 + 0.98;
    gl_FragColor *= vec4(vec3(rand), 1.);
}