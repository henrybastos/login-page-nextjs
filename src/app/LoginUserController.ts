import { ConfigProps } from "./LoginUserModel";

export class LoginUserController {
    user: {
        setState: Function;
        state: string;
    }

    password: {
        setState: Function;
        state: string;
    }

    constructor (configProps: ConfigProps) {
        this.user = {
            setState: configProps.user.setState,
            state: configProps.user.state,
        }

        this.password = {
            setState: configProps.password.setState,
            state: configProps.password.state,
        }
    }

    async loginUser () {
        let response: object = {};
        await fetch("/api/get-user", {
            method: "POST",
            body: JSON.stringify({
                user: this.user.state,
                password: this.password.state,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            // if (data.status === 200) {
            //     console.log(data.data);
            // } else if (data.status === 404 ) {
            //     console.error(data.data);
            // }
            response = data.data;
        });

        return response;
    }
}