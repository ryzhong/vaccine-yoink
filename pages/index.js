import Link from 'next/link';
import Layout from '../components/Layout.js';

const Index = () => (
    <Layout content={( 
        <div>
            <h1>Home page</h1>
            <Link href='/info'>
                <a>Info</a>
            </Link>

            <style jsx>{`
                h1{
                    font-size: 3rem;
                    color: lightblue;
                }
            `}</style>
        </div>

    )} />
    // <div>
    //     <h1>Home page</h1>
    //     <Link href='/info'>
    //         <a>Info</a>
    //     </Link>

    //     <style jsx>{`
    //         h1{
    //             font-size: 3rem;
    //             color: lightblue;
    //         }
    //     `}
    //     </style>
    // </div>
)

export default Index;