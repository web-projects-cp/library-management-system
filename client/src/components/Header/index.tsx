import '../../style.css'
import libBg from '../../assets/images/libBg.png'

function Header() {
  return (
    <div className="hero">
      <div className="card bg-dark text-white border-0">
        <img src={libBg} alt="library books" height="250px" />
        <div className="card-img-overlay d-flex flex-column justify-content-center">
          <div className="header__title">
            <h1>When in doubt go to the library...</h1>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Header
