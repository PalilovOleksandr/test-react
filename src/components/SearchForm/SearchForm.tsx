import css from "./SearchForm.module.css";

interface SearchFormProps {
    onSubmit: (topic: string) => void;
}
export default function SearchForm({ onSubmit }: SearchFormProps) {
    const handleSubmit = (formData: FormData) => {
        const topic = formData.get("topic") as string;
        if (topic === "") {
            alert("Please enter search topic!");
            return;
        }
        onSubmit(topic);
    }
    return (
        <form action={handleSubmit} className={css.form}>
            <input type="text" name="topic" className={css.input} />
            <button type="submit" className={css.button}>Search</button>
        </form>
    )
}