import { sql } from "../../db/connection";
import { User, BodyParamUser } from "../../typings/User";

export const readUser = async (user: BodyParamUser): Promise<User> => {
  const rows =
    await sql`SELECT * FROM "Users" WHERE username = ${user.username}`;
  return rows[0] as User;
};

export const createUser = async (user: BodyParamUser): Promise<User> => {
  const rows =
    await sql`INSERT INTO "Users" (username, password) VALUES (${user.username}, ${user.password}) RETURNING *`;
  return rows[0] as User;
};

export const updateUser = async (user: User): Promise<User> => {
  const rows =
    await sql`UPDATE "Users" SET username = ${user.username}, password = ${user.password} WHERE id = ${user.id} RETURNING *`;
  return rows[0] as User;
};

export const deleteUser = async (id: number): Promise<User> => {
  const rows = await sql`DELETE FROM "Users" WHERE id = ${id} RETURNING *`;
  return rows[0] as User;
};
