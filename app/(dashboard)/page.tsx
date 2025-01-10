import CollectionCard from "@/components/ui/CollectionCard";
import CreateCollectionButton from "@/components/ui/CreateCollectionButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { Key, Suspense } from "react";

export default async function Home() {
  return (
  <> 
  <Suspense fallback={<WelcomeMsgFallback/>}>
    <WelcomeMsg/>
  </Suspense>
  <Suspense fallback={<div>Loading collection</div>}>
    <CollectionList/>
  </Suspense>
  
  
  </> 
  )
}


async function WelcomeMsg() {
  const user = await currentUser();


  if(!user) {
    return <div>Eroor</div>
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
          Welcome, <br/> {user.firstName} {user.lastName}
      </h1>  
    </div>
           
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
         <Skeleton className="w-[150px] h-[36px]"/>
         <Skeleton className="w-[150px] h-[36px]"/>
      </h1>  
    </div>
           
  );
}


async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany(
    {
      include: {
        tasks: true
      },
      where: {
          userId: user?.id,
      }

    }
  );

  if(collections.length === 0) {
    return (
      <div className="flex flex-col gap-5 ">
        <Alert>
          <AlertTitle>There are no entires in the collection</AlertTitle>
          <AlertDescription>Create a collection to get started</AlertDescription>
        </Alert>
        <CreateCollectionButton/>
      </div>
    
    )
  }

  return (
    <div>
      <CreateCollectionButton/>
      <div className="flex w-full flex-col gap-4 mt-6">
        {collections.map((collection: { id: Key | null | undefined; }) => (
          <CollectionCard key={collection.id} collection={collection}/>
      ))}
      </div>
      
    </div>
  )
  
  
}
