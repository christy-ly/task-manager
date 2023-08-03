
import React from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from '../categories'

const taskSchema = z.object({
    title: z.string().min(3, { message: "Title should be at least 3 characters." }).max(25),
    dueDate: z.string().refine((dueDate) => {
        const date = new Date(dueDate);
        return (
            !isNaN(date.getTime()) && dueDate === date.toISOString().slice(0, 10)
        );

    }),
    category: z.enum(categories, {
        errorMap: () => ({ message: "Category is required." }),
    }),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface Props {
    onSubmit: (data: TaskFormData) => void;
}

function TaskForm({ onSubmit }: Props) {
    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useForm<TaskFormData>({ resolver: zodResolver(taskSchema) });



    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                onSubmit(data);
                reset();
            })}>
                <div className="mb-10">
                    <label className="form-label">Title&nbsp; </label>
                    <input  {...register("title")} id='title' className="form-control" name="title" />
                </div>
                <div className="mb-10">
                    {errors.title && <p className="text-danger">{errors.title.message}</p>}
                </div>
                <div className="mb-10">
                    <label className="form-label">Due Date&nbsp; </label>
                    <input {...register("dueDate")} id='dueDate' type="date" className="form-control" name="dueDate" />
                    {errors.dueDate && <p className="text-danger">{errors.dueDate.message}</p>}
                </div>
                <div className="mb-10">
                    <label className="form-label">Category&nbsp; </label>
                    <select {...register("category")} id='category' className="form-control " name="category" >
                        <option></option>
                        {categories.map((key) => (<option>{key}</option>))}
                    </select>
                    {errors.category && <p className="text-danger">{errors.category.message}</p>}
                    <br />
                    <button type="submit" className="form-control btn btn-primary">Submit</button>
                </div>
            </form>

        </>

    )
}

export default TaskForm