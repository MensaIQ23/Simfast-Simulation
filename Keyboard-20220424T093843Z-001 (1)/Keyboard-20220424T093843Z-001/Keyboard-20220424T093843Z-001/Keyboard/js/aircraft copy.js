
window.onload = () => {
    let map = document.querySelector('#map')
    let start = document.querySelector('.start')
    let stop = document.querySelector('.stop')
    let pause = document.querySelector('.pause')
    let resume = document.querySelector('.resume')
    let windowWidth = map.offsetWidth
    let windowHeight = map.offsetHeight
    let rid = null
    function random(x, y) {
        return Math.round(Math.random() * (y - x) + x)
    }
    class Aircraft {
        constructor(imgElement) {
            this.img = './img/aircraft.png'
            this.height = 16
            this.width = 16
            this.left = true
            this.x = random(this.width, windowWidth - this.width)
            this.isUp = Boolean(random(0, 1)) // true上 false下
            // this.x = 500
            // this.isUp = true
            this.y = this.isUp ? 0 : windowHeight - this.height
            this.isLeft = (this.x >= windowWidth / 2) ? false : true // true左 false右
            this.angle = random(0, 40)
            this.rotate = this.isUp ? (this.isLeft ? -this.angle : this.angle) : (this.isLeft ? (180 + this.angle) : (180 - this.angle))
            this.imgElement = imgElement
            this.speed = 1
        }
        init() {
            if (this.left) {
                
            }
        }

        show() {
            this.imgElement.src = this.img
            this.imgElement.style.position = 'absolute'
            this.imgElement.style.width = this.width + 'px'
            this.imgElement.style.height = this.height + 'px'
            this.imgElement.style.transform = `rotate(${ this.rotate }deg)`
            this.imgElement.style.top = this.y + 'px'
            this.imgElement.style.left = this.x + 'px'
        }

        move() {
            if (this.isUp) {
                if (this.isLeft) {
                    if (this.x >= windowWidth) {
                        this.imgElement.style.display = 'none'
                        return false
                    }
                    // 设直角三角形中C=90°,
                    // 1、若已知A及对边a,则：
                    // c=a/sinA,b=a/tanA；
                    // 2、若已知A及临边b,则：
                    // c=b/cosA,a=b*tanA.
                    let a = windowHeight
                    let b = a / Math.tan(Math.sin((90 - this.angle) * Math.PI / 180))
                    // let b = windowWidth - this.x
                    // let a = b * Math.tan(Math.sin((90 - this.angle) * Math.PI / 180))
                    let k = (this.y + a - this.y) / (this.x - this.x + b)
                    //公式y=kx+b 求B：b = y-kx
                    let B = this.y - k * this.x
                    this.y += this.speed
                    this.x = (this.y - B) / k
                    // this.x += this.speed
                    // this.y = k * this.x + B
                    this.imgElement.style.left = this.x + 'px'
                    this.imgElement.style.top = this.y + 'px'
                } else {
                    if (this.x <= -this.width) {
                        this.imgElement.style.display = 'none'
                        return false
                    }
                    let a = this.x
                    let b = a / Math.tan(Math.sin((this.angle) * Math.PI / 180))
                    //k=(y2-y1)/(x1-x2)对应求斜率
                    let k = (this.y + b - this.y) / (this.x - this.x - a)
                    //公式y=kx+b 求B：b = y-kx
                    let B = this.y - k * this.x
                    this.y += this.speed
                    this.x = (this.y - B) / k
                    // this.x -= this.speed
                    // this.y = k * this.x + B
                    this.imgElement.style.left = this.x + 'px'
                    this.imgElement.style.top = this.y + 'px'
                }
            } else {
                if (this.isLeft) {
                    if (this.x >= windowWidth) {
                        this.imgElement.style.display = 'none'
                        return false
                    }
                    // 设直角三角形中C=90°,
                    // 1、若已知A及对边a,则：
                    // c=a/sinA,b=a/tanA；
                    // 2、若已知A及临边b,则：
                    // c=b/cosA,a=b*tanA.
                    let b = this.y
                    let a = b * Math.tan(Math.sin((180 - this.angle) * Math.PI / 180))
                    //k=(y2-y1)/(x1-x2)对应求斜率
                    let k = (this.y - b - this.y) / (this.x - this.x + a)
                    //公式y=kx+b 求B：b = y-kx
                    let B = this.y - k * this.x
                    this.y -= this.speed
                    this.x = (this.y - B) / k
                    // this.x += this.speed
                    // this.y = k * this.x + B
                    this.imgElement.style.left = this.x + 'px'
                    this.imgElement.style.top = this.y + 'px'
                } else {
                    if (this.x <= -this.width) {
                        this.imgElement.style.display = 'none'
                        return false
                    }
                    // 设直角三角形中C=90°,
                    // 1、若已知A及对边a,则：
                    // c=a/sinA,b=a/tanA；
                    // 2、若已知A及临边b,则：
                    // c=b/cosA,a=b*tanA.
                    let a = this.x
                    let b = a / Math.tan(Math.sin((180 - this.angle) * Math.PI / 180))
                    //k=(y2-y1)/(x1-x2)对应求斜率
                    let k = (this.y - b - this.y) / (this.x - this.x - a)
                    //公式y=kx+b 求B：b = y-kx
                    let B = this.y - k * this.x
                    this.y -= this.speed
                    this.x = (this.y - B) / k
                    // this.x -= this.speed
                    // this.y = k * this.x + B
                    this.imgElement.style.left = this.x + 'px'
                    this.imgElement.style.top = this.y + 'px'
                }
            }
            
        }
    }
    let aircraftList = []
    let aircraftLength = 10
    start.addEventListener('click', startClick, false)
    stop.addEventListener('click', stopClick, false)
    pause.addEventListener('click', pauseClick, false)
    resume.addEventListener('click', resumeClick, false)
    function startClick() {
        if (aircraftList.length >= aircraftLength || rid == 'cancel') return false
        let imgElement = document.createElement('img')
        map.appendChild(imgElement)
        let aircraft = new Aircraft(imgElement)
        aircraftList.push(aircraft)
    }
    function stopClick() {
        map.innerHTML = ''
        aircraftList = []
    }
    function pauseClick() {
        window.cancelAnimationFrame(rid)
        rid = 'cancel'
    }
    function resumeClick() {
        if (rid == 'cancel') {
            draw()
        }
    }
    function draw() {
        aircraftList.forEach(item => {
            item.show()
            item.move()
        })
        rid = window.requestAnimationFrame(draw)
    }
    draw()
}