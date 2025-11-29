// Lightweight Three.js hero visual — lazy loaded
// This script dynamically loads Three.js (if necessary) and initializes
// an animated low-poly 3D group (school motif) with a particle field.
(function () {
  // Helper to load a script and return a Promise
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }

  // WebGL / Three initialization
  // state and API object exported to window for UI control
  const API = {
    inited: false,
    running: false,
    start: null,
    stop: null,
    dispose: null
  };

  // expose API immediately so external code can call start/stop
  // Provide a start() that will initialize on first call.
  API.start = function () {
    if (!API.inited) return init();
    if (!API.running) {
      API.running = true;
      // animate will be wired after init; if not yet set we just return and init will start loop
    }
  };

  window.THREE_HERO = API;

  async function init() {
    try {
      if (typeof THREE === 'undefined') {
        await loadScript('https://unpkg.com/three@0.153.0/build/three.min.js');
      }

      // Minimal scene set up
      const container = document.getElementById('hero-3d');
      if (!container) return;

      // Colors from CSS variables (fall back to defaults)
      const css = getComputedStyle(document.documentElement);
      const primary = css.getPropertyValue('--primary-color')?.trim() || '#0b63a6';
      const secondary = css.getPropertyValue('--secondary-color')?.trim() || '#f6b042';
      const neon = css.getPropertyValue('--neon-color')?.trim() || '#36f0ff';

      // Scene / Camera / Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(0, 1.2, 4);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setClearColor(0x000000, 0); // transparent so CSS gradients show through
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      container.appendChild(renderer.domElement);

      // Lights
      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);
      const dir = new THREE.DirectionalLight(0xffffff, 0.6);
      dir.position.set(5, 10, 7);
      scene.add(dir);

      // Try loading a local glTF model if provided (assets/models/hero.glb)
      // Fallback to low-poly shapes for speed and safety.
      const modelPath = 'assets/models/hero.glb';
      let modelLoaded = false;

      async function tryLoadGLTF() {
        try {
          // Check if file exists (fetch head)
          const head = await fetch(modelPath, { method: 'HEAD' });
          if (!head.ok) throw new Error('Model not available');

          // Ensure GLTFLoader is available
          if (typeof THREE.GLTFLoader === 'undefined') {
            await loadScript('https://unpkg.com/three@0.153.0/examples/js/loaders/GLTFLoader.js');
          }

          const loader = new THREE.GLTFLoader();
          loader.load(modelPath, (gltf) => {
            const m = gltf.scene || gltf.scenes[0];
            if (!m) return;
            m.scale.set(0.9, 0.9, 0.9);
            m.position.set(0, -0.25, 0);
            group.add(m);
            modelLoaded = true;
          }, undefined, () => {
            // ignore load errors, fallback will remain
            modelLoaded = false;
          });
        } catch (e) {
          // model not present or failed -> fallback
          modelLoaded = false;
        }
      }

      tryLoadGLTF();

      // School/basic low-poly group (simple shapes for speed)
      const group = new THREE.Group();

      // Base building
      const baseGeo = new THREE.BoxGeometry(2.2, 0.6, 1.4);
      const baseMat = new THREE.MeshStandardMaterial({ color: primary, metalness: 0.1, roughness: 0.6, emissive: new THREE.Color(neon), emissiveIntensity: 0.02 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0;
      group.add(base);

      // Left wing
      const leftGeo = new THREE.BoxGeometry(0.9, 0.5, 0.9);
      const leftMat = new THREE.MeshStandardMaterial({ color: secondary, metalness: 0.1, roughness: 0.5, emissive: new THREE.Color(neon), emissiveIntensity: 0.04 });
      const left = new THREE.Mesh(leftGeo, leftMat);
      left.position.set(-1.35, 0.05, 0);
      group.add(left);

      // Right wing
      const right = left.clone();
      right.position.x = 1.35;
      group.add(right);

      // Tower
      const towerGeo = new THREE.BoxGeometry(0.6, 1.0, 0.6);
      const towerMat = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.05, roughness: 0.4, emissive: new THREE.Color(neon), emissiveIntensity: 0.06 });
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.set(0, 0.8, 0);
      group.add(tower);

      // Roof
      const roofGeo = new THREE.ConeGeometry(0.8, 0.6, 4);
      const roofMat = new THREE.MeshStandardMaterial({ color: primary, metalness: 0.2, roughness: 0.4, emissive: new THREE.Color(neon), emissiveIntensity: 0.08 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.set(0, 1.5, 0);
      roof.rotation.y = Math.PI / 4;
      group.add(roof);

      // Add a subtle pedestal
      const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.08, 32);
      const pedMat = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0, roughness: 0.9 });
      const pedestal = new THREE.Mesh(pedestalGeo, pedMat);
      pedestal.position.y = -0.4;
      group.add(pedestal);

      scene.add(group);

      // Decide configuration based on device and accessibility preferences
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const deviceCores = navigator.hardwareConcurrency || 4;
      const deviceMemory = navigator.deviceMemory || 4; // may be undefined in some browsers

      // Particle count: adapt to device speed and accessibility
      let particlesCount = 1600;
      const isNarrow = container.clientWidth < 900;
      if (prefersReducedMotion) particlesCount = 400;
      else if (isNarrow) particlesCount = 700;
      else if (deviceCores <= 2 || (deviceMemory && deviceMemory <= 2)) particlesCount = 800;
      const positions = new Float32Array(particlesCount * 3);
      const colors = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

        // particle color variation between primary and secondary
        const t = Math.random();
        const pCol = new THREE.Color(primary);
        const sCol = new THREE.Color(secondary);
        const col = pCol.clone().lerp(sCol, t);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: prefersReducedMotion ? 0.02 : 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // start/stop show/hide helpers
      function showCanvas() { renderer.domElement.style.display = 'block'; }
      function hideCanvas() { renderer.domElement.style.display = 'none'; }

      API.show = showCanvas;
      API.hide = hideCanvas;

      // Simple mouse parallax
      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      });

      // Animation
      const clock = new THREE.Clock();

      let animationId = null;
      function animate() {
        // Pause animation when tab is hidden to save CPU/battery
        if (document.hidden) {
          // schedule a light check and skip heavy render loop
          requestAnimationFrame(animate);
          return;
        }
        const t = clock.getElapsedTime();
        // slow rotation
        if (!prefersReducedMotion) {
          group.rotation.y += 0.003 + Math.sin(t / 6) * 0.0006;
          group.position.y = Math.sin(t / 2) * 0.03;
        } else {
          // keep a subtle static position for reduced-motion users
          group.rotation.y = 0.02;
          group.position.y = 0;
        }
        group.rotation.x = mouseY * 0.25;
        group.rotation.z = mouseX * -0.1;

        // subtle vertical motion
        group.position.y = Math.sin(t / 2) * 0.03;

        // particles params animate
        particles.rotation.y += 0.0007;
        particles.rotation.x += 0.0002;

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      }

      // Resize handler
      function onResize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }

      window.addEventListener('resize', () => {
        // throttle by requestAnimationFrame
        requestAnimationFrame(onResize);
      });

      // initial resize & set pixel ratio according to device
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isNarrow ? 1.25 : 1.5));
      onResize();
      animate();

      // Accessibility note: keep canvas inert so screen readers treat hero-content first
      renderer.domElement.setAttribute('aria-hidden', 'true');

      // Fallback: if WebGL context lost, display a subtle static illustration
      renderer.domElement.addEventListener('webglcontextlost', function () {
        // nothing fancy — let CSS hero gradient remain as fallback
        renderer.domElement.style.display = 'none';
      });

      // exported methods (if they were not previously set)
      API.inited = true;
      API.running = true;
      if (!API.start) {
        API.start = function () {
          if (!API.inited) return init();
          if (!API.running) {
            API.running = true;
            animate();
            try { showCanvas(); } catch (e) {}
          }
        };
      }
      // ensure start exists (already set above if needed)

      API.stop = function () {
        if (animationId) cancelAnimationFrame(animationId);
        animationId = null;
        API.running = false;
        // hide canvas if user disables 3D
        try { hideCanvas(); } catch(e) {}
      };

      API.dispose = function () {
        API.stop();
        try {
          // try to free some resources
          renderer.dispose();
          scene.traverse((o) => {
            if (o.geometry) o.geometry.dispose();
            if (o.material) {
              if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
              else o.material.dispose();
            }
          });
        } catch (e) { /* silent */ }
      };

      // attach to global object
      window.THREE_HERO = API;

      // Start animation loop
      animate();
    } catch (err) {
      console.warn('3D hero could not be initialized:', err);
      // leave hero gradient and content visible as fallback
    }

  }

  // Auto-init
  // Do NOT auto-start if explicit window.THREE_HERO_AUTO === false
  // Otherwise attempt to auto-init on DOMContentLoaded.
  function tryAutoInit() {
    if (window.THREE_HERO_AUTO === false) return;
    setTimeout(init, 60);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    tryAutoInit();
  } else {
    document.addEventListener('DOMContentLoaded', tryAutoInit);
  }

})();
