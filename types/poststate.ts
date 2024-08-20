interface StateObjProps {
    title?: string;
    bin?: "garbage" | "recycling" | "compost";
    coordinates?: string;
    photo?: string | ArrayBuffer | null;
}

export default StateObjProps