import React, { useCallback, useEffect, useState } from 'react';
import { Renderer, TextureLoader } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import CANNON, { Body, Box, Material, Plane, Vec3 } from 'cannon';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useGlobalStore } from "react-native-global-store";

const START_POS = new CANNON.Vec3(0, -15, 7);
var getVelocity = (x: number = 0, y: number = 0, z: number = 0) => new CANNON.Vec3(x, y, z);
var getAngularVelocity = () => new CANNON.Vec3(Math.random() * 2, Math.random() * 2, Math.random() * 2);
const round = (num: number) => (Math.round(num * 100) / 100).toFixed(2);

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
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
    );

    gl.canvas.width = gl.drawingBufferWidth;
    gl.canvas.height = gl.drawingBufferHeight;

    camera.position.set(1, -15, 10);
    camera.quaternion.x = 0.4;
    camera.quaternion.z = 0.1;

    return camera
}

function createCubes(loader: TextureLoader, numOfCubes: number) {

    const geometry = new BoxGeometry(1, 1, 1);
    const cubeMaterials = [
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice1.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice2.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice3.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice4.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice5.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
        }),
        new MeshBasicMaterial({
            // color: 0xff0000,
            map: loader.load(require('./assets/dice6.png')),
            transparent: true, opacity: 1, side: DoubleSide, reflectivity: 0
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
    for (let i = 1; i <= numOfCubes; i++) {
        var vCube = new Body({
            mass: 10, // kg
            position: new CANNON.Vec3(i * 2, -15, 7), // m
            shape: cubeShape,
            material: cubeMaterial,
            linearDamping: 0.1,
            velocity: getVelocity(0, 10, 0),
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

function Cube(props: any) {
    const [loader] = useState(new TextureLoader())
    const [vCubeState, setStateCubes] = useState<CANNON.Body[]>([])
    const [stateCamera, setStateCamera] = useState<PerspectiveCamera | undefined>(undefined);
    const [reload, setReload] = useState<number>(0);
    const [camPosition, setCamPosition] = useState<any>({ x: 0, y: 0, z: 0 });
    const [globalState, setGlobalState] = useGlobalStore();

    const [numOfCubes, setNumOfCubes] = useState(globalState.count);

    const [glkey, setGLKey] = useState(0);

    const [gl2, setGL2] = useState(0);

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
        if (numOfCubes != globalState.count) {
            setNumOfCubes(globalState.count)
            setGLKey(glkey + 1)
            onContextCreate(gl2)
        }

        console.log("state" + globalState.count)
    }, [stateCamera, reload]);

    // const forceUpdate = React.useCallback(() => updateState({}), [globalState.count]);

    const onContextCreate = async (gl: any) => {
        setGL2(gl)
        const scene = new Scene();
        const camera = createCamera(gl)

        setStateCamera(camera);

        const renderer = new Renderer({ gl });
        renderer.shadowMap.enabled = true;

        // set size of buffer to be equal to drawing buffer width
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        console.log("create cube with num: " + numOfCubes)
        var cubes = createCubes(loader, numOfCubes)
        // add cube to scene
        for (let i = 0; i < cubes.length; i++) {
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

        const world = new CANNON.World();
        world.gravity.set(0, 0, -9.82);
        world.broadphase = new CANNON.NaiveBroadphase();

        // Create a ground
        var groundMaterial = new Material("ground");
        var groundShape = new Plane();
        var groundBody = new Body({ mass: 0, material: groundMaterial, shape: groundShape });
        groundBody.position.z = -0.5;
        world.addBody(groundBody);

        // create virtual cubes
        const cubeMaterial = new CANNON.Material("cube");
        var vCubes = createVCubes(cubeMaterial, numOfCubes)

        for (let i = 0; i < vCubes.length; i++) {
            world.addBody(vCubes[i]);
        }

        setStateCubes(vCubes);

        // Create contact material behaviour
        var cube_ground_mat = new CANNON.ContactMaterial(groundMaterial, cubeMaterial, { friction: 0.1, restitution: 0.7 });
        world.addContactMaterial(cube_ground_mat);

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

        // call render
        render();
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
            <View style={styles.slidersWrapper}>
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
            </View>
            <Pressable
                style={{
                    width: window.innerWidth - 40,
                    height: window.innerHeight - 80,
                    top: 40,
                }}
                onPress={() => {
                    for (let i = 0; i < vCubeState.length; i++) {
                        var ex = Math.random() < 0.5 ? -1 : 1;
                        var res = (Math.random() * 12) * ex
                        var angVel = Math.random() * 10
                        vCubeState[i].velocity = getVelocity(res, 0, res);
                        vCubeState[i].angularVelocity = new CANNON.Vec3(angVel, angVel, angVel);
                    }
                }} >
                <GLView style={{
                    width: "100%",
                    height: "100%",
                    top: 40,
                }}
                    key={glkey}
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