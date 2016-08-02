//To initialize a scene. AKA intializing library to build the base
var scene = new THREE.Scene();

//Used for rendering. More details on threejs.org/docs
var renderer = new THREE.WebGLRenderer({antialias:true});

document.body.appendChild(renderer.domElement);
renderer.setSize(800,800);

var fieldofView = 45; //degrees

//Need to initialize camera for viewing 3D images
var camera = new THREE.PerspectiveCamera(fieldofView, 1, 0.1, 1600);

camera.position.z = 3;
camera.lookAt(new THREE.Vector3(0, 0, 0));

//Add variants to your geometry with parameters
var geometry = new THREE.SphereGeometry(1, 40, 20,
                                        0, Math.PI*2,
                                        Math.PI/4, Math.PI/2
                                      );
geometry.vertices.forEach(function(v){
  v.multiplyScalar(0.5+0.5*Math.pow(Math.random(),3));
});
//Can also do custom geometry
// var geometry = new THREE.Geometry();
// for(var i = 0; i < 1000; i++) {
//   geometry.vertices.push(new THREE.Vector3(
//     Math.random(),
//     Math.random(),
//     Math.random()
//   ));
// }

//Constituents of the 3D image. Also defines different properties
var material = new THREE.PointsMaterial({
  size:0.4,
  color:0x102040,
  blending:THREE.AdditiveBlending,
  transparent: true,
  depthWrite: false,
  map: THREE.ImageUtils.loadTexture("./particle.png") //use webstorm(while in index.html, view -> open in browser) or deploy on localhost for image to render
});

//Constituents of lines connecting images. Also defines different properties
var lineMaterial = new THREE.MeshBasicMaterial(
  {
    color:0x102040,
    blending:THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    wireframe: true,
  }
)

var mesh = new THREE.Points(geometry, material);
var wireMesh = new THREE.Mesh(geometry, lineMaterial);
scene.add(mesh);
mesh.add(wireMesh);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

//Function for rotation. Defines rotation speed as well
function update(timeDelta){
  // document.title = timeDelta;
  mesh.rotation.y= timeDelta/10000;
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
update();
