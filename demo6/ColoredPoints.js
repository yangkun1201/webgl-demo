var VSHADER_SOURCE =
    'attribute vec4 a_Position;' +
    'attribute float a_PointSize;' +
    'void main() {' +
    'gl_Position = a_Position;' +
    'gl_PointSize = a_PointSize;' +
    '}'

var FSHADER_SOURCE =
    'precision mediump float;' +
    'uniform vec4 u_FragColor;' +
    'void main(){' +
    'gl_FragColor = u_FragColor;' +
    '}'

function main() {
    var canvas = document.getElementById('webgl')
    var gl = getWebGLContext(canvas)
    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)
    var a_Position = gl.getAttribLocation(gl.program,'a_Position')
    var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize')
    var u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor')
    gl.vertexAttrib1f(a_PointSize,10)
    canvas.onmousedown = function (ev) {
        click(ev,gl,canvas,a_Position,u_FragColor)
    }
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}

var g_points = []
var g_colors= []

function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX
    var y = ev.clientY
    var rect = ev.target.getBoundingClientRect()
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2)
    y = ((canvas.height / 2) - (y - rect.top)) / (canvas.height / 2)
    g_points.push([x,y])

    if(x >= 0.0 && y >= 0.0){
        g_colors.push([1.0,0.0,0.0,1.0])
    }else if( x < 0.0 && y < 0.0){
        g_colors.push([0.0,1.0,0.0,1.0])
    }else{
        g_colors.push([1.0,1.0,1.0,1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT)
    var len = g_points.length
    for(let i=0; i<len; i++){
        let point = g_points[i]
        let rgba = g_colors[i]
        gl.vertexAttrib3f(a_Position,point[0],point[1],0.0)
        gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3])
        gl.drawArrays(gl.POINTS,0,1)
    }
}
