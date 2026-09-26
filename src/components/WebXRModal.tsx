'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  X, 
  Glasses, 
  Maximize2, 
  Layers, 
  Camera, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Crosshair, 
  Rotate3d,
  Smartphone,
  Eye,
  Sliders,
  Volume2
} from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';

interface WebXRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebXRModal: React.FC<WebXRModalProps> = ({ isOpen, onClose }) => {
  const [xrSupported, setXrSupported] = useState<boolean>(false);
  const [xrMode, setXrMode] = useState<'hologram' | 'stereoscopic' | 'ar_camera'>('hologram');
  const [needleDepth, setNeedleDepth] = useState<number>(44);
  const [nerveSensitivity, setNerveSensitivity] = useState<number>(85);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [xrStatus, setXrStatus] = useState<string>('Spatial XR Engine Ready');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameId = useRef<number>(0);

  // Check native WebXR support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'xr' in navigator) {
      (navigator as any).xr?.isSessionSupported('immersive-vr')
        .then((supported: boolean) => setXrSupported(supported))
        .catch(() => setXrSupported(false));
    }
  }, []);

  // Handle AR Camera passthrough
  useEffect(() => {
    if (xrMode === 'ar_camera') {
      soundEngine.playXRModeSound();
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
              setCameraActive(true);
              setXrStatus('Live Optical AR Passthrough Engaged');
            }
          })
          .catch(() => {
            setCameraActive(false);
            setXrStatus('Camera access denied - defaulting to darkroom spatial holographic view');
          });
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setCameraActive(false);
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [xrMode]);

  // 3D Three.js rendering inside XR Modal
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    soundEngine.playXRModeSound();

    const width = canvas.parentElement?.clientWidth || 800;
    const height = canvas.parentElement?.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambLight);

    const pointLight = new THREE.PointLight(0x14b8a6, 4.5, 20);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x06b6d4, 3.5, 20);
    blueLight.position.set(-3, -4, 4);
    scene.add(blueLight);

    // Lumbar Vertebra L4-L5 XR Model
    const xrModelGroup = new THREE.Group();
    scene.add(xrModelGroup);

    // Realistic Anatomical Vertebra Geometry Helper
    const createAnatomicVertebra = (w: number, d: number, h: number) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, d * 0.65);
      shape.bezierCurveTo(w * 0.6, d * 0.65, w * 0.95, d * 0.35, w * 0.9, 0);
      shape.bezierCurveTo(w * 0.85, -d * 0.45, w * 0.45, -d * 0.6, 0, -d * 0.35);
      shape.bezierCurveTo(-w * 0.45, -d * 0.6, -w * 0.85, -d * 0.45, -w * 0.9, 0);
      shape.bezierCurveTo(-w * 0.95, d * 0.35, -w * 0.6, d * 0.65, 0, d * 0.65);

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: h,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: h * 0.12,
        bevelThickness: h * 0.12,
      });
      geo.center();
      geo.rotateX(Math.PI / 2);
      return geo;
    };

    const realisticBoneMat = new THREE.MeshStandardMaterial({
      color: 0xede8dc,
      roughness: 0.65,
      metalness: 0.04,
    });

    const realisticDiscMat = new THREE.MeshPhysicalMaterial({
      color: 0xf43f5e,
      emissive: 0xbe123c,
      emissiveIntensity: 1.3,
      roughness: 0.22,
      transmission: 0.25,
      thickness: 1.4,
    });

    // L4 Vertebra
    const l4Geo = createAnatomicVertebra(1.5, 1.25, 0.75);
    const l4Mesh = new THREE.Mesh(l4Geo, realisticBoneMat);
    l4Mesh.position.y = 0.95;
    xrModelGroup.add(l4Mesh);

    // L4 Spinous Process
    const spinousGeo = new THREE.BoxGeometry(0.3, 0.6, 1.4);
    const spinousMesh = new THREE.Mesh(spinousGeo, realisticBoneMat);
    spinousMesh.rotation.x = 0.55;
    spinousMesh.position.set(0, 0.75, -1.2);
    xrModelGroup.add(spinousMesh);

    // L4-L5 Disc (Kidney shaped)
    const discGeo = createAnatomicVertebra(1.45, 1.2, 0.4);
    const discMesh = new THREE.Mesh(discGeo, realisticDiscMat);
    discMesh.position.y = 0.28;
    xrModelGroup.add(discMesh);

    // L5 Vertebra
    const l5Geo = createAnatomicVertebra(1.55, 1.3, 0.8);
    const l5Mesh = new THREE.Mesh(l5Geo, realisticBoneMat.clone());
    l5Mesh.position.y = -0.45;
    xrModelGroup.add(l5Mesh);

    // L5 Spinous Process
    const spinous5Mesh = spinousMesh.clone();
    spinous5Mesh.position.set(0, -0.65, -1.25);
    xrModelGroup.add(spinous5Mesh);

    // Spinal Thecal Canal
    const canalGeo = new THREE.CylinderGeometry(0.32, 0.32, 2.8, 16);
    const canalMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.3,
      roughness: 0.2,
      transmission: 0.3,
      transparent: true,
      opacity: 0.88,
    });
    const canalMesh = new THREE.Mesh(canalGeo, canalMat);
    canalMesh.position.set(0, 0.25, -0.65);
    xrModelGroup.add(canalMesh);

    // Radiating Sciatic Nerve Roots with electrical pulse
    const nerveGroup = new THREE.Group();
    [-1, 1].forEach((side) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.4, 0.25, -0.8),
        new THREE.Vector3(side * 1.5, 0.1, -0.4),
        new THREE.Vector3(side * 2.8, -0.6, 0.2),
        new THREE.Vector3(side * 3.5, -1.8, 0.8),
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.08, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0x2dd4bf });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      nerveGroup.add(tubeMesh);
    });
    xrModelGroup.add(nerveGroup);

    // Fluoroscopy Targeting Hologram Ring
    const holoRingGeo = new THREE.RingGeometry(1.8, 1.88, 36);
    const holoRingMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const holoRing = new THREE.Mesh(holoRingGeo, holoRingMat);
    holoRing.position.set(0, 0.25, 0);
    xrModelGroup.add(holoRing);

    // Micro Needle
    const needleGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.8, 8);
    const needleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
    const needle = new THREE.Mesh(needleGeo, needleMat);
    needle.rotation.x = -Math.PI / 4;
    needle.rotation.z = Math.PI / 5;
    needle.position.set(1.4, 1.8, 1.8);
    xrModelGroup.add(needle);

    // Holographic Wireframe Grid Box
    const gridHelper = new THREE.GridHelper(8, 16, 0x14b8a6, 0x0f2438);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // Interaction / Gyroscope & Mouse Drag
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotX = 0.2;
    let rotY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      prevMouse = { x: e.clientX, y: e.clientY };
      rotY += dx * 0.01;
      rotX += dy * 0.01;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Device Gyroscope orientation if on mobile
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        rotY = (e.gamma * Math.PI) / 180;
        rotX = ((e.beta - 45) * Math.PI) / 180;
      }
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let clock = new THREE.Clock();
    const renderLoop = () => {
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        rotY += 0.005;
      }

      xrModelGroup.rotation.y = rotY;
      xrModelGroup.rotation.x = rotX;

      // Pulsing nerve glow
      nerveGroup.children.forEach((tube, idx) => {
        const mat = (tube as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.color.setHex(idx % 2 === 0 ? 0x2dd4bf : 0x38bdf8);
      });

      holoRing.rotation.z = elapsed * 0.5;

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [isOpen, xrMode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#020617]/95 backdrop-blur-2xl animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[820px] rounded-3xl bg-gradient-to-b from-slate-900/95 via-[#030712] to-slate-950 border border-teal-500/30 shadow-[0_0_80px_rgba(20,184,166,0.3)] flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-md">
              <Glasses className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-display font-extrabold text-base sm:text-lg tracking-tight">
                  WebXR Spatial Anatomy & Needle Trajectory Lab
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/40">
                  {xrSupported ? 'Native WebXR Device Active' : 'Holographic Simulation Active'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Dr. Md. Mohiuddin Majed Chy • European Society (ESRA) Fluoroscopic Navigation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playHapticClick();
                onClose();
              }}
              className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all"
              title="Close WebXR Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Main Viewport */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          
          {/* Optional AR Video Stream if Optical Passthrough is toggled */}
          {xrMode === 'ar_camera' && (
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-90 contrast-110"
            />
          )}

          {/* Holographic Stereoscopic View Mode (Side-by-side eyes for VR headsets) */}
          {xrMode === 'stereoscopic' ? (
            <div className="absolute inset-0 grid grid-cols-2 divide-x divide-teal-500/30 z-10 pointer-events-none">
              <div className="relative flex items-center justify-center">
                <span className="absolute top-4 left-4 text-[10px] font-mono text-teal-400 bg-slate-950/80 px-2 py-1 rounded border border-teal-500/30">
                  LEFT EYE (STEREO OCULAR A)
                </span>
              </div>
              <div className="relative flex items-center justify-center">
                <span className="absolute top-4 right-4 text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/30">
                  RIGHT EYE (STEREO OCULAR B)
                </span>
              </div>
            </div>
          ) : null}

          {/* 3D WebGL Canvas Layer */}
          <canvas
            ref={canvasRef}
            className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
          />

          {/* Floating Spatial HUD Crosshairs */}
          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <div className="bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-teal-500/20 text-xs font-mono space-y-1 text-slate-300">
                <div className="text-teal-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>C-ARM CO-AXIAL SIGHT</span>
                </div>
                <div>DISC SPACE: L4-L5 (POSTERIOR)</div>
                <div>THECAL CLEARANCE: 1.8mm SAFE</div>
                <div>NEEDLE ANGLE: 28.5° CRANIAL</div>
              </div>

              <div className="bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-cyan-500/20 text-xs font-mono space-y-1 text-slate-300 text-right">
                <div className="text-cyan-400 font-bold flex items-center justify-end gap-1.5">
                  <span>RF THERMAL ZONE</span>
                  <Crosshair className="w-3.5 h-3.5" />
                </div>
                <div>IMPEDANCE: 380 Ω (OPTIMAL)</div>
                <div>LESION TEMP: 42°C PULSED</div>
                <div>TIME: 120s CYCLICAL</div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="px-4 py-1.5 rounded-full bg-slate-950/90 border border-teal-500/40 text-teal-300 text-xs font-mono tracking-wider backdrop-blur-xl animate-pulse">
                {xrStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom XR Control Toolbar */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-slate-950/90 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playHapticClick();
                setXrMode('hologram');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                xrMode === 'hologram'
                  ? 'bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Rotate3d className="w-4 h-4" />
              <span>3D Hologram</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playHapticClick();
                setXrMode('stereoscopic');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                xrMode === 'stereoscopic'
                  ? 'bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Glasses className="w-4 h-4" />
              <span>Stereoscopic VR</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playHapticClick();
                setXrMode('ar_camera');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                xrMode === 'ar_camera'
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Optical AR Room</span>
            </button>
          </div>

          {/* Interactive Trajectory Depth Caliper Slider */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">
              Needle Depth ({needleDepth}mm):
            </span>
            <input
              type="range"
              min="20"
              max="65"
              value={needleDepth}
              onChange={(e) => {
                setNeedleDepth(Number(e.target.value));
                soundEngine.playScanPulse();
              }}
              className="w-32 sm:w-44 accent-teal-400 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-teal-400">
              {needleDepth > 50 ? 'DEEP FORAMEN' : 'EPIDURAL SPACE'}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              soundEngine.playLaserLock();
              setXrStatus(`Trajectory Locked at ${needleDepth}mm • Safe Corticosteroid Delivery`);
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-teal-100" />
            <span>Confirm Safe Trajectory</span>
          </button>

        </div>

      </div>
    </div>
  );
};
