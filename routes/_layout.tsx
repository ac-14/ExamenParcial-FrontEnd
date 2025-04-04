import { PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";

const Layout = (props:PageProps) => {
    const Component = props.Component;

    return(
        <div class="layout">
            <Header/>
            <div class="component">
            <Component/>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;