import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/router';
import NotFound from './pages/notFound/NotFound';
import Layout from './pages/Layout';
import RequireAuth from './hooks/RequireAuth';
import PersistLogin from './context/PersistLogin';
import HomeTeller from './pages/teller/home/Home';
import HomeOwner from './pages/owner/home/HomeOwner';
import ManageOrder from './pages/teller/manageOrder/ManageOrder';
import ListOrder from './pages/teller/listOrder/ListOrder';
import CreateOrder from './pages/teller/createOrder/CreateOrder';
import Home from './pages/admin/home/Home';
import DetailOrder from './pages/teller/detailOrder/DetailOrder';
import HistoryOrder from './pages/teller/historyOrder/HistoryOrder';
import ManageEmployee from './pages/owner/manageEmployee/ManageEmployee';
import ManageProduct from './pages/owner/manageProduct/ManageProduct';
import ManageOrderOwner from './pages/owner/manageOrderOwner/ManageOrderOwner';
import ManageDiscount from './pages/owner/manageDiscount/ManageDiscount';
import ManageService from './pages/owner/manageService/ManageService';
import CreateProduct from './pages/owner/createProduct/CreateProduct';
import ListProduct from './pages/owner/listProduct/ListProduct';
import ProductDetail from './pages/owner/productDetail/ProductDetail';
import UpdateProduct from './pages/owner/updateProduct/UpdateProduct';
import ManageBooking from './pages/teller/manageBooking/ManageBooking'
import ListBooking from './pages/teller/manageBooking/ListBooking';
import WaitForConfirmBooking from './pages/teller/manageBooking/WaitForConfirmBooking';
import HistoryBooking from './pages/teller/manageBooking/HistoryBooking';

import ManageOnlineOrder from './pages/teller/manageOnlineOrder/ManageOnlineOrder'
import ListOnlineOrder from './pages/teller/manageOnlineOrder/ListOnlineOrder';
import DetailOnlineOrder from './pages/teller/manageOnlineOrder/DetailOnlineOrder'

import ListService from './pages/owner/listService/ListService';
import CreateService from './pages/owner/createService/CreateService';
import UpdateService from './pages/owner/updateService/UpdateService';
import DetailService from './pages/owner/detailService/DetailService';
import ListNotProduct from './pages/owner/listNotProduct/ListNotProduct';
import ListAllOrder from './pages/teller/listAllOrder/ListAllOrder';
import ListWaitPaidOrder from './pages/teller/listWaitPaidOrder/ListWaitPaidOrder';
import ListNotService from './pages/owner/listNotService/ListNotService';
import ListOrderConfirm from './pages/teller/manageOnlineOrder/ListOrderConfirm';
import ListOrderTransport from './pages/teller/manageOnlineOrder/ListOrderTransport';
import ListOrderFinished from './pages/teller/manageOnlineOrder/ListOrderFinished';
import ListOrderCanceled from './pages/teller/manageOnlineOrder/ListOrderCanceled';
import ListAllBooking from './pages/teller/manageBooking/ListAllBooking';
import ListOnlineOrderPaid from './pages/teller/manageOnlineOrder/ListOnlineOrderPaid';
import CreateDiscount from './pages/owner/createDiscount/CreateDiscount';
import ListDiscount from './pages/owner/listDiscount/ListDiscount';
import ListNotDiscount from './pages/owner/listNotDiscount/ListNotDiscount';
import DetailDiscount from './pages/owner/detailDiscount/DetailDiscount';
import UpdateDiscount from './pages/owner/updateDiscount/UpdateDiscount';
import ListPaidOrder from './pages/teller/listPaidOrder/ListPaidOrder';
import ListRepairOrder from './pages/teller/listRepairOrder/ListRepairOrder';
import ManageOrderOnline from './pages/owner/manageOrderOnline/ManageOrderOnline';
import ListGhn from './pages/ghn/ListGhn';
import ManageOrderOffline from './pages/owner/manageOrderOffline/ManageOrderOffline';
import DetailOfflineOrder from './pages/owner/detailOfflineOrder/DetailOfflineOrder';
import DetailOnlineOrderOwner from './pages/owner/detailOnlineOrderOwner/DetailOnlineOrderOwner';
import CanceledOrderOwner from './pages/owner/canceledOrderOwner/CanceledOrderOwner';
import FinishedOrderOwner from './pages/owner/finishedOrderOwner/FinishedOrderOwner';
import HistoryOrderOwner from './pages/owner/historyOrderOwner/HistoryOrderOwner';
import ListStaff from './pages/owner/listStaff/ListStaff';
import ListTeller from './pages/owner/listTeller/ListTeller';
import DetailEmployee from './pages/owner/detailEmployee/DetailEmployee';
import DetailTeller from './pages/owner/detailEmployee/DetailTeller';
import ShowSetting from './pages/owner/showSetting/ShowSetting';
import DateMaintenance from './pages/teller/dateMaintenance/DateMaintenance';
import ListOutOfStockProduct from './pages/owner/listOutOfStockProduct/ListOutOfStockProduct';
import ListTopProduct from './pages/owner/listTopProduct/ListTopProduct';
import PersonalInfor from './pages/personalInfor/PersonalInfor';


const ROLES = {
  Owner: "Owner",
  Teller: "Teller",
  Admin: "Admin",
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public router */}
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Page />}
            />
          )
        })}
        {/* private router */}

        <Route element={<PersistLogin />}>
          <Route>
            <Route path="/ghn" element={<ListGhn />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
            <Route path="/" element={<Home />} />
          </Route>
          {/* Page của Teller */}
          <Route element={<RequireAuth allowedRoles={ROLES.Teller} />}>
            <Route path="teller" element={<HomeTeller />} />
            <Route path="information-personal" element={<PersonalInfor />} />
            <Route path="/manage-order" element={<ManageOrder />}>
              <Route path="create-order" element={<CreateOrder />} />
              <Route path="create-order/:bookingId" element={<CreateOrder />} />
              <Route path="list-all-order" element={<ListAllOrder />}>
                <Route path="list-order" element={<ListOrder />} />
                <Route path="repair-order" element={<ListRepairOrder />} />
                <Route path="wait-paid-order" element={<ListWaitPaidOrder />} />
                <Route path="paid-order" element={<ListPaidOrder />} />
                <Route path="history-order" element={<HistoryOrder />} />
              </Route>
              <Route path="online-order" element={<ManageOnlineOrder />}>
                <Route path="list-order" element={<ListOnlineOrder />} />
                <Route path="list-order-paid" element={<ListOnlineOrderPaid />} />
                <Route path="list-order-confirm" element={<ListOrderConfirm />} />
                <Route path="list-order-transport" element={<ListOrderTransport />} />
                <Route path="list-order-finish" element={<ListOrderFinished />} />
                <Route path="list-order-canceled" element={<ListOrderCanceled />} />
              </Route>
              <Route path="online/:orderId" element={<DetailOnlineOrder />} />
              <Route path=":orderId" element={<DetailOrder />} />
            </Route>
            <Route path="manage-booking" element={<ManageBooking />}>
              <Route path="list" element={<ListAllBooking />}>
                <Route path="wait-for-confirm-booking" element={<WaitForConfirmBooking />} />
                <Route path="history-booking" element={<HistoryBooking />} />
              </Route>
              <Route path="list-booking" element={<ListBooking />} />
            </Route>
            <Route path="manage-maintenance" element={<DateMaintenance />}/>
          </Route>
          {/* Page của Owner */}
          <Route element={<RequireAuth allowedRoles={ROLES.Owner} />}>
            <Route path="owner" index element={<HomeOwner />} />
            <Route path="information-owner" element={<PersonalInfor />} />
            <Route path="setting" index element={<ShowSetting />} />
            <Route path="manage-employees" element={<ManageEmployee />}>
              <Route path="list-staff" index element={<ListStaff />} />
              <Route path="list-teller" index element={<ListTeller />} />
              <Route path=":employeeId" index element={<DetailEmployee />} />
              <Route path="teller/:employeeId" index element={<DetailTeller />} />
            </Route>
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="manage-products" element={<ManageProduct />}>
              <Route path="list-product" element={<ListProduct />} />
              <Route path="list-out-of-stock-product" element={<ListOutOfStockProduct />}/>
              <Route path="list-top-product" element={<ListTopProduct />}/>
              <Route path="list-not-product" element={<ListNotProduct />} />
              <Route path=":productId" element={<ProductDetail />} />
              <Route path="update-product/:productId" element={<UpdateProduct />} />
            </Route>
            <Route path="manage-orders-owner" element={<ManageOrderOwner />}>
              <Route path="offline-order" element={<ManageOrderOffline />}>
                <Route path="history-order" element={<HistoryOrderOwner />} />
              </Route>
              <Route path="online-order" element={<ManageOrderOnline />}>
                <Route path="list-order-finish" element={<FinishedOrderOwner />} />
                <Route path="list-order-canceled" element={<CanceledOrderOwner />} />
              </Route>
              <Route path=":orderId" element={<DetailOfflineOrder />} />
              <Route path="online/:orderId" element={<DetailOnlineOrderOwner />} />
            </Route>
            <Route path="manage-discounts" element={<ManageDiscount />}>
              <Route path="list-discount" element={<ListDiscount />} />
              <Route path="list-not-discount" element={<ListNotDiscount />} />
              <Route path=":discountId" element={<DetailDiscount />} />
              <Route path="update-discount/:discountId" element={<UpdateDiscount />} />
            </Route>

            <Route path="create-service" element={<CreateService />} />
            <Route path="create-discount" element={<CreateDiscount />} />

            <Route path="manage-services" element={<ManageService />}>
              <Route path='list-service' element={<ListService />} />
              <Route path='list-not-service' element={<ListNotService />} />
              <Route path=":serviceId" element={<DetailService />} />
              <Route path="update-service/:serviceId" element={<UpdateService />} />
            </Route>
          </Route>

        </Route>


        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
