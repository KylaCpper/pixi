var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Text = PIXI.Text,
    Sprite = PIXI.Sprite;

var player,state,bag;

// 创建渲染器
var renderer = autoDetectRenderer(256, 256);
//渲染器设置属性
renderer.backgroundColor = 0x061639;
//renderer.autoResize = true;
// renderer.resize(512, 512);
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(600,600);
//全屏
//renderer.resize(window.innerWidth, window.innerHeight);
//加入画布
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
//创建 容器
var stage = new Container();


//加载图片缓存纹理 加载完调用setup
loader
  .add([
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/player.png"
  ])
  .on("progress", loading)
  .load(setup);

function loading(loader, resource){
  console.log("loading: " + resource.url); 

  //Display the precentage of files currently loaded
  console.log("progress: " + loader.progress + "%"); 
}

//This `setup` function will run when the image has loaded
function setup() {
	console.log("setup");



	var left = keyboard(37),
	    up = keyboard(38),
	    right = keyboard(39),
	    down = keyboard(40);
	    i=keyboard(73);
	    esc=keyboard(27);
	bag = new Text(
	    "Hello Pixi!",
		{fontFamily: "Arial", fontSize: 32, fill: "white"}
	);


	bag.position.set(54, 96);
	stage.addChild(bag);
	bag.visible = false;
  // 创建精灵player获取缓存资源
    player = new Sprite(
   		resources["images/player.png"].texture
    //也可以别名
    );
  //设置player位置
	player.position.set(16, 16);
  	player.width = 50;
  	player.height = 50;
	player.vx = 0;
	player.vy = 0;
  // 添加子元素player
	stage.addChild(player);



  //Left arrow key `press` method
	left.press = function() {

    //Change the player's velocity when the key is pressed
		player.vx = -5;
		player.vy = 0;
	};

  //Left arrow key `release` method
	left.release = function() {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the player isn't moving vertically:
    //Stop the player
	    if (!right.isDown && player.vy === 0) {
	      player.vx = 0;
	    }
	};

  //Up
	up.press = function() {
	    player.vy = -5;
	    player.vx = 0;
	};
	up.release = function() {
	    if (!down.isDown && player.vx === 0) {
	      player.vy = 0;
	    }
	};

  //Right
	right.press = function() {
	    player.vx = 5;
	    player.vy = 0;
	};
	right.release = function() {
	    if (!left.isDown && player.vy === 0) {
	      player.vx = 0;
	    }
	};

  //Down
	down.press = function() {
	    player.vy = 5;
	    player.vx = 0;
	};
	down.release = function() {
	    if (!up.isDown && player.vx === 0) {
	      player.vy = 0;
	    }
	};
	i.release = function(){
		bag.visible = true;
	}
	esc.release=function(){
		bag.visible = false;
	}



  //移除子元素player   stage.removeChild(player)  or  (通常)player.visible = false;
	state = play;
  //渲染器刷新
	gameLoop();

}
function gameLoop() {

  //60s 调用一次
	requestAnimationFrame(gameLoop);
	state();

  //Move the player 1 pixel to the right each frame


  //Render the stage to see the animation
 
}

function play(){
	player.x += player.vx;
	player.y += player.vy;
  //检测碰撞
	if (hitTestRectangle(player, bag)) {
  		bag.text="aa"
	} else {
	  	bag.text="aaaa"
	}
	renderer.render(stage);
}





//Start the game loop


//Tell the `renderer` to `render` the `stage`




/*
var stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Use Pixi's built-in `loader` object to load an image
PIXI.loader
  .add("images/player.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the `player` sprite from the texture
  var player = new PIXI.Sprite(
    PIXI.loader.resources["images/player.png"].texture
  );

  //Add the player to the stage
  stage.addChild(player);

  //Render the stage   
  renderer.render(stage);
}



*/










/*
PIXI.loader
  .add("images/imageOne.png")
  .add("images/imageTwo.png")
  .add("images/imageThree.png")
  .load(setup);
PIXI.loader
  .add([
    "images/imageOne.png",
    "images/imageTwo.png",
    "images/imageThree.png"
  ])
  .load(setup);
加载纹理  加载完调用setup
  */