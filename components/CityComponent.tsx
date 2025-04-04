import { FunctionalComponent } from "preact/src/index.d.ts";

type Props = {
    city?: string,
    temperature?: string,
    country?: string
}

const CityComponent:FunctionalComponent<Props> = (props) => {
    return(
        <div>
            <div>Ciudad: {props.city}</div>
            <div>País: <a href={`/country/${props.country}`}>{props.country}</a></div>
            <div>Temperatura: {props.temperature}</div>
        </div>
    )
}

export default CityComponent