export function Header() {
    return <>
        <h1 className="hidden">
            ASCII RPG
        </h1>
        <code className="whitespace-pre-wrap text-stone-100 text-xs sm:text-base">
            {
                "____ ____ ____ _ _    ____ ___  ____ \n" +
                "|__| [__  |    | |    |__/ |__] | __ \n" +
                "|  | ___] |___ | |    |  \\ |    |__]"
            }
        </code>
    </>;
}
