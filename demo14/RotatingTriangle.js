var VSHADER_SOURCE =
    'attribute vec4 a_Position;' +
    'uniform mat4 u_ModelMatrix;' +
    'void main() {' +
    'gl_Position = u_ModelMatrix * a_Position;' +
    '}'

var FSHADER_SOURCE =
    'void main(){' +
    'gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
    '}'

var ANGLE_STEP = 45

function main() {
    var canvas = document.getElementById('webgl')
    var gl = getWebGLContext(canvas)
    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    var n = initVertexBuffers(gl)
    var modelMatrix = new Matrix4();
    var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix')
    var currentAngle = 0.0
    var tick = function(){
        currentAngle = animate(currentAngle)
        draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix)
        requestAnimationFrame(tick)
    }
    tick()
}

function draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix) {
    modelMatrix.setRotate(currentAngle,0,0,1)
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES,0,n)
}

var g_last = Date.now()
function animate(angle) {
    var now = Date.now()
    var elapsed = now - g_last
    g_last = now
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0
    return newAngle
}

function initVertexBuffers(gl) {
    // 指定点坐标
    var vertices = new Float32Array([0.0,0.3,-0.3,-0.3,0.3,-0.3])
    // 指定点个数
    var n = 3
    // 创建buffer
    var vertexbuffer = gl.createBuffer()
    // 绑定buffer
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexbuffer)
    // 向buffer传递数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW)
    // 获取顶点着色器变量地址
    var a_Position = gl.getAttribLocation(gl.program,'a_Position')
    // 关联buffer与着色器变量
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0)
    gl.enableVertexAttribArray(a_Position)
    return n
}

