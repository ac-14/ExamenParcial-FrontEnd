import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import CountryComponent from "../../components/CountryComponent.tsx";
type Data = {
    country: string,
    capital?: string
}

export const handler:Handlers = {

    GET: async (_req:Request, ctx:FreshContext<unknown,Data>) => {
        const countryParam = ctx.params.pais;
        try{
        const urlAPICountry = `https://api.api-ninjas.com/v1/country?name=${countryParam}`;
        const responseCountry = await Axios.get(urlAPICountry, {headers: {
            'X-Api-Key': Deno.env.get("API_KEY")
        }});
        const capital = responseCountry.data[0].capital;
        const country = responseCountry.data[0].name;
        return ctx.render({country: country, capital: capital})
        } catch(e){
            return new Response("API ERROR")
        }
    }
} 

const Page = (props:PageProps<Data>) => {
    return(
        <div>
            <CountryComponent country={props.data.country} capital={props.data.capital}/>
        </div>
    )
}

export default Page;