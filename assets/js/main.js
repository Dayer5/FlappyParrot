

//Canvas DOM Manipulation
var canvas = document.getElementById('canvasID')
var ctx = canvas.getContext('2d')

//DOM Manipulation
var score_text = document.getElementById('scoreID')

//Variables
var game_started = false
var game_loop_interval
var player
var gravity = 4
var pillars = []
var start_button_width = 250
var start_button_height = 45
var start_buttonX = canvas.width/2 - start_button_width/2
var start_buttonY = canvas.height/6*4 - start_button_height/1.2
var main_text = 'Flappy Parrot!'
var bottom_text = 'START'
var times_jumped = 0
var username = ''
//Call Init Function
init()

//init function
function init(){
    //Canvas Background
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, canvas.width, canvas.height)
    //Game Title
    ctx.font = "50px Ready_Player_two"
    ctx.textAlign = "center";
    ctx.fillStyle = 'black'
    ctx.fillText(main_text, canvas.width/2, canvas.height/2)
    //Start Button
    ctx.fillStyle = 'gray'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 5
    ctx.fillRect(start_buttonX, start_buttonY, start_button_width,start_button_height)
    ctx.strokeRect(start_buttonX, start_buttonY, start_button_width,start_button_height)
    //Start Button Text
    ctx.font = "40px Comic Sans MS"
    ctx.fillStyle = 'black'
    ctx.fillText(bottom_text, canvas.width/2, canvas.height/6*4)
    //Creator
    ctx.font = "25px Brush Script MT"
    ctx.fillText('Game made by David with help from Sergio', canvas.width/2, canvas.height/12*9)
}


function gameSetup(){
    //Reset
    pillars = []
    player = ""
    do{
        username = prompt("What is your username?")
    } while (username == '');

    //Creating Player
    player = new Player(canvas.width/6, canvas.height/2-20, 50,50, 0)

    //Creating Pillars
    createPillars()
    

    //Game Looop Interval/ set up frame per second
    game_loop_interval = setInterval(function () {
        gameLoop(ctx)
    }, 1000/ 10 )
    game_started = true
}

function gameLoop(ctx){
    update()
    render(ctx)
}

function update(){
    player.__entityUpdate(gravity)
    for (let p = 0; p < pillars.length; p++) {
        const PILLARS = pillars[p];
        PILLARS[1].__update()
        if (PILLARS[0].__update()) {
            player.score ++
            pillars.splice(p, 1)
            addPillar()
        }
    }
}

function render(ctx){

    //Save content
    ctx.save()

    //Clear content
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //Render background
    ctx.fillStyle = 'gray'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    //Render Entities
    player.__render(ctx)
    for (let p = 0; p < pillars.length; p++) {
        const PILLARS = pillars[p];
        PILLARS[0].__render(ctx)
        PILLARS[1].__render(ctx)
    }

    //Render Score
    ctx.font = "25px Times_New_Roman"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("Score: "+player.score, canvas.width/2, 50)

    //Check Lose Conditions/Render Lose Screen
        if (player.__collide(pillars[0][0]) || player.__collide(pillars[0][1]) || player.y < 0 || player.y > canvas.height-player.height){
                init()
                stopGame()
                game_started = false
        }

    //Restore content
    ctx.restore()
}

function createPillars(){
    var pillar_y

        //min: 200    max: 450
        //Bottom pillar - 450 = top pillar
        var pillar_x = 200
        for (let index = 0; index < 2; index++) {
            do {
                pillar_y = Math.floor(Math.random()*401)
            } while (pillar_y < 200);

            pillars.push([
                new Pillar(pillar_x, pillar_y, 90, 360, 'bottom'),
                new Pillar(pillar_x, pillar_y - 500, 90, 360, 'top')
            ])
            pillar_x += 300
    }
}

function addPillar(){
    var pillar_y
    do {
        pillar_y = Math.floor(Math.random()*401)
    } while (pillar_y < 200);
    var pillar_x = (pillars[pillars.length-1][0].x)+300
    pillars.push([
        new Pillar(pillar_x, pillar_y, 90, 360, 'bottom'),
        new Pillar(pillar_x, pillar_y-500, 90, 360, 'top')
    ])
}




function stopGame(){
    game_started = false
    clearInterval(game_loop_interval)
}


document.addEventListener("keydown", function(evt){
    if (evt.key = ' ') {
        if (player.__move()) {
            times_jumped += 1
        }
    }
})

canvas.addEventListener('click', function(evt){

    if (game_started) {
        return;
    }

    if (  (evt.offsetX >= start_buttonX && evt.offsetX <= start_buttonX+start_button_width)
    && (evt.offsetY >= start_buttonY && evt.offsetY <= start_buttonY + start_button_height)  ) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        gameSetup()
    }

})