const Layout = props => (
    <div>
        <nav>
            <ul>
                <li>Home</li>
            </ul>
        </nav>
        <main>
            {props.content}
        </main>
    </div>
)
export default Layout