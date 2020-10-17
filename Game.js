class Game{
  constructor(){

  }

  getGameState(){
    database.ref('gameState').on('value', function(data){
      gameState = data.val();
      console.log(gameState);
      if(gameState == 0){
        player = new Player();
        player.getPlayerCount();

        form = new Form();
        form.display();
      }
    })

    runner1 = createSprite(50, 100);
    runner2 = createSprite(50, 300);
    runners= [runner1, runner2];
  }

  updateGameState(state){
    database.ref('/').update({gameState: state})
  }
  
  play(){
    form.hide();
    Player.getPlayerInfo();

    var index = 0;
    var x= 50;
    var y = 100;
    var ySpacing = 200; 
    for(var plr in allPlayers){
       runners[index].collide(grounds[index]);
       grounds[index].x = runners[index].x
       runners[index].velocityY += 2;
       runners[index].velocityX += 0.1;
      
       player.xPos = runners[index].x
       player.yPos = runners[index].y
       player.updatePlayerInfo();

       if(index + 1 == player.index){
         runners[index].shapeColor = 'red';
         camera .position.x = runners[index].x
         if(keyWentDown('space')){
          runners[index].velocityY -= 20
        }
         if(obstacles[index] !== undefined && obstacles[index].isTouching(runners[index])){
        gameState = 2;
      }
       }
       index++
       text(allPlayers[plr].name + " : " + allPlayers[plr].xPos + " , " + allPlayers[plr].yPos,
        200, ySpacing);
       ySpacing += 50 
    }
    this.spawnObstacles();
  }

  spawnObstacles(){
    if(frameCount % 70 == 0){
      var obstacle1 = createSprite(runner1.x + 600, ground1.y- 50, 50, 20);
      obstacle1group.add(obstacle1);

      var obstacle2 = createSprite(runner2.x + 600, ground2.y- 50, 50, 20);
      obstacle2group.add(obstacle2);

      obstacles = [obstacle1group, obstacle2group];
    }
  }

  end(){
    console.log('gameOver');
  }
}