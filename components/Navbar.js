import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <div className='navbar'>
                <ul id="nav">
                    <li>
                        <Link href='/'>
                            <a>Home</a>
                        </Link>
                    </li>
                    {/* <li>
                        <Link href='/info'>
                            <a>Info</a>
                        </Link>
                    </li> */}
                    {/* <li><a href="#">Contact</a></li> */}
                </ul>
            </div>

            <style jsx>{`
                .navbar {
                    text-align: center;
                }
                #nav {
                    width: 100%;
                    margin: 0 0 3em 0;
                    padding: 0;
                    list-style: none; 
                }
                #nav ul {
                    display: inline-block;
                    text-align: center;
                }
                #nav li {
                    display: inline-block; }
                
                #nav li a {
                    display: inline-block;
                    padding: 8px 15px;
                    text-decoration: none;
                    font-weight: bold;
                    color: #069;
                    border-right: 1px solid #ccc; }
            `}</style>
        </div>
    )
};

export default Navbar;
