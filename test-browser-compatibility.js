// Simple browser compatibility test script
// Run this in the browser console to test compatibility features

function testBrowserCompatibility() {
  console.log('=== Browser Compatibility Test ===');

  // Test basic features
  const tests = {
    'ES6 Features': {
      test: () => typeof Symbol !== 'undefined' && typeof Promise !== 'undefined',
      importance: 'High'
    },
    'CSS Grid': {
      test: () => CSS.supports('display', 'grid'),
      importance: 'Medium'
    },
    'CSS Flexbox': {
      test: () => CSS.supports('display', 'flex'),
      importance: 'High'
    },
    'CSS Custom Properties': {
      test: () => CSS.supports('color', 'var(--test)'),
      importance: 'Medium'
    },
    'Intersection Observer': {
      test: () => 'IntersectionObserver' in window,
      importance: 'Medium'
    },
    'Request Animation Frame': {
      test: () => 'requestAnimationFrame' in window,
      importance: 'High'
    },
    'WebGL': {
      test: () => {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      },
      importance: 'High'
    },
    'WebGL2': {
      test: () => {
        const canvas = document.createElement('canvas');
        return !!canvas.getContext('webgl2');
      },
      importance: 'Low'
    },
    'Smooth Scrolling': {
      test: () => 'scrollBehavior' in document.documentElement.style,
      importance: 'Medium'
    },
    'Touch Support': {
      test: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      importance: 'Medium'
    },
    'OKLCH Colors': {
      test: () => CSS.supports('color', 'oklch(1 0 0)'),
      importance: 'Low'
    },
    'Display P3 Colors': {
      test: () => CSS.supports('color', 'color(display-p3 1 1 1)'),
      importance: 'Low'
    }
  };

  // Run tests
  let results = { pass: 0, fail: 0, total: 0 };

  Object.entries(tests).forEach(([feature, config]) => {
    const passed = config.test();
    results.total++;
    if (passed) {
      results.pass++;
    } else {
      results.fail++;
    }

    const status = passed ? '✅' : '❌';
    const importance = `(${config.importance})`;
    console.log(`${status} ${feature} ${importance}`);
  });

  // Browser detection
  console.log('\n=== Browser Detection ===');
  const userAgent = navigator.userAgent.toLowerCase();
  const browserInfo = {
    isSafari: /safari/.test(userAgent) && !/chrome/.test(userAgent),
    isFirefox: /firefox/.test(userAgent),
    isChrome: /chrome/.test(userAgent) && !/edge/.test(userAgent),
    isEdge: /edge/.test(userAgent) || /edg/.test(userAgent),
    isIE: /msie/.test(userAgent) || /trident/.test(userAgent),
  };

  Object.entries(browserInfo).forEach(([browser, isDetected]) => {
    if (isDetected) {
      console.log(`🌐 ${browser}: ${isDetected}`);
    }
  });

  // Summary
  console.log('\n=== Summary ===');
  console.log(`Total Tests: ${results.total}`);
  console.log(`Passed: ${results.pass} (${Math.round(results.pass / results.total * 100)}%)`);
  console.log(`Failed: ${results.fail} (${Math.round(results.fail / results.total * 100)}%)`);

  // Performance optimization check
  console.log('\n=== Performance Optimizations ===');
  const bodyClasses = document.body.classList;
  const performanceClasses = [
    'js', 'modern-browser', 'safari', 'firefox', 'chrome', 'edge', 'ie',
    'touch-device', 'no-webgl', 'no-webgl2', 'device-mobile', 'device-tablet', 'device-desktop'
  ];

  performanceClasses.forEach(className => {
    if (bodyClasses.contains(className)) {
      console.log(`✅ ${className} class applied`);
    }
  });

  // Test if browser info is available
  if (window.__browserInfo) {
    console.log('\n=== Browser Info Available ===');
    console.log(window.__browserInfo);
  } else {
    console.log('\n❌ Browser info not available (BrowserCompatibilityProvider may not have loaded)');
  }

  // Test smooth scrolling
  console.log('\n=== Smooth Scrolling Test ===');
  const testScroll = () => {
    const scrollContainer = document.documentElement;
    const startPos = scrollContainer.scrollTop;

    if ('scrollBehavior' in scrollContainer.style) {
      scrollContainer.style.scrollBehavior = 'smooth';
      scrollContainer.scrollTop = 0;
      setTimeout(() => {
        scrollContainer.scrollTop = startPos;
        console.log('✅ Smooth scrolling test completed');
      }, 1000);
    } else {
      console.log('❌ Smooth scrolling not natively supported');
    }
  };

  if (document.body.scrollHeight > window.innerHeight) {
    testScroll();
  } else {
    console.log('ℹ️  Page too short for scroll test');
  }

  return results;
}

// Test 3D functionality
function test3DFunctionality() {
  console.log('\n=== 3D Functionality Test ===');

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    console.log('❌ WebGL not supported - 3D content will not work');
    return false;
  }

  console.log('✅ WebGL supported');

  // Test WebGL capabilities
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    console.log(`🎮 Renderer: ${renderer}`);

    if (renderer.includes('Software Renderer') || renderer.includes('Microsoft Basic')) {
      console.log('⚠️  Using software renderer - 3D performance may be limited');
    }
  }

  // Test Three.js if available
  if (typeof THREE !== 'undefined') {
    console.log('✅ Three.js loaded');

    // Test basic Three.js functionality
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      console.log('✅ Three.js basic functionality works');
    } catch (error) {
      console.log('❌ Three.js error:', error);
    }
  } else {
    console.log('❌ Three.js not loaded');
  }

  return true;
}

// Run all tests
console.log('Running browser compatibility tests...');
const results = testBrowserCompatibility();
const threeDResults = test3DFunctionality();

console.log('\n=== Test Complete ===');
console.log(`Compatibility Score: ${Math.round(results.pass / results.total * 100)}%`);

// Export for manual testing
window.testBrowserCompatibility = testBrowserCompatibility;
window.test3DFunctionality = test3DFunctionality;