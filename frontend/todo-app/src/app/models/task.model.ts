import { Person } from "./person.model";

export interface Task {
    _id: string;
    name: string;
    deadline: Date;
    persons: Person[];
    is_completed: boolean;
}