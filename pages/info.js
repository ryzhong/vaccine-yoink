// import Link from 'next/link';
import Layout from '../components/Layout.js';

const Info = () => (
    <Layout content={( 
        <div>
            <h1>Info page</h1>

            <style jsx>{`
                h1{
                    font-size: 3rem;
                    color: lightblue;
                }
            `}</style>
        </div>

    )} />
)

export default Info;