import Navbar from './Navbar.js'

const Layout = props => (
    <div>
        <Navbar />
        <div>
            {props.content}
        </div>
    </div>
)
export default Layout