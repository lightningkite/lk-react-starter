import {Home} from "pages/Home"
import {ItemDetail} from "pages/ItemDetail"
import {ItemIndex} from "pages/ItemIndex"
import React, {FC} from "react"
import {Navigate, Route, Routes} from "react-router-dom"

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemIndex />} />
        <Route path="/items/:itemId" element={<ItemDetail />} />

        {/* If page doesn't exist, redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AuthRoutes
