import React,{useCallback} from 'react'
import {Button,RTE,Input,Select} from "../index"
import {useForm} from "react-hook-form"
import service from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm(post){

        const{register,handleSubmit,watch,
                setValue,control,getValues} = useForm({
                    defaultValues: {
                        title: post? post.title : "",
                        slug : post? post.slug : "",
                        content : post? post.content : "",
                        status : post? post.status : "active",
                    },
        })

        const navigate = useNavigate()

        const userData = useSelector((state) => state.auth.userData)

        // if we have post then we are going to update it
        const submit = async(data) =>{
            if (post) {
                //first, if we have a new image then upload in file
                const file = data.image[0] ? service.uploadFile(data.image[0]) : null
                
                //delete old image
                if(file){
                    service.deleteFile(post.featuredImage)
                }

                //if we have new image then we will update it, else keep it same
                const dbPost = await service.updatePost(
                    post.$id,{...data, featuredImage: file? file.$id : post.featuredImage}
                )

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
                
            } else {
                // if we not file post then create new and upload
                const file = await service.uploadFile(data.image[0])
                if(file){
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await service.createPost({
                        ...data,
                        userId: userData.$id,
                    })
                    if(dbPost){
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
                
            }
        }

        //slug transformation method
        React.useEffect(() => {
            const subscription = watch((value, { name }) => {
                if (name === "title") {
                    setValue("slug", slugTransform(value.title), { shouldValidate: true });
                }
            });
    
            return () => subscription.unsubscribe();
        }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm