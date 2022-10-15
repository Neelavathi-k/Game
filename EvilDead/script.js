//document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50;
    let startingPoint = 150
    let doodlerBottomSpace = startingPoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId, rightTimerId
    let score = 0

    function createDoodler() {
        
        doodler.classList.add('doodler');
//        doodler.classList.add('doodlerImage')
        grid.appendChild(doodler); 
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatform() {
        for(let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + (i * platGap)
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
            console.log(platforms);
        }  
    }

    function movePlatform() {
        if(doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px' 
                
                if(platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++;
                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function() {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if(doodlerBottomSpace > (startingPoint + 200) || doodlerBottomSpace > 500) {
                fall()
            }
        },30)
    }

    function fall() {
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(function() {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if(doodlerBottomSpace <= 0) {
                gameOver();
            }

            platforms.forEach(platform => {
                if(
                    (doodlerBottomSpace >= platform.bottom) && (doodlerBottomSpace <= (platform.bottom + 15)) &&
                    ((doodlerLeftSpace + 60) >= platform.left) && (doodlerLeftSpace <= (platform.left+85)) &&
                    !isJumping) {
                        console.log("DOODLE IS LANDED");
                        startingPoint = doodlerBottomSpace
                        jump()
                    }
            })
        },30)
    }

    function gameOver() {
        console.log("GAME OVER");
        isGameOver = true;
        while(grid.firstChild) {
            grid.removeChild(grid.firstChild)   
        }
        // let gameDiv = document.createElement('div')
        // gameDiv.classList.add('gameOver')
        // grid.appendChild(gameDiv); 
        // grid.innerHTML = score
        //document.querySelector('.gameOver').style.display="block"
       // document.getElementsByClassName('gameOver').style.display="block"
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function control(e) {
        if(e.key === "ArrowLeft") {
            moveLeft()
        } else if(e.key === "ArrowRight") {
            moveRight()
        } else if(e.key === "ArrowUp") {
            moveUp()
        }
    }

    function moveLeft() {
        if(isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function() {
            if(doodlerLeftSpace >= 5) {
                doodlerLeftSpace -= 5
                doodler.style.left = doodlerLeftSpace + 'px'
            }else
                moveRight()
        },25)
    }

    function moveRight() {
        if(isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function() {
            if(doodlerLeftSpace < 340) {
                doodlerLeftSpace += 5
                doodler.style.left = doodlerLeftSpace + 'px'
            }else
                moveLeft();
        },25)
    }

    function moveUp() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function start() {
        if(!isGameOver) {
            document.querySelector('.start').style.display= "none"
            createPlatform();
            createDoodler();
            setInterval(movePlatform,30)
            jump();
            document.addEventListener('keyup', control);
        }
    }

    //attach with button
  //  start();
//})