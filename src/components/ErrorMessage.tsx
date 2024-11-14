import { PropsWithChildren } from "react";

export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <div className="text-center my-4 bg-red-600 text-white uppercase font-bold p-3">
        {children}
    </div>
  )
}
