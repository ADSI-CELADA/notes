import { Route, Routes } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Register } from "../components/Register"
import { Index } from "../pages/Index"
import { Notes } from "../pages/Notes"
import { NotFound } from "../pages/NotFound"
import { FormNotes } from "../pages/FormNotes"
import { UsersContextProvider } from "../context/UserContext"

export const Router = () => {
    return (
        <>
            <UsersContextProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/AppNotes" element={<Notes />} />
                    <Route path="/formNotes" element={<FormNotes />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </UsersContextProvider>
        </>
    )
}
