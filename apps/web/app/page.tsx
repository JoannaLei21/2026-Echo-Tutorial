"use client"

import { Button } from "@workspace/ui/components/button"
import { add } from "@workspace/math/add"
import { useQuery, useMutation } from "convex/react"
import { api } from "@workspace/backend/_generated/api"

export default function Page() {
  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm" onClick={()=> addUser()}>ADD</Button>
        <p>{add(2,2)}</p>
        <div className="max-w-sm w-full mx-auto">{JSON.stringify(users)}</div>
      </div>
    </div>
  )
}
