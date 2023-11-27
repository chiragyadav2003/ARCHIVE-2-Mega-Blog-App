import envData from "../env-variable/env-variable.js"
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(envData.appwriteUrl)
            .setProject(envData.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    //create account
    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call another method - user account created then login successfully
                return this.login({email, password})
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            console.log("Appwrite service :: createAccount :: error :: ", error);
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);            
        } catch (error) {
            console.log("Appwrite service :: login :: error :: ", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // console.log(envData.appwriteURL,envData.appwriteProjectID,envData.appwriteDatabaseID,envData.appwriteCollectionID,envData.appwriteBucketID,)
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }



}

// we will export object created from class AuthService
const authService = new AuthService();

export default authService;
