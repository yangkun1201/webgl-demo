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
    gl.vertexAttrib1f(a_PointSize,10)
    canvas.onmousedown = function (ev) {
        click(ev,gl,canvas,a_Position)
    }
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}

var g_points = []

function click(ev, gl, canvas, a_Position) {
    var x = ev.clientX
    var y = ev.clientY
    var rect = ev.target.getBoundingClientRect()
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2)
    y = ((canvas.height / 2) - (y - rect.top)) / (canvas.height / 2)
    g_points.push([x,y])
    gl.clear(gl.COLOR_BUFFER_BIT)
    var len = g_points.length
    for(let i=0; i<len; i++){
        let point = g_points[i]
        gl.vertexAttrib3f(a_Position,point[0],point[1],0.0)
        gl.drawArrays(gl.POINTS,0,1)
    }
}
