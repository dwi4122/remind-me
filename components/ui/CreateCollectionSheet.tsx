import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";
import { useForm } from "react-hook-form";
import { CreateCollectionSchema, CreateCollectionSchemaType } from "@/schema/createCollection";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Select, SelectTrigger,  SelectItem, SelectValue, SelectContent } from "./select";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";
import { Button } from "./button";
import { createCollection } from "@/actions/collections";
import { toast } from "@/hooks/use-toast";
import { RefreshCcw } from 'lucide-react';
import { useRouter } from "next/navigation";


interface Props {
    open: boolean,
    onOpenChange: (open:boolean) => void;
}

function CreateCollectionSheet({open, onOpenChange}: Props) {
    const form = useForm<CreateCollectionSchemaType>({
        defaultValues: {name: 'Work'},
        resolver: zodResolver(CreateCollectionSchema),
    });



    const router = useRouter();

    const onSubmit = async (data: CreateCollectionSchemaType) => {
        try {
            await createCollection(data);
            openChangeWrapper(false);
            router.refresh();
            
            toast({
                title: "Success",
                description: "Collection created successfully."
            });
            console.log("Submitted", data);

          } catch (error: any) {
            // Show toast
            toast({
                title: "Failure",
                description: "Something went wrong! please try again.",
                variant: "destructive"
            });
            console.log("Error", error);
          }
    }

    const openChangeWrapper = (open:boolean) => {
        form.reset();
        onOpenChange(open);
    };

    return (
        <Sheet open={open} onOpenChange={openChangeWrapper}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add new collection</SheetTitle>
                    <SheetDescription>Collections are a way to group your tasks</SheetDescription>
                </SheetHeader>
                <Separator/>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space y-8 flex flex-col">
                        <FormField control={form.control} defaultValue={"Work"} name="name" render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Text" {...field} />
                                </FormControl>
                                <FormDescription>Collection Name</FormDescription>
                                <Separator/>
                                <FormMessage/>
                            </FormItem>
                            )} 
                        />
                        <Separator/>
                        <FormField control={form.control}  name="color" render={({field}) => (
                            <FormItem>
                            <FormLabel htmlFor="color">Color</FormLabel>
                            <FormControl>
                                <Select onValueChange={(color) => field.onChange(color)}>
                                    <SelectTrigger className={cn(
                                        "w-full h-8 text-white", CollectionColors[field.value as CollectionColor]
                                    )}>
                                        <SelectValue placeholder="Color" className="w-full h-8" >
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        {Object.keys(CollectionColors).map((color) => (
                                            <SelectItem key={color} value={color} className={cn(`w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8`, CollectionColors[color as CollectionColor])}>{color}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>Select a color for your collection</FormDescription>
                            <Separator/>
                            <FormMessage/>
                        </FormItem>
                        )}
                        />
                        <div className="flex flex-col gap-3 mt-4">
                    
                    <Button onSubmit={form.handleSubmit(onSubmit)}  disabled={form.formState.isSubmitting} className={cn(
                        form.watch("color") && CollectionColors[form.getValues("color") as CollectionColor]
                    )}>
                        Confirm
                        {form.formState.isSubmitting && (
                            <RefreshCcw className="ml-2 h-2 w-4 animate-spin"/>
                        )}
                        </Button>
                </div>
                    </form>
                </Form>
                
            </SheetContent>
        </Sheet>
    )
}

export default CreateCollectionSheet;