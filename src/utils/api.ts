import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type User = { id: number; [key: string]: any };
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://697a7db50e6ff62c3c5985f1.mockapi.io/",
  }),
  tagTypes: ["User"],
  endpoints: (build) => {  
    return {
      getUsers: build.query({
        query: () => "/users",
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }: User) => ({ type: "User", id })),
                { type: "User", id: "LIST" },
              ]
            : [{ type: "User", id: "LIST" }],
      }),
      addUser: build.mutation({
        query(body) {
          function generateToken(length: number = 10): string {
            const chars =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let token = "";

            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * chars.length);
              token += chars[randomIndex];
            }

            return token;
          }

          const token = generateToken();

          const data = { ...body, token: token };

          return {
            url: "/users",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: [{ type: "User", id: "LIST" }],
      }),
      delUser: build.mutation({
        query(id) {
          return {
            url: "/users/" + id,
            method: "DELETE",
          };
        },
        invalidatesTags: [{ type: "User", id: "LIST" }],
      }),
      updateUser: build.mutation({
        query(data) {
          const { id, ...body } = data;
          return {
            url: "/users/" + id,
            method: "PUT",
            body,
          };
        },
        invalidatesTags: [{ type: "User", id: "LIST" }],
      }),
    };
  },

});



export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDelUserMutation,
  useUpdateUserMutation,
} = userApi;
