import { useCreateToDoMutation } from '../../services/toDo'
import { enterText } from '../../redux/textSlice'
import { useSelector, useDispatch } from 'react-redux'

const InputField = () => {
  const dispatch = useDispatch()
  const { value: title } = useSelector(store => store.text)

  const [
    createToDo, {isLoading: isCreating}  // Это и есть триггер mutation
  ] = useCreateToDoMutation();

  if(isCreating){
    return <div>Creating...</div>
  }
  return (
    <div>
      <input
        value={title}
        onChange={e => dispatch(enterText(e.target.value))}
      />
      <button onClick={() => createToDo({ title })}>add</button>
    </div>
  )
}

export default InputField
