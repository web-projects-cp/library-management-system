import '../../style.css'
import SideNav from '../../components/SideNav'
import AdminMain from '../../pages/AdminMain'

const Admin = () => {
  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')
  return (
    <div>
      {currentUser.isAdmin === true ? (
        <div className="wrapper">
          <SideNav />
          <AdminMain />
        </div>
      ) : (
        <div className="nonAdmin">
          <p>Sorry, Admin only allowed.</p>
        </div>
      )}
    </div>
  )
}

export default Admin
