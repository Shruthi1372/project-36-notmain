//Create variables here
var dog;
var dogPic,happyDog,database,foodS,foodStock;
var feed,add;
var foodobject;
var fedtime;
var lastFed;
var gameState = 0;
var changingGameState,readingGameState;
var dogBedRoom, dogGarden,dogWashroom;

function preload()
{
	//load images here
  dogPic = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  dogBedRoom = loadImage("images/Bed Room.png");
  dogGarden = loadImage("images/Garden.png");
  dogWashroom = loadImage("images/Wash Room");
}

function setup() {
	createCanvas(1000, 400);
  database= firebase.database();
  dog = createSprite(800,200);
  dog.addImage(dogPic);
  dog.scale=0.2;

 foodStock = database.ref('Food')
  foodStock.on("value",readStock)


  foodobject=new Food()

  feed = createButton("FEED DRAGO")
feed.position(700,95)
feed.mousePressed(FeedDog)
add = createButton("ADD FOOD")
add.position(800,95)
add.mousePressed(AddFood)

readState = database.ref('gameState');
readState.on("value",function(data){
  gameState = data.val();
})
  
}


function draw() {  
   background(46,139,87);
   foodobject.display()
    
    feedTime = database.ref('FeedTime');
    feedTime.on("value",function(data){
      lastFed = data.val();
    });

  //add styles here
  textSize(20);
    fill("black");
    text("food remaining:"+ foodS,150,100);
    textSize(15);

    if (lastFed>=12) {
      text("Last Feed : "+ lastFed%12 + "PM", 350,30);
    } else if (lastFed==0) {
      text("Last Feed : 12 AM",350,30);
    } else {
      text("Last Feed : "+ lastFed + "AM", 350,30);
    }
    //text(" Note:Press UP_ARROW key to feed the dog!" ,5 , 20 );
    
    //if (keyWentDown(UP_ARROW)) {
      //writeStock(foodS);
      //dog.addImage(happyDog);
    //}

    if (gameState!="Hungry") {
      feed.hide();
      AddFood.hide();
      dog.remove();
    } else {
      feed.show();
      AddFood.show();
      dog.addImage(dogPic);
    }

    currentTime = hour();
    if (currentTime==(lastFed+1)) {
      update("Playing");
      foodObject.dogGarden();
    } else if(currentTime==(lastFed+2)) {
      update("Sleeping");
      foodObject.dogBedRoom();
    } else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)) {
      update("Bathing");
      foodObject.dogWashroom();
    } else {
      update("Hungry");
      foodObject.display();
    }

    drawSprites();
  
}
//function readPosition(data){
  //position = data.val();
  //foodobject.updateFoodStock(position)
  //console.log(position.x);
  
//}

function writeStock(x) {

  if (x<=0) {
    x=0;
  }else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

function AddFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  }
  
  )
  }

  function FeedDog(){

    dog.addImage(happyDog)
    if(foodobject.getFoodStock()<= 0){
      foodobject.updateFoodStock(foodobject.getFoodStock()*0);
    }else{
      foodobject.updateFoodStock(foodobject.getFoodStock()-1);
    }      
     database.ref('/').update({
       Food:foodobject.getFoodStock(),
       FeedTime:hour ()
     })
    }
    function update(state){
      database.ref('/').update({
        gameState:state
      })
    }
    


                                                                                                                                                                    