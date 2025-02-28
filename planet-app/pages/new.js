import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewPlanet = () => {
    const [form, setForm] = useState({ name: '', NumberOfMoon: 0, LengthOfDay:0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createPlanet();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createPlanet = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/planets', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.name) {
            err.name = 'Name is required';
        }
        if (!form.NumberOfMoon) {
            err.NumberOfMoon = 'NumberOfMoon is required';
        }
        if (!form.LengthOfDay) {
            err.LengthOfDay = 'LengthOfDay is required';
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Create Planet</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                              <Form.Input
                                fluid
                                error={errors.name ? { content: 'Please enter a name of planet', pointing: 'below' } : null}
                                label='Name'
                                placeholder='Planet Name'
                                name ='name'
                                value={form.name}
                                onChange={handleChange}
                            />
                            <Form.Input
                             fluid
                             error={errors.NumberOfMoon ? { content: 'Please enter a Number Of Moon', pointing: 'below' } : null}
                             label='Number Of Moon'
                             placeholder='Number Of Moon'
                             name ='Number Of Moon'
                             value={form.NumberOfMoon}
                             onChange={handleChange}
                         />
                          <Form.Input
                             fluid
                             error={errors.LengthOfDay ? { content: 'Please enter a Length Of Day', pointing: 'below' } : null}
                             label='Length Of Day'
                             placeholder='Length Of Day'
                             name ='Length Of Day'
                             value={form.LengthOfDay}
                             onChange={handleChange}
                         />
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewPlanet;