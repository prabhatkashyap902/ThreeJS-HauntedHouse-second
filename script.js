import GUI from 'lil-gui'; 
import * as THREE from 'three';
import './src/index.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Timer } from 'three/addons/misc/Timer.js';
import { Sky } from 'three/examples/jsm/Addons.js';
import floorAlphaTextureImage from './src/assets/floor/alpha.jpg'
import floorColorTextureImage from './src/assets/floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_diff_1k.jpg'
import floorARMTextureImage from './src/assets/floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_arm_1k.jpg'
import floorNormalTextureImage from './src/assets/floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_nor_gl_1k.jpg'
import floorDisplacementTextureImage from './src/assets/floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_disp_1k.jpg'
import roofColorTextureImage from './src/assets/house/clay_roof_tiles_03_1k/clay_roof_tiles_03_diff_1k.jpg'
import roofARMTextureImage from './src/assets/house/clay_roof_tiles_03_1k/clay_roof_tiles_03_arm_1k.jpg'
import roofNormalTextureImage from './src/assets/house/clay_roof_tiles_03_1k/clay_roof_tiles_03_nor_gl_1k.jpg'
import wallColorTextureImage from './src/assets/house/brick_wall_001_1k/brick_wall_001_diffuse_1k.jpg'
import wallARMTextureImage from './src/assets/house/brick_wall_001_1k/brick_wall_001_arm_1k.jpg'
import wallNormalTextureImage from './src/assets/house/brick_wall_001_1k/brick_wall_001_nor_gl_1k.jpg'
import bushedColorTextureImage from './src/assets/bushes/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg'
import bushesARMTextureImage from './src/assets/bushes/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg'
import bushesNormalTextureImage from './src/assets/bushes/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg'
import graveColorTextureImage from './src/assets/graves/dry_riverbed_rock_1k/dry_riverbed_rock_diff_1k.jpg'
import graveARMTextureImage from './src/assets/graves/dry_riverbed_rock_1k/dry_riverbed_rock_arm_1k.jpg'
import graveNormalTextureImage from './src/assets/graves/dry_riverbed_rock_1k/dry_riverbed_rock_nor_gl_1k.jpg'
import doorColorTextureImage from './src/assets/door/color.jpg'
import doorAlphaTextureImage from './src/assets/door/alpha.jpg'
import doorAmbientOcclusionTextureImage from './src/assets/door/ambientOcclusion.jpg'
import doorHeightTextureImage from './src/assets/door/height.jpg'
import doorNormalTextureImage from './src/assets/door/normal.jpg'
import doorMetalnessTextureImage from './src/assets/door/metalness.jpg'
import doorRoughnessTextureImage from './src/assets/door/roughness.jpg'



const gui = new GUI();

const canvas=document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const sky=new Sky();
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
sky.scale.setScalar(450000);
scene.fog = new THREE.FogExp2('#02343f',0.08)
scene.add(sky)


const textureLoader=new THREE.TextureLoader()
const floorAlphaTexture=textureLoader.load(floorAlphaTextureImage)
const floorColorTexture=textureLoader.load(floorColorTextureImage)
const floorARMTexture=textureLoader.load(floorARMTextureImage)
const floorNormalTexture=textureLoader.load(floorNormalTextureImage)
const floorDisplacementTexture=textureLoader.load(floorDisplacementTextureImage)

const roofColorTexture=textureLoader.load(roofColorTextureImage)
const roofARMTexture=textureLoader.load(roofARMTextureImage)
const roofNormalTexture=textureLoader.load(roofNormalTextureImage)

const wallColorTexture=textureLoader.load(wallColorTextureImage)
const wallARMTexture=textureLoader.load(wallARMTextureImage)
const wallNormalTexture=textureLoader.load(wallNormalTextureImage)

const bushesColorTexture=textureLoader.load(bushedColorTextureImage)
const bushesARMTexture=textureLoader.load(bushesARMTextureImage)
const bushesNormalTexture=textureLoader.load(bushesNormalTextureImage)

