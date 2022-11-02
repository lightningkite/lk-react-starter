import {AnotherPage} from "pages/AnotherPage"
import {Home} from "pages/Home"
import {UserDetail} from "pages/UserDetail"
import {UserIndex} from "pages/UserIndex"
import React, {FC} from "react"
import {Navigate, Route, Routes} from "react-router-dom"

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserIndex />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/another-page" element={<AnotherPage />} />

        {/* If page doesn't exist, redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AuthRoutes
