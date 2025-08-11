import frag from "./assets/background.glsl";

(() => {
    const canvas = document.querySelector('canvas#shader')! as HTMLCanvasElement;
    const gl = canvas?.getContext('webgl')!;

    if (!canvas || !gl) {
        return;
    }

    // Resize canvas to fill window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const vertSrc = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0, 1);
}
`;

    function createShader(type: number, src: string): WebGLShader {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            throw gl.getShaderInfoLog(shader);
        return shader;
    }

    const vertShader = createShader(gl.VERTEX_SHADER, vertSrc);
    const fragShader = createShader(gl.FRAGMENT_SHADER, frag);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw gl.getProgramInfoLog(program);

    gl.useProgram(program);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ]),
        gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    window.addEventListener("mousemove", ({ clientX, clientY }) => {
        mousePos[0] = clientX;
        mousePos[1] = clientY;
    })
    const mousePos = [-100, -100];

    function render(time: number) {
        gl.uniform1f(timeLoc, time);
        gl.uniform2f(resLoc, canvas.width, canvas.height);
        gl.uniform2f(mouseLoc, mousePos[0], mousePos[1]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
})();