function main() {
    // 获取绘图dom元素
    var canvas = document.getElementById('example')
    // 获取绘图上下文
    var ctx = canvas.getContext('2d')
    // 设置颜色
    ctx.fillStyle = 'rgba(0,255,255,0.8)'
    // 绘制矩形，坐标系原点为左上角，前两个参数为矩形左上角左边，后两个参数为矩形的宽和高
    ctx.fillRect(30,30,50,50)
}
