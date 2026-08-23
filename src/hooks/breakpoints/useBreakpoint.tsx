// import { useEffect, useState } from "react";
// import { breakpoints } from "./breakpoint";

// type breakpointStatement = {
//     isMobile: boolean,
//     isTablet: boolean,
//     isDesktop: boolean,
//     width: number
// }

// export function useBreakpoint(): breakpointStatement{
//     const [width, setWidth] = useState(window.innerWidth);

//     useEffect(() => {
//         function handleResize() {
//             setWidth(window.innerWidth);
//         }

//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize)
//     }, [])

//     return {
//         isMobile: width < breakpoints.sm,
//         isTablet: width >= breakpoints.sm && width < breakpoints.lg,
//         isDesktop: width >= breakpoints.lg,
//         width
//     }
// }
