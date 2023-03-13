import { useEffect, useState } from "react";
import axios from 'axios';

export default function useAuth(givenCode) {
    const [accessToken, setAccessToken] = useState();
    const code = (givenCode.code.code)

    useEffect(() => {
        axios
            .post("http://localhost:8000/login", { code })
            .then((response) => {
                console.log("successfully in useAuth .then")
                //if success then cut the code string from the URL and execute next thing
                // window.history.pushState({}, null, "/");
                console.log(response.data);
                setAccessToken(response.data.accessToken);
        })
        .catch((err) => {
            //if fail, redirect to home page (Login page)
            console.log("catch")
            console.log(err);
            // window.location = "/";
        });
    }, [code]);

    return accessToken;
}