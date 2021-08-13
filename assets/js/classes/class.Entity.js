

class Entity{


    constructor(x, y, width, height, speed, affectedByGrativity, settings = {}){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.affectedByGrativity = affectedByGrativity
        this.affectedByGrativity = 
        this.settings = Object.assign({ is_sprite:false, sprite:'', color:'yellow' }, settings)
    }

    //Render entity
    __render(ctx){
        if(this.settings.is_sprite){
            ctx.drawImage(this.settings.sprite, this.x, this.y, this.width, this.height)
            return;
        }

        ctx.fillStyle = this.settings.color;
        ctx.fillRect( this.x, this.y, this.width, this.height)
    }

    __entityUpdate(gravity){
        if (this.affectedByGrativity) {
            this.speed += gravity
            this.y += this.speed
        }
    }

    //Check collision
    __collide(e){
        return(  ( this.x < e.x+e.width && this.x+this.width > e.x ) 
        && ( this.y < e.y+e.height && this.y+this.height > e.y  ) )
    }

}