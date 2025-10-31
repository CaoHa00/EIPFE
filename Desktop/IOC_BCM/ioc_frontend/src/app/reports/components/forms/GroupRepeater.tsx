"use client";
import { CirclePlus } from "lucide-react";

import type { ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
type Props = {
    name: string;
    title?: string;
    defaultItem: unknown;
    renderItem: (basePath: string, index: number, remove: () => void) => ReactNode;
};
export default function GroupRepeater({ name, title, defaultItem, renderItem }: Props) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
    if (fields.length === 0) {
        return (
            <div className="p-4 border-3 border-black/50 rounded-lg">
                {title && <div className="mb-2 font-medium">{title}</div>}
                <div className="justify-center flex">
                    <button
                        type="button"
                        className="w-10 h-10 flex items-center   justify-center rounded-full  hover:bg-gray-300 text-x text-black"
                        onClick={() => append(defaultItem)}
                    >
                        <CirclePlus size={20} />
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {fields.map((f, i) => (
                <div key={f.id} className="p-4 border rounded-lg">
                    {renderItem(`${name}.${i}`, i, () => remove(i))}
                </div>
            ))}
            <div className="justify-center flex">
                <button
                    type="button"
                    className="w-10 h-10 flex items-center   justify-center rounded-full  hover:bg-gray-300 text-x text-black"
                    onClick={() => append(defaultItem)}
                >
                    <CirclePlus size={20} />
                </button>
            </div>


        </div>
    );
}
