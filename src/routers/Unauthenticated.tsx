import {Login} from "pages/Login"
import React, {FC} from "react"
import {Navigate, Route, Routes} from "react-router-dom"

export const Unauthenticated: FC = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />

          {/* Redirect all other routed to the login page */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </>
  )
}
