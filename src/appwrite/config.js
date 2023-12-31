import envData from "../env-variable/env-variable";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{

    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(envData.appwriteUrl)
            .setProject(envData.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //here we will be using slug as document id for each post
    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.databases.createDocument(
                envData.appwriteDatabaseId,
                envData.appwriteCollectionId,
                slug,
                {
                    title,content,featuredImage,status,userID
                }
            )
        } catch (error) {
                console.log("Appwrite service :: createPost :: error :: ", error);
        }
    }

    //it will be good if we separately pass the id of document which we want to update
    //here slug will behave as document id
    async updatePost(slug, { title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                envData.appwriteDatabaseId,
                envData.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error :: ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                envData.appwriteDatabaseId,
                envData.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error :: ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                envData.appwriteDatabaseId,
                envData.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error :: ", error);
        }
    }

    //we will try to access only those documents whose status is active
    //for queries indexing is required which we have created in database already
    // async getAllPosts(queries = [Query.equal("status", "active")]){
    //     try {
    //         return await this.databases.listDocuments(
    //             envData.appwriteDatabaseId,
    //             envData.appwriteCollectionId,
    //             queries,
    //             //passing queries here, we can also pass queries manually here by writing them here
    //             // [
    //             //     Query.equal("status", "active")
    //             // ]
    //         );
    //     } catch (error) {
    //         console.log("Appwrite service :: getAllPosts :: error :: ", error);
    //         return false;
    //     }
    // }

    //**  m-2 of passing queries
    async getAllPosts(){
        try {
            return await this.databases.listDocuments(
                envData.appwriteDatabaseId,
                envData.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: error :: ", error);
            return false;
        }
    }



    // ** file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                    envData.appwriteBucketId,
                    ID.unique(),
                    file
                    )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error :: ", error);
            return false;
        }
    }

    //featuredimage is file id
    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                envData.appwriteBucketId,
                fileID
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error :: ", error);
            return false;
        }
    }

    async getFilePreview(fileID){
        try {
            return await this.bucket.getFilePreview(
                envData.appwriteBucketId,
                fileID
            );
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error :: ", error);
        }
    }    


}

const service = new Service();

export default service;