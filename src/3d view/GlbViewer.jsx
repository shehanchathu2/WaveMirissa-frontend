import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Environment, ContactShadows } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  if (!scene) return null;
  return <primitive object={scene} scale={1.5} />;
}

const GlbViewer = ({ url }) => {
  if (!url) return <p>No model to display</p>;

  return (
    <div
      style={{ width: "100%", height: "500px" }}
      className="bg-gradient-to-b from-gray-100 to-gray-300 rounded-xl shadow-xl overflow-hidden relative"
    >
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }} className="w-full h-full">
        {/* Improved lighting setup */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        <Suspense
          fallback={
            <Html center>
              <div className="flex items-center justify-center w-full h-full text-gray-700">
                Loading 3D Model...
              </div>
            </Html>
          }
        >
          <Model url={url} />
          {/* Add environment and shadows */}
          <Environment preset="studio" />
          <ContactShadows
            opacity={0.5}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color="#000000"
          />
        </Suspense>

        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
};

export default GlbViewer;
