var VSHADER_SOURCE =
    'attribute vec4 a_Position;' +
    'attribute float a_PointSize;' +
    'void main() {' +
    'gl_Position = a_Position;' +
    'gl_PointSize = a_PointSize;' +
    '}'

var FSHADER_SOURCE =
    'void main(){' +
    'gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
    '}'

function main() {
    var canvas = document.getElementById('webgl')
    var gl = getWebGLContext(canvas)
    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)
    var a_Position = gl.getAttribLocation(gl.program,'a_Position')
    var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize')
    gl.vertexAttrib3f(a_Position,0.5,0.5,0.0)
    gl.vertexAttrib1f(a_PointSize,30)
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS,0,1)
}
