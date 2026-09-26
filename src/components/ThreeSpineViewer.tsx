'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Rotate3d, 
  Maximize2, 
  Zap, 
  Activity, 
  Crosshair, 
  Layers, 
  Eye, 
  Sparkles, 
  Volume2, 
  HelpCircle,
  Glasses
} from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';

interface SpineViewerProps {
  selectedZoneId?: string;
  onZoneSelect?: (zoneId: string) => void;
  onOpenXRModal?: () => void;
  className?: string;
  compact?: boolean;
}

export const ThreeSpineViewer: React.FC<SpineViewerProps> = ({
  selectedZoneId = 'lower-back',
  onZoneSelect,
  onOpenXRModal,
  className = '',
  compact = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI state
  const [activeRegion, setActiveRegion] = useState<string>('lumbar');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [showFluoroscopyTarget, setShowFluoroscopyTarget] = useState<boolean>(true);
  const [showNerveImpulses, setShowNerveImpulses] = useState<boolean>(true);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [contrastDyeActive, setContrastDyeActive] = useState<boolean>(false);
  const [targetMetrics, setTargetMetrics] = useState({
    target: 'L4-L5 Intervertebral Foramen',
    approach: 'Transforaminal Fluoroscopic View',
    depthMm: 42.5,
    needleGauge: '22G Spinal Quincke',
    precision: '0.4 mm',
    status: 'OPTIMAL CO-AXIAL TRAJECTORY'
  });

  // Sync external zoneId if supplied
  useEffect(() => {
    if (!selectedZoneId) return;
    if (selectedZoneId === 'neck-cervical') {
      handleRegionChange('cervical');
    } else if (selectedZoneId === 'sciatica') {
      handleRegionChange('sciatica');
    } else if (selectedZoneId === 'lower-back') {
      handleRegionChange('lumbar');
    } else {
      handleRegionChange('all');
    }
  }, [selectedZoneId]);

  // Three.js instances ref
  const sceneState = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    spineGroup: THREE.Group;
    needleGroup: THREE.Group;
    particles: THREE.Points;
    nerveFilaments: THREE.LineSegments[];
    discs: { mesh: THREE.Mesh; label: string; region: string }[];
    vertebrae: { mesh: THREE.Mesh; label: string; region: string }[];
    contrastMesh?: THREE.Mesh;
    reqId: number;
    isDragging: boolean;
    prevMouse: { x: number; y: number };
    targetRotation: { x: number; y: number };
    targetCameraY: number;
    targetCameraZ: number;
    currentCameraY: number;
    currentCameraZ: number;
  } | null>(null);

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    soundEngine.playScanPulse();

    if (!sceneState.current) return;
    const s = sceneState.current;

    switch (region) {
      case 'cervical':
        s.targetCameraY = 5.2;
        s.targetCameraZ = 12.0;
        setTargetMetrics({
          target: 'C5-C6 Cervical Disc Space',
          approach: 'Anterior / Oblique Ultrasound & C-Arm',
          depthMm: 24.0,
          needleGauge: '25G Chiba Needle',
          precision: '0.2 mm',
          status: 'RADICULAR NERVE DECOMPRESSION'
        });
        break;
      case 'lumbar':
        s.targetCameraY = -1.5;
        s.targetCameraZ = 10.5;
        setTargetMetrics({
          target: 'L4-L5 Lumbar Epidural Space',
          approach: 'Subpedicular Transforaminal C-Arm',
          depthMm: 46.8,
          needleGauge: '22G Quincke Needle',
          precision: '0.3 mm',
          status: 'DIRECT THECAL SAC CLEARANCE'
        });
        break;
      case 'sciatica':
        s.targetCameraY = -3.2;
        s.targetCameraZ = 9.8;
        setTargetMetrics({
          target: 'L5-S1 Sciatic Nerve Root',
          approach: 'Fluoroscopic Selective Nerve Root Block',
          depthMm: 52.0,
          needleGauge: '22G Curved-Tip Cannula',
          precision: '0.3 mm',
          status: 'TARGET IMPINGEMENT INHIBITION'
        });
        break;
      case 'all':
      default:
        s.targetCameraY = 0.5;
        s.targetCameraZ = 18.0;
        setTargetMetrics({
          target: 'Full Neuraxial Axis (C1-Sacrum)',
          approach: 'Multi-Planar Fluoroscopy Scan',
          depthMm: 0.0,
          needleGauge: 'Diagnostic Mapping',
          precision: 'Sub-millimeter',
          status: 'PHYSIOLOGICAL BALANCE ACTIVE'
        });
        break;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = mountRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, -1.5, 12);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 4. Photorealistic Medical Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x050e1d, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ed, 2.5);
    keyLight.position.set(8, 14, 12);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x2dd4bf, 2.8);
    rimLight.position.set(-10, 6, -10);
    scene.add(rimLight);

    const coolFillLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    coolFillLight.position.set(0, -10, 8);
    scene.add(coolFillLight);

    const targetGlowLight = new THREE.PointLight(0x14b8a6, 3.5, 12);
    targetGlowLight.position.set(0, -6.5, 2.5);
    scene.add(targetGlowLight);

    // Procedural Organic Bone Texture Generator (Micro-trabecular cortical osseous grain)
    const createBoneTextures = () => {
      const size = 512;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;

      // Base ivory bone hue
      ctx.fillStyle = '#e8e2d5';
      ctx.fillRect(0, 0, size, size);

      // Micro-porous osteon speckles & cortical fibers
      const imgData = ctx.getImageData(0, 0, size, size);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 22;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.9));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.7));
      }
      ctx.putImageData(imgData, 0, 0);

      // Subtle natural osteoid striations
      ctx.fillStyle = 'rgba(180, 168, 148, 0.08)';
      for (let j = 0; j < 60; j++) {
        const y = Math.random() * size;
        ctx.fillRect(0, y, size, Math.random() * 3 + 1);
      }

      const boneTexture = new THREE.CanvasTexture(canvas);
      boneTexture.wrapS = THREE.RepeatWrapping;
      boneTexture.wrapT = THREE.RepeatWrapping;
      boneTexture.repeat.set(1.5, 1.5);

      return boneTexture;
    };

    const boneTexture = createBoneTextures();

    // Photorealistic PBR Bone Materials
    const realisticBoneMat = new THREE.MeshStandardMaterial({
      map: boneTexture,
      color: 0xede8dc,
      roughness: 0.62,
      metalness: 0.04,
      bumpMap: boneTexture,
      bumpScale: 0.025,
    });

    const realisticDiscMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      emissive: 0x0369a1,
      emissiveIntensity: 0.55,
      roughness: 0.28,
      metalness: 0.05,
      transmission: 0.35,
      thickness: 1.2,
      transparent: true,
      opacity: 0.92,
    });

    const realisticInflamedDiscMat = new THREE.MeshPhysicalMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 1.4,
      roughness: 0.18,
      metalness: 0.08,
      transmission: 0.2,
      thickness: 1.5,
    });

    // 5. Build Anatomically Sculpted Spine Model
    const spineGroup = new THREE.Group();
    scene.add(spineGroup);

    const discs: { mesh: THREE.Mesh; label: string; region: string }[] = [];
    const vertebrae: { mesh: THREE.Mesh; label: string; region: string }[] = [];

    // Helper: Build authentic kidney-shaped vertebral body contour
    const createKidneyVertebraGeometry = (radius: number, height: number, region: string) => {
      const shape = new THREE.Shape();
      const r = radius;
      const w = r * 1.25;
      const d = r * 0.95;

      // Anatomical anterior & lateral curve with posterior vertebral foramen notch
      shape.moveTo(0, d * 0.65);
      shape.bezierCurveTo(w * 0.6, d * 0.65, w * 0.95, d * 0.35, w * 0.9, 0);
      shape.bezierCurveTo(w * 0.85, -d * 0.45, w * 0.45, -d * 0.6, 0, -d * 0.35); // Posterior thecal notch
      shape.bezierCurveTo(-w * 0.45, -d * 0.6, -w * 0.85, -d * 0.45, -w * 0.9, 0);
      shape.bezierCurveTo(-w * 0.95, d * 0.35, -w * 0.6, d * 0.65, 0, d * 0.65);

      const extrudeSettings = {
        depth: height,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: height * 0.14,
        bevelThickness: height * 0.14,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();
      geo.rotateX(Math.PI / 2); // Orient horizontally
      return geo;
    };

    // Vertebra definition data: Height, radius, curvature offset
    const spineSegments = [
      // Cervical (C1 - C7)
      { name: 'C1 (Atlas)', region: 'cervical', y: 6.8, r: 0.55, h: 0.35, curveZ: 0.25 },
      { name: 'C2 (Axis)', region: 'cervical', y: 6.3, r: 0.58, h: 0.36, curveZ: 0.28 },
      { name: 'C3', region: 'cervical', y: 5.8, r: 0.60, h: 0.38, curveZ: 0.32 },
      { name: 'C4', region: 'cervical', y: 5.3, r: 0.62, h: 0.38, curveZ: 0.35 },
      { name: 'C5', region: 'cervical', y: 4.8, r: 0.65, h: 0.40, curveZ: 0.36 },
      { name: 'C6', region: 'cervical', y: 4.3, r: 0.68, h: 0.40, curveZ: 0.34 },
      { name: 'C7 (Prominens)', region: 'cervical', y: 3.8, r: 0.72, h: 0.42, curveZ: 0.28 },
      // Thoracic (T1 - T12)
      { name: 'T1', region: 'thoracic', y: 3.25, r: 0.74, h: 0.44, curveZ: 0.18 },
      { name: 'T2', region: 'thoracic', y: 2.7, r: 0.76, h: 0.45, curveZ: 0.05 },
      { name: 'T3', region: 'thoracic', y: 2.15, r: 0.78, h: 0.46, curveZ: -0.1 },
      { name: 'T4', region: 'thoracic', y: 1.6, r: 0.80, h: 0.48, curveZ: -0.22 },
      { name: 'T5', region: 'thoracic', y: 1.05, r: 0.82, h: 0.48, curveZ: -0.32 },
      { name: 'T6', region: 'thoracic', y: 0.5, r: 0.84, h: 0.50, curveZ: -0.38 },
      { name: 'T7', region: 'thoracic', y: -0.08, r: 0.86, h: 0.50, curveZ: -0.38 },
      { name: 'T8', region: 'thoracic', y: -0.65, r: 0.88, h: 0.52, curveZ: -0.32 },
      { name: 'T9', region: 'thoracic', y: -1.25, r: 0.90, h: 0.52, curveZ: -0.20 },
      { name: 'T10', region: 'thoracic', y: -1.85, r: 0.93, h: 0.54, curveZ: -0.05 },
      { name: 'T11', region: 'thoracic', y: -2.45, r: 0.96, h: 0.56, curveZ: 0.10 },
      { name: 'T12', region: 'thoracic', y: -3.08, r: 1.00, h: 0.58, curveZ: 0.25 },
      // Lumbar (L1 - L5) - Main Interventional Pain Targets
      { name: 'L1', region: 'lumbar', y: -3.75, r: 1.05, h: 0.62, curveZ: 0.40 },
      { name: 'L2', region: 'lumbar', y: -4.48, r: 1.10, h: 0.65, curveZ: 0.52 },
      { name: 'L3', region: 'lumbar', y: -5.25, r: 1.15, h: 0.68, curveZ: 0.58 },
      { name: 'L4', region: 'lumbar', y: -6.05, r: 1.20, h: 0.72, curveZ: 0.55 },
      { name: 'L5', region: 'lumbar', y: -6.90, r: 1.24, h: 0.75, curveZ: 0.45 },
      // Sacrum base
      { name: 'Sacrum (S1-S5)', region: 'sacrum', y: -7.85, r: 1.30, h: 1.1, curveZ: 0.25 }
    ];

    // Central Spinal Cord Tube
    const spinalCordCurve = new THREE.CatmullRomCurve3(
      spineSegments.map((s) => new THREE.Vector3(0, s.y + 0.1, s.curveZ - 0.35))
    );
    const spinalCordGeo = new THREE.TubeGeometry(spinalCordCurve, 72, 0.24, 16, false);
    const spinalCordMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.1,
      roughness: 0.25,
      transmission: 0.4,
      transparent: true,
      opacity: 0.88,
    });
    const spinalCordMesh = new THREE.Mesh(spinalCordGeo, spinalCordMat);
    spineGroup.add(spinalCordMesh);

    // Nerve filaments radiating bilaterally
    const nervePositions: number[] = [];
    const nerveColors: number[] = [];

    // Construct each anatomical vertebra and disc
    spineSegments.forEach((seg, idx) => {
      // 1. Realistic Kidney-Shaped Vertebral Body with Cortical Rim
      const vGeo = createKidneyVertebraGeometry(seg.r, seg.h, seg.region);
      const vMesh = new THREE.Mesh(vGeo, realisticBoneMat.clone());
      vMesh.position.set(0, seg.y, seg.curveZ);
      vMesh.castShadow = true;
      vMesh.receiveShadow = true;
      vMesh.userData = { label: seg.name, region: seg.region, type: 'vertebra' };

      // Neural Arch (Pedicles & Laminae enclosing the canal)
      const archGeo = new THREE.TorusGeometry(seg.r * 0.6, seg.h * 0.22, 8, 16, Math.PI);
      const archMesh = new THREE.Mesh(archGeo, realisticBoneMat.clone());
      archMesh.rotation.x = Math.PI / 2;
      archMesh.position.set(0, 0, -(seg.r * 0.38));
      vMesh.add(archMesh);

      // Anatomical Spinous Process (Slanted posterior spine plate)
      const spinousWidth = seg.region === 'lumbar' ? seg.r * 0.25 : seg.r * 0.18;
      const spinousLength = seg.region === 'lumbar' ? seg.r * 1.4 : seg.r * 1.1;
      const spinousGeo = new THREE.BoxGeometry(spinousWidth, seg.h * 0.8, spinousLength);
      const spinousMesh = new THREE.Mesh(spinousGeo, realisticBoneMat.clone());
      spinousMesh.rotation.x = seg.region === 'cervical' ? 0.35 : 0.65; // Natural caudal downward slant
      spinousMesh.position.set(0, -seg.h * 0.2, -(seg.r * 1.15));
      vMesh.add(spinousMesh);

      // Transverse Processes (Bilateral wing processes)
      const transGeo = new THREE.CylinderGeometry(seg.h * 0.16, seg.h * 0.24, seg.r * 1.3, 8);
      
      const leftTrans = new THREE.Mesh(transGeo, realisticBoneMat.clone());
      leftTrans.rotation.z = Math.PI / 2.3;
      leftTrans.rotation.y = 0.25;
      leftTrans.position.set(seg.r * 1.1, 0, -(seg.r * 0.2));
      vMesh.add(leftTrans);

      const rightTrans = new THREE.Mesh(transGeo, realisticBoneMat.clone());
      rightTrans.rotation.z = -Math.PI / 2.3;
      rightTrans.rotation.y = -0.25;
      rightTrans.position.set(-seg.r * 1.1, 0, -(seg.r * 0.2));
      vMesh.add(rightTrans);

      // Superior Articular Facet Processes
      const facetGeo = new THREE.CylinderGeometry(seg.h * 0.2, seg.h * 0.22, seg.h * 0.45, 8);
      const leftFacet = new THREE.Mesh(facetGeo, realisticBoneMat.clone());
      leftFacet.position.set(seg.r * 0.45, seg.h * 0.5, -(seg.r * 0.6));
      vMesh.add(leftFacet);

      const rightFacet = leftFacet.clone();
      rightFacet.position.set(-seg.r * 0.45, seg.h * 0.5, -(seg.r * 0.6));
      vMesh.add(rightFacet);

      spineGroup.add(vMesh);
      vertebrae.push({ mesh: vMesh, label: seg.name, region: seg.region });

      // 2. Anatomical Intervertebral Disc with Annulus Fibrosus & Nucleus Pulposus
      if (idx < spineSegments.length - 1) {
        const nextSeg = spineSegments[idx + 1];
        const discY = (seg.y + nextSeg.y) / 2;
        const discZ = (seg.curveZ + nextSeg.curveZ) / 2;
        const discHeight = Math.abs(seg.y - nextSeg.y) * 0.38;

        const discGeo = createKidneyVertebraGeometry(seg.r * 0.94, discHeight, seg.region);
        
        // Highlight L4-L5 and L5-S1 as the prime chronic pain/sciatica target
        const isInflamed = seg.name === 'L4' || seg.name === 'L5';
        const dMesh = new THREE.Mesh(discGeo, isInflamed ? realisticInflamedDiscMat : realisticDiscMat.clone());
        dMesh.position.set(0, discY, discZ);
        dMesh.userData = { 
          label: `${seg.name}-${nextSeg.name} Intervertebral Disc`, 
          region: seg.region, 
          type: 'disc',
          isTarget: isInflamed
        };
        spineGroup.add(dMesh);
        discs.push({ mesh: dMesh, label: `${seg.name}-${nextSeg.name} Disc`, region: seg.region });

        // Realistic Anatomical Spinal Nerves exiting through Neural Foramina
        [-1, 1].forEach((side) => {
          const startX = side * (seg.r * 0.45);
          const startY = discY + 0.05;
          const startZ = discZ - 0.35;

          const midX = side * (seg.r * 1.55);
          const midY = discY - 0.3;
          const midZ = discZ - 0.05;

          const endX = side * (seg.r * 2.8);
          const endY = discY - 0.95;
          const endZ = discZ + 0.3;

          nervePositions.push(startX, startY, startZ, midX, midY, midZ);
          nervePositions.push(midX, midY, midZ, endX, endY, endZ);

          const rCol = isInflamed ? 0.98 : 0.18;
          const gCol = isInflamed ? 0.25 : 0.82;
          const bCol = isInflamed ? 0.38 : 0.95;

          nerveColors.push(rCol, gCol, bCol, rCol, gCol, bCol);
          nerveColors.push(rCol, gCol, bCol, rCol * 0.6, gCol * 0.6, bCol * 0.6);
        });
      }
    });

    // Create Nerve Network Buffer Geometry
    const nerveGeo = new THREE.BufferGeometry();
    nerveGeo.setAttribute('position', new THREE.Float32BufferAttribute(nervePositions, 3));
    nerveGeo.setAttribute('color', new THREE.Float32BufferAttribute(nerveColors, 3));
    const nerveMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
    });
    const nerveLines = new THREE.LineSegments(nerveGeo, nerveMat);
    spineGroup.add(nerveLines);

    // 6. C-Arm Fluoroscopic Laser Target Ring & Needle Trajectory
    const needleGroup = new THREE.Group();
    // Target location is L4-L5 disc (y: -6.48, z: 0.5)
    needleGroup.position.set(0, -6.48, 0.5);

    // Outer Target Reticle
    const reticleGeo = new THREE.RingGeometry(1.4, 1.48, 32);
    const reticleMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const reticleMesh = new THREE.Mesh(reticleGeo, reticleMat);
    needleGroup.add(reticleMesh);

    // Crosshairs
    const chGeo = new THREE.BufferGeometry();
    chGeo.setAttribute('position', new THREE.Float32BufferAttribute([
      -1.8, 0, 0, 1.8, 0, 0,
      0, -1.8, 0, 0, 1.8, 0
    ], 3));
    const chMat = new THREE.LineBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.6 });
    const chLine = new THREE.LineSegments(chGeo, chMat);
    needleGroup.add(chLine);

    // Spinal Injection Needle (Co-axial angle)
    const needleShaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8);
    const needleShaftMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });
    const needleMesh = new THREE.Mesh(needleShaftGeo, needleShaftMat);
    needleMesh.rotation.x = -Math.PI / 3.5;
    needleMesh.rotation.z = Math.PI / 6;
    needleMesh.position.set(1.1, 1.4, 1.6);
    needleGroup.add(needleMesh);

    // Needle Tip Laser Dot
    const laserTipGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const laserTipMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    const laserTip = new THREE.Mesh(laserTipGeo, laserTipMat);
    laserTip.position.set(0.12, 0.05, 0.05);
    needleGroup.add(laserTip);

    // Simulated Radiopaque Contrast Dye Cloud (Pulsing epidural spread)
    const dyeGeo = new THREE.SphereGeometry(0.85, 24, 24);
    const dyeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.0,
      roughness: 0.3,
    });
    const contrastMesh = new THREE.Mesh(dyeGeo, dyeMat);
    contrastMesh.position.set(0.1, 0, 0);
    needleGroup.add(contrastMesh);

    scene.add(needleGroup);

    // 7. Ambient Bioluminescent Particle Grid
    const particleCount = 400;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 25;
      particlePositions[i + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x2dd4bf,
      size: 0.09,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. State storage
    sceneState.current = {
      scene,
      camera,
      renderer,
      spineGroup,
      needleGroup,
      particles,
      nerveFilaments: [nerveLines],
      discs,
      vertebrae,
      contrastMesh,
      reqId: 0,
      isDragging: false,
      prevMouse: { x: 0, y: 0 },
      targetRotation: { x: 0.15, y: -0.4 },
      targetCameraY: -1.5,
      targetCameraZ: 10.5,
      currentCameraY: -1.5,
      currentCameraZ: 10.5,
    };

    // Center entire spine group on y-axis
    spineGroup.position.y = 0;

    // 9. Raycasting for interactive hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const allClickable = [...discs.map((d) => d.mesh), ...vertebrae.map((v) => v.mesh)];
      const intersects = raycaster.intersectObjects(allClickable);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.label) {
          setHoveredPart(hit.userData.label);
        }
      } else {
        setHoveredPart(null);
      }
    };

    // 10. Mouse Drag Orbit Controls
    const onMouseDown = (e: MouseEvent) => {
      if (!sceneState.current) return;
      sceneState.current.isDragging = true;
      sceneState.current.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e);
      if (!sceneState.current || !sceneState.current.isDragging) return;
      const dx = e.clientX - sceneState.current.prevMouse.x;
      const dy = e.clientY - sceneState.current.prevMouse.y;
      sceneState.current.prevMouse = { x: e.clientX, y: e.clientY };

      sceneState.current.targetRotation.y += dx * 0.007;
      sceneState.current.targetRotation.x += dy * 0.007;
      // Clamp vertical tilt
      sceneState.current.targetRotation.x = Math.max(-0.7, Math.min(0.7, sceneState.current.targetRotation.x));
    };

    const onMouseUp = () => {
      if (sceneState.current) sceneState.current.isDragging = false;
    };

    // Touch controls for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (!sceneState.current || e.touches.length === 0) return;
      sceneState.current.isDragging = true;
      sceneState.current.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!sceneState.current || !sceneState.current.isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - sceneState.current.prevMouse.x;
      const dy = e.touches[0].clientY - sceneState.current.prevMouse.y;
      sceneState.current.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      sceneState.current.targetRotation.y += dx * 0.01;
      sceneState.current.targetRotation.x += dy * 0.01;
      sceneState.current.targetRotation.x = Math.max(-0.7, Math.min(0.7, sceneState.current.targetRotation.x));
    };

    const onTouchEnd = () => {
      if (sceneState.current) sceneState.current.isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 11. Render Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!sceneState.current) return;
      const s = sceneState.current;
      const elapsedTime = clock.getElapsedTime();

      // Auto-rotation if enabled and not currently dragging
      if (isAutoRotating && !s.isDragging) {
        s.targetRotation.y += 0.0035;
      }

      // Smooth damping interpolation (lerp)
      s.spineGroup.rotation.y += (s.targetRotation.y - s.spineGroup.rotation.y) * 0.06;
      s.spineGroup.rotation.x += (s.targetRotation.x - s.spineGroup.rotation.x) * 0.06;

      // Reticle faces camera
      s.needleGroup.rotation.y = s.spineGroup.rotation.y;

      // Reticle pulse
      const reticleScale = 1.0 + Math.sin(elapsedTime * 3.5) * 0.05;
      s.needleGroup.scale.set(reticleScale, reticleScale, 1.0);

      // Camera lerp
      s.currentCameraY += (s.targetCameraY - s.currentCameraY) * 0.04;
      s.currentCameraZ += (s.targetCameraZ - s.currentCameraZ) * 0.04;
      s.camera.position.y = s.currentCameraY;
      s.camera.position.z = s.currentCameraZ;
      s.camera.lookAt(0, s.currentCameraY * 0.85, 0);

      // Nerve pulse glow animation
      if (showNerveImpulses && s.nerveFilaments[0]) {
        const mat = s.nerveFilaments[0].material as THREE.LineBasicMaterial;
        mat.opacity = 0.65 + Math.sin(elapsedTime * 5.0) * 0.35;
      }

      // Simulated contrast dye expansion if active
      if (s.contrastMesh) {
        if (contrastDyeActive) {
          const dyeScale = 1.0 + (Math.sin(elapsedTime * 2.0) + 1.0) * 0.6;
          s.contrastMesh.scale.set(dyeScale, dyeScale, dyeScale);
          (s.contrastMesh.material as THREE.MeshStandardMaterial).opacity = 0.55;
        } else {
          (s.contrastMesh.material as THREE.MeshStandardMaterial).opacity = 0.0;
        }
      }

      // Gentle floating particles
      s.particles.rotation.y = elapsedTime * 0.02;

      s.renderer.render(s.scene, s.camera);
      s.reqId = requestAnimationFrame(animate);
    };

    sceneState.current.reqId = requestAnimationFrame(animate);

    // 12. Handle Resize
    const handleResize = () => {
      if (!container || !sceneState.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      sceneState.current.camera.aspect = newWidth / newHeight;
      sceneState.current.camera.updateProjectionMatrix();
      sceneState.current.renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (sceneState.current) {
        cancelAnimationFrame(sceneState.current.reqId);
        sceneState.current.renderer.dispose();
      }
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [isAutoRotating, showNerveImpulses, contrastDyeActive]);

  // Toggle contrast dye simulation
  const toggleContrastDye = () => {
    soundEngine.playLaserLock();
    setContrastDyeActive(!contrastDyeActive);
  };

  return (
    <div 
      ref={mountRef} 
      className={`relative w-full h-full min-h-[460px] lg:min-h-[580px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#020617] via-[#050e1d] to-[#020617] border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col ${className}`}
    >
      {/* 3D WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing z-0" 
      />

      {/* Top Clinical Telemetry HUD */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-[#020617]/90 via-[#020617]/50 to-transparent pointer-events-none">
        
        {/* Left: 3D Spine Digital Twin Label */}
        <div className="pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-[11px] font-bold shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <Rotate3d className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
            <span>Interactive 3D Neuraxial Twin</span>
          </div>

          <div className="text-white font-display font-extrabold text-sm sm:text-base tracking-tight mt-1">
            Fluoroscopy & Neural Guidance Simulator
          </div>
          <p className="text-[11px] text-slate-400 font-normal">
            Real-time anatomical 3D projection • Drag to rotate 360°
          </p>
        </div>

        {/* Right: WebXR Immersive Launcher Button & Audio */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {onOpenXRModal && (
            <button
              onClick={() => {
                soundEngine.playXRModeSound();
                onOpenXRModal();
              }}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-xs shadow-[0_0_20px_rgba(20,184,166,0.5)] hover:shadow-[0_0_25px_rgba(20,184,166,0.8)] transition-all hover:scale-105 active:scale-95"
              title="Launch WebXR 3D Spatial Anatomy Inspection"
            >
              <Glasses className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>Launch WebXR (VR/AR)</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsAutoRotating(!isAutoRotating);
              soundEngine.playHapticClick();
            }}
            className={`p-2 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all ${
              isAutoRotating 
                ? 'bg-teal-500/15 text-teal-300 border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.2)]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-white'
            }`}
            title="Toggle 3D Orbit Auto-Rotation"
          >
            <Rotate3d className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Hover Inspector Capsule (if part hovered) */}
      {hoveredPart && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-slate-950/90 border border-teal-400/50 shadow-[0_0_25px_rgba(20,184,166,0.35)] text-teal-300 text-xs font-bold tracking-wide backdrop-blur-xl animate-in fade-in zoom-in-95 pointer-events-none">
          <span className="text-white">Inspecting:</span> {hoveredPart}
        </div>
      )}

      {/* Bottom Area: Controls & Live C-Arm Targeting Telemetry */}
      <div className="relative z-10 mt-auto p-4 sm:p-5 flex flex-col gap-3 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent pointer-events-auto">
        
        {/* Anatomical Region Focus Selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Focus:
          </span>
          {[
            { id: 'all', label: 'Entire Spine' },
            { id: 'lumbar', label: 'Lumbar L1-L5 (Back Pain)' },
            { id: 'sciatica', label: 'L5-S1 Sciatica Root' },
            { id: 'cervical', label: 'Cervical (Neck & Arm)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleRegionChange(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeRegion === tab.id
                  ? 'bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)] scale-102'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live C-Arm Fluoroscopic Laser Needle Telemetry HUD Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-teal-500/20 shadow-xl">
          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Crosshair className="w-3 h-3 text-teal-400" />
              <span>Target Site</span>
            </div>
            <div className="text-xs font-bold text-white truncate">
              {targetMetrics.target}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>Fluoroscopy Beam</span>
            </div>
            <div className="text-xs font-bold text-cyan-300 truncate">
              {targetMetrics.approach}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-400" />
              <span>Depth & Needle</span>
            </div>
            <div className="text-xs font-bold text-amber-300">
              {targetMetrics.depthMm > 0 ? `${targetMetrics.depthMm}mm • ${targetMetrics.needleGauge}` : 'Non-Invasive Diagnostic'}
            </div>
          </div>

          <div className="space-y-0.5 flex flex-col justify-center">
            <button
              onClick={toggleContrastDye}
              className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                contrastDyeActive
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse'
                  : 'bg-slate-900 text-cyan-300 border border-cyan-500/30 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{contrastDyeActive ? 'Contrast Dye Radiopaque' : 'Inject Contrast Dye'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
