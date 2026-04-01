import type { TaskInterface } from "../../types";
import styles from "./Task.module.css";

function Task({ title, done }: TaskInterface) {
    return (
        <div className={styles.task}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.status}>{done ? "Completed" : "Pending"}</p>
        </div>  
    )
}

export default Task;
