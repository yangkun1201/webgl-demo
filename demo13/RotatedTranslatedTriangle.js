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

function main() {
    var canvas = document.getElementById('webgl')
    var gl = getWebGLContext(canvas)
    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    var n = initVertexBuffers(gl)
    var ANGLE = 60
    var Tx = 0.5
    var modelMatrix = new Matrix4();
    modelMatrix.setTranslate(Tx,0,0)
    modelMatrix.rotate(ANGLE,0,0,1)
    var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix')
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements)
    gl.drawArrays(gl.TRIANGLES,0,n)
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

