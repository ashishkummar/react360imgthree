import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const style = {
  height: 650
};

class View360Three extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.

  addCustomSceneObjects = () => {
    const texture = new THREE.TextureLoader().load(this.props.image);

    const material = new THREE.MeshBasicMaterial({ map: texture });

    var geometry = new THREE.SphereBufferGeometry(600, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    this.cube = new THREE.Mesh(geometry, material);

    //const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);
  };

  startAnimationLoop = () => {
    //this.cube.rotation.x += 0.01;
    if (this.props.autoRotate == "true") {
      this.cube.rotation.y += 0.0009;
    }

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return (
      <div
        style={{
          width: Number(this.props.width),
          height: Number(this.props.height)
        }}
        ref={ref => (this.el = ref)}
      />
    );
  }
}

 

export default View360Three;
