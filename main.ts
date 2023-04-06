namespace SpriteKind {
    export const coin = SpriteKind.create()
}
// function foodfun will be called as scores of both players add up to or more than 10
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    while (info.player1.score() + info.player2.score() >= 10) {
        Foodfun(life)
    }
})
// if one of the players finish at the treasure with more than 5 point scores and lives, they win. 
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    if (info.player1.score() >= 5 && info.player1.life() >= 5 && sprite == player1) {
        game.setGameOverMessage(true, "Player 1 Wins")
        game.gameOver(true)
    }
    if (info.player2.score() >= 5 && info.player2.life() >= 5 && sprite == player2) {
        game.setGameOverMessage(true, "Player 2 Wins")
        game.gameOver(true)
    }
})
// if player overlaps with the obstacles, then they lose a life
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (sprite == player2) {
        info.player2.changeLifeBy(-1)
    }
    if (sprite == player1) {
        info.player1.changeLifeBy(-1)
    }
    // obstacle destroyed after player overlaps with it
    sprites.destroy(otherSprite)
})
// if the player overlaps with coins, their score go up by 1 
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    if (sprite == player2) {
        info.player2.changeScoreBy(1)
    }
    if (sprite == player1) {
        info.player1.changeScoreBy(1)
    }
    // coin destroyed after player overlaps with it
    sprites.destroy(otherSprite)
})
// coins are placed at random spots in the pathway
function CoinFun (list: Image[]) {
    randomCoin = sprites.create(list._pickRandom(), SpriteKind.coin)
    tiles.placeOnRandomTile(randomObstacle, sprites.dungeon.darkGroundNorthWest1)
    randomCoin.setFlag(SpriteFlag.BounceOnWall, true)
    randomCoin.setVelocity(30, 10)
}
// used for player's life input in the beginning.
// if the number inputed is less than 4 and not equal to 0, then the number will be returned
function lifeFun (num: number) {
    if (num < 4 && !(Num == 0)) {
        return num
    }
    return 1
}
// random obstacles are placed in the pathways 
function EnemyFun (list: Image[]) {
    randomObstacle = sprites.create(list._pickRandom(), SpriteKind.Projectile)
    tiles.placeOnRandomTile(randomObstacle, sprites.dungeon.darkGroundNorthWest1)
    randomObstacle.setFlag(SpriteFlag.BounceOnWall, true)
    randomObstacle.setVelocity(30, 10)
}
// food is randomly placed in the pathway
function Foodfun (list: Image[]) {
    randomFood = sprites.create(list._pickRandom(), SpriteKind.Food)
    tiles.placeOnRandomTile(randomFood, sprites.dungeon.darkGroundNorthWest1)
    randomFood.setBounceOnWall(true)
    randomFood.setVelocity(30, 10)
}
// if the player overlaps with the food, the they get + 1 life
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (sprite == player2) {
        info.player2.changeLifeBy(1)
    }
    if (sprite == player1) {
        info.player1.changeLifeBy(1)
    }
    // food destroyed after player overlaps with it
    sprites.destroy(otherSprite)
})
let randomFood: Sprite = null
let randomObstacle: Sprite = null
let randomCoin: Sprite = null
let life: Image[] = []
let player2: Sprite = null
let player1: Sprite = null
let Num = 0
// life score is set to the input number 
info.player1.setScore(0)
info.player1.setLife(lifeFun(game.askForNumber("Choose your amount of lives up to 3.", 1)))
info.player2.setScore(0)
// life score is set to the input number 
info.player2.setLife(lifeFun(game.askForNumber("Choose your amount of lives up to 3.", 1)))
Num = game.askForNumber("Choose a number", 1)
// when it asks to choose a number, its a random chance to get +1 life 
if (Num == randint(0, 10)) {
    info.player2.changeLifeBy(1)
}
let Num2 = game.askForNumber("Choose a number", 1)
// when it asks to choose a number, its a random chance to get +1 life 
if (Num2 == randint(0, 10)) {
    info.player2.changeLifeBy(1)
}
player1 = sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . . . 
    c c c c c d d e e e f c . . . . 
    . f d d d d e e e f f . . . . . 
    . . f f f f f e e e e f . . . . 
    . . . . f f e e e e e e f . f f 
    . . . f e e f e e f e e f . e f 
    . . f e e f e e f e e e f . e f 
    . f b d f d b f b b f e f f e f 
    . f d d f d d f d d b e f f f f 
    . . f f f f f f f f f f f f f . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(player1)
player2 = sprites.create(img`
    . . . . c c c c c c . . . . . . 
    . . . c 6 7 7 7 7 6 c . . . . . 
    . . c 7 7 7 7 7 7 7 7 c . . . . 
    . c 6 7 7 7 7 7 7 7 7 6 c . . . 
    . c 7 c 6 6 6 6 c 7 7 7 c . . . 
    . f 7 6 f 6 6 f 6 7 7 7 f . . . 
    . f 7 7 7 7 7 7 7 7 7 7 f . . . 
    . . f 7 7 7 7 6 c 7 7 6 f c . . 
    . . . f c c c c 7 7 6 f 7 7 c . 
    . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
    . c 7 7 2 7 7 c f c 6 7 7 6 c c 
    c 1 1 1 1 7 6 f c c 6 6 6 c . . 
    f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
    f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
    . f 6 1 1 1 1 1 1 6 6 6 f . . . 
    . . c c c c c c c c c f . . . . 
    `, SpriteKind.Player)
