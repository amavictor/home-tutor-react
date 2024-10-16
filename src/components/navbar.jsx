import { memo, useState } from "react"
import { Typography } from "./typography"
import { ProfileIcon } from "../assets"
import { useDevice } from "../hooks"

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useDevice();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="w-full flex items-center justify-between">
                <Typography
                    variant="h-m"
                    fontWeight="black"
                    className="cursor-pointer"
                >
                    Home tutorly
                </Typography>
                {!isMobile && (
                    <>
                        <div className="flex items-center gap-6">
                            <Typography
                                className="cursor-pointer hover:text-primary-color transition-colors duration-300"
                            >
                                About us
                            </Typography>
                            <Typography
                                className="cursor-pointer hover:text-primary-color transition-colors duration-300"
                            >
                                Contact
                            </Typography>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <ProfileIcon />
                            <Typography
                                variant="p-l"
                                fontWeight="medium"
                                className="cursor-pointer hover:text-primary-color transition-colors duration-300"
                            >
                                Hello, Mariam
                            </Typography>
                        </div>
                    </>
                )}
                {isMobile && (
                    <button onClick={toggleMenu} className="z-[3] relative w-6 h-6">
                        <div className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'top-3 rotate-45' : 'top-1'}`}></div>
                        <div className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'top-3'}`}></div>
                        <div className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'top-3 -rotate-45' : 'top-5'}`}></div>
                    </button>
                )}
            </nav>

            {isMobile && (
                <div className={`fixed z-[2] inset-0 bg-primary-color transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col items-center justify-center h-full gap-10">
                        <Typography
                            className="cursor-pointer mxxs:text-white hover:text-white text-2xl transition-colors duration-300"
                        >
                            About us
                        </Typography>
                        <Typography
                            className="cursor-pointer mxxs:text-white hover:text-white text-2xl transition-colors duration-300"
                        >
                            Contact
                        </Typography>
                        <div className="flex items-center gap-2 mt-6 bg-teal p-5 rounded-full">
                            <ProfileIcon />
                            <Typography
                                variant="p-l"
                                fontWeight="medium"
                                className="cursor-pointer hover:text-white transition-colors duration-300"
                            >
                                Hello, Mariam
                            </Typography>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export const Navbar = memo(NavbarComponent)