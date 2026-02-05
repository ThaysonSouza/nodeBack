import bcrypt from 'bcrypt';

const SALT = 10;

export async function gerarSenha(senha: string){
    return bcrypt.hash(senha, SALT);
}

export async function validarSenha(senha: string, hash: string){
    
    return bcrypt.compare(senha, hash);
}

