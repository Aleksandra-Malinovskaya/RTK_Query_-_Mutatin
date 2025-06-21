import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
}

export const toDoApi = createApi({
  reducerPath: 'toDoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_TOKEN}`)
      return headers
    }
  }),
  tagTypes: ['Todos'],
  endpoints: builder => ({
    getToDos: builder.query({
      query: () => {
        return {
          url: `todos`,
          method: 'GET',
          headers
        }
      },
      providesTags: ['Todos']
    }),
    createToDo: builder.mutation({
      query: body => {
        return {
          url: `todos`,
          method: 'POST',
          headers,
          body: body
        }
      },
      invalidatesTags: ['Todos']
    }),
    deleteToDo: builder.mutation({
      query: id => {
        return {
          url: `todos/${id}`,
          method: 'DELETE',
          headers
        }
      },
      invalidatesTags: ['Todos'],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status
    }),
    patchTodo: builder.mutation({
      query: ({id, title}) =>{
        return{
          url: `todos/${id}`,
          method: 'PATCH',
          body: {title},
        }
      },
      invalidatesTags: ['Todos'],
    }),
    checkTodo: builder.mutation({
      query: ({id, isCompleted}) =>{
        return{
          url: `todos/${id}/isCompleted`,
          method: 'PATCH',
          body: {isCompleted},
        }
      },
      invalidatesTags: ['Todos'],
    })
  })
})

export const {
  useGetToDosQuery,
  useCreateToDoMutation,
  useDeleteToDoMutation,
  usePatchTodoMutation,
  useCheckTodoMutation
} = toDoApi
