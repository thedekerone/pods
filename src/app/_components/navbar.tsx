"use client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-center items-center bg-primary relative text-white py-4">
            <Image
                width="50"
                height="50"
                className="absolute left-2"
                src={"/pod2.png"}
                alt="pod logo"
            />
            <div className="flex space-x-4">
                <Link
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    href="/"
                >
                    Private
                </Link>
                <Link
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    href="/shared"
                >
                    Shared
                </Link>
            </div>{" "}
        </nav>
    );
};

export default Navbar;
