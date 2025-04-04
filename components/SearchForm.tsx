import { FunctionalComponent } from "preact/src/index.d.ts";

const SearchForm:FunctionalComponent = () => {
    return(
        <form method="GET" action="/">
        <input type="text" name="phone"/>
        <button type="submit">Enviar</button>
        </form>
    )
}

export default SearchForm;