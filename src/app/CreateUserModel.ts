type Password = {
    WhiteSpaces: string;
}

type Username = {
    WhiteSpaces: string;
}

type ErrorMessagesInterface = {
    Password: Password;
    Username: Username;
}

const ERROR_MESSAGES: ErrorMessagesInterface = {
    Password: {
        WhiteSpaces: "A senha não pode conter espaços."
    },
    Username: {
        WhiteSpaces: "O nome de usuário não pode conter espaços."
    },
}

type Timeout = ReturnType<typeof setTimeout >;

export default class CreateUserModel {
    debounce (callback: Function, delay: number) {
        let timeout: Timeout;
        return (...args: Array<unknown>) => {
            clearTimeout(timeout);
            // console.log('Restart...');
            timeout = setTimeout(() => { callback(...args) }, delay);
        }
    }

    checkEmail = this.debounce(() => {
        console.log("Email!");
    }, 1000);
            
    // runChecks = this.debounce((checkValue, setStatus, setValidationsObject, validationsObject, validationType, setLoadingState, setErrorMessage) => {
    runChecks = (checkValue: string, setStatus: Function, setValidationsObject: unknown, validationsObject: unknown, validationType: string, setLoadingState: Function, setErrorMessage: Function) => {
        let check;
        setLoadingState(false);
        
        try{
            switch (validationType) {
                case "Username":
                    this.checkUsername(checkValue);
                    break;
                case "Password":
                    this.checkPassword(checkValue);
                    break;
            }
                check = checkValue;
            }
            catch(error) {
                setErrorMessage(error);
                check = false;
            }
            finally {
                setStatus(check);
                // setValidationsObject(check);
                // console.log(check);
                // console.log(checkValue);
                // console.log(validationsObject);
            }
    };

    checkUsername (username: string) {
        this.verifyWhiteSpace(username, "Username");
    }

    checkPassword (password: string) {
        this.verifyWhiteSpace(password, "Password");
    }

    verifyWhiteSpace (string: string, validationType: string) {
        if (string?.includes(' ')) {
            throw ERROR_MESSAGES[validationType as keyof ErrorMessagesInterface].WhiteSpaces;
        } else {
            return this;
        };
    }
}