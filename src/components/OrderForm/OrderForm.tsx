import { useId } from "react";
import css from "./OrderForm.module.css";
import type { OrderData } from "../../types/types";
interface OrderFormProps {
    onSubmit: (value: OrderData) => void;
}
export default function OrderForm({ onSubmit }: OrderFormProps) {
    const fieldId = useId();
    const handleSubmit = (formData: FormData) => {
        const orderData: OrderData = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            delivery: formData.get("delivery") as string,
            deliveryTime: formData.get("deliveryTime") as string,
            restrictions: formData.getAll("restrictions") as string[],
        }
        onSubmit(orderData);
    }
    return (
        <form action={handleSubmit} className={css.form}>
            <fieldset className={css.fieldset}>
                <legend className={css.legend}>Client info:</legend>
                <label htmlFor={`${fieldId}-username`} className={css.label}>
                    Name
                </label>
                <input type="text" name="username" id={`${fieldId}-username`} />

                <label htmlFor={`${fieldId}-email`} className={css.label}>
                    Email
                </label>
                <input type="email" name="email" id={`${fieldId}-email`} />
            </fieldset>

            <fieldset className={css.fieldset}>
                <legend className={css.legend}>Delivery method:</legend>
                <label className={css.option}>
                    <input type="radio" name="delivery" value="pickup" defaultChecked />
                    Pickup
                </label>
                <label className={css.option}>
                    <input type="radio" name="delivery" value="courier" />
                    Courier
                </label>
                <label className={css.option}>
                    <input type="radio" name="delivery" value="drone" />
                    Drone delivery
                </label>
            </fieldset>

            <fieldset className={css.fieldset}>
                <legend className={css.legend}>Dietary restrictions:</legend>
                <label className={css.option}>
                    <input type="checkbox" name="restrictions" value="vegan" />
                    Vegan
                </label>
                <label className={css.option}>
                    <input type="checkbox" name="restrictions" value="gluten-free" />
                    Gluten-free
                </label>
                <label className={css.option}>
                    <input type="checkbox" name="restrictions" value="nut-free" />
                    Nut-free
                </label>
            </fieldset>

            <label htmlFor={`${fieldId}-deliveryTime`} className={css.label}>
                Preferred delivery time
            </label>
            <select
                name="deliveryTime"
                id={`${fieldId}-deliveryTime`}
                defaultValue=""
                className={css.input}
            >
                <option value="">-- Choose delivery time --</option>
                <option value="morning">Morning (8:00-12:00)</option>
                <option value="afternoon">Afternoon (12:00-16:00)</option>
                <option value="evening">Evening (16:00-20:00)</option>
            </select>

            <button type="submit" className={css.button}>
                Place order
            </button>
        </form>
    )
}