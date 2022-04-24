
window.onload = () => {
    let map = document.querySelector('#map')
    let start = document.querySelector('.start')
    let stop = document.querySelector('.stop')
    let pause = document.querySelector('.pause')
    let resume = document.querySelector('.resume')
	let onex = document.querySelector('.onex')
	let fivex = document.querySelector('.fivex')
    let windowWidth = map.offsetWidth
    let windowHeight = map.offsetHeight
    let rid = null
    function random(x, y) {
        return Math.round(Math.random() * (y - x) + x)
    }
	
	//Create an array with all fifteen callsigns included
	var callsigns = ["N759CD", "A475PG", "O3847LR", "TWD23PS", "T293R", "EYU293W", "TQ2123N", "AH9238L", "A923H", "TH284N", "WO0238R", "W923T", "Q2398Y", "QP293H", "UX203G"]
	position = 0
	
    class Aircraft {
        constructor(imgElement) {
            this.img = './img/aircraft.png'
            this.height = 16
            this.width = 16
            this.left = Boolean(random(0, 1))
            this.isUp = Boolean(random(0, 1)) // true false
            this.isLeft = Boolean(random(0, 1)) // true false
            this.x = 0
            this.y = 0
            this.angle = random(0, 40)
            this.rotate = this.isUp ? (this.isLeft ? -this.angle : this.angle) : (this.isLeft ? (180 + this.angle) : (180 - this.angle))
            this.imgElement = imgElement
            this.speed = 1
        }
        init() {
            if (this.left) {
                if (this.isLeft) {
                    this.x = 0
                } else {
                    this.x = windowWidth - this.width
                }
                if (this.isUp) {
                    this.y = random(this.height, windowHeight / 2 - this.height)
                } else {
                    this.y = random(windowHeight / 2 - this.height, windowHeight - this.height)
                }
                
            } else {
                if (this.isLeft) {
                    this.x = random(this.width, windowWidth / 2 - this.width)
                } else {
                    this.x = random(windowWidth / 2 - this.width, windowWidth - this.width)
                }
                if (this.isUp) {
                    this.y = 0
                } else {
                    this.y = windowHeight - this.height
                }
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
                    };

                    // c=a/sinA,b=a/tanA；：
                    // c=b/cosA,a=b*tanA.
                    let a = windowHeight
                    let b = a / Math.tan(Math.sin((90 - this.angle) * Math.PI / 180))
                    // let b = windowWidth - this.x
                    // let a = b * Math.tan(Math.sin((90 - this.angle) * Math.PI / 180))
                    let k = (this.y + a - this.y) / (this.x - this.x + b)
                    //y=kx+b B：b = y-kx
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
                    //k=(y2-y1)/(x1-x2)
                    let k = (this.y + b - this.y) / (this.x - this.x - a)
                    //y=kx+b B：b = y-kx
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
                    // C=90°,
                    // 1：
                    // c=a/sinA,b=a/tanA；
                    // c=b/cosA,a=b*tanA.
                    let b = this.y
                    let a = b * Math.tan(Math.sin((180 - this.angle) * Math.PI / 180))
                    //k=(y2-y1)/(x1-x2)
                    let k = (this.y - b - this.y) / (this.x - this.x + a)
                    //y=kx+b B：b = y-kx
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
                    };

                    // 1、
                    // c=a/sinA,b=a/tanA；：
                    // c=b/cosA,a=b*tanA.
                    let a = this.x
                    let b = a / Math.tan(Math.sin((180 - this.angle) * Math.PI / 180))
                    //k=(y2-y1)/(x1-x2)
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
	
	//Set array lenth to 15, since there are 15 callsigns
    let aircraftList = []
    let aircraftLength = 15
    start.addEventListener('click', startClick, false)
    stop.addEventListener('click', stopClick, false)
    pause.addEventListener('click', pauseClick, false)
    resume.addEventListener('click', resumeClick, false)
	
	//These event listeners correspond to the 1x and 5x buttons
	onex.addEventListener('click', onexClick, false)
	fivex.addEventListener('click', fivexClick, false)
	
    function startClick() {
        if (aircraftList.length >= aircraftLength || rid == 'cancel') return false
        let imgElement = document.createElement('img')
        map.appendChild(imgElement)
        let aircraft = new Aircraft(imgElement)
        aircraft.init()
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
	
	//Similar to draw(), but sets the item speed to 1
	function onexClick() {
		 aircraftList.forEach(item => {
            item.show()
			item.speed = 1
            item.move()
        })
        rid = window.requestAnimationFrame(draw)
	}
	
	//Similar to draw(), but sets the item speed to 5
	function fivexClick() {
		 aircraftList.forEach(item => {
            item.show()
			item.speed = 5
            item.move()
        })
        rid = window.requestAnimationFrame(draw)
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