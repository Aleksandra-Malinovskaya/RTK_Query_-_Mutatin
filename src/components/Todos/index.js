import { useGetToDosQuery } from '../../services/toDo'
import Task from '../Task'
const Todos = () => {
  const { data, error, isLoading } = useGetToDosQuery()
  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <ul>{data && data.map(item => <Task key={item.id} {...item} />)}</ul>
    </div>
  )
}

export default Todos
