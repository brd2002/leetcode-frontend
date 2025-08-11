import React, {useRef} from 'react';
import { motion } from "motion/react";
// import VariableProximity from "./LeftSectionTextComponent.jsx";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

function LeftHeroSection(props) {
    const containerRef = useRef(null);
    return (
        <div className="flex h-screen pt-5">
            <HeroHighlight>
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                >
                    With {"<codeKiller/>"}, nothing&apos;s real. Everything is far away. Everything
                    is a{" "}
                    <Highlight className="text-black dark:text-white">
                        copy, of a copy, of a copy.
                    </Highlight>
                </motion.h1>
            </HeroHighlight>
            {/*<VariableProximity*/}
            {/*    label={'Transform your programming skills with <codeKiller/>  - where consistent practice meets strategic preparation'}*/}
            {/*    className={'variable-proximity-demo'}*/}
            {/*    fromFontVariationSettings="'wght' 400, 'opsz' 9"*/}
            {/*    toFontVariationSettings="'wght' 1000, 'opsz' 40"*/}
            {/*    containerRef={containerRef}*/}
            {/*    radius={100}*/}
            {/*    falloff='linear'*/}
            {/*/>*/}
            {/*<h1 className="text-4xl  text-center font-[Monolisa]">*/}
            {/*    Transform your programming skills with <b>codeKiller</b>  - where consistent practice meets strategic preparation.*/}
            {/*</h1>*/}
            {/*<p>*/}
            {/*    algorithmic thinking becomes second nature, and coding interviews turn from obstacles into opportunities*/}
            {/*    for showcasing your expertise*/}
            {/*</p>*/}
        </div>
    );
}

export default LeftHeroSection;