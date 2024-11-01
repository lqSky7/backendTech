import {serve} from "bun";

serve({
    fetch(req){
        const url = new URL(req.url);
        if (url.pathname == "/") {
            return new Response("helii", {status: 200});
        }
        else if (url.pathname != "/") {
            return new Response("not theer", {status: 404});
        }
    },
    port: 3001,
    hostname: "127.0.0.1"
})