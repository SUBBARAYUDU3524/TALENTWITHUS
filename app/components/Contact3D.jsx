import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html, OrbitControls } from "@react-three/drei";

// Dummy chat data
const chatMessages = [
  { from: "left", text: "Hi" },
  { from: "right", text: "Hello! What can I help you with?" },
  { from: "left", text: "I have a question about my order." },
  { from: "right", text: "Sure! Can you provide your order number?" },
  { from: "left", text: "Yes, it's #12345." },
  { from: "right", text: "Thank you! Let me check the details." },
  { from: "right", text: "Your order is being processed and will ship soon." },
  { from: "left", text: "Great, how long will it take?" },
  { from: "right", text: "It should arrive within 3-5 business days." },
  { from: "left", text: "Thank you for the update!" },
  { from: "right", text: "You’re welcome. Anything else I can help you with?" },
  { from: "left", text: "No, that's all. Have a nice day!" },
  { from: "right", text: "You too! 😊" },
];

// 3D "avatar" sphere with image texture
function Avatar3D({ position }) {
  // Place your avatar image at /public/assets/avatar.jpg
  const texture = useLoader(TextureLoader, "/assets/ERRTEKNALOZY.jpg");
  const mesh = useRef();
  // Optional: slight rotation animation for 3D feel
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.y += 0.005;
  });
  return (
    <mesh position={position} ref={mesh} castShadow>
      <sphereGeometry args={[1.5, 48, 48]} />
      <meshStandardMaterial map={texture} roughness={0.7} metalness={0.3} />
    </mesh>
  );
}

// 3D "logo" sphere with image texture
function Logo3D({ position }) {
  // Place your logo at /public/assets/ERRTEKNALOZY.jpg
  const texture = useLoader(TextureLoader, "/assets/ERRTEKNALOZY.jpg");
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.y -= 0.0005;
  });
  return (
    <mesh position={position} ref={mesh} castShadow>
      <sphereGeometry args={[1.5, 48, 48]} />
      <meshStandardMaterial map={texture} roughness={0.7} metalness={0.3} />
    </mesh>
  );
}

function AnimatedMessageBubble({ text, from, progress }) {
  const startX = from === "left" ? -2.3 : 2.3;
  const endX = from === "left" ? 1.3 : -1.3;
  const x = startX + (endX - startX) * progress;
  const align = from === "left" ? "flex-start" : "flex-end";
  const bubbleColor = from === "left" ? "#1976d2" : "#43a047";
  const textColor = "#fff";
  return (
    <Html position={[x, 1.1, 0]} center>
      <div
        style={{
          minWidth: 200,
          maxWidth: 240,
          padding: "12px 18px",
          background: bubbleColor,
          color: textColor,
          borderRadius: 18,
          margin: "8px 0",
          fontWeight: 500,
          fontSize: 18,
          boxShadow: "0 2px 12px #000a",
          display: "flex",
          justifyContent: align,
          alignItems: "center",
          opacity: 0.97,
        }}
      >
        {text}
      </div>
    </Html>
  );
}

function ChatSequence({ messages, duration = 2.3 }) {
  const [time, setTime] = useState(0);
  useFrame((state, delta) => setTime((prev) => prev + delta));
  const total = messages.length;
  const totalDuration = total * duration;
  const t = time % totalDuration;
  const idx = Math.floor(t / duration);
  const progress = (t % duration) / duration;
  const message = messages[idx];
  return (
    <AnimatedMessageBubble
      key={idx}
      text={message.text}
      from={message.from}
      progress={progress}
    />
  );
}

export default function Contact3D() {
  return (
    <div
      style={{
        width: "100%",
        height: "480px",
        background: "#111",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 6px 32px #000b",
      }}
    >
      <Canvas camera={{ position: [0, 1.5, 7], fov: 55 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
        {/* 3D Avatar on the left */}
        <Avatar3D position={[-3, 1.1, 0]} />
        {/* 3D Logo on the right */}
        <Logo3D position={[3, 1.1, 0]} />
        {/* Animated chat sequence */}
        <ChatSequence messages={chatMessages} duration={2.3} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}