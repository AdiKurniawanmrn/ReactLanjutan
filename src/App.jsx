import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Books from "./pages/public/books";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books/index";
import BooksCreate from "./pages/admin/books/create";
import AdminGenres from "./pages/admin/genres/index";
import AdminTransactions from "./pages/admin/transactions";
import GenresCreate from "./pages/admin/genres/create";
import AdminAuthors from "./pages/admin/authors";
import AuthorsCreate from "./pages/admin/authors/create";
import BooksEdit from "./pages/admin/books/edit";
import AuthorsEdit from "./pages/admin/authors/edit";
import GenresEdit from "./pages/admin/genres/edit";
import ShowBooks from "./pages/public/books/show";
import ProtectedRoute from "./_service/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public*/}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="books">
              <Route index element={<Books />}></Route>
              <Route path="show/:id" element={<ShowBooks />}></Route>
            </Route>
          </Route>
          {/*Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Admin */}
          <Route
            path="admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="books">
              <Route index element={<AdminBooks />} />
              <Route path="create" element={<BooksCreate />} />
              <Route path="edit/:id" element={<BooksEdit />} />
            </Route>

            <Route path="genres">
              <Route index element={<AdminGenres />} />
              <Route path="create" element={<GenresCreate />} />
              <Route path="edit/:id" element={<GenresEdit />} />
            </Route>
            <Route path="authors">
              <Route index element={<AdminAuthors />} />
              <Route path="create" element={<AuthorsCreate />} />
              <Route path="edit/:id" element={<AuthorsEdit />} />
            </Route>
            <Route path="transactions">
              <Route index element={<AdminTransactions />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
