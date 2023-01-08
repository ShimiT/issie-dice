import React, { useCallback, useEffect, useState } from 'react';
import { Renderer, TextureLoader } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import CANNON, { Body, Box, Material, Plane, Vec3, World } from 'cannon';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';


var getVelocity = (x: number = 0, y: number = 0, z: number = 0) =>
  new CANNON.Vec3(x, y, z);
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
  Vector3,
  FrontSide,
  BackSide
} from 'three';

function createCamera(gl: ExpoWebGLRenderingContext) {
  const camera = new PerspectiveCamera(
    100,
    gl.drawingBufferWidth / gl.drawingBufferHeight,
    0.1,
    1000
  );

  camera.position.set(0, -15, 17);
  camera.quaternion.x = 0.1;
  camera.quaternion.z = 0.0;
  camera.quaternion.y = 0.0;

  return camera;
}

export interface CubeFace {
  // path to an image
  image: string;
  opacity: number;
  reflectivity: number;
  isTransparent: boolean;
}

interface CubeProps {
  numOfCubes: number;
  faces: CubeFace[];
  surfaceBackground: string;
  cuebesSize: number;
}

const Cube = (props: CubeProps) => {
  const [loader] = useState(new TextureLoader());
  const [vCubeState, setStateCubes] = useState<CANNON.Body[]>([]);
  const [stateCamera, setStateCamera] = useState<PerspectiveCamera | undefined>(
    undefined
  );
  const [reload, setReload] = useState<number>(0);
  const [camPosition, setCamPosition] = useState<any>({ x: 0, y: 0, z: 0 });

  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../assets/rolling.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const updateCameraPosition = useCallback(
    (field: 'x' | 'y' | 'z', value: number) => {
      if (stateCamera) {
        stateCamera.position[field] = value;
        setReload((prev) => prev + 1);
      }
    },
    [stateCamera]
  );

  const createLights = () => {
    const dirLight = new DirectionalLight(0xffffff);
    const hemiLight = new HemisphereLight(0xffffff, 0x444444);

    hemiLight.position.set(0, 0, -10);
    dirLight.position.set(0, 0, 1);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    // dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 50;

    return [hemiLight, dirLight];
  };

  useEffect(() => {
    if (stateCamera) {
      setCamPosition({
        x: round(stateCamera.position.x),
        y: round(stateCamera.position.y),
        z: round(stateCamera.position.z)
      });
    }
  }, [stateCamera, reload]);

  const addAWall = (
    world: World,
    scene: Scene,
    width: number,
    height: number,
    material: MeshBasicMaterial,
    pos: Vector3,
    quaternion: Vector3,
    cubesMaterial: Material
  ) => {
    //visual
    //const w1 = new PlaneGeometry(width, height);
    const w1 = new BoxGeometry(width, height, 0.1);
    const wall = new Mesh(w1, material);
    wall.position.copy(pos);
    wall.rotation.set(quaternion.x, quaternion.y, quaternion.z);
    scene.add(wall);

    // virtual
    const wallMat1 = new Material('w' + Math.random());
    wallMat1.restitution = 0;
    wallMat1.friction = 1;
    const wallShape = new Plane();
    const wallBody = new Body({
      mass: 0,
      material: wallMat1,
      shape: wallShape,
      linearDamping: 0.1
    });
    wallBody.position.set(pos.x, pos.y, pos.z);
    wallBody.quaternion.set(quaternion.x, quaternion.y, quaternion.z, 1);
    world.addBody(wallBody);

    if (cubesMaterial) {
      const m1 = new CANNON.ContactMaterial(wallMat1, cubesMaterial, {
        friction: 0.1,
        restitution: 0
      });
      world.addContactMaterial(m1);
    }
  };

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const scene = new Scene();
    const camera = createCamera(gl);

    setStateCamera(camera);

    const renderer = new Renderer({
      gl
    });
    renderer.shadowMap.enabled = true;

    // set size of buffer to be equal to drawing buffer width
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // renderer.setSize(window.innerWidth, window.innerHeight);

    // var cubes = createCubes(loader, numOfCubes);
    const cubeMaterials = props.faces.map(
      (face) =>
        new MeshBasicMaterial({
          // color: 0xff0000,
          map: new TextureLoader().load(face.image),
          transparent: face.isTransparent,
          opacity: face.opacity,
          side: DoubleSide,
          reflectivity: 0
        })
    );

    // create cubes based on num of cubes and cube materials
    const cubes: Mesh[] = [];
    for (let i = 0; i < props.numOfCubes; i++) {
      const cube = new Mesh(
        new BoxGeometry(props.cuebesSize, props.cuebesSize, props.cuebesSize),
        cubeMaterials
      );
      cube.castShadow = true;
      cubes.push(cube);
    }

    // add cube to scene
    for (let i = 0; i < cubes.length; i++) {
      scene.add(cubes[i]);
    }

    scene.background = new Color(0xa0a0a0);
    scene.fog = new Fog(0xa0a0a0, 10, 50);

    // Add visual ground:
    const visGround = new PlaneGeometry(32, 58);
    const visGrMatereal = new MeshPhongMaterial({
      map: loader.load(props.surfaceBackground),
      shininess: 0,
      opacity: 1,
      fog: false
    });

    const plane = new Mesh(visGround, visGrMatereal);
    plane.receiveShadow = true;

    var [hemiLight, dirLight] = createLights();

    scene.add(hemiLight);
    scene.add(dirLight);
    scene.add(plane);

    const world = new CANNON.World();
    world.gravity.set(0, 0, -9.82);
    world.broadphase = new CANNON.NaiveBroadphase();

    // Create a ground
    const groundMaterial = new Material('ground');
    const groundShape = new Plane();
    const groundBody = new Body({
      mass: 0,
      material: groundMaterial,
      shape: groundShape
    });
    groundBody.position.z = 1;
    world.addBody(groundBody);

    const vCubes: Body[] = [];

    const cubeMaterial: CANNON.Material = new CANNON.Material('cube');

    for (let i = 0; i < props.numOfCubes; i++) {
      const pos = [-1, 1];
      const body = new Body({
        mass: 10,
        position: new CANNON.Vec3(i * pos[(i - 1) % 2] * 5, -16, 7),
        shape: new Box(new CANNON.Vec3(1, 1, 1)),
        material: cubeMaterial,
        linearDamping: 0.1,
        velocity: new CANNON.Vec3(0, 3, 5),
        angularVelocity: new CANNON.Vec3(
          Math.random() * 2,
          Math.random() * 2,
          Math.random() * 2
        )
      });
      // add cube body to vCubes array
      vCubes.push(body);

      // add body to work object
      world.addBody(body);
    }

    setStateCubes(vCubes);

    // Create contact material behaviour
    var cube_ground_mat = new CANNON.ContactMaterial(
      groundMaterial,
      cubeMaterial,
      { friction: 0.1, restitution: 0.7 }
    );
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

    // addAWall(world, scene, 100, 5,
    //   new MeshBasicMaterial({ color: 0x00ffff, opacity: 0.8, side: DoubleSide }), new Vector3(0, -16, 7), new Vector3(_90deg, 0, 0),
    //   cubeMaterial)

    // addAWall(
    //   world,
    //   scene,
    //   100,
    //   1,
    //   new MeshBasicMaterial({
    //     opacity: 1,
    //     side: DoubleSide
    //   }),
    //   new Vector3(0, 15, 0),
    //   new Vector3(Math.PI / 2, 0, 0),
    //   cubeMaterial
    // );

    // call render
    render();
  };

  return (
    <View style={styles.main}>
      <Pressable
        style={{
          width: '100%',
          height: '100%'
        }}
        onPress={() => {
          for (let i = 0; i < vCubeState.length; i++) {
            var res = Math.random() * 12 + 2;
            var angVel = Math.random() * 10;
            const pos = [-1, 1];
            vCubeState[i].position = new CANNON.Vec3(
              (i + 1) * pos[i % 2],
              -16,
              7
            );
            vCubeState[i].velocity = getVelocity(0, 0, 2);
            vCubeState[i].angularVelocity = new CANNON.Vec3(
              angVel,
              angVel,
              angVel
            );
          }
          playSound()
        }}
      >
        <GLView
          style={{
            width: '100%',
            height: '100%'
          }}
          onContextCreate={onContextCreate}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center'
  },
  slidersWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 35,
    width: '100%'
  },
  sliderWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 15,
    width: 100
  },

  slider: {
    width: 80
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
    margin: 3
  }
});

export default Cube;
