function game(){
    var button = document.getElementById('button');
    var road = document.getElementById('road');
    
    var score = 0;
    
    button.addEventListener('click', function(){
        var entry = document.getElementById('entry');
        entry.style.display = 'none';
        road.style.display = 'block';
    });

    function OverTakeLine(marginLeft){
        this.left = marginLeft;
    
        this.element = document.createElement('div');
        this.element.style.width = '5px';
        this.element.style.height = '650px';
        this.element.style.backgroundColor = 'lightgray';
        this.element.style.marginLeft = this.left + 'px';
        this.element.style.position = 'absolute';
    }
    
    var line1 = new OverTakeLine(130);
    var line2 = new OverTakeLine(265);
    road.appendChild(line1.element);
    road.appendChild(line2.element);
    
    
    

    var car = document.createElement('div');
    car.style.height = '50px'
    car.style.width ='30px';
    car.innerHTML = '<img style="width: 50px; height: 100px;" src="./images/player.png" alt="player_car" />';
    car.style.marginTop = '500px';
    car.style.marginLeft = '175px';
    car.style.position = 'absolute';
    road.appendChild(car);
    
    function Enemy(marginLeft, src){
        this.left = marginLeft;
        this.src = src;
    
        this.element = document.createElement('div');
        this.element.style.height = '50px'
        this.element.style.width ='30px';
        this.element.innerHTML = '<img style="width: 50px; height: 100px;" src="./images/'+this.src+'.png" alt="enemy_car" />';
        this.element.style.marginTop = '-100px';
        this.element.style.marginLeft = this.left + 'px';
        this.element.style.position = 'absolute';
    }
    
    counter = 5;
    function moveDownwards(enemy, moveDownTime){
        var marginTop = parseInt(enemy.style.getPropertyValue('margin-top'));
        var marginLeft = parseInt(enemy.style.getPropertyValue('margin-left'));
        
        var moveCar = setInterval(function(){
            marginTop += counter;
            enemy.style.marginTop = marginTop + 'px';
            var left = parseInt(car.style.getPropertyValue('margin-left'));
            if( marginTop - 500 >= -100 && marginTop - 500 <= 100 && marginLeft === left){
                clearInterval(moveCar);
                score = 0;
                gameFinish();
                road.removeChild(car);
            }
            if(marginTop - 600 === 0){
                score++;
                updateScore(score);
            }
        }, moveDownTime);
    }
    
    var create;
    var enemies = '';
    var enemyCars = [];
    function createEnemy(createEnemyTime, moveDownTime){
        var enemy;
        create = setInterval(function(){
            var lane = parseInt(Math.random() * 30) % 3 + 1;
            var car = parseInt(Math.random() * 3 + 1);
            if (enemies === '12'){
                if ( lane === 3){
                    lane = 1;
                    enemies = '1';
                }else if ( lane === 1){
                    enemies = '1';
                }
            }else if (enemies === '32' ){
                if (lane === 1){
                    lane = 3;
                    enemies = '3';
                }if (lane === 3){
                    enemies = '3';
                }
            }else if(enemies.length == 2){
                enemies = enemies[1] + lane;
            }else{
                enemies += lane;
            }
    
            var left = 135 * (lane-1) + 40;
            enemy = new Enemy(left, car);
            enemyCars.push(enemy);
            road.appendChild(enemy.element);
            moveDownwards(enemy.element, moveDownTime);
        }, createEnemyTime);
    }
    
    
    var moveDownTime = 100;
    var createEnemyTime = 3000;
    createEnemy(createEnemyTime, moveDownTime);
    
    
    var increase = setInterval(function(){
        clearInterval(create);
        createEnemyTime = createEnemyTime / 2;
        moveDownTime = parseInt(createEnemyTime / 30);
        setTimeout(function(){
            createEnemy(createEnemyTime, moveDownTime);
        }, 10000);
        
    }, 40000)
    
    window.addEventListener('keypress', function(event){
        var left = parseInt(car.style.getPropertyValue('margin-left'));
        if(event.key ==='a'){
            if(left === 40){
    
            }else{
                car.style.marginLeft = ( left - 135 ) + 'px';
            }
        }else if (event.key === 'd'){
            if(left === 310){
    
            }else{
                car.style.marginLeft = ( left + 135 ) + 'px';
            }
        }
    });
    
    
        var scoreDisplay = document.createElement('div');
        scoreDisplay.style.width = '50px';
        scoreDisplay.style.padding = '10px 0';
        scoreDisplay.style.backgroundColor = 'black';
        scoreDisplay.style.color = 'gray';
        scoreDisplay.style.fontSize = '30px';
        scoreDisplay.style.marginTop = '0px';
        scoreDisplay.style.marginLeft = '350px';
        scoreDisplay.style.position = 'absolute';
        scoreDisplay.style.textAlign = 'center';
        scoreDisplay.innerHTML = score;
        road.appendChild(scoreDisplay);
    
    function updateScore(score){
        scoreDisplay.innerHTML = score;
    }
    
    var gameOver = document.getElementById('gameOver');
    
    function gameFinish(){
        road.style.display = 'none';
        gameOver.style.display = 'block';
        road.removeChild(car);
        for (var i = 0; i < enemyCars.length; i++){
            road.removeChild(enemyCars[i].element);
        }
        
    }
    
    var restart = document.getElementById('restart');
    restart.addEventListener('click', function(){
        //road.style.display = 'block';
        //gameOver.style.display = 'none';
    });
}

game();

