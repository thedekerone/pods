import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex justify-center items-center bg-primary text-white py-4">
            <div className="flex space-x-4">
                <Link className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" href="/private">Private</Link>
                <Link className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" href="/shared">Shared</Link>
            </div>
        </nav>
    );
};

export default Navbar;
