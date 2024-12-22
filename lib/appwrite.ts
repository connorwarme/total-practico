import { Account, Avatars, Client, ID } from "react-native-appwrite";

interface User {
  email: string;
  password: string;
  username: string;
}

// config for appwrite
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.decodesolutions.aora",
  projectId: "676776a300119dc64d85",
  databaseId: "676778e60032d8fce7e9",
  userCollectionId: "6767796000230a585e21",
  videoCollectionId: "6767798d002838fdf420",
  storageId: "67677bc1002aa6062e2c",
};

// init react-native-appwrite client
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, username }: User) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarsUrl = avatars.getInitials(username);
    await signIn();
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

const signIn = async ({ email, password }: User) => {};
// 1:49
