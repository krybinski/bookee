import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hashSync(password, await bcrypt.genSaltSync(10));
}

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compareSync(password, hash);
}
