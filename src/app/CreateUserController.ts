export default class CreateUserController {
    addToDatabase (name: string, username: string, email: string, password: string) {
        console.log(`Name: ${name}`);
        console.log(`Username: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
    }
}