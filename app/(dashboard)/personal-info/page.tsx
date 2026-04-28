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
import { AddJobModal } from "../all-jobs/component/AddJobModal"


const drivers = [
  { id: "#DRV-001", name: "Rahul Mehta", vehicle: "Toyota Innova", status: "Active", earnings: "$2,340" },
  { id: "#DRV-002", name: "Amit Das", vehicle: "Maruti Swift", status: "Inactive", earnings: "$1,120" },
  { id: "#DRV-003", name: "Priya Sharma", vehicle: "Hyundai i20", status: "Active", earnings: "$3,020" },
  { id: "#DRV-004", name: "Karan Singh", vehicle: "Honda City", status: "Active", earnings: "$2,800" },
  { id: "#DRV-005", name: "Neha Verma", vehicle: "Kia Seltos", status: "Inactive", earnings: "$1,540" },
]

const ITEMS_PER_PAGE = 5

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(drivers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentData = drivers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const getStatusVariant = (status: string) => {
    return status === "Active" ? "default" : "destructive"
  }

  return (
    <div className="p-0 bg-muted/30 min-h-screen">
      
      {/* TOP ACTION */}
   {/* <div className="flex justify-end mb-6">
<AddJobModal />
 
</div> */}

      {/* CARD */}
      <Card className="rounded-2xl shadow-sm border">
        
        {/* HEADER */}
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              Persnal Info
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
                {currentData.map((driver, i) => (
                  <TableRow key={driver.id} className="hover:bg-muted/40 transition">
                    
                    <TableCell className="font-medium">
                      {driver.id}
                    </TableCell>

                    {/* DRIVER */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 rounded-lg">
                          <AvatarImage src={`https://i.pravatar.cc/40?u=${driver.name}`} />
                          <AvatarFallback>{driver.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{driver.name}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {driver.vehicle}
                    </TableCell>

                    <TableCell className="font-semibold">
                      {driver.earnings}
                    </TableCell>

                    <TableCell>
                      <Badge variant={getStatusVariant(driver.status)}>
                        {driver.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      Mar {15 + i}
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        
                        {/* VIEW */}
                        <Link href="/all-user-info">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4 text-cyan-600" />
                          </Button>
                        </Link>

                        {/* DROPDOWN */}
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