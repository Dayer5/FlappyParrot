class Player extends Entity{


    constructor(x, y, width, height, speed, affectedByGrativity=true, settings = {}){
        super(x, y, width, height, speed, affectedByGrativity, settings = {})
        this.jump_force = -20
        this.__playerSprite()
        this.score = 0
    }

    __playerSprite(){
        var img = new Image()
        img.src = 'assets/image/FlappyBirdPlayer.png'
        this.settings.is_sprite = true
        this.settings.sprite = img
    }

    __move(){
            this.speed = this.jump_force
            return true
    }
}