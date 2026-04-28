"use client"

import { useState } from "react"
import { MoreHorizontal, Eye, Pencil, Trash, Calendar, FileText, Hash, Clock } from "lucide-react"
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

import { AddJobModal } from "../all-jobs/component/AddJobModal"

// ✅ LEAVE SUMMARY DATA
const data = [
  { label: "Leave ID", value: "LV-1024", icon: Hash },
  { label: "Leave Period", value: "01 Apr - 07 Apr", icon: Calendar },
  { label: "Total Leaves", value: "5 Days", icon: Clock },
  { label: "Applied On", value: "28 Mar 2025", icon: FileText },
]

// ✅ EMPLOYEE LEAVE DATA
const employees = [
  { id: "#EMP-001", name: "Rahul Mehta", type: "Sick Leave", status: "Approved", balance: "12 Days" },
  { id: "#EMP-002", name: "Amit Das", type: "Casual Leave", status: "Pending", balance: "8 Days" },
  { id: "#EMP-003", name: "Priya Sharma", type: "Paid Leave", status: "Approved", balance: "15 Days" },
  { id: "#EMP-004", name: "Karan Singh", type: "Emergency Leave", status: "Rejected", balance: "6 Days" },
  { id: "#EMP-005", name: "Neha Verma", type: "Sick Leave", status: "Pending", balance: "10 Days" },
]

const ITEMS_PER_PAGE = 5

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentData = employees.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const getStatusVariant = (status: string) => {
    if (status === "Approved") return "default"
    if (status === "Pending") return "secondary"
    return "destructive"
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
              Leave Management
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage all employee leave requests
            </p>
          </div>

          <Button variant="secondary" className="text-cyan-600">
            View All
          </Button>
        </CardHeader>

        <CardContent>

          {/* ✅ SUMMARY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {data.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl border bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-slate-800 text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* TABLE */}
          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentData.map((emp, i) => (
                  <TableRow key={emp.id} className="hover:bg-muted/40 transition">

                    <TableCell className="font-medium">
                      {emp.id}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 rounded-lg">
                          <AvatarImage src={`https://i.pravatar.cc/40?u=${emp.name}`} />
                          <AvatarFallback>{emp.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{emp.name}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {emp.type}
                    </TableCell>

                    <TableCell className="font-semibold">
                      {emp.balance}
                    </TableCell>

                    <TableCell>
                      <Badge variant={getStatusVariant(emp.status)}>
                        {emp.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      Apr {10 + i} - Apr {12 + i}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">

                        <Link href="/employee-leave-details">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4 text-cyan-600" />
                          </Button>
                        </Link>

                        <DropdownMenu>
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
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, employees.length)} of{" "}
              {employees.length} employees
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