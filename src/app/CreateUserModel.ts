export interface ErrorMessagesInterface {
    name: {
        WhiteSpaces?: string;
        Blank: string;
    };
    username: {
        WhiteSpaces: string;
        Blank: string;
    };
    email: {
        WhiteSpaces: string;
        Blank: string;
    },
    password: {
        WhiteSpaces: string;
        ConfirmPassword: string;
        Blank: string;
    };
    confirmPassword: {
        WhiteSpaces: string;
        ConfirmPassword: string;
        Blank: string;
    };
}

export interface User {
    name: string, 
    username: string, 
    email: string, 
    password: string, 
    confirmPassword?: string,
}

export const ERROR_MESSAGES: ErrorMessagesInterface = {
    name: {
        Blank: "O \"Nome\" não pode estar em branco.",
    },
    username: {
        WhiteSpaces: "O \"Nome de usuário\" não pode conter espaços.",
        Blank: "O \"Nome de usuário\" não pode estar em branco.",
    },
    email: {
        WhiteSpaces: "O \"Email\" não pode conter espaços.",
        Blank: "O \"Email\" não pode estar em branco.",
    },
    password: {
        WhiteSpaces: "A \"Senha\" não pode conter espaços.",
        ConfirmPassword: "As \"Senhas\" não são iguais.",
        Blank: "As \"Senhas\" não podem estar em branco.",
    },
    confirmPassword: {
        WhiteSpaces: "A \"Senha\" não pode conter espaços.",
        ConfirmPassword: "As \"Senhas\" não são iguais.",
        Blank: "As \"Senhas\" não podem estar em branco.",
    },
}

type Timeout = ReturnType<typeof setTimeout> | undefined;

export interface ConfigProps{
    name: {
        setState: Function;
        state: string;
    };
    
    username: {
        setState: Function;
        state: string;
    };

    email: {
        setState: Function;
        state: string;
    };

    password: {
        setState: Function;
        state: string;
    };

    confirmPassword: {
        setState: Function;
        state: string;
    };
}

export class CreateUserModel {
    name: {
        setState: Function;
        state: string;
    };
    
    username: {
        setState: Function;
        state: string;
    };

    email: {
        setState: Function;
        state: string;
    };

    password: {
        setState: Function;
        state: string;
    };

    confirmPassword: {
        setState: Function;
        state: string;
    };

    constructor (configProps: ConfigProps) {
        this.name = {
            setState: configProps.name.setState,
            state: configProps.name.state,
        }
        
        this.username = {
            setState: configProps.username.setState,
            state: configProps.username.state,
        }
        
        this.email = {
            setState: configProps.email.setState,
            state: configProps.email.state,
        }
        
        this.password = {
            setState: configProps.password.setState,
            state: configProps.password.state,
        }

        this.confirmPassword = {
            setState: configProps.confirmPassword.setState,
            state: configProps.confirmPassword.state,
        }
    }

    debounce (callback: Function, delay: number) {
        let timeout: Timeout;
        return (...args: Array<unknown>) => {
            clearTimeout(timeout);
            console.log('Restart...');
            timeout = setTimeout(() => { callback(...args) }, delay);
        }
    }
            
    runChecks = (setCheckState: Function, validationType: string, setErrorMessage: Function, setLoadingState?: Function) => {
        // setLoadingState && setLoadingState(false);
        
        try{
            switch (validationType) {
                case "username":
                    this.checkUsername();
                    break;
                case "email":
                    this.checkEmail();
                    break;
                case "password":
                    this.checkPassword(this.password.state);
                    break;
                case "confirmPassword":
                    this.checkPassword(this.confirmPassword.state);
                    break;
            }
            
            setCheckState(true);
            setErrorMessage('');
        }
        catch(error) {
            setErrorMessage(error);
            console.error(error);
            setCheckState(false);
        }
    };

    checkUsername () {
        this.checkWhiteSpace(this.username.state, "username");
    }

    checkEmail () {
        this.checkWhiteSpace(this.email.state, "email");
    };

    checkPassword (password: string) {
        this.checkWhiteSpace(password, "password");
    }

    checkBlank (value: string, validationType: string) {
        if (value === '') {
            throw ERROR_MESSAGES[validationType as keyof ErrorMessagesInterface].Blank;
        } else {
            return this;
        };
    }

    checkWhiteSpace (value: string, validationType: string) {
        if (value?.includes(' ')) {
            throw ERROR_MESSAGES[validationType as keyof ErrorMessagesInterface].WhiteSpaces;
        } else {
            return this;
        };
    }
}