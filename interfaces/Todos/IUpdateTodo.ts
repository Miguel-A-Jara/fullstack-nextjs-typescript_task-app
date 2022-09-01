interface IUpdateTodo {
  author?:      string;
  title?:       string;
  description?: string;
  priority?:    number;
  completed?:   boolean;
}

export default IUpdateTodo;