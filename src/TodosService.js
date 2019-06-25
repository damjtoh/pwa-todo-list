import axios from "axios";
const endpoint = "/todos";
const toggle = (id, completed) =>
  axios.put(`${endpoint}/${id}`, { completed }).then(response => response.data);

const get = () => axios.get(endpoint).then(response => response.data);

const add = name =>
  axios
    .post(endpoint, {
      name
    })
    .then(response => response.data);

const TodosService = {
  add,
  get,
  toggle
};
export default TodosService;
