'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import FileUpload from '../file-upload'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import TextEditor from '../textEditor/TextEditor'
import { MDXEditor, headingsPlugin } from '@mdxeditor/editor'

const BlogForm = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product." : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Post";
    const countries = [{ id: "wow", name: "india" }];
    const defaultValues = initialData
        ? initialData
        : {
            name: "",
            description: "",
            price: 0,
            imgUrl: [],
            category: "",
        };
    const ImgSchema = z.object({
        fileName: z.string(),
        name: z.string(),
        fileSize: z.number(),
        size: z.number(),
        fileKey: z.string(),
        key: z.string(),
        fileUrl: z.string(),
        url: z.string(),
    });
    const formSchema = z.object({
        name: z
            .string()
            .min(3, { message: "Product Name must be at least 3 characters" }),
        imgUrl: z
            .array(ImgSchema)
            .max(1, { message: "You can only add 1 image" })
            .min(1, { message: "At least one image must be added." }),
        description: z
            .string()
            .min(3, { message: "Product description must be at least 3 characters" }),
        price: z.coerce.number(),
        category: z.string().min(1, { message: "Please select a category" }),
    });

    type ProductFormValues = z.infer<typeof formSchema>;
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
    const onSubmit = async (data) => {

    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name="imgUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        onChange={field.onChange}
                                        value={field.value}
                                        onRemove={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Blog title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div  id='text-editor-container'>
                        <p className='text-sm mb-1'>Blog</p>
                        <TextEditor/>
                        {/* <MDXEditor markdown={'# Hello World'} plugins={[headingsPlugin()]} /> */}
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default BlogForm