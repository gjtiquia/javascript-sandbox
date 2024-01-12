export function TextCanvas({ text }: { text: string; }) {
    return <code className="whitespace-pre-wrap text-stone-100">
        {text}
    </code>;
}
