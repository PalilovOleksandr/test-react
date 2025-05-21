// import css from "./Form.module.css";

export default function Form() {
    const handleSubmit = (formData: FormData) => {
        const username = formData.get("username") as string;
        console.log(username)
    }
    return (
        <form action={handleSubmit}>
            <input type="text" name="username" defaultValue="OPalilov" />
            <button type="submit">Submit</button>
        </form>
    );
}