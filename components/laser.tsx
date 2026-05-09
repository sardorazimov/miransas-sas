"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef } from 'react';
import LaserFlow from './laser-flow';
import MiransasHero from './landing';

// NOTE: You can also adjust the variables in the shader for super detailed customization

// Basic Usage


const LaserHero = () => {
    return (
        <div className="bg-black">
            <div style={{ height: '900px', position: 'relative', overflow: 'hidden' }}>
                <LaserFlow />
            </div>
        </div>
    )
}

export default LaserHero

// Image Example Interactive Reveal Effect
function LaserFlowBoxExample() {
    const revealImgRef = useRef<HTMLImageElement | null>(null);

    return (
        <div
            style={{
                height: '800px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#120F17'
            }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', `${x}px`);
                    el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
                }
            }}
            onMouseLeave={() => {
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', '-9999px');
                    el.style.setProperty('--my', '-9999px');
                }
            }}
        >
            
            <LaserFlow
                horizontalBeamOffset={0.1}
                verticalBeamOffset={0.0}
                color="#CF9EFF"
                
            />
            <div>
                <h1 className='text-4xl text-white pt-20'>aaaaaa</h1>
            </div>
            <div style={{
               
            }}>
                <div>
                    <MiransasHero/>
                    <h1 className='text-4xl text-white'>aaaaaa</h1>
                    <h1 className='text-4xl text-white'>aaaaaa</h1>
                    <h1 className='text-4xl text-white'>aaaaaa</h1>
                    <h1 className='text-4xl text-white'>aaaaaa</h1>
                   
                </div>
            </div>

          
        </div>
    );
}