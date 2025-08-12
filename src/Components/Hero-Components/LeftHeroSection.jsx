import React, {useRef} from 'react';
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

function LeftHeroSection(props) {
    return (
        <div className="flex  pt-5">
            <HeroHighlight className="">
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
                    With {"<codeKiller/>"}, nothing&apos;s unsolveable. Create your own product.

                    <Highlight className="text-black dark:text-white">
                        Solve, Create, Earn Money.
                    </Highlight>
                </motion.h1>
            </HeroHighlight>
        </div>
    );
}

export default LeftHeroSection;