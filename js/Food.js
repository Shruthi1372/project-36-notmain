class Food {
    constructor() {
        this.image=loadImage("images/Milk.png");
        this.foodStock = 0;
        this.lastFed;
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
       }

       deductFood(){
        if(this.foodStock>0){
         this.foodStock=this.foodStock-1;
        }
       }

       getFoodStock(){
        return this.foodStock;
      }

      display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,700,220,70,70);

        if(this.foodStock!=0){
           for(var i=0;i<this.foodStock;i++){
             if(i%10==0){
               x=80;
               y=y+50;
             }
        image(this.image,x,y,50,50);
             x=x+30;
           }
         }
       }
       bedroom(){
        background(dogBedroom,550,500);  
    }
      
    garden(){
        background(dogGarden,550,500);  
    } 

    washroom(){
        background(dogWashroom,550,500); 
    }
}
     