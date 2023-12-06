import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
    try {
        const encrytedPassword = await bcrypt.hash(password, saltRounds);
        return encrytedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password');
    }
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        const result = await bcrypt.compare(plainPassword, hashedPassword);
        return result;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Error comparing passwords');
    }
}