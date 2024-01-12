export function TextCanvas({ text }: { text: string; }) {
    return <code className="whitespace-pre-wrap select-none text-stone-100">
        {text}
    </code>;
}
