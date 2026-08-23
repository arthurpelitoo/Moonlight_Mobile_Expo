
export type AnimationState = {
    styles: {
        rotate: string;
        rotate180: string;
        slideInsideScreen: string;
        slideUp: string;
        slideDown: string;
        fadeInOpacity: string;
        fadeOutOpacity: string;
        heightZero: string;
        scaleMore: string;
        scaleLess: string;
        pointer: string
    }
}

/**
 * STYLES:  ESTADO FINAL | ESTADO INICIAL
 * @param isActive
 * @returns
 */
export function getAnimationState(isActive: boolean): AnimationState{
    return{
        styles: {
            rotate: isActive ? "rotate-45" : "rotate-0",
            rotate180: isActive ? "rotate-180" : "rotate-0",
            slideInsideScreen: isActive ? "translate-x-0" : "-translate-x-full",
            slideUp: isActive ? "-translate-y-4" : "translate-y-0",
            slideDown: isActive ? "translate-y-0" : "-translate-y-4",
            fadeInOpacity: isActive ? "opacity-100" : "opacity-0",
            fadeOutOpacity: isActive ? "opacity-0" : "opacity-100",
            heightZero: isActive ? "max-h-0" : "max-h-50",
            scaleMore: isActive ? "scale-100" : "scale-75",
            scaleLess: isActive ? "scale-75" : "scale-100",
            pointer: isActive ? "pointer-events-auto" : "pointer-events-none"
        }
    };
}
