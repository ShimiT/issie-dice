import React, { useState } from 'react';
import { View } from 'react-native';
import Expo from 'expo';
import ExpoTHREE, { Renderer, TextureLoader } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';

import {
    Scene,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    BoxGeometry,
    DoubleSide,
} from "three";
function Cube(props: any) {

    const [loader] = useState(new TextureLoader())
    const onContextCreate = async (gl: any) => {
        // three.js implementation.
        const scene = new Scene();
        const camera = new PerspectiveCamera(
            75,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            1000
        );
        gl.canvas = {
            width: gl.drawingBufferWidth,
            height: gl.drawingBufferHeight,
        };

        // set camera position away from cube
        camera.position.z = 2;

        const renderer = new Renderer({ gl });
        // set size of buffer to be equal to drawing buffer width
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        // create cube
        // define geometry
        const geometry = new BoxGeometry(2, 1, 1);
        var cubeMaterials = [
            new MeshBasicMaterial({
                //color:0xff0000, 
                map: loader.load(require('./profile-pic.png')),
                transparent: true, opacity: 0.8, side: DoubleSide
            }),


            new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8, side: DoubleSide }),
            new MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.8, side: DoubleSide }),
            new MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.8, side: DoubleSide }),
            new MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.8, side: DoubleSide }),
            new MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8, side: DoubleSide })];

        const cube = new Mesh(geometry, cubeMaterials);

        // add cube to scene
        scene.add(cube);

        // create render function
        const render = () => {
            requestAnimationFrame(render);
            // create rotate functionality
            // rotate around x axis
            cube.rotation.x += 0.01;

            // rotate around y axis
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
            gl.endFrameEXP();
        };

        // call render
        render();
    };

    return (
        <GLView style={{ width: 500, height: 500 }}
            onContextCreate={onContextCreate}
        />
    )
}

export default Cube;