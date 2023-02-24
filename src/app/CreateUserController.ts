import { ConfigProps, User, ErrorMessagesInterface, ERROR_MESSAGES } from "./CreateUserModel";

export default class CreateUserController {
    name: {
        state: string;
    };

    username: {
        state: string;
    };

    email: {
        state: string;
    };

    password: {
        state: string;
    };

    confirmPassword: {
        state: string;
    };

    constructor (configProps: ConfigProps) {
        this.name = {
            state: configProps.name.state,
        }

        this.username = {
            state: configProps.username.state,
        }

        this.email = {
            state: configProps.email.state,
        }

        this.password = {
            state: configProps.password.state,
        }

        this.confirmPassword = {
            state: configProps.confirmPassword.state,
        }
    }

    async addNewUser (errorHandler: Function, successHandler: Function) {
        let user: User = {
            name: this.name.state,
            username: this.username.state,
            email: this.email.state,
            password: this.password.state,
            confirmPassword: this.confirmPassword.state,
        };

        let blankTargets: Array<keyof User> = [];
        let errorMessage: string = '';

        Object.keys(user).forEach(key => {
            if(!this[key as keyof User].state) { 
                blankTargets.push(key as keyof User);
                if (!errorMessage) {
                    errorMessage = ERROR_MESSAGES[key as keyof ErrorMessagesInterface]?.Blank;
                }
            }
        });

        if (blankTargets.length === 0) {
            fetch("http://localhost:3000/api/add-user", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => {
                console.log('Got data');
                return res.json();
            })
            .then(data => {
                if (data.data) {
                    console.log(data.data);
                    console.log(`User ${this.name.state} (${this.username.state}) added!`);
                    successHandler('Usuário cadastrado com sucesso!', "new-user");
                } else {
                    console.error(data.error);
                    errorHandler({ message: data.error }, "existing-user");
                }
            });
        } else {
            console.log(user);
            console.error('Erros foram encontrados');
            errorHandler({ message: errorMessage, targets: blankTargets}, "blank-input");
        }
    }

    async getFromDatabase (username: string) {
        let options = {
            method: "POST",
            body: JSON.stringify(username),
            headers: {
                "Content-Type": "application/json",
            },
        };

        let users = fetch("http://localhost:3000/api/get-user", options)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data.data);
        });
    }
}