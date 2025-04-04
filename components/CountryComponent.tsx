import { FunctionalComponent } from "preact/src/index.d.ts";

type Props = {
    country: string,
    capital?: string
}

const CountryComponent:FunctionalComponent<Props> = (props) => {
    return(
        <div>
            <div>País: {props.country}</div>
            <div>Ciudad: <a href={`/city/${props.capital}`}>{props.capital}</a></div>
        </div>
    )
}

export default CountryComponent;