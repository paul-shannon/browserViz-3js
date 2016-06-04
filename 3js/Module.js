//----------------------------------------------------------------------------------------------------
// move these all back inside module scope when debugging is done

var camera, scene, renderer, particles, geometry, material, i, h, color, sprite, size;

//----------------------------------------------------------------------------------------------------
var ThreeJSModule = (function () {

  var statusDiv;
  var renderingDiv;
  var container, stats;
  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;


//--------------------------------------------------------------------------------------------
function initializeUI ()
{

   scene = new THREE.Scene();
   camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
   renderer = new THREE.WebGLRenderer();
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   material = new THREE.PointsMaterial({size: 20, sizeAttenuation: false});

    var maxPoints = 100;
    var geometry = new THREE.Geometry();

    for(var i=0; i < maxPoints; i++){
       var maxCoord = 500;
       var x = Math.floor(maxCoord * Math.random() - (maxCoord/2));
       var y = Math.floor(maxCoord * Math.random() - (maxCoord/2));
       var z = Math.floor(maxCoord * Math.random() - (maxCoord/2));
       geometry.vertices.push(new THREE.Vector3(x, y, z));
       }

    var particles = new THREE.Points(geometry, material);
    scene.add(particles)
    console.log("added " + maxPoints + " points");
    camera.position.z = 800;

    render();
    console.log("after call to render")
    container = $("#renderingDiv");
    container.append(renderer.domElement);

} // initializeUI
//--------------------------------------------------------------------------------------------
function oldinitializeUI ()
{
  console.log(1)
  renderingDiv = $("#cyMetnetDiv");
  statusDiv = $("#metnetAndPatientsStatusDiv");
   //var g = [{"id":"N5","x":55.5,"y":25},{"id":"N6","x":55.5,"y":95},{"id":"N7","x":33,"y":145},{"id":"t3","x":8,"y":195},
    //         {"id":"t4","x":58,"y":195},{"id":"t2","x":103,"y":145}];

   //container = document.createElement('div');
   //document.body.appendChild( container);

   camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1000, -1000);
   camera.position.set(0, 0, -500)
   scene = new THREE.Scene();
   console.log(2)

   camera.lookAt(new THREE.Vector3(0,0,0));

   orbit = new THREE.OrbitControls(camera);

   console.log(3)
   scene.fog = new THREE.FogExp2( 0x000000, 0.001);
   geometry = new THREE.Geometry();
   //sprite = new THREE.TextureLoader().load("disc.png");
   sprite = new THREE.TextureLoader().load("http://localhost:8003/assets/textures/ps_ball.png")

   console.log(4)

   for(i = 0; i < 5; i ++){
     console.log("adding vertex at " + i);
     var vertex = new THREE.Vector3();
     vertex.x = i * 40;
     vertex.y = i * 40;
     vertex.z = 0;
     geometry.vertices.push(vertex);
     } // for i

   console.log(5)

   material = new THREE.PointsMaterial();
   //material = new THREE.PointsMaterial({size: 35, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: false});
   material.color.setRGB(255.0, 255.0, 255.0);
   particles = new THREE.Points(geometry, material);
   scene.add(particles);

   console.log(6)
   renderer = new THREE.WebGLRenderer();
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   //var container = $("#threeJSDiv");
   container = $("#renderingDiv");
   container.append(renderer.domElement);
   console.log(7)

   //stats = new Stats();
   //stats.domElement.style.position = 'absolute';
   //stats.domElement.style.top = '0px';
   //container.appendChild(stats.domElement);

   document.addEventListener('mousemove', onDocumentMouseMove, false);
   document.addEventListener('touchstart', onDocumentTouchStart, false);
   document.addEventListener('touchmove', onDocumentTouchMove, false);

   //window.addEventListener('resize', onWindowResize, false);

   // animate();

} // oldinitializeUI
//----------------------------------------------------------------------------------------------------
function animate()
{
   console.log("--- function animate");
   requestAnimationFrame(animate);
   render();
   //stats.update();

} // animate
//----------------------------------------------------------------------------------------------------
function onDocumentMouseMove(event)
{
   mouseX = event.clientX - windowHalfX;
   mouseY = event.clientY - windowHalfY;
   console.log("-- mouseMove: " + mouseX + ", " + mouseY)
   console.log("-- mouseMove: " + event.clientX + ", " + event.clientY);

} // onDocumentMouseMove
//----------------------------------------------------------------------------------------------------
function onDocumentTouchStart(event)
{
   console.log("-- touchStart");
   //if (event.touches.length == 1) {
   // event.preventDefault();
   // mouseX = event.touches[ 0 ].pageX - windowHalfX;
   // mouseY = event.touches[ 0 ].pageY - windowHalfY;
   // }

} // onDocumentTouchStart
//----------------------------------------------------------------------------------------------------
function onDocumentTouchMove(event)
{
  console.log("-- touchMove");

  //if (event.touches.length == 1) {
  //   event.preventDefault();
  //   mouseX = event.touches[ 0 ].pageX - windowHalfX;
  //   mouseY = event.touches[ 0 ].pageY - windowHalfY;
  //  }

} // onDocumentTouchMove
//----------------------------------------------------------------------------------------------------
function render()
{
   var time = Date.now() * 0.00005;
   //camera.position.x += (mouseX - camera.position.x) * 0.05;
   //camera.position.y += (- mouseY - camera.position.y) * 0.05;
   //console.log(" camera.position: " + camera.position.x + ", " + camera.position.y + ", " + camera.position.z);
   //camera.position.x = centerX
   //camera.position.y = centerY
   //camera.position.y = 1000
   h = (360 * (1.0 + time) % 360) / 360;
   //material.color.setHSL(h, 0.5, 0.5);
   renderer.render(scene, camera);

} // render
//----------------------------------------------------------------------------------------------------
function handlePing(msg)
{
   console.log("=== Module.3js, handlePing");
   console.log(datasetName)

} // handlePing
//----------------------------------------------------------------------------------------------------
 return{
     init: function(){
        hub.addMessageHandler("ping3js", handlePing);
        hub.addOnDocumentReadyFunction(initializeUI);
       }
     };

   }); // metnetModule
//----------------------------------------------------------------------------------------------------
m3 = ThreeJSModule()
m3.init();
