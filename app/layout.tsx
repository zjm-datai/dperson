import "./styles/globals.css";

const Layout = async({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <html>
            <head>

            </head>
            <body>
                {children}
            </body>
        </html>
    )
}

export default Layout