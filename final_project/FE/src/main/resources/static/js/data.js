// ============================================
// HỆ THỐNG QUẢN LÝ THƯ VIỆN - DỮ LIỆU MOCK
// LIBRARY MANAGEMENT SYSTEM - MOCK DATA
// ============================================

// Current user role (simulated - in real app this would come from backend)
const CURRENT_ROLE = 'LIBRARIAN'; // Options: 'GUEST', 'VIEWER', 'LIBRARIAN'

// Mock data for books
let BOOKS_DATA = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Classic Literature",
    publisher: "Scribner",
    status: "available",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    borrowHistory: [
      { borrower: "John Smith", date: "2024-10-15", returned: "2024-11-01" },
      { borrower: "Sarah Johnson", date: "2024-09-20", returned: "2024-10-05" }
    ]
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    publisher: "J.B. Lippincott & Co.",
    status: "borrowed",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    borrowHistory: [
      { borrower: "Michael Brown", date: "2024-11-20", returned: null }
    ]
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    category: "Dystopian Fiction",
    publisher: "Secker & Warburg",
    status: "available",
    description: "A dystopian social science fiction novel exploring totalitarianism and surveillance.",
    borrowHistory: [
      { borrower: "Emily Davis", date: "2024-08-10", returned: "2024-08-25" }
    ]
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    category: "Romance",
    publisher: "T. Egerton",
    status: "available",
    description: "A romantic novel of manners set in Georgian England.",
    borrowHistory: []
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-316-76948-0",
    category: "Fiction",
    publisher: "Little, Brown and Company",
    status: "lost",
    description: "A controversial coming-of-age story about teenage rebellion and alienation.",
    borrowHistory: [
      { borrower: "David Wilson", date: "2024-07-15", returned: null }
    ]
  }
];

// Categories for filtering
const BOOK_CATEGORIES = [
  "Classic Literature",
  "Fiction",
  "Dystopian Fiction", 
  "Romance",
  "Science Fiction",
  "Mystery",
  "Biography",
  "History",
  "Philosophy",
  "Poetry"
];

// Book status options
const BOOK_STATUSES = {
  available: { label: "Available", class: "status-available" },
  borrowed: { label: "Borrowed", class: "status-borrowed" },
  lost: { label: "Lost/Maintenance", class: "status-lost" }
};