import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import SearchForm from "../components/SearchForm.tsx";
type Data = {
  is_valid?: boolean,
  phone?: string,
  country?: string,
}

export const handler:Handlers = {
  GET: async(req:Request, ctx:FreshContext<unknown,Data>) => {
    const urlForm = new URL(req.url);
    const phone = urlForm.searchParams.get("phone");
    if(phone){
      try{
      const checkPhoneAPI = `https://api.api-ninjas.com/v1/validatephone?number=${phone}`;
      const responsePhone = await Axios.get(checkPhoneAPI, {headers: {
        'X-Api-Key': Deno.env.get("API_KEY")
      }})
      const is_valid = responsePhone.data.is_valid;
      const country = responsePhone.data.country;
      return ctx.render({
        is_valid: is_valid,
        country: country,
        phone: phone,
      })
    } catch(e){
      return new Response("Error de API")
    }
    }
    return ctx.render();
  }
}


const Page = (props:PageProps<Data>) => {
  return(
    <div>
      <SearchForm/>

      <div>{props.data ? <div>{props.data?.is_valid ? <div>
        <div>Teléfono: {props.data.phone}</div>
        <div>País: <a href={`country/${props.data.country}`}>{props.data.country}</a></div>
      </div>: <div>Formato de teléfono incorrecto</div>}</div> : null}</div>
    </div>
  )
}

export default Page;