player1.setStayInScreen(false)
player2.setStayInScreen(false)
tiles.setCurrentTilemap(tilemap`level1`)
// player starts on the top corners of the map 
tiles.placeOnTile(player1, tiles.getTileLocation(1, 1))
// player starts on the top corners of the map 
tiles.placeOnTile(player2, tiles.getTileLocation(28, 1))
// move player with buttons
controller.moveSprite(player1)
controller.moveSprite(player2)
// list used for CoinFun function 
let coin_array = [img`
    . . b b b b . . 
    . b 5 5 5 5 b . 
    b 5 d 3 3 d 5 b 
    b 5 3 5 5 1 5 b 
    c 5 3 5 5 1 d c 
    c d d 1 1 d d c 
    . f d d d d f . 
    . . f f f f . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . b b . . . . . . . 
    . . . . . . b 5 5 b . . . . . . 
    . . . b b b 5 5 1 1 b b b . . . 
    . . . b 5 5 5 5 1 1 5 5 b . . . 
    . . . . b d 5 5 5 5 d b . . . . 
    . . . . c b 5 5 5 5 b c . . . . 
    . . . . c 5 d d d d 5 c . . . . 
    . . . . c 5 d c c d 5 c . . . . 
    . . . . c c c . . c c c . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
life = [img`
    .............beebbbb............
    ............eebbbb4bb...........
    ............eb344bb4bb..........
    ............e44334bb4bb.........
    ............eb433344b4be........
    ............4eb43344444be.......
    ...........bd4eb43333344bb......
    ..........b455d4443333444bb.....
    ..........4d5555d444333444bb....
    .........4555555dd4b4443444be...
    ........bd5555d555d4bb444444ee..
    ........b55ddd665555bb4b44444ee.
    .......bd5555677655554ebb44444eb
    .......43222558855555d4eeb44b4ee
    ......b422332ddd555222d4eebbb4be
    ......be22232ed55522332db4ebbbbe
    .....bde22222e555e22232edd4bbbbe
    .....b52e222e3555e22222eddd4ebee
    ....bd552eee355552e222e355544eee
    ....665dd5555555552eee355dd4deee
    ...6776555555555555555551554d4ee
    ...4885222555dddd6655551544d4eee
    ..b45522332555dd677611d444ddeee.
    ..4d5222232e55555881d44ddd4eee..
    .bdd5e22222e555115114d54d4ee....
    .b55d2e222e351144d1d55eeee......
    bd5ddd2eee3d444555dd4e..........
    b555115dddd55d544eede...........
    4511d444d5544ee...4de...........
    41d4555d4ee........44...........
    41554eede.......................
    44ee...4e.......................
    `, img`
    . . . . c c c b b b b b . . . . 
    . . c c b 4 4 4 4 4 4 b b b . . 
    . c c 4 4 4 4 4 5 4 4 4 4 b c . 
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e . 
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c 
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e 
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e 
    . e b 4 4 4 4 4 5 4 4 4 4 b e . 
    8 7 e e b 4 4 4 4 4 4 b e e 6 8 
    8 7 2 e e e e e e e e e e 2 7 8 
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
    e b e 8 8 c c 8 8 c c c 8 e b e 
    e e b e c c e e e e e c e b e . 
    . e e b b 4 4 4 4 4 4 4 4 e e . 
    . . . c c c c c e e e e e . . . 
    `]
// list used for EnemyFun function, also used as a projectile
let obstacle = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . 3 1 1 3 . . . . . . 
    . . . . . 2 1 1 1 1 2 . . . . . 
    . . . . . 2 1 1 1 1 2 . . . . . 
    . . . . . . 3 1 1 3 . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . c c c c . . . . 
    . . . . c c c c c c c c c . . . 
    . . . c f c c a a a a c a c . . 
    . . c c f f f f a a a c a a c . 
    . . c c a f f c a a f f f a a c 
    . . c c a a a a b c f f f a a c 
    . c c c c a c c b a f c a a c c 
    c a f f c c c a b b 6 b b b c c 
    c a f f f f c c c 6 b b b a a c 
    c a a c f f c a 6 6 b b b a a c 
    c c b a a a a b 6 b b a b b a . 
    . c c b b b b b b b a c c b a . 
    . . c c c b c c c b a a b c . . 
    . . . . c b a c c b b b c . . . 
    . . . . c b b a a 6 b c . . . . 
    . . . . . . b 6 6 c c . . . . . 
    `]
// on game update, function EnemyFun is called with obstacle list
game.onUpdateInterval(2000, function () {
    EnemyFun(obstacle)
})
// on game update, function Foodfun is called with life list
game.onUpdateInterval(2000, function () {
    Foodfun(life)
})
// on game update, function CoinFun is called with coin array list
game.onUpdateInterval(2000, function () {
    CoinFun(coin_array)
})
// if player 1 runs out of life, player 2 wins
game.onUpdateInterval(500, function () {
    while (info.player1.life() == 0) {
        game.setGameOverMessage(true, "Player 2 Wins")
        game.gameOver(true)
    }
})
// if player 2 runs out of life, player 1 wins
game.onUpdateInterval(500, function () {
    while (info.player2.life() == 0) {
        game.setGameOverMessage(true, "Player 1 Wins")
        game.gameOver(true)
    }
})