const graveColorTexture=textureLoader.load(graveColorTextureImage)
const graveARMTexture=textureLoader.load(graveARMTextureImage)
const graveNormalTexture=textureLoader.load(graveNormalTextureImage)

const doorColorTexture = textureLoader.load(doorColorTextureImage)
const doorAlphaTexture = textureLoader.load(doorAlphaTextureImage)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionTextureImage)
const doorHeightTexture = textureLoader.load(doorHeightTextureImage)
const doorNormalTexture = textureLoader.load(doorNormalTextureImage)
const doorMetalnessTexture = textureLoader.load(doorMetalnessTextureImage)
const doorRoughnessTexture = textureLoader.load(doorRoughnessTextureImage)


floorAlphaTexture.colorSpace=THREE.SRGBColorSpace
wallColorTexture.colorSpace=THREE.SRGBColorSpace
roofColorTexture.colorSpace=THREE.SRGBColorSpace
bushesColorTexture.colorSpace=THREE.SRGBColorSpace
graveColorTexture.colorSpace=THREE.SRGBColorSpace
doorColorTexture.colorSpace=THREE.SRGBColorSpace


floorColorTexture.repeat.set(8,8)
floorARMTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)
floorDisplacementTexture.repeat.set(8,8)

roofColorTexture.repeat.set(4,4)
roofARMTexture.repeat.set(4,4)
roofNormalTexture.repeat.set(4,4)
  

floorColorTexture.wrapS=THREE.RepeatWrapping
floorARMTexture.wrapS=THREE.RepeatWrapping
floorNormalTexture.wrapS=THREE.RepeatWrapping
floorDisplacementTexture.wrapS=THREE.RepeatWrapping

roofColorTexture.wrapS=THREE.RepeatWrapping
roofARMTexture.wrapS=THREE.RepeatWrapping
roofNormalTexture.wrapS=THREE.RepeatWrapping

// wallColorTexture.wrapS=THREE.RepeatWrapping
// wallARMTexture.wrapS=THREE.RepeatWrapping
// wallNormalTexture.wrapS=THREE.RepeatWrapping

floorColorTexture.wrapT=THREE.RepeatWrapping
floorARMTexture.wrapT=THREE.RepeatWrapping
floorNormalTexture.wrapT=THREE.RepeatWrapping
floorDisplacementTexture.wrapT=THREE.RepeatWrapping

roofColorTexture.wrapT=THREE.RepeatWrapping
roofARMTexture.wrapT=THREE.RepeatWrapping
roofNormalTexture.wrapT=THREE.RepeatWrapping

// wallColorTexture.wrapT=THREE.RepeatWrapping
// wallARMTexture.wrapT=THREE.RepeatWrapping
// wallNormalTexture.wrapT=THREE.RepeatWrapping

const size={
    width:window.innerWidth,
    height:window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 1000);
camera.position.x=4
camera.position.z=10;
camera.position.y=2;
camera.lookAt(0,0,0);
scene.add(camera);


//floor
const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20,1000,1000), new THREE.MeshStandardMaterial({
        side:THREE.DoubleSide, 
        alphaMap:floorAlphaTexture, 
        transparent:true,
        map:floorColorTexture,
        aoMap:floorARMTexture,
        roughnessMap:floorARMTexture,
        metalnessMap:floorNormalTexture,
        normalMap:floorNormalTexture,
        displacementMap:floorDisplacementTexture,
        displacementScale:0.3,
        displacementBias:0
        // wireframe:true
    }));
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.receiveShadow = true;
scene.add(floorMesh);

//house creation
const house=new THREE.Group()
scene.add(house)

//walls for house
const walls=new THREE.Mesh(new THREE.BoxGeometry(4,2.5,4), new THREE.MeshStandardMaterial({
        map:wallColorTexture,
        aoMap:wallARMTexture,
        roughnessMap:wallARMTexture,
        metalnessMap:wallNormalTexture,
        normalMap:wallNormalTexture
        
    }))
walls.position.set(0,1.25,0)
walls.receiveShadow=true
walls.castShadow=true
house.add(walls)

//roof for house
const roof=new THREE.Mesh(new THREE.ConeGeometry(3.5,1.5,4), new THREE.MeshStandardMaterial({
        side:THREE.DoubleSide,
        // transparent:true,
        map:roofColorTexture,
        aoMap:roofARMTexture,
        roughnessMap:roofARMTexture,
        metalnessMap:roofNormalTexture,
        normalMap:roofNormalTexture,
        // displacementMap:roofDisplacementTexture,
        // displacementScale:0.3,
        // displacementBias:-0.15

    }))
roof.rotation.y=-Math.PI/4
roof.position.set(0,3.0,0)
roof.castShadow=true
house.add(roof)

//door for house
const door=new THREE.Mesh(new THREE.PlaneGeometry(2.2,2.2), new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    }))
door.position.set(0,1.1,2.001)
door.receiveShadow=true
house.add(door)

//bushes for house
const bushGeometry=new THREE.SphereGeometry(1,16,16)
const bushMaterial=new THREE.MeshStandardMaterial({
        color:'#ccffcc',
        map:bushesColorTexture,
        aoMap:bushesARMTexture,
        roughnessMap:bushesARMTexture,
        metalnessMap:bushesNormalTexture,
        normalMap:bushesNormalTexture
    })

const bush1=new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.setScalar(0.5)
bush1.position.set(0.8,0.2,2.2)

const bush2=new THREE.Mesh(bushGeometry, bushMaterial)
bush2.position.set(1.4,0.1,2.1)
bush2.scale.setScalar(0.2)

const bush3=new THREE.Mesh(bushGeometry, bushMaterial)  
bush3.position.set(-0.8,0.1,2.2)
bush3.scale.setScalar(0.3)

const bush4=new THREE.Mesh(bushGeometry, bushMaterial)  
bush4.position.set(-1.4,0.1,2.2)
bush4.scale.setScalar(0.4)
house.add(bush1, bush2, bush3, bush4)

//graves for house
const graveGeometry=new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial=new THREE.MeshStandardMaterial({
        map:graveColorTexture,
        aoMap:graveARMTexture,
        roughnessMap:graveARMTexture,
        metalnessMap:graveNormalTexture,
        normalMap:graveNormalTexture
    })

const graves=new THREE.Group()
scene.add(graves)

for(let i=0;i<30;i++){
    const grave=new THREE.Mesh(graveGeometry, graveMaterial)
    grave.castShadow=true
    grave.receiveShadow=true
    const angle= Math.random() * Math.PI * 2
    const radius=3+Math.random()*4
    const x=Math.sin(angle)*radius
    const z=Math.cos(angle)*radius
    grave.position.set(x,Math.random()*0.5,z)
    grave.rotation.x=(Math.random() -0.5)*0.4
    grave.rotation.z=(Math.random() -0.5)*0.4
    grave.rotation.y=(Math.random() -0.5)*0.4
    graves.add(grave)
}


const ambientLight = new THREE.AmbientLight('#86ddff', 0.275);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#86ddff', 1.5);
directionalLight.position.set(3,2,8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.right=8;

scene.add(directionalLight);

const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);

directionalLightHelper.visible = false;
scene.add(directionalLightHelper);


const doorLightColor={
    color:0xff7d46
}
const doorLight=new THREE.PointLight(doorLightColor.color, 10, 7)
doorLight.position.set(0,2.2,2.5)
doorLight.lookAt(0,0)
gui.add(doorLight, 'intensity').min(0).max(10).step(0.001).name('doorLightIntensity')
// gui.add(doorLightColor,'color').onChange((color)=>{
//     doorLight.color.set(color)
// })
scene.add(doorLight)

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


const renderer = new THREE.WebGLRenderer({
    canvas:canvas
});
renderer.shadowMap.enabled=true
renderer.shadowMap.type=THREE.PCFSoftShadowMap
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

const timer = new Timer();

const animate = () => {
    timer.update();
    const elapsed = timer.getElapsed();
    // console.log(elapsed)
    camera.lookAt(floorMesh.position);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();