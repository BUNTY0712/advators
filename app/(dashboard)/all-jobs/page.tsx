"use client"

import { useState } from "react"
import { MoreHorizontal, Eye, Pencil, Trash } from "lucide-react"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AddJobModal } from "./component/AddJobModal"
import { useGetJobListQuery, useJobDeleteMutation } from "@/app/store/api/authApi"
import { toast } from "sonner"

const drivers = [
  { id: "#DRV-001", name: "Rahul Mehta", vehicle: "Toyota Innova", status: "Active", earnings: "$2,340" },
  { id: "#DRV-002", name: "Amit Das", vehicle: "Maruti Swift", status: "Inactive", earnings: "$1,120" },
  { id: "#DRV-003", name: "Priya Sharma", vehicle: "Hyundai i20", status: "Active", earnings: "$3,020" },
  { id: "#DRV-004", name: "Karan Singh", vehicle: "Honda City", status: "Active", earnings: "$2,800" },
  { id: "#DRV-005", name: "Neha Verma", vehicle: "Kia Seltos", status: "Inactive", earnings: "$1,540" },
]

const ITEMS_PER_PAGE = 6

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading } = useGetJobListQuery();
 const [deleteJob, { isLoading: deleting }] = useJobDeleteMutation()

const handleDelete = async (id: number) => {
  toast("Are you sure you want to delete this job?", {
    action: {
      label: "Delete",
      onClick: async () => {
        try {
          await deleteJob(id).unwrap()
          toast.success("Job deleted successfully ✅")
        } catch (error) {
          console.error(error)
          toast.error("Failed to delete job ❌")
        }
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => toast("Cancelled"),
    },
  })
}
  

const jobs = data?.data || [];

const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const currentData = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getStatusVariant = (status: string) => {
    return status === "Active" ? "default" : "destructive"
  }

  return (
    <div className="p-0 bg-muted/30 min-h-screen">
      
      {/* TOP ACTION */}
   <div className="flex justify-end mb-6">
<AddJobModal />
 
</div>

      {/* CARD */}
      <Card className="rounded-2xl shadow-sm border">
        
        {/* HEADER */}
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              All Jobs
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage all registered jobs
            </p>
          </div>

          <Button variant="secondary" className="text-cyan-600">
            View All
          </Button>
        </CardHeader>

        <CardContent>
          
          {/* TABLE */}
          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ID</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

           <TableBody>
  {isLoading ? (
    <TableRow>
      <TableCell colSpan={7} className="text-center">
        Loading...
      </TableCell>
    </TableRow>
  ) : currentData.length === 0 ? (
    <TableRow>
      <TableCell colSpan={7} className="text-center">
        No Jobs Found
      </TableCell>
    </TableRow>
  ) : (
    currentData.map((job: any, i: number) => (
      <TableRow key={job.id}>
        
        {/* ID */}
        <TableCell className="font-medium">
          #{job.id}
        </TableCell>

        {/* CLIENT */}
        <TableCell>
          Client {job.client_id}
        </TableCell>

        {/* TRIP TYPE */}
        <TableCell>
          {job.trip_type || "-"}
        </TableCell>

        {/* LOAD TYPE */}
        <TableCell>
          {job.load_type || "-"}
        </TableCell>

        {/* STATUS */}
        <TableCell>
          <Badge variant="default">
            Active
          </Badge>
        </TableCell>

        {/* DATE */}
        <TableCell>
          {job.created_at
            ? new Date(job.created_at).toLocaleDateString()
            : "-"}
        </TableCell>

        {/* ACTIONS */}
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">

            <Link href={`/job-view/?jobId=${job.id}`}>
              <Button size="icon" variant="ghost">
                <Eye className="h-4 w-4 text-cyan-600 cursor-pointer" />
              </Button>
            </Link> 

            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

            <DropdownMenuItem
  className="text-red-600 cursor-pointer"
  onClick={() => handleDelete(job.id)}
>
  <Trash className="mr-2 h-4 w-4" />
  Delete
</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </TableCell>

      </TableRow>
    ))
  )}
</TableBody>
            </Table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, drivers.length)} of{" "}
              {drivers.length} drivers
            </p>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}