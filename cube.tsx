import React, { useCallback, useEffect, useState } from 'react';
import { Renderer, TextureLoader } from 'expo-three';
import { GLView } from 'expo-gl';
import CANNON, { Body, Box, Material, Plane, Vec3 } from 'cannon';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

const START_POS = new CANNON.Vec3(0, -15, 7);
const getVelocity = () => new CANNON.Vec3(0, 12, 0);
const getAngularVelocity = () => new CANNON.Vec3(Math.random() * 2, Math.random() * 2, Math.random() * 2);
const round = (num:number)=>(Math.round(num * 100) / 100).toFixed(2);
import {
    Scene,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    BoxGeometry,
    DoubleSide,
    PlaneGeometry,
    DirectionalLight,
    AxesHelper,
    Color,
    CameraHelper,
    HemisphereLight,
    MeshPhongMaterial,
    Fog,
} from "three";

function Cube(props: any) {
    
    const [loader] = useState(new TextureLoader())
    const [vec,setVec]= useState({x:0,y:-15,z:7})
    const [stateCube, setStateCube] = useState<any>(undefined);
    var vCube : any
    var render : any
    useEffect(()=>{console.log(vCube.position); setVec(vCube.position)}, [])
    const [stateCamera, setStateCamera] = useState<PerspectiveCamera | undefined>(undefined);
    const [reload, setReload] = useState<number>(0);
    const [camPosition, setCamPosition] = useState<any>({x:0,y:0,z:0});

    const updateCameraPosition = useCallback((field:"x" | "y" | "z", value:number)=> {
        if (stateCamera) {
            stateCamera.position[field] = value;
            setReload(prev=>prev+1);
        }
    }, [stateCamera]);

    useEffect(()=>{
        if (stateCamera) {
            setCamPosition({x:round(stateCamera.position.x), y:round(stateCamera.position.y), z:round(stateCamera.position.z)})
        }
    }, [stateCamera, reload]);

    const onContextCreate = async (gl: any) => {
        // three.js implementation.
        const scene = new Scene();
        // Camera
        // *******
        const camera = new PerspectiveCamera(
            75,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            1000
        );

        gl.canvas.width = gl.drawingBufferWidth;
        gl.canvas.height=  gl.drawingBufferHeight;

        // set camera position away from cube
        //camera.position.set(1,-17,8);
        //camera.quaternion.x = 0.6;
        //camera.quaternion.z = 0.1;

        camera.position.set(1, -7, 10);
        camera.quaternion.x = 0.4;
        camera.quaternion.z = 0.1;

        setStateCamera(camera);

        const renderer = new Renderer({ gl });
        renderer.shadowMap.enabled = true;

        // set size of buffer to be equal to drawing buffer width
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        // create cube
        // define geometry
        const geometry = new BoxGeometry(1, 1, 1);
        var cubeMaterials = [
            new MeshBasicMaterial({
                //color: 0xff0000,
                //map: loader.load(require('./splash.png')),
                //transparent: true, opacity: 0.8, side: DoubleSide
                map: loader.load(require('./assets/dice1.svg')),
                transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
            }),
            new MeshBasicMaterial({
                // color: 0xff0000,
                map: loader.load(require('./assets/dice2.svg')),
                transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
            }),
            new MeshBasicMaterial({
                // color: 0xff0000,
                map: loader.load(require('./assets/dice3.svg')),
                transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
            }),
            new MeshBasicMaterial({
                // color: 0xff0000,
                map: loader.load(require('./assets/dice4.svg')),
                transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
            }),
            new MeshBasicMaterial({
                // color: 0xff0000,
                map: loader.load(require('./assets/dice5.svg')),
                transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
            }),
            new MeshBasicMaterial({
                // color: 0xff0000,
                map: loader.load(require('./assets/dice6.svg')),
                transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
            })];


        // new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8, side: DoubleSide }),
        // new MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.8, side: DoubleSide }),
        // new MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.8, side: DoubleSide }),
        // new MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.8, side: DoubleSide }),
        // new MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8, side: DoubleSide })];

        const cube = new Mesh(geometry, cubeMaterials);
        cube.castShadow = true;

        // add cube to scene
        scene.add(cube);

        scene.background = new Color(0xa0a0a0);
        scene.fog = new Fog(0xa0a0a0, 10, 50);

        // Add visual ground:
        const visGround = new PlaneGeometry(100, 100);
        const visGrMatereal = new MeshPhongMaterial({
            // color: 0x999999 
            map: loader.load(require('./assets/background.png'))
        });
        const plane = new Mesh(visGround, visGrMatereal);
        plane.receiveShadow = true;

        const hemiLight = new HemisphereLight(0xffffff, 0x444444);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        const dirLight = new DirectionalLight(0xffffff);
        dirLight.position.set(0, -5, 10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 20;
        dirLight.shadow.camera.bottom = - 20;
        dirLight.shadow.camera.left = - 20;
        dirLight.shadow.camera.right = 20;
        //dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 50;
        scene.add(dirLight);
        scene.add(plane);

        // var shadowHelper = new CameraHelper(dirLight.shadow.camera);
        // scene.add(shadowHelper);

        // const axesHelper = new AxesHelper(15);
        // axesHelper.setColors(new Color("green"), new Color("blue"), new Color("red"))
        // scene.add(axesHelper);
        // ****** virtual world for gravity and movement
        // Add virtual world with gravity

        const world = new CANNON.World();
        world.gravity.set(0, 0, -9.82);
        world.broadphase = new CANNON.NaiveBroadphase();

        // Create a groud
        var groundMaterial = new Material("ground");
        var groundShape = new Plane();
        var groundBody = new Body({ mass: 0, material: groundMaterial, shape: groundShape });
        groundBody.position.z = -0.5;
        world.addBody(groundBody);

        // create virtual cube
        const cubeMaterial = new CANNON.Material("cube");
        vCube = new CANNON.Body({
            mass: 10, // kg
            position: new CANNON.Vec3(vec.x, vec.y, vec.z), // m
            shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
            material: cubeMaterial,
            linearDamping: 0.1,
            velocity: getVelocity(),
            angularVelocity: getAngularVelocity(),
        });
        
        setStateCube(vCube);

        world.addBody(vCube);

        // Create contact material behaviour
        var cube_ground_mat = new CANNON.ContactMaterial(groundMaterial, cubeMaterial, { friction: 0.1, restitution: 0.7 });
        world.addContactMaterial(cube_ground_mat);

        const render = () => {
            requestAnimationFrame(render);

            // // progress in the "world"
             world.step(1 / 40);

            // update opengl cube with virtual cube
            cube.position.copy(vCube.position as any);
            cube.quaternion.copy(vCube.quaternion as any);
            //setVec(vCube.getWorldPosition)


            renderer.render(scene, camera);
             gl.endFrameEXP();
        };

        //setTimeout(()=>{setVec(cube.position)}, 5000)
        // call render
        render();
        console.log('ss')
        //setVec(vCube.position)
    };

    console.log(vec)
    return (
        <View style={styles.main}>
            {/* <Pressable
        style={styles.button}
        onPress={() => {
            stateCube.position = START_POS.clone();
            stateCube.velocity = getVelocity();
            stateCube.angularVelocity = new CANNON.Vec3(Math.random() * 2, Math.random() * 2, Math.random() * 2);

        }} >Rethrow
    </Pressable>*/}
            <Pressable
                style={styles.button}
                onPress={() => props.onBack()}>Back
            </Pressable>
            <View>
                <Pressable>
                    <GLView style={{
                        width: window.innerWidth - 40,
                        height: window.innerHeight - 80,
                        top: 40
                    }}
                        onContextCreate={onContextCreate} />
                </Pressable>
            </View>
            <View style={styles.slidersWrapper}>
                <View style={styles.sliderWrapper}>
                    <Text>X : {camPosition.x}</Text><Slider style={styles.slider} minimumValue={-10} maximumValue={10}
                        value={stateCamera?.position.x}
                        onValueChange={(value) => updateCameraPosition("x", value)} />
                </View>
                <View style={styles.sliderWrapper}>
                    <Text>Y: {camPosition.y}</Text><Slider style={styles.slider} minimumValue={-10} maximumValue={10}
                        value={stateCamera?.position.y}
                        onValueChange={(value) => updateCameraPosition("y", value)} />
                </View>
                <View style={styles.sliderWrapper}>
                    <Text>Z: {camPosition.z}</Text><Slider style={styles.slider} minimumValue={0} maximumValue={15}
                        value={stateCamera?.position.z}
                        onValueChange={(value) => updateCameraPosition("z", value)} />
                </View>
            </View>
        </View >
    )
    
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center"
    },
    slidersWrapper: {
        flex: 1,
        flexDirection: "row",
        height: 35,
        width: "100%"
    },
    sliderWrapper: {
        flex: 1,
        flexDirection: "row",
        height: 15,
        width: 100,
    },

    slider: {
        width: 80,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'gray',
        fontSize: 24,
        width: 150,
        margin: 3,
    },
});

export default Cube;