

class Pillar extends Entity{


    constructor(x, y, width, height, type, speed=4, affectedByGrativity=false, settings = {}){
        super(x, y, width, height, speed, affectedByGrativity, settings = {})
        this.type = type
        this.__pillarSprite()
    }


    __pillarSprite(){
        var img = new Image()
        switch (this.type) {
            case 'top':
                img.src = 'assets/image/FlappyBirdPillarTop.png'
                this.settings.is_sprite = true
                this.settings.sprite = img
            break;
            case 'bottom':
                img.src = 'assets/image/FlappyBirdPillarBottom.png'
                this.settings.is_sprite = true
                this.settings.sprite = img
            break;
        }
    }

    __update(){
        this.x -= this.speed

        if (this.x < -this.width ) {
            return true
        }
        return false
    }
}