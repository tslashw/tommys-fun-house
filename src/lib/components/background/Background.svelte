<script>
    import { onDestroy } from 'svelte';

    // onready fires once the loop is running — gives the parent access to morph() and randomPalette()
    let { speed, resolution, colour, onready } = $props();

    // Colour palettes — each is 10 slightly varied hex values for the noise to sample from
    const green     = ['#1a4a2e','#1c4f30','#1e5233','#174828','#1b4d2f','#205535','#163f26','#19462b','#1d5131','#224f32'];
    const purple    = ['#2e1a5c','#321e62','#2a1854','#361f64','#301c5e','#3a2268','#261652','#2c1a5a','#341e60','#2f1b5d'];
    const red       = ['#5c1a20','#621e24','#541822','#641f26','#5e1c22','#682226','#521618','#5a1a20','#601e24','#5d1b21'];
    const yellow    = ['#4e4210','#544814','#484008','#564a16','#504412','#5a4e18','#443c08','#4c4010','#524614','#4e4211'];
    const blue      = ['#162a5c','#1a2e62','#142854','#1b3064','#182c5e','#1e3268','#122652','#162a5a','#1a2e60','#172b5d'];
    const blackGrey = ['#1a1a1a','#1e1e1e','#222222','#181818','#1c1c1c','#262626','#141414','#1a1c1c','#202020','#242424'];
    const orange    = ['#a53b06','#9b3705','#af4008','#913304','#aa3d07','#b8450a','#8a3004','#a03906','#b54309','#973605'];
    const pink      = ['#5c1a38','#621e3c','#541836','#641f3e','#5e1c3a','#682240','#521634','#5a1a38','#601e3c','#5d1b39'];
    const brown     = ['#3e2010','#422414','#3a1e0e','#442616','#402212','#482818','#361c0c','#3c2010','#402414','#3e2111'];
    const sage      = ['#2a3c28','#2e402c','#263824','#30422e','#2c3e2a','#324430','#223622','#283a26','#2e402a','#2b3d29'];
    const crimson   = ['#5c0e1a','#62121e','#540c18','#641320','#5e101c','#681422','#520c16','#5a0e1a','#60121e','#5d0f1b'];
    const teal      = ['#0e3a3a','#103e3e','#0c3636','#124040','#0f3c3c','#144444','#0a3232','#0e3a3c','#123e3e','#103b3b'];
    const navy      = ['#0a1a3c','#0c1e42','#081838','#0e2044','#0b1c3e','#102248','#061434','#0a1a3a','#0c1e40','#0b1b3e'];
    const maroon    = ['#3c0e10','#421012','#380c0e','#441214','#3e1010','#481416','#340a0c','#3a0e10','#401012','#3d0f11'];
    const magenta   = ['#4a0e3a','#50123e','#440c36','#521440','#4c103c','#561644','#3e0a32','#480e3a','#4e123e','#4b0f3b'];
    const olive     = ['#2e3010','#323412','#2a2c0e','#343614','#303212','#383a16','#26280c','#2c3010','#303412','#2e3111'];
    const indigo    = ['#1a1a52','#1e1e58','#161650','#20205a','#1c1c54','#22225e','#12124a','#181852','#1e1e56','#1b1b54'];
    const turquoise = ['#0e3832','#103c36','#0c3430','#124038','#0f3a34','#14423a','#0a302c','#103a34','#123e38','#0f3933'];
    const burgundy  = ['#3c0e1e','#421020','#380c1c','#441222','#3e101e','#481424','#340a18','#3a0e1e','#401020','#3d0f1f'];
    const gold      = ['#4a3408','#4e380a','#46300c','#523a0c','#4c360a','#563e0e','#422e06','#483408','#4e380c','#4b350a'];
    const rust      = ['#4a1e0c','#4e220e','#461c0a','#522410','#4c200e','#562612','#421a08','#481e0c','#4e220e','#4b1f0d'];
    const plum      = ['#3a0e2e','#401032','#36082a','#421234','#3c1030','#461436','#320826','#380e2c','#3e1030','#3b0f2f'];
    const emerald   = ['#0e3c24','#104228','#0c3820','#12442a','#0f3e26','#14462c','#0a341e','#0e3c22','#104028','#0f3d25'];
    const slate     = ['#1e2430','#222832','#1a202e','#242a34','#202630','#262c38','#161e28','#1e2432','#222830','#202530'];
    const tan       = ['#3e3420','#423824','#3a301e','#443a26','#403622','#483e28','#362e1a','#3c3220','#403624','#3e3521'];
    const violet    = ['#3a1252','#3e1658','#36104e','#42185a','#3c1454','#46185e','#320e4a','#381252','#3c1656','#3a1354'];

    const palettes = {
        'Black/Grey': blackGrey, 'Blue': blue,       'Brown': brown,     'Burgundy': burgundy,
        'Crimson':    crimson,   'Emerald': emerald,  'Gold': gold,       'Green': green,
        'Indigo':     indigo,    'Magenta': magenta,  'Maroon': maroon,   'Navy': navy,
        'Olive':      olive,     'Orange': orange,    'Pink': pink,       'Plum': plum,
        'Purple':     purple,    'Red': red,          'Rust': rust,       'Sage': sage,
        'Slate':      slate,     'Tan': tan,          'Teal': teal,       'Turquoise': turquoise,
        'Violet':     violet,    'Yellow': yellow,
    };

    // Picks a random palette, excluding greens and neutrals that clash with the table felt
    function randomPalette() {
        const exclude = ["Green", "Emerald", "Olive", "Sage", "Slate", "Gold", "Black/Grey"];
        const keys = Object.keys(palettes).filter(k => !exclude.includes(k));
        return keys[Math.floor(Math.random() * keys.length)];
    }

    let canvas;
    let animFrameId      = null;
    let autoMorphTimeout = null;

    function stopAnimation() {
        if (animFrameId !== null) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
        if (autoMorphTimeout !== null) {
            clearTimeout(autoMorphTimeout);
            autoMorphTimeout = null;
        }
    }

    function drawBackground(colors) {
        const ctx = canvas.getContext('2d');
        if (!ctx || colors.length === 0) return;

        stopAnimation();

        const canvasWidth  = canvas.width;
        const canvasHeight = canvas.height;
        const GRID_SIZE    = 8;
        const MORPH_DURATION = 3000;

        // 8x8 grid of random values — cheap to interpolate, gives smooth organic noise
        const generateNoiseGrid = () =>
            Array.from({ length: GRID_SIZE }, () =>
                Array.from({ length: GRID_SIZE }, () => Math.random())
            );

        const parseColors = (palette) => palette.map(hex => [
            parseInt(hex.slice(1, 3), 16),
            parseInt(hex.slice(3, 5), 16),
            parseInt(hex.slice(5, 7), 16),
        ]);

        // Current state — reassigned when a morph finishes
        let noiseGrid = generateNoiseGrid();
        let rgbColors = parseColors(colors);

        // Morph state — all null when idle
        let targetNoiseGrid = null;
        let targetRgbColors = null;
        let morphStartTime  = null;
        let morphDuration   = MORPH_DURATION;
        let activeColour    = colour;

        const smoothstep   = (v) => v * v * (3 - 2 * v);
        const smootherstep = (v) => v * v * v * (v * (v * 6 - 15) + 10);
        const lerp         = (a, b, t) => a + (b - a) * t;

        const imageData   = ctx.createImageData(canvasWidth, canvasHeight);
        const pixelBuffer = imageData.data;
        const startTime   = performance.now();

        // Starts a transition to a new noise pattern, optionally cross-fading to a new colour.
        // Safe to call mid-morph — snapshots the current frame as the new baseline so it
        // doesn't snap back before starting the next transition.
        function morph(targetColour, duration = MORPH_DURATION) {
            // If already morphing, bake the current interpolated state into the base
            if (targetNoiseGrid !== null && morphStartTime !== null) {
                const progress = smootherstep(Math.min((performance.now() - morphStartTime) / morphDuration, 1));

                noiseGrid = noiseGrid.map((row, i) =>
                    row.map((val, j) => lerp(val, targetNoiseGrid[i][j], progress))
                );

                if (targetRgbColors !== null) {
                    rgbColors = rgbColors.map((src, i) => [
                        lerp(src[0], targetRgbColors[i][0], progress),
                        lerp(src[1], targetRgbColors[i][1], progress),
                        lerp(src[2], targetRgbColors[i][2], progress),
                    ]);
                }
            }

            targetNoiseGrid = generateNoiseGrid();

            if (targetColour) {
                activeColour    = targetColour;
                targetRgbColors = parseColors(palettes[targetColour] ?? green);
            } else {
                targetRgbColors = null;
            }

            morphDuration  = duration;
            morphStartTime = performance.now();
        }

        function frame(now) {
            const animationTime = (now - startTime) * 0.001 * speed;

            let activeNoiseGrid = noiseGrid;
            let activeRgbColors = rgbColors;

            if (targetNoiseGrid !== null && morphStartTime !== null) {
                const clampedProgress = Math.min((now - morphStartTime) / morphDuration, 1);
                const easedProgress   = smootherstep(clampedProgress);

                activeNoiseGrid = noiseGrid.map((row, i) =>
                    row.map((val, j) => lerp(val, targetNoiseGrid[i][j], easedProgress))
                );

                if (targetRgbColors !== null) {
                    activeRgbColors = rgbColors.map((src, i) => [
                        lerp(src[0], targetRgbColors[i][0], easedProgress),
                        lerp(src[1], targetRgbColors[i][1], easedProgress),
                        lerp(src[2], targetRgbColors[i][2], easedProgress),
                    ]);
                }

                // Snap to final state once done
                if (clampedProgress >= 1) {
                    noiseGrid       = targetNoiseGrid;
                    targetNoiseGrid = null;
                    if (targetRgbColors !== null) {
                        rgbColors       = targetRgbColors;
                        targetRgbColors = null;
                    }
                    morphStartTime = null;
                }
            }

            // Per-pixel noise render
            for (let y = 0; y < canvasHeight; y++) {
                for (let x = 0; x < canvasWidth; x++) {
                    const baseGridX = (x / canvasWidth)  * GRID_SIZE;
                    const baseGridY = (y / canvasHeight) * GRID_SIZE;

                    // Sinusoidal offsets give the pattern a slow breathing quality
                    const gridOffsetX = Math.sin(animationTime * 0.4)  * 1.5
                                      + Math.sin(animationTime * 0.13 + baseGridY * 0.6) * 0.7;
                    const gridOffsetY = Math.cos(animationTime * 0.3)  * 1.5
                                      + Math.cos(animationTime * 0.17 + baseGridX * 0.6) * 0.7;

                    const sampleGridX = ((baseGridX + gridOffsetX) % GRID_SIZE + GRID_SIZE) % GRID_SIZE;
                    const sampleGridY = ((baseGridY + gridOffsetY) % GRID_SIZE + GRID_SIZE) % GRID_SIZE;

                    const cellLeft   = Math.floor(sampleGridX) % GRID_SIZE;
                    const cellTop    = Math.floor(sampleGridY) % GRID_SIZE;
                    const cellRight  = (cellLeft + 1) % GRID_SIZE;
                    const cellBottom = (cellTop  + 1) % GRID_SIZE;

                    const blendWeightX = smoothstep(sampleGridX - Math.floor(sampleGridX));
                    const blendWeightY = smoothstep(sampleGridY - Math.floor(sampleGridY));

                    const noiseValue = lerp(
                        lerp(activeNoiseGrid[cellTop][cellLeft],    activeNoiseGrid[cellTop][cellRight],    blendWeightX),
                        lerp(activeNoiseGrid[cellBottom][cellLeft], activeNoiseGrid[cellBottom][cellRight], blendWeightX),
                        blendWeightY
                    );

                    const colorIndex = Math.min(
                        Math.floor(noiseValue * activeRgbColors.length),
                        activeRgbColors.length - 1
                    );

                    const pixelIndex            = (y * canvasWidth + x) * 4;
                    pixelBuffer[pixelIndex]     = activeRgbColors[colorIndex][0];
                    pixelBuffer[pixelIndex + 1] = activeRgbColors[colorIndex][1];
                    pixelBuffer[pixelIndex + 2] = activeRgbColors[colorIndex][2];
                    pixelBuffer[pixelIndex + 3] = 255;
                }
            }

            ctx.putImageData(imageData, 0, 0);
            animFrameId = requestAnimationFrame(frame);
        }

        animFrameId = requestAnimationFrame(frame);

        // Auto-morph every n seconds — recursive setTimeout so it's easy to cancel cleanly
        const scheduleAutoMorph = () => {
            autoMorphTimeout = setTimeout(() => {
                morph(activeColour);
                scheduleAutoMorph();
            }, 5000);
        };
        scheduleAutoMorph();

        // Pass morph() back up to the parent so it can trigger palette changes
        onready?.({ morph, randomPalette });
    }

    $effect(() => {
        const colors = palettes[colour] ?? green;
        void resolution;
        drawBackground(colors);
    });

    onDestroy(() => stopAnimation());
</script>

<canvas
    bind:this={canvas}
    width={resolution}
    height={resolution}
></canvas>

<style>
    canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
    }
</style>
