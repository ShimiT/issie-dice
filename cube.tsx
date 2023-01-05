import React, { useCallback, useEffect, useState } from 'react';
import { Renderer, TextureLoader } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import CANNON, { Body, Box, Material, Plane, Vec3 } from 'cannon';
import { Pressable, ShadowPropTypesIOS, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useGlobalStore } from "react-native-global-store";

const START_POS = new CANNON.Vec3(0, -15, 7);
var getVelocity = (x: number = 0, y: number = 0, z: number = 0) => new CANNON.Vec3(x, y, z);
var getAngularVelocity = () => new CANNON.Vec3(Math.random() * 2, Math.random() * 2, Math.random() * 2);
const round = (num: number) => (Math.round(num * 100) / 100).toFixed(2);
var world, vCubes, camera,cubes, scene,renderer, numOfCubes, setNumOfCubes,cubeMaterial, prevNumOfCubes

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

function createCamera(gl: ExpoWebGLRenderingContext) {
    const camera = new PerspectiveCamera(
        100,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
    );

    //gl.canvas.width = gl.drawingBufferWidth;
    //gl.canvas.height = gl.drawingBufferHeight;

    camera.position.set(1, -15, 17);
    camera.quaternion.x = 0.1;
    camera.quaternion.z = 0.0;
    camera.quaternion.y = 0.0;

    return camera
}

function createCubes(loader: TextureLoader, numOfCubes: number) {

    const geometry = new BoxGeometry(3, 3, 3);
    const cubeMaterials = [
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice-six-faces-one.png')),
            transparent: false, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice-six-faces-two.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice-six-faces-three.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice-six-faces-four.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice-six-faces-five.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice-six-faces-six.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 1
        })];

    const cubes = [];

    for (let i = 1; i <= numOfCubes; i++) {
        var cube = new Mesh(geometry, cubeMaterials);
        cube.castShadow = true;
        cubes.push(cube);
    }

    return cubes
}

function createVCubes(cubeMaterial: CANNON.Material, numOfCubes: number): Array<CANNON.Body> {
    const cubeShape = new Box(new CANNON.Vec3(1, 1, 1));

    const vCubes = [];
    const pos = [-1, 1]
    for (let i = 1; i <= numOfCubes; i++) {
        var vCube = new Body({
            mass: 10, // kg
            position: new CANNON.Vec3(i * pos[(i - 1) % 2] * 5, -16, 7), // m
            shape: cubeShape,
            material: cubeMaterial,
            linearDamping: 0.1,
            velocity: getVelocity(0, 3, 5),
            angularVelocity: getAngularVelocity(),
        });
        vCubes.push(vCube);
    }

    return vCubes
}

function createLights() {
    const dirLight = new DirectionalLight(0xffffff);
    const hemiLight = new HemisphereLight(0xffffff, 0x444444);

    hemiLight.position.set(0, 20, 0);
    dirLight.position.set(0, -5, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = - 20;
    dirLight.shadow.camera.left = - 20;
    dirLight.shadow.camera.right = 20;
    //dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 50;

    return [hemiLight, dirLight]
}

function renderItMyMan(world, vCubes, camera,gl, cubes, scene,renderer) {
   
    //cubes = createCubes(loader, numOfCubes)
        // add cube to scene
        for (let i = 0; i < cubes.length; i++) {
            scene.add(cubes[i]);
        }

        world2 = new CANNON.World();
        world2.gravity = world.gravity
        world2.broadphase = world.broadphase
        world2.addBody(groundBody);


        vCubes = createVCubes(cubeMaterial, numOfCubes)

        for (let i = 0; i < vCubes.length; i++) {
            world.addBody(vCubes[i]);
        }

        //setStateCubes(vCubes);
    const render = () => {
        requestAnimationFrame(render);

        // progress in the "world"
        world.step(1 / 30);


        // update opengl cube with virtual cube
        for (let i = 0; i < vCubes.length; i++) {
            cubes[i].position.copy(vCubes[i].position as any);
            cubes[i].quaternion.copy(vCubes[i].quaternion as any);
        }

        renderer.render(scene, camera);

        gl.endFrameEXP();
        
    };
    render();

}

function Cube(props: any) {
    const [loader] = useState(new TextureLoader())
    var [vCubeState, setStateCubes] = useState<CANNON.Body[]>([])
    const [stateCamera, setStateCamera] = useState<PerspectiveCamera | undefined>(undefined);
    const [reload, setReload] = useState<number>(0);
    const [camPosition, setCamPosition] = useState<any>({ x: 0, y: 0, z: 0 });
    const [globalState, setGlobalState] = useGlobalStore();
    const [gl2, setGL2] = useState(0);
    [numOfCubes, setNumOfCubes] = useState(globalState.count);

    const [glkey, setGLKey] = useState(0);

    

    const updateCameraPosition = useCallback((field: "x" | "y" | "z", value: number) => {
        if (stateCamera) {
            stateCamera.position[field] = value;
            setReload(prev => prev + 1);
        }
    }, [stateCamera]);
    useEffect(() => {
        if (stateCamera) {
            setCamPosition({ x: round(stateCamera.position.x), y: round(stateCamera.position.y), z: round(stateCamera.position.z) })
        }

        console.log("state" + globalState.count)
    }, [stateCamera, reload]);

    useEffect(() => {
        console.log(globalState.count)
        if (numOfCubes != globalState.count) {
            console.log('in oif')
            prevNumOfCubes = numOfCubes
            setNumOfCubes(globalState.count)
            // setGLKey(glkey + 1)
            // onContextCreate(gl2)
            console.log('in oif')
        }
    })

    // const forceUpdate = React.useCallback(() => updateState({}), [globalState.count]);

    const onContextCreate = async (gl: any) => {
        setGL2(gl)
        scene = new Scene();
        camera = createCamera(gl)

        setStateCamera(camera);

         renderer = new Renderer({ gl });
        renderer.shadowMap.enabled = true;

        // set size of buffer to be equal to drawing buffer width
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        console.log("create cube with num: " + numOfCubes)
        cubes = createCubes(loader, numOfCubes)
        // add cube to scene
        for (let i = 0; i < numOfCubes; i++) {
            scene.add(cubes[i]);
        }

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

        var [hemiLight, dirLight] = createLights()

        scene.add(hemiLight);
        scene.add(dirLight);
        scene.add(plane);

        // var shadowHelper = new CameraHelper(dirLight.shadow.camera);
        // scene.add(shadowHelper);

        // const axesHelper = new AxesHelper(15);
        // axesHelper.setColors(new Color("green"), new Color("blue"), new Color("red"))
        // scene.add(axesHelper);
        // ****** virtual world for gravity and movement
        // Add virtual world with gravity

         world = new CANNON.World();
        world.gravity.set(0, 0, -9.82);
        world.broadphase = new CANNON.NaiveBroadphase();

        // Create a ground
        var groundMaterial = new Material("ground");
        var groundShape = new Plane();
        groundBody = new Body({ mass: 0, material: groundMaterial, shape: groundShape });
        groundBody.position.z = -0.5;
        world.addBody(groundBody);

        // create virtual cubes
         cubeMaterial = new CANNON.Material("cube");
         vCubes = createVCubes(cubeMaterial, numOfCubes)

        for (let i = 0; i < numOfCubes; i++) {
            world.addBody(vCubes[i]);
        }

        setStateCubes(vCubes);

        // Create contact material behaviour
        var cube_ground_mat = new CANNON.ContactMaterial(groundMaterial, cubeMaterial, { friction: 0.1, restitution: 0.7 });
        world.addContactMaterial(cube_ground_mat);

        renderItMyMan(world, vCubes, camera,gl,cubes, scene,renderer)

        // call render
        
        console.log(vCubes[0])
        console.log(vCubes[1])
        console.log(vCubes[2])
        // } 
        // catch (error) {
        //     console.log("--------"+error)
        // }
    };

    return (
        <View style={styles.main}>
            {/* <View style={styles.slidersWrapper}>
                <View style={styles.sliderWrapper}>
                    <Text>X : {camPosition.x}</Text><Slider style={styles.slider} minimumValue={-10} maximumValue={10}
                        value={stateCamera?.position.x}
                        onValueChange={(value) => updateCameraPosition("x", value)} />
                </View>
                <View style={styles.sliderWrapper}>
                    <Text>Y: {camPosition.y}</Text><Slider style={styles.slider} minimumValue={-10} maximumValue={10}
                        onValueChange={(value) => updateCameraPosition("y", value)}
                        value={stateCamera?.position.y}
                    />
                </View>
                <View style={styles.sliderWrapper}>
                    <Text>Z: {camPosition.z}</Text><Slider style={styles.slider} minimumValue={0} maximumValue={30}
                        onValueChange={(value) => updateCameraPosition("z", value)}
                        value={stateCamera?.position.z}
                    />
                </View>
            </View> */}
            <Pressable
                style={{
                    width: window.innerWidth - 80,
                    height: window.innerHeight - 40,
                    //paddingBottom: 150,
                    //top: 40
                }}
                
                onPress={() => {
                    for (let i = 0; i < numOfCubes; i++) {
                        //var ex = Math.random() < 0.5 ? -1 : 1;
                        var res = (Math.random() * 12) + 2
                        var angVel = Math.random() * 10
                        const pos = [-1, 1]
                        vCubes[i].position = new CANNON.Vec3((i + 1) * pos[i % 2] * 5, -16, 7)
                        vCubes[i].velocity = getVelocity(0, 3, 5);
                        vCubes[i].angularVelocity = new CANNON.Vec3(angVel, angVel, angVel);
                        
                    }
                    if (prevNumOfCubes > numOfCubes) {
                        for (let i = prevNumOfCubes - 1; i >= numOfCubes; i--) {

                            console.log(vCubes[i].position)
                            console.log(prevNumOfCubes)
                            console.log(numOfCubes)
                            console.log('ssss')
                            vCubes[i].position = new CANNON.Vec3(-100, -100, -100)
                        }
                    }
                    setStateCubes(vCubeState);

                    cubeMaterial = new CANNON.Material("cube");
                    vCubes = createVCubes(cubeMaterial, numOfCubes)

                    renderItMyMan(world, vCubes, camera,gl2,cubes, scene,renderer)
                }} >
                <GLView style={{
                    width: "100%",
                    height: "100%",
                    top: 40,
                }}
                    onContextCreate={onContextCreate}
                />
            </Pressable>
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