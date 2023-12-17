import bcrypt from 'bcrypt';

const hashPassword = (password, salt) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(Number(salt)));
};

const passwordCheck = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

export { hashPassword, passwordCheck };