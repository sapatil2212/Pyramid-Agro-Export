"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Clock, 
  Trash2, 
  MessageSquare,
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Eye
} from "lucide-react"

interface Enquiry {
  id: string
  name: string
  email: string
  contact: string
  country: string
  productInterested: string
  message: string
  status: "NEW" | "IN_PROGRESS" | "RESPONDED" | "CLOSED"
  notes: string | null
  isRead: boolean
  createdAt: string
  updatedAt: string
}

const statusColors = {
  NEW: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  RESPONDED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-700",
}

const statusLabels = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  RESPONDED: "Responded",
  CLOSED: "Closed",
}

// Modal Component
function EnquiryModal({ 
  enquiry, 
  onClose, 
  onUpdateStatus, 
  onDelete,
  isUpdating 
}: { 
  enquiry: Enquiry
  onClose: () => void
  onUpdateStatus: (id: string, status: string) => void
  onDelete: (id: string) => void
  isUpdating: boolean
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Enquiry Details</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[60vh] space-y-4">
          {/* Name */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Name</p>
            <p className="text-sm font-medium text-gray-900">{enquiry.name}</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <a href={`mailto:${enquiry.email}`} className="text-sm text-emerald-600 hover:underline flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              {enquiry.email}
            </a>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact</p>
            <a href={`tel:${enquiry.contact}`} className="text-sm text-emerald-600 hover:underline flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              {enquiry.contact}
            </a>
          </div>

          {/* Country */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Country</p>
            <p className="text-sm text-gray-900 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              {enquiry.country}
            </p>
          </div>

          {/* Product Interested */}
          {enquiry.productInterested && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Product Interested</p>
              <p className="text-sm text-gray-900 flex items-center gap-1">
                <Package className="h-3.5 w-3.5 text-gray-400" />
                {enquiry.productInterested}
              </p>
            </div>
          )}

          {/* Message */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Message</p>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
              {enquiry.message}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {(["NEW", "IN_PROGRESS", "RESPONDED", "CLOSED"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateStatus(enquiry.id, s)}
                  disabled={isUpdating}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    enquiry.status === s
                      ? statusColors[s]
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {statusLabels[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Received</p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              {formatDate(enquiry.createdAt)}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 p-5 border-t border-gray-100 bg-gray-50">
          <a
            href={`mailto:${enquiry.email}?subject=Re: Your enquiry to Pyramid Agro Exports`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Reply via Email
          </a>
          <button
            onClick={() => onDelete(enquiry.id)}
            className="px-4 py-2.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function EnquiriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth")
    }
  }, [status, router])

  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery }),
      })
      
      const response = await fetch(`/api/enquiries?${params}`)
      const data = await response.json()
      
      if (data.enquiries) {
        setEnquiries(data.enquiries)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error("Failed to fetch enquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchEnquiries()
    }
  }, [status, currentPage, statusFilter, searchQuery])

  const handleViewEnquiry = async (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    
    // Mark as read
    if (!enquiry.isRead) {
      try {
        await fetch(`/api/enquiries/${enquiry.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        })
        fetchEnquiries()
      } catch (error) {
        console.error("Failed to mark as read:", error)
      }
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true)
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      fetchEnquiries()
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as Enquiry["status"] })
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return
    
    try {
      await fetch(`/api/enquiries/${id}`, { method: "DELETE" })
      fetchEnquiries()
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null)
      }
    } catch (error) {
      console.error("Failed to delete enquiry:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-72">
        <Header onMenuClick={() => setSidebarOpen(true)} title="Website Enquiries" />
        
        <main className="p-6 lg:p-8">
          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">All Status</option>
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESPONDED">Responded</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
                <button
                  onClick={fetchEnquiries}
                  className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Enquiries List - Full Width */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Loading enquiries...</p>
              </div>
            ) : enquiries.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No enquiries found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Date</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {enquiries.map((enquiry) => (
                      <tr
                        key={enquiry.id}
                        className={`hover:bg-gray-50 transition-colors ${!enquiry.isRead ? "bg-blue-50/30" : ""}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {!enquiry.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                            <span className="text-sm font-medium text-gray-900">{enquiry.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600">{enquiry.email}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-sm text-gray-600">{enquiry.country}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-sm text-gray-600 truncate max-w-[150px] block">
                            {enquiry.productInterested || "-"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[enquiry.status]}`}>
                            {statusLabels[enquiry.status]}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-xs text-gray-500">{formatDate(enquiry.createdAt)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleViewEnquiry(enquiry)}
                              className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEnquiry(enquiry.id)}
                              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Enquiry Details Modal */}
      {selectedEnquiry && (
        <EnquiryModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDeleteEnquiry}
          isUpdating={isUpdating}
        />
      )}
    </>
  )
}
