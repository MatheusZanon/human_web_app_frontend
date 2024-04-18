import React from "react";
import style from "./loading-screen.module.scss";

function LoadingScreen() {
    return ( 
        <div className="spinner-border text-primary">
            <span className="sr-only">.</span>
        </div>
    );
}

export default LoadingScreen;