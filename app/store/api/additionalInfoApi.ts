import { baseApi } from "./baseApi"

export const additionalInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // ✅ Example: Get Additional Info
    getAdditionalInfo: builder.query<any, number>({
      query: (id) => ({
        url: `/admin/additional-info/${id}`, // change API
        method: "GET",
      }),
      providesTags: ["Users"], // or create new tag
    }),

    visaStatusList: builder.query<any, void>({
      query: () => ({
        url: "/admin/visa-status-list", // 👈 your API
        method: "GET",
      }),
      providesTags: ["VisaStatus"], // important for refresh
    }),
    visaStatusDelete: builder.mutation<any, number>({
  query: (id) => ({
    url: `/admin/visa-status-delete/${id}`, // 👈 dynamic id
    method: "DELETE",
  }),
  invalidatesTags: ["VisaStatus"], // auto refresh list
}),

visaStatusUpdate: builder.mutation<
      any,
      { id: number; name: string }
    >({
      query: (data) => ({
        url: `/admin/visa-status-save`, 
        method: "POST",
        body: data, 
      }),
      invalidatesTags: ["VisaStatus"], 
    }),


     visaStatusCreate: builder.mutation<
      any,
      { name: string }
    >({
      query: (data) => ({
        url: "/admin/visa-status-save", 
        method: "POST",
        body: data, 
      }),
      invalidatesTags: ["VisaStatus"], // optional
    }),

    // ✅ NEW: Marital Status Create
    maritalStatusCreate: builder.mutation<
      any,
      { name: string }
    >({
      query: (data) => ({
        url: "/admin/marital-status-save", // 👈 your API
        method: "POST",
        body: data, // { name: "Single" }
      }),
      invalidatesTags: ["MaritalStatus"], // optional
    }),

      maritalStatusUpdate: builder.mutation<
      any,
      { id: number; name: string }
    >({
      query: (data) => ({
        url: `/admin/marital-status-save`, // 👈 your API
        method: "POST",
        body: data, // { name: "Single" }
      }),
      invalidatesTags: ["MaritalStatus"], // optional
    }),


        // ✅ NEW: Marital Status List
    maritalStatusList: builder.query<any, void>({
      query: () => ({
        url: "/admin/maritalstatuslist", // 👈 your API
        method: "GET",
      }),
      providesTags: ["MaritalStatus"], // important for refresh
    }),


    // ✅ NEW: Marital Status Delete
    maritalStatusDelete: builder.mutation<any, number>({
      query: (id) => ({
        url: `/admin/maritalstatusdelete/${id}`, // 👈 dynamic id
        method: "DELETE",
      }),
      invalidatesTags: ["MaritalStatus"], // auto refresh list
    }),

      // ✅ NEW: Marital Status Show (Single)
    maritalStatusShow: builder.query<any, number>({
      query: (id) => ({
        url: `/admin/maritalstatusshow/${id}`, // 👈 your API
        method: "GET",
      }),
    }),



    updateAdditionalInfo: builder.mutation<
      any,
      { id: number; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/admin/additional-info-update/${id}`, // change API
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

  }),

  overrideExisting: false,
})

export const {
  useGetAdditionalInfoQuery,
  useUpdateAdditionalInfoMutation,
  useMaritalStatusCreateMutation, // ✅ ADD THIS
    useMaritalStatusListQuery, // ✅ ADD THIS
      useMaritalStatusDeleteMutation, // ✅ ADD THIS
        useMaritalStatusShowQuery, // ✅ ADD THIS
            useMaritalStatusUpdateMutation, // ✅ ADD THIS
    useVisaStatusCreateMutation, // ✅ ADD THIS
    useVisaStatusListQuery, // ✅ ADD THIS
    useVisaStatusDeleteMutation, // ✅ ADD THIS
    useVisaStatusUpdateMutation, // ✅ ADD THIS
} = additionalInfoApi