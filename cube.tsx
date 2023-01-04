import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { Renderer, TextureLoader } from 'expo-three';
import { GLView } from 'expo-gl';
import CANNON from 'cannon';


import {
    Scene,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    BoxGeometry,
    DoubleSide,
    MeshPhysicalMaterial,
    PlaneGeometry,
    DirectionalLight,
    SpotLight,
    AxesHelper,
    Color,
} from "three";

function Cube(props: any) {
    
    const [loader] = useState(new TextureLoader())
    const [vec,setVec]= useState({x:0,y:-15,z:7})
    const [stateCube, setStateCube] = useState<any>(undefined);
    var vCube : any
    var render : any
    useEffect(()=>{console.log(vCube.position); setVec(vCube.position)}, [])

    const onContextCreate = async (gl: any) => {
        // three.js implementation.
        const scene = new Scene();
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


        // light:
        // const directionalLight = new DirectionalLight( 0xffffff, 0.5 );
        // directionalLight.castShadow = true;
        // //directionalLight.position = new Vec3(5, 3, -2)
        // scene.add( directionalLight );
        // const spotLight = new SpotLight(0xffffff);
        // spotLight.position.set(5, 3, 0);

        // spotLight.castShadow = true;



        const renderer = new Renderer({ gl });
        // set size of buffer to be equal to drawing buffer width
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        // create cube
        // define geometry
        const geometry = new BoxGeometry(1, 1, 1);
        var cubeMaterials = [
            new MeshBasicMaterial({
                color: 0xff0000,
                //map: loader.load(require('./splash.png')),
                transparent: true, opacity: 0.8, side: DoubleSide
            }),


            new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8, side: DoubleSide }),
            new MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.8, side: DoubleSide }),
            new MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.8, side: DoubleSide }),
            new MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.8, side: DoubleSide }),
            new MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8, side: DoubleSide })];

        const cube = new Mesh(geometry, cubeMaterials);

        // Add virtual world with gravity
        const world = new CANNON.World();
        world.gravity.set(0, 0, -9.82);
        world.broadphase = new CANNON.NaiveBroadphase();

        // Create a groud
        var groundMaterial = new CANNON.Material("ground");
        var groundShape = new CANNON.Plane();
        var groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
        groundBody.addShape(groundShape);
        world.addBody(groundBody);

        // create virtual cube
        const cubeMaterial = new CANNON.Material("cube");
        vCube = new CANNON.Body({
            mass: 10, // kg
            position: new CANNON.Vec3(vec.x, vec.y, vec.z), // m
            shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
            material: cubeMaterial,
            linearDamping: 0.1,
            //angularDamping: 0.02,
            // y  <(-) ---(+) >
            velocity: new CANNON.Vec3(0, 12, 0),
            angularVelocity: new CANNON.Vec3(Math.random() * 2, Math.random() * 2, Math.random() * 2),


        });
        
        setStateCube(vCube);

        world.addBody(vCube);

        // Create contact material behaviour
        var cube_ground_mat = new CANNON.ContactMaterial(groundMaterial, cubeMaterial, { friction: 0.1, restitution: 0.7 });
        world.addContactMaterial(cube_ground_mat);

        // add cube to scene
        scene.add(cube);

        // Add visual ground:
        const visGround = new PlaneGeometry(25, 25);
        const visGrMatereal = new MeshBasicMaterial({ color: 0xfff1a0, side: DoubleSide });
        const plane = new Mesh(visGround, visGrMatereal);
        //plane.position.x = 2;
        //plane.quaternion.y = .5  ;
        //scene.add(plane);

        // const axesHelper = new AxesHelper(15);
        // axesHelper.setColors(new Color("green"), new Color("blue"), new Color("red"))
        // scene.add(axesHelper);

        render = () => {
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
        <Pressable style={{ height: "100%", width: "100%" }} onPress={() => {
            console.log('clicked');
            console.log(vec);
            stateCube.position = vec;
            var ex = Math.random() < 0.5 ? -1 : 1;
            var mul = Math.random() * 12
            stateCube.velocity= new CANNON.Vec3(mul * ex, 0, mul * ex);
            stateCube.angularVelocity= new CANNON.Vec3(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        } }>
            <GLView style={{ width: window.innerWidth, height: window.innerHeight - 20 }}
            onContextCreate={onContextCreate} />
        </Pressable>
    )
    
}

export default Cube;