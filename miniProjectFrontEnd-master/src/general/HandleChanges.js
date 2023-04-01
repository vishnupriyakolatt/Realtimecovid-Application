import { useState } from 'react';

export const useForm = (initialValue) => {

    const [value, SetValue] = useState(initialValue)

    return [value, (event) => {
        SetValue({ ...value, [event.target.name]: event.target.value })
    }]

}
