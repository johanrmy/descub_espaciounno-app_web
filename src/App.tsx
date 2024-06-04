import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@components/login/Login";
import Dashboard from "@components/dashboard/Dashboard";
import {ProtectedRoute, ProtectedRouteByRoot} from "./routes/ProtectedRoute";
import AuthProvider from "@auth/AuthContext";
import ReadMural from "@components/mural/ReadMural";
import Artist from "@components/artist/Artist";
import Mural from "@components/mural/Mural";
import Partnership from "@components/partnership/Partnership";
import ReadArtist from "@components/artist/ReadArtist";
import UpdateMural from "@components/mural/UpdateMural";
import UpdateArtist from "@components/artist/UpdateArtist";
import UpdatePartnership from "@components/partnership/UpdatePartnership";
import CreateArtist from "@components/artist/CreateArtist";
import CreateMural from "@components/mural/CreateMural";
import CreatePartnership from "@components/partnership/CreatePartnership";
import CreateCoupon from "@components/coupon_generate/CreateCoupon";
import Coupon from "@components/coupon_generate/Coupon";
import CouponGenerate from "@components/coupon_generate/CouponGenerate";
import ReadCouponGenerate from "@components/coupon_generate/ReadCouponGenerate";
import UpdateCouponGenerate from "@components/coupon_generate/UpdateCouponGenerate";
import UpdateCoupon from "@components/coupon_generate/UpdateCoupon";
import Lector from "@components/lector/Lector";
import Usuario from "@components/user/User"
import UpdateUser from "@components/user/UpdateUser";
import CreateUser from "@components/user/CreateUser";
import NotFoundPage from "@components/shared/extra/NotFound";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="murales" element={<Mural/>}/>
              <Route path="murales/read/:id" element={<ReadMural/>}/>
              <Route path="murales/update/:id" element={<UpdateMural/>}/>
              <Route path="murales/create" element={<CreateMural/>}/>
              <Route path="artistas" element={<Artist/>}/>
              <Route path="artistas/read/:id" element={<ReadArtist/>}/>
              <Route path="artistas/update/:id" element={<UpdateArtist/>}/>
              <Route path="artistas/create" element={<CreateArtist/>}/>
              <Route path="partnerships" element={<Partnership/>}/>
              <Route path="partnerships/update/:id" element={<UpdatePartnership/>}/>
              <Route path="partnerships/create" element={<CreatePartnership/>}/>
              <Route path="cupones/gc/:id" element={<Coupon/>}/>
              <Route path="cupones/update/:id" element={<UpdateCoupon/>}/>
              <Route path="paquetes" element={<CouponGenerate/>}/>
              <Route path="paquetes/read/:id" element={<ReadCouponGenerate/>}/>
              <Route path="paquetes/update/:id" element={<UpdateCouponGenerate/>}/>
              <Route path="generar-cupon" element={<CreateCoupon/>}/>
              <Route path="lector" element={<Lector/>}/>
            </Route>
            <Route element={<ProtectedRouteByRoot/>}>
              <Route path="usuarios" element={<Usuario/>}/>
              <Route path="usuarios/:id" element={<UpdateUser/>}/>
              <Route path="generar-acceso" element={<CreateUser/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
