
import { Task } from '../model/Task'
import categories from '../categories'

type Props = {
    onSelectCategory: (cat: string) => void;
}


function TaskFilter({ onSelectCategory }: Props) {
    return (
        <div>
            <select onChange={(e) => onSelectCategory(e.target.value)}>
                <option value={""}>All Categories</option>
                {categories.map((key) => (<option value={key}>{key}</option>))}
            </select>
        </div>
    )
}

export default TaskFilter;