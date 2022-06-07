const canvas=document.querySelector("canvas")
canvas.height=window.innerHeight*0.98
canvas.width=window.innerWidth*0.99

const canvas_context=canvas.getContext('2d')
canvas_context.fillStyle="green"
canvas_context.fillRect(0,0,canvas.width, canvas.height)


function calc_dist(user1,bike1){
    return Math.sqrt(Math.pow(user1.position.x-bike1.position.x,2)+Math.pow(user1.position.y-bike1.position.y,2))
}



class User{
    constructor(position, size, color) {
        this.position=position
        this.size=size
        this.color=color
    }

    draw() {
        canvas_context.fillStyle=this.color
        canvas_context.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
        canvas_context.fillStyle='white'
        canvas_context.fillText("User", this.position.x+15, this.position.y+75)
    }
}


class Bike{
    constructor(position, size, color) {
        this.position=position
        this.size=size
        this.color=color
        this.is_locked=false
        this.auto_lock=false
        this.theft_alert=false
        this.las=false

        this.las_button= new Button({x:this.position.x, y:this.position.y+50}, {w: 200, h: 30}, 'gray', 'Location Assistant System')

        this.theft_alert_button= new Button({x:this.position.x, y:this.position.y+100}, {w: 200, h: 30}, 'gray', 'THEFT ALERT')
    }

    draw() {
        canvas_context.fillStyle=this.color
        canvas_context.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
        canvas_context.fillStyle='black'
        canvas_context.fillText("Bike", this.position.x+15, this.position.y+75)
    }

    lock_bike(){
        this.is_locked=!this.is_locked
    }

    en_auto_lock(){
        this.auto_lock=!this.auto_lock
    }

    en_theft_alert(){
        this.theft_alert=!this.theft_alert
    }

    en_las(){
        this.las=!this.las
    }

    operate(dist){
        if (this.auto_lock && dist>500){
            this.is_locked=true
        }

        if (this.theft_alert && (is_moving || is_stolen)){
            is_stolen=true
            this.theft_alert_button.position={x:this.position.x, y:this.position.y-75}
            this.is_locked=true
            this.theft_alert_button.draw()
        }

        if (this.las && dist<1000){
            this.las_button.position={x:this.position.x, y:this.position.y-25}
            this.las_button.text=`LAS-Distance: ${dist}`
            this.las_button.draw()
            if (dist<100){
                this.las=false
            }

        }

    }

}
class Button{
    constructor(position, size, color, text='') {
        this.position=position
        this.size=size
        this.color=color
        this.text=text
    }

    draw() {
        canvas_context.fillStyle=this.color
        canvas_context.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
        canvas_context.fillStyle='black'
        canvas_context.fillText(this.text,this.position.x+20, this.position.y+20)
    }
}

class Interface{
    constructor(position, size, bike1){
        this.position=position
        this.size=size
        this.bike=bike1
        this.bike_lock= new Button({x: this.position.x+20, y:this.position.y+20}, {w: 110, h:30}, "gray", `Locked: ${this.bike.is_locked}`)
        this.bike_en_auto_lock= new Button({x: this.position.x+20, y:this.position.y+60}, {w: 110, h:30}, "gray", `Auto Lock: ${this.bike.auto_lock}`)
        this.bike_en_theft_alert= new Button({x: this.position.x+20, y:this.position.y+100}, {w: 110, h:30}, "gray", `Theft Alert: ${this.bike.theft_alert}`)
        this.bike_en_las= new Button({x: this.position.x+20, y:this.position.y+140}, {w: 110, h:30}, "gray", `LAS: ${this.bike.las}`)
    }

    draw(){
        canvas_context.fillStyle='white'
        canvas_context.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)

        this.bike_lock.text=`Locked: ${this.bike.is_locked}`
        this.bike_en_auto_lock.text=`Auto Lock: ${this.bike.auto_lock}`
        this.bike_en_theft_alert.text=`Theft Alert: ${this.bike.theft_alert}`
        this.bike_en_las.text=`LAS: ${this.bike.las}`

        this.bike_lock.draw()
        this.bike_en_auto_lock.draw()
        this.bike_en_theft_alert.draw()
        this.bike_en_las.draw()
    }

}

class Instructions{
    constructor(position, size){
        this.position=position
        this.size=size
        this.bike_instr= new Button({x: this.position.x+20, y:this.position.y+20}, {w: 150, h:30}, "gray", 'Move bike: Arrow keys')
        this.user_instr= new Button({x: this.position.x+20, y:this.position.y+60}, {w: 150, h:30}, "gray", 'Move user: WASD')
        this.toggle_lock= new Button({x: this.position.x+20, y:this.position.y+100}, {w: 150, h:30}, "gray", 'Toggle Lock: l')
        this.toggle_auto_lock= new Button({x: this.position.x+20, y:this.position.y+140}, {w: 150, h:30}, "gray", 'Toggle Auto Lock: u')
        this.toggle_theft_alert= new Button({x: this.position.x+20, y:this.position.y+180}, {w: 150, h:30}, "gray", 'Toggle Theft Alert: t')
        this.toggle_LAS= new Button({x: this.position.x+20, y:this.position.y+220}, {w: 150, h:30}, "gray", 'Toggle LAS: c')
    }

    draw(){
        canvas_context.fillStyle='white'
        canvas_context.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)

        this.toggle_LAS.draw()
        this.toggle_theft_alert.draw()
        this.toggle_auto_lock.draw()
        this.toggle_lock.draw()
        this.user_instr.draw()
        this.bike_instr.draw()
    }

}

const user = new User({x: 0, y:0}, {w: 50, h:150}, "blue")
const bike = new Bike({x: 100, y:100}, {w: 50, h:150}, "red")
const inter= new Interface({x:canvas.width-150, y:canvas.height-200},{w: 150, h: 200}, bike)
const instr= new Instructions({x:canvas.width-150, y:0},{w: 150, h: 280}, bike)

var is_moving = false
var is_stolen = false

function animate() {
    window.requestAnimationFrame(animate)
    var dist1=calc_dist(user,bike).toFixed(2)
    canvas_context.fillStyle="green"
    canvas_context.fillRect(0,0,canvas.width, canvas.height)

    canvas_context.fillStyle='white'
    canvas_context.fillText(`Distance: ${dist1}`,650, 600)

    user.draw()
    bike.draw()
    bike.operate(dist1)
    inter.draw()
    instr.draw()



}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            user.position.y+=-30
            break
        case 'a':
            user.position.x+=-30
            break
        case 's':
            user.position.y+=30
            break
        case 'd':
            user.position.x+=30
            break
        case 'ArrowUp':
            if (!bike.is_locked){
                is_moving=true
                bike.position.y+=-30}
            break
        case 'ArrowLeft':
            if (!bike.is_locked){
                is_moving=true
                bike.position.x+=-30}
            break
        case 'ArrowDown':
            if (!bike.is_locked){
                is_moving=true
                bike.position.y+=30}
            break
        case 'ArrowRight':
            if (!bike.is_locked){
                is_moving=true
                bike.position.x+=30}
            break
        case 'l':
            bike.lock_bike()
            break
        case 't':
            inter.bike.en_theft_alert()
            is_stolen=false
            break
        case 'c':
            inter.bike.en_las()
            break
        case 'u':
            inter.bike.en_auto_lock()
            is_stolen=false
            break
    }

})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            break
        case 'a':
            break
        case 's':
            break
        case 'd':
            break
        case 'ArrowUp':
            is_moving=false
            break
        case 'ArrowLeft':
            is_moving=false
            break
        case 'ArrowDown':
            is_moving=false
            break
        case 'ArrowRight':
            is_moving=false
            break
        case 'l':
            break
        case 't':
            break
        case 'c':
            break
        case 'u':
            break
    }
})

animate()
