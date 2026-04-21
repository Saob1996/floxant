import { FloxNavigation } from "./FloxNavigation";

/**
 * Compatibility Bridge: satisfies Next.js HMR phantom requirements 
 * for a Header.tsx module factory.
 */
export const Header = FloxNavigation;
export { FloxNavigation };
export default FloxNavigation;
