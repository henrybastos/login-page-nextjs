export interface ErrorMessages {
    user: {
        WhiteSpaces: string;
        Blank: string;
    }
    password: {
        WhiteSpaces: string;
        Blank: string;
    },
}

export interface ConfigProps{
    user: {
        setState: Function;
        state: string;
    };
    password: {
        setState: Function;
        state: string;
    };
}

export const ERROR_MESSAGES: ErrorMessages = {
    user: {
        WhiteSpaces: "O \"Nome de usuário ou Email\" não pode conter espaços.",
        Blank: "O \"Nome de usuário ou Email\" não pode estar em branco.",
    },
    password: {
        WhiteSpaces: "A \"Senha\" não pode conter espaços.",
        Blank: "A \"Senha\" não pode estar em branco.",
    },
}

export class LoginUserModel {
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

    checkBlank (value: string, validationType: string) {
        if (value === '') {
            throw { message: ERROR_MESSAGES[validationType as keyof ErrorMessages].Blank, type: validationType};
        } else {
            return this;
        };
    }
    
    checkWhiteSpace (value: string, validationType: string) {
        if (value?.includes(' ')) {
            throw { message: ERROR_MESSAGES[validationType as keyof ErrorMessages].WhiteSpaces, type: validationType};
        } else {
            return this;
        };
    }
}