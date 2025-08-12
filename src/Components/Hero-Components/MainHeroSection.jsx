import React from 'react';
import LeftHeroSection from "./LeftHeroSection.jsx";
import RightHeroSection from "./RightHeroSection.jsx";

function MainHeroSection(props) {
    return (
        <div className="flex">
            <div className="w-1/2 ">
                <LeftHeroSection />
            </div>
            <div className="w-1/2 p-5">
                <RightHeroSection />
            </div>
        </div>
    );
}

export default MainHeroSection;