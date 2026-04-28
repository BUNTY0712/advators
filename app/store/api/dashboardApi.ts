import { baseApi } from "./baseApi"

export interface StatsResponse {
  totalRevenue: number
  totalUsers: number
  orders: number
  pageViews: number
}

export interface Order {
  id: string
  client: string
  amount: string
  status: "Completed" | "Pending" | "Cancelled"
  date: string
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, void>({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),
    getRecentOrders: builder.query<Order[], void>({
      query: () => "/dashboard/orders",
      providesTags: ["Orders"],
    }),
    getActivityFeed: builder.query<{ text: string; time: string; type: string }[], void>({
      query: () => "/dashboard/activity",
      providesTags: ["Dashboard"],
    }),
  }),
})

export const {
  useGetStatsQuery,
  useGetRecentOrdersQuery,
  useGetActivityFeedQuery,
} = dashboardApi