"use client"
import { Collection, Task } from '@prisma/client';
import React, { useMemo, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Button } from "./button";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Progress } from "./progress";
import { Separator } from "./separator";
import { Plus, Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { deleteCollection } from "@/actions/collections";
import { toast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation'
import { useTransition } from "react";
import CreateTaskDialog from './CreateTaskDialog';
import TaskCard from '../TaskCard';




interface Props {
    collection: Collection & {
        tasks: Task[];
    };
}




function CollectionCard({collection}: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();

    const[showCreatedModal, setShowCreatedModal] = useState(false);

    const tasks = collection.tasks;

    const removeCollection = async () => {
        try{
            await deleteCollection(collection.id)
            toast({
                title: "Success",
                description: "Collection deleted successfully!",
                
            });
            router.refresh()
        }
        catch(e) {
            toast({
                title: "Failure",
                description: "Something went wrong! Cannot delete collection.",
                variant: "destructive"
            });
        }
        
    } 
    
    const totalTasks = collection.tasks.length;

    const tasksDone = useMemo( () => {
        return collection.tasks.filter(task => task.done).length
    }, [collection.tasks])

    const progress = totalTasks === 0 ? 0: (tasksDone / totalTasks) * 100;

    return (

        <>
            <CreateTaskDialog open={showCreatedModal} setOpen = {setShowCreatedModal} collection={collection}/>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
            <Button variant={"ghost"} className={cn("flex w-full justify-between p-6", isOpen && "rounded-b-none", CollectionColors[collection.color as CollectionColor])}>
                <span className="text white font-bold">{collection.name}</span>
                {!isOpen && <ChevronDown className="h-6 w-6"/>}
                {isOpen && <ChevronUp className="h-6 w-6"/>}
                </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg ">
            {tasks.length === 0 && <Button variant={"ghost"} className='flex items-center justify-center gap-1 p-8 py-12 rounded-none' onClick={() => setShowCreatedModal(true)}>
                    <p>There are no tasks yet:</p>
                    <span className={cn("text-sm bg-clip-text text-transparent", CollectionColors[collection.color as CollectionColor])}>Create one</span>
                </Button>}
            {
                tasks.length > 0 && (
                    <>
                        <Progress className="rounded-none" value={progress}/>
                        <div className="p-4 gap-3 flex flex-col">
                            
                            {tasks.map((task) => (
                                <TaskCard key={task.id} task={task}/>
                            ) )}
                        </div>
                    </>
                )
            }
            <Separator/>
            <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center">
                <p>Created at {collection.createdAt.toLocaleDateString("en-au")}</p>
                {isLoading && (
                    <div>Deleting...</div>
                )}
                {!isLoading && (
                    <div>
                    <Button size={"icon"} variant={"ghost"} onClick={() => {
                        setShowCreatedModal(true);
                    }}>
                        <Plus className="w-4 h-4"/>
                    </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size={"icon"} variant={"ghost"}>
                                <Trash className="w-4 h-4"/>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogTitle>
                                    Are you sure you want to delete this collection?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone
                                </AlertDialogDescription>
                                <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick = {() => {
                                        startTransition(removeCollection);
                                        
                                    }}>
                                    Proceed
                                </AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                            
                        </AlertDialog>
                    
                </div>
                )}
                
            </footer> 
        </CollapsibleContent>
    </Collapsible>
    
        </>
    )
    
}

export default CollectionCard;