import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import CityComponent from "../../components/CityComponent.tsx";
type Data = {
    city?: string,
    temperature?: string,
    country?: string
}



export const handler:Handlers = {

    GET: async (_req:Request, ctx:FreshContext<unknown,Data>) => {
        const city = ctx.params.ciudad;
        try{
        const urlAPILatLon = `https://api.api-ninjas.com/v1/city?name=${city}`;
        const responseLatLon = await Axios.get(urlAPILatLon, {headers: {
            'X-Api-Key': Deno.env.get("API_KEY")
        }});
        const lat = responseLatLon.data[0].latitude;
        const lon = responseLatLon.data[0].longitude;
        const countryISO = responseLatLon.data[0].country;

        const urlAPICountry = `https://api.api-ninjas.com/v1/country?name=${countryISO}`
        const responseCountry = await Axios.get(urlAPICountry, {headers: {
            'X-Api-Key': Deno.env.get("API_KEY")
        }});
        const country = responseCountry.data[0].name;

        const urlAPIWeather = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`;
        const responseWeather = await Axios.get(urlAPIWeather, {headers: {
            'X-Api-Key': Deno.env.get("API_KEY")
        }});
        const temp = responseWeather.data.temp;

        return ctx.render({temperature: temp, city: city, country: country})

        } catch(e){
            return new Response("API ERROR")
        }
    }
} 

const Page = (props:PageProps<Data>) => {
    return(
        <div>
            <CityComponent city={props.data.city} country={props.data.country} temperature={props.data.temperature} />
        </div>
    )
}

export default Page